// Verify V2.5.1 reformatted prayers preserve official wording (words only).
const fs = require("fs");
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const unesc = (x) => x.replace(/\\n/g, " ").replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, "\\");

// --- Rosary: decadePrayer vs decadePrayerVerse, rosaryClosing vs rosaryClosingVerse
const ros = fs.readFileSync(__dirname + "/../src/data/rosaryContent.ts", "utf8");
function grabObj(name) {
  const re = new RegExp(name + "\\s*=\\s*{([\\s\\S]*?)\\n};", "m");
  const body = ros.match(re)[1];
  const out = {};
  const kre = /(\w+):\s*\n?\s*'((?:\\.|[^'])*)'/g;
  let m;
  while ((m = kre.exec(body))) out[m[1]] = norm(unesc(m[2]));
  return out;
}
let bad = 0, checked = 0;
function cmp(label, a, b) {
  checked++;
  if (a !== b) { bad++; console.log("MISMATCH " + label + "\n  A:", a, "\n  B:", b, "\n"); }
}
const dp = grabObj("decadePrayer"), dpv = grabObj("decadePrayerVerse");
["ourFather", "hailMary", "gloryBe", "fatima"].forEach((k) => cmp("decade." + k, dp[k], dpv[k]));
const rc = grabObj("rosaryClosing"), rcv = grabObj("rosaryClosingVerse");
["hailHolyQueen", "finalPrayer"].forEach((k) => cmp("closing." + k, rc[k], rcv[k]));

// --- Divine Mercy: section bodies must match the original chaplet text.
const pr = fs.readFileSync(__dirname + "/../src/data/prayers.ts", "utf8");
const dmBlock = pr.slice(pr.indexOf("divine-mercy-chaplet"), pr.indexOf("explanation:", pr.indexOf("divine-mercy-chaplet")));
const bodies = [...dmBlock.matchAll(/body:\s*'((?:\\.|[^'])*)'/g)].map((m) => norm(unesc(m[1])));
const dmReconstructed = bodies.join(" ");
const dmOriginalWords = norm(
  "Begin with the Sign of the Cross, one Our Father, one Hail Mary, and the Apostles' Creed. " +
  "Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your dearly beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world. " +
  "For the sake of His sorrowful Passion, have mercy on us and on the whole world. " +
  "Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world."
);
cmp("divineMercy.allSections", dmReconstructed, dmOriginalWords);

console.log("checks:", checked, "| mismatches:", bad);
