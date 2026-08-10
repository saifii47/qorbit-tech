const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\win\\.gemini\\antigravity-ide\\brain\\99fca3c0-1504-4f47-8665-fe6e75c273f3';
const destDir = path.join(__dirname, '..', 'public', 'assets', 'images', 'coverflow');

fs.mkdirSync(destDir, { recursive: true });

const mediaFiles = [
  'media__1786391477121.jpg',
  'media__1786391503308.jpg',
  'media__1786391517405.jpg',
  'media__1786391525584.jpg',
  'media__1786391536252.jpg'
];

mediaFiles.forEach((file, index) => {
  const src = path.join(brainDir, file);
  if (fs.existsSync(src)) {
    const dest = path.join(destDir, `service-cover-${index + 1}.jpg`);
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} -> ${dest}`);
  } else {
    console.log(`Not found: ${src}`);
  }
});
