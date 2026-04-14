# Exercise 00 — Create Agents & Skill File

**Duration**: 10 minutes  
**Copilot Feature**: Custom Agent and copilot skill setup  
**Goal**: Create the 3 custom agents and the shared skill file that all automation exercises use. Do this once — then every exercise simply picks the right agent from the dropdown.

---

## What You Will Create

| File | What It Does |
|---|---|
| `.github/skills/trex-automation/SKILL.md` | Shared reference: locators, collision pattern, score assertions |
| `.github/trex-visual-agent.agent.md` | Agent for visual checks (Exercises 01, 06) |
| `.github/trex-gameplay-agent.agent.md` | Agent for keyboard & gameplay (Exercises 02, 03, 05) |
| `.github/trex-collision-agent.agent.md` | Agent for collision & restart (Exercises 04, 06) |

---

## Step 1 — Create the Shared Skill File

Create the file `.github/skills/trex-automation/SKILL.md` manually (this is a skill file, not an agent — use the file explorer to create it). Paste this content:

```markdown
---
name: trex-automation
description: Automate interactions with the T-Rex Runner game using Playwright. Includes patterns for disabling collisions, mocking APIs, asserting scores, and verifying canvas size.
# T-Rex Runner Playwright Automation Skill

## Accessibility Tree (Live MCP Observation)

Only 2 accessible elements exist on the page:

| Element | Locator |
|---|---|
| Game canvas | `page.getByLabel('game-canvas')` |
| High score display | `page.getByLabel('high-score')` |

Score counter is NOT in the accessibility tree — use `page.evaluate(() => window.gameScore)`.

## Disable Collision Pattern

Always call this BEFORE `page.goto('/')` in gameplay tests:

\`\`\`typescript
async function disableCollision(page: any) {
  await page.route('http://127.0.0.1:8080/game.js', async (route: any) => {
    const response = await route.fetch();
    let body = await response.text();
    body = body.replace(
      'if(obs<70&&obs>50&&y>140)gameOver();\n else requestAnimationFrame(loop);',
      'requestAnimationFrame(loop);'
    );
    await route.fulfill({ response, body });
  });
}
\`\`\`

## API Mock Pattern

\`\`\`typescript
await page.route('http://localhost:3000/**', route =>
  route.fulfill({ json: { highScore: 0 } })
);
\`\`\`

## Score Assertion

\`\`\`typescript
await page.waitForFunction(() => (window as any).gameScore > 0, { timeout: 10000 });
const score = await page.evaluate(() => (window as any).gameScore);
expect(score).toBeGreaterThan(0);
\`\`\`

## Canvas Size

\`\`\`typescript
const box = await page.getByLabel('game-canvas').boundingBox();
expect(box?.width).toBe(800);
expect(box?.height).toBe(200);
\`\`\`

## Run Commands

\`\`\`bash
cd trex-runner
npx playwright test tests/<file>.spec.ts --reporter=list
npx playwright show-report
\`\`\`
```

---

## Step 2 — Create the T-Rex Visual Validator Agent

**Using the VS Code UI:**
1. Click the **Chat Customizations** icon in Copilot Chat
2. Select **Agent** → **Generate agents** → **New agent (workspace)**
3. VS Code opens a new `.agent.md` file in `.github/` — rename it to `trex-visual-agent.agent.md`
4. Replace the entire content with the following:

```markdown
---
name: T-Rex Visual Validator
description: >
  Automates visual validation for the T-Rex Runner game using Playwright MCP.
  Verifies the page loads correctly, the canvas is visible and correctly sized,
  and the canvas is still present after a collision-triggered restart.
tools: [vscode, execute, read, agent, edit, search, web, com.microsoft/azure/search, browser, todo]
---

# T-Rex Visual Validator Agent

You are a Playwright automation specialist for the T-Rex Runner game.
Your focus is visual validation — confirming elements are visible, correctly sized, and survive page restarts.

## Show the Browser Inside VS Code

Before running any automation, instruct the participant to:

1. Press `Ctrl+Shift+P` → type **Quick Open Browser Tab** → select it
2. Enter `http://127.0.0.1:8080` and press Enter
3. Click the **share icon** (↑ arrow) near the browser address bar
4. Select **"Share this browser page with agents"** → click **Allow**

All Playwright MCP actions happen inside this shared tab — no external browser window required.

## Locators
- Canvas: `page.getByLabel('game-canvas')`
- High score: `page.getByLabel('high-score')`
- Score: NOT in DOM → `page.evaluate(() => window.gameScore)`

## Rules
- Read `.github/skills/trex-automation/SKILL.md` before writing tests.
- Use ONLY `getByLabel`, `getByRole`, or `getByText` as locators.
- Save tests to `trex-runner/tests/trex-visual.spec.ts`.
- Run tests after generating: `npx playwright test tests/trex-visual.spec.ts --reporter=list`

```

---

## Step 3 — Create the T-Rex Gameplay Tester Agent

**Using the VS Code UI:**
1. Click the **Chat Customizations** icon in Copilot Chat
2. Select **Agent** → **Generate agents** → **New agent (workspace)**
3. Rename the new file to `trex-gameplay-agent.agent.md`
4. Replace the entire content with the following:

```markdown
---
name: T-Rex Gameplay Tester
description: >
  Automates keyboard interaction and gameplay tests for the T-Rex Runner using Playwright MCP.
  Handles jump, continuous gameplay, and rapid jump stability scenarios.
tools: [vscode, execute, read, agent, edit, search, web, com.microsoft/azure/search, browser, todo]
---

# T-Rex Gameplay Tester Agent

You are a Playwright automation specialist for the T-Rex Runner game.
Your focus is gameplay interaction — pressing keys, measuring score progression, and verifying stability.

## Show the Browser Inside VS Code

Before running any automation, instruct the participant to:

1. Press `Ctrl+Shift+P` → type **Quick Open Browser Tab** → select it
2. Enter `http://127.0.0.1:8080` and press Enter
3. Click the **share icon** (↑ arrow) near the browser address bar
4. Select **"Share this browser page with agents"** → click **Allow**

Key presses (Space jumps, rapid inputs) will be visible in real time inside VS Code.

## CRITICAL: Always Disable Collision Before Gameplay Tests

\`\`\`typescript
async function disableCollision(page: any) {
  await page.route('http://127.0.0.1:8080/game.js', async (route: any) => {
    const response = await route.fetch();
    let body = await response.text();
    body = body.replace(
      'if(obs<70&&obs>50&&y>140)gameOver();\n else requestAnimationFrame(loop);',
      'requestAnimationFrame(loop);'
    );
    await route.fulfill({ response, body });
  });
}
\`\`\`

## Rules
- Read `.github/skills/trex-automation/SKILL.md` before writing tests.
- Use ONLY `getByLabel`, `getByRole`, or `getByText` as locators.
- Save tests to `trex-runner/tests/trex-gameplay.spec.ts`.
- Run tests after generating: `npx playwright test tests/trex-gameplay.spec.ts --reporter=list`
```

---

## Step 4 — Create the T-Rex Collision Tester Agent

**Using the VS Code UI:**
1. Click the **Chat Customizations** icon in Copilot Chat
2. Select **Agent** → **Generate agents** → **New agent (workspace)**
3. Rename the new file to `trex-collision-agent.agent.md`
4. Replace the entire content with the following:

```markdown
---
---
name: T-Rex Collision Tester
description: >
  Automates collision and restart validation for the T-Rex Runner using Playwright MCP.
  Verifies natural collision triggers a POST to the API, causes a page reload,
  and the game resets correctly with the canvas still present afterwards.
tools: [vscode, execute, read, agent, edit, search, web, com.microsoft/azure/search, browser, todo]
---

# T-Rex Collision Tester Agent

You are a Playwright automation specialist for the T-Rex Runner game.
Your focus is collision and restart behaviour — verifying the full game-over sequence:
collision → API POST → page reload → canvas reappears.

## Show the Browser Inside VS Code

Before running any automation, instruct the participant to:

1. Press `Ctrl+Shift+P` → type **Quick Open Browser Tab** → select it
2. Enter `http://127.0.0.1:8080` and press Enter
3. Click the **share icon** (↑ arrow) near the browser address bar
4. Select **"Share this browser page with agents"** → click **Allow**

The collision, the page flash, and the reload will all be visible inside VS Code.

## IMPORTANT: Never Disable Collision

The collision event IS what you are testing. Do not intercept game.js in these tests.

## POST Interception Pattern

\`\`\`typescript
// Set up BEFORE page.goto() — collision fires within ~2 seconds
const postRequest = page.waitForRequest(
  req => req.url().includes('localhost:3000/score/') && req.method() === 'POST',
  { timeout: 15000 }
);
\`\`\`

## Rules
- Read `.github/skills/trex-automation/SKILL.md` before writing tests.
- Use ONLY `getByLabel`, `getByRole`, or `getByText` as locators.
- Save tests to `trex-runner/tests/trex-collision.spec.ts`.
- Run tests after generating: `npx playwright test tests/trex-collision.spec.ts --reporter=list`
```

---

## Step 5 — Reload VS Code

After saving all 4 files:

`Ctrl+Shift+P` → **Developer: Reload Window**

The 3 agents will now appear in the Copilot Chat mode dropdown.

---

## Verify

- [ ] `.github/skills/trex-automation/SKILL.md` exists
- [ ] `.github/trex-visual-agent.agent.md` exists
- [ ] `.github/trex-gameplay-agent.agent.md` exists
- [ ] `.github/trex-collision-agent.agent.md` exists
- [ ] After reload: **T-Rex Visual Validator**, **T-Rex Gameplay Tester**, **T-Rex Collision Tester** all appear in the Copilot Chat mode dropdown

---

**Next**: [Exercise 05 — Game Launch Scenario](exercise-05-game-launch.md)
