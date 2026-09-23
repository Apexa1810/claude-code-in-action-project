# Lesson 6 - structured JSON output from headless mode (PowerShell).
# Run from the project folder:  powershell -File scripts/headless-json.ps1
# If you get a quotes/JSON error on old Windows PowerShell 5.1, use PowerShell 7 (pwsh) or Git Bash.

$schema = '{"type":"object","properties":{"functions":{"type":"array","items":{"type":"string"}}},"required":["functions"]}'

$result = claude -p "List the exported function names in src/app.js" --output-format json --json-schema $schema | ConvertFrom-Json

Write-Host "Exported functions:"
$result.structured_output.functions
