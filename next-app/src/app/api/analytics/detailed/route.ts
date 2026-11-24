import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

function parseUserAgent(ua: string) {
  if (!ua) return { device: 'Desktop', browser: 'Other', os: 'Other' };
  const lower = ua.toLowerCase();

  let device: 'Desktop' | 'Mobile' | 'Tablet' = 'Desktop';
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

export async function GET() {
  try {
    const [totalResult, uniqueResult, dailyTrend, topPages, uaLogs] = (await Promise.all([
      prisma.$queryRawUnsafe(`SELECT COUNT(*)::int as total FROM visitor_logs`),
      prisma.$queryRawUnsafe(`SELECT COUNT(DISTINCT visitor_id)::int as unique_count FROM visitor_logs`),
      prisma.$queryRawUnsafe(`
        SELECT 
          TO_CHAR(created_at, 'YYYY-MM-DD') as date,
          COUNT(*)::int as pageviews,
          COUNT(DISTINCT visitor_id)::int as visitors
        FROM visitor_logs
        GROUP BY TO_CHAR(created_at, 'YYYY-MM-DD')
        ORDER BY date DESC
        LIMIT 14
      `),
      prisma.$queryRawUnsafe(`
        SELECT 
          COALESCE(NULLIF(path, ''), '/') as page_path,
          COUNT(*)::int as views,
          COUNT(DISTINCT visitor_id)::int as unique_visitors
        FROM visitor_logs
        GROUP BY page_path
        ORDER BY views DESC
        LIMIT 10
      `),
      prisma.$queryRawUnsafe(`
        SELECT user_agent, COUNT(*)::int as count 
        FROM visitor_logs 
        WHERE user_agent IS NOT NULL AND user_agent != ''
        GROUP BY user_agent
      `),
    ])) as [
      { total: number }[],
      { unique_count: number }[],
      { date: string; pageviews: number; visitors: number }[],
      { page_path: string; views: number; unique_visitors: number }[],
      { user_agent: string; count: number }[],
    ];

    const totalVisitors = Number(totalResult[0]?.total || 0);
    const uniqueVisitors = Number(uniqueResult[0]?.unique_count || 0);

    const devices: Record<string, number> = { Desktop: 0, Mobile: 0, Tablet: 0 };
    const browsers: Record<string, number> = {};
    const operatingSystems: Record<string, number> = {};

    uaLogs.forEach((row) => {
      const parsed = parseUserAgent(row.user_agent);
      const count = Number(row.count || 0);
      devices[parsed.device] = (devices[parsed.device] || 0) + count;
      browsers[parsed.browser] = (browsers[parsed.browser] || 0) + count;
      operatingSystems[parsed.os] = (operatingSystems[parsed.os] || 0) + count;
    });

    const [inqRows, fbStats, formCount, formRespCount] = await Promise.all([
      (prisma
        .$queryRawUnsafe(`SELECT COUNT(*)::int as count FROM contact_messages`)
        .catch(() => [{ count: 0 }]) as Promise<{ count: number }[]>),
      prisma.feedback
        .aggregate({
          _count: { id: true },
          _avg: { rating: true },
        })
        .catch(() => ({ _count: { id: 0 }, _avg: { rating: 10 } })),
      prisma.form.count().catch(() => 0),
      prisma.formResponse.count().catch(() => 0),
    ]);

    const inquiries = Number(inqRows[0]?.count || 0);
    const feedbacks = fbStats._count.id || 0;
    const avgFeedbackRating = fbStats._avg.rating ? Number(fbStats._avg.rating.toFixed(1)) : 10.0;
    const totalConversions = inquiries + feedbacks + formRespCount;
    const conversionRate = uniqueVisitors > 0 ? Number(((totalConversions / uniqueVisitors) * 100).toFixed(1)) : 0;

    return NextResponse.json({
      success: true,
      data: {
        totalVisitors,
        uniqueVisitors,
        dailyTrend: [...(dailyTrend || [])].reverse(),
        topPages: topPages || [],
        devices,
        browsers,
        operatingSystems,
        conversions: {
          inquiries,
          feedbacks,
          avgFeedbackRating,
          forms: formCount,
          formResponses: formRespCount,
          totalConversions,
          conversionRate,
        },
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to retrieve detailed analytics';
    console.error('[Next Analytics] Error in GET /api/analytics/detailed:', err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
