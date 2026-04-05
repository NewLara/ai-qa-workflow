---
mode: agent
description: "Generate Playwright TypeScript test files from formal manual test cases"
tools: ['edit/editFiles', 'search/codebase']
model: 'claude-sonnet-4-5'
---

# Playwright Automation Generator — Base Template

## Goal
Read a formal manual test case file and convert it into a Playwright 
TypeScript spec file.

## Behavior Rules
- Read the specified input file before generating anything
- Generate one `describe` block per feature
- Generate one `test` block per test case
- Use the TC number and title as the test name
- Load credentials from `.env` using `process.env`
- Use `page.goto()` for navigation
- Use locators over CSS selectors where possible
- Add `await expect()` assertions for every expected result
- Do not add logic not supported by the manual test case
- If a test case has a known issue noted, add a comment in the test

## File Conventions
- Use `async/await` throughout
- Import from `@playwright/test` only
- One spec file per feature saved to `tests/[feature-name]/[feature-name].spec.ts`

## Spec File Structure
```typescript
import { test, expect } from '@playwright/test';

test.describe('[Feature Name]', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.BASE_URL!);
    await page.fill('[name="username"]', process.env.TEST_USERNAME!);
    await page.fill('[name="password"]', process.env.TEST_PASSWORD!);
    await page.click('[type="submit"]');
  });

  test('TC-001 - title here', async ({ page }) => {
    // test steps
  });
});
```