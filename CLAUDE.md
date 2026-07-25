# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Project Is

An AI-assisted QA workflow demonstrating a `plan -> generate -> run` pipeline of Claude Code subagents and skills: a planner explores the live app and writes a test plan, a generator turns that plan into Playwright Page Objects/fixtures/specs, and a runner executes the suite and reports results. The application under test is OrangeHRM demo (HR management system).

## Commands

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Run all tests (auth setup runs first automatically)
npx playwright test

# Run a specific spec file
npx playwright test tests/add-employee/add-employee.e2e.spec.ts

# Run all specs for one feature
npx playwright test tests/add-employee/

# Run with browser visible
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Run in UI mode
npx playwright test --ui
```

There is no lint or build script configured. TypeScript is transpiled by Playwright at runtime.

## Architecture

### QA Pipeline: Subagents + Skills
Three subagents in `.claude/agents/`, each invoked via a matching skill in
`.claude/skills/`:
1. **`qa-planner`** (`/qa-plan <feature>`) — drives the live app via
   `claude-in-chrome` MCP tools, explores the target feature, and writes a
   test plan (E2E, Security, Integration scenarios) to
   `ai-testing/test-plans/[feature-slug]-plan.md`. Writes no code.
2. **`qa-generator`** (`/qa-generate <feature-slug>`) — reads a test plan and
   generates/updates the Page Object(s), registers fixtures, and writes one
   spec file per category under `tests/[feature-slug]/`. Runs
   `npx tsc --noEmit` to sanity-check; does not run the test suite.
3. **`qa-runner`** (`/qa-run <feature-slug|all>`) — executes
   `npx playwright test` for the feature (or the whole suite), parses
   results, and writes a run report to `ai-testing/test-runs/`.

`/qa-feature <feature>` chains all three for a brand-new feature end-to-end.

Security scenarios stay in Playwright — session/cookie checks, XSS-payload
reflection checks, unauthenticated-route checks (via a per-describe
`storageState` override), and response header checks via the `request`
fixture. No external security tooling is used at this project's scope.

### Playwright Test Structure
- **Page Objects** (`pages/`) — one class per feature area, locators and actions only
- **Fixtures** (`fixtures/baseTest.ts`) — extends `base.extend<TestFixtures>` to inject page objects; specs import `test` and `expect` from here, not from `@playwright/test` directly
- **Auth setup** (`tests/auth.setup.ts`) — runs once per test run, saves session to `playwright/.auth/user.json`; all other tests depend on the `setup` project and receive `storageState` automatically via `playwright.config.ts`

### Environment
Copy `.envExample` to `.env` and fill in credentials. The config reads `BASE_URL`, `TEST_USERNAME`, and `TEST_PASSWORD` via `dotenv`. The `playwright/.auth/` directory is gitignored — auth state regenerates on every run.
