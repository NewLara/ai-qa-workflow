---
mode: agent
description: "Implement Page Object Model with Fixtures for a Playwright spec file"
tools: ['edit/editFiles', 'search/codebase', 'runCommands']
model: 'claude-sonnet-4-5'
---

# Implement Page Object Model with Fixtures

## Goal
Refactor an existing Playwright spec file to use Page Object Model with 
Playwright Fixtures following standard conventions.

## Folder Structure
Create the following if they do not already exist:
- `pages/` — POM classes
- `fixtures/` — Custom Playwright fixtures
- `utils/` — Utility functions (add .gitkeep if empty)
- `data/` — Static test data (add .gitkeep if empty)

## Page Object Requirements
- Read the target spec file before generating anything
- Extract ALL locators from the spec as readonly class properties
- Class name: `[FeatureName]Page` (PascalCase)
- Constructor accepts `page: Page`
- Save to `pages/[FeatureName]Page.ts`

### Navigation
- Single `navigateToFeature()` method that handles all navigation steps
- Do not create separate methods per navigation step

### Form Methods
- Single `fillForm(field1, field2...)` method for standard form filling
- Separate `setFieldName(value)` methods for fields that need individual control

### Waits
- All `waitForLoadState()` and timing logic belongs inside page object methods
- Specs must not contain any wait logic

### Separate Pages
- If the spec navigates to a second distinct page, create a separate Page Object for it
- Do not put unrelated page locators in the same class

## Fixtures Requirements
- Create `fixtures/baseTest.ts`
- Extend Playwright base `test` with custom fixtures
- One fixture per page object
- Export `test` and `expect` from this file

## Spec Update Requirements
- Import `test` and `expect` from `../../fixtures/baseTest`
- Use fixtures directly in test function arguments — no manual instantiation
- Remove all inline locators
- Remove all wait logic
- Keep all assertions in the spec file — never in page objects

## Locator Quality Rules
- Never use positional locators like `allInputs.last()` in page objects
- Use specific, stable locators: `getByRole`, `getByLabel`, `locator('[name="x"]')`
- If a locator is fragile, note it with a comment

## After Implementation
1. Update `tsconfig.json` to include new folders if needed
2. Run `npx playwright test`
3. Fix any failures before finishing
4. Report final pass/fail count

## Important
Ask clarifying questions before implementing if anything about the 
current spec structure is unclear. Do not assume — confirm first.