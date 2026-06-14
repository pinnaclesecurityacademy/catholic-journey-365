const fs = require("fs");
const src = fs.readFileSync(__dirname + "/../src/data/readingPlan.ts", "utf8");
const start = src.indexOf("[", src.indexOf("= ["));
const m = src.slice(start, src.lastIndexOf("]") + 1);
const plan = JSON.parse(m);
const periods = {};
const order = [];
for (const d of plan) {
  const generic = d.summary.startsWith("Today's reading (");
  if (!periods[d.period]) { periods[d.period] = { total: 0, generic: 0, first: d.day_number, last: d.day_number }; order.push(d.period); }
  periods[d.period].total++;
  periods[d.period].last = d.day_number;
  if (generic) periods[d.period].generic++;
}
for (const p of order) {
  const x = periods[p];
  console.log(`${p} | days ${x.first}-${x.last} | total ${x.total} | generic ${x.generic}`);
}
console.log("TOTAL days:", plan.length);
