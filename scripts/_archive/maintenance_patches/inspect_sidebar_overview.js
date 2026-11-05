const fs = require('fs');
const html = fs.readFileSync('public/dashboard.html', 'utf8');

const overviewStart = html.indexOf('id="nav-dashboard"');
console.log(html.substring(overviewStart - 50, overviewStart + 600));

