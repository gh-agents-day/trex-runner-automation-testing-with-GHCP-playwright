# Exercise 01 — Game Launch Scenario

**Duration**: 10 minutes  
**Copilot Feature**: Agent Mode + Playwright MCP  
**Agent**: `T-Rex Visual Validator` (`.vscode/trex-visual-agent.agent.md`)  
**Goal**: Verify the T-Rex Runner game loads correctly — page renders without errors, canvas is visible, and dimensions are correct.

---

## What You Are Testing

| Check | Expected |
|---|---|
| Page loads without JS errors | No errors in console |
| Canvas is visible | `getByLabel('game-canvas')` is visible |
| Canvas dimensions | 800 × 200 pixels |
| High score display | `getByLabel('high-score')` shows "High Score: 0" |

---

## Step 1 — Show the Browser in VS Code

To watch the MCP agent automate the game **inside VS Code** (no external browser needed):

1. Press `Ctrl+Shift+P` → type **Quick Open Browser Tab** → select **Quick Open Browser Tab**
2. Enter `http://127.0.0.1:8080` and press Enter — the T-Rex Runner opens in a VS Code tab
3. Look for the **share icon** (↑ arrow) near the browser address bar
4. Click it → select **"Share this browser page with agents"** → click **Allow**

> **Headed MCP alternative**: Edit `.vscode/mcp.json` and add `"--headed"` to the `args` array under the `playwright` server entry. This opens a visible Chromium window the agent controls directly:
> ```json
> {
>   "servers": {
>     "playwright": {
>       "type": "stdio",
>       "command": "npx",
>       "args": ["@playwright/mcp@latest", "--headed"]
>     }
>   }
> }
> ```
> Restart VS Code after saving to apply the change.

---

## Step 2 — Start Both Servers

```bash
# Terminal 1
cd trex-runner/ui && npx http-server -p 8080

# Terminal 2
cd trex-runner/api && node server.js
```

---

## Step 3 — Switch to the T-Rex Visual Validator Agent

> **Pre-requisite**: All 3 agents must be created first. If you haven't done this yet, complete [Exercise 00 — Create Agents & Skill File](exercise-00-create-agents.md) before continuing.

1. Open **Copilot Chat** (`Ctrl+Alt+I`)
2. Click the mode dropdown (currently showing **Ask** or **Edit**)
3. Select **T-Rex Visual Validator** from the list

> If you don't see it, confirm the file is saved at `.vscode/trex-visual-agent.agent.md`, then reload VS Code (`Ctrl+Shift+P` → `Developer: Reload Window`).

---

## Step 4 — Send This Prompt

```
Using the Playwright MCP tool:
1. Navigate to http://127.0.0.1:8080
2. Confirm the page loaded without JavaScript errors
3. Confirm the canvas element with aria-label="game-canvas" is visible
4. Read the canvas bounding box and confirm it is 800×200 pixels
5. Confirm the high score element with aria-label="high-score" shows "High Score: 0"

Then generate a Playwright TypeScript test file covering all 4 checks.
Use only getByLabel, getByRole, or getByText locators.
Save as trex-runner/tests/trex-visual.spec.ts
```

> **What the agent does:** Opens the browser via Playwright MCP, reads the accessibility tree to discover `game-canvas` and `high-score`, measures the canvas using `boundingBox()`, and generates tests using only the elements it actually found.

---

## Step 5 — Run the Generated Tests

```bash
cd trex-runner
npx playwright test tests/trex-visual.spec.ts --reporter=list
```

Expected output:
```
✓  canvas is visible on load
✓  canvas dimensions are 800×200
✓  high score shows 0 on first load
✓  no JavaScript errors on load
```
---

## Verify

- [ ] VS Code browser (**Quick Open Browser Tab**) shows the game at `http://127.0.0.1:8080`
- [ ] Agent is set to **T-Rex Visual Validator**
- [ ] Agent navigated the browser and reported the accessibility tree
- [ ] `trex-runner/tests/trex-visual.spec.ts` was generated
- [ ] All tests pass with `npx playwright test tests/trex-visual.spec.ts`

---

**Next**: [Exercise 02 — Keyboard Interaction (Jump)](exercise-02-keyboard-interaction.md)
