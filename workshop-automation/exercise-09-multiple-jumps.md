# Exercise 05 — Multiple Jump Stability Scenario

**Duration**: 10 minutes  
**Copilot Feature**: Agent Mode + Playwright MCP  
**Agent**: `T-Rex Gameplay Tester` (`.vscode/trex-gameplay-agent.agent.md`)  
**Goal**: Ensure the game handles rapid repeated Space presses without crashing, freezing, or triggering an unintended reload.

---

## What You Are Testing

| Check | Expected |
|---|---|
| 10 rapid Space presses accepted | No JS errors thrown |
| Canvas still visible after all jumps | `getByLabel('game-canvas')` visible |
| Game loop still running | `window.gameScore >= 0` |
| Page URL unchanged | No crash-triggered reload |

---

## Why This Test Matters

The jump mechanic only fires when `y >= 150` (dino is on the ground). Rapid presses while mid-air are silently ignored. However, edge cases can occur:
- Input event queue overflow
- `vy` accumulation causing the dino to fly off-screen
- Rare collision timing during the jump arc

This test confirms the game is **stable under stress input**, not just under normal use.

---

## Step 1 — Show the Browser in VS Code

1. Press `Ctrl+Shift+P` → **Quick Open Browser Tab**
2. Enter `http://127.0.0.1:8080` and press Enter
3. Click the **share icon** near the browser address bar → **Allow**

You will see the dino jumping repeatedly as the agent sends 10 Space key events in quick succession.

> **Headed MCP alternative**: Ensure `.vscode/mcp.json` has `"--headed"` in the playwright args. The live Chromium window shows every jump event — great for spotting visual glitches like the dino sticking in the air.

---

## Step 2 — Start Both Servers

```bash
# Terminal 1
cd trex-runner/ui && npx http-server -p 8080

# Terminal 2
cd trex-runner/api && node server.js
```

---

## Step 3 — Switch to the T-Rex Gameplay Tester Agent

1. Open **Copilot Chat** (`Ctrl+Alt+I`)
2. Click the mode dropdown → select **T-Rex Gameplay Tester**

---

## Step 4 — Send This Prompt

```
Using the Playwright MCP tool on http://127.0.0.1:8080:
1. Disable the collision so jumps don't accidentally trigger game over
2. Navigate to the game and register a JS error listener
3. Press Space 10 times with 200ms between each press
4. After all presses, confirm:
   - The canvas with aria-label="game-canvas" is still visible
   - window.gameScore is 0 or more (game loop still running)
   - The page URL is still http://127.0.0.1:8080/ (no crash reload)
   - No JavaScript errors were thrown

Then generate a Playwright TypeScript test covering all checks.
Append the test to trex-runner/tests/trex-gameplay.spec.ts
```

> **What the agent does:** Fires 10 rapid keyboard events in the shared browser (you can watch the dino bouncing), then reads `window.gameScore`, the current URL, and any caught console errors — and writes a test that asserts all conditions it verified live.

---

## Step 5 — Run the Generated Tests

```bash
cd trex-runner
npx playwright test tests/trex-gameplay.spec.ts --reporter=list
```

Expected output:
```
✓  Space bar jump does not crash the game
✓  game runs for 4 seconds without errors or reload
✓  rapid Space presses do not crash or freeze the game
```
---

## Verify

- [ ] Browser shows dino bouncing during rapid Space presses
- [ ] Canvas still visible after all 10 presses
- [ ] No console errors in the VS Code browser
- [ ] Tests pass with `npx playwright test tests/trex-gameplay.spec.ts`

---

**Next**: [Exercise 10 — Canvas Presence After Restart](exercise-10-canvas-after-restart.md)
