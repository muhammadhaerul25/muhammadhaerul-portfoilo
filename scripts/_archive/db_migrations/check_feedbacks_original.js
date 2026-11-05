require('dotenv/config');
const prisma = require('../../src/config/db');

async function main() {
    const gsa = await prisma.pool.query('SELECT * FROM "gsa-aiforge_feedback" LIMIT 3');
    console.log('gsa-aiforge_feedback sample:', gsa.rows);

    const mindful = await prisma.pool.query('SELECT * FROM "mindful-ai-feedbacks" LIMIT 3');
    console.log('mindful-ai-feedbacks sample:', mindful.rows);

    const fbs = await prisma.pool.query('SELECT column_name, data_type FROM information_schema.columns WHERE table_name = \'feedbacks\'');
    console.log('feedbacks columns:', fbs.rows.map(r => r.column_name));
}

main().catch(console.error).finally(() => prisma.pool.end());
