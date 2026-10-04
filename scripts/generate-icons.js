import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

// 1. Standard icon SVG (with badge shadow & rounded corners)
const standardSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <filter id="shadow" x="-5%" y="-5%" width="115%" height="115%">
      <feDropShadow dx="14" dy="14" stdDeviation="0" flood-color="#171313" />
    </filter>
  </defs>

  <!-- Clean background -->
  <rect width="512" height="512" rx="104" fill="#FFFDF8" />

  <!-- Main Neo-Brutalist Badge -->
  <rect x="52" y="52" width="408" height="408" rx="88" fill="#E94B43" stroke="#171313" stroke-width="20" filter="url(#shadow)" />

  <!-- Inner Sparkle Star Top Right -->
  <g transform="translate(340, 110)">
    <path d="M0 -36 L11 -11 L36 0 L11 11 L0 36 L-11 11 L-36 0 L-11 -11 Z" fill="#FFD447" stroke="#171313" stroke-width="8" stroke-linejoin="round"/>
  </g>

  <!-- Bold Neo-Brutalist Letter 'A' -->
  <!-- Shadow of 'A' -->
  <text x="266" y="360" font-family="'Space Grotesk', 'Arial Black', sans-serif" font-weight="900" font-size="280" fill="#171313" text-anchor="middle">A</text>
  <!-- Main white 'A' -->
  <text x="256" y="350" font-family="'Space Grotesk', 'Arial Black', sans-serif" font-weight="900" font-size="280" fill="#FFFFFF" stroke="#171313" stroke-width="12" stroke-linejoin="round" text-anchor="middle">A</text>

  <!-- Bottom Accent Stripe/Dots -->
  <circle cx="216" cy="406" r="10" fill="#FFD447" stroke="#171313" stroke-width="4"/>
  <circle cx="256" cy="406" r="10" fill="#FFFFFF" stroke="#171313" stroke-width="4"/>
  <circle cx="296" cy="406" r="10" fill="#4D96FF" stroke="#171313" stroke-width="4"/>
</svg>
`;

// 2. Maskable icon SVG (Full bleed background, content within safe zone 40% radius / 80% box)
const maskableSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <!-- Full bleed red background for Android adaptive icon shapes -->
  <rect width="512" height="512" fill="#E94B43" />

  <!-- Center emblem within safe zone -->
  <g transform="translate(256, 256)">
    <!-- Star sparkle -->
    <path d="M80 -120 L90 -100 L112 -90 L90 -80 L80 -58 L70 -80 L48 -90 L70 -100 Z" fill="#FFD447" stroke="#171313" stroke-width="8" stroke-linejoin="round"/>
    
    <!-- Letter A Shadow -->
    <text x="6" y="86" font-family="'Space Grotesk', 'Arial Black', sans-serif" font-weight="900" font-size="230" fill="#171313" text-anchor="middle">A</text>
    <!-- Letter A White -->
    <text x="0" y="80" font-family="'Space Grotesk', 'Arial Black', sans-serif" font-weight="900" font-size="230" fill="#FFFFFF" stroke="#171313" stroke-width="12" stroke-linejoin="round" text-anchor="middle">A</text>

    <!-- Mini brutalist dots -->
    <circle cx="-35" cy="125" r="9" fill="#FFD447" stroke="#171313" stroke-width="4"/>
    <circle cx="0" cy="125" r="9" fill="#FFFFFF" stroke="#171313" stroke-width="4"/>
    <circle cx="35" cy="125" r="9" fill="#4D96FF" stroke="#171313" stroke-width="4"/>
  </g>
</svg>
`;

// 3. Apple Touch Icon SVG (180x180 square)
const appleSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#E94B43" />
  <g transform="translate(130, 42)">
    <path d="M0 -12 L4 -4 L12 0 L4 4 L0 12 L-4 4 L-12 0 L-4 -4 Z" fill="#FFD447" stroke="#171313" stroke-width="3" stroke-linejoin="round"/>
  </g>
  <text x="93" y="126" font-family="'Space Grotesk', 'Arial Black', sans-serif" font-weight="900" font-size="96" fill="#171313" text-anchor="middle">A</text>
  <text x="90" y="123" font-family="'Space Grotesk', 'Arial Black', sans-serif" font-weight="900" font-size="96" fill="#FFFFFF" stroke="#171313" stroke-width="5" stroke-linejoin="round" text-anchor="middle">A</text>
  <circle cx="75" cy="145" r="4" fill="#FFD447" stroke="#171313" stroke-width="2"/>
  <circle cx="90" cy="145" r="4" fill="#FFFFFF" stroke="#171313" stroke-width="2"/>
  <circle cx="105" cy="145" r="4" fill="#4D96FF" stroke="#171313" stroke-width="2"/>
</svg>
`;

async function generate() {
  console.log('Generating PWA Icons for AMBASBIS...');

  // Save standard SVG
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), standardSvg.trim());
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), standardSvg.trim());

  // Generate 512x512
  await sharp(Buffer.from(standardSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));
  console.log('Created pwa-512x512.png');

  // Generate 192x192
  await sharp(Buffer.from(standardSvg))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));
  console.log('Created pwa-192x192.png');

  // Generate 180x180 Apple Touch Icon
  await sharp(Buffer.from(appleSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');

  // Generate 512x512 Maskable Icon
  await sharp(Buffer.from(maskableSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'maskable-icon-512x512.png'));
  console.log('Created maskable-icon-512x512.png');

  console.log('All PWA Icons generated successfully!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
