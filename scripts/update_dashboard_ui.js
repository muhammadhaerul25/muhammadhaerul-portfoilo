const fs = require('fs');
const path = require('path');

const dashPath = path.join(__dirname, '..', 'public', 'dashboard.html');
let content = fs.readFileSync(dashPath, 'utf8');

// 1. Add CSS for theme toggle & CV card action buttons before </style>
const cssToInsert = `
/* Dashboard Theme Toggle Button (SVG Icon sync with Homepage) */
#dashboardThemeBtn {
  width: 36px;
  height: 36px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: var(--surface);
  color: var(--ink-2);
  cursor: pointer;
  transition: all .2s ease;
}
#dashboardThemeBtn:hover {
  background: var(--surface-hover);
  border-color: var(--line-strong, #CBD5E1);
  color: var(--ink);
}
#dashboardThemeBtn .icon-sun {
  display: block;
  color: #F59E0B;
}
#dashboardThemeBtn .icon-moon {
  display: none;
  color: #38BDF8;
}
[data-theme="dark"] #dashboardThemeBtn .icon-sun {
  display: none;
}
[data-theme="dark"] #dashboardThemeBtn .icon-moon {
  display: block;
}

/* CV Action Buttons in Card Heads */
.cv-card-btn-action {
  font-family: inherit;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 6px;
  cursor: pointer;
  transition: all .15s ease;
  line-height: 1.3;
}
.cv-card-btn-action:hover {
  filter: brightness(0.95);
  transform: translateY(-1px);
}
.cv-card-btn-select-all {
  color: var(--g-blue);
  background: var(--g-blue-soft);
  border: 1px solid rgba(66, 133, 244, 0.28);
}
.cv-card-btn-clear {
  color: var(--ink-4);
  background: var(--surface);
  border: 1px solid var(--line);
}
`;

if (!content.includes('/* Dashboard Theme Toggle Button (SVG Icon sync with Homepage) */')) {
    content = content.replace('</style>', cssToInsert + '\n</style>');
}

// 2. Replace the dashboardThemeBtn HTML
const oldBtnRegex = /<button type="button" class="btn btn-ghost" id="dashboardThemeBtn"[\s\S]*?<\/button>/;
const newBtnHtml = `<button type="button" class="btn btn-ghost theme-toggle" id="dashboardThemeBtn" onclick="toggleDashboardTheme()" title="Toggle Light / Dark Mode" aria-label="Toggle theme">
                    <svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <circle cx="12" cy="12" r="4.2" />
                        <path d="M12 2.5v2.4M12 19.1v2.4M4.4 4.4l1.7 1.7M17.9 17.9l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.4 19.6l1.7-1.7M17.9 6.1l1.7-1.7" />
                    </svg>
                    <svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
                    </svg>
                </button>`;
content = content.replace(oldBtnRegex, newBtnHtml);

// 3. Replace the CV Preset toolbar with Agile Single CV workspace toolbar
const oldCvToolbarRegex = /<div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">\s*<span style="font-size:0.75rem; font-weight:800; text-transform:uppercase; letter-spacing:0.06em; color:var\(--ink-3\);">Preset:[\s\S]*?<button type="button" class="btn btn-primary" onclick="saveActiveCvVersion\(true\)" style="padding:6px 14px; font-size:0.75rem; font-weight:700;">Save Version<\/button>\s*<\/div>/;

const newCvToolbarHtml = `<div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                                <div style="display:inline-flex; align-items:center; gap:6px; background:var(--g-blue-soft); color:var(--g-blue); padding:5px 12px; border-radius:8px; font-size:0.75rem; font-weight:800; letter-spacing:0.02em;">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                    <span>Agile Single CV</span>
                                </div>
                                <button type="button" class="btn btn-ghost" onclick="toggleAllGlobalCvCheckboxes(true)" style="padding:6px 11px; font-size:0.75rem; font-weight:700; border:1px solid var(--line); border-radius:8px; background:var(--surface);" title="Select all items across all sections">Select All</button>
                                <button type="button" class="btn btn-ghost" onclick="toggleAllGlobalCvCheckboxes(false)" style="padding:6px 11px; font-size:0.75rem; font-weight:700; border:1px solid var(--line); border-radius:8px; background:var(--surface);" title="Clear selection across all sections">Clear All</button>
                                <button type="button" class="btn btn-ghost" onclick="resetCvToDefaults()" style="padding:6px 11px; font-size:0.75rem; font-weight:700; border:1px solid var(--line); border-radius:8px; background:var(--surface);" title="Reset to standard default CV configuration">Reset</button>
                                <button type="button" class="btn btn-primary" onclick="saveCvSingleConfig(true)" style="padding:6px 14px; font-size:0.75rem; font-weight:800; display:inline-flex; align-items:center; gap:6px;">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                                    <span>Save CV</span>
                                </button>
                            </div>`;
content = content.replace(oldCvToolbarRegex, newCvToolbarHtml);

// 4. In all CV Card heads, upgrade the plain Select All text to Select All / Clear action buttons
const cardCheckPairs = [
    { id: 'cv-exp-check', title: 'Work Experience' },
    { id: 'cv-proj-check', title: 'Featured Projects' },
    { id: 'cv-edu-check', title: 'Education' },
    { id: 'cv-skill-check', title: 'Skills &amp; Competencies' },
    { id: 'cv-cert-check', title: 'Licences &amp; Certifications' },
    { id: 'cv-award-check', title: 'Honors &amp; Awards' },
    { id: 'cv-pub-check', title: 'Publications &amp; Articles' },
    { id: 'cv-talk-check', title: 'Keynote Talks &amp; Workshops' }
];

cardCheckPairs.forEach(pair => {
    const oldBtnPattern = new RegExp(`<button type="button" class="btn-sm-ghost" onclick="event\\.stopPropagation\\(\\);\\s*toggleAllCvCheckboxes\\('${pair.id}',\\s*true\\)"[^>]*>Select All<\\/button>`);
    const newBtnGroup = `<div style="display:flex; align-items:center; gap:5px;" onclick="event.stopPropagation();">
                                            <button type="button" class="cv-card-btn-action cv-card-btn-select-all" onclick="toggleSectionCheckboxes('${pair.id}', true)" title="Select all items in this section">Select All</button>
                                            <button type="button" class="cv-card-btn-action cv-card-btn-clear" onclick="toggleSectionCheckboxes('${pair.id}', false)" title="Deselect all items in this section">Clear</button>
                                        </div>`;
    content = content.replace(oldBtnPattern, newBtnGroup);
});

fs.writeFileSync(dashPath, content, 'utf8');
console.log('Successfully updated HTML markup in dashboard.html');

