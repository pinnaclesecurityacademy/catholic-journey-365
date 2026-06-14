// Validate corrections.js: syntax, duplicate keys, coverage vs generic days.
const fs = require("fs");
const path = require("path");

// 1. Syntax / load
let corrections;
try {
  corrections = require("./corrections.js");
} catch (e) {
  console.error("SYNTAX ERROR loading corrections.js:", e.message);
  process.exit(1);
}
console.log("Syntax: OK (module loaded)");

// 2. Duplicate day keys, JS objects silently drop dupes, so scan raw text.
const raw = fs.readFileSync(path.join(__dirname, "corrections.js"), "utf8");
const keyRe = /^\s*(\d+):\s*\{/gm;
const seen = {};
const dups = [];
let m;
while ((m = keyRe.exec(raw))) {
  const k = m[1];
  if (seen[k]) dups.push(k); else seen[k] = true;
}
console.log("Duplicate keys:", dups.length ? dups.join(", ") : "none");

// Validate each entry has non-empty s and t
const bad = [];
for (const k of Object.keys(corrections)) {
  const e = corrections[k];
  if (!e || typeof e.s !== "string" || typeof e.t !== "string" || !e.s.trim() || !e.t.trim()) bad.push(k);
}
console.log("Malformed entries:", bad.length ? bad.join(", ") : "none");

// 3. Coverage vs the actual generic days in readingPlan.ts
const src = fs.readFileSync(path.join(__dirname, "../src/data/readingPlan.ts"), "utf8");
const start = src.indexOf("[", src.indexOf("= ["));
const plan = JSON.parse(src.slice(start, src.lastIndexOf("]") + 1));
const genericDays = plan.filter(d => d.summary.startsWith("Today's reading (")).map(d => d.day_number);
const covered = Object.keys(corrections).map(Number).sort((a, b) => a - b);

const coveredSet = new Set(covered);
const genericSet = new Set(genericDays);

const missing = genericDays.filter(d => !coveredSet.has(d));          // generic but no correction
const extra = covered.filter(d => !genericSet.has(d));               // correction for a non-generic day

console.log("\nGeneric days in readingPlan.ts:", genericDays.length);
console.log("Days covered by corrections.js:", covered.length);
console.log("Covered days:", covered.join(", "));
console.log("\nMissing (generic, NOT yet covered):", missing.length ? missing.join(", ") : "none");
console.log("Extra (covered but day is NOT generic, would overwrite authored content):", extra.length ? extra.join(", ") : "none");
