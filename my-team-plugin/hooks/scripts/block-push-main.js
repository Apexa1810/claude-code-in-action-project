// PreToolUse hook (Bash): block any git push to main/master.
const { execSync } = require("child_process");

let raw = "";
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  let input = {};
  try { input = JSON.parse(raw); } catch {}
  const cmd = (input.tool_input && input.tool_input.command) || "";

  if (!/\bgit\s+push\b/.test(cmd)) process.exit(0); // not a push, allow

  let branch = "";
  try { branch = execSync("git rev-parse --abbrev-ref HEAD", { encoding: "utf8" }).trim(); } catch {}

  const namesMain = /\b(main|master)\b/.test(cmd);
  const onMain = branch === "main" || branch === "master";

  if (namesMain || onMain) {
    process.stderr.write("Blocked: pushing to main is not allowed. Create a new branch and push that instead.");
    process.exit(2); // 2 = block (1 would NOT block!)
  }
  process.exit(0);
});
