const fs = require('fs');
const path = require('path');
const prisma = require('../src/config/db');

const LOGOS_DIR = path.join(__dirname, '../public/assets/images/logos');

if (!fs.existsSync(LOGOS_DIR)) {
  fs.mkdirSync(LOGOS_DIR, { recursive: true });
}

async function downloadFile(url, destFilename) {
  const destPath = path.join(LOGOS_DIR, destFilename);
  console.log(`Downloading: ${url}\n  -> ${destFilename}`);
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: status ${res.status} ${res.statusText}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(destPath, buffer);
  console.log(`✓ Saved ${destFilename} (${buffer.length} bytes)`);
  return `/assets/images/logos/${destFilename}`;
}

async function run() {
  console.log('=== DOWNLOADING & LOCALIZING ALL EXTERNAL LOGOS ===\n');

  // 1. Masa Research (User provided latest URL)
  const masaUrl = "https://media.licdn.com/dms/image/v2/D560BAQHKKb_Pi5EO_Q/company-logo_400_400/B56Z1yNFZWGgAY-/0/1775737526511/masa_ai_logo?e=1795046400&v=beta&t=Bgi1N7PFHHUzHVXbSyEjw6vpaK5SDP6o1K_53F_z0QI";
  const masaLocal = await downloadFile(masaUrl, 'masa-research-logo.png');

  // 2. RevoU
  const revouUrl = "https://upload.wikimedia.org/wikipedia/commons/5/53/Logo_revou.png";
  const revouLocal = await downloadFile(revouUrl, 'revou-logo.png');

  // 3. Paper.id
  const paperUrl = "https://www.paper.id/blog/wp-content/uploads/2025/04/Logogram-Paper.png";
  const paperLocal = await downloadFile(paperUrl, 'paper-id-logo.png');

  // 4. XL Axiata
  const xlUrl = "https://blob.cloudcomputing.id/images/5b33ede0-cec9-48a8-85bd-098332186688/xl-axiata-l-min.jpg";
  const xlLocal = await downloadFile(xlUrl, 'xl-axiata-logo.jpg');

  // 5. Ministry of Education
  const kemendikbudUrl = "https://upload.wikimedia.org/wikipedia/commons/9/9c/Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg";
  const kemendikbudLocal = await downloadFile(kemendikbudUrl, 'kemendikbud-logo.svg');

  // 6. AksaraHub (local copy)
  const aksaraSrc = path.join(__dirname, '../public/assets/images/aksarahub-logo.png');
  const aksaraDest = path.join(LOGOS_DIR, 'aksarahub-logo.png');
  if (fs.existsSync(aksaraSrc)) {
    fs.copyFileSync(aksaraSrc, aksaraDest);
    console.log('✓ Copied aksarahub-logo.png to logos directory');
  }

  // 7. Unhas (local copy)
  const unhasSrc = path.join(__dirname, '../public/assets/images/unhas-logo.png');
  const unhasDest = path.join(LOGOS_DIR, 'unhas-logo.png');
  if (fs.existsSync(unhasSrc)) {
    fs.copyFileSync(unhasSrc, unhasDest);
    console.log('✓ Copied unhas-logo.png to logos directory');
  }

  console.log('\n=== UPDATING DATABASE EXPERIENCES WITH LOCAL LOGO PATHS ===');

  await prisma.experience.updateMany({
    where: { company: 'Masa Research' },
    data: { logo_url: masaLocal }
  });
  console.log('✓ Updated Masa Research -> ' + masaLocal);

  await prisma.experience.updateMany({
    where: { company: 'RevoU' },
    data: { logo_url: revouLocal }
  });
  console.log('✓ Updated RevoU -> ' + revouLocal);

  await prisma.experience.updateMany({
    where: { company: 'Paper.id' },
    data: { logo_url: paperLocal }
  });
  console.log('✓ Updated Paper.id -> ' + paperLocal);

  await prisma.experience.updateMany({
    where: { company: 'XL Axiata' },
    data: { logo_url: xlLocal }
  });
  console.log('✓ Updated XL Axiata -> ' + xlLocal);

  await prisma.experience.updateMany({
    where: { company: { contains: 'Ministry of Education' } },
    data: { logo_url: kemendikbudLocal }
  });
  console.log('✓ Updated Ministry of Education -> ' + kemendikbudLocal);

  await prisma.experience.updateMany({
    where: { company: 'AksaraHub Nusantara' },
    data: { logo_url: '/assets/images/logos/aksarahub-logo.png' }
  });
  console.log('✓ Updated AksaraHub Nusantara -> /assets/images/logos/aksarahub-logo.png');

  await prisma.education.updateMany({
    where: { institution: { contains: 'Hasanuddin' } },
    data: { logo_url: '/assets/images/logos/unhas-logo.png' }
  });
  console.log('✓ Updated Hasanuddin University -> /assets/images/logos/unhas-logo.png');

  console.log('\nAll logos successfully downloaded and updated in the database!');
  await prisma.$disconnect();
}

run().catch(err => {
  console.error('Error during logo download/update:', err);
  process.exit(1);
});
