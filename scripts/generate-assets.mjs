import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join } from 'path';

const OUT = join(import.meta.dirname, '..', 'public');

const GOLD = '#c8a96a';
const GREEN = '#1e5e4a';
const CREAM = '#faf7f2';

function svgLogo(w, h) {
  const fs1 = Math.round(h * 0.35);
  const fs2 = Math.round(h * 0.2);
  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
<text x="${w/2}" y="${Math.round(h*0.48)}" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="${fs1}" fill="${GREEN}">PT Mughis Cipta Media</text>
<text x="${w/2}" y="${Math.round(h*0.78)}" text-anchor="middle" font-family="sans-serif" font-size="${fs2}" fill="${GREEN}" opacity="0.8">Penerbit dan Percetakan Profesional</text>
</svg>`;
}

function svgSquare(size) {
  const fs1 = Math.round(size * 0.12);
  const fs2 = Math.round(size * 0.06);
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
<rect width="${size}" height="${size}" fill="${CREAM}" rx="${Math.round(size*0.08)}"/>
<text x="${size/2}" y="${Math.round(size*0.45)}" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="${fs1}" fill="${GREEN}">PT Mughis</text>
<text x="${size/2}" y="${Math.round(size*0.56)}" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="${fs1}" fill="${GREEN}">Cipta Media</text>
<text x="${size/2}" y="${Math.round(size*0.69)}" text-anchor="middle" font-family="sans-serif" font-size="${fs2}" fill="${GREEN}" opacity="0.7">Penerbit dan Percetakan</text>
</svg>`;
}

function svgFavicon(size) {
  const fs1 = Math.round(size * 0.18);
  const fs2 = Math.round(size * 0.1);
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
<rect width="${size}" height="${size}" fill="${GREEN}" rx="${Math.round(size*0.15)}"/>
<text x="${size/2}" y="${Math.round(size*0.46)}" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="${fs1}" fill="${CREAM}">M</text>
<text x="${size/2}" y="${Math.round(size*0.64)}" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="${fs2}" fill="${CREAM}">PCM</text>
</svg>`;
}

function svgOgImage(w, h) {
  const fs1 = Math.round(h * 0.1);
  const fs2 = Math.round(h * 0.055);
  const fs3 = Math.round(h * 0.04);
  const fs4 = Math.round(h * 0.03);
  return `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="100%" y2="100%">
<stop offset="0" stop-color="${GREEN}"/>
<stop offset="100%" stop-color="${GREEN}" stop-opacity="0.85"/>
</linearGradient>
<linearGradient id="gd" x1="0" y1="0" x2="100%" y2="0">
<stop offset="0" stop-color="${GOLD}"/>
<stop offset="100%" stop-color="${GOLD}" stop-opacity="0.6"/>
</linearGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<rect x="0" y="0" width="${w}" height="${Math.round(h*0.008)}" fill="url(#gd)"/>
<rect x="0" y="${Math.round(h*0.992)}" width="${w}" height="${Math.round(h*0.008)}" fill="url(#gd)"/>
<text x="${w/2}" y="${Math.round(h*0.38)}" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="${fs1}" fill="${CREAM}">PT Mughis Cipta Media</text>
<text x="${w/2}" y="${Math.round(h*0.55)}" text-anchor="middle" font-family="sans-serif" font-size="${fs2}" fill="${GOLD}">Penerbit Buku dan Percetakan Profesional</text>
<text x="${w/2}" y="${Math.round(h*0.68)}" text-anchor="middle" font-family="sans-serif" font-size="${fs3}" fill="${CREAM}" opacity="0.7">Mewujudkan Karya Terbaik Anda</text>
<rect x="${Math.round(w*0.05)}" y="${Math.round(h*0.78)}" width="${Math.round(w*0.9)}" height="1" fill="${GOLD}" opacity="0.3"/>
<text x="${w/2}" y="${Math.round(h*0.9)}" text-anchor="middle" font-family="sans-serif" font-size="${fs4}" fill="${CREAM}" opacity="0.5">mughisciptamedia.com</text>
</svg>`;
}

async function main() {
  mkdirSync(OUT, { recursive: true });

  await sharp(Buffer.from(svgLogo(600, 63))).png().toFile(join(OUT, 'logo-original.png'));
  console.log('OK logo-original.png');

  await sharp(Buffer.from(svgSquare(512))).resize(512, 512).png().toFile(join(OUT, 'logo.png'));
  console.log('OK logo.png');

  await sharp(Buffer.from(svgFavicon(512))).resize(512, 512).png().toFile(join(OUT, 'favicon.png'));
  console.log('OK favicon.png');

  await sharp(Buffer.from(svgFavicon(512))).resize(32, 32).png().toFile(join(OUT, 'favicon.ico'));
  console.log('OK favicon.ico');

  await sharp(Buffer.from(svgOgImage(1200, 630))).jpeg({ quality: 95 }).toFile(join(OUT, 'og-image.jpg'));
  console.log('OK og-image.jpg');

  console.log('\nSemua asset berhasil dibuat');
}

main().catch(e => { console.error(e.message); process.exit(1); });
