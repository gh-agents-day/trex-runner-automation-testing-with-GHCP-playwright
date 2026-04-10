# Exercise 03 — Initialize Playwright & Unit Tests with Copilot Chat

**Duration**: 10 minutes  
**Copilot Feature**: Copilot Chat — Ask Mode  
**Goal**: Set up Playwright in the T-Rex Runner project and use Copilot Chat to generate Jest unit tests for the API score logic using supertest — no browser required.

---

## Background

Before writing browser tests you need two things: a properly configured Playwright setup, and confidence that the backend logic is correct. Unit tests with **Jest + supertest** let you test the Express API directly in-process — fast, isolated, and no live server needed. This exercise covers both.

---

## Step 1 — Initialize Playwright

Open a terminal (`Ctrl+~`) and run:

```bash
cd trex-runner
npm init -y
npm install --save-dev @playwright/test
npx playwright install
```

Create `trex-runner/playwright.config.ts` and paste this in the file:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://127.0.0.1:8080',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

Create the tests directory inside `trex-runner/`:

```bash
cd trex-runner
mkdir tests
```

Install the **Playwright Test for VSCode** extension (`ms-playwright.playwright`) — this adds a visual test runner under the Testing panel (flask icon in the Activity Bar).

---

## Step 2 — Unit Tests: API Score Logic (Copilot Chat)

The API (`trex-runner/api/server.js`) has two endpoints:
- `GET /score` → returns `{ highScore }`
- `POST /score/:value` → updates `highScore` only if the new value is higher

**Configure Copilot Chat before sending the prompt:**
1. Open **Copilot Chat** (`Ctrl+Alt+I`)
2. Set mode to **Ask**
3. Set model to **Claude Sonnet 4.6**

Send this prompt:

```
Look at trex-runner/api/server.js.
Generate Jest unit tests for the score API that cover:
1. GET /score returns { highScore: 0 } on first call
2. POST /score/100 updates highScore to 100
3. POST /score/50 after score is 100 — highScore stays at 100
4. POST /score/200 after score is 100 — highScore updates to 200

Use supertest to call the Express app directly (no live server needed).
Save as trex-runner/api/tests/score.test.js
```

**Run unit tests:**

```bash
cd trex-runner/api
npm install --save-dev jest supertest
npx jest tests/score.test.js --verbose
```

Expected:
```
✓ GET /score returns highScore 0
✓ POST /score/100 updates to 100
✓ POST /score/50 does not lower score
✓ POST /score/200 updates to new high
```

---

## Verify

- [ ] `trex-runner/playwright.config.ts` exists with `baseURL: 'http://127.0.0.1:8080'`
- [ ] `trex-runner/tests/` directory exists
- [ ] Playwright VS Code extension 
- [ ] `npx jest tests/score.test.js --verbose` — all 4 tests pass

---

**Next**: [Exercise 04 — Integration Tests with Playwright](exercise-04-integration-tests.md)
