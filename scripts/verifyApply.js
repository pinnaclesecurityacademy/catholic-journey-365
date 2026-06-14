// Verify the apply: field integrity for covered days, protected days intact, counts.
const fs = require("fs");
const path = require("path");
const corrections = require("./corrections.js");
const src = fs.readFileSync(path.join(__dirname, "../src/data/readingPlan.ts"), "utf8");
const start = src.indexOf("[", src.indexOf("= ["));
const plan = JSON.parse(src.slice(start, src.lastIndexOf("]") + 1));
const byDay = {}; for (const d of plan) byDay[d.day_number] = d;

// 1. Every covered day now matches the corrections content.
let mismatch = 0;
for (const k of Object.keys(corrections).map(Number)) {
  const d = byDay[k], c = corrections[k];
  if (d.summary !== c.s) { console.error(`Day ${k}: summary not applied`); mismatch++; }
  if (d.think_about_question !== c.t) { console.error(`Day ${k}: think not applied`); mismatch++; }
}
console.log("Covered days correctly applied:", mismatch === 0 ? "YES (116/116)" : `NO (${mismatch} mismatches)`);

// 2. Counts
const generic = plan.filter(d => d.summary.startsWith("Today's reading (")).map(d => d.day_number);
console.log("Total days:", plan.length);
console.log("Still generic:", generic.length);

// 3. Protected approved days 1-12, 145-151 still NOT generic
const protectedDays = [1,2,3,4,5,6,7,8,9,10,11,12,145,146,147,148,149,150,151];
const protBad = protectedDays.filter(d => byDay[d].summary.startsWith("Today's reading ("));
console.log("Protected approved days still intact (non-generic):", protBad.length ? "PROBLEM: "+protBad.join(",") : "YES");

// 4. Day 145 sanity (Solomon, no David)
console.log("Day 145 mentions Solomon:", byDay[145].summary.includes("Solomon"));
console.log("Day 145 mentions David:", byDay[145].summary.includes("David"));

console.log("Still-generic days:", generic.join(", "));
