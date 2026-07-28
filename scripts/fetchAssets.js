// scripts/fetchAssets.js
// Simple Node script to download required CSS files and a few key images from the original site.
// Run with: node scripts/fetchAssets.js

const https = require('https');
const fs = require('fs');
const path = require('path');

const assets = [
  { url: 'https://www.pinnacledesignagency.com/assets/css/ledge/sweetalert.css', dest: 'src/assets/css/sweetalert.css' },
  { url: 'https://www.pinnacledesignagency.com/assets/css/plugin.css', dest: 'src/assets/css/plugin.css' },
  { url: 'https://www.pinnacledesignagency.com/assets/css/custom-unmini.css', dest: 'src/assets/css/custom-unmini.css' },
  { url: 'https://www.pinnacledesignagency.com/assets/css/responsive-unmini.css', dest: 'src/assets/css/responsive-unmini.css' },
  // a few representative images (logo, hero banner, one portfolio item)
  { url: 'https://www.pinnacledesignagency.com/assets/images/logo.png', dest: 'src/assets/images/logo.png' },
  { url: 'https://www.pinnacledesignagency.com/assets/images/banner_people.png', dest: 'src/assets/images/banner_people.png' },
  { url: 'https://www.pinnacledesignagency.com/assets/images/portfolio/logo/logo1.jpg', dest: 'src/assets/images/portfolio/logo1.jpg' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(dest);
    fs.mkdirSync(dir, { recursive: true });
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get ${url} (${res.statusCode})`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlinkSync(dest);
      reject(err);
    });
  });
}

(async () => {
  for (const asset of assets) {
    console.log('Downloading', asset.url);
    try {
      await download(asset.url, path.resolve(__dirname, '..', asset.dest));
      console.log('✓ saved to', asset.dest);
    } catch (e) {
      console.error('✗ error downloading', asset.url, e.message);
    }
  }
  console.log('All done');
})();
