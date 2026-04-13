# Exercise 07 — Copilot CLI: Natural Language Test Commands

**Duration**: 10 minutes  
**Copilot Feature**: GitHub Copilot CLI (`gh copilot suggest` / `gh copilot explain`)  
**Goal**: Use natural language in the terminal to run tests, interpret failures, and get new test ideas — without memorising Playwright flags.

> **Setup already done** — Copilot CLI is installed and authenticated. Open a terminal and proceed.

---

## Step 1 — Run Tests via Natural Language

Use `gh copilot suggest` to get the right commands without memorising flags:

```bash
gh copilot suggest "run only the functional Playwright tests in trex-runner and show failed tests inline"
```

```bash
gh copilot suggest "run all Playwright tests in trex-runner in headed mode with a list reporter"
```

```bash
gh copilot suggest "run the trex-runner API unit tests with jest and show verbose output"
```

Accept the suggested command when prompted — Copilot will execute it.

---

## Step 2 — Explain Test Output

After running tests, use `gh copilot explain` to understand what happened:

```bash
gh copilot explain "npx playwright test --reporter=list,html"
```

```bash
gh copilot explain "what does 'waiting for locator to be visible' mean in a Playwright timeout error"
```

---

## Step 3 — Diagnose a Failing Test

Intentionally break a locator in `trex-runner/tests/functional.spec.ts` (change `getByLabel('game-canvas')` to `getByLabel('wrong-label')`), then run the tests and paste the error:

```bash
gh copilot suggest "This Playwright test timed out: TimeoutError: Locator.waitFor: Timeout 30000ms exceeded — what is the most likely cause and how do I fix it?"
```

Restore the correct locator and re-run to confirm it passes.

---

## Step 4 — Generate New Test Ideas from the CLI

```bash
gh copilot suggest "suggest 5 Playwright test scenarios for a T-Rex runner game that has a canvas, a score counter, and a REST API at localhost:3000 for high scores"
```

Pick one suggestion and use Copilot Chat in VS Code to generate the test file.

---

## Step 5 — Run the Full Suite and Open the Report

```bash
gh copilot suggest "run all tests in trex-runner and open the HTML report"
```

---

## Verify

- [ ] `gh copilot suggest` returns a runnable Playwright command
- [ ] `gh copilot explain` explains a Playwright flag or error in plain English
- [ ] Diagnosed and fixed a simulated test failure using CLI prompts
- [ ] Generated at least one new test idea from the CLI

---

**Next**: [Exercise 08 — Custom Agent Test Suite](exercise-08-instruction-skills.md)
