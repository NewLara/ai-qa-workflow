---
name: qa-feature
description: Run the full plan -> generate -> run pipeline for a feature end-to-end. Use when the user runs /qa-feature <feature> or wants a brand-new feature covered from scratch without invoking each stage manually.
---

# /qa-feature

Convenience chain that runs `qa-planner` -> `qa-generator` -> `qa-runner` in
sequence for one feature, pausing between stages so the user can review.

## Steps
1. Take the feature name/description from the arguments after
   `/qa-feature` (e.g. `/qa-feature Add Employee`). If none given, ask.
2. Invoke `qa-planner` (`subagent_type: "qa-planner"`,
   `run_in_background: false`) with the feature name. Summarize the plan
   for the user.
3. Invoke `qa-generator` (`subagent_type: "qa-generator"`,
   `run_in_background: false`) with the plan file path from step 2.
   Summarize what was created and the `tsc` result.
4. Invoke `qa-runner` (`subagent_type: "qa-runner"`,
   `run_in_background: false`) with the feature slug. Summarize pass/fail
   results and point at the saved run report.
5. If any stage surfaces a blocking problem (e.g. the planner couldn't find
   the feature in the app, or generation left type errors), stop and report
   it instead of continuing to the next stage.
