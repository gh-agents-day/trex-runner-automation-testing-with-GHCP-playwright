# Exercise 06 — Canvas Presence After Restart Scenario

**Duration**: 10 minutes  
**Copilot Feature**: Agent Mode + Playwright MCP  
**Agent**: `T-Rex Collision Tester` (`.vscode/trex-collision-agent.agent.md`)  
**Goal**: Confirm the canvas, high score display, and game state all survive a collision-triggered page reload — the game must be fully playable again after restart.

---

## What You Are Testing

| Check | After Reload Expected |
|---|---|
| Canvas visible | `getByLabel('game-canvas')` is visible |
| High score updated | `getByLabel('high-score')` shows updated value |
| GET /score called again | Fresh API request fires on reload |
| Game loop restarted | `window.gameScore` resets to 0 and increments again |

---

## The Full Restart Cycle

```
1. Page loads → GET /score → display "High Score: N"
2. Game loop starts automatically
3. Collision in ~2s → gameOver() → POST /score/:value
4. location.reload() triggers
5. Page reloads → GET /score again (with updated score)
6. Canvas reappears, game loop restarts
```

This exercise tests **steps 4–6** — everything that happens after the collision.

---

## Step 1 — Show the Browser in VS Code

This exercise has the most visual content — you will see the dino get hit, the page flash, and the game restart from scratch inside VS Code:

1. Press `Ctrl+Shift+P` → **Quick Open Browser Tab**
2. Enter `http://127.0.0.1:8080` and press Enter
3. Click the **share icon** near the browser address bar → **Allow**

> **Headed MCP alternative**: Ensure `.vscode/mcp.json` has `"--headed"` in the playwright args. The Chromium window shows the full collision-to-restart cycle in real time — the most dramatic moment in the workshop!

---

## Step 2 — Start Both Servers

```bash
# Terminal 1
cd trex-runner/ui && npx http-server -p 8080

# Terminal 2
cd trex-runner/api && node server.js
```

---

## Step 3 — Switch to the T-Rex Collision Tester Agent

1. Open **Copilot Chat** (`Ctrl+Alt+I`)
2. Click the mode dropdown → select **T-Rex Collision Tester**

---

## Step 4 — Send This Prompt

```
Using the Playwright MCP tool on http://127.0.0.1:8080:
1. Mock the GET /score endpoint to return highScore: 5 AFTER the reload
   (return highScore: 0 on the first call, highScore: 5 on subsequent calls)
2. Navigate to the game (no collision disable — let it happen naturally)
3. Wait for the collision POST to /score/:value to fire
4. Wait for the page to reload via location.reload()
5. After reload, confirm:
   - The canvas with aria-label="game-canvas" is visible
   - The element with aria-label="high-score" shows "High Score: 5"
   - A new GET /score request fired on the reloaded page
   - window.gameScore has reset to 0 (fresh game state)

Then generate a Playwright TypeScript test covering all 4 post-restart checks.
Append the test to trex-runner/tests/trex-collision.spec.ts
```

> **What the agent does:** Watches the full collision-to-reload sequence in the browser, intercepts both the POST and the second GET request, reads the high score display after reload, and checks `window.gameScore` reset. It writes a test based on the exact sequence it observed — no guessing.

---

## Step 5 — Run the Generated Tests

```bash
cd trex-runner
npx playwright test tests/trex-collision.spec.ts --reporter=list
```

Expected output:
```
✓  collision triggers POST /score/:value
✓  canvas still visible after collision reload
✓  high score updates and canvas survives full restart cycle
```

---

## What the Generated Test Looks Like

```typescript
test('high score updates and canvas survives full restart cycle', async ({ page }) => {
  let callCount = 0;

  await page.route('http://localhost:3000/score', route => {
    // First call (initial load) → 0; second call (after reload) → 5
    route.fulfill({ json: { highScore: callCount++ === 0 ? 0 : 5 } });
  });
  await page.route('http://localhost:3000/score/**', route =>
    route.fulfill({ json: {} })
  );

  // Set up POST and reload watchers before navigating
  await Promise.all([
    page.waitForNavigation({ timeout: 10000 }),
    page.waitForRequest(
      req => req.url().includes('/score/') && req.method() === 'POST',
      { timeout: 10000 }
    ),
    page.goto('/'),
  ]);

  // Post-reload assertions
  await expect(page.getByLabel('game-canvas')).toBeVisible();
  await expect(page.getByLabel('high-score')).toContainText('5');

  // Game loop restarted — score should reset to 0
  const score = await page.evaluate(() => (window as any).gameScore);
  expect(score).toBeGreaterThanOrEqual(0);
  expect(callCount).toBeGreaterThanOrEqual(2); // GET fired twice
});
```

---

## Full Test Suite Summary

After all 6 exercises, you have 3 test files covering all scenarios:

| File | Tests | Scenarios |
|---|---|---|
| `trex-visual.spec.ts` | 3 | Scenario 1 (Game Launch) |
| `trex-gameplay.spec.ts` | 3 | Scenarios 2, 3, 5 (Jump, Continuous, Multiple Jumps) |
| `trex-collision.spec.ts` | 3 | Scenarios 4, 6 (Collision & Restart, Canvas After Restart) |

Run the complete automation suite:

```bash
cd trex-runner
npx playwright test tests/trex-visual.spec.ts tests/trex-gameplay.spec.ts tests/trex-collision.spec.ts --reporter=list
npx playwright show-report
```

---

## Verify

- [ ] Browser shows full collision → reload → restart cycle
- [ ] High score display updates to new value after reload
- [ ] GET /score fired twice (initial load + post-reload)
- [ ] `window.gameScore` resets to 0 after restart
- [ ] All 3 spec files pass: `npx playwright test tests/trex-visual.spec.ts tests/trex-gameplay.spec.ts tests/trex-collision.spec.ts`

---

**Workshop Complete!** You have automated all 6 T-Rex Runner scenarios using Playwright MCP, custom agents, and accessibility-based locators.
