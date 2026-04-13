# Exercise 03 — Continuous Gameplay Scenario

**Duration**: 10 minutes  
**Copilot Feature**: Agent Mode + Playwright MCP  
**Agent**: `T-Rex Gameplay Tester` (`.vscode/trex-gameplay-agent.agent.md`)  
**Goal**: Verify the game keeps running for 3–5 seconds without JavaScript errors, infinite reloads, or a frozen score.

---

## What You Are Testing

| Check | Expected |
|---|---|
| No JS errors after 4 seconds | `page.on('pageerror')` captures nothing |
| Page URL unchanged | Still `http://127.0.0.1:8080/` — no reload loop |
| Score has incremented | `window.gameScore > 0` after 4 seconds |

---

## Why This Matters

A game that crashes silently (no visible error, but animation loop frozen) will show a score of `0` forever. A game that reloads in a loop is equally broken but harder to detect without URL monitoring. This test catches both failure modes.

---

## Step 1 — Show the Browser in VS Code

1. Press `Ctrl+Shift+P` → **Quick Open Browser Tab**
2. Enter `http://127.0.0.1:8080` and press Enter
3. Click the **share icon** near the browser address bar → **Allow**

You will see the game running for 4 seconds in the shared browser tab — no interaction from you.

> **Headed MCP alternative**: Ensure `.vscode/mcp.json` has `"--headed"` in the playwright args. A live Chromium window shows the obstacle cycling, the score climbing, and no crashes during the 4-second window.

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
1. Disable the collision so the game runs without resetting
2. Navigate to the game and register a JS error listener
3. Wait 4 seconds (the game loop runs automatically — no Space needed)
4. Check the page URL is still http://127.0.0.1:8080/ (confirm no reload loop)
5. Read window.gameScore — it must be greater than 0
6. Report any JavaScript errors that fired during the 4 seconds

Then generate a Playwright TypeScript test covering all checks.
Add the test to trex-runner/tests/trex-gameplay.spec.ts (add a new describe block or test, do not replace existing tests)
```

> **What the agent does:** Runs the game for 4 real seconds in the browser, monitors the console for errors and URL changes, reads `window.gameScore` at the end, then writes a test that asserts all three conditions. The `obs -= 6` mechanic cycles every ~130 frames (~2s at 60fps), so score should be at least 2 after 4 seconds.

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
```

---

## Verify

- [ ] Browser tab stays on `http://127.0.0.1:8080/` for 4 seconds
- [ ] No error banners or console errors in VS Code browser
- [ ] `window.gameScore > 0` after 4 seconds
- [ ] Tests pass with `npx playwright test tests/trex-gameplay.spec.ts`

---

**Next**: [Exercise 08 — Collision & Restart](exercise-08-collision-restart.md)
