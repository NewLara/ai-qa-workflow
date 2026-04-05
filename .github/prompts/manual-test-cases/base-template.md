---
mode: agent
description: "Generate formal manual test cases from MCP session reports"
tools: ['edit/editFiles', 'search/codebase']
model: 'claude-sonnet-4-5'
---

# Manual Test Case Generator — Base Template

## Goal
Read a manual test run report and generate formal, structured test cases
suitable for a test management tool or automation conversion.

## Behavior Rules
- Read the specified input file before generating anything
- Do not invent test cases — only derive from what was observed in the report
- Keep steps atomic — one action per step
- Expected results must be specific and verifiable
- If an observation was flagged in the report, include it as a test case

## Category Limits
- Happy Path: max 3
- Negative: max 5
- Edge Case: max 2

## Output
- Save to `ai-testing/manual-test-cases/[feature-name]-test-cases.md`
- Use this format for each test case:

**TC-001**
- **Title:** Short descriptive title
- **Category:** Happy Path | Negative | Edge Case
- **Preconditions:** What must be true before the test runs
- **Steps:**
  1. Step one
  2. Step two
- **Expected Result:** What should happen