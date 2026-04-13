# Exercise 04 — Integration Tests with Playwright + HTML Report

**Duration**: 5 minutes  
**Copilot Feature**: Copilot Chat — Ask Mode  
**Goal**: Use Copilot Chat to generate Playwright integration tests that verify the UI and API work correctly together — the game fetches and displays the high score, and posts the score after a game over. Then view results in the HTML report.

---

## Background

Integration tests sit between unit tests and full end-to-end tests. They verify that **two components work together correctly** — in this case, that the T-Rex Runner UI correctly communicates with the high-score API. Playwright's `page.route()` lets you intercept and assert HTTP calls made by the browser, making it the ideal tool for this level of testing.

| Component A | Interaction | Component B |
|---|---|---|
| Game UI (`index.html`) | `GET /score` on load | High Score API |
| Game UI | `POST /score/:value` on game over | High Score API |

---

## Step 1 — Generate Integration Tests (Copilot Chat)

**Configure Copilot Chat:**
1. Open **Copilot Chat** (`Ctrl+Alt+I`)
2. Set mode to **Ask**
3. Set model to **Claude Sonnet 4.6**

Send this prompt:

```
Generate Playwright TypeScript integration tests for the T-Rex Runner.
The UI is at http://127.0.0.1:8080 and the API is at http://localhost:3000.

Test these scenarios:
1. On page load, the UI calls GET http://localhost:3000/score 
   (use page.route() to intercept and assert the request is made)
2. After game over, the UI calls POST /score/:value with the correct score
3. The displayed high score on the page matches what the API returns

Save as trex-runner/tests/integration.spec.ts
```

---

## Step 2 — Run Integration Tests

Make sure both servers are still running (from Exercise 02), then:

```bash
cd trex-runner
npx playwright test tests/integration.spec.ts --reporter=list,html
```

Expected:
```
✓ on page load, UI calls GET /score from the API
✓ high score displayed on page matches the value returned by the API
✓ after game over, UI calls POST /score/:value with the current score
```

---

## Step 3 — View the HTML Report

```bash
npx playwright show-report
```

This opens an interactive report in your browser showing:
- Pass/fail status per test
- Timeline of each test step
- Screenshots on failure
- Network requests intercepted by `page.route()`

> **Note**: `show-report` requires `html` to be included in the `--reporter` flag when running tests (as above). `--reporter=list` alone only writes to the terminal.

---

## Verify

- [ ] `trex-runner/tests/integration.spec.ts` exists
- [ ] All 3 integration tests pass with `npx playwright test tests/integration.spec.ts`
- [ ] `npx playwright show-report` opens the HTML report in the browser
- [ ] Tests use `page.route()` to intercept API calls

---

**Next**: [Exercise 05 — Copilot Chat Agent Mode: Generate UI Tests](exercise-05-local-agent-ui-test.md)
