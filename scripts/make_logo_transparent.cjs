const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processLogo() {
  const inputPath = path.join(__dirname, '../src/assets/images/qorbit-logo-new.png');
  const outputPath = path.join(__dirname, '../src/assets/images/qorbit-logo-transparent.png');

  console.log('Processing logo from:', inputPath);

  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  console.log(`Image dimensions: ${info.width}x${info.height}, channels: ${info.channels}`);

  // Loop over pixel data and remove black background
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const maxVal = Math.max(r, g, b);

    if (maxVal < 45) {
      data[i + 3] = 0; // Fully transparent
    } else if (maxVal < 90) {
      // Smooth feathering for antialiased glow
      const alphaFactor = (maxVal - 45) / 45;
      data[i + 3] = Math.round(data[i + 3] * alphaFactor);
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
  .png()
  .toFile(outputPath);

  console.log('Successfully saved transparent logo to:', outputPath);

  // Also copy to public/images/logo-transparent.png and public/qorbit-logo-transparent.png
  const publicPath1 = path.join(__dirname, '../public/images/logo-transparent.png');
  const publicPath2 = path.join(__dirname, '../public/qorbit-logo-transparent.png');
  fs.copyFileSync(outputPath, publicPath1);
  fs.copyFileSync(outputPath, publicPath2);
  console.log('Copied to public locations!');
}

processLogo().catch(err => {
  console.error('Error processing logo:', err);
});
