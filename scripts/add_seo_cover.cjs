const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\win\\.gemini\\antigravity-ide\\brain\\99fca3c0-1504-4f47-8665-fe6e75c273f3\\media__1786392119105.jpg';
const dest = path.join(__dirname, '..', 'public', 'assets', 'images', 'coverflow', 'seo-marketing.jpg');

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);
console.log(`Copied ${src} -> ${dest}`);
