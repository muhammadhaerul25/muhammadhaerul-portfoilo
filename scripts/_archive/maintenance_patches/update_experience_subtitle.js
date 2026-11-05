require('dotenv/config');
const prisma = require('../../src/config/db');

async function main() {
    const res = await prisma.pool.query("SELECT key, value FROM site_settings WHERE key = 'site_page_settings'");
    if (res.rows.length === 0) {
        console.log('No site_page_settings row found.');
        return;
    }
    const val = res.rows[0].value;
    console.log('Old sections.experiences.subtitle:', val?.sections?.experiences?.subtitle);
    console.log('Old sections.experience.subtitle:', val?.sections?.experience?.subtitle);

    const accurateSubtitle = "3+ years of professional experience across 6 roles at AksaraHub, RevoU, Paper.id, Masa Research, XL Axiata, and Kemendikbud—shipping enterprise AI, LLM OCR, and computer vision pipelines.";

    if (val && val.sections) {
        if (val.sections.experiences) {
            val.sections.experiences.subtitle = accurateSubtitle;
        }
        if (val.sections.experience) {
            val.sections.experience.subtitle = accurateSubtitle;
        }
    }

    await prisma.pool.query(
        "UPDATE site_settings SET value = $1, updated_at = NOW() WHERE key = 'site_page_settings'",
        [JSON.stringify(val)]
    );
    console.log('Successfully updated experiences subtitle in database!');
}

main().catch(console.error).finally(() => prisma.pool.end());
