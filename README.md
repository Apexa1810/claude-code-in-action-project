# Claude Code in Action - practice project

One project with a working example for all 9 lessons.
Needs: Node.js 18+, git, and Claude Code.

## Setup (once)

```
npm test                  # should show: pass 4, fail 0
git init
git add .
git commit -m "start"
claude
```

On Windows, some dot-files (.gitignore, .env) may be hidden. If PowerShell says
"Access is denied" when editing them, run: attrib -h -r .gitignore

## Where each lesson's files are

| Lesson | Files |
|---|---|
| 1 Steering long sessions | `.worktreeinclude` (plus the sample app) |
| 2 A CLAUDE.md that follows | `CLAUDE.md`, `.claude/conventions/*.md`, `CLAUDE.local.md`, `docs/user-CLAUDE.md` |
| 3 Verification skills | `.claude/skills/verify/` (SKILL.md, reference.md, check.js) |
| 4 Permission modes | `.claude/settings.json` (permissions), `scripts/dontask-demo.ps1` |
| 5 Hooks | `.claude/settings.json` (hooks), `.claude/hooks/*.js`, `docs/redact_secrets_python_example.py` |
| 6 Routines and headless | `docs/routine-prompt.md`, `scripts/nightly-headless.sh`, `scripts/headless-*.ps1` |
| 7 GitHub Actions & Code Review | `.github/workflows/claude.yml` |
| 8 Verifying unsupervised runs | `.claude/hooks/require-tests.js` (Stop hook) + the verify skill |
| 9 Plugins | `my-team-plugin/` |

## Exercises

### Lesson 1 - Steering long sessions
- Plan mode: Shift+Tab until "plan mode on", then: `Add a formatPrice(amount, currency) function with tests.` Edit the plan before approving.
- Compact: `/compact Keep the formatPrice decisions and test results. Drop the planning discussion.`
- Rewind: ask `Rewrite every function in src/app.js as an arrow function.`, then press Esc twice on an empty prompt and choose "Restore code and conversation".
- Goal: `/goal npm test shows "fail 0" and every function in src/app.js has at least one test`, then `Add capitalize(text) and truncate(text, maxLength).` Cancel with `/goal clear`.
- Loop: `/loop 1m run npm test and tell me only if the result changed`. Break a test yourself, watch it notice, press Esc to stop.
- Worktrees: in two terminals run `claude --worktree multiply` and `claude --worktree subtract`, give each its task, then merge the branches.

### Lesson 2 - CLAUDE.md
- Type `/memory` to see every loaded CLAUDE.md file.
- Copy `docs/user-CLAUDE.md` into `C:\Users\<you>\.claude\CLAUDE.md` (Mac/Linux: `~/.claude/CLAUDE.md`).
- Test a rule: `Add a divide(a, b) function.` Then check `divide(1, 0)` throws.
- When Claude gets something wrong: `Fix it, and add a rule about this to CLAUDE.md.`

### Lesson 3 - Verification skill
- Ask for any change; the verify skill should run by itself. Or type `/verify`.
- Weaken a test on purpose (delete the `assert.throws` line), run `/verify`, and see it flagged. Undo with `git checkout tests/app.test.js`.

### Lesson 4 - Permission modes
- Cycle modes with Shift+Tab: manual, accept edits, plan, auto.
- In auto mode, make an uncommitted change and ask `Run git reset --hard to clean up.` The classifier should block it.
- Ask `Show me what's inside .env` - blocked by the deny rule in every mode.
- Run `scripts/dontask-demo.ps1` to see dontAsk allow one thing and deny another.

### Lesson 5 - Hooks
- `/hooks` lists all registered hooks.
- `Run this command: echo sk_live_ABC123 ghp_XYZ789` -> shows `sk_live_REDACTED ghp_REDACTED`.
- `Run: git push origin main` -> blocked by block-push-main.js.
- `Add a broken line to src/app.js on purpose: function oops( {` -> check-syntax.js reports it, Claude fixes it.
- `/compact` -> restore-context.js prints your changed files.
- Try the exit-code trap: change `process.exit(2)` to `process.exit(1)` in block-push-main.js - the push is no longer blocked. Change it back.

### Lesson 6 - Routines and headless
- Push this repo to GitHub, install the Claude GitHub App on it (github.com/apps/claude), then create a routine at claude.ai/code/routines using `docs/routine-prompt.md`. Or use `/schedule` inside Claude.
- `claude -p "Summarize what src/app.js does in 3 bullet points"`
- `git diff HEAD~1 | claude -p "Summarize the changes in this diff"`
- `powershell -File scripts/headless-json.ps1` (structured JSON output)
- `powershell -File scripts/headless-plan-then-do.ps1` (plan, then resume the session)
- Git Bash / Mac / Linux: `bash scripts/nightly-headless.sh`

### Lesson 7 - GitHub Actions and Code Review
- Inside Claude run `/install-github-app`, or add the `ANTHROPIC_API_KEY` secret to the GitHub repo yourself.
- Push, open an issue that mentions `@claude`, and watch the workflow in the Actions tab.

### Lesson 8 - Verifying unsupervised runs
- Break a test on purpose (change `a + b` to `a - b` in `add`) and ask Claude to "finish up". The Stop hook won't let it finish until tests pass.
- After any hands-off run, read `git diff` yourself instead of trusting the summary.

### Lesson 9 - Plugins
- Before testing the plugin, remove the "hooks" section from `.claude/settings.json`, or every hook will run twice.
- Test it locally: `claude --plugin-dir ./my-team-plugin`
- Run `/hooks` and `/verify` to confirm the plugin's hooks and skill are loaded.
