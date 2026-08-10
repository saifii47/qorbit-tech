const fs = require('fs');
const path = require('path');

const css = fs.readFileSync(path.join(__dirname, 'denver_style.css'), 'utf8');
const respCss = fs.readFileSync(path.join(__dirname, 'denver_responsive.css'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, 'denver_script.js'), 'utf8');

console.log('=== JS CODE FOR BOOK ORBIT / CAROUSEL ===');
const jsLines = js.split('\n');
jsLines.forEach((line, index) => {
  if (line.includes('orbit') || line.includes('bookOrbit') || line.includes('bookRing') || line.includes('showcase') || line.includes('rotate') || line.includes('drag') || line.includes('angle') || line.includes('radius')) {
    console.log(`L${index + 1}: ${line}`);
  }
});

console.log('\n=== CSS CODE FOR SHOWCASE & ORBIT ===');
const cssLines = css.split('\n');
let inOrbit = false;
let cssBuffer = [];
cssLines.forEach((line, index) => {
  if (line.includes('showcase') || line.includes('orbit') || line.includes('book-ring') || line.includes('intro-strip')) {
    inOrbit = true;
  }
  if (inOrbit) {
    cssBuffer.push(`L${index + 1}: ${line}`);
    if (line.trim() === '}' && cssBuffer.length > 5) {
      // maybe check end of block
    }
  }
});

// Let's search CSS for rules matching book-orbit, book-ring, orbit-book, showcase-section, intro-strip, orbit-caption, book-shell
const rules = css.match(/(?:\/\*[\s\S]*?\*\/|[^\{]+)\{[\s\S]*?\}/gi) || [];
const matchedRules = rules.filter(r => r.includes('orbit') || r.includes('showcase') || r.includes('intro-strip') || r.includes('book-ring') || r.includes('book-shell'));

console.log('\n--- MATCHED CSS RULES (' + matchedRules.length + ') ---');
matchedRules.forEach(r => console.log(r.trim() + '\n'));

fs.writeFileSync(path.join(__dirname, 'extracted_orbit.css'), matchedRules.join('\n\n'));

// Do the same for JS functions
fs.writeFileSync(path.join(__dirname, 'extracted_orbit.js'), js);
