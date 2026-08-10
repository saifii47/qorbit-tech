const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'denver_full.html'), 'utf8');

console.log('HTML Length:', html.length);

// Search for sections
const sectionRegex = /<section[\s\S]*?<\/section>/gi;
let match;
let idx = 1;
while ((match = sectionRegex.exec(html)) !== null) {
  console.log(`\n================ SECTION ${idx} ================`);
  console.log(match[0].substring(0, 300));
  idx++;
}
