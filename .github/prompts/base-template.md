---
mode: agent
description: "Manually test a site using Playwright MCP and generate a structured test report"
tools: ['changes', 'search/codebase', 'edit/editFiles', 'fetch', 'problems', 'runCommands', 'runTasks', 'runTests', 'search', 'search/searchResults', 'runCommands/terminalLastCommand', 'runCommands/terminalSelection', 'testFailure', 'microsoft/playwright-mcp/*']
model: 'claude-sonnet-4-5'
---

# Playwright MCP Base Template

## Application Under Test
- **Name:** OrangeHRM
- **URL:** https://opensource-demo.orangehrmlive.com
- **Type:** Open source HR management system
- **Credentials:** local .env file 


## Behavior Rules
- Always navigate to the base URL before starting a test session
- Use `browser_snapshot` to understand page structure before interacting — do not guess at selectors
- Handle unexpected modals or overlays with `browser_handle_dialog` or click dismiss before continuing
- Take a screenshot after each significant action
- Save all screenshots to `test-results/screenshots/` named sequentially: `01-description.png`
- Report what you see after each step — do not assume success
- If an element is not found, report it clearly — do not skip it
- Do not use `openSimpleBrowser` — use Playwright MCP browser tools only
- Close the browser after completing the session using `browser_close`

## Testing Instructions
1. If no test scenario is provided, ask the user to provide one before proceeding
2. Navigate to the application URL and log in using the credentials above
3. Navigate through the application like a real user — snapshot first, then act
4. For each step in the scenario:
   - Confirm page state with `browser_snapshot` or visible text before acting
   - Perform the action using the appropriate MCP tool
   - Verify the outcome (expected vs actual)
   - Screenshot evidence on both pass and failure
5. After completing all scenarios, generate a report file and close the browser

## Report Output
- Save report to `test-cases/manual/` using this naming convention: `YYYY-MM-DD_[feature-name].md`
- Use this format:
```markdown
# Manual Test Report — [Feature or Scenario Name]
**Date:** YYYY-MM-DD
**Tester:** Playwright MCP Agent
**Environment:** https://opensource-demo.orangehrmlive.com
**Scenario:** [Brief description of what was tested]

---

## Steps & Results

| Step | Action | Expected | Actual | Status |
|---|---|---|---|---|
| 1 | Navigate to login | Login page loads | Login page loaded | ✅ Pass |

---

## Issues Found
- [Issue description, element affected, URL, screenshot reference]

## Screenshots
- `test-results/screenshots/01-description.png` — [what it shows]

## Summary
[2-3 sentence overall result. Pass or Fail. Any blockers or items for follow-up.]
```