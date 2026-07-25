---
name: qa-generate
description: Generate Playwright Page Objects, fixtures, and spec files from an existing test plan. Use when the user runs /qa-generate <feature> or asks to turn a test plan into runnable Playwright code.
---

# /qa-generate

Delegates to the `qa-generator` subagent to turn an existing test plan into
Playwright code.

## Steps
1. Take the feature slug from the arguments after `/qa-generate` (e.g.
   `/qa-generate add-employee`).
2. Resolve the plan file: `ai-testing/test-plans/[feature-slug]-plan.md`. If
   it doesn't exist, tell the user to run `/qa-plan` first instead of
   guessing at scenarios yourself.
3. Invoke the `qa-generator` subagent via the `Agent` tool
   (`subagent_type: "qa-generator"`, `run_in_background: false`) with a
   prompt containing the plan file path.
4. Once it returns, summarize what was created/modified (Page Objects,
   fixture entries, spec files) and the final `tsc` result. Point the user
   at `/qa-run [feature-slug]` as the next step.
