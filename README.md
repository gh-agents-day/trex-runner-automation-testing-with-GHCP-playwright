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
| 03 | [Initialize Playwright & Unit Tests](workshop-automation/exercise-03-initialize-playwright-unit-tests.md) | Copilot Chat — Ask Mode | Scaffold Playwright config and Jest API unit tests |
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

## Workspace Structure After Workshop

```
Testing-with-Agents-GHCP/
├── .github/
│   ├── trex-visual-agent.agent.md        ← Exercise 04
│   ├── trex-gameplay-agent.agent.md      ← Exercise 04
│   ├── trex-collision-agent.agent.md     ← Exercise 04
│   └── skills/
│       └── trex-automation/
│           └── SKILL.md                  ← Exercise 04
├── trex-runner/
│   ├── api/
│   │   ├── server.js
│   │   ├── package.json
│   │   └── tests/
│   │       └── score.test.js             ← Exercise 03
│   ├── ui/
│   │   ├── index.html
│   │   └── game.js
│   ├── tests/
│   │   ├── integration.spec.ts           ← Exercise 03
│   │   ├── trex-smoke.spec.ts            ← Exercise 03
│   │   ├── trex-visual.spec.ts           ← Exercise 05
│   │   ├── trex-gameplay.spec.ts         ← Exercises 06, 07, 09
│   │   └── trex-mcp.spec.ts              ← Generated via MCP
│   └── playwright.config.ts              ← Exercise 03
└── workshop-automation/
    ├── README.md
    ├── exercise-01-setup-and-copilot.md
    ├── exercise-02-run-trex-runner.md
    ├── exercise-03-initialize-playwright-unit-tests.md
    ├── exercise-04-create-agents.md
    ├── exercise-05-game-launch.md
    ├── exercise-06-keyboard-interaction.md
    ├── exercise-07-continuous-gameplay.md
    ├── exercise-08-collision-restart.md
    ├── exercise-09-multiple-jumps.md
    └── exercise-10-canvas-after-restart.md
```

## Key Features Covered

| # | Feature | Description | Exercise |
|---|---------|-------------|----------|
| 01 | VS Code & GitHub Copilot Setup | Install VS Code, enable the GitHub Copilot Chat extension, and verify inline suggestions and Chat work before starting automated testing | [Exercise 01](workshop-automation/exercise-01-setup-and-copilot.md) |
| 02 | Application Server Setup | Launch the Express API server on port 3000 and the web UI server on port 8080, then verify both are accessible and the game is playable | [Exercise 02](workshop-automation/exercise-02-run-trex-runner.md) |
| 03 | Playwright & Jest Unit Tests | Set up Playwright for E2E testing and generate Jest + Supertest unit tests for the Express API score endpoints without needing a live server | [Exercise 03](workshop-automation/exercise-03-initialize-playwright-unit-tests.md) |
| 04 | Custom Agents & Shared Skill File | Create three custom GitHub Copilot agents and a shared `SKILL.md` defining locators, collision patterns, and reusable test logic used in all subsequent exercises | [Exercise 04](workshop-automation/exercise-04-create-agents.md) |
| 05 | Game Launch Verification | Use Playwright MCP to verify the game page loads without errors, the canvas is visible at 800×200 pixels, and the high score displays correctly | [Exercise 05](workshop-automation/exercise-05-game-launch.md) |
| 06 | Keyboard Interaction Testing | Use Playwright MCP to press Space, verify the dino jumps without page reload, and confirm the game loop continues running | [Exercise 06](workshop-automation/exercise-06-keyboard-interaction.md) |
| 07 | Continuous Gameplay Testing | Monitor the game for 4 seconds to verify animation runs without errors, the score increments, and the URL stays unchanged | [Exercise 07](workshop-automation/exercise-07-continuous-gameplay.md) |
| 08 | Collision & Auto-Restart Cycle | Let the dino collide naturally with an obstacle, verify a POST request fires to `/score/:value`, and confirm the page reloads automatically | [Exercise 08](workshop-automation/exercise-08-collision-restart.md) |
| 09 | Multiple Jump Stability | Send 10 rapid Space presses and verify no JavaScript errors, the canvas remains visible, and the page stays stable under rapid input | [Exercise 09](workshop-automation/exercise-09-multiple-jumps.md) |
| 10 | Post-Restart State Validation | Verify all UI elements and game state recover after a collision-triggered page reload, with the high score updated and game loop restarted | [Exercise 10](workshop-automation/exercise-10-canvas-after-restart.md) |

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
