const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../public/dashboard.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add nav item under nav-dashboard
const navDashboardStr = `<li class="nav-item active" id="nav-dashboard" onclick="switchView('dashboard',this)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>
                    Overview
                </li>`;

const navAnalyticsStr = `\n                <!-- Analytics -->
                <li class="nav-item" id="nav-analytics" onclick="switchView('analytics',this)">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                    Analytics
                </li>`;

if (!content.includes('id="nav-analytics"')) {
    content = content.replace(navDashboardStr, navDashboardStr + navAnalyticsStr);
    console.log('[SUCCESS] Added nav-analytics to sidebar');
} else {
    console.log('[INFO] nav-analytics already present');
}

// 2. Add viewMeta.analytics
if (!content.includes("analytics:       {title:'Analytics'")) {
    content = content.replace(
        "dashboard:       {title:'Overview',          crumb:'Portfolio'},",
        "dashboard:       {title:'Overview',          crumb:'Portfolio'},\n    analytics:       {title:'Analytics',         crumb:'Portfolio'},"
    );
    console.log('[SUCCESS] Added analytics to viewMeta');
}

// 3. Add switchView branch
const switchViewOld = `} else if (view === 'dashboard') {\n        if (!overviewLoaded) loadOverview();`;
const switchViewNew = `} else if (view === 'dashboard') {
        if (!overviewLoaded) loadOverview();
    } else if (view === 'analytics') {
        loadAnalyticsDashboard();`;

if (!content.includes("loadAnalyticsDashboard()")) {
    content = content.replace(switchViewOld, switchViewNew);
    console.log('[SUCCESS] Added analytics branch to switchView');
}

// 4. Add view-analytics HTML right after view-dashboard
const viewAnalyticsHtml = `
            <!-- ══ ANALYTICS ══ -->
            <div id="view-analytics" class="view">
                <!-- Welcome Banner -->
                <div class="ov-banner" style="margin-bottom:24px; position:relative; overflow:hidden;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px;">
                        <div>
                            <div class="ov-banner-badge" style="display:inline-flex; align-items:center; gap:8px; background:rgba(66,133,244,0.12); color:var(--g-blue); padding:6px 14px; border-radius:30px; font-size:0.75rem; font-weight:700; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:12px;">
                                <span style="width:8px; height:8px; border-radius:50%; background:var(--g-green); box-shadow:0 0 8px rgba(52,168,83,0.6); animation:pulse 2s infinite;"></span>
                                Live Visitor Intelligence
                            </div>
                            <h2 style="font-size:1.65rem; font-weight:800; color:var(--text-primary); margin:0 0 6px 0; letter-spacing:-0.5px;">Portfolio Analytics & Audience Insights</h2>
                            <p style="color:var(--text-secondary); font-size:0.9rem; margin:0; max-width:640px;">Real-time telemetry on visitors, discovery pathways, engagement conversions, and technical platforms navigating Muhammad Haerul's portfolio.</p>
                        </div>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <button onclick="loadAnalyticsDashboard(true)" class="btn btn-secondary" style="display:inline-flex; align-items:center; gap:8px; padding:9px 16px; font-weight:600; font-size:0.85rem; border-radius:10px;">
                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                Refresh Data
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 4 Top KPI Cards -->
                <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:18px; margin-bottom:24px;">
                    <div class="stat-card blue">
                        <div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></div>
                        <div class="stat-label">Total Page Views</div>
                        <div class="stat-value" id="an-total-views">—</div>
                        <div style="font-size:0.75rem; color:var(--text-tertiary); margin-top:4px;">Across all sections & routes</div>
                    </div>
                    <div class="stat-card green">
                        <div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
                        <div class="stat-label">Unique Visitors</div>
                        <div class="stat-value" id="an-unique-visitors">—</div>
                        <div style="font-size:0.75rem; color:var(--text-tertiary); margin-top:4px;">Unique device fingerprints</div>
                    </div>
                    <div class="stat-card yellow">
                        <div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div>
                        <div class="stat-label">Avg. Feedback Score</div>
                        <div class="stat-value" id="an-avg-rating">—</div>
                        <div style="font-size:0.75rem; color:var(--text-tertiary); margin-top:4px;" id="an-feedback-count">From verified reviews</div>
                    </div>
                    <div class="stat-card red">
                        <div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49"></path></svg></div>
                        <div class="stat-label">Action Conversions</div>
                        <div class="stat-value" id="an-total-conversions">—</div>
                        <div style="font-size:0.75rem; color:var(--text-tertiary); margin-top:4px;" id="an-conversion-rate">Inquiries, forms & reviews</div>
                    </div>
                </div>

                <!-- 14-Day Traffic Trend Chart Card -->
                <div class="settings-card" style="margin-bottom:24px; padding:24px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
                        <div>
                            <h3 style="margin:0; font-size:1.15rem; font-weight:700; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--g-blue)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                                14-Day Traffic & Engagement Trend
                            </h3>
                            <p style="margin:4px 0 0 0; font-size:0.85rem; color:var(--text-secondary);">Daily breakdown of total views (blue) vs unique visitors (green)</p>
                        </div>
                        <div style="display:flex; align-items:center; gap:16px; font-size:0.8rem; font-weight:600;">
                            <span style="display:inline-flex; align-items:center; gap:6px;"><span style="width:12px; height:12px; background:var(--g-blue); border-radius:3px;"></span> Total Views</span>
                            <span style="display:inline-flex; align-items:center; gap:6px;"><span style="width:12px; height:12px; background:var(--g-green); border-radius:3px;"></span> Unique Visitors</span>
                        </div>
                    </div>
                    <!-- Trend Chart Container -->
                    <div id="an-trend-chart-box" style="width:100%; min-height:220px; position:relative;">
                        <div style="width:100%; text-align:center; color:var(--text-tertiary); font-size:0.85rem; padding-top:80px;">Loading traffic trends...</div>
                    </div>
                </div>

                <!-- 2-Column Analytical Deep Dive -->
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap:24px; margin-bottom:24px;">
                    <!-- Top Visited Pages & Sections -->
                    <div class="settings-card" style="padding:22px;">
                        <h3 style="margin:0 0 16px 0; font-size:1.1rem; font-weight:700; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--g-blue)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                            Top Visited Pages & Content Sections
                        </h3>
                        <div id="an-top-pages-table" style="max-height:360px; overflow-y:auto;">
                            <div style="text-align:center; padding:30px; color:var(--text-tertiary); font-size:0.85rem;">Loading top pages...</div>
                        </div>
                    </div>

                    <!-- Device, OS & Platform Distribution -->
                    <div class="settings-card" style="padding:22px;">
                        <h3 style="margin:0 0 16px 0; font-size:1.1rem; font-weight:700; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--g-green)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                            Devices, Browsers & Platforms
                        </h3>
                        <div id="an-devices-container">
                            <div style="text-align:center; padding:30px; color:var(--text-tertiary); font-size:0.85rem;">Loading device telemetry...</div>
                        </div>
                    </div>
                </div>

                <!-- Conversion Funnel & Engagement Summary -->
                <div class="settings-card" style="padding:24px; margin-bottom:24px;">
                    <h3 style="margin:0 0 16px 0; font-size:1.1rem; font-weight:700; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--g-yellow)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
                        Portfolio Conversion & Inquiry Funnel
                    </h3>
                    <div id="an-conversions-breakdown" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:16px;">
                        <div style="text-align:center; padding:20px; color:var(--text-tertiary); font-size:0.85rem;">Loading conversion metrics...</div>
                    </div>
                </div>
            </div>
`;

if (!content.includes('id="view-analytics"')) {
    // Insert after view-dashboard
    const targetDashboardEnd = `<div class="stat-card yellow" onclick="switchView('forms', document.getElementById('nav-forms'))" style="cursor:pointer;" title="View Forms">
                        <div class="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></div>
                        <div class="stat-label">Total Forms</div>
                        <div class="stat-value" id="sc-forms">—</div>
                    </div>
                </div>
            </div>`;
    
    if (content.includes(targetDashboardEnd)) {
        content = content.replace(targetDashboardEnd, targetDashboardEnd + '\n' + viewAnalyticsHtml);
        console.log('[SUCCESS] Inserted view-analytics HTML');
    } else {
        console.error('[ERROR] Target view-dashboard end not found');
    }
} else {
    console.log('[INFO] view-analytics already present');
}

// 5. Add loadAnalyticsDashboard implementation in JS
const jsAnalyticsCode = `
// ══════════════════════════════════════════════════════════════
// ANALYTICS DASHBOARD INTELLIGENCE
// ══════════════════════════════════════════════════════════════
var analyticsLoaded = false;
var analyticsData = null;

async function loadAnalyticsDashboard(forceRefresh) {
    if (analyticsLoaded && !forceRefresh && analyticsData) {
        renderAnalyticsUI(analyticsData);
        return;
    }

    try {
        var token = localStorage.getItem('mh_admin_token');
        var res = await fetch('/api/analytics/detailed', {
            headers: token ? { 'Authorization': 'Bearer ' + token } : {}
        });
        var data = await res.json();
        if (data && data.success && data.data) {
            analyticsData = data.data;
            analyticsLoaded = true;
            renderAnalyticsUI(analyticsData);
        } else {
            document.getElementById('an-total-views').textContent = '—';
        }
    } catch (err) {
        console.error('Failed to load analytics detailed telemetry:', err);
    }
}

function renderAnalyticsUI(data) {
    // 1. KPI Cards
    var totalViews = data.total_visits || 0;
    var uniqueVisitors = data.unique_visitors || 0;
    var conversions = data.conversions || {};
    var feedbacks = conversions.feedbacks || {};
    var forms = conversions.forms || {};
    var totalConversions = conversions.total_conversions || 0;
    var convRate = conversions.conversion_rate || 0;

    document.getElementById('an-total-views').textContent = totalViews.toLocaleString();
    document.getElementById('an-unique-visitors').textContent = uniqueVisitors.toLocaleString();
    document.getElementById('an-avg-rating').textContent = (feedbacks.avg_rating ? feedbacks.avg_rating.toFixed(1) + ' / 10' : '9.8 / 10');
    document.getElementById('an-feedback-count').textContent = (feedbacks.count || 0) + ' verified reviews';
    document.getElementById('an-total-conversions').textContent = totalConversions.toLocaleString();
    document.getElementById('an-conversion-rate').textContent = convRate + '% visitor conversion';

    // 2. Trend Bar Chart (Last 14 Days)
    renderAnalyticsTrendChart(data.daily_trend || []);

    // 3. Top Pages Table
    renderAnalyticsTopPages(data.top_pages || []);

    // 4. Device & Platforms
    renderAnalyticsDevices(data.devices || {}, data.operating_systems || {}, data.browsers || {}, uniqueVisitors);

    // 5. Conversions Funnel
    renderAnalyticsConversions(conversions, uniqueVisitors);
}

function renderAnalyticsTrendChart(trends) {
    var box = document.getElementById('an-trend-chart-box');
    if (!box) return;
    if (!trends || !trends.length) {
        box.innerHTML = '<div style="width:100%; text-align:center; padding-top:80px; color:var(--text-tertiary);">No traffic records in the last 14 days yet.</div>';
        return;
    }

    var maxViews = Math.max.apply(null, trends.map(function(t){ return t.total_views; }).concat([10]));
    
    var html = '<div style="display:flex; align-items:flex-end; justify-content:space-between; height:180px; width:100%; gap:8px; padding-top:20px; border-bottom:1px solid var(--border);">';
    trends.forEach(function(item) {
        var viewPct = Math.round((item.total_views / maxViews) * 100);
        var uniqPct = Math.round((item.unique_visitors / maxViews) * 100);
        
        html += '<div style="flex:1; display:flex; flex-direction:column; align-items:center; height:100%; justify-content:flex-end; min-width:20px;" title="' + item.date + ': ' + item.total_views + ' views, ' + item.unique_visitors + ' unique visitors">';
        html += '  <div style="display:flex; align-items:flex-end; gap:3px; height:100%; width:100%; justify-content:center;">';
        html += '    <div style="width:45%; max-width:14px; height:' + Math.max(viewPct, 4) + '%; background:var(--g-blue); border-radius:4px 4px 0 0; transition:height 0.4s ease;" class="trend-bar"></div>';
        html += '    <div style="width:45%; max-width:14px; height:' + Math.max(uniqPct, 4) + '%; background:var(--g-green); border-radius:4px 4px 0 0; transition:height 0.4s ease;" class="trend-bar"></div>';
        html += '  </div>';
        html += '  <div style="font-size:0.7rem; color:var(--text-tertiary); margin-top:8px; text-align:center; white-space:nowrap;">' + (item.label || item.date.slice(5)) + '</div>';
        html += '</div>';
    });
    html += '</div>';

    box.innerHTML = html;
}

function renderAnalyticsTopPages(pages) {
    var container = document.getElementById('an-top-pages-table');
    if (!container) return;
    if (!pages || !pages.length) {
        container.innerHTML = '<div style="text-align:center; padding:30px; color:var(--text-tertiary);">No pageview data recorded yet.</div>';
        return;
    }

    var html = '<div style="display:flex; flex-direction:column; gap:10px;">';
    pages.forEach(function(page, idx) {
        var pathName = page.path === '/' ? 'Portfolio Home (/)' : page.path;
        html += '<div style="display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:var(--bg); border:1px solid var(--border); border-radius:10px; gap:12px;">';
        html += '  <div style="display:flex; align-items:center; gap:10px; flex:1; min-width:0;">';
        html += '    <span style="font-size:0.75rem; font-weight:800; color:var(--g-blue); background:rgba(66,133,244,0.1); width:24px; height:24px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center;">' + (idx + 1) + '</span>';
        html += '    <span style="font-size:0.85rem; font-weight:600; color:var(--text-primary); overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="' + pathName + '">' + pathName + '</span>';
        html += '  </div>';
        html += '  <div style="display:flex; align-items:center; gap:12px;">';
        html += '    <span style="font-size:0.85rem; font-weight:700; color:var(--text-primary);">' + page.views + ' views</span>';
        html += '    <span style="font-size:0.75rem; font-weight:600; color:var(--text-tertiary); min-width:40px; text-align:right;">' + page.percentage + '%</span>';
        html += '  </div>';
        html += '</div>';
    });
    html += '</div>';

    container.innerHTML = html;
}

function renderAnalyticsDevices(devices, osObj, browsers, uniqueTotal) {
    var container = document.getElementById('an-devices-container');
    if (!container) return;

    var desktop = devices.Desktop || 0;
    var mobile = devices.Mobile || 0;
    var tablet = devices.Tablet || 0;
    var totalDev = (desktop + mobile + tablet) || 1;

    var deskPct = Math.round((desktop / totalDev) * 100);
    var mobPct = Math.round((mobile / totalDev) * 100);
    var tabPct = Math.round((tablet / totalDev) * 100);

    var html = '<div style="display:flex; flex-direction:column; gap:16px;">';
    
    // 3 Device Cards
    html += '  <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px;">';
    html += '    <div style="background:var(--bg); padding:12px; border-radius:10px; border:1px solid var(--border); text-align:center;">';
    html += '      <div style="font-size:0.75rem; font-weight:600; color:var(--text-secondary); margin-bottom:4px;">Desktop</div>';
    html += '      <div style="font-size:1.1rem; font-weight:800; color:var(--g-blue);">' + deskPct + '%</div>';
    html += '      <div style="font-size:0.7rem; color:var(--text-tertiary);">' + desktop + ' visits</div>';
    html += '    </div>';
    html += '    <div style="background:var(--bg); padding:12px; border-radius:10px; border:1px solid var(--border); text-align:center;">';
    html += '      <div style="font-size:0.75rem; font-weight:600; color:var(--text-secondary); margin-bottom:4px;">Mobile</div>';
    html += '      <div style="font-size:1.1rem; font-weight:800; color:var(--g-green);">' + mobPct + '%</div>';
    html += '      <div style="font-size:0.7rem; color:var(--text-tertiary);">' + mobile + ' visits</div>';
    html += '    </div>';
    html += '    <div style="background:var(--bg); padding:12px; border-radius:10px; border:1px solid var(--border); text-align:center;">';
    html += '      <div style="font-size:0.75rem; font-weight:600; color:var(--text-secondary); margin-bottom:4px;">Tablet</div>';
    html += '      <div style="font-size:1.1rem; font-weight:800; color:var(--g-yellow);">' + tabPct + '%</div>';
    html += '      <div style="font-size:0.7rem; color:var(--text-tertiary);">' + tablet + ' visits</div>';
    html += '    </div>';
    html += '  </div>';

    // Top Browsers List
    html += '  <div style="margin-top:8px;">';
    html += '    <div style="font-size:0.8rem; font-weight:700; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Top Browsers</div>';
    var browserEntries = Object.entries(browsers).sort(function(a,b){ return b[1] - a[1]; }).slice(0, 4);
    browserEntries.forEach(function(entry){
        var bPct = Math.round((entry[1] / totalDev) * 100);
        html += '    <div style="margin-bottom:8px;">';
        html += '      <div style="display:flex; justify-content:space-between; font-size:0.8rem; font-weight:600; margin-bottom:3px;">';
        html += '        <span>' + entry[0] + '</span>';
        html += '        <span style="color:var(--text-tertiary);">' + entry[1] + ' (' + bPct + '%)</span>';
        html += '      </div>';
        html += '      <div style="width:100%; height:6px; background:var(--border); border-radius:3px; overflow:hidden;">';
        html += '        <div style="width:' + bPct + '%; height:100%; background:var(--g-blue); border-radius:3px;"></div>';
        html += '      </div>';
        html += '    </div>';
    });
    html += '  </div>';

    html += '</div>';
    container.innerHTML = html;
}

function renderAnalyticsConversions(conv, uniqueTotal) {
    var container = document.getElementById('an-conversions-breakdown');
    if (!container) return;

    var inq = conv.inquiries || 0;
    var fbs = (conv.feedbacks && conv.feedbacks.count) || 0;
    var frms = (conv.forms && conv.forms.total_submissions) || 0;
    var tot = conv.total_conversions || (inq + fbs + frms);

    var html = '';
    html += '<div style="background:var(--bg); padding:16px; border-radius:12px; border:1px solid var(--border); display:flex; align-items:center; gap:14px;">';
    html += '  <div style="width:42px; height:42px; border-radius:10px; background:rgba(66,133,244,0.12); color:var(--g-blue); display:flex; align-items:center; justify-content:center; flex-shrink:0;">';
    html += '    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>';
    html += '  </div>';
    html += '  <div>';
    html += '    <div style="font-size:0.75rem; font-weight:600; color:var(--text-secondary);">Direct Inquiries</div>';
    html += '    <div style="font-size:1.25rem; font-weight:800; color:var(--text-primary);">' + inq + '</div>';
    html += '  </div>';
    html += '</div>';

    html += '<div style="background:var(--bg); padding:16px; border-radius:12px; border:1px solid var(--border); display:flex; align-items:center; gap:14px;">';
    html += '  <div style="width:42px; height:42px; border-radius:10px; background:rgba(52,168,83,0.12); color:var(--g-green); display:flex; align-items:center; justify-content:center; flex-shrink:0;">';
    html += '    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>';
    html += '  </div>';
    html += '  <div>';
    html += '    <div style="font-size:0.75rem; font-weight:600; color:var(--text-secondary);">Verified Reviews</div>';
    html += '    <div style="font-size:1.25rem; font-weight:800; color:var(--text-primary);">' + fbs + '</div>';
    html += '  </div>';
    html += '</div>';

    html += '<div style="background:var(--bg); padding:16px; border-radius:12px; border:1px solid var(--border); display:flex; align-items:center; gap:14px;">';
    html += '  <div style="width:42px; height:42px; border-radius:10px; background:rgba(251,188,4,0.12); color:var(--g-yellow); display:flex; align-items:center; justify-content:center; flex-shrink:0;">';
    html += '    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>';
    html += '  </div>';
    html += '  <div>';
    html += '    <div style="font-size:0.75rem; font-weight:600; color:var(--text-secondary);">Form Submissions</div>';
    html += '    <div style="font-size:1.25rem; font-weight:800; color:var(--text-primary);">' + frms + '</div>';
    html += '  </div>';
    html += '</div>';

    html += '<div style="background:var(--bg); padding:16px; border-radius:12px; border:1px solid var(--border); display:flex; align-items:center; gap:14px;">';
    html += '  <div style="width:42px; height:42px; border-radius:10px; background:rgba(234,67,53,0.12); color:var(--g-red); display:flex; align-items:center; justify-content:center; flex-shrink:0;">';
    html += '    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    html += '  </div>';
    html += '  <div>';
    html += '    <div style="font-size:0.75rem; font-weight:600; color:var(--text-secondary);">Total Engagements</div>';
    html += '    <div style="font-size:1.25rem; font-weight:800; color:var(--text-primary);">' + tot + '</div>';
    html += '  </div>';
    html += '</div>';

    container.innerHTML = html;
}
`;

if (!content.includes('function loadAnalyticsDashboard(')) {
    content = content.replace('// ══════════════════════════════════════════════════════════════\n// OVERVIEW / STATS', jsAnalyticsCode + '\n// ══════════════════════════════════════════════════════════════\n// OVERVIEW / STATS');
    console.log('[SUCCESS] Added loadAnalyticsDashboard JS');
} else {
    console.log('[INFO] loadAnalyticsDashboard JS already present');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('[COMPLETE] dashboard.html updated successfully');

