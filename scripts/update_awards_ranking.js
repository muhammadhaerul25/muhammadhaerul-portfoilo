const prisma = require('../src/config/db');
const cache = require('../src/utils/cache');

async function main() {
    console.log('--- Updating Awards and Re-Ordering by Level ---');

    // 1. Fetch all awards
    const awards = await prisma.award.findMany();
    console.log(`Found ${awards.length} awards in database.`);

    // 2. Find BPJS Healthkathon award and update to Top 10 Semifinalist
    const bpjsAward = awards.find(a => 
        a.title.toLowerCase().includes('bpjs') || 
        a.title.toLowerCase().includes('healthkathon') ||
        (a.image_url && a.image_url.includes('award_img_1.jpg'))
    );

    if (bpjsAward) {
        console.log(`Updating BPJS Award (ID: ${bpjsAward.id})...`);
        await prisma.award.update({
            where: { id: bpjsAward.id },
            data: {
                title: 'Top 10 Semifinalist (Machine Learning) — BPJS Kesehatan Healthkathon 2022',
                issuer: 'BPJS Kesehatan',
                metric_tag: 'Top 10 Semifinalist',
                badge_text: '🏅 Top 10 ML Semifinalist',
                badge_color: 'purple',
                description: 'Recognized as Top 10 Semifinalist in the Machine Learning Category at BPJS Kesehatan Healthkathon 2022, competing nationally to engineer predictive healthcare intelligence solutions.',
                chips: ['Machine Learning', 'Healthkathon 2022', 'Top 10 National', 'BPJS Kesehatan'],
                sort_order: 2
            }
        });
        console.log('✓ BPJS Award updated to Top 10 Semifinalist.');
    } else {
        console.warn('⚠️ BPJS Award not found!');
    }

    // 3. Define the desired order by achievement rank / level:
    // 1. 2nd Place Winner — Makassar Hackathon 2024
    // 2. Top 10 Semifinalist (Machine Learning) — BPJS Kesehatan Healthkathon 2022
    // 3. Top 20 AI Talent Hub Indonesia 2025
    // 4. Achievement Award — Kompetisi Website Budaya Nusantara (aksarahub.id)
    // 5. Competitor & Finalist — Open The Gate Hack 2025
    // 6. Most Outstanding Student — Computer Science
    // 7. Graduated Cumlaude (Highest Honors)
    // 8. Bank Indonesia Scholarship (GenBI)

    const allUpdated = await prisma.award.findMany();
    for (const a of allUpdated) {
        const t = (a.title || '').toLowerCase();
        let newOrder = 99;

        if (t.includes('makassar hackathon')) {
            newOrder = 1;
        } else if (t.includes('bpjs') || t.includes('healthkathon')) {
            newOrder = 2;
        } else if (t.includes('ai talent hub')) {
            newOrder = 3;
        } else if (t.includes('budaya nusantara') || t.includes('aksarahub')) {
            newOrder = 4;
        } else if (t.includes('open the gate')) {
            newOrder = 5;
        } else if (t.includes('outstanding student')) {
            newOrder = 6;
        } else if (t.includes('cumlaude')) {
            newOrder = 7;
        } else if (t.includes('bank indonesia') || t.includes('genbi')) {
            newOrder = 8;
        }

        await prisma.award.update({
            where: { id: a.id },
            data: { sort_order: newOrder }
        });
        console.log(`Award "${a.title}" set to sort_order: ${newOrder}`);
    }

    // Invalidate caches
    cache.del('awards');
    cache.del('awards:all');
    cache.del('portfolio:bootstrap');
    cache.del('portfolio_bootstrap');

    console.log('--- Final Sorted Awards in DB ---');
    const sorted = await prisma.award.findMany({
        orderBy: [{ sort_order: 'asc' }, { created_at: 'desc' }]
    });
    sorted.forEach(s => {
        console.log(`[Order ${s.sort_order}] ${s.title} (${s.metric_tag})`);
    });

    console.log('✓ Done!');
    process.exit(0);
}

main().catch(err => {
    console.error('Error running awards update:', err);
    process.exit(1);
});
