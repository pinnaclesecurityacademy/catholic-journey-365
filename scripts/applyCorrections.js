// Surgically apply corrections.js to readingPlan.ts.
// Updates ONLY the summary + think_about_question string values for covered days.
// Every other field (day_number, readings, prayer, quote, period) is left byte-identical.
const fs = require("fs");
const path = require("path");

const planPath = path.join(__dirname, "../src/data/readingPlan.ts");
const corrections = require("./corrections.js");

let raw = fs.readFileSync(planPath, "utf8");
const start = raw.indexOf("[", raw.indexOf("= ["));
const plan = JSON.parse(raw.slice(start, raw.lastIndexOf("]") + 1));
const byDay = {};
for (const d of plan) byDay[d.day_number] = d;

const updated = [];
const skipped = [];
let failures = 0;

for (const key of Object.keys(corrections).map(Number).sort((a, b) => a - b)) {
  const day = byDay[key];
  const c = corrections[key];
  if (!day) { console.error(`Day ${key}: NOT FOUND in plan`); failures++; continue; }

  // Safety: only touch days that are still generic.
  if (!day.summary.startsWith("Today's reading (")) {
    skipped.push(key + " (not generic)");
    continue;
  }

  const oldS = JSON.stringify(day.summary);
  const newS = JSON.stringify(c.s);
  const oldT = JSON.stringify(day.think_about_question);
  const newT = JSON.stringify(c.t);

  // Each old value must appear exactly once in the file.
  const cntS = raw.split(oldS).length - 1;
  const cntT = raw.split(oldT).length - 1;
  if (cntS !== 1) { console.error(`Day ${key}: summary match count ${cntS} (expected 1)`); failures++; continue; }
  if (cntT !== 1) { console.error(`Day ${key}: think match count ${cntT} (expected 1)`); failures++; continue; }

  raw = raw.replace(oldS, newS).replace(oldT, newT);
  updated.push(key);
}

if (failures) {
  console.error(`\nABORTED: ${failures} failure(s). No file written.`);
  process.exit(1);
}

fs.writeFileSync(planPath, raw);
console.log("Days updated:", updated.length);
console.log("Skipped (not generic):", skipped.length ? skipped.join(", ") : "none");
console.log("File written:", planPath);
