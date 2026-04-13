import { test, expect } from '@playwright/test';

test('on page load, UI calls GET /score from the API', async ({ page }) => {
  let getScoreCalled = false;

  await page.route('http://localhost:3000/score', route => {
    if (route.request().method() === 'GET') {
      getScoreCalled = true;
    }
    route.fulfill({ json: { highScore: 0 } });
  });

  await page.goto('/');
  expect(getScoreCalled).toBe(true);
});

test('high score displayed on page matches the value returned by the API', async ({ page }) => {
  await page.route('http://localhost:3000/score', route => {
    route.fulfill({ json: { highScore: 42 } });
  });

  await page.goto('/');

  const highScoreEl = page.locator('[aria-label="high-score"]');
  await expect(highScoreEl).toContainText('42');
});

test('after game over, UI calls POST /score/:value with the current score', async ({ page }) => {
  await page.route('http://localhost:3000/score', route => {
    route.fulfill({ json: { highScore: 0 } });
  });

  const postRequest = page.waitForRequest(
    req => req.url().includes('localhost:3000/score/') && req.method() === 'POST',
    { timeout: 10000 }
  );

  await page.route('http://localhost:3000/score/**', route => {
    route.fulfill({ json: { highScore: 0 } });
  });

  await page.goto('/');

  const req = await postRequest;
  expect(req.url()).toMatch(/localhost:3000\/score\/\d+/);
});
