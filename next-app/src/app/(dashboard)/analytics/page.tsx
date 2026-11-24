"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Activity,
  BarChart3,
  Eye,
  FileText,
  Globe,
  Laptop,
  Mail,
  MessageSquare,
  RefreshCw,
  Smartphone,
  Sparkles,
  Tablet,
  TrendingUp,
  Users,
} from "lucide-react";

interface DailyTrendItem {
  date: string;
  pageviews: number;
  visitors: number;
}

interface TopPageItem {
  page_path: string;
  views: number;
  unique_visitors: number;
}

interface AnalyticsData {
  totalVisitors: number;
  uniqueVisitors: number;
  dailyTrend: DailyTrendItem[];
  topPages: TopPageItem[];
  devices: Record<string, number>;
  browsers: Record<string, number>;
  operatingSystems: Record<string, number>;
  conversions: {
    inquiries: number;
    feedbacks: number;
    avgFeedbackRating: number;
    forms: number;
    formResponses: number;
    totalConversions: number;
    conversionRate: number;
  };
  updatedAt: string;
}

function BreakdownList({
  title,
  data,
  barColor,
}: {
  title: string;
  data: Record<string, number>;
  barColor: string;
}) {
  const entries = Object.entries(data || {}).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((acc, [, v]) => acc + v, 0);

  return (
    <div className="bg-white border border-line-soft rounded-[20px] p-6 shadow-sm">
      <h3 className="text-sm font-extrabold uppercase tracking-wider text-ink-4 mb-4">
        {title}
      </h3>
      {entries.length === 0 ? (
        <p className="text-sm text-ink-4 py-4 text-center">No telemetry recorded yet.</p>
      ) : (
        <div className="flex flex-col gap-3.5">
          {entries.slice(0, 6).map(([label, count]) => {
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div key={label}>
                <div className="flex justify-between items-center text-sm mb-1.5">
                  <span className="font-semibold text-ink">{label}</span>
                  <span className="text-xs font-bold text-ink-3">
                    {count.toLocaleString()} ({pct}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-line-soft rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${Math.max(pct, 2)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/analytics/detailed", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || "Failed to load analytics");
      }
      setData(json.data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load analytics");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics(false);
  }, [fetchAnalytics]);

  const maxDailyViews = data?.dailyTrend?.length
    ? Math.max(...data.dailyTrend.map((d) => d.pageviews), 1)
    : 1;

  const deviceTotal = data
    ? Object.values(data.devices || {}).reduce((sum, v) => sum + v, 0)
    : 0;

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-8 py-6 flex justify-between items-center border-b border-line-soft">
        <div>
          <div className="text-[1.8rem] font-extrabold tracking-tight text-ink leading-tight">
            Analytics
          </div>
          {data?.updatedAt && (
            <div className="text-xs font-medium text-ink-4 mt-0.5">
              Last synced {new Date(data.updatedAt).toLocaleTimeString()}
            </div>
          )}
        </div>

        <button
          onClick={() => fetchAnalytics(true)}
          disabled={refreshing || loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-line text-sm font-semibold text-ink-2 hover:bg-line-soft transition-colors disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </button>
      </header>

      <div className="px-8 pt-8 pb-12 w-full max-w-7xl mx-auto flex flex-col gap-6">
        {/* Live Visitor Intelligence Banner */}
        <div className="bg-white border border-line-soft rounded-[20px] p-6 shadow-sm relative overflow-hidden">
          <div className="google-strip absolute top-0 left-0" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-blue-soft text-google-blue-dark text-xs font-extrabold uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-google-green animate-pulse" />
                Live Visitor Intelligence
              </div>
              <h2 className="text-xl font-extrabold text-ink tracking-tight">
                Portfolio Analytics & Audience Insights
              </h2>
              <p className="text-sm text-ink-3 mt-1 max-w-2xl">
                Real-time telemetry on visitors, top routes, platform breakdown, and
                engagement conversions across your portfolio.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-2.5 rounded-2xl bg-google-green-soft text-google-green-dark text-xs font-bold flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Telemetry Active
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-google-red-soft border border-google-red/20 text-google-red-dark rounded-[16px] p-4 flex items-center justify-between gap-4">
            <span className="text-sm font-semibold">{error}</span>
            <button
              onClick={() => fetchAnalytics(false)}
              className="px-3.5 py-1.5 rounded-full bg-white text-google-red-dark text-xs font-bold shadow-sm hover:bg-line-soft transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {loading && !data ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-line-soft rounded-[16px] p-5 h-32 animate-pulse"
              >
                <div className="h-3 w-24 bg-line-soft rounded mb-4" />
                <div className="h-8 w-20 bg-line-soft rounded mb-2" />
                <div className="h-3 w-32 bg-line-soft rounded" />
              </div>
            ))}
          </div>
        ) : data ? (
          <>
            {/* 3 Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white border border-line-soft rounded-[16px] p-5 shadow-sm relative overflow-hidden">
                <div className="text-[11px] font-extrabold uppercase tracking-widest text-ink-4 mb-2">
                  Total Page Views
                </div>
                <div className="text-3xl font-black text-ink mb-1">
                  {data.totalVisitors.toLocaleString()}
                </div>
                <div className="text-xs font-medium text-ink-3">
                  Across all sections & routes
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 bg-google-blue-soft rounded-full flex items-center justify-center text-google-blue">
                  <Eye className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white border border-line-soft rounded-[16px] p-5 shadow-sm relative overflow-hidden">
                <div className="text-[11px] font-extrabold uppercase tracking-widest text-ink-4 mb-2">
                  Unique Visitors
                </div>
                <div className="text-3xl font-black text-ink mb-1">
                  {data.uniqueVisitors.toLocaleString()}
                </div>
                <div className="text-xs font-medium text-ink-3">
                  Distinct visitor fingerprints
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 bg-google-green-soft rounded-full flex items-center justify-center text-google-green">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white border border-line-soft rounded-[16px] p-5 shadow-sm relative overflow-hidden">
                <div className="text-[11px] font-extrabold uppercase tracking-widest text-ink-4 mb-2">
                  Total Conversions
                </div>
                <div className="text-3xl font-black text-ink mb-1">
                  {data.conversions.totalConversions.toLocaleString()}
                </div>
                <div className="text-xs font-medium text-ink-3">
                  {data.conversions.conversionRate}% visitor conversion
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 bg-google-red-soft rounded-full flex items-center justify-center text-google-red">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Traffic Trend & Top Pages */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 14-Day Daily Traffic Trend */}
              <div className="lg:col-span-2 bg-white border border-line-soft rounded-[20px] p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-base font-extrabold text-ink flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-google-blue" />
                      14-Day Traffic Trend
                    </h3>
                    <p className="text-xs text-ink-4 mt-0.5">
                      Daily pageviews and unique visitors
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-ink-3">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-google-blue" />
                      Pageviews
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-google-green" />
                      Unique
                    </span>
                  </div>
                </div>

                {data.dailyTrend.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center py-16 text-sm text-ink-4">
                    No traffic records in the last 14 days yet.
                  </div>
                ) : (
                  <div className="flex items-end gap-2 h-56 pt-6 overflow-x-auto">
                    {data.dailyTrend.map((day) => {
                      const viewHeight = Math.max(
                        Math.round((day.pageviews / maxDailyViews) * 100),
                        4
                      );
                      const visitorHeight = Math.max(
                        Math.round((day.visitors / maxDailyViews) * 100),
                        4
                      );
                      const shortDate = day.date.slice(5);

                      return (
                        <div
                          key={day.date}
                          className="flex-1 min-w-[36px] h-full flex flex-col items-center justify-end group"
                          title={`${day.date}: ${day.pageviews} views, ${day.visitors} unique`}
                        >
                          <div className="text-[10px] font-bold text-ink-3 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {day.pageviews}
                          </div>
                          <div className="w-full flex items-end justify-center gap-1 h-40">
                            <div
                              className="w-3 bg-google-blue rounded-t-md transition-all duration-300 group-hover:bg-google-blue-dark"
                              style={{ height: `${viewHeight}%` }}
                            />
                            <div
                              className="w-3 bg-google-green/85 rounded-t-md transition-all duration-300"
                              style={{ height: `${visitorHeight}%` }}
                            />
                          </div>
                          <div className="text-[10px] font-semibold text-ink-4 mt-2">
                            {shortDate}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Engagement Funnel */}
              <div className="bg-white border border-line-soft rounded-[20px] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-ink flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-google-yellow-dark" />
                    Engagement Funnel
                  </h3>
                  <p className="text-xs text-ink-4 mb-5">
                    Visitor actions & submissions
                  </p>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-line-soft/60">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-google-blue-soft text-google-blue flex items-center justify-center">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-ink">Contact Inquiries</div>
                          <div className="text-[11px] text-ink-4">Direct messages</div>
                        </div>
                      </div>
                      <div className="text-lg font-black text-ink">
                        {data.conversions.inquiries}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-line-soft/60">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-google-green-soft text-google-green flex items-center justify-center">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-ink">Feedback Reviews</div>
                          <div className="text-[11px] text-ink-4">
                            Avg {data.conversions.avgFeedbackRating} / 10
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-black text-ink">
                        {data.conversions.feedbacks}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-line-soft/60">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-google-yellow-soft text-google-yellow-dark flex items-center justify-center">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-ink">Form Submissions</div>
                          <div className="text-[11px] text-ink-4">
                            Across {data.conversions.forms} active forms
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-black text-ink">
                        {data.conversions.formResponses}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-line-soft flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink-3">Overall Conversion Rate</span>
                  <span className="px-2.5 py-1 rounded-full bg-google-blue-soft text-google-blue-dark font-extrabold">
                    {data.conversions.conversionRate}%
                  </span>
                </div>
              </div>
            </div>

            {/* Top Pages & Device Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Visited Pages */}
              <div className="bg-white border border-line-soft rounded-[20px] p-6 shadow-sm">
                <h3 className="text-base font-extrabold text-ink flex items-center gap-2 mb-4">
                  <Globe className="w-4 h-4 text-google-blue" />
                  Top Visited Routes
                </h3>
                {data.topPages.length === 0 ? (
                  <p className="text-sm text-ink-4 py-6 text-center">
                    No route views recorded yet.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-line-soft text-[11px] font-extrabold uppercase tracking-wider text-ink-4">
                          <th className="py-2.5 pr-4">Route</th>
                          <th className="py-2.5 px-3 text-right">Views</th>
                          <th className="py-2.5 pl-3 text-right">Unique</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line-soft text-sm">
                        {data.topPages.map((page) => (
                          <tr key={page.page_path} className="hover:bg-line-soft/40">
                            <td className="py-3 pr-4 font-semibold text-ink truncate max-w-[240px]">
                              {page.page_path}
                            </td>
                            <td className="py-3 px-3 text-right font-bold text-ink">
                              {page.views.toLocaleString()}
                            </td>
                            <td className="py-3 pl-3 text-right font-medium text-ink-3">
                              {page.unique_visitors.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Device Summary */}
              <div className="bg-white border border-line-soft rounded-[20px] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-ink mb-4">
                    Device Distribution
                  </h3>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      {
                        label: "Desktop",
                        count: data.devices.Desktop || 0,
                        icon: Laptop,
                        bg: "bg-google-blue-soft text-google-blue",
                      },
                      {
                        label: "Mobile",
                        count: data.devices.Mobile || 0,
                        icon: Smartphone,
                        bg: "bg-google-green-soft text-google-green",
                      },
                      {
                        label: "Tablet",
                        count: data.devices.Tablet || 0,
                        icon: Tablet,
                        bg: "bg-google-yellow-soft text-google-yellow-dark",
                      },
                    ].map((item) => {
                      const pct =
                        deviceTotal > 0 ? Math.round((item.count / deviceTotal) * 100) : 0;
                      return (
                        <div
                          key={item.label}
                          className="p-4 rounded-2xl border border-line-soft flex flex-col items-center text-center"
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${item.bg}`}
                          >
                            <item.icon className="w-5 h-5" />
                          </div>
                          <div className="text-xs font-bold text-ink-4">{item.label}</div>
                          <div className="text-xl font-black text-ink mt-0.5">{pct}%</div>
                          <div className="text-[11px] text-ink-4">
                            {item.count.toLocaleString()} views
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <BreakdownList
                    title="Top Browsers"
                    data={data.browsers}
                    barColor="bg-google-blue"
                  />
                  <BreakdownList
                    title="Operating Systems"
                    data={data.operatingSystems}
                    barColor="bg-google-green"
                  />
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
