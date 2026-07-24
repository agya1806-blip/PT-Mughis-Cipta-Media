import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const OUT = join(import.meta.dirname, '..', 'public');

const GOLD = '#c8a96a';
const GREEN = '#1e5e4a';
const CREAM = '#faf7f2';

function svgLogo(w, h) {
  const pad = Math.round(h * 0.22);
  const fontSize1 = Math.round(h * 0.35);
  const fontSize2 = Math.round(h * 0.2);
  const y1 = Math.round(h * 0.48);
  const y2 = Math.round(h * 0.78);
  return Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="transparent"/>
    <text x="${w/2}" y="${y1}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="${fontSize1}px" fill="${GREEN}">PT Mughis Cipta Media</text>
    <text x="${w/2}" y="${y2}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="normal" font-size="${fontSize2}px" fill="${GREEN}" opacity="0.8">Penerbit & Percetakan Profesional</text>
  </svg>`);
}

function svgSquare(size) {
  const fontSize1 = Math.round(size * 0.12);
  const fontSize2 = Math.round(size * 0.07);
  return Buffer.from(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="${CREAM}" rx="${Math.round(size*0.08)}"/>
    <text x="${size/2}" y="${size*0.45}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="${fontSize1}px" fill="${GREEN}">PT Mughis</text>
    <text x="${size/2}" y="${size*0.55}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="${fontSize1}px" fill="${GREEN}">Cipta Media</text>
    <text x="${size/2}" y="${size*0.68}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="normal" font-size="${fontSize2}px" fill="${GREEN}" opacity="0.7">Penerbit &amp; Percetakan</text>
  </svg>`);
}

function svgFavicon(size) {
  const fontSize = Math.round(size * 0.16);
  return Buffer.from(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="${GREEN}" rx="${Math.round(size*0.15)}"/>
    <text x="${size/2}" y="${size*0.46}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="${fontSize}px" fill="${CREAM}">M</text>
    <text x="${size/2}" y="${size*0.64}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="${Math.round(fontSize*0.65)}px" fill="${CREAM}">PCM</text>
  </svg>`);
}

function svgOgImage(w, h) {
  const pad = Math.round(h * 0.1);
  const fontSize1 = Math.round(h * 0.1);
  const fontSize2 = Math.round(h * 0.055);
  const fontSize3 = Math.round(h * 0.04);
  return Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${GREEN};stop-opacity:1"/>
        <stop offset="100%" style="stop-color:${GREEN};stop-opacity:0.85"/>
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${GOLD};stop-opacity:1"/>
        <stop offset="100%" style="stop-color:${GOLD};stop-opacity:0.6"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <rect x="0" y="0" width="${w}" height="${Math.round(h*0.008)}" fill="url(#gold)"/>
    <rect x="0" y="${Math.round(h*0.992)}" width="${w}" height="${Math.round(h*0.008)}" fill="url(#gold)"/>
    <text x="${w/2}" y="${h*0.38}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="${fontSize1}px" fill="${CREAM}">PT Mughis Cipta Media</text>
    <text x="${w/2}" y="${h*0.55}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="normal" font-size="${fontSize2}px" fill="${GOLD}">Penerbit Buku & Percetakan Profesional</text>
    <text x="${w/2}" y="${h*0.68}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="normal" font-size="${fontSize3}px" fill="${CREAM}" opacity="0.7">Mewujudkan Karya Terbaik Anda</text>
    <rect x="${Math.round(w*0.05)}" y="${Math.round(h*0.78)}" width="${Math.round(w*0.9)}" height="1" fill="${GOLD}" opacity="0.3"/>
    <text x="${w/2}" y="${h*0.9}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="normal" font-size="${Math.round(h*0.03)}px" fill="${CREAM}" opacity="0.5">mughisciptamedia.com</text>
  </svg>`);
}

async function main() {
  mkdirSync(OUT, { recursive: true });

  // logo-original.png — 600x63
  await sharp(svgLogo(600, 63)).png().toFile(join(OUT, 'logo-original.png'));
  console.log('✓ logo-original.png');

  // logo.png — 512x512
  await sharp(svgSquare(512)).resize(512, 512).png().toFile(join(OUT, 'logo.png'));
  console.log('✓ logo.png');

  // favicon.png — 512x512
  await sharp(svgFavicon(512)).resize(512, 512).png().toFile(join(OUT, 'favicon.png'));
  console.log('✓ favicon.png');

  // favicon.ico — output as PNG (browser fallback)
  // ICO is complex; modern browsers accept PNG, so we create a 32x32 PNG
  await sharp(svgFavicon(512)).resize(32, 32).png().toFile(join(OUT, 'favicon.ico'));
  console.log('✓ favicon.ico');

  // og-image.jpg — 1200x630
  await sharp(svgOgImage(1200, 630)).jpeg({ quality: 95 }).toFile(join(OUT, 'og-image.jpg'));
  console.log('✓ og-image.jpg');

  console.log('\n✨ Semua asset berhasil dibuat!');
}

main().catch(e => { console.error(e); process.exit(1); });
