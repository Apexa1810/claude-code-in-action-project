# Project rules

@.claude/conventions/code-style.md
@.claude/conventions/testing.md

- Code lives in `src/`, tests in `tests/`. Every new function gets a test for normal input and one for invalid input.
- For invalid input, throw an Error with a clear message. Don't return null or NaN.
- Ask before adding npm dependencies.
- IMPORTANT: Run `npm test` before saying a task is done.
