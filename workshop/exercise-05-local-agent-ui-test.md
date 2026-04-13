# Exercise 05 — Copilot Chat Agent Mode: Generate Your First UI Test

**Duration**: 10 minutes  
**Copilot Feature**: Copilot Chat — Agent Mode (available on all plans)  
**Goal**: Use Copilot Chat in Agent Mode to generate a smoke test for the T-Rex Runner, run it, and apply resilient locator patterns.

---

## Background

Writing Playwright boilerplate — page setup, waits, assertions, tracing config — is mechanical work that Copilot can draft instantly. **Copilot Chat in Agent Mode** reads your project context and generates runnable test code that you validate and refine, keeping you focused on *what* to test rather than *how* to wire it up.

> **Availability**: Copilot Chat Agent Mode is available on all GitHub Copilot plans — Individual, Team, and Enterprise. No enterprise licence is required for this exercise.

---

## Step 1 — Generate a Smoke Test with Copilot Chat (Agent Mode)

1. Ensure both servers are running (see Exercise 02).
2. Open the **Copilot Chat** panel (`Ctrl+Alt+I` / `Cmd+Option+I`).
3. In the chat box, switch to **Agent Mode** using the mode dropdown (select **Agent** — not Ask or Edit).
4. Send this prompt:

```
Create a Playwright test in TypeScript that:
1. Opens http://127.0.0.1:8080
2. Asserts the game canvas element is visible
3. Simulates one jump (press the Space bar key)
4. Waits until the score text increases from 0
5. Captures a trace on the first retry

Save it as trex-runner/tests/trex-smoke.spec.ts
```

4. Review the generated code. Copilot should produce a test that:
   - Imports necessary Playwright modules
   - Creates a `test` block and navigates to the URL
   - Locates the game canvas
   - Simulates a Space key press
   - Waits for the score to update
   - Includes `test.use({ trace: 'on-first-retry' })`

5. Create `trex-runner/tests/trex-smoke.spec.ts` and paste the generated code.

> **Tip**: `trace: 'on-first-retry'` records a full trace only when a test fails and is retried — perfect for debugging without the overhead of tracing every run.

---

## Step 2 — Run the Test

From the `trex-runner` directory:

```bash
npx playwright test tests/trex-smoke.spec.ts --reporter=list,html
```

View the HTML report:
```bash
npx playwright show-report
```

Check:
- Did the test pass?
- How long did it take?
- Are there screenshots or traces in the report?

---

## Step 3 — Switch to Accessibility-Based Locators

CSS-id selectors are brittle. Ask Copilot to harden them.

1. Open `trex-runner/ui/index.html`.
2. Find the canvas element and add an `aria-label`:
   ```html
   <canvas id="game-canvas" aria-label="game-canvas"></canvas>
   ```
3. Send this follow-up prompt to Copilot Chat:
   ```
   Update trex-smoke.spec.ts to replace all CSS-id and class selectors
   with accessible locators: getByLabel(), getByRole(), or getByText().
   ```
4. Apply the suggestions and re-run:
   ```bash
   cd trex-runner && npx playwright test
   ```

> **Why accessibility labels?** `aria-label` + `getByLabel()` creates tests that are resilient to UI changes, improve accessibility compliance, and read like plain English.

---

## Step 4 — Ask Copilot to Explain the Test

In Copilot Chat, select the test file content and ask:

```
Explain what each assertion in this test is validating and why it matters
for regression testing of a canvas game.
```

This reinforces understanding — you should be able to justify every line in the test you ship.

---

## Verify

- [ ] `trex-runner/tests/trex-smoke.spec.ts` exists and contains a runnable test
- [ ] `test.use({ trace: 'on-first-retry' })` is present
- [ ] Test passes with `npx playwright test` from the `trex-runner` directory
- [ ] HTML report opens and shows a green result
- [ ] Locators use `getByLabel`, `getByRole`, or `getByText` (no raw `#game-canvas`)

---

## Key Takeaway

> Copilot Chat in Agent Mode can draft Playwright boilerplate in seconds. Your role is to **validate, refine, and understand** the generated code — not to copy it blindly. Every prompt you send teaches you which Playwright APIs Copilot knows, and every review builds your own testing intuition.

---

**Next**: [Exercise 06 — Functional E2E Tests with Playwright](exercise-06-functional-e2e.md)
