require('dotenv/config');
const prisma = require('../../src/config/db');

async function run() {
  // 1. GDG Build with AI
  const t1 = await prisma.pool.query("SELECT id, gallery FROM talks WHERE event ILIKE '%Build with AI%'");
  if (t1.rows.length) {
    const row = t1.rows[0];
    let gal = Array.isArray(row.gallery) ? row.gallery : [];
    if (!gal.includes('/assets/certificates/cert-gdg-build-with-ai.jpg')) {
      gal.push('/assets/certificates/cert-gdg-build-with-ai.jpg');
    }
    await prisma.pool.query("UPDATE talks SET gallery = $1, updated_at = NOW() WHERE id = $2", [gal, row.id]);
    console.log('Updated GDG Build with AI talk certificate');
  }

  // 2. Unsulbar Web AI Engineering
  const t2 = await prisma.pool.query("SELECT id, gallery FROM talks WHERE event ILIKE '%Web Engineering%'");
  if (t2.rows.length) {
    const row = t2.rows[0];
    let gal = Array.isArray(row.gallery) ? row.gallery : [];
    if (!gal.includes('/assets/certificates/cert-unsulbar-web-ai.jpg')) {
      gal.push('/assets/certificates/cert-unsulbar-web-ai.jpg');
    }
    await prisma.pool.query("UPDATE talks SET gallery = $1, updated_at = NOW() WHERE id = $2", [gal, row.id]);
    console.log('Updated Unsulbar Web AI talk certificate');
  }

  // 3. BSSN Cybersecurity Webinar
  const t3 = await prisma.pool.query("SELECT id, gallery FROM talks WHERE event ILIKE '%Cybersecurity%'");
  if (t3.rows.length) {
    const row = t3.rows[0];
    let gal = Array.isArray(row.gallery) ? row.gallery : [];
    if (!gal.includes('/assets/certificates/cert-bssn-cybersecurity.jpg')) {
      gal.push('/assets/certificates/cert-bssn-cybersecurity.jpg');
    }
    await prisma.pool.query("UPDATE talks SET gallery = $1, updated_at = NOW() WHERE id = $2", [gal, row.id]);
    console.log('Updated BSSN Cybersecurity talk certificate');
  }
}

run().finally(() => prisma.pool.end());

