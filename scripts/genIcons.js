/* eslint-disable */
// Generates app icons from scripts/icon.svg into public/.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIcoMod = require('png-to-ico');
const pngToIco = pngToIcoMod.default || pngToIcoMod;

const svg = fs.readFileSync(path.join(__dirname, 'icon.svg'));
const pub = path.join(__dirname, '..', 'public');

async function png(size, file) {
  // Flatten onto an opaque background so there is no alpha channel, 
  // Android/Chrome PWA install rejects icons with transparency issues.
  const buf = await sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'cover' })
    .flatten({ background: '#7C5C3E' })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(pub, file), buf);
  return buf;
}

(async () => {
  // Home-screen / PWA icons
  await png(512, 'logo512.png');
  await png(192, 'logo192.png');
  await png(180, 'apple-touch-icon.png'); // iOS home screen

  // Favicon (multi-size ICO)
  const f16 = await png(16, 'favicon-16.png');
  const f32 = await png(32, 'favicon-32.png');
  const f48 = await png(48, 'favicon-48.png');
  const ico = await pngToIco([f16, f32, f48]);
  fs.writeFileSync(path.join(pub, 'favicon.ico'), ico);

  // Clean up intermediate favicon PNGs
  for (const f of ['favicon-16.png', 'favicon-32.png', 'favicon-48.png']) {
    fs.unlinkSync(path.join(pub, f));
  }
  console.log('Icons generated in', pub);
})();
