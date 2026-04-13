# Exercise 09 — Playwright MCP: Accessibility-Based Testing

**Duration**: 10 minutes  
**Copilot Feature**: MCP (Model Context Protocol) — Playwright MCP Server  
**Goal**: Let Copilot Agent live-navigate the running game via the **accessibility tree**, inspect real elements, and generate resilient tests using only semantic locators.

---

## Why MCP?

| Approach | Semantic? | Deterministic? | LLM Cost |
|---|---|---|---|
| Screenshot + Vision | ❌ | ❌ | High |
| Raw HTML | Partial | ✅ | High |
| **Accessibility Tree (MCP)** | ✅ | ✅ | Low |

---

## Step 1 — Install the Playwright MCP Server

**Install directly into VS Code** by clicking this link in your browser:

👉 [Install Playwright MCP in VS Code]
> **Official docs**: [playwright.dev/docs/getting-started-mcp](https://playwright.dev/docs/getting-started-mcp)


**Restart VS Code** to register the MCP server.

---

## Step 2 — Start the Playwright MCP Server in Agent Mode

1. Open **Copilot Chat** (`Ctrl+Alt+I`) and switch to **Agent Mode** using the mode dropdown
2. Click the **Tools** icon (⚙) in the Copilot Chat panel header
3. In the tools list, find **playwright** (Microsoft Playwright MCP)
4. Click the **settings icon** (⚙) next to `playwright` — this opens `mcp.json` in the editor so you can confirm the config
5. Click **Start** next to `playwright` in the tools list — a green indicator confirms the server is running
6. Make sure **playwright** is toggled **ON**

> **Tip**: If you don't see `playwright` in the tools list, reload VS Code (`Ctrl+Shift+P` → `Developer: Reload Window`) and repeat from step 1.

---

## Step 2.5 — Open the App in the VS Code Browser and Share with Agent

Instead of opening an external browser window, use the **VS Code built-in browser** so everything stays inside VS Code:

1. Press `Ctrl+Shift+P` to open the Command Palette
2. Type **Simple Browser** and select **Simple Browser: Show**  
   *(or type **Browser** and select **Open Browser Tab** if available)*
3. Enter `http://127.0.0.1:8080` and press Enter — the T-Rex Runner opens in a VS Code tab
4. In the browser tab, look for the **share with agent icon** (↑ arrow or agent icon) near the address bar
5. Click it — a popup appears: **"Share this browser page with agents"**
6. Click **Allow**

The VS Code browser tab is now visible to Copilot Agent — no external browser window required. When you send the prompts in Steps 3–5, the agent interacts with this shared tab directly.

---

## How the 3 Prompts Work Together

```
Prompt 1 → Copilot reads the a11y tree → discovers: getByLabel('game-canvas'), getByLabel('high-score')
Prompt 2 → Copilot controls the browser live → finds: score is NOT in the a11y tree (canvas pixels only)
Prompt 3 → Copilot writes tests → uses only what it actually observed — no guessing
```

---

## Step 3 — Prompt 1: Inspect the Live Accessibility Tree

Both servers must be running. Send this prompt in Copilot Chat (Agent Mode):

```
Using the Playwright tool, navigate to http://127.0.0.1:8080 and describe 
the full accessibility tree of the page. List all interactive elements with 
their roles, labels, and any IDs. I need to know how to locate:
- The game canvas
- The score display
- The high score display
```

> **What MCP does:** Opens a real browser, navigates to the game, reads the browser's accessibility tree and returns a structured list of elements with their roles and labels — for example `generic "game-canvas"` and `paragraph "High Score: 0"`. This becomes your selector map.

---

## Step 4 — Prompt 2: Live Gameplay Interaction

```
Using the Playwright tool on http://127.0.0.1:8080:
1. Navigate to the game
2. Press Space to start the game
3. Wait 3 seconds
4. Report the current score value from the accessibility tree
5. Report exactly which roles and labels you used at each step
```

> **What MCP does:** Actually controls the live browser — presses the Space key, waits real time, then re-reads the accessibility tree. You will notice the score counter does **not** appear in the tree (it is drawn on canvas via `ctx.fillText`, not in the DOM). Copilot reports this and explains it must use `window.gameScore` via `evaluate` instead.

---

## Step 5 — Prompt 3: Generate Tests from the Accessibility Tree

```
Based on the accessibility tree you explored on http://127.0.0.1:8080, 
generate a Playwright TypeScript test file with these scenarios:

1. Canvas is visible (getByRole or getByLabel)
2. Score counter becomes visible after pressing Space
3. Score is greater than 0 after 3 seconds of gameplay
4. GET http://localhost:3000/score is called on page load 
   (intercept with page.route)
5. POST /score/:value is called after page reload on collision

Use ONLY accessibility-based locators (getByRole, getByLabel, getByText).
Save as trex-runner/tests/trex-mcp.spec.ts
```

> **What MCP does:** Uses the labels it discovered in Prompt 1 (`game-canvas`, `high-score`) to write locators, and the insight from Prompt 2 (score not in DOM) to use `window.gameScore` via `evaluate`. It is not guessing — it is using real observed values from the live running app.

---

## Step 6 — Run and Verify

```bash
cd trex-runner
npx playwright test tests/trex-mcp.spec.ts --reporter=list
npx playwright show-report
```

---

## Verify

- [ ] `.vscode/mcp.json` exists with the playwright server entry
- [ ] Playwright tool is toggled ON in Copilot Chat Tools panel
- [ ] Accessibility tree inspection returns structured element list for the game
- [ ] `trex-runner/tests/trex-mcp.spec.ts` generated using only accessibility locators
- [ ] Tests pass with `npx playwright test tests/trex-mcp.spec.ts`
