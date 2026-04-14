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

Install the **Playwright Test for VSCode** extension (`ms-playwright.playwright`) — this adds a visual test runner under the Testing panel (flask icon in the Activity Bar).


## Step 2 - Configure Playwright MCP via VS Code Tools (recommended)

> Full reference: [Playwright MCP — Getting Started](https://playwright.dev/docs/getting-started-mcp)
>
> **Configure from the VS Code Tools panel**
>
> 1. In **Copilot Chat**, click the **Tools** icon 
> 2. In the tools panel that opens, type **`playwright`** in the search field
> 3. Locate **`microsoft.playwright-mcp`** 
> 4. Click the **gear / settings icon** next to it — VS Code opens the MCP server's JSON mcp.json`
> 5. Click **Start** (or the play icon) next to the server entry in the Tools panel to start the Playwright MCP server and you can see the server is **running**

---

## Verify

- [ ] `trex-runner/playwright.config.ts` exists with `baseURL: 'http://127.0.0.1:8080'`
- [ ] `trex-runner/tests/` directory exists
- [ ] Playwright VS Code extension 


---

**Next**: [Exercise 04 — Create Agents & Skill File](exercise-04-create-agents.md)
