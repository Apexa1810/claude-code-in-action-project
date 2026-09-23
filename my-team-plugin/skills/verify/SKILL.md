---
name: verify
description: Verify a code change before calling it done. Use after editing code in src/ or tests/, before finishing a task, or when asked to check work.
---

# Verify the change

1. Run the `check.js` script that sits in this skill's folder (next to this SKILL.md) with `node`, and read its output.
2. Read the full `git diff` yourself. Confirm every change matches the task and nothing unrelated was touched.
3. If the script flags removed assertions or skipped tests, decide whether each one was justified. If you're not sure, see [reference.md](reference.md).
4. Report in this format:

## Verification
- Tests: <pass>/<total> passing (from check.js output)
- Files changed: <list>
- Tests weakened: <none, or each flagged line and why it's OK>
- Result: PASS or FAIL

Never report PASS if tests fail or a test was weakened without a clear reason.
