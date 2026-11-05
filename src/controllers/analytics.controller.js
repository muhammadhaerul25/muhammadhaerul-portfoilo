const prisma = require('../config/db');
const crypto = require('crypto');

function hashIp(ip) {
    if (!ip) return 'anonymous';
    return crypto.createHash('sha256').update(ip + (process.env.JWT_SECRET || 'salt_haerul')).digest('hex').substring(0, 16);
}

function parseUserAgent(ua) {
    if (!ua) return { device: 'Desktop', browser: 'Other', os: 'Other' };
    const lower = ua.toLowerCase();
    
    let device = 'Desktop';
    if (/tablet|ipad|playbook|silk/i.test(lower)) {
        device = 'Tablet';
    } else if (/mobile|iphone|ipod|android.*mobile|blackberry|phone/i.test(lower)) {
        device = 'Mobile';
    }
    
    let os = 'Other';
    if (lower.includes('windows')) os = 'Windows';
    else if (lower.includes('macintosh') || lower.includes('mac os')) os = 'macOS';
    else if (lower.includes('iphone') || lower.includes('ipad') || lower.includes('ios')) os = 'iOS';
    else if (lower.includes('android')) os = 'Android';
    else if (lower.includes('linux')) os = 'Linux';
    
    let browser = 'Other';
    if (lower.includes('edg/') || lower.includes('edge/')) browser = 'Edge';
    else if (lower.includes('chrome') || lower.includes('crios')) browser = 'Chrome';
    else if (lower.includes('safari') && !lower.includes('chrome') && !lower.includes('crios')) browser = 'Safari';
    else if (lower.includes('firefox') || lower.includes('fxios')) browser = 'Firefox';
    else if (lower.includes('opera') || lower.includes('opr/')) browser = 'Opera';
    
    return { device, browser, os };
}

async function getStats(req, res) {
    try {
        // Query real aggregated metrics from visitor_logs
        const totalResult = await prisma.$queryRawUnsafe(`
            SELECT COUNT(*)::int as total FROM visitor_logs
        `);
        const uniqueResult = await prisma.$queryRawUnsafe(`
            SELECT COUNT(DISTINCT visitor_id)::int as unique_count FROM visitor_logs
        `);

        const totalVisitors = Number(totalResult[0]?.total || 0);
        const uniqueVisitors = Number(uniqueResult[0]?.unique_count || 0);

        // Keep visitor_stats table synced with real numbers
        await prisma.$executeRawUnsafe(`
            INSERT INTO visitor_stats (id, total_visitors, unique_visitors, updated_at)
            VALUES ('overview', $1, $2, NOW())
            ON CONFLICT (id) DO UPDATE 
            SET total_visitors = $1, unique_visitors = $2, updated_at = NOW()
        `, totalVisitors, uniqueVisitors).catch(() => {});

        return res.json({
            success: true,
            data: {
                totalVisitors,
                uniqueVisitors,
                updatedAt: new Date().toISOString()
            }
        });
    } catch (err) {
        console.error('[Analytics] Error getting stats:', err);
        // Fallback to visitor_stats table without dummy numbers
        try {
            const rows = await prisma.$queryRawUnsafe(`
                SELECT total_visitors, unique_visitors, updated_at 
                FROM visitor_stats 
                WHERE id = 'overview' 
                LIMIT 1
            `);
            if (rows && rows.length > 0) {
                return res.json({
                    success: true,
                    data: {
                        totalVisitors: Number(rows[0].total_visitors || 0),
                        uniqueVisitors: Number(rows[0].unique_visitors || 0),
                        updatedAt: rows[0].updated_at
                    }
                });
            }
        } catch (_) {}

        return res.json({
            success: true,
            data: {
                totalVisitors: 0,
                uniqueVisitors: 0
            }
        });
    }
}

async function trackVisit(req, res) {
    try {
        const { visitorId, path: pagePath } = req.body || {};
        const vid = (visitorId && typeof visitorId === 'string') ? visitorId.substring(0, 100) : null;
        if (!vid) {
            return res.status(400).json({ success: false, error: 'visitorId is required' });
        }

        const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
        const ipHash = hashIp(rawIp);
        const userAgent = (req.headers['user-agent'] || '').substring(0, 500);
        const p = (pagePath && typeof pagePath === 'string') ? pagePath.substring(0, 255) : '/';

        // Check if visitor has visited before
        const prevLogs = await prisma.$queryRawUnsafe(`
            SELECT id FROM visitor_logs WHERE visitor_id = $1 LIMIT 1
        `, vid);
        const isFirstTime = !prevLogs || prevLogs.length === 0;

        // Insert visit log
        await prisma.$executeRawUnsafe(`
            INSERT INTO visitor_logs (visitor_id, ip_hash, user_agent, path, created_at)
            VALUES ($1, $2, $3, $4, NOW())
        `, vid, ipHash, userAgent, p);

        // Update stats counter with real counts from visitor_logs
        await prisma.$executeRawUnsafe(`
            INSERT INTO visitor_stats (id, total_visitors, unique_visitors, updated_at)
            SELECT 'overview', COUNT(*)::int, COUNT(DISTINCT visitor_id)::int, NOW()
            FROM visitor_logs
            ON CONFLICT (id) DO UPDATE 
            SET total_visitors = EXCLUDED.total_visitors,
                unique_visitors = EXCLUDED.unique_visitors,
                updated_at = NOW()
        `).catch(() => {});

        return res.json({ success: true, isNew: isFirstTime });
    } catch (err) {
        console.error('[Analytics] Error tracking visit:', err);
        return res.status(500).json({ success: false, error: 'Failed to record visit' });
    }
}

async function getDetailedAnalytics(req, res) {
    try {
        // 1. Total and Unique Stats
        const totalResult = await prisma.$queryRawUnsafe(`SELECT COUNT(*)::int as total FROM visitor_logs`);
        const uniqueResult = await prisma.$queryRawUnsafe(`SELECT COUNT(DISTINCT visitor_id)::int as unique_count FROM visitor_logs`);
        const totalVisitors = Number(totalResult[0]?.total || 0);
        const uniqueVisitors = Number(uniqueResult[0]?.unique_count || 0);

        // 2. Daily Trend (last 14 days)
        const dailyTrend = await prisma.$queryRawUnsafe(`
            SELECT 
                TO_CHAR(created_at, 'YYYY-MM-DD') as date,
                COUNT(*)::int as pageviews,
                COUNT(DISTINCT visitor_id)::int as visitors
            FROM visitor_logs
            GROUP BY TO_CHAR(created_at, 'YYYY-MM-DD')
            ORDER BY date DESC
            LIMIT 14
        `);

        // 3. Top Visited Pages & Sections
        const topPages = await prisma.$queryRawUnsafe(`
            SELECT 
                COALESCE(NULLIF(path, ''), '/') as page_path,
                COUNT(*)::int as views,
                COUNT(DISTINCT visitor_id)::int as unique_visitors
            FROM visitor_logs
            GROUP BY page_path
            ORDER BY views DESC
            LIMIT 10
        `);

        // 4. Device, Browser & OS Breakdown
        const uaLogs = await prisma.$queryRawUnsafe(`
            SELECT user_agent, COUNT(*)::int as count 
            FROM visitor_logs 
            WHERE user_agent IS NOT NULL AND user_agent != ''
            GROUP BY user_agent
        `);

        const devices = { Desktop: 0, Mobile: 0, Tablet: 0 };
        const browsers = {};
        const operatingSystems = {};

        uaLogs.forEach(row => {
            const parsed = parseUserAgent(row.user_agent);
            devices[parsed.device] = (devices[parsed.device] || 0) + row.count;
            browsers[parsed.browser] = (browsers[parsed.browser] || 0) + row.count;
            operatingSystems[parsed.os] = (operatingSystems[parsed.os] || 0) + row.count;
        });

        // 5. High-Impact Conversions
        const inqCount = await prisma.contactMessage.count().catch(() => 0);
        const fbStats = await prisma.feedbacks.aggregate({
            _count: { id: true },
            _avg: { rating: true }
        }).catch(() => ({ _count: { id: 0 }, _avg: { rating: 10 } }));
        const formCount = await prisma.forms.count().catch(() => 0);
        const formRespCount = await prisma.form_responses.count().catch(() => 0);

        return res.json({
            success: true,
            data: {
                totalVisitors,
                uniqueVisitors,
                dailyTrend: (dailyTrend || []).reverse(),
                topPages: topPages || [],
                devices,
                browsers,
                operatingSystems,
                conversions: {
                    inquiries: inqCount,
                    feedbacks: fbStats._count.id || 0,
                    avgFeedbackRating: fbStats._avg.rating ? Number(fbStats._avg.rating.toFixed(1)) : 10.0,
                    forms: formCount,
                    formResponses: formRespCount
                },
                updatedAt: new Date().toISOString()
            }
        });
    } catch (err) {
        console.error('[Analytics] Error in getDetailedAnalytics:', err);
        return res.status(500).json({ success: false, error: 'Failed to retrieve detailed analytics' });
    }
}

module.exports = {
    getStats,
    getDetailedAnalytics,
    trackVisit
};
