const fs = require('fs');
const path = require('path');
const https = require('https');

const urls = [
  {
    url: 'https://media.licdn.com/dms/image/v2/D562DAQEMnWPIWJrYTw/profile-treasury-image-shrink_800_800/B56Z_F_5k.KIAI-/0/1785733290727?e=1794456000&v=beta&t=bkDCOtTgfUvHW8QrYtynqd2bRmveocqyRIVnOB-fgs4',
    filename: 'gsa-ai-forge-doc-1.jpg'
  },
  {
    url: 'https://media.licdn.com/dms/image/v2/D562DAQFFTOxdta8xyg/profile-treasury-image-shrink_1280_1280/B56Z_F_.61K0Ac-/0/1785733312607?e=1794456000&v=beta&t=Hs62cYOKMgogeZquZkvRDu9_cUsSvFNCn6seq8rVMKc',
    filename: 'gsa-ai-forge-doc-2.jpg'
  },
  {
    url: 'https://media.licdn.com/dms/image/v2/D562DAQEDkrbla1Bqqw/profile-treasury-image-shrink_1280_1280/B56Z_GAs4aIcAY-/0/1785733500881?e=1794456000&v=beta&t=AoPGu1ogp3wJpFL0cBxKdRUJ-9g7Yv2AWd0Ld0KON80',
    filename: 'gsa-ai-forge-doc-3.jpg'
  }
];

const destDir = path.join(__dirname, '../../public/assets/images');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close(resolve);
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  for (const item of urls) {
    const dest = path.join(destDir, item.filename);
    console.log(`Downloading ${item.url} -> ${dest}`);
    await download(item.url, dest);
    const stat = fs.statSync(dest);
    console.log(`Saved ${item.filename} (${stat.size} bytes)`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

