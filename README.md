# AI-Assisted QA Workflow with Playwright MCP

Many QA engineers are caught in a cycle of manual testing that leaves little time to build automation skills. This project explores how AI-assisted tooling can handle the execution burden of manual testing, freeing QA engineers to shift left, invest in automation, and focus on higher-value work.

- A project demonstrating an AI-assisted manual and automated testing workflow using Playwright MCP in Cursor. 
- Playwright MCP (Model Context Protocol) is a browser control integration that gives Cursor's AI agent the ability to drive a real browser, no test code required. 
- The Cursor agent reads structured prompt files, executes test scenarios through Playwright MCP, and generates markdown test reports.

Built to showcase practical QA automation skills including prompt engineering, 
test design, and AI-assisted test execution. 

---

## What This Project Demonstrates

- Using Playwright MCP in Cursor to drive a real browser for manual test execution
- Designing lean, reusable prompt files that guide AI-assisted test sessions
- Generating structured manual test reports from MCP sessions
- Converting manual test cases into Playwright automated tests (WIP)
- Integrating with a test management tool via REST API (WIP)

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Playwright | Browser automation and test runner |
| TypeScript | Test authoring language |
| Cursor + Playwright MCP | AI-assisted manual test execution |
| OrangeHRM Demo | Application under test |
| TestRail | Test case management (API integration) |
| GitHub Actions | CI/CD (planned) |

---

## Project Structure
```
ai-qa-workflow/
├── .github/
│   └── prompts/                       # Cursor MCP prompt files
│       ├── manual-runs/               # Manual test session prompts
│       │   ├── base-template.md       # Base rules, behavior, report format
│       │   ├── orangehrm-login.md     # Login feature test session
│       │   └── orangehrm-add-employee.md  # Add Employee test session
│       ├── manual-test-cases/         # Manual test case definitions
│       └── automation-test-cases/     # Automation test case prompts
├── docs/                              # Reference documentation
├── ai-testing/
│   ├── manual-runs/                   # MCP-generated test reports
│   └── manual-test-cases/             # Manual test case outputs
├── tests/
│   ├── login/                         # Login Playwright tests
│   └── add-employee/                  # Add Employee Playwright tests
├── playwright.config.ts
├── tsconfig.json
└── .envExample                        # Environment variable template
```

---

## How the Workflow Works

### 1. Playwright MCP (Model Context Protocol) is a browser control integration that gives Cursor's AI agent the ability to drive a real browser, no test code required. Prompt files in .github/prompts/ define the application under test, behavior rules, and test scenarios. The Cursor agent reads the prompts, executes scenarios through Playwright MCP, and generates a structured markdown report.

### 2. Prompt File Architecture
A two-tier prompt structure keeps files lean and reusable:
- `base-template.md` — shared rules, screenshot conventions, report format
- Feature files (e.g. `orangehrm-login.md`)- reference the base and define scenarios

### 3. Test Reports
MCP sessions produce structured reports saved to `ai-testing/manual-runs/` with
step-by-step results, observations, and pass/fail status.

### 4. Automated Tests (In Progress)
Manual test cases are converted into Playwright TypeScript tests saved
to `tests/login/` or `tests/add-employee/` depending on the feature.

### 5. Test Management Integration (In Progress)
Test cases are pushed to and fetched from TestRail via REST API.

---

## Getting Started

### Prerequisites
- Node.js 18+
- Cursor Pro with Playwright MCP configured
- OrangeHRM demo credentials (public see `.envExample`)

### Setup
```bash
git clone https://github.com/NewLara/ai-qa-workflow.git
cd ai-qa-workflow
npm install
npx playwright install chromium
cp .envExample .env
# Edit .env with your credentials
```

### Configure Playwright MCP in Cursor
Add to `~/.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

Restart Cursor and verify the playwright server shows a green dot under
Settings > Tools & MCPs.

### Run an MCP Test Session
Open a new Agent chat in Cursor and reference a prompt file:
```
Use .github/prompts/manual-runs/base-template.md and .github/prompts/manual-runs/orangehrm-login.md
to perform a manual test session. Reference the .env file for credentials.
```

### Run Automated Tests

Run all tests:
```bash
npx playwright test
```

Run a specific test file:
```bash
npx playwright test tests/add-employee/add-employee.spec.ts
```

Run tests with browser visible:
```bash
npx playwright test --headed
```

Run tests in debug mode:
```bash
npx playwright test --debug
```

Run tests in UI mode (interactive):
```bash
npx playwright test --ui
```

---

## Application Under Test

**OrangeHRM** — open source HR management system  
**URL:** https://opensource-demo.orangehrmlive.com  
**Credentials:** See `.envExample`

Chosen for its realistic enterprise workflows (employee management, leave
requests, user roles) that mirror real-world QA scenarios.

---

## Playwright MCP Tools Reference

| Tool | Purpose |
|---|---|
| `browser_navigate` | Navigate to a URL |
| `browser_click` | Click an element |
| `browser_fill` | Clear and fill an input field |
| `browser_snapshot` | Capture accessibility snapshot |
| `browser_screenshot` | Take a screenshot |
| `browser_wait_for` | Wait for element or condition |
| `browser_handle_dialog` | Accept or dismiss dialogs |
| `browser_press_key` | Press a keyboard key |
| `browser_evaluate` | Run JavaScript in browser context |
| `browser_network_requests` | Inspect network requests |
| `browser_close` | Close the browser |

---

## Author

Lara Caves — QA Automation Engineer  
[GitHub](https://github.com/NewLara) · [LinkedIn](https://linkedin.com/in/laracaves)