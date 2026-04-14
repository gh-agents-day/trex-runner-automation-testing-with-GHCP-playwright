# Exercise 06 — Keyboard Interaction (Jump) Scenario

**Duration**: 10 minutes  
**Copilot Feature**: Agent Mode + Playwright MCP  
**Agent**: `T-Rex Gameplay Tester` (`.github/trex-gameplay-agent.agent.md`)  
**Goal**: Validate that the Space bar makes the dino jump and the page does not crash or reload after the interaction.

---

## What You Are Testing

| Check | Expected |
|---|---|
| Canvas visible before interaction | `getByLabel('game-canvas')` visible |
| Space key press accepted | No error, no reload |
| Page URL unchanged after jump | Still `http://127.0.0.1:8080/` |
| Game loop still running after jump | `window.gameScore` accessible |

---

## Step 1 — Show the Browser in VS Code

To watch the agent press Space and observe the dino jump **inside VS Code**:

1. Press `Ctrl+Shift+P` → type **Quick Open Browser Tab** → select **Quick Open Browser Tab**
2. Enter `http://127.0.0.1:8080` and press Enter
3. Look for the **share icon** (↑ arrow) near the browser address bar
4. Click it → select **"Share this browser page with agents"** → click **Allow**

> **Headed MCP alternative**: Ensure `.vscode/mcp.json` has `"--headed"` in the playwright args (see [Exercise 05, Step 1](exercise-05-game-launch.md) for full config). A Chromium window opens and you can watch every key press live.

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
1. Disable the collision so the game runs continuously
2. Navigate to the game
3. Confirm the canvas with aria-label="game-canvas" is visible
4. Press Space to make the dino jump
5. Wait 1 second
6. Confirm the page URL is still http://127.0.0.1:8080/ (no crash or reload)
7. Confirm window.gameScore is accessible (game loop still running)

Then generate a Playwright TypeScript test covering all steps.
Use only getByLabel, getByRole, or getByText locators.
Save as trex-runner/tests/trex-gameplay.spec.ts
```

> **What the agent does:** Intercepts `game.js` to disable collision, navigates to the game, presses Space (you can see the dino jump in the shared browser), waits, reads the page URL and `window.gameScore`, then writes a test based on what it actually observed.

---

## Step 5 — Run the Generated Tests

```bash
cd trex-runner
npx playwright test tests/trex-gameplay.spec.ts --reporter=list
```

Expected output:
```
✓  canvas visible before jump
✓  page URL unchanged after Space
✓  game loop active after jump
```

---

## Verify

- [ ] VS Code browser (**Quick Open Browser Tab**) shows the game at `http://127.0.0.1:8080`
- [ ] Agent is set to **T-Rex Gameplay Tester**
- [ ] Browser shows dino jumping when Space is pressed
- [ ] Page URL remains unchanged after jump
- [ ] `trex-runner/tests/trex-gameplay.spec.ts` generated
- [ ] All tests pass with `npx playwright test tests/trex-gameplay.spec.ts`

---

**Next**: [Exercise 07 — Continuous Gameplay](exercise-07-continuous-gameplay.md)
