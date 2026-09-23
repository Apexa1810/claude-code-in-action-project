# Lesson 4 - dontAsk mode: only pre-approved tools run, everything else is denied (no prompt).

Write-Host "1) Allowed: running tests"
claude -p "Run the tests and summarize the results" --permission-mode dontAsk --allowedTools "Bash(npm test)" "Read"

Write-Host "`n2) Not allowed: creating a file (should be denied, not hang)"
claude -p "Create a file called notes.txt containing hello" --permission-mode dontAsk --allowedTools "Read"
