const fs = require('fs');
const path = require('path');
const https = require('https');

const url = 'https://media.licdn.com/dms/image/v2/D5622AQEc6y9DngeZvQ/feedshare-shrink_1280/B56aAz7BYrKkAM-/0/1787577505706?e=1795651200&v=beta&t=JdZDX-pKHhVG1O91FWAeqIriXyQNPAVK0P-NwsN_DYE';
const dest = path.join(__dirname, '../../public/uploads/talks/mindful-ai-poster-hd.jpg');

function download(u, d) {
  return new Promise((resolve, reject) => {
    https.get(u, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, d).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(d);
      res.pipe(fileStream);
      fileStream.on('finish', () => fileStream.close(resolve));
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

download(url, dest).then(() => {
  const stat = fs.statSync(dest);
  console.log(`Downloaded ${dest} (${stat.size} bytes)`);
}).catch(console.error);

