// SessionStart hook (matcher "compact"): after compaction, print a short summary
// of changed files. Plain text on stdout is added back into Claude's context.
const { execSync } = require("child_process");

function run(cmd) {
  try { return execSync(cmd, { encoding: "utf8" }).trim(); } catch { return ""; }
}

const changed = run("git status --short");
console.log("Context restored after compaction.");
console.log(changed ? "Files changed in this session:\n" + changed : "No uncommitted changes.");
