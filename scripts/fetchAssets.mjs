// scripts/fetchAssets.mjs  – run with: node scripts/fetchAssets.mjs
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const assets = [
  { url: 'https://www.pinnacledesignagency.com/assets/css/ledge/sweetalert.css', dest: 'src/assets/css/sweetalert.css' },
  { url: 'https://www.pinnacledesignagency.com/assets/css/plugin.css',           dest: 'src/assets/css/plugin.css' },
  { url: 'https://www.pinnacledesignagency.com/assets/css/custom-unmini.css',    dest: 'src/assets/css/custom-unmini.css' },
  { url: 'https://www.pinnacledesignagency.com/assets/css/responsive-unmini.css',dest: 'src/assets/css/responsive-unmini.css' },
  { url: 'https://www.pinnacledesignagency.com/assets/images/logo.png',          dest: 'src/assets/images/logo.png' },
  { url: 'https://www.pinnacledesignagency.com/assets/images/banner_people.png', dest: 'src/assets/images/banner_people.png' },
  // portfolio images
  { url: 'https://www.pinnacledesignagency.com/assets/images/portfolio/logo/logo1.jpg',            dest: 'src/assets/images/portfolio/logo/logo1.jpg' },
  { url: 'https://www.pinnacledesignagency.com/assets/images/portfolio/3d-logo/port1.jpg',        dest: 'src/assets/images/portfolio/logo/port1.jpg' },
  { url: 'https://www.pinnacledesignagency.com/assets/images/portfolio/typography/port4.jpg',     dest: 'src/assets/images/portfolio/logo/port4.jpg' },
  { url: 'https://www.pinnacledesignagency.com/assets/images/portfolio/illustrated-logo/port3.jpg',dest: 'src/assets/images/portfolio/logo/port3.jpg' },
  { url: 'https://www.pinnacledesignagency.com/assets/images/portfolio/ecommerce/img1.jpg',       dest: 'src/assets/images/portfolio/websites/img1.jpg' },
  { url: 'https://www.pinnacledesignagency.com/assets/images/portfolio/b2b/img2.png',             dest: 'src/assets/images/portfolio/websites/img2.png' },
  { url: 'https://www.pinnacledesignagency.com/assets/images/portfolio/web-app/img3.png',         dest: 'src/assets/images/portfolio/websites/img3.png' },
  { url: 'https://www.pinnacledesignagency.com/assets/images/portfolio/cms/img4.png',             dest: 'src/assets/images/portfolio/websites/img4.png' },
  { url: 'https://www.pinnacledesignagency.com/assets/images/portfolio/ios/img1.jpg',             dest: 'src/assets/images/portfolio/mobileapps/img1.jpg' },
  { url: 'https://www.pinnacledesignagency.com/assets/images/portfolio/android/img2.png',         dest: 'src/assets/images/portfolio/mobileapps/img2.png' },
  // icons / misc
  { url: 'https://www.pinnacledesignagency.com/assets/images/favicon.png',       dest: 'public/favicon.png' },
];

function download(url, destRelative) {
  return new Promise((resolve, reject) => {
    const dest = path.resolve(__dirname, '..', destRelative);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      try { fs.unlinkSync(dest); } catch {}
      reject(err);
    });
  });
}

for (const asset of assets) {
  process.stdout.write(`Downloading ${asset.url} … `);
  try {
    await download(asset.url, asset.dest);
    console.log('✓');
  } catch (e) {
    console.log(`✗  ${e.message}`);
  }
}
console.log('\nAll done.');
