# Exercise 04 — Collision & Restart Scenario

**Duration**: 10 minutes  
**Copilot Feature**: Agent Mode + Playwright MCP  
**Agent**: `T-Rex Collision Tester` (`.vscode/trex-collision-agent.agent.md`)  
**Goal**: Validate the full game-over sequence — natural collision triggers a POST to the score API, followed by a page reload.

---

## What You Are Testing

| Check | Expected |
|---|---|
| Natural collision fires within 15s | `gameOver()` called — no Space needed |
| POST `/score/:value` request sent | URL matches `/score/\d+` |
| Score posted is a number ≥ 0 | Regex: `localhost:3000/score/\d+` |
| Page reload triggered | `location.reload()` fires after POST |

---

## How the Collision Sequence Works

```
game loop auto-starts
obs starts at x=800, moves left 6px every frame
collision condition: obs < 70  &&  obs > 50  &&  y > 140
time to first collision: ~800/6 = ~133 frames = ~2.2 seconds at 60fps

gameOver() code:
  fetch('http://localhost:3000/score/' + score, { method: 'POST' })
    .finally(() => location.reload())
```

> **Do NOT disable collision here.** The collision event IS what you are testing.

---

## Step 1 — Show the Browser in VS Code

To watch the dino get hit and the page reload **inside VS Code**:

1. Press `Ctrl+Shift+P` → **Quick Open Browser Tab**
2. Enter `http://127.0.0.1:8080` and press Enter
3. Click the **share icon** near the browser address bar → **Allow**

Within ~2 seconds you will see the obstacle hit the dino, the screen flash, and the page reload.

> **Headed MCP alternative**: Ensure `.vscode/mcp.json` has `"--headed"` in the playwright args. The Chromium window shows the collision in real time — the page reloads and a new game starts automatically.

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
1. Set up a listener for POST requests to localhost:3000/score/:value BEFORE navigating
2. Navigate to http://127.0.0.1:8080 (do NOT disable collision — let it happen naturally)
3. Wait for the POST request to fire (it should happen within ~2 seconds)
4. Confirm the request URL matches the pattern localhost:3000/score/<number>
5. Confirm the page reloaded (location.reload() was called after the POST)

Then generate a Playwright TypeScript test covering all 4 checks.
Save as trex-runner/tests/trex-collision.spec.ts
```

> **What the agent does:** Sets up a `waitForRequest` interceptor targeting POST `/score/:value`, then navigates to the game and watches the natural collision happen in ~2 seconds. It confirms the request fires, validates the score value is numeric, and confirms the reload navigation. The test is written using only what the agent actually observed.

---

## Step 5 — Run the Generated Tests

```bash
cd trex-runner
npx playwright test tests/trex-collision.spec.ts --reporter=list
```

Expected output:
```
✓  collision triggers POST /score/:value
✓  page reloads after collision
```

---

## Verify

- [ ] POST to `/score/:value` observed in browser network activity
- [ ] Page reload triggered within ~2 seconds of navigation
- [ ] Agent reported correct score value in POST URL
- [ ] `trex-runner/tests/trex-collision.spec.ts` generated
- [ ] All tests pass with `npx playwright test tests/trex-collision.spec.ts`

---

**Next**: [Exercise 09 — Multiple Jump Stability](exercise-09-multiple-jumps.md)
