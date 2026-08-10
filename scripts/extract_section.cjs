const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'denver_full.html'), 'utf8');

// Find section intro-strip and showcase-section
const section3and4Regex = /<section class="section intro-strip"[\s\S]*?<\/section>\s*<section class="section showcase-section"[\s\S]*?<\/section>/gi;
const match = section3and4Regex.exec(html);

if (match) {
  console.log('=== FOUND SECTION 3 & 4 HTML ===\n');
  console.log(match[0]);
  fs.writeFileSync(path.join(__dirname, 'extracted_section.html'), match[0]);
} else {
  console.log('Not matched with combined regex, listing showcase-section alone:');
  const showcaseRegex = /<section class="section showcase-section"[\s\S]*?<\/section>/gi;
  const m2 = showcaseRegex.exec(html);
  if (m2) {
    console.log(m2[0]);
    fs.writeFileSync(path.join(__dirname, 'extracted_section.html'), m2[0]);
  }
}

// Search scripts in html for bookOrbit or orbit or carousel JS
const scriptRegex = /<script[\s\S]*?<\/script>/gi;
let scriptMatch;
console.log('\n=== SCRIPTS IN HTML ===\n');
while ((scriptMatch = scriptRegex.exec(html)) !== null) {
  if (scriptMatch[0].includes('bookOrbit') || scriptMatch[0].includes('orbit') || scriptMatch[0].includes('showcase') || scriptMatch[0].includes('rotate') || scriptMatch[0].includes('perspective') || scriptMatch[0].includes('Swiper')) {
    console.log(scriptMatch[0]);
  }
}
