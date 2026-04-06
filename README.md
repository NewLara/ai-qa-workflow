# AI-Assisted QA Workflow with Playwright MCP

Many QA engineers are caught in a cycle of manual testing that leaves little 
time to build automation skills. This project explores how AI-assisted tooling 
can handle the execution burden of manual testing, freeing QA engineers to 
shift left, invest in automation, and focus on higher-value work.

- A project demonstrating an AI-assisted manual and automated testing workflow 
  using Playwright MCP in Cursor.
- The Cursor agent reads structured prompt files, executes test scenarios through Playwright MCP, and generates markdown test reports.

Built to showcase practical QA automation skills including prompt engineering, 
test design, and AI-assisted test execution.

---

## How This Project Was Built

This project was not built by prompting an AI and accepting the output. Every 
decision was deliberate. The process:

1. Human identifies a need or idea
2. Human consults Claude (claude.ai) to design and vet the approach
3. Claude generates a prompt or plan
4. Human reviews, refines, and approves
5. Human feeds the prompt to Cursor
6. Cursor implements, runs, and validates
7. Human reviews output and commits
8. Human runs maintenance prompts periodically to keep the project consistent

**Claude served as the strategic layer** — architecture decisions, prompt design, 
pattern evaluation, and approach validation.

**Cursor served as the execution layer** — writing code, running tests, fixing 
failures, and refactoring.

**The human orchestrated both** — deciding what to build, when to build it, 
and whether the output was acceptable.

This three-way collaboration — human + strategic AI + execution AI is an intentional way of working in AI-assisted engineering.

---

## What This Project Demonstrates

- Using Playwright MCP in Cursor to drive a real browser for manual test execution
- Designing lean, reusable prompt files that guide AI-assisted test sessions
- Generating structured manual test reports from MCP sessions
- Converting manual test cases into Playwright automated tests
- Page Object Model with Playwright Fixtures
- Shared authentication session with `auth.setup.ts` and `storageState`
- Reusable maintenance and setup prompts for keeping the project consistent
- Integrating with a test management tool via REST API (planned)

---

## Engineering Decisions

These are decisions the I made that AI did not suggest:

- **`.env` for credentials** — AI defaulted to hardcoded values. Using `.env` 
  was a deliberate choice based on real-world security practice.
- **Folder structure** — the `pages/`, `fixtures/`, `ai-testing/`, 
  `.github/prompts/` architecture was designed by the engineer, not generated.
- **Page Object Model with Fixtures** — identified as missing from the 
  AI-generated spec. I directed the implementation.
- **Shared auth session** — identified login repetition as a pattern problem 
  and directed the `auth.setup.ts` + `storageState` implementation.
- **Prompt files as committed artifacts** — decision to version-control prompt 
  files so the workflow is repeatable and auditable.
- **Separate page objects per feature** — directed `EmployeeListPage` as a 
  separate class rather than merging into `AddEmployeePage`.
- **All commits and commit messages** — version control decisions, checkpoint 
  timing, and change descriptions were human choices throughout.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Playwright | Browser automation and test runner |
| TypeScript | Test authoring language |
| Cursor + Playwright MCP | AI-assisted manual test execution |
| Claude (claude.ai) | Strategic AI layer — architecture and prompt design |
| OrangeHRM Demo | Application under test |
| TestRail | Test case management API integration (planned) |
| GitHub Actions | CI/CD (planned) |

---

## Project Structure
```
ai-qa-workflow/
├── .github/
│   └── prompts/                        # Cursor Agent prompt files
│       ├── README.md                   # Prompt folder documentation
│       ├── manual-runs/                # MCP manual test session prompts
│       ├── manual-test-cases/          # Test case generation prompts
│       ├── automation-test-cases/      # Playwright spec generation prompts
│       └── setup-and-maintenance/      # Project setup and audit prompts
├── ai-testing/
│   ├── manual-runs/                    # MCP-generated test reports
│   └── manual-test-cases/             # Generated formal test cases
├── pages/                              # Page Object Model classes
│   ├── AddEmployeePage.ts
│   └── EmployeeListPage.ts
├── fixtures/                           # Custom Playwright fixtures
│   └── baseTest.ts
├── playwright/                         # Playwright-specific artifacts
│   └── .auth/                          # Auth session storage (gitignored)
│       └── user.json                   # Session state — never committed
├── tests/                              # Playwright spec files
│   ├── auth.setup.ts                   # Shared auth session setup
│   ├── add-employee/
│   │   └── add-employee.spec.ts
│   └── login/
├── utils/                              # Helper functions (planned)
├── data/                               # Static test data (planned)
├── docs/                               # Reference documentation
├── playwright.config.ts
├── tsconfig.json
└── .envExample                         # Environment variable template
```

---

## How the Workflow Works

### 1. Manual Testing with MCP
Prompt files in `.github/prompts/manual-runs/` define the application under 
test, behavior rules, and test scenarios. The Cursor agent reads the prompts, 
navigates a real browser through Playwright MCP, executes each scenario, and 
generates a structured markdown report saved to `ai-testing/manual-runs/`.

### 2. Prompt File Architecture
A two-tier structure keeps prompt files lean and reusable. Each category has 
its own `base-template.md` with shared rules. Feature files reference the base 
and add only what is scenario-specific. See `.github/prompts/README.md` for 
full documentation.

### 3. Test Case Generation
MCP session reports are fed into test case generation prompts that produce 
formal, structured test cases saved to `ai-testing/manual-test-cases/`. These 
serve as the source of truth for automation.

### 4. Automated Tests
Formal test cases are converted into Playwright TypeScript specs using 
automation prompts. Generated specs follow production-grade patterns:
- Page Object Model with dedicated page classes in `pages/`
- Playwright Fixtures in `fixtures/baseTest.ts` for automatic page injection
- Shared auth session — login runs once via `auth.setup.ts`, session reused 
  across all tests via `storageState`

### 5. Authentication
`tests/auth.setup.ts` logs in once per test run using credentials from `.env`, 
saves the session to `playwright/.auth/user.json`, and all tests reuse it. 
The auth file is gitignored — it contains live session cookies regenerated 
on every run.

### 6. Maintenance
`.github/prompts/setup-and-maintenance/` contains reusable prompts for 
recurring tasks — auditing prompt files for outdated patterns, implementing 
new architectural patterns, and keeping the project consistent as it grows.

---

## Getting Started

### Prerequisites
- Node.js 18+
- Cursor Pro with Playwright MCP configured
- OrangeHRM demo credentials (public — see `.envExample`)

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
Use .github/prompts/manual-runs/base-template.md and
.github/prompts/manual-runs/orangehrm-login.md to perform a manual
test session. Reference the .env file for credentials.
```
### Run Automated Tests
```bash
# Run all tests
npx playwright test

# Run a specific spec
npx playwright test tests/add-employee/add-employee.spec.ts

# Run with browser visible
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Run in UI mode
npx playwright test --ui
```

---

## Application Under Test

**OrangeHRM** — open source HR management system
**URL:** https://opensource-demo.orangehrmlive.com
**Credentials:** See `.envExample`

Chosen for its realistic enterprise workflows — employee management, leave 
requests, user roles — that mirror real-world QA scenarios. Not a toy app.

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