const prisma = require('../config/db');
const cache = require('../utils/cache');

const DEFAULT_SETTINGS = {
    general: {
        siteTitle: "Muhammad Haerul — AI Full-Stack Specialist (Engineer, Researcher, and Trainer)",
        metaDescription: "Portfolio of Muhammad Haerul — AI Full-Stack Specialist (Engineer, Researcher, and Trainer).",
        faviconUrl: "/favicon.webp",
        brandName: "Muhammad Haerul",
        brandColor: "#0F172A",
        brandSubtitle: "Portfolio"
    },
    navbar: {
        items: [
            { id: "about", label: "About", href: "#about", visible: true },
            { id: "experiences", label: "Experience", href: "#experiences", visible: true },
            { id: "education", label: "Education", href: "#education", visible: true },
            { id: "projects", label: "Projects", href: "#projects", visible: true },
            { id: "talks", label: "Talks", href: "#talks", visible: true },
            { id: "certifications", label: "Certifications", href: "#certifications", visible: true },
            { id: "awards", label: "Awards", href: "#awards", visible: true },
            { id: "publications", label: "Publications", href: "#publications", visible: true },
            { id: "blogs", label: "Blog", href: "#blogs", visible: true },
            { id: "gallery", label: "Gallery", href: "#gallery", visible: true },
            { id: "testimonials", label: "Feedbacks", href: "#testimonials", visible: true },
            { id: "contact", label: "Contact", href: "#contact", visible: true }
        ]
    },
    hero: {
        eyebrow: "AI Full-Stack Specialist",
        titleLine1: "I build, research and teach",
        titleLine2: "AI solutions",
        titleLine3: "for real-world use cases",
        headline: "Muhammad Haerul",
        subheadline: "Architecting intelligent systems with Agentic AI, modern web stacks, and enterprise-grade generative intelligence.",
        statusPill: "Available for AI Engineering & Technical Training",
        ctaPrimaryText: "View my work",
        ctaPrimaryUrl: "#projects",
        ctaSecondaryText: "Get in Touch",
        ctaSecondaryUrl: "#contact",
        showGlimpse: true,
        glimpseActiveIds: []
    },
    sections: {
        experiences: { title: "Career Journey & Work Experience", subtitle: "Track record in software engineering, artificial intelligence, and technical leadership." },
        education: { title: "Academic Foundation & Education", subtitle: "Formal studies in Computer Science, software systems, and data science." },
        projects: { title: "Featured Projects & AI Systems", subtitle: "Production-ready web applications, deep learning solutions, and agentic prototypes." },
        talks: { title: "Speaking Engagements & Talks", subtitle: "Workshops, keynote talks, and hands-on AI bootcamps delivered across organizations." },
        certifications: { title: "Professional Certifications", subtitle: "Verified credentials in Machine Learning, Generative AI, and Cloud Infrastructure." },
        awards: { title: "Honors & Achievements", subtitle: "Competitions won, hackathons, and academic recognitions." },
        publications: { title: "Publications & Research", subtitle: "Peer-reviewed research and applied AI engineering write-ups." },
        blogs: { title: "Technical Articles & Blog", subtitle: "Deep-dives into AI architectures, full-stack development, and tech thoughts." },
        gallery: { title: "Journey & Visual Moments", subtitle: "Behind-the-scenes snapshots of hackathons, speaking stages, and community sessions." },
        testimonials: { title: "Participant & Client Feedbacks", subtitle: "Verified impressions and testimonials from workshop attendees and collaborators." },
        contact: { title: "Let's Connect & Collaborate", subtitle: "Have a project in mind, need technical consulting, or want to invite me as a speaker? Drop a message." }
    },
    footer: {
        tagline: "Building high-impact AI solutions, empowering minds through engineering education, and bridging the gap between research and production.",
        copyright: "© 2026 Muhammad Haerul. All rights reserved.",
        socials: {
            github: "https://github.com/muhammadhaerul25",
            linkedin: "https://linkedin.com/in/muhammadhaerul",
            instagram: "https://www.instagram.com/muhammadhaerul.25/",
            email: "haerulmuhammad01@gmail.com"
        }
    },
    profile: {
        eyebrow: "01 — Profile",
        avatarUrl: "/assets/profile.webp",
        name: "Muhammad Haerul, S.Kom",
        role: "AI Full-Stack Specialist",
        roleSub: "(Engineer, Researcher, and Trainer)",
        education: "Bachelor of Computer Science",
        experienceYears: "4+ years in AI & Data Science",
        leadHeadingRole: "AI Full-Stack Specialist",
        leadHeadingYears: "4 Years",
        storyParagraphs: [
            "My work sits at the intersection of AI engineering, applied research, product development, and digital skills development. I architect and engineer end-to-end AI solutions — spanning data pipelines, computer vision, NLP, and agentic LLM systems to robust production deployment — while exploring emerging research to make AI dependable, accessible, and high-impact. Beyond engineering, I empower professionals, students, and organizations to master modern AI through intensive training, mentorship, and applied learning.",
            "I enjoy bridging the gap between cutting-edge AI research and real-world execution, translating breakthrough models into scalable products that solve concrete operational challenges. My cross-disciplinary experience spans high-growth tech industry, public-sector digital transformation, and nation-wide AI education initiatives, with a relentless focus on reliable software design and ethical, human-centered technology.",
            "My mission is to build, research, and teach AI solutions that create compounding real-world value — shipping intelligent systems and dependable software architectures that make artificial intelligence truly practical, performant, and empowering for people, businesses, and society."
        ],
        storyParagraph1: "My work sits at the intersection of AI engineering, applied research, product development, and digital skills development. I architect and engineer end-to-end AI solutions — spanning data pipelines, computer vision, NLP, and agentic LLM systems to robust production deployment — while exploring emerging research to make AI dependable, accessible, and high-impact. Beyond engineering, I empower professionals, students, and organizations to master modern AI through intensive training, mentorship, and applied learning.",
        storyParagraph2: "I enjoy bridging the gap between cutting-edge AI research and real-world execution, translating breakthrough models into scalable products that solve concrete operational challenges. My cross-disciplinary experience spans high-growth tech industry, public-sector digital transformation, and nation-wide AI education initiatives, with a relentless focus on reliable software design and ethical, human-centered technology.",
        storyParagraph3: "My mission is to build, research, and teach AI solutions that create compounding real-world value — shipping intelligent systems and dependable software architectures that make artificial intelligence truly practical, performant, and empowering for people, businesses, and society.",
        expertiseTags: [
            "Artificial Intelligence Application",
            "Data Analytics",
            "Computer Vision",
            "Natural Language Processing",
            "Generative AI",
            "AI Agents"
        ]
    },
    localization: {
        bilingualEnabled: true,
        defaultLanguage: "en"
    },
    imageSlideshow: {
        enabled: true,
        intervalSeconds: 5.0,
        maxVisible: 3,
        source: "all",
        activeIds: []
    },
    theme: {
        enabled: true,
        defaultMode: "auto"
    },
    hiddenItems: {
        experiences: [],
        projects: [],
        educations: [],
        certifications: [],
        awards: [],
        talks: [],
        publications: [],
        blogs: [],
        skills: [],
        gallery: []
    }
};

const SETTINGS_KEY = 'site_page_settings';

function mergeSettings(base, override) {
    if (!override) return base;

    const imgSlideOverride = override.imageSlideshow || {};
    const imgSlideBase = base.imageSlideshow || {
        enabled: true,
        intervalSeconds: 5.0,
        maxVisible: 3,
        source: "all",
        activeIds: []
    };

    let isSlideshowEnabled = imgSlideBase.enabled !== false;
    if (imgSlideOverride.enabled !== undefined) {
        isSlideshowEnabled = Boolean(imgSlideOverride.enabled);
    } else if (override.hero && override.hero.showGlimpse !== undefined) {
        isSlideshowEnabled = Boolean(override.hero.showGlimpse);
    }

    let activeIds = Array.isArray(imgSlideOverride.activeIds)
        ? imgSlideOverride.activeIds
        : (override.hero && Array.isArray(override.hero.glimpseActiveIds)
            ? override.hero.glimpseActiveIds
            : (Array.isArray(imgSlideBase.activeIds) ? imgSlideBase.activeIds : []));

    const mergedSlideshow = {
        enabled: isSlideshowEnabled,
        intervalSeconds: (imgSlideOverride.intervalSeconds !== undefined) ? Number(imgSlideOverride.intervalSeconds) : (imgSlideBase.intervalSeconds || 5.0),
        maxVisible: (imgSlideOverride.maxVisible !== undefined) ? Number(imgSlideOverride.maxVisible) : (imgSlideBase.maxVisible || 3),
        source: imgSlideOverride.source || imgSlideBase.source || 'all',
        activeIds: activeIds
    };

    const themeBase = base.theme || { enabled: true, defaultMode: "auto" };
    const themeOverride = override.theme || {};
    const mergedTheme = {
        enabled: (themeOverride.enabled !== undefined) ? Boolean(themeOverride.enabled) : (themeBase.enabled !== false),
        defaultMode: themeOverride.defaultMode || themeBase.defaultMode || "auto"
    };

    const baseHidden = base.hiddenItems || {};
    const overHidden = override.hiddenItems || {};
    const mergedHidden = {
        experiences: Array.isArray(overHidden.experiences) ? overHidden.experiences : (Array.isArray(baseHidden.experiences) ? baseHidden.experiences : []),
        projects: Array.isArray(overHidden.projects) ? overHidden.projects : (Array.isArray(baseHidden.projects) ? baseHidden.projects : []),
        educations: Array.isArray(overHidden.educations) ? overHidden.educations : (Array.isArray(baseHidden.educations) ? baseHidden.educations : []),
        certifications: Array.isArray(overHidden.certifications) ? overHidden.certifications : (Array.isArray(baseHidden.certifications) ? baseHidden.certifications : []),
        awards: Array.isArray(overHidden.awards) ? overHidden.awards : (Array.isArray(baseHidden.awards) ? baseHidden.awards : []),
        talks: Array.isArray(overHidden.talks) ? overHidden.talks : (Array.isArray(baseHidden.talks) ? baseHidden.talks : []),
        publications: Array.isArray(overHidden.publications) ? overHidden.publications : (Array.isArray(baseHidden.publications) ? baseHidden.publications : []),
        blogs: Array.isArray(overHidden.blogs) ? overHidden.blogs : (Array.isArray(baseHidden.blogs) ? baseHidden.blogs : []),
        skills: Array.isArray(overHidden.skills) ? overHidden.skills : (Array.isArray(baseHidden.skills) ? baseHidden.skills : []),
        gallery: Array.isArray(overHidden.gallery) ? overHidden.gallery : (Array.isArray(baseHidden.gallery) ? baseHidden.gallery : [])
    };

    return {
        general: Object.assign({}, base.general, override.general || {}),
        navbar: Object.assign({}, base.navbar, override.navbar || {}),
        imageSlideshow: mergedSlideshow,
        theme: mergedTheme,
        hiddenItems: mergedHidden,
        hero: Object.assign({}, base.hero, override.hero || {}, {
            showGlimpse: isSlideshowEnabled,
            glimpseActiveIds: activeIds
        }),
        sections: Object.assign({}, base.sections, override.sections || {}),
        localization: Object.assign({}, base.localization, override.localization || {}),
        footer: {
            tagline: (override.footer && override.footer.tagline !== undefined) ? override.footer.tagline : base.footer.tagline,
            copyright: (override.footer && override.footer.copyright !== undefined) ? override.footer.copyright : base.footer.copyright,
            socials: Object.assign({}, base.footer.socials, (override.footer && override.footer.socials) || {})
        },
        profile: Object.assign({}, base.profile, override.profile || {}, {
            storyParagraphs: (override.profile && Array.isArray(override.profile.storyParagraphs) && override.profile.storyParagraphs.length)
                ? override.profile.storyParagraphs
                : (override.profile && (override.profile.storyParagraph1 || override.profile.storyParagraph2 || override.profile.storyParagraph3)
                    ? [override.profile.storyParagraph1, override.profile.storyParagraph2, override.profile.storyParagraph3].filter(Boolean)
                    : base.profile.storyParagraphs)
        })
    };
}

async function getSettings(req, res) {
    try {
        const cached = cache.get('site_settings');
        if (cached) {
            return res.json({ success: true, data: cached });
        }

        const rows = await prisma.$queryRawUnsafe(`
            SELECT value FROM site_settings WHERE key = $1 LIMIT 1
        `, SETTINGS_KEY);

        let data = DEFAULT_SETTINGS;
        if (rows && rows.length > 0 && rows[0].value) {
            data = mergeSettings(DEFAULT_SETTINGS, rows[0].value);
        }

        cache.set('site_settings', data, 3600); // 1 hour cache
        return res.json({ success: true, data });
    } catch (err) {
        console.error('[Settings] Error fetching settings:', err);
        return res.json({ success: true, data: DEFAULT_SETTINGS, fallback: true });
    }
}

async function updateSettings(req, res) {
    try {
        const incoming = req.body;
        if (!incoming || typeof incoming !== 'object') {
            return res.status(400).json({ success: false, error: 'Invalid settings payload' });
        }

        // Fetch current settings to merge
        const rows = await prisma.$queryRawUnsafe(`
            SELECT value FROM site_settings WHERE key = $1 LIMIT 1
        `, SETTINGS_KEY);

        let current = DEFAULT_SETTINGS;
        if (rows && rows.length > 0 && rows[0].value) {
            current = mergeSettings(DEFAULT_SETTINGS, rows[0].value);
        }

        const merged = mergeSettings(current, incoming);

        const jsonStr = JSON.stringify(merged);
        await prisma.$executeRawUnsafe(`
            INSERT INTO site_settings (key, value, updated_at)
            VALUES ($1, $2::jsonb, NOW())
            ON CONFLICT (key) DO UPDATE SET
                value = EXCLUDED.value,
                updated_at = NOW()
        `, SETTINGS_KEY, jsonStr);

        cache.del('site_settings');
        cache.del('portfolio:bootstrap');
        cache.del('portfolio_bootstrap');

        return res.json({ success: true, message: 'Settings saved successfully', data: merged });
    } catch (err) {
        console.error('[Settings] Error updating settings:', err);
        return res.status(500).json({ success: false, error: 'Failed to update settings: ' + err.message });
    }
}

async function toggleItemVisibility(req, res) {
    try {
        const { section, id, visible } = req.body;
        if (!section || !id) {
            return res.status(400).json({ success: false, error: 'Section and ID are required' });
        }

        const rows = await prisma.$queryRawUnsafe(`
            SELECT value FROM site_settings WHERE key = $1 LIMIT 1
        `, SETTINGS_KEY);

        let current = DEFAULT_SETTINGS;
        if (rows && rows.length > 0 && rows[0].value) {
            current = mergeSettings(DEFAULT_SETTINGS, rows[0].value);
        }

        const hidden = current.hiddenItems || {};
        let list = Array.isArray(hidden[section]) ? [...hidden[section]] : [];

        if (visible === true) {
            list = list.filter(item => String(item) !== String(id));
        } else if (visible === false) {
            if (!list.map(String).includes(String(id))) list.push(String(id));
        } else {
            if (list.map(String).includes(String(id))) {
                list = list.filter(item => String(item) !== String(id));
            } else {
                list.push(String(id));
            }
        }

        hidden[section] = list;
        current.hiddenItems = hidden;

        const jsonStr = JSON.stringify(current);
        await prisma.$executeRawUnsafe(`
            INSERT INTO site_settings (key, value, updated_at)
            VALUES ($1, $2::jsonb, NOW())
            ON CONFLICT (key) DO UPDATE SET
                value = EXCLUDED.value,
                updated_at = NOW()
        `, SETTINGS_KEY, jsonStr);

        cache.del('site_settings');
        cache.del('portfolio:bootstrap');
        cache.del('portfolio_bootstrap');
        cache.del(section);
        cache.del(section + ':all');

        return res.json({
            success: true,
            section,
            id,
            isVisible: !list.map(String).includes(String(id)),
            hiddenItems: hidden
        });
    } catch (err) {
        console.error('[Settings] Error toggling item visibility:', err);
        return res.status(500).json({ success: false, error: err.message });
    }
}

module.exports = {
    getSettings,
    updateSettings,
    toggleItemVisibility,
    DEFAULT_SETTINGS,
    mergeSettings
};
