// PreToolUse hook (Bash): replaces secret keys with "<prefix>REDACTED"
// so the command still runs but the secret never goes through.
let raw = "";
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  let input;
  try { input = JSON.parse(raw); } catch { process.exit(0); }

  const toolInput = input.tool_input || {};
  const command = toolInput.command || "";

  // Known secret-key prefixes (Stripe, Anthropic, OpenAI, GitHub, Slack, npm, AWS, Google)
  const pattern = /(sk_live_|sk_test_|rk_live_|sk-ant-|sk-|ghp_|github_pat_|xoxb-|npm_|AKIA|AIza)[A-Za-z0-9_\-]+/g;

  if (!pattern.test(command)) process.exit(0); // nothing to do
  pattern.lastIndex = 0;

  const output = {
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "allow",
      permissionDecisionReason: "Redacted a secret key from the command.",
      // updatedInput replaces the WHOLE input, so copy every field back.
      updatedInput: { ...toolInput, command: command.replace(pattern, (match, prefix) => prefix + "REDACTED") }
    }
  };
  process.stdout.write(JSON.stringify(output));
  process.exit(0);
});
