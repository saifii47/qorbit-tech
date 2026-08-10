const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.join(__dirname, 'denver_responsive.css'), 'utf8');

const lines = css.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('orbit') || line.includes('showcase') || line.includes('book-shell') || line.includes('intro-strip')) {
    console.log(`L${idx+1}: ${line}`);
  }
});
