# Exercise 08 — Custom Agent: Full Test Suite Orchestration

**Duration**: 10 minutes  
**Copilot Feature**: Copilot Chat — Agent Mode + Custom Instructions  
**Goal**: Define a reusable custom agent instruction file so Copilot knows your app deeply, then use Agent Mode to generate, run, and fix all three test types — unit, integration, and E2E — in a single conversation.

---

## Step 1 — Create Custom Agent Instructions

Create `.github/copilot-instructions.md` at the repository root:

```markdown
# T-Rex Runner — Copilot Agent Instructions

## Application
- UI: T-Rex Runner game at http://127.0.0.1:8081
- API: Express high-score server at http://localhost:3000
- API source: trex-runner/api/server.js
- Game source: trex-runner/ui/game.js

## API Behaviour
- GET /score → returns { highScore: number }
- POST /score/:value → updates highScore only when new value is HIGHER
- Score resets to 0 on server restart

## Test Conventions
- Unit tests (API): Jest + supertest, saved in trex-runner/api/
- Integration tests: Playwright with page.route() for API interception, trex-runner/tests/
- E2E tests: Playwright TypeScript, trex-runner/tests/
- Locators: always use getByRole, getByLabel, or getByText — no CSS selectors
- Test names must describe the scenario in plain English

## Run Commands
- API unit tests: cd trex-runner/api && npx jest --verbose
- All Playwright tests: cd trex-runner && npx playwright test --reporter=list
- Headed run: npx playwright test --headed
- HTML report: npx playwright show-report
```

---

## Step 2 — Agent Mode: Generate the Full Test Suite

Open **Copilot Chat** → switch to **Agent Mode**, then send:

```
Using the context in .github/copilot-instructions.md, generate a complete 
test suite for the T-Rex Runner application covering all three levels:

UNIT (trex-runner/api/score.test.js):
- GET /score returns { highScore: 0 } initially
- POST /score/100 sets highScore to 100
- POST /score/50 does not lower highScore from 100
- POST /score/200 updates highScore to 200

INTEGRATION (trex-runner/tests/integration.spec.ts):
- Page load triggers GET http://localhost:3000/score (intercept with page.route)
- Game over triggers POST /score/:value with the correct score
- High score displayed on page matches the API response

E2E (trex-runner/tests/e2e.spec.ts):
- Canvas is visible on load
- Space key starts the game and reveals the score counter
- Score is greater than 0 after 3 seconds of play
- Page reload fetches updated high score from API

After generating the files, run the Playwright tests and report results.
```

---

## Step 3 — Agent Mode: Run and Fix

After running, if tests fail, send:

```
The following tests are failing:
[paste the npx playwright test output]

Look at trex-runner/ui/index.html and trex-runner/ui/game.js to find 
the correct element structure. Fix the failing locators and re-run.
```

The agent reads the source files, corrects the selectors, writes the updated tests, and re-runs.

---

## Step 4 — Agent Mode: Discover Edge Cases

```
Act as a QA engineer testing the T-Rex Runner app at http://127.0.0.1:8081.
Using what you know about the app from .github/copilot-instructions.md:
1. Identify 3 untested edge cases or potential bugs
2. Generate Playwright tests for each in trex-runner/tests/exploratory.spec.ts
3. Run them and report which pass and which expose real issues
```

---

## Step 5 — Invoke via Skill (Optional)

Create `.github/skills/run-tests/SKILL.md`:

```markdown
# Run Full Test Suite

## Description
Runs all tests for the T-Rex Runner — API unit tests and Playwright tests.
Assumes both servers are already running.

## Steps
1. cd trex-runner/api && npx jest --verbose
2. cd trex-runner && npx playwright test --reporter=list
3. npx playwright show-report
```

In Copilot Chat (Agent Mode):
```
Use the skill at .github/skills/run-tests/SKILL.md to run all tests and summarise results.
```

---

## Verify

- [ ] `.github/copilot-instructions.md` created with app context
- [ ] Agent Mode generates all three test files (unit, integration, E2E)
- [ ] `npx jest --verbose` passes all API unit tests
- [ ] `npx playwright test --reporter=list` passes integration and E2E tests
- [ ] Agent fixes at least one failing test by reading source files
- [ ] `npx playwright show-report` shows full results

---

**Next**: [Exercise 09 — Playwright MCP: Accessibility-Based Testing](exercise-09-playwright-mcp.md)
