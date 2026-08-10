const fs = require('fs');
const path = require('path');

const coverDir = path.join(__dirname, '..', 'public', 'assets', 'images', 'coverflow');

const mapping = [
  { src: 'service-cover-1.jpg', dest: 'web-design.jpg' },
  { src: 'service-cover-2.jpg', dest: 'mobile-app.jpg' },
  { src: 'service-cover-3.jpg', dest: 'ecommerce.jpg' },
  { src: 'service-cover-4.jpg', dest: 'branding.jpg' },
  { src: 'service-cover-5.jpg', dest: 'ui-ux.jpg' }
];

mapping.forEach(m => {
  const sPath = path.join(coverDir, m.src);
  const dPath = path.join(coverDir, m.dest);
  if (fs.existsSync(sPath)) {
    fs.copyFileSync(sPath, dPath);
    console.log(`Copied ${m.src} -> ${m.dest}`);
  }
});
