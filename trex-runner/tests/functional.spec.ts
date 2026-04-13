import { test, expect } from '@playwright/test';

// Helper: patch game.js to remove collision so dino survives and score increments
async function routeWithoutCollision(page: any) {
  await page.route('http://127.0.0.1:8080/game.js', async (route: any) => {
    const response = await route.fetch();
    let body = await response.text();
    // Replace the full if/else — patching only the `if` orphans the `else` (SyntaxError)
    body = body.replace(
      'if(obs<70&&obs>50&&y>140)gameOver();\n else requestAnimationFrame(loop);',
      'requestAnimationFrame(loop);'
    );
    await route.fulfill({ response, body });
  });
}

// Helper: mock API responses (GET + POST /score)
async function mockApi(page: any) {
  await page.route('http://localhost:3000/score', route =>
    route.fulfill({ json: { highScore: 0 } })
  );
  await page.route('http://localhost:3000/score/**', route =>
    route.fulfill({ json: { highScore: 0 } })
  );
}

test.describe('T-Rex Runner — Functional Tests', () => {

  test('Canvas is visible on load', async ({ page }) => {
    await mockApi(page);
    await page.goto('/');
    await expect(page.getByLabel('wrong-label')).toBeVisible();
  });

  test('Game starts on Space key', async ({ page }) => {
    await mockApi(page);
    await routeWithoutCollision(page);
    await page.goto('/');
    await page.waitForFunction(() => (window as any).gameScore !== undefined);
    await page.keyboard.press('Space');
    const score = await page.evaluate(() => (window as any).gameScore);
    expect(score).toBeGreaterThanOrEqual(0);
    await expect(page.getByLabel('game-canvas')).toBeVisible();
  });

  test('Score increments during gameplay', async ({ page }) => {
    await mockApi(page);
    await routeWithoutCollision(page);
    await page.goto('/');
    await page.keyboard.press('Space');
    await page.waitForFunction(() => (window as any).gameScore > 0, { timeout: 10000 });
    const score = await page.evaluate(() => (window as any).gameScore);
    expect(score).toBeGreaterThan(0);
  });

  test('API GET /score is called on page load', async ({ page }) => {
    let getCalled = false;
    await page.route('http://localhost:3000/score', route => {
      if (route.request().method() === 'GET') getCalled = true;
      route.fulfill({ json: { highScore: 42 } });
    });
    await page.goto('/');
    await expect(page.getByLabel('high-score')).toContainText('42');
    expect(getCalled).toBe(true);
  });

  test('API POST /score is called after game over', async ({ page }) => {
    await page.route('http://localhost:3000/score', route =>
      route.fulfill({ json: { highScore: 0 } })
    );
    const postRequest = page.waitForRequest(
      req => req.url().includes('localhost:3000/score/') && req.method() === 'POST',
      { timeout: 10000 }
    );
    await page.route('http://localhost:3000/score/**', route =>
      route.fulfill({ json: { highScore: 0 } })
    );
    await page.goto('/');
    const req = await postRequest;
    expect(req.url()).toMatch(/localhost:3000\/score\/\d+/);
  });

});

test.describe('T-Rex Runner — Edge Case Tests', () => {

  test('POST /score/0 does not overwrite an existing positive high score', async ({ request }) => {
    // Set a positive high score first
    await request.post('http://localhost:3000/score/50');

    // Attempt to overwrite with 0 — should be rejected
    const res = await request.post('http://localhost:3000/score/0');
    const body = await res.json();
    expect(body.highScore).toBe(50);
  });

  test('POST /score with a non-numeric value — score is unchanged', async ({ request }) => {
    // Seed a known score
    await request.post('http://localhost:3000/score/30');

    // POST a non-numeric value — NaN is not > 30 so highScore stays
    const res = await request.post('http://localhost:3000/score/abc');
    const body = await res.json();
    expect(body.highScore).toBe(30);
  });

  test('Rapid page reload — GET /score is called each time', async ({ page }) => {
    let callCount = 0;

    await page.route('http://localhost:3000/score', route => {
      if (route.request().method() === 'GET') callCount++;
      route.fulfill({ json: { highScore: 0 } });
    });
    await page.route('http://localhost:3000/score/**', route =>
      route.fulfill({ json: { highScore: 0 } })
    );

    await page.goto('/');
    await page.goto('/');
    await page.goto('/');

    expect(callCount).toBeGreaterThanOrEqual(3);
  });

});