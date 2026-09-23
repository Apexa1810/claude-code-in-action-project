// Runs the verification gates and prints evidence.
const { execSync } = require("child_process");

function run(cmd) {
  try {
    return { ok: true, out: execSync(cmd, { encoding: "utf8", stdio: "pipe" }) };
  } catch (e) {
    return { ok: false, out: (e.stdout || "") + (e.stderr || "") };
  }
}

// Gate 1: tests
const tests = run("npm test");
const pass = (tests.out.match(/# pass (\d+)/) || [])[1] || "?";
const fail = (tests.out.match(/# fail (\d+)/) || [])[1] || "?";
console.log(`TESTS: ${tests.ok ? "PASS" : "FAIL"} (pass ${pass}, fail ${fail})`);

// Gate 2: were tests weakened?
const diff = run("git diff HEAD -- tests/").out.split("\n");
const removedAsserts = diff.filter(l => l.startsWith("-") && !l.startsWith("---") && l.includes("assert"));
const addedSkips = diff.filter(l => l.startsWith("+") && /\.skip\(|\.todo\(|skip:\s*true/.test(l));

console.log(removedAsserts.length
  ? "REVIEW - assertions removed or changed:\n" + removedAsserts.join("\n")
  : "No assertions removed.");
console.log(addedSkips.length
  ? "REVIEW - tests skipped:\n" + addedSkips.join("\n")
  : "No tests skipped.");

// Gate 3: what changed
console.log("CHANGED FILES:\n" + (run("git diff HEAD --stat").out || "(none)"));

process.exit(tests.ok ? 0 : 1);
