const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.join(__dirname, 'denver_style.css'), 'utf8');

const queries = ['intro-strip', 'showcase-section', 'book-orbit', 'book-ring', 'orbit-book', 'book-shell', 'orbit-floor', 'orbit-caption', 'cta-btn-box', 'eyebrow', 'section-title', 'btn-gold', 'btn-outline-green', ':root'];

queries.forEach(q => {
  console.log(`\n================ CSS FOR ${q} ================`);
  const lines = css.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes(q)) {
      console.log(`L${idx+1}: ${line}`);
    }
  });
});
