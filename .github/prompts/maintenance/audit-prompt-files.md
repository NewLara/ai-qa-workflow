---
mode: agent
description: "Audit all prompt files for accuracy, consistency, and outdated patterns"
tools: ['edit/editFiles', 'search/codebase', 'search/searchResults']
model: 'claude-sonnet-4-5'
---

# Audit Prompt Files for Accuracy

## Goal
Review all prompt files in `.github/prompts/` for accuracy and consistency, based on current file structure and code implementation. 

## What to Check

### Outdated Patterns
- Any `beforeEach` with login steps — auth is handled by `auth.setup.ts` and 
  `storageState`, `beforeEach` should only have `page.goto()`
- Any references to old folder paths (`test-cases/manual/`, `tests/generated/`)
- Any references to `base-template.md` without the correct subfolder path

### Consistency
- All prompt files reference their category `base-template.md` correctly
- `automation-test-cases/base-template.md` reflects POM pattern and shared auth
- Spec file structure example does not include login steps
- File output paths match current folder structure

## Rules
- Do not change anything that is already correct
- Report every file checked, what was found, and what was changed