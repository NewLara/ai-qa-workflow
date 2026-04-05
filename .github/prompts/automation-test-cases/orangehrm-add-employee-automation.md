---
mode: agent
description: "Generate Playwright TypeScript spec from Add Employee manual test cases"
tools: ['edit/editFiles', 'search/codebase']
model: 'claude-sonnet-4-5'
---

# Generate Playwright Spec — OrangeHRM Add Employee

## Reference
Follow all rules in `.github/prompts/automation-test-cases/base-template.md`

## Input
Read this file before generating anything:
`ai-testing/manual-test-cases/orangehrm-add-employee-test-cases.md`

## Output
Save to `tests/add-employee/add-employee.spec.ts`