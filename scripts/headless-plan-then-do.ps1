# Lesson 6 - multi-step automation with sessions (PowerShell).
# Step 1 makes a plan, step 2 resumes the SAME session and carries it out.

$plan = claude -p "Plan how to add a reverse(text) function with tests. Don't edit any files yet." --output-format json | ConvertFrom-Json

Write-Host "----- PLAN -----"
$plan.result
Write-Host "Session ID: $($plan.session_id)"

Read-Host "Press Enter to carry out the plan (Ctrl+C to stop)"

claude -p --resume $plan.session_id "Now implement the plan and run npm test." --permission-mode acceptEdits
