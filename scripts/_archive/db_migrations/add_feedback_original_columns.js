require('dotenv/config');
const prisma = require('../../src/config/db');
const seedData = require('../seed/seed_portfolio.json');

async function main() {
    console.log('Adding alasan_original and pesan_kesan_original columns to feedbacks...');
    await prisma.pool.query(`
        ALTER TABLE feedbacks 
        ADD COLUMN IF NOT EXISTS alasan_original text,
        ADD COLUMN IF NOT EXISTS pesan_kesan_original text;
    `);
    console.log('Columns added successfully.');

    // Populate from seedData.feedbacks
    const seedFeedbacks = seedData.feedbacks || [];
    console.log(`Found ${seedFeedbacks.length} seed feedbacks with original Indonesian text.`);

    for (const item of seedFeedbacks) {
        if (!item.id) continue;
        const res = await prisma.pool.query(
            `UPDATE feedbacks 
             SET alasan_original = $1, pesan_kesan_original = $2 
             WHERE id = $3`,
            [item.alasan || null, item.pesan_kesan || null, item.id]
        );
        console.log(`Updated feedback ID ${item.id}: ${res.rowCount} row(s) updated.`);
    }

    // Also check gsa-aiforge_feedback table if any extra
    const gsaRes = await prisma.pool.query('SELECT * FROM "gsa-aiforge_feedback"');
    for (const g of gsaRes.rows) {
        await prisma.pool.query(
            `UPDATE feedbacks 
             SET alasan_original = COALESCE(alasan_original, $1), 
                 pesan_kesan_original = COALESCE(pesan_kesan_original, $2)
             WHERE email = $3 OR nama_lengkap = $4`,
            [g.alasan || null, g.pesan_kesan || null, g.email, g.nama_lengkap]
        );
    }

    // Verify all rows
    const verify = await prisma.pool.query(`
        SELECT id, nama_lengkap, alasan, alasan_original, pesan_kesan, pesan_kesan_original 
        FROM feedbacks 
        ORDER BY id ASC
    `);
    console.log('\nUpdated feedbacks in DB:');
    verify.rows.forEach(r => {
        console.log(`ID ${r.id} (${r.nama_lengkap}):`);
        console.log(`  EN quote: ${r.pesan_kesan?.substring(0, 40)}...`);
        console.log(`  ID quote: ${r.pesan_kesan_original?.substring(0, 40)}...`);
    });
}

main().catch(console.error).finally(() => prisma.pool.end());
