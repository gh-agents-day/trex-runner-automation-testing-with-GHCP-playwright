import { test, expect } from '@playwright/test';

// Locators sourced directly from MCP accessibility tree inspection of http://127.0.0.1:8080:
//   generic "game-canvas"        → page.getByLabel('game-canvas')  (aria-label on <canvas>)
//   paragraph "High Score: N"    → page.getByLabel('high-score')   (aria-label on <p>)
//   Score counter (Score: N)     → NOT in a11y tree — drawn via ctx.fillText (canvas pixels only)
//                                   → must use page.evaluate(() => window.gameScore)

async function disableCollision(page: any) {
  await page.route('http://127.0.0.1:8080/game.js', async (route: any) => {
    const response = await route.fetch();
    let body = await response.text();
    // Replace the full if/else as one unit — orphaning the else causes SyntaxError
    body = body.replace(
      'if(obs<70&&obs>50&&y>140)gameOver();\n else requestAnimationFrame(loop);',
      'requestAnimationFrame(loop);'
    );
    await route.fulfill({ response, body });
  });
}

test.describe('T-Rex Runner — MCP Accessibility Tests', () => {

  // Test 1: Canvas is visible on load
  // MCP a11y tree: generic "game-canvas" (aria-label="game-canvas" on <canvas>)
  test('canvas is visible on load', async ({ page }) => {
    await page.route('http://localhost:3000/**', route =>
      route.fulfill({ json: { highScore: 0 } })
    );
    await page.goto('/');

    await expect(page.getByLabel('game-canvas')).toBeVisible();
  });

  // Test 2: Score counter is active after pressing Space
  // MCP confirmed: score is NOT in the a11y tree (ctx.fillText renders to canvas pixels)
  // window.gameScore is set every animation frame — the only reliable assertion
  test('score counter is active after pressing Space', async ({ page }) => {
    await page.route('http://localhost:3000/**', route =>
      route.fulfill({ json: { highScore: 0 } })
    );
    await disableCollision(page);
    await page.goto('/');

    await expect(page.getByLabel('game-canvas')).toBeVisible();
    await page.keyboard.press('Space');

    await page.waitForFunction(() => (window as any).gameScore !== undefined, { timeout: 5000 });
    const score = await page.evaluate(() => (window as any).gameScore);
    expect(score).toBeGreaterThanOrEqual(0);
  });

  // Test 3: Score is greater than 0 after gameplay
  // obs moves at 6px/frame; wraps every ~133 frames (~2s at 60fps) incrementing score
  // MCP confirmed score only accessible via window.gameScore — not the a11y tree
  test('score is greater than 0 after 3 seconds of gameplay', async ({ page }) => {
    await page.route('http://localhost:3000/**', route =>
      route.fulfill({ json: { highScore: 0 } })
    );
    await disableCollision(page);
    await page.goto('/');

    await page.keyboard.press('Space');

    await page.waitForFunction(() => (window as any).gameScore > 0, { timeout: 10000 });
    const score = await page.evaluate(() => (window as any).gameScore);
    expect(score).toBeGreaterThan(0);
  });

  // Test 4: GET /score is called on page load
  // MCP observed: fetch('http://localhost:3000/score') fires on load, updates aria-label="high-score"
  test('GET /score is called on page load and high score is displayed', async ({ page }) => {
    let getCalled = false;

    await page.route('http://localhost:3000/score', route => {
      if (route.request().method() === 'GET') getCalled = true;
      route.fulfill({ json: { highScore: 42 } });
    });

    await page.goto('/');

    // MCP a11y tree: paragraph with aria-label="high-score" shows "High Score: N"
    await expect(page.getByLabel('high-score')).toContainText('42');
    expect(getCalled).toBe(true);
  });

  // Test 5: POST /score/:value is called after collision (game over)
  // gameOver() calls fetch('/score/'+score, {method:'POST'}) then location.reload()
  // Natural collision: obs moves left at 6px/frame, hits dino at obs≈60, y>140
  test('POST /score/:value is called on collision', async ({ page }) => {
    await page.route('http://localhost:3000/score', route =>
      route.fulfill({ json: { highScore: 0 } })
    );
    await page.route('http://localhost:3000/score/**', route =>
      route.fulfill({ json: {} })
    );

    // Wait for gameOver() to fire the POST before location.reload() clears the page
    const postRequest = page.waitForRequest(
      req => req.url().includes('localhost:3000/score/') && req.method() === 'POST',
      { timeout: 15000 }
    );

    await page.goto('/');
    // game loop auto-starts and collision triggers naturally within ~2s
    const req = await postRequest;
    expect(req.url()).toMatch(/localhost:3000\/score\/\d+/);
  });

});
