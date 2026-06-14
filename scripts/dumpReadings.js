const fs = require("fs");
const src = fs.readFileSync(__dirname + "/../src/data/readingPlan.ts", "utf8");
const start = src.indexOf("[", src.indexOf("= ["));
const plan = JSON.parse(src.slice(start, src.lastIndexOf("]") + 1));
const lo = +process.argv[2], hi = +process.argv[3];
for (const d of plan) {
  if (d.day_number < lo || d.day_number > hi) continue;
  const generic = d.summary.startsWith("Today's reading (");
  if (!generic) continue;
  const r = [d.reading_one, d.reading_two].filter(Boolean).join(" | ");
  console.log(`${d.day_number}\t${d.period}\t${r}\t[${d.psalm_proverb}]`);
}
