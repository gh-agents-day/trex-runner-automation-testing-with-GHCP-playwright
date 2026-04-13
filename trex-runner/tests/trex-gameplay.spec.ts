import { test, expect, Page } from '@playwright/test';

// Step 1 — Disable collision so the dino never triggers a page reload.
// CRITICAL: replace the full if/else as one string; replacing only the `if`
// orphans the `else` and causes a SyntaxError that kills the animation loop.
async function disableCollision(page: Page) {
  await page.route('http://127.0.0.1:8080/game.js', async (route) => {
    const response = await route.fetch();
    let body = await response.text();
    body = body.replace(
      'if(obs<70&&obs>50&&y>140)gameOver();\n else requestAnimationFrame(loop);',
      'requestAnimationFrame(loop);'
    );
    await route.fulfill({ response, body });
  });
}

// Mock the score API so tests are self-contained
async function mockApi(page: Page, highScore = 0) {
  await page.route('http://localhost:3000/**', (route) =>
    route.fulfill({ json: { highScore } })
  );
}

test.describe('T-Rex Gameplay — Keyboard Interaction', () => {

  // Step 3: Canvas must be visible immediately after navigation
  test('canvas visible before jump', async ({ page }) => {
    await disableCollision(page);
    await mockApi(page);
    await page.goto('/');
    await expect(page.getByLabel('game-canvas')).toBeVisible();
  });

  // Steps 4-6: Space triggers a jump, page must not reload (URL unchanged)
  test('page URL unchanged after Space press', async ({ page }) => {
    await disableCollision(page);
    await mockApi(page);
    await page.goto('/');

    // Step 3: canvas visible
    await expect(page.getByLabel('game-canvas')).toBeVisible();

    // Step 4: press Space — dino jumps
    await page.keyboard.press('Space');

    // Step 5: wait 1 second
    await page.waitForTimeout(1000);

    // Step 6: URL must still be the game page (no crash / reload)
    expect(page.url()).toBe('http://127.0.0.1:8080/');
  });

  // Step 7: window.gameScore accessible after jump — confirms loop is running
  test('game loop active after jump (window.gameScore accessible)', async ({ page }) => {
    await disableCollision(page);
    await mockApi(page);
    await page.goto('/');

    // Step 3: canvas visible
    await expect(page.getByLabel('game-canvas')).toBeVisible();

    // Step 4: press Space — dino jumps
    await page.keyboard.press('Space');

    // Step 5: wait 1 second
    await page.waitForTimeout(1000);

    // Step 7: window.gameScore must be a number — proves animation loop alive
    const gameScore = await page.evaluate(() => (window as any).gameScore);
    expect(gameScore).toBeDefined();
    expect(typeof gameScore).toBe('number');
  });

});
