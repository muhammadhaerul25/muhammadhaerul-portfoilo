const fs = require('fs');
const html = fs.readFileSync('public/dashboard.html', 'utf8');

const start = html.indexOf('function switchView(view, el)');
console.log(html.substring(start, start + 1200));

