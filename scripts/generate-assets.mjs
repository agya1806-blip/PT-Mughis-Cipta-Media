import sharp from 'sharp';
import { join } from 'path';
import { mkdirSync, unlinkSync, renameSync, rmSync } from 'fs';

const p = join(import.meta.dirname, '..', 'public');
const t = join(import.meta.dirname, '..', 'node_modules', '.tmp-' + Date.now());
mkdirSync(t, { recursive: true });

const GOLD = '#c8a96a';
const CREAM = '#faf7f2';
const src = join(p, 'favicon.png');

function svgText(w, h, fs1, fs2, subY) {
  return Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
<rect width="${w}" height="${h}" fill="rgba(30,94,74,0.65)"/>
<text x="${w/2}" y="${h*0.48}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="${fs1}" fill="${CREAM}">PT Mughis Cipta Media</text>
<text x="${w/2}" y="${subY}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="500" font-size="${fs2}" fill="${GOLD}">Penerbit dan Percetakan Profesional</text>
</svg>`);
}

// Vector logo untuk PWA manifest — tajam di ukuran berapapun
function svgLogo(w, h) {
  const mSize = Math.round(w * 0.38);
  const textSize = Math.round(w * 0.09);
  const subSize = Math.round(w * 0.045);
  const rx = Math.round(w * 0.04);
  return Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" rx="${rx}" fill="#1e5e4a"/>
  <text x="${w/2}" y="${h*0.43}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="${mSize}" fill="${GOLD}">M</text>
  <text x="${w/2}" y="${h*0.65}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="${textSize}" fill="${CREAM}">PT Mughis Cipta Media</text>
  <text x="${w/2}" y="${h*0.78}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="500" font-size="${subSize}" fill="${GOLD}">Penerbit · Percetakan</text>
</svg>`);
}

async function main() {
  await sharp(src).resize(512, 512)
    .composite([{ input: svgText(512, 512, 36, 16, 296), top: 0, left: 0 }])
    .png().toFile(join(t, 'logo.png.bak')); // keep for legacy

  // Vector logo untuk manifest
  await sharp(svgLogo(512, 512)).resize(512, 512).png().toFile(join(t, 'logo.png'));

  await sharp(src).resize(512, 512)
    .png().toFile(join(t, 'favicon.png'));

  const icoSvg = Buffer.from(
`<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="10" fill="#1e5e4a"/>
  <text x="32" y="44" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="36" fill="${GOLD}">M</text>
</svg>`);
  await sharp(icoSvg).resize(64, 64).png().toFile(join(t, 'favicon.ico'));

  const ogSvg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(30,94,74,0.7)"/><stop offset="1" stop-color="rgba(15,63,48,0.95)"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/>
<rect x="0" y="0" width="1200" height="5" fill="${GOLD}"/>
<rect x="0" y="625" width="1200" height="5" fill="${GOLD}"/>
<text x="600" y="290" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="60" fill="${CREAM}">PT Mughis Cipta Media</text>
<text x="600" y="360" text-anchor="middle" font-family="Arial,sans-serif" font-weight="500" font-size="26" fill="${GOLD}">Penerbit Buku dan Percetakan Profesional</text>
<text x="600" y="420" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" fill="${CREAM}" opacity="0.6">Mewujudkan Karya Terbaik Anda</text>
<text x="600" y="560" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="${CREAM}" opacity="0.4">mughisciptamedia.com</text>
</svg>`);

  await sharp(src).resize(300, 300).blur(10).toFile(join(t, 'bg.png'));
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#1e5e4a' } })
    .composite([
      { input: join(t, 'bg.png'), tile: true },
      { input: ogSvg, top: 0, left: 0 },
    ])
    .jpeg({ quality: 92 }).toFile(join(t, 'og-image.jpg'));

  for (const f of ['logo.png', 'favicon.png', 'favicon.ico', 'og-image.jpg']) {
    unlinkSync(join(p, f));
    renameSync(join(t, f), join(p, f));
    console.log('OK', f);
  }
  rmSync(t, { recursive: true });
  console.log('Selesai');

  // hapus backup
  try { unlinkSync(join(p, 'logo.png.bak')); } catch {}
}

main().catch(e => { console.error(e.message); process.exit(1); });
