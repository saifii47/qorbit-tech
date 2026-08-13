const fs = require('fs');
const { execSync } = require('child_process');

try {
  fs.rmSync('dist', { recursive: true, force: true });
} catch (e) {}

console.log('Cleaned dist. Running build...');
try {
  const output = execSync('npx vite build', { encoding: 'utf8' });
  console.log(output);
} catch (err) {
  console.log(err.stdout || err.message);
}
