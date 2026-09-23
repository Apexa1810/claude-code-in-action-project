# What counts as weakening a test

A test is weakened when it would now pass even if the code were broken. Examples:
- An `assert` line was deleted and not replaced.
- An expected value was changed to match buggy output (e.g. expecting 5 instead of 6).
- `assert.strictEqual` changed to a looser check like `assert.ok`.
- A test got `{ skip: true }`, `test.skip`, or `test.todo`.
- A test case for invalid input was removed.

These are OK:
- An assertion changed because the requirement itself changed, and the task said so.
- An assertion moved to a different test, and still checks the same thing.
