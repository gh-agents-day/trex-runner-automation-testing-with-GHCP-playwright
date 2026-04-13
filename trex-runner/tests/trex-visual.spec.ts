import { test, expect, Page } from '@playwright/test';

// Helper: mock API so high score is always 0 in visual tests
async function mockApi(page: Page, highScore = 0) {
  await page.route('http://localhost:3000/**', route =>
    route.fulfill({ json: { highScore } })
  );
}

test.describe('T-Rex Visual Validation', () => {

  test('page loads without JavaScript errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await mockApi(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors, `Unexpected JS errors: ${errors.join(', ')}`).toHaveLength(0);
  });

  test('canvas element with aria-label="game-canvas" is visible', async ({ page }) => {
    await mockApi(page);
    await page.goto('/');
    await expect(page.getByLabel('game-canvas')).toBeVisible();
  });

  test('canvas bounding box is 800×200 pixels', async ({ page }) => {
    await mockApi(page);
    await page.goto('/');
    const canvas = page.getByLabel('game-canvas');
    await expect(canvas).toBeVisible();
    const box = await canvas.boundingBox();
    expect(box?.width).toBe(800);
    expect(box?.height).toBe(200);
  });

  test('high score element shows "High Score: 0"', async ({ page }) => {
    await mockApi(page, 0);
    await page.goto('/');
    await expect(page.getByLabel('high-score')).toHaveText('High Score: 0');
  });

});
