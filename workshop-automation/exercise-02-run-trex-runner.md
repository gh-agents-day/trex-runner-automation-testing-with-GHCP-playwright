# Exercise 02 — Run the T-Rex Runner Application

**Duration**: 5 minutes  
**Goal**: Start both servers and verify the application is ready for testing.

| Layer | URL |
|---|---|
| Game UI | http://127.0.0.1:8080 |
| High-Score API | http://localhost:3000 |

---

## Step 1 — Start the API Server

Open **Terminal A** in VS Code (`Ctrl+~`):

```bash
cd trex-runner/api
npm install
node server.js
```

Expected: `API running on 3000`

Open http://localhost:3000/score in browser
# Expected: { "highScore": 0 }
```

**API Endpoints:**

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/score` | Returns current high score |
| `POST` | `/score/:value` | Submits a score; updates only if higher |

> **Port 3000 in use?** `Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000 | Select-Object -ExpandProperty OwningProcess) -Force`

---

## Step 2 — Serve the Game UI

Open **Terminal B** (split terminal — `Ctrl+Shift+5`):

```bash
cd trex-runner/ui
npx http-server -p 8080
```

Open **http://127.0.0.1:8080** in your browser.

> **Port 8080 in use?** `Stop-Process -Id (Get-NetTCPConnection -LocalPort 8080 | Select-Object -ExpandProperty OwningProcess) -Force`

---

## Step 3 — Verify the Full Flow

1. Game canvas is visible at **http://127.0.0.1:8080**
2. Press **Space** → dino starts running; press again to jump
3. Let dino hit a cactus → score displays


> **Leave both terminals running** throughout the entire workshop — all tests connect to these servers.

---

**Next**: [Exercise 03 — Initialize Playwright](exercise-03-initialize-playwright.md)
