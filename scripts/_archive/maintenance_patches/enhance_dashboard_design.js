const fs = require('fs');
const path = require('path');

const dashboardPath = path.join(__dirname, '../../public/dashboard.html');
let html = fs.readFileSync(dashboardPath, 'utf8');

// 1. Ensure CSS variables include --surface-2, --line-strong in :root and [data-theme="dark"]
const oldRootSurface = `--surface:   #FFFFFF;\n        --ink:`;
const newRootSurface = `--surface:   #FFFFFF;\n        --surface-2: #FAFBFD;\n        --surface-hover: #F1F3F4;\n        --line-strong: #CBD5E1;\n        --ink:`;

if (html.includes(oldRootSurface)) {
  html = html.replace(oldRootSurface, newRootSurface);
  console.log('[OK] Added --surface-2 and tokens to :root');
}

const oldDarkSurface = `--surface:   #141C2E;\n        --ink:`;
const newDarkSurface = `--surface:   #141C2E;\n        --surface-2: #101726;\n        --surface-hover: rgba(255, 255, 255, 0.08);\n        --line-strong: rgba(255, 255, 255, 0.18);\n        --ink:`;

if (html.includes(oldDarkSurface)) {
  html = html.replace(oldDarkSurface, newDarkSurface);
  console.log('[OK] Added --surface-2 and tokens to [data-theme="dark"]');
}

// 2. Comprehensive dark theme CSS rules
const darkStylesMarker = `    [data-theme="dark"] .modal-card {
        background: #141C2E;
        color: #F8FAFC;
        border-color: rgba(255, 255, 255, 0.1);
    }`;

const comprehensiveDarkStyles = `    [data-theme="dark"] .modal-card {
        background: #141C2E;
        color: #F8FAFC;
        border-color: rgba(255, 255, 255, 0.1);
    }

    /* ════ Comprehensive Dark Theme Polishing Across All Sections ════ */
    [data-theme="dark"] .panel {
        background: #141C2E;
        border-color: rgba(255, 255, 255, 0.08);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
    }
    [data-theme="dark"] .fcard,
    [data-theme="dark"] .talk-card,
    [data-theme="dark"] .form-card,
    [data-theme="dark"] .project-card,
    [data-theme="dark"] .inbox-card,
    [data-theme="dark"] .cv-collapsible-card {
        background: #141C2E !important;
        border-color: rgba(255, 255, 255, 0.08) !important;
        color: #F8FAFC !important;
    }
    [data-theme="dark"] .talk-poster,
    [data-theme="dark"] .project-thumb {
        background: #101726 !important;
    }
    [data-theme="dark"] .drawer {
        background: #141C2E !important;
        color: #F8FAFC !important;
        border-left-color: rgba(255, 255, 255, 0.1) !important;
        box-shadow: -16px 0 60px rgba(0, 0, 0, 0.65), -4px 0 20px rgba(0, 0, 0, 0.4) !important;
    }
    [data-theme="dark"] .drawer-head {
        background: #141C2E !important;
        border-bottom-color: rgba(255, 255, 255, 0.08) !important;
    }
    [data-theme="dark"] .drawer-title {
        color: #F8FAFC !important;
    }
    [data-theme="dark"] .drawer-subtitle {
        color: #94A3B8 !important;
    }
    [data-theme="dark"] .drawer-body {
        background: #0A0E17 !important;
        scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
    }
    [data-theme="dark"] .drawer-body::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2) !important;
    }
    [data-theme="dark"] .drawer-foot {
        background: rgba(20, 28, 46, 0.96) !important;
        border-top-color: rgba(255, 255, 255, 0.08) !important;
    }
    [data-theme="dark"] .drawer-close-btn,
    [data-theme="dark"] .modal-close {
        background: #101726 !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
        color: #94A3B8 !important;
    }
    [data-theme="dark"] .drawer-close-btn:hover,
    [data-theme="dark"] .modal-close:hover {
        background: #1E293B !important;
        color: #F8FAFC !important;
        border-color: rgba(255, 255, 255, 0.25) !important;
    }
    [data-theme="dark"] .drawer-kbd-hint kbd {
        background: #101726 !important;
        border-color: rgba(255, 255, 255, 0.15) !important;
        color: #94A3B8 !important;
    }
    [data-theme="dark"] .field-card {
        background: #141C2E !important;
        border-color: rgba(255, 255, 255, 0.08) !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
    }
    [data-theme="dark"] .field-card:focus-within {
        border-color: rgba(66, 133, 244, 0.45) !important;
    }
    [data-theme="dark"] .field-card-title {
        color: #CBD5E1 !important;
        border-bottom-color: rgba(255, 255, 255, 0.06) !important;
    }
    [data-theme="dark"] .field-label {
        color: #E2E8F0 !important;
    }
    [data-theme="dark"] .field-input,
    [data-theme="dark"] .field-select,
    [data-theme="dark"] textarea.field-input,
    [data-theme="dark"] .fm-input,
    [data-theme="dark"] .fm-textarea {
        background: #0A0E17 !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
        color: #F8FAFC !important;
    }
    [data-theme="dark"] .field-input:focus,
    [data-theme="dark"] .field-select:focus,
    [data-theme="dark"] textarea.field-input:focus,
    [data-theme="dark"] .fm-input:focus,
    [data-theme="dark"] .fm-textarea:focus {
        border-color: #3B82F6 !important;
        background: #101726 !important;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25) !important;
    }
    [data-theme="dark"] .btn-drawer-cancel,
    [data-theme="dark"] .drawer-foot .btn-sm-ghost {
        background: #101726 !important;
        color: #CBD5E1 !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
    }
    [data-theme="dark"] .btn-drawer-cancel:hover,
    [data-theme="dark"] .drawer-foot .btn-sm-ghost:hover {
        background: #1E293B !important;
        color: #F8FAFC !important;
        border-color: rgba(255, 255, 255, 0.25) !important;
    }
    [data-theme="dark"] .slide-row {
        background: #101726 !important;
        border-color: rgba(255, 255, 255, 0.08) !important;
    }
    [data-theme="dark"] .slide-type-btn {
        background: #141C2E !important;
        color: #94A3B8 !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
    }
    [data-theme="dark"] .slide-type-btn.active {
        background: #2563EB !important;
        color: #FFFFFF !important;
    }
    [data-theme="dark"] .slide-label-inp {
        background: #0A0E17 !important;
        color: #F8FAFC !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
    }
    [data-theme="dark"] .tags-input-container {
        background: #0A0E17 !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
    }
    [data-theme="dark"] .tags-input {
        color: #F8FAFC !important;
    }
    [data-theme="dark"] .tag-pill {
        background: rgba(66, 133, 244, 0.2) !important;
        color: #93C5FD !important;
        border-color: rgba(66, 133, 244, 0.35) !important;
    }
    [data-theme="dark"] .cv-sec-order-item {
        background: #141C2E !important;
        border-color: rgba(255, 255, 255, 0.08) !important;
        color: #F8FAFC !important;
    }
    [data-theme="dark"] .cv-sec-order-item:hover {
        border-color: #3B82F6 !important;
        background: #101726 !important;
    }
    [data-theme="dark"] .cv-sec-btn-move {
        background: #101726 !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
        color: #94A3B8 !important;
    }
    [data-theme="dark"] .cv-card-btn-clear {
        background: #101726 !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
        color: #94A3B8 !important;
    }
    [data-theme="dark"] .cv-card-btn-select-all {
        background: rgba(66, 133, 244, 0.2) !important;
        border-color: rgba(66, 133, 244, 0.4) !important;
        color: #93C5FD !important;
    }
    [data-theme="dark"] .btn-cv-tpl:not(.selected) {
        color: #94A3B8 !important;
    }
    [data-theme="dark"] .btn-ghost {
        background: #141C2E;
        color: #E2E8F0;
        border-color: rgba(255, 255, 255, 0.12);
    }
    [data-theme="dark"] .btn-ghost:hover {
        background: rgba(66, 133, 244, 0.15);
        border-color: #3B82F6;
        color: #93C5FD;
    }
    [data-theme="dark"] .btn-filter-hidden {
        background: #141C2E;
        color: #E2E8F0;
        border-color: rgba(255, 255, 255, 0.12);
    }
    [data-theme="dark"] .btn-filter-hidden:hover {
        background: #1E293B;
        border-color: #3B82F6;
        color: #93C5FD;
    }
    [data-theme="dark"] .chip {
        background: #141C2E;
        color: #94A3B8;
        border-color: rgba(255, 255, 255, 0.12);
    }
    [data-theme="dark"] .chip:hover {
        border-color: #3B82F6;
        color: #93C5FD;
    }
    [data-theme="dark"] .chip.active {
        background: rgba(66, 133, 244, 0.18);
        border-color: #3B82F6;
        color: #93C5FD;
    }
    [data-theme="dark"] .ftype-btn {
        background: #141C2E;
        border-color: rgba(255, 255, 255, 0.1);
        color: #94A3B8;
    }
    [data-theme="dark"] .ftype-btn:hover,
    [data-theme="dark"] .ftype-btn.sel {
        background: rgba(66, 133, 244, 0.18);
        border-color: #3B82F6;
        color: #93C5FD;
    }
    [data-theme="dark"] .ftype-name {
        color: #E2E8F0;
    }
    [data-theme="dark"] .ftype-btn.sel .ftype-name,
    [data-theme="dark"] .ftype-btn:hover .ftype-name {
        color: #93C5FD;
    }
    [data-theme="dark"] .hero-stat {
        background: linear-gradient(145deg, #141C2E 0%, #101726 100%);
        border-color: rgba(255, 255, 255, 0.08);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    }
    [data-theme="dark"] .hero-stat-num {
        background: linear-gradient(135deg, #F8FAFC 0%, #60A5FA 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    [data-theme="dark"] ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    [data-theme="dark"] ::-webkit-scrollbar-track {
        background: transparent;
    }
    [data-theme="dark"] ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.16);
        border-radius: 999px;
    }
    [data-theme="dark"] ::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.28);
    }`;

if (html.includes(darkStylesMarker)) {
  html = html.replace(darkStylesMarker, comprehensiveDarkStyles);
  console.log('[OK] Added comprehensive dark theme rules to <style>');
}

// 3. Fix hardcoded inline styles in view-profile
// Replace background:#FAFBFD; with background:var(--surface-2);
html = html.replaceAll('background:#FAFBFD;', 'background:var(--surface-2);');
console.log('[OK] Replaced all background:#FAFBFD; with background:var(--surface-2);');

// 4. Fix view-page-navbar banner
html = html.replace('background:#F8FAFD; border:1px solid #D2E3FC;', 'background:var(--g-blue-soft); border:1px solid rgba(66, 133, 244, 0.25);');
console.log('[OK] Polished navbar banner style');

// 5. Fix view-theme banner border
html = html.replace('border:1.5px solid #D2E3FC;', 'border:1.5px solid rgba(66, 133, 244, 0.25);');
console.log('[OK] Polished theme master card border');

// 6. Fix resp-search input background
html = html.replace('style="padding:8px 12px;font-size:0.84rem;background:#fff;"', 'style="padding:8px 12px;font-size:0.84rem;background:var(--surface);color:var(--ink);border:1.5px solid var(--line);border-radius:var(--r-md);"');
console.log('[OK] Polished resp-search input style');

// 7. Fix logo preview containers in educations, experiences, blogs
html = html.replaceAll('background:#FFFFFF; border:1.5px solid #E2E8F0;', 'background:var(--surface); border:1.5px solid var(--line);');
html = html.replaceAll('background:#F8FAFC; border:1.5px solid #E2E8F0;', 'background:var(--surface-2); border:1.5px solid var(--line);');
html = html.replaceAll('background:#F8FAFC; border:1.5px dashed #CBD5E1;', 'background:var(--surface-2); border:1.5px dashed var(--line);');
html = html.replaceAll('background:#F1F5F9; padding:5px 14px; border-radius:var(--r-pill); border:1px solid #CBD5E1;', 'background:var(--surface-2); padding:5px 14px; border-radius:var(--r-pill); border:1px solid var(--line);');

// 8. Fix JS template literals with background:#fff or #FFFFFF
html = html.replaceAll('background:#fff; border:1px solid var(--line);', 'background:var(--surface); border:1px solid var(--line);');
html = html.replaceAll('background:#ffffff; display:inline-block; box-shadow:0 2px 8px rgba(0,0,0,0.06);', 'background:var(--surface); display:inline-block; box-shadow:0 2px 8px rgba(0,0,0,0.06);');
html = html.replaceAll('background:#FFFFFF; border:1.5px solid var(--sidebar-border);', 'background:var(--surface); border:1.5px solid var(--line);');

fs.writeFileSync(dashboardPath, html, 'utf8');
console.log('Successfully updated dashboard.html!');

