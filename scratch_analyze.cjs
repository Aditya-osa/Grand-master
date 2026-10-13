const fs = require('fs');
const html = fs.readFileSync('C:/Users/Admin/.gemini/antigravity-ide/brain/9799694c-cba9-4065-8270-e2874a7a2166/.system_generated/steps/202/content.md', 'utf8');

const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)]
  .map(m => m[1].trim())
  .filter(s => s.length > 0 && !s.includes('WebFont'));

console.log('Scripts count:', scripts.length);
scripts.forEach((s, i) => {
  console.log(`--- SCRIPT ${i} ---`);
  console.log(s.slice(0, 1500));
});
