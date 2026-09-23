// PostToolUse hook (Edit|Write): check JS syntax after every edit.
const { execSync } = require("child_process");

let raw = "";
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  let input = {};
  try { input = JSON.parse(raw); } catch {}
  const file = (input.tool_input && input.tool_input.file_path) || "";

  if (!file.endsWith(".js")) process.exit(0);

  try {
    execSync(`node --check "${file}"`, { stdio: "pipe" });
    process.exit(0);
  } catch (e) {
    process.stderr.write("Syntax error in " + file + ":\n" + (e.stderr || "").toString());
    process.exit(2); // tells Claude to fix it
  }
});
