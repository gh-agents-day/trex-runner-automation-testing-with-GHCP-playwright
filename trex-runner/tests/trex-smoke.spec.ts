import { test, expect } from '@playwright/test';

test.use({ trace: 'on-first-retry' });

test('game canvas is visible on load', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#game')).toBeVisible();
});

test('score increases from 0 after pressing Space', async ({ page }) => {
  await page.route('http://127.0.0.1:8080/game.js', async route => {
    const response = await route.fetch();
    let body = await response.text();
    // Replace the full if/else — commenting out only the if orphans the else (SyntaxError)
    body = body.replace(
      'if(obs<70&&obs>50&&y>140)gameOver();\n else requestAnimationFrame(loop);',
      'requestAnimationFrame(loop);'
    );
    await route.fulfill({ response, body });
  });

  await page.route('http://localhost:3000/**', route =>
    route.fulfill({ json: { highScore: 0 } })
  );

  await page.goto('/');
  await expect(page.locator('#game')).toBeVisible();
  await page.keyboard.press('Space');

  await page.waitForFunction(() => (window as any).gameScore > 0, { timeout: 10000 });
  const score = await page.evaluate(() => (window as any).gameScore);
  expect(score).toBeGreaterThan(0);
});
