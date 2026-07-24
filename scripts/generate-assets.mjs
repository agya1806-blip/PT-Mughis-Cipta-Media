import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join } from 'path';

const OUT = join(import.meta.dirname, '..', 'public');
const GREEN = '#1e5e4a';
const GOLD = '#c8a96a';
const CREAM = '#faf7f2';

function svgLogo(w, h) {
  const fs1 = Math.round(h * 0.4);
  const fs2 = Math.round(h * 0.18);
  const iconSize = Math.round(h * 0.55);
  const iconX = Math.round(h * 0.3);
  const textX = Math.round(h * 0.95);
  const textY1 = Math.round(h * 0.48);
  const textY2 = Math.round(h * 0.82);
  const r = Math.round(iconSize * 0.18);
  const fsM = Math.round(iconSize * 0.5);
  const mY = Math.round(iconSize * 0.65);
  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
<rect x="${iconX - iconSize/2}" y="${h/2 - iconSize/2}" width="${iconSize}" height="${iconSize}" rx="${r}" fill="${GOLD}"/>
<text x="${iconX}" y="${h/2 - iconSize/2 + mY}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="bold" font-size="${fsM}" fill="${CREAM}">M</text>

<text x="${textX}" y="${textY1}" font-family="Arial,sans-serif" font-weight="800" font-size="${fs1}" fill="${GREEN}">PT Mughis Cipta Media</text>
<text x="${textX}" y="${textY2}" font-family="Arial,sans-serif" font-weight="500" font-size="${fs2}" fill="${GREEN}" opacity="0.65">Penerbit dan Percetakan Profesional</text>
</svg>`;
}

function svgPwaIcon(size) {
  const fs1 = Math.round(size * 0.09);
  const fs2 = Math.round(size * 0.07);
  const pad = Math.round(size * 0.08);
  const bodyW = size - pad * 2;
  const bodyH = size - pad * 2;
  const r = Math.round(bodyW * 0.12);
  const barH = Math.round(size * 0.008);
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
<rect x="${pad}" y="${pad}" width="${bodyW}" height="${bodyH}" rx="${r}" fill="${GREEN}"/>
<rect x="${pad}" y="${pad}" width="${bodyW}" height="${barH}" fill="${GOLD}"/>
<rect x="${pad}" y="${pad + bodyH - barH}" width="${bodyW}" height="${barH}" fill="${GOLD}"/>

<text x="${size/2}" y="${Math.round(size*0.35)}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="200" font-size="${Math.round(fs1*0.7)}" fill="${GOLD}">PT</text>
<text x="${size/2}" y="${Math.round(size*0.46)}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="${fs1}" fill="${CREAM}">Mughis</text>
<text x="${size/2}" y="${Math.round(size*0.565)}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="${fs1}" fill="${CREAM}">Cipta Media</text>
<text x="${size/2}" y="${Math.round(size*0.66)}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="400" font-size="${fs2}" fill="${GOLD}" opacity="0.85">Penerbit</text>
<text x="${size/2}" y="${Math.round(size*0.74)}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="400" font-size="${fs2}" fill="${GOLD}" opacity="0.85">dan Percetakan</text>
</svg>`;
}

function svgFavicon(size) {
  const fs = Math.round(size * 0.55);
  const r = Math.round(size * 0.15);
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
<rect width="${size}" height="${size}" rx="${r}" fill="${GREEN}"/>
<text x="${size/2}" y="${Math.round(size*0.7)}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="${fs}" fill="${GOLD}">M</text>
</svg>`;
}

function svgOgImage(w, h) {
  const fs1 = Math.round(h * 0.09);
  const fs2 = Math.round(h * 0.045);
  const fs3 = Math.round(h * 0.035);
  const fs4 = Math.round(h * 0.028);
  const barH = Math.round(h * 0.007);
  const mSize = Math.round(h * 0.15);
  const mR = Math.round(mSize * 0.15);
  const mFs = Math.round(mSize * 0.55);
  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="100%" y2="100%">
<stop offset="0" stop-color="${GREEN}"/>
<stop offset="100%" stop-color="#0f3f30"/>
</linearGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<rect x="0" y="0" width="${w}" height="${barH}" fill="${GOLD}"/>
<rect x="0" y="${h - barH}" width="${w}" height="${barH}" fill="${GOLD}"/>

<rect x="${Math.round(w*0.06)}" y="${Math.round(h*0.22)}" width="${mSize}" height="${mSize}" rx="${mR}" fill="${GOLD}"/>
<text x="${Math.round(w*0.06 + mSize/2)}" y="${Math.round(h*0.22 + mSize*0.62)}" text-anchor="middle" font-family="Arial,sans-serif" font-weight="800" font-size="${mFs}" fill="${CREAM}">M</text>

<text x="${Math.round(w*0.06 + mSize + w*0.03)}" y="${Math.round(h*0.38)}" font-family="Arial,sans-serif" font-weight="800" font-size="${fs1}" fill="${CREAM}">PT Mughis Cipta Media</text>
<text x="${Math.round(w*0.06 + mSize + w*0.03)}" y="${Math.round(h*0.52)}" font-family="Arial,sans-serif" font-weight="500" font-size="${fs2}" fill="${GOLD}">Penerbit Buku dan Percetakan Profesional</text>

<text x="${Math.round(w*0.06 + mSize + w*0.03)}" y="${Math.round(h*0.64)}" font-family="Arial,sans-serif" font-weight="400" font-size="${fs3}" fill="${CREAM}" opacity="0.65">Mewujudkan karya terbaik Anda</text>

<rect x="${Math.round(w*0.06)}" y="${Math.round(h*0.76)}" width="${Math.round(w*0.88)}" height="1" fill="${GOLD}" opacity="0.25"/>

<text x="${Math.round(w*0.06)}" y="${Math.round(h*0.88)}" font-family="Arial,sans-serif" font-weight="400" font-size="${fs4}" fill="${CREAM}" opacity="0.45">mughisciptamedia.com</text>
</svg>`;
}

async function main() {
  mkdirSync(OUT, { recursive: true });

  await sharp(Buffer.from(svgLogo(600, 63))).png().toFile(join(OUT, 'logo-original.png'));
  console.log('OK logo-original.png (600x63)');

  await sharp(Buffer.from(svgPwaIcon(512))).resize(512, 512).png().toFile(join(OUT, 'logo.png'));
  console.log('OK logo.png (512x512)');

  await sharp(Buffer.from(svgFavicon(512))).resize(512, 512).png().toFile(join(OUT, 'favicon.png'));
  console.log('OK favicon.png (512x512)');

  await sharp(Buffer.from(svgFavicon(512))).resize(32, 32).png().toFile(join(OUT, 'favicon.ico'));
  console.log('OK favicon.ico (32x32)');

  await sharp(Buffer.from(svgOgImage(1200, 630))).jpeg({ quality: 95 }).toFile(join(OUT, 'og-image.jpg'));
  console.log('OK og-image.jpg (1200x630)');

  console.log('\nSemua asset selesai');
}

main().catch(e => { console.error(e.message); process.exit(1); });
