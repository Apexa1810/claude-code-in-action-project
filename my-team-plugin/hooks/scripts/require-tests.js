// Stop hook: Claude can't end its turn while tests are failing.
// Exit code 2 blocks the stop and sends stderr back to Claude.
const { execSync } = require("child_process");

let raw = "";
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  let input = {};
  try { input = JSON.parse(raw); } catch {}

  // Avoid an endless loop if Claude is already continuing because of this hook.
  if (input.stop_hook_active) process.exit(0);

  try {
    execSync("npm test", { stdio: "pipe", cwd: process.env.CLAUDE_PROJECT_DIR || process.cwd() });
    process.exit(0);
  } catch (err) {
    const out = (err.stdout || "").toString().slice(-2000);
    process.stderr.write("Tests are failing. Fix them before finishing.\n" + out);
    process.exit(2);
  }
});
