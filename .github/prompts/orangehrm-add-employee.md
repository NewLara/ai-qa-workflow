---
mode: agent
description: "OrangeHRM Add Employee manual test session using Playwright MCP"
tools: ['changes', 'search/codebase', 'edit/editFiles', 'fetch', 'problems', 'runCommands', 'runTasks', 'runTests', 'search', 'search/searchResults', 'runCommands/terminalLastCommand', 'runCommands/terminalSelection', 'testFailure', 'microsoft/playwright-mcp/*']
model: 'claude-sonnet-4-5'
---

# OrangeHRM Add Employee Test Session

## Reference
Follow all rules in `.github/prompts/base-template.md` for behavior, screenshots, and report output.

## Feature Under Test
Add Employee — OrangeHRM PIM (Personnel Information Management) module

## Session Goal
Manually test the Add Employee feature using Playwright MCP.
Navigate, interact, and report results for each scenario below.

## Test Scenarios

### Happy Path (max 2)
1. Log in, navigate to PIM > Add Employee, enter first name, last name, and employee ID — verify employee is saved and profile page loads
2. Verify the newly added employee appears in the Employee List

### Negative Tests (max 3)
1. Submit Add Employee form with all fields empty — verify required field errors appear
2. Submit with first name only, leave last name empty — verify error appears on last name
3. Enter a duplicate employee ID — observe behavior and error handling

### Edge Cases (max 2)
1. Enter special characters in first name field (e.g. `@#$%`) — observe behavior
2. Enter a very long string (50+ characters) in the last name field — observe behavior