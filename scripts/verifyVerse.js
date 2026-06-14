// Confirm each verse contains exactly the same WORDS as its content.
const fs = require("fs");
const ts = fs.readFileSync(__dirname + "/../src/data/prayers.ts", "utf8");

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// Match content: '...' , verse: '...'  (single-quoted JS string literals)
const re = /content:\s*'((?:\\.|[^'])*)',\s*verse:\s*'((?:\\.|[^'])*)'/g;
let m, n = 0, bad = 0;
while ((m = re.exec(ts))) {
  n++;
  // Interpret \n escape (and any \' ) -> real chars, since these are JS literals.
  const unescape = (x) => x.replace(/\\n/g, " ").replace(/\\'/g, "'").replace(/\\\\/g, "\\");
  const c = norm(unescape(m[1]));
  const v = norm(unescape(m[2]));
  if (c !== v) {
    bad++;
    console.log("MISMATCH #" + n);
    console.log("  content:", c);
    console.log("  verse:  ", v, "\n");
  }
}
console.log("verse/content pairs checked:", n, "| word mismatches:", bad);
