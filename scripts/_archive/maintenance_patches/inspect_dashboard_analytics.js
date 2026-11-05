const fs = require('fs');
const html = fs.readFileSync('public/dashboard.html', 'utf8');

const idx = html.lastIndexOf('hs-total-visitors');
console.log(html.substring(idx - 600, idx + 400));
