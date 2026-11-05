require('dotenv/config');
const prisma = require('../../src/config/db');

async function main() {
    const res = await prisma.pool.query("SELECT key, value FROM site_settings WHERE key = 'site_page_settings'");
    if (res.rows.length === 0) {
        console.log('No site_page_settings row found.');
        return;
    }
    const row = res.rows[0];
    const val = row.value;
    console.log('Current profile.education:', val?.profile?.education);

    if (val && val.profile) {
        val.profile.education = 'Bachelor of Computer Science';
    }

    await prisma.pool.query(
        "UPDATE site_settings SET value = $1, updated_at = NOW() WHERE key = 'site_page_settings'",
        [JSON.stringify(val)]
    );
    console.log('Successfully updated site_page_settings in database!');
    
    // Also check if any cache needs to be cleared
    const cache = require('../../src/utils/cache');
    cache.flushAll();
    console.log('Cache flushed.');
}

main().catch(console.error).finally(() => prisma.pool.end());
