const test = require("node:test");
const assert = require("node:assert");
const { add, slugify, applyDiscount } = require("../src/app");

test("add sums two numbers", () => {
  assert.strictEqual(add(2, 3), 5);
});

test("slugify makes url-safe slugs", () => {
  assert.strictEqual(slugify("  Hello, World! "), "hello-world");
});

test("applyDiscount applies a percentage", () => {
  assert.strictEqual(applyDiscount(100, 15), 85);
});

test("applyDiscount rejects bad percentages", () => {
  assert.throws(() => applyDiscount(100, 150));
});
