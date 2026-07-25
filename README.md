# AI-Assisted QA Workflow with Claude Code

Many QA engineers are caught in a cycle of manual testing that leaves little 
time to build automation skills. This project explores how AI-assisted tooling 
can handle the execution burden of manual testing, freeing QA engineers to 
shift left, invest in automation, and focus on higher-value work.

- A project demonstrating an AI-assisted `plan -> generate -> run` QA workflow 
  built as Claude Code subagents and skills.
- A planner subagent explores the live app and writes a structured test plan, 
  a generator subagent turns that plan into Playwright Page Objects and 
  specs, and a runner subagent executes the suite and reports results — each 
  stage invoked with a slash command.

Built to showcase practical QA automation skills including agent design, 
test planning, and AI-assisted test execution.

---

## How This Project Was Built

**Claude served as the strategic layer** — architecture decisions, agent and 
skill design, pattern evaluation, and approach validation.

**Claude Code's subagents served as the execution layer** — exploring the app, 
writing Playwright code, and running tests, each scoped to a single 
responsibility.

**The human orchestrated both** — deciding what to build, when to build it, 
and whether the output was acceptable.

This three-way collaboration — human + strategic AI + execution AI — is an intentional way of working in AI-assisted engineering.

---

## What This Project Demonstrates

- Using Claude Code subagents to drive a real browser (via the `claude-in-chrome` MCP tools) for exploratory test planning
- Designing single-responsibility subagents and skills that compose into a pipeline
- Generating structured test plans from live app exploration
- Converting test plans into Playwright automated tests with Page Object Model and Fixtures
- Security-minded test design (session/cookie checks, input validation, unauthenticated-route checks) implemented purely in Playwright
- Shared authentication session with `auth.setup.ts` and `storageState`
- Reusable, auditable pipeline artifacts — every plan and run gets a committed markdown report
- Integrating with a test management tool via REST API

---

## Engineering Decisions

These are decisions the I made that AI did not suggest:

- **`.env` for credentials** — AI defaulted to hardcoded values. Using `.env` 
  was a deliberate choice based on real-world security practice.
- **Folder structure** — the `pages/`, `fixtures/`, `ai-testing/`, 
  `.claude/` architecture was designed by the engineer, not generated.
- **Page Object Model with Fixtures** — identified as missing from the 
  AI-generated spec. I directed the implementation.
- **Shared auth session** — identified login repetition as a pattern problem 
  and directed the `auth.setup.ts` + `storageState` implementation.
- **Subagents and skills as committed artifacts** — decision to version-control 
  the agent/skill definitions so the workflow is repeatable and auditable.
- **Separate page objects per feature** — directed `EmployeeListPage` as a 
  separate class rather than merging into `AddEmployeePage`.
- **Splitting coverage by test category** — directed the generator to produce 
  separate E2E/security/integration spec files per feature rather than one 
  undifferentiated spec.
- **All commits and commit messages** — version control decisions, checkpoint 
  timing, and change descriptions were human choices throughout.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Playwright | Browser automation and test runner |
| TypeScript | Test authoring language |
| Claude Code | Subagents + skills that plan, generate, and run tests |
| `claude-in-chrome` MCP | Browser driving for the planner/generator's live app exploration |
| Claude (claude.ai) | Strategic AI layer — architecture and agent/skill design |
| OrangeHRM Demo | Application under test |
| GitHub Actions | CI/CD (planned) |

---

## Project Structure
```
ai-qa-workflow/
├── .claude/
│   ├── agents/                         # Claude Code subagent definitions
│   │   ├── qa-planner.md               # Explores the app, writes a test plan
│   │   ├── qa-generator.md             # Plan -> Playwright code
│   │   └── qa-runner.md                # Runs tests, writes a run report
│   └── skills/                         # Slash-command entry points
│       ├── qa-plan/SKILL.md            # /qa-plan <feature>
│       ├── qa-generate/SKILL.md        # /qa-generate <feature-slug>
│       ├── qa-run/SKILL.md             # /qa-run <feature-slug|all>
│       └── qa-feature/SKILL.md         # /qa-feature <feature> (full chain)
├── ai-testing/
│   ├── test-plans/                     # Planner output — one file per feature
│   └── test-runs/                      # Runner output — one file per run
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
│   └── add-employee/
│       ├── add-employee.e2e.spec.ts
│       ├── add-employee.security.spec.ts
│       └── add-employee.integration.spec.ts
├── playwright.config.ts
├── tsconfig.json
└── .envExample                         # Environment variable template
```

---

## How the Workflow Works

### 1. Plan — `qa-planner`
`/qa-plan <feature>` invokes the `qa-planner` subagent. It logs into the live 
app via `claude-in-chrome`, explores the target feature, and writes a 
structured test plan to `ai-testing/test-plans/[feature-slug]-plan.md` — 
scenarios grouped into E2E, Security, and Integration categories, each with 
an ID, preconditions, steps, and an expected result. It writes no code.

### 2. Generate — `qa-generator`
`/qa-generate <feature-slug>` invokes the `qa-generator` subagent. It reads 
the plan, reuses or creates the feature's Page Object(s), registers fixtures 
in `fixtures/baseTest.ts`, and writes one spec file per category present in 
the plan under `tests/[feature-slug]/`. It runs `npx tsc --noEmit` to catch 
type errors before handing off, but does not execute the suite.

### 3. Run — `qa-runner`
`/qa-run <feature-slug|all>` invokes the `qa-runner` subagent. It runs 
`npx playwright test`, parses pass/fail/flaky results, and writes a run 
report to `ai-testing/test-runs/YYYY-MM-DD_[feature-slug]-run.md`.

### Full chain — `qa-feature`
`/qa-feature <feature>` runs all three stages back-to-back for a brand-new 
feature, pausing to surface each stage's output.

### Authentication
`tests/auth.setup.ts` logs in once per test run using credentials from `.env`, 
saves the session to `playwright/.auth/user.json`, and all tests reuse it. 
The auth file is gitignored — it contains live session cookies regenerated 
on every run. Generated specs never add their own login steps.

---

## Getting Started

### Prerequisites
- Node.js 18+
- Claude Code with the `claude-in-chrome` MCP tools available
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

### Run the Pipeline
From a Claude Code session in this repo:
```
/qa-plan Add Employee
/qa-generate add-employee
/qa-run add-employee
```
Or run the full chain in one command:
```
/qa-feature Add Employee
```

### Run Automated Tests Directly
```bash
# Run all tests
npx playwright test

# Run all specs for one feature
npx playwright test tests/add-employee/

# Run a specific spec
npx playwright test tests/add-employee/add-employee.e2e.spec.ts

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

## QA Pipeline Reference

| Skill | Subagent | Output |
|---|---|---|
| `/qa-plan <feature>` | `qa-planner` | `ai-testing/test-plans/[feature-slug]-plan.md` |
| `/qa-generate <feature-slug>` | `qa-generator` | `pages/`, `fixtures/baseTest.ts`, `tests/[feature-slug]/*.spec.ts` |
| `/qa-run <feature-slug\|all>` | `qa-runner` | `ai-testing/test-runs/YYYY-MM-DD_[feature-slug]-run.md` |
| `/qa-feature <feature>` | all three, chained | all of the above |

---

## Author

Lara Caves — QA Automation Engineer
[GitHub](https://github.com/NewLara) · [LinkedIn](https://linkedin.com/in/laracaves)
