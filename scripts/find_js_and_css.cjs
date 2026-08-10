const fs = require('fs');
const path = require('path');
const https = require('https');

const html = fs.readFileSync(path.join(__dirname, 'denver_full.html'), 'utf8');

// Find all CSS links
const cssRegex = /<link[^>]+href=[\"']([^\"']+\.css[^\"']*)[\"']/gi;
let m;
const cssUrls = [];
while ((m = cssRegex.exec(html)) !== null) {
  cssUrls.push(m[1]);
}
console.log('CSS Files:', cssUrls);

// Find all JS scripts
const jsRegex = /<script[^>]+src=[\"']([^\"']+\.js[^\"']*)[\"']/gi;
const jsUrls = [];
while ((m = jsRegex.exec(html)) !== null) {
  jsUrls.push(m[1]);
}
console.log('JS Files:', jsUrls);

// Find inline scripts
const inlineScriptRegex = /<script(?![^>]*src=)[\s\S]*?<\/script>/gi;
let inlineM;
let inlineIdx = 1;
while ((inlineM = inlineScriptRegex.exec(html)) !== null) {
  console.log(`\n--- INLINE SCRIPT ${inlineIdx} ---`);
  console.log(inlineM[0].substring(0, 500));
  inlineIdx++;
}
