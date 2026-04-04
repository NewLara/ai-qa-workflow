---
mode: agent
description: "OrangeHRM login manual test session using Playwright MCP"
tools: ['changes', 'search/codebase', 'edit/editFiles', 'fetch', 'problems', 'runCommands', 'runTasks', 'runTests', 'search', 'search/searchResults', 'runCommands/terminalLastCommand', 'runCommands/terminalSelection', 'testFailure', 'microsoft/playwright-mcp/*']
model: 'claude-sonnet-4-5'
---

# OrangeHRM Login Test Session

## Reference
Follow all rules in `.github/prompts/base-template.md` for behavior, screenshots, and report output.

## Feature Under Test
Login functionality — OrangeHRM authentication page

## Session Goal
Manually test the OrangeHRM login feature using Playwright MCP.
Navigate, interact, and report results for each scenario below.

## Test Scenarios

### Happy Path (max 2)
1. Navigate to login page, enter valid credentials, click Login — verify dashboard loads
2. Verify logged-in user name is visible in the top navigation after login

### Negative Tests (max 3)
1. Submit empty username and password — verify error message appears
2. Enter invalid username with valid password — verify error message appears
3. Enter valid username with invalid password — verify error message appears

### Edge Cases (max 2)
1. Enter username with leading/trailing spaces — observe behavior
2. Use browser back button after successful login — observe behavior