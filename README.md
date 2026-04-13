# Testing with GitHub Copilot Agents

> **Audience:** Developers, QA Engineers, Tech Leads  |  **Total Duration:** ~60 minutes  |  **Pre-requisites:** GitHub Copilot access, Node.js 18+, VS Code with GitHub Copilot Chat extension

## What You Will Build

A fully automated test suite around the **T-Rex Runner** — a browser-based arcade game backed by a Node.js high-score API. You will use GitHub Copilot Chat (Ask & Agent modes), GitHub Copilot CLI, custom agents, and the Playwright MCP server to generate and validate every layer of the testing pyramid.

| Component | Description |
|-----------|-------------|
| T-Rex Runner UI | HTML + Vanilla JS canvas game served at `http://127.0.0.1:8080` |
| High-Score API | Node.js + Express REST API served at `http://localhost:3000` |
| Unit Tests | Jest + Supertest tests for API score logic |
| Integration Tests | Playwright tests verifying UI ↔ API communication with HTML reports |
| Smoke Tests | Playwright E2E tests confirming the canvas renders and game starts |
| Functional Tests | Full Playwright E2E tests for game interactions and high-score flow |
| MCP-Driven Tests | Accessibility-based Playwright tests generated via the MCP server |

> The application code lives in `trex-runner/`. Copilot agents do the heavy lifting — your job is to learn how to direct them.

## Prerequisites

- [VS Code](https://code.visualstudio.com/download) with the [GitHub Copilot Chat extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat)
- [Node.js 18+](https://nodejs.org/) and npm
- [Git CLI](https://git-scm.com/install/)
- [GitHub CLI (`gh`)](https://cli.github.com/) with the [Copilot CLI extension](https://docs.github.com/en/copilot/how-tos/copilot-cli/install-copilot-cli)
- GitHub Copilot subscription (Individual, Business, or Enterprise)

## Workshop Map

### Core Track (~90 minutes) — Complete in Order

| # | Exercise | Copilot Feature | Duration |
|---|----------|-----------------|----------|
| 01 | [Setup, VS Code & GitHub Copilot](workshop/exercise-01-setup-and-copilot.md) | Copilot Chat setup & orientation | 5 min |
| 02 | [Run the T-Rex Runner Application](workshop/exercise-02-run-trex-runner.md) | Terminal + Copilot Chat | 5 min |
| 03 | [Initialize Playwright & Unit Tests](workshop/exercise-03-initialize-playwright-unit-tests.md) | Copilot Chat — Ask Mode | 10 min |
| 04 | [Integration Tests + HTML Report](workshop/exercise-04-integration-tests.md) | Copilot Chat — Ask Mode | 10 min |
| 05 | [Copilot Chat Agent Mode: First UI Test](workshop/exercise-05-local-agent-ui-test.md) | Copilot Chat — Agent Mode | 10 min |
| 06 | [Functional E2E Tests with Playwright](workshop/exercise-06-functional-e2e.md) | Copilot Chat — Ask Mode | 15 min |
| 07 | [Copilot CLI: Natural Language Test Commands](workshop/exercise-07-copilot-cli.md) | GitHub Copilot CLI | 15 min |
| 08 | [Custom Agent: Full Test Suite Orchestration](workshop/exercise-08-instruction-skills.md) | Agent Mode + Custom Instructions | 10 min |
| 09 | [Playwright MCP: Accessibility-Based Testing](workshop/exercise-09-playwright-mcp.md) | MCP — Playwright MCP Server | 10 min |

## Workspace Structure After Workshop

```
Testing-with-Agents-GHCP/
├── .github/
│   └── copilot-instructions.md        ← Exercise 08
├── trex-runner/
│   ├── api/
│   │   ├── server.js                  ← Modified Exercise 03
│   │   ├── package.json
│   │   └── tests/
│   │       └── score.test.js          ← Exercise 03
│   ├── ui/
│   │   ├── index.html                 ← Modified Exercise 04
│   │   └── game.js                    ← Modified Exercise 04
│   ├── tests/
│   │   ├── integration.spec.ts        ← Exercise 04
│   │   ├── trex-smoke.spec.ts         ← Exercise 05
│   │   ├── trex-functional.spec.ts    ← Exercise 06
│   │   └── trex-mcp.spec.ts           ← Exercise 09
│   └── playwright.config.ts           ← Exercise 03
└── workshop/
    ├── exercise-01-setup-and-copilot.md
    ├── exercise-02-run-trex-runner.md
    ├── exercise-03-initialize-playwright-unit-tests.md
    ├── exercise-04-integration-tests.md
    ├── exercise-05-local-agent-ui-test.md
    ├── exercise-06-functional-e2e.md
    ├── exercise-07-copilot-cli.md
    ├── exercise-08-instruction-skills.md
    └── exercise-09-playwright-mcp.md
```

## Key Features Covered

| Feature | Description |
|---------|-------------|
| Copilot Chat — Ask Mode | Generate test scaffolding, fix errors, and explain code inline |
| Copilot Chat — Agent Mode | Delegate multi-file test generation to an autonomous agent |
| Custom Instructions | Scope agent behaviour with `.github/copilot-instructions.md` |
| GitHub Copilot CLI | Run `gh copilot explain` and `gh copilot suggest` from the terminal |
| Jest + Supertest | Unit tests for Express API score logic with full isolation |
| Playwright Integration Tests | Route mocking to verify UI ↔ API wiring |
| Playwright E2E Tests | Full game-flow tests including keyboard input and score validation |
| HTML Test Reports | `npx playwright show-report` for rich visual test results |
| Playwright MCP Server | AI-driven, accessibility-selector-based test generation |

## Getting Started

1. Click **"Use this template"** → **"Create a new repository"**
2. Set the owner to your GitHub account, enter a name (e.g., `testing-agents-workshop`), and click **"Create repository"**
3. Clone the repository locally and open it in VS Code
4. Start the API server and UI server (see the [Run the App](workshop/exercise-02-run-trex-runner.md) exercise)
5. Begin with [Exercise 01 — Setup, VS Code & GitHub Copilot](workshop/exercise-01-setup-and-copilot.md)

## Further Learning

- [Create Applications with the Copilot CLI](https://github.com/skills/create-applications-with-the-copilot-cli)
- [Integrate MCP with Copilot](https://github.com/skills/integrate-mcp-with-copilot)
- [E2E AI SDLC with GitHub Copilot](https://github.com/CanarysAutomations/E2E-AI-SDLC-Build-with-Github-Copilot)
- [Debugging and Automation with GHCP](https://github.com/CanarysAutomations/Debugging-and-Automation-with-GHCP)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)

---

> **Note:** Complete the Core Track (Ex 01–09) in order — each exercise builds on the previous one.

> **Instructor Note:** Each exercise contains copy-paste prompts — attendees never write code from scratch. Debrief after each exercise by reviewing the generated files before proceeding.
