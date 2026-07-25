---
name: qa-plan
description: Plan test coverage for a feature of the OrangeHRM app. Use when the user runs /qa-plan <feature> or asks to plan/scope tests for a feature before writing any Playwright code.
---

# /qa-plan

Delegates to the `qa-planner` subagent to explore a feature in the live
OrangeHRM app and produce a structured test plan.

## Steps
1. Take the feature name/description from the arguments after `/qa-plan`
   (e.g. `/qa-plan Add Employee`). If no argument was given, ask the user
   which feature to plan before proceeding.
2. Invoke the `qa-planner` subagent via the `Agent` tool
   (`subagent_type: "qa-planner"`, `run_in_background: false`) with a prompt
   containing: the feature name/description verbatim, and a reminder of
   where to save output (`ai-testing/test-plans/[feature-slug]-plan.md`).
3. Once the subagent returns, summarize the plan for the user (scenario
   counts per category, anything it flagged as skipped or uncertain) and
   point them at the saved file. Don't just relay the raw report.
