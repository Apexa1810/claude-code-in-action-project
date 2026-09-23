# Lesson 5 - Python version of a secret-redaction PreToolUse hook (course style).
# NOT active. To use it instead of redact-secrets.js, copy it to .claude/hooks/
# and in .claude/settings.json use:
#   "command": "python \"$CLAUDE_PROJECT_DIR/.claude/hooks/redact_secrets_python_example.py\""
import json
import re
import sys

SECRET_PATTERN = r"(sk-[A-Za-z0-9]{10,}|SECRET_TOKEN=[^\s'\"]+)"

payload = json.load(sys.stdin)
command = payload.get("tool_input", {}).get("command", "")

if re.search(SECRET_PATTERN, command):
    redacted_command = re.sub(SECRET_PATTERN, "REDACTED-TOKEN", command)
    new_input = dict(payload.get("tool_input", {}))
    new_input["command"] = redacted_command
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "allow",
            "permissionDecisionReason": "Redacted a secret from the command.",
            "updatedInput": new_input,
        }
    }))

sys.exit(0)
