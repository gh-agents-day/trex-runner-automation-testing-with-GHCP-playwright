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

## Step 1 — Verify MCP is Configured

Check `.vscode/mcp.json` exists at the repo root:

```json
{
  "servers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

If it doesn't exist, run:

```bash
code --add-mcp '{"name":"playwright","command":"npx","args":["@playwright/mcp@latest"]}'
```

Then restart VS Code.

---

## Step 2 — Enable Playwright Tool in Agent Mode

1. Open **Copilot Chat** → switch to **Agent Mode**
2. Click the **Tools** icon in the chat panel header
3. Toggle **playwright** → **ON**

---

## Step 3 — Inspect the Live Accessibility Tree

Both servers must be running. Send this prompt in Copilot Chat (Agent Mode):

```
Using the Playwright tool, navigate to http://127.0.0.1:8081 and describe 
the full accessibility tree of the page. List all interactive elements with 
their roles, labels, and any IDs. I need to know how to locate:
- The game canvas
- The score display
- The high score display
```

**Expected:** A structured list of element roles and labels — this becomes your selector map.

---

## Step 4 — Live Gameplay Interaction

```
Using the Playwright tool on http://127.0.0.1:8081:
1. Navigate to the game
2. Press Space to start the game
3. Wait 3 seconds
4. Report the current score value from the accessibility tree
5. Report exactly which roles and labels you used at each step
```

---

## Step 5 — Generate Tests from the Accessibility Tree

```
Based on the accessibility tree you explored on http://127.0.0.1:8081, 
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
