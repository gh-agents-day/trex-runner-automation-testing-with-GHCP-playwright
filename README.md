# Testing with GitHub Copilot Agents

> **Audience:** Developers, QA Engineers, Tech Leads  |  **Total Duration:** ~90 minutes  |  **Pre-requisites:** GitHub Copilot access, Node.js 18+, VS Code with GitHub Copilot Chat extension

## What You Will Build

A fully automated test suite around the **T-Rex Runner** — a browser-based arcade game backed by a Node.js high-score API. You will use GitHub Copilot Chat (Ask & Agent modes), custom Copilot agents, a shared skill file, and the Playwright MCP server to generate and validate every layer of the testing pyramid.

| Component | Description |
|-----------|-------------|
| T-Rex Runner UI | HTML + Vanilla JS canvas game served at `http://127.0.0.1:8080` |
| High-Score API | Node.js + Express REST API served at `http://localhost:3000` |
| MCP-Driven Tests | Accessibility-based Playwright tests generated via the Playwright MCP server |

> The application code lives in `trex-runner/`. Copilot agents do the heavy lifting — your job is to learn how to direct them.

## Prerequisites

- [VS Code](https://code.visualstudio.com/download) with the [GitHub Copilot Chat extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat)
- [Node.js 18+](https://nodejs.org/) and npm
- [Git CLI](https://git-scm.com/install/)
- GitHub Copilot subscription (Individual, Business, or Enterprise)
- Playwright MCP server installed and running (configured in `.vscode/mcp.json`)

## Workshop Map

### Complete in Order

| # | Exercise | Copilot Feature | What You Do |
|---|----------|-----------------|-------------|
| 01 | [Setup, VS Code & GitHub Copilot](workshop-automation/exercise-01-setup-and-copilot.md) | Copilot Chat — setup & orientation | Install extensions, verify inline completions and Chat |
| 02 | [Run the T-Rex Runner Application](workshop-automation/exercise-02-run-trex-runner.md) | Terminal + Copilot Chat | Start API (port 3000) and game UI (port 8080) servers |
| 03 | [Initialize Playwright](workshop-automation/exercise-03-initialize-playwright.md) | Copilot Chat — Ask Mode | Scaffold `playwright.config.ts` and initialize the Playwright test environment |
| 04 | [Create Agents & Skill File](workshop-automation/exercise-04-create-agents.md) | Copilot Chat — Agent Mode | Create 3 custom agents and a shared `SKILL.md` automation reference |
| 05 | [Game Launch Scenario](workshop-automation/exercise-05-game-launch.md) | T-Rex Visual Validator agent | Verify canvas loads, dimensions correct, high score shows zero |
| 06 | [Keyboard Interaction (Jump)](workshop-automation/exercise-06-keyboard-interaction.md) | T-Rex Gameplay Tester agent | Validate Space bar jump and page stability |
| 07 | [Continuous Gameplay](workshop-automation/exercise-07-continuous-gameplay.md) | T-Rex Gameplay Tester agent | Run game for 4 s, assert no errors and score > 0 |
| 08 | [Collision & Restart](workshop-automation/exercise-08-collision-restart.md) | T-Rex Collision Tester agent | Natural collision → POST to score API → page reload |
| 09 | [Multiple Jump Stability](workshop-automation/exercise-09-multiple-jumps.md) | T-Rex Gameplay Tester agent | 10 rapid Space presses without crash or freeze |
| 10 | [Canvas After Restart](workshop-automation/exercise-10-canvas-after-restart.md) | T-Rex Collision Tester agent | Canvas, score display, and game state survive reload |

## Agents & Skill File

Three custom agents (stored in `.github/`) each load a shared skill file before generating tests.

| Agent File | Name | Used In |
|---|---|---|
| `trex-visual-agent.agent.md` | T-Rex Visual Validator | Exercise 05 |
| `trex-gameplay-agent.agent.md` | T-Rex Gameplay Tester | Exercises 06, 07, 09 |
| `trex-collision-agent.agent.md` | T-Rex Collision Tester | Exercises 08, 10 |

> **Create agents via:** Copilot Chat → Chat Customizations icon → **Agent** → **Generate agents** → **New agent (workspace)**

The **skill file** (`.github/skills/trex-automation/SKILL.md`) contains the full automation reference: accessibility tree, `disableCollision` pattern, score assertion patterns, locator rules, and API endpoints. All agents load this skill before generating tests.

## Key Features Covered

### GitHub Copilot Features

| Feature | What You Learn | Exercise |
|---------|---------------|----------|
| Copilot Chat — Setup & Chat Participants | Install and verify Copilot in VS Code; use `@vscode` and `@terminal` chat participants for contextual help | [Ex 01](workshop-automation/exercise-01-setup-and-copilot.md) |
| Copilot Chat — Ask Mode | Prompt Copilot to scaffold `playwright.config.ts` and initialize the Playwright test environment with the correct `baseURL` and browser config | [Ex 03](workshop-automation/exercise-03-initialize-playwright.md) |
| Custom Agents (`.agent.md`) | Create three scoped agents — T-Rex Visual Validator, Gameplay Tester, and Collision Tester — each with a focused role | [Ex 04](workshop-automation/exercise-04-create-agents.md) |
| Shared Skill File (`SKILL.md`) | Define a centralised automation reference loaded by all agents: accessibility locators, `disableCollision` pattern, score assertions, and API endpoints | [Ex 04](workshop-automation/exercise-04-create-agents.md) |
| Copilot Chat — Agent Mode | Switch an agent live in Copilot Chat and delegate multi-file test generation to it via a natural language prompt | [Ex 05–10](workshop-automation/exercise-05-game-launch.md) |
| Playwright MCP Server | Connect Copilot to a real browser via MCP — agent reads the accessibility tree, navigates, clicks, and presses keys without screenshots | [Ex 05–10](workshop-automation/exercise-05-game-launch.md) |
| VS Code Browser Tab Sharing | Open the game in VS Code's built-in browser (`Quick Open Browser Tab`) and share it with agents so MCP controls the live tab | [Ex 05–10](workshop-automation/exercise-05-game-launch.md) |

### Testing Techniques

| Technique | What You Learn | Exercise |
|-----------|---------------|----------|
| Application infrastructure setup | Start the Express API (port 3000) and `http-server` UI (port 8080) and verify both are reachable before running any tests | [Ex 02](workshop-automation/exercise-02-run-trex-runner.md) |
| Playwright test environment setup | Install `@playwright/test`, configure `playwright.config.ts` with `baseURL`, create the `tests/` directory, and install the Playwright VS Code extension | [Ex 03](workshop-automation/exercise-03-initialize-playwright.md) |
| Accessibility-based locators only | All Playwright locators use `getByLabel`, `getByRole`, or `getByText` — zero CSS selectors or XPath | [Ex 05–10](workshop-automation/exercise-05-game-launch.md) |
| Canvas visibility & dimension assertions | Assert `getByLabel('game-canvas')` is visible and `boundingBox()` returns exactly 800×200 pixels | [Ex 05](workshop-automation/exercise-05-game-launch.md) |
| JavaScript error monitoring | Register `page.on('pageerror')` before gameplay to capture silent failures that never surface in the UI | [Ex 05, 07, 09](workshop-automation/exercise-07-continuous-gameplay.md) |
| Keyboard interaction (`page.press`) | Send `Space` keypress to trigger a jump and assert page stability after interaction | [Ex 06](workshop-automation/exercise-06-keyboard-interaction.md) |
| `page.evaluate()` — game state access | Read `window.gameScore` via `page.evaluate()` because the live score is never written to the DOM | [Ex 06–10](workshop-automation/exercise-06-keyboard-interaction.md) |
| `disableCollision()` runtime override | Override `window.gameOver` to a no-op at test runtime with `page.evaluate()` — no source code changes | [Ex 06, 07, 09](workshop-automation/exercise-06-keyboard-interaction.md) |
| URL stability assertion | Confirm the page URL remains `http://127.0.0.1:8080/` throughout — detects silent reload loops | [Ex 06, 07, 09](workshop-automation/exercise-07-continuous-gameplay.md) |
| Continuous gameplay monitoring | Run the game loop for 4 seconds watching for errors, frozen scores, and URL changes simultaneously | [Ex 07](workshop-automation/exercise-07-continuous-gameplay.md) |
| Natural collision flow + request interception | Let the dino collide without disabling anything; use `page.waitForRequest()` to verify the POST hits `/score/:value` | [Ex 08](workshop-automation/exercise-08-collision-restart.md) |
| Reload detection (`waitForNavigation`) | Assert `location.reload()` fires after game-over by waiting for a navigation event | [Ex 08, 10](workshop-automation/exercise-08-collision-restart.md) |
| Rapid input stress testing | Fire 10 Space presses at 200 ms intervals and assert no errors, no freeze, and no unintended reload | [Ex 09](workshop-automation/exercise-09-multiple-jumps.md) |
| Post-restart full-state validation | Re-assert canvas visibility, high-score display, and game loop after a collision-triggered page reload | [Ex 10](workshop-automation/exercise-10-canvas-after-restart.md) |

## Getting Started

1. Click **"Use this template"** → **"Create a new repository"**
2. Set the owner to your GitHub account, enter a name (e.g., `testing-agents-workshop`), and click **"Create repository"**
3. Clone the repository locally and open it in VS Code
4. Start the API server and UI server — see [Exercise 02](workshop-automation/exercise-02-run-trex-runner.md)
5. Begin with [Exercise 01 — Setup, VS Code & GitHub Copilot](workshop-automation/exercise-01-setup-and-copilot.md)

## Run the Full Automation Suite

```bash
cd trex-runner
npx playwright test tests/trex-visual.spec.ts tests/trex-gameplay.spec.ts --reporter=list
npx playwright show-report
```

## Further Learning

- [Create Applications with the Copilot CLI](https://github.com/skills/create-applications-with-the-copilot-cli)
- [Integrate MCP with Copilot](https://github.com/skills/integrate-mcp-with-copilot)
- [E2E AI SDLC with GitHub Copilot](https://github.com/CanarysAutomations/E2E-AI-SDLC-Build-with-Github-Copilot)
- [Debugging and Automation with GHCP](https://github.com/CanarysAutomations/Debugging-and-Automation-with-GHCP)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)

---

> **Note:** Complete all exercises in order — each one builds on the previous.

> **Instructor Note:** Each exercise contains copy-paste prompts — attendees never write code from scratch. Debrief after each exercise by reviewing the generated files before proceeding.
