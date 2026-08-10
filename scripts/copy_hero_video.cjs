const fs = require('fs');
const path = require('path');

const srcFile = 'c:\\Users\\win\\Downloads\\hero-main-bg.mp4.mov';

const dest1 = path.join(__dirname, '..', 'public', 'assets', 'videos', 'hero-main-bg.mp4');
const dest2 = path.join(__dirname, '..', 'src', 'assets', 'videos', 'hero-main-bg.mp4');
const dest3 = path.join(__dirname, '..', 'public', 'assets', 'images', 'hero-main-bg.mp4');

[dest1, dest2, dest3].forEach(d => {
  fs.mkdirSync(path.dirname(d), { recursive: true });
  fs.copyFileSync(srcFile, d);
  console.log(`Copied video -> ${d} (${fs.statSync(d).size} bytes)`);
});
