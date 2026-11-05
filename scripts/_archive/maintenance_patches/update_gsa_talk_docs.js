const { pool } = require('../../src/config/db');

async function main() {
  try {
    const gallery = [
      '/assets/images/gsa-ai-forge-doc-1.jpg',
      '/assets/images/gsa-ai-forge-doc-2.jpg',
      '/assets/images/gsa-ai-forge-doc-3.jpg'
    ];
    const res = await pool.query(
      `UPDATE talks
       SET gallery = $1, updated_at = NOW()
       WHERE event ILIKE '%GSA AI Forge%' OR id = 'cmt2k5bn000019sb9mvzbynus'
       RETURNING id, event, poster_url, gallery`,
      [gallery]
    );
    console.log('Updated talks record:');
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error('Error updating talks:', err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();

