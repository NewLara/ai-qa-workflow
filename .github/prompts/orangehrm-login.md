# OrangeHRM Login Test Session

## Reference
Use base-template.md for role, application, and behavior rules.

## Feature Under Test
Login functionality — OrangeHRM authentication page

## Session Goal
Manually test the OrangeHRM login feature using Playwright MCP. 
Navigate, interact, and report results for each scenario below.

## Test Scenarios

### Happy Path
1. Navigate to the login page
2. Enter valid credentials (Admin / admin123)
3. Click the Login button
4. Verify successful login — dashboard should load with user menu visible

### Negative Tests (max 3)
1. Submit empty username and password — verify error message appears
2. Enter invalid username with valid password — verify error message appears
3. Enter valid username with invalid password — verify error message appears

### Edge Cases (max 2)
1. Enter username with leading/trailing spaces — observe behavior
2. Use browser back button after successful login — observe behavior

## Output
After completing all scenarios, provide a summary table:
| Scenario | Steps Taken | Result | Status |
|---|---|---|---|

## Screenshot Instructions
- Save all screenshots to the `test-results/screenshots/` folder
- Name screenshots sequentially: `01-description.png`, `02-description.png`, etc.