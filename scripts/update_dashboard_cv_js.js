const fs = require('fs');
const path = require('path');

const dashPath = path.join(__dirname, '..', 'public', 'dashboard.html');
let content = fs.readFileSync(dashPath, 'utf8');

// Replace the CV Preset block in JS with Single Agile CV System
const oldJsStart = `// ════ Version / Preset Management ════`;
const oldJsEnd = `// Sync Contact Header from Database Site Settings`;

const startIdx = content.indexOf(oldJsStart);
const endIdx = content.indexOf(oldJsEnd);

if (startIdx !== -1 && endIdx !== -1) {
    const newCvJs = `// ════ Single Agile CV Configuration System ════
const CV_CONFIG_KEY = 'mh_cv_active_config';

function getDefaultCvConfig() {
    return {
        template: 'modern',
        header: {
            name: 'Muhammad Haerul, S.Kom',
            title: 'AI Full-Stack Engineer | AI Trainer',
            email: 'haerulmuhammad01@gmail.com',
            location: 'Makassar, Indonesia',
            linkedin: 'linkedin.com/in/muhammadhaerul',
            github: 'github.com/muhammadhaerul25',
            website: 'https://muhammadhaerul.tech',
            summary: 'AI Full-Stack Engineer and Technical Trainer with 4+ years of experience architecting end-to-end intelligent systems, agentic AI workflows, and high-performance web applications. Proven track record in industry AI deployment, enterprise APIs, and empowering hundreds of engineers through hands-on technical training.'
        },
        sections: JSON.parse(JSON.stringify(_cvDefaultSections)),
        checked: null // null selects all available items
    };
}

function loadSavedCvConfig() {
    try {
        var raw = localStorage.getItem(CV_CONFIG_KEY);
        if (raw) {
            var parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object') return parsed;
        }
    } catch(e) {}
    var def = getDefaultCvConfig();
    try { localStorage.setItem(CV_CONFIG_KEY, JSON.stringify(def)); } catch(e) {}
    return def;
}

function applyLoadedCvConfig(cfg) {
    if (!cfg) cfg = getDefaultCvConfig();

    if (cfg.header) {
        if (document.getElementById('cv-cfg-name')) document.getElementById('cv-cfg-name').value = cfg.header.name || '';
        if (document.getElementById('cv-cfg-title')) document.getElementById('cv-cfg-title').value = cfg.header.title || '';
        if (document.getElementById('cv-cfg-email')) document.getElementById('cv-cfg-email').value = cfg.header.email || '';
        if (document.getElementById('cv-cfg-location')) document.getElementById('cv-cfg-location').value = cfg.header.location || '';
        if (document.getElementById('cv-cfg-linkedin')) document.getElementById('cv-cfg-linkedin').value = cfg.header.linkedin || '';
        if (document.getElementById('cv-cfg-github')) document.getElementById('cv-cfg-github').value = cfg.header.github || '';
        if (document.getElementById('cv-cfg-website')) document.getElementById('cv-cfg-website').value = cfg.header.website || '';
        if (document.getElementById('cv-cfg-summary')) document.getElementById('cv-cfg-summary').value = cfg.header.summary || '';
    }

    if (cfg.template) {
        setCvTemplate(cfg.template);
    }

    if (Array.isArray(cfg.sections) && cfg.sections.length) {
        var currentIds = cfg.sections.map(function(s) { return s.id; });
        _cvSections = cfg.sections.slice();
        _cvDefaultSections.forEach(function(ds) {
            if (!currentIds.includes(ds.id)) {
                _cvSections.push(JSON.parse(JSON.stringify(ds)));
            }
        });
    } else {
        _cvSections = JSON.parse(JSON.stringify(_cvDefaultSections));
    }
    renderCvSectionOrderList();

    if (cfg.checked) {
        applyCheckedMap('.cv-exp-check', cfg.checked.experiences);
        applyCheckedMap('.cv-edu-check', cfg.checked.education);
        applyCheckedMap('.cv-proj-check', cfg.checked.projects);
        applyCheckedMap('.cv-skill-check', cfg.checked.skills);
        applyCheckedMap('.cv-cert-check', cfg.checked.certifications);
        applyCheckedMap('.cv-award-check', cfg.checked.awards);
        applyCheckedMap('.cv-pub-check', cfg.checked.publications);
        applyCheckedMap('.cv-talk-check', cfg.checked.talks);
    }
    renderCvAtsPreview();
}

function applyCheckedMap(selector, ids) {
    if (!Array.isArray(ids)) return;
    document.querySelectorAll(selector).forEach(function(cb) {
        var id = cb.getAttribute('data-id');
        cb.checked = ids.includes(id);
    });
}

function getActiveCheckedIds(selector) {
    return Array.from(document.querySelectorAll(selector + ':checked')).map(function(cb) { return cb.getAttribute('data-id'); });
}

function saveCvSingleConfig(showFeedback) {
    var header = {
        name: (document.getElementById('cv-cfg-name')?.value || '').trim(),
        title: (document.getElementById('cv-cfg-title')?.value || '').trim(),
        email: (document.getElementById('cv-cfg-email')?.value || '').trim(),
        location: (document.getElementById('cv-cfg-location')?.value || '').trim(),
        linkedin: (document.getElementById('cv-cfg-linkedin')?.value || '').trim(),
        github: (document.getElementById('cv-cfg-github')?.value || '').trim(),
        website: (document.getElementById('cv-cfg-website')?.value || '').trim(),
        summary: (document.getElementById('cv-cfg-summary')?.value || '').trim()
    };

    var checked = {
        experiences: getActiveCheckedIds('.cv-exp-check'),
        education: getActiveCheckedIds('.cv-edu-check'),
        projects: getActiveCheckedIds('.cv-proj-check'),
        skills: getActiveCheckedIds('.cv-skill-check'),
        certifications: getActiveCheckedIds('.cv-cert-check'),
        awards: getActiveCheckedIds('.cv-award-check'),
        publications: getActiveCheckedIds('.cv-pub-check'),
        talks: getActiveCheckedIds('.cv-talk-check')
    };

    var cfg = {
        template: _cvCurrentTemplate,
        header: header,
        sections: _cvSections,
        checked: checked
    };

    try {
        localStorage.setItem(CV_CONFIG_KEY, JSON.stringify(cfg));
        if (showFeedback) {
            showToast('Agile CV saved successfully!', 'success');
        }
    } catch(e) {
        if (showFeedback) showToast('Failed to save CV settings', 'error');
    }
}

function resetCvToDefaults() {
    showConfirm({
        title: 'Reset CV Workspace?',
        message: 'This will reset your ATS CV layout, section order, and selection to the default configuration.',
        confirmText: 'Reset to Defaults',
        confirmType: 'primary',
        onConfirm: function() {
            var def = getDefaultCvConfig();
            try { localStorage.setItem(CV_CONFIG_KEY, JSON.stringify(def)); } catch(e) {}
            applyLoadedCvConfig(def);
            toggleAllGlobalCvCheckboxes(true);
            showToast('CV workspace reset to defaults!', 'info');
        }
    });
}

function toggleSectionCheckboxes(cls, check) {
    document.querySelectorAll('.' + cls).forEach(function(cb) {
        cb.checked = Boolean(check);
    });
    renderCvAtsPreview();
    saveCvSingleConfig(false);
}

function toggleAllGlobalCvCheckboxes(check) {
    var classes = ['cv-exp-check', 'cv-edu-check', 'cv-proj-check', 'cv-skill-check', 'cv-cert-check', 'cv-award-check', 'cv-pub-check', 'cv-talk-check'];
    classes.forEach(function(cls) {
        document.querySelectorAll('.' + cls).forEach(function(cb) {
            cb.checked = Boolean(check);
        });
    });
    renderCvAtsPreview();
    saveCvSingleConfig(false);
    showToast(check ? 'All items selected' : 'All items cleared', 'info');
}

function onCvInputChange() {
    renderCvAtsPreview();
    saveCvSingleConfig(false);
}

`;

    content = content.slice(0, startIdx) + newCvJs + content.slice(endIdx);
    console.log('Replaced CV JS with Single Agile CV system');
} else {
    console.error('Could not find JS start or end indices');
}

// Also update moveCvSection, toggleCvSectionActive, resetCvSectionOrder to call saveCvSingleConfig(false)
content = content.replace(/saveActiveCvVersion\(false\);/g, 'saveCvSingleConfig(false);');
content = content.replace(/saveActiveCvVersion\(true\);/g, 'saveCvSingleConfig(true);');
content = content.replace(/toggleAllCvCheckboxes\(([^)]+)\)/g, 'toggleSectionCheckboxes($1)');

// Update initCvMakerView to load agile single config
content = content.replace(/initCvVersionsDropdown\(\);/g, 'var savedCvCfg = loadSavedCvConfig(); applyLoadedCvConfig(savedCvCfg);');

fs.writeFileSync(dashPath, content, 'utf8');
console.log('Finished updating dashboard.html');

