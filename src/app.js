// Small practice module for Claude to work on.

function add(a, b) {
  return a + b;
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function applyDiscount(price, percent) {
  if (percent < 0 || percent > 100) {
    throw new Error("percent must be between 0 and 100");
  }
  return Math.round(price * (1 - percent / 100) * 100) / 100;
}

module.exports = { add, slugify, applyDiscount };
