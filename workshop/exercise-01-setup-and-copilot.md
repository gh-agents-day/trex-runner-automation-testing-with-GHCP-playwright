# Exercise 01 — Setup, VS Code & GitHub Copilot

**Duration**: 5 minutes  
**Copilot Feature**: GitHub Copilot Setup & Chat Participants Overview  
**Goal**: Install VS Code, enable GitHub Copilot and verify the setup before starting the testing workshop.

---

## Background

**GitHub Copilot** is an AI-powered coding assistant that offers inline code completions, a chat interface, and autonomous agents. In this workshop you will use it to generate, iterate, and maintain Playwright tests — without writing boilerplate from scratch.

**What you need:**
- GitHub account ([github.com/signup](https://github.com/signup))
- Active Copilot subscription 
- VS Code (recommended)

---

## Step 1 — Install Visual Studio Code & Clone the Workshop Repository

### 1a — Install VS Code

1. Go to [https://code.visualstudio.com](https://code.visualstudio.com) and download the installer for your OS.
2. Run the installer and follow the on-screen steps.
3. Launch VS Code once installation is complete.

> **Already installed?** Make sure you are on **VS Code 1.90 or later** (`Help → About`). Earlier versions may not support the latest Copilot Chat features.

### 1b — Clone the Workshop Repository

This repository contains the **T-Rex Runner** application you will test throughout the workshop.

1. Open a terminal (PowerShell on Windows, Terminal on macOS/Linux).
2. Clone the repository:
   ```bash
   git clone https://github.com/CanarysAutomations/cli_test_workshop.git
   ```
3. Open the cloned folder in VS Code:
   ```bash
   cd cli_test_workshop
   code .
   ```
---

## Step 2 — Install the GitHub Copilot Extension

| Extension | Purpose |
|-----------|---------|
| **GitHub Copilot Chat** | Chat panel, agents, inline chat |

**Installation steps:**
1. Open **Extensions** (`Ctrl+Shift+X` / `Cmd+Shift+X`).
2. Search for **GitHub Copilot Chat** (publisher: GitHub) and install it.
3. Reload VS Code if prompted.

> Both extensions are bundled in the latest VS Code releases. If you see them already listed under "Installed", skip this step.

---

## Step 3 — Sign In to GitHub Copilot

1. After installation, a **GitHub Copilot icon** appears in the bottom-right status bar.
2. Click the icon or open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and run **"GitHub Copilot: Sign In"**.
3. VS Code opens a browser window — authorise GitHub Copilot.
4. Sign in with your GitHub account and click **Authorize**.
5. Return to VS Code — the status bar icon should show a green check or the Copilot logo without an error indicator.

---

## Step 4 — Verify the Setup

1. In any file, type `function greet(name)` and confirm an inline suggestion appears; press **Tab** to accept.
2. Open Copilot Chat (`Ctrl+Alt+I` / `Cmd+Option+I`), type `Hello!`, and confirm you get a response.

---

## Step 5 — Explore Chat Participants

1. Open Copilot Chat.
2. Try `@vscode`:
   ```
   @vscode How do I split the editor into two side-by-side panes?
   ```
3. Open the terminal (`Ctrl+~`) and run a simple command:
   - Windows: `get-Date`
   - macOS/Linux: `date`
4. Ask `@terminal`:
   ```
   @terminal Explain the last command output in simple words.
   ```

## Key Takeaway

> GitHub Copilot is not just an autocomplete tool — it is an **AI pair programmer** with a chat interface and agent capabilities. The remaining exercises in this workshop build on top of each other to show you how to use it across the full testing lifecycle.

---

**Next**: [Exercise 02 — Run the T-Rex Runner Application](exercise-02-run-trex-runner.md)
