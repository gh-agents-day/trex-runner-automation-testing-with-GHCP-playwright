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