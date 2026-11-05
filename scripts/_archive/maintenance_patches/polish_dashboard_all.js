const fs = require('fs');
const path = require('path');

const dashboardPath = path.join(__dirname, '../../public/dashboard.html');
let html = fs.readFileSync(dashboardPath, 'utf8');

console.log('Original dashboard length:', html.length);

// 1. Add extra dark theme rules for .modal, .card, auth, form builder, indiv nav, etc.
const extraDarkCSS = `
    /* ════ Comprehensive Dark Theme Polishing: Modals, Cards, Lists, Form Builder & Auth ════ */
    [data-theme="dark"] .modal {
        background: #141C2E !important;
        color: #F8FAFC !important;
        border: 1px solid rgba(255, 255, 255, 0.1) !important;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.65) !important;
    }
    [data-theme="dark"] .card {
        background: #141C2E !important;
        border-color: rgba(255, 255, 255, 0.08) !important;
        color: #F8FAFC !important;
    }
    [data-theme="dark"] .indiv-nav {
        background: #101726 !important;
        border-color: rgba(255, 255, 255, 0.08) !important;
    }
    [data-theme="dark"] .indiv-btn,
    [data-theme="dark"] .indiv-select {
        background: #141C2E !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
        color: #F8FAFC !important;
    }
    [data-theme="dark"] .indiv-btn:hover:not(:disabled) {
        border-color: #3B82F6 !important;
        color: #93C5FD !important;
    }
    [data-theme="dark"] .fb-share {
        background: #101726 !important;
        border-color: rgba(255, 255, 255, 0.08) !important;
    }
    [data-theme="dark"] .fb-field-row {
        background: #101726 !important;
        border-color: rgba(255, 255, 255, 0.08) !important;
        color: #F8FAFC !important;
    }
    [data-theme="dark"] .fb-field-row:hover {
        background: #141C2E !important;
        border-color: #3B82F6 !important;
    }
    [data-theme="dark"] .btn-talk.view,
    [data-theme="dark"] .btn-talk.clone {
        background: #101726 !important;
        color: #E2E8F0 !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
    }
    [data-theme="dark"] .btn-talk.del {
        background: #101726 !important;
        color: #94A3B8 !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
    }
    [data-theme="dark"] .btn-project-preview {
        background: #101726 !important;
        color: #E2E8F0 !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
    }
    [data-theme="dark"] .resp-drawer-ans-item {
        background: #101726 !important;
        border-color: rgba(255, 255, 255, 0.08) !important;
        color: #F8FAFC !important;
    }
    [data-theme="dark"] .admin-row {
        background: #141C2E !important;
        border-color: rgba(255, 255, 255, 0.08) !important;
        color: #F8FAFC !important;
    }
    [data-theme="dark"] .admin-row.primary {
        background: rgba(66, 133, 244, 0.12) !important;
        border-color: rgba(66, 133, 244, 0.3) !important;
    }
    [data-theme="dark"] .admin-user-pill {
        background: #141C2E !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
    }
    [data-theme="dark"] .auth-gate-card {
        background: #141C2E !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
        color: #F8FAFC !important;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7) !important;
    }
    [data-theme="dark"] .auth-title {
        color: #F8FAFC !important;
    }
    [data-theme="dark"] .auth-subtitle {
        color: #94A3B8 !important;
    }
    [data-theme="dark"] .auth-security-notice {
        background: rgba(66, 133, 244, 0.1) !important;
        border-color: rgba(66, 133, 244, 0.25) !important;
        color: #CBD5E1 !important;
    }
    [data-theme="dark"] .auth-notice-title {
        color: #93C5FD !important;
    }
    [data-theme="dark"] .auth-input-label {
        color: #CBD5E1 !important;
    }
    [data-theme="dark"] .auth-hint {
        color: #94A3B8 !important;
    }
    [data-theme="dark"] .auth-hint code {
        background: rgba(66, 133, 244, 0.2) !important;
        color: #93C5FD !important;
    }
    [data-theme="dark"] .auth-google-note {
        color: #94A3B8 !important;
    }
    [data-theme="dark"] .btn-google-signin {
        background: #101726 !important;
        border-color: rgba(255, 255, 255, 0.18) !important;
        color: #F8FAFC !important;
    }
    [data-theme="dark"] .btn-google-signin:hover {
        background: #1E293B !important;
        border-color: #3B82F6 !important;
    }
    [data-theme="dark"] .btn-cancel-auth {
        border-color: rgba(255, 255, 255, 0.2) !important;
        color: #CBD5E1 !important;
    }
    [data-theme="dark"] .auth-loading-spinner {
        background: #101726 !important;
        color: #CBD5E1 !important;
    }
    [data-theme="dark"] .skill-live-preview-box {
        background: rgba(66, 133, 244, 0.08) !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
    }
    [data-theme="dark"] .skill-icon-btn {
        background: #101726 !important;
        border-color: rgba(255, 255, 255, 0.1) !important;
        color: #CBD5E1 !important;
    }
    [data-theme="dark"] .skill-icon-btn:hover,
    [data-theme="dark"] .skill-icon-btn.selected {
        background: rgba(66, 133, 244, 0.2) !important;
        border-color: #3B82F6 !important;
        color: #93C5FD !important;
    }
    [data-theme="dark"] .security-modal-tabs {
        background: #141C2E !important;
        border-bottom-color: rgba(255, 255, 255, 0.08) !important;
    }
    [data-theme="dark"] .security-tab-btn {
        color: #94A3B8 !important;
    }
    [data-theme="dark"] .security-tab-btn:hover {
        color: #F8FAFC !important;
    }
    [data-theme="dark"] .security-tab-btn.active {
        color: #60A5FA !important;
        border-bottom-color: #60A5FA !important;
    }`;

// Inject before </style> or inside comprehensive dark theme rules
if (!html.includes('[data-theme="dark"] .indiv-nav')) {
  const insertMarker = '[data-theme="dark"] ::-webkit-scrollbar-thumb:hover {';
  const insertPos = html.indexOf(insertMarker);
  if (insertPos !== -1) {
    const endBlockPos = html.indexOf('}', insertPos) + 1;
    html = html.slice(0, endBlockPos) + '\n' + extraDarkCSS + html.slice(endBlockPos);
    console.log('[OK] Injected extra dark theme rules into stylesheet');
  }
}

// 2. Fix specific inline styles in drawers
html = html.replace(
  'color:#475569; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:6px; display:flex; align-items:center; gap:6px;',
  'color:var(--ink-3); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:6px; display:flex; align-items:center; gap:6px;'
);
html = html.replace(
  'color:#475569; text-transform:uppercase; letter-spacing:0.04em; margin-bottom:6px; display:flex; align-items:center; gap:6px;',
  'color:var(--ink-3); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:6px; display:flex; align-items:center; gap:6px;'
);
html = html.replace(
  'color:#334155; font-weight:600; user-select:none;',
  'color:var(--ink-2); font-weight:600; user-select:none;'
);
html = html.replace(
  'font-size:0.84rem; font-weight:600; color:#334155; cursor:pointer;',
  'font-size:0.84rem; font-weight:600; color:var(--ink); cursor:pointer;'
);
html = html.replace(
  '<span id="dk-gallery-count" style="font-size:0.75rem; font-weight:700; color:#475569; background:#F1F5F9; padding:2px 8px; border-radius:99px;">',
  '<span id="dk-gallery-count" style="font-size:0.75rem; font-weight:700; color:var(--ink-2); background:var(--surface-2); padding:2px 8px; border-radius:99px;">'
);
html = html.replace(
  '<div id="cert-img-preview-box" style="margin-top:10px; display:none; background:#f8fafc; padding:8px; border-radius:10px; border:1.5px solid #E2E8F0; text-align:center;">',
  '<div id="cert-img-preview-box" style="margin-top:10px; display:none; background:var(--surface-2); padding:8px; border-radius:10px; border:1.5px solid var(--line); text-align:center;">'
);
html = html.replace(
  'style="font-size:0.84rem;font-family:monospace;color:#334155;background:#F8FAFC;padding:10px 14px;border-radius:10px;border:1.5px solid #E2E8F0;word-break:break-all;"',
  'style="font-size:0.84rem;font-family:monospace;color:var(--ink-2);background:var(--surface-2);padding:10px 14px;border-radius:10px;border:1.5px solid var(--line);word-break:break-all;"'
);
html = html.replace(
  'id="drawer-fields-section" style="display:none; margin-top:14px; padding-top:16px; border-top:1.5px dashed #CBD5E1;"',
  'id="drawer-fields-section" style="display:none; margin-top:14px; padding-top:16px; border-top:1.5px dashed var(--line);"'
);
html = html.replace(
  'border: 1.5px solid #E2E8F0; max-height: 200px; width: 100%; background: #F8FAFC;',
  'border: 1.5px solid var(--line); max-height: 200px; width: 100%; background: var(--surface-2);'
);

// 3. Fix JS templates with background:#f8f9fa
html = html.replaceAll(
  'background:#f8f9fa;border:1px solid var(--line);border-radius:var(--r-md);',
  'background:var(--surface-2);border:1px solid var(--line);border-radius:var(--r-md);'
);
html = html.replaceAll(
  'background:#f8f9fa;border:1px solid var(--line);box-shadow:0 4px 14px rgba(0,0,0,0.06);margin-bottom:16px;',
  'background:var(--surface-2);border:1px solid var(--line);box-shadow:0 4px 14px rgba(0,0,0,0.06);margin-bottom:16px;'
);
html = html.replaceAll(
  'background:#f8f9fa;border-radius:6px;border:1px dashed var(--line);',
  'background:var(--surface-2);border-radius:6px;border:1px dashed var(--line);'
);
html = html.replaceAll(
  'background:#F8F9FA; color:var(--ink-2); font-size:0.75rem;',
  'background:var(--surface-2); color:var(--ink-2); font-size:0.75rem;'
);

fs.writeFileSync(dashboardPath, html, 'utf8');
console.log('Successfully completed dashboard polish! New length:', html.length);

