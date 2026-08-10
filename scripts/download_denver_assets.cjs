const fs = require('fs');
const path = require('path');
const https = require('https');

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const file = fs.createWriteStream(destPath);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      try { fs.unlinkSync(destPath); } catch {}
      reject(err);
    });
  });
}

async function main() {
  const cssFiles = [
    { url: 'https://denverpublishers.com/css/style.css', dest: 'scripts/denver_style.css' },
    { url: 'https://denverpublishers.com/css/responsive.css', dest: 'scripts/denver_responsive.css' },
    { url: 'https://denverpublishers.com/js/script.js', dest: 'scripts/denver_script.js' }
  ];

  for (const item of cssFiles) {
    console.log(`Downloading ${item.url}...`);
    try {
      await downloadFile(item.url, path.join(__dirname, '..', item.dest));
      console.log('✓ Done');
    } catch (err) {
      console.error('✗ Error:', err.message);
    }
  }

  // Extract all img src from extracted_section.html
  const sectionHtml = fs.readFileSync(path.join(__dirname, 'extracted_section.html'), 'utf8');
  const imgRegex = /src=[\"']([^\"']+)[\"']/gi;
  let match;
  const images = [];
  while ((match = imgRegex.exec(sectionHtml)) !== null) {
    images.push(match[1]);
  }

  console.log('\nFound images in showcase section:', images);

  for (const imgPath of images) {
    const fullUrl = `https://denverpublishers.com/${encodeURI(imgPath)}`;
    const destPath = path.join(__dirname, '..', 'public', imgPath);
    console.log(`Downloading image ${fullUrl} -> ${destPath}...`);
    try {
      await downloadFile(fullUrl, destPath);
      console.log('✓ Image downloaded');
    } catch (err) {
      console.error('✗ Image Error:', err.message);
    }
  }
}

main();
