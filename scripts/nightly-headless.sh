#!/usr/bin/env bash
# Lesson 6 - headless mode from a script (run in Git Bash / Mac / Linux).
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p reports

claude -p "Run the tests, review src/ for bugs or missing tests, and write a short report. Do not edit any files." \
  --allowedTools "Read,Grep,Glob,Bash(npm test)" \
  --output-format text \
  > "reports/nightly-$(date +%F).md"

echo "Report saved to reports/nightly-$(date +%F).md"
