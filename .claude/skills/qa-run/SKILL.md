---
name: qa-run
description: Run the generated Playwright tests for a feature (or the whole suite) and report pass/fail results. Use when the user runs /qa-run <feature|all> or asks to execute tests and see results.
---

# /qa-run

Delegates to the `qa-runner` subagent to execute Playwright tests and
report results.

## Steps
1. Take the feature slug from the arguments after `/qa-run` (e.g.
   `/qa-run add-employee`), or `all` for the full suite. If no argument was
   given, ask which feature (or `all`).
2. Invoke the `qa-runner` subagent via the `Agent` tool
   (`subagent_type: "qa-runner"`, `run_in_background: false`) with the
   feature slug or `all`.
3. Once it returns, relay the pass/fail summary and point at the saved run
   report under `ai-testing/test-runs/`. If there were failures, say
   whether they look like a real app issue vs a generation problem (the
   runner should already flag this) and suggest next steps — e.g. sending
   generation issues back through `/qa-generate`.
