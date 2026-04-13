# Exercise 06 — Functional E2E Tests with Playwright (Local)

**Duration**: 10 minutes  
**Copilot Feature**: Copilot Chat — Ask Mode  
**Goal**: Use Copilot Chat to generate and run full functional (end-to-end) Playwright tests for the T-Rex Runner game — covering the game flow, score display, and API interaction.

---

## App Scenarios to Test

| # | Scenario | What it validates |
|---|----------|-------------------|
| 1 | Canvas loads on page load | UI renders correctly |
| 2 | Space key starts the game | Game responds to input |
| 3 | Score increments during play | Core game logic works |
| 4 | `GET /score` called on page load | UI fetches high score from API |
| 5 | `POST /score/:value` called after game over | UI submits score to API |
| 6 | Lower score does not replace high score | API business rule enforced |

---

## Step 1 — Generate Functional Tests with Copilot Chat

Open **Copilot Chat** (`Ctrl+Alt+I`) and send:

```
Generate a Playwright TypeScript functional test file for the T-Rex Runner game.
The game runs at http://127.0.0.1:8081. The API runs at http://localhost:3000.

Include these test cases:
1. "Canvas is visible on load" — navigate to / and assert the canvas element is visible
2. "Game starts on Space key" — press Space, assert the score text becomes visible
3. "Score increments during gameplay" — press Space, wait 2 seconds, 
   assert the score element shows a number greater than 0
4. "API GET /score is called on page load" — use page.route() to intercept 
   GET http://localhost:3000/score and assert it is called within 2 seconds
5. "API POST /score is called after game over" — intercept POST /score/* 
   and assert it is called when the page reloads after a collision

Use getByRole, getByLabel, or getByText locators — no CSS selectors.
Save as trex-runner/tests/functional.spec.ts
```

---

## Step 2 — Run the Tests

```bash
cd trex-runner
npx playwright test tests/functional.spec.ts --headed --reporter=list
```

`--headed` shows the browser live so you can watch each step execute.

---

## Step 3 — View the HTML Report

```bash
npx playwright show-report
```

The report shows pass/fail per test, timing, screenshots on failure, and a trace link.

---

## Step 4 — Generate Negative / Edge Case Tests

Send this follow-up prompt in Copilot Chat:

```
For the T-Rex Runner API at http://localhost:3000, generate Playwright 
tests for these edge cases:
1. POST /score/0 does not overwrite an existing positive high score
2. POST /score with a non-numeric value — assert the score is unchanged
3. Rapid page reload — assert GET /score is called each time

Add these as a separate describe block in trex-runner/tests/functional.spec.ts
```

---

## Step 5 — Fix a Failing Test with Copilot Chat

If any test fails, select the error output and send:

```
This Playwright test is failing:
[paste test name and error]

The game canvas is rendered as a <canvas> element in index.html.
The score is displayed as text inside the canvas via ctx.fillText().
Suggest the correct locator and assertion strategy.
```

---

## Step 6 — Run All Tests from the VS Code Testing Panel

1. Open the **Testing** folder inside the **trex-runner**
2. Expand the tree to see all spec files
3. Click ▶ next to `functional.spec.ts` to run without the terminal
4. Click a failed test to jump directly to the failing line

---

## Verify

- [ ] `trex-runner/tests/functional.spec.ts` generated with 5+ tests
- [ ] Tests run with `npx playwright test tests/functional.spec.ts --reporter=list`
- [ ] HTML report opens and shows results
- [ ] Tests use accessibility-based locators (no raw CSS selectors)
- [ ] Edge case tests cover at least one negative scenario

---

**Next**: [Exercise 07 — Copilot CLI: Natural Language Test Commands](exercise-07-copilot-cli.md)
