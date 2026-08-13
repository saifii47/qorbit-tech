const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function createFavicon() {
  const logoPath = path.join(__dirname, '../src/assets/images/qorbit-logo-transparent.png');
  const faviconPngPath = path.join(__dirname, '../public/favicon.png');
  const faviconIcoPath = path.join(__dirname, '../public/favicon.ico');

  console.log('Generating Qorbit Tech "Q" Favicon...');

  // First trim empty transparent borders
  const trimmed = await sharp(logoPath).trim().toBuffer({ resolveWithObject: true });
  console.log(`Trimmed dimensions: ${trimmed.info.width}x${trimmed.info.height}`);

  // Extract the Q emblem (left ~40% of width)
  const emblemWidth = Math.round(trimmed.info.width * 0.4);
  const emblemHeight = trimmed.info.height;

  const qEmblemBuffer = await sharp(trimmed.data)
    .extract({ left: 0, top: 0, width: emblemWidth, height: emblemHeight })
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync(faviconPngPath, qEmblemBuffer);
  fs.writeFileSync(faviconIcoPath, await sharp(qEmblemBuffer).resize(32, 32).png().toBuffer());

  console.log('Q Emblem Favicon generated successfully!');
}

createFavicon().catch(console.error);
