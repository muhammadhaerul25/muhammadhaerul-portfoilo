/**
 * src/content.ts
 *
 * Central configuration file for all creative text, statistics, scene timing,
 * branding, Instagram safe zones, and editable copy.
 */

export const VIDEO_CONFIG = {
  fps: 30,
  width: 1080,
  height: 1920,
  durationInFrames: 1800, // Exactly 60.000 seconds
} as const;

export const SAFE_ZONES = {
  canvas: { width: 1080, height: 1920 },
  boundaries: {
    top: 270,
    bottom: 480,
    left: 64,
    right: 120,
  },
  contentSafe: {
    x: 64,
    y: 270,
    width: 896, // 1080 - 64 - 120
    height: 1170, // 1920 - 270 - 480
  },
  profileGrid: {
    x: 0,
    y: 240,
    width: 1080,
    height: 1440,
  },
} as const;

export const THEME = {
  colors: {
    bgNavy: '#0A0E17',
    bgNavyDark: '#06090F',
    accentBlue: '#1A73E8',
    accentBlueGlow: 'rgba(26, 115, 232, 0.45)',
    accentCyan: '#38BDF8',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    borderNavy: '#1E293B',
    cardBg: 'rgba(15, 23, 42, 0.85)',
    glassBg: 'rgba(255, 255, 255, 0.04)',
    glassBorder: 'rgba(255, 255, 255, 0.12)',
  },
  fonts: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
} as const;

export const TIMELINE = {
  scenes: {
    hook: { start: 0, duration: 120 }, // 00:00 - 00:04 (4s)
    who: { start: 120, duration: 240 }, // 00:04 - 00:12 (8s)
    build: { start: 360, duration: 480 }, // 00:12 - 00:28 (16s)
    research: { start: 840, duration: 300 }, // 00:28 - 00:38 (10s)
    teach: { start: 1140, duration: 360 }, // 00:38 - 00:50 (12s)
    proofCta: { start: 1500, duration: 300 }, // 00:50 - 01:00 (10s)
  },
} as const;

export const PROFILE_DATA = {
  identity: {
    name: 'Muhammad Haerul, S.Kom.',
    title: 'AI Full-Stack Specialist',
    roles: 'Engineer · Researcher · Trainer',
    education: 'Hasanuddin University',
    honors: 'Cum Laude · GPA 3.97',
    tagline: 'I build, research and teach AI solutions for real-world use cases.',
    websiteUrl: 'muhammadhaerul.tech',
    linkInBio: 'Link in bio',
    ctaHeading: "Let's build something that ships.",
  },

  // Approved and verified website stats
  stats: [
    { label: 'AI Experience', value: 4, suffix: '+ Yrs', fullText: '4+ Years AI Experience' },
    { label: 'Shipped Projects', value: 20, suffix: '+', fullText: '20+ Shipped Projects' },
    { label: 'Workshop Attendees', value: 1560, suffix: '+', fullText: '1,560+ Attendees' },
    { label: 'Satisfaction', value: 9.5, suffix: '★', fullText: '9.5★ Rating' },
  ],

  // Verified build achievements & projects
  buildHighlights: [
    {
      role: 'Co-Founder & AI Lead',
      company: 'AksaraHub Nusantara',
      achievement: 'Handwritten Script Recognition & Cultural OCR',
      badge: 'Deep Learning',
    },
    {
      role: 'Former AI Engineer',
      company: 'Paper.id',
      achievement: 'LLM OCR for KYC/KYB · 99% Accuracy',
      badge: 'Production LLM',
    },
    {
      role: 'Former AIoT Engineer',
      company: 'XL Axiata',
      achievement: 'Edge PPE Compliance Detection on Raspberry Pi',
      badge: 'Edge Computer Vision',
    },
  ],

  // Verified research highlights
  researchHighlights: [
    {
      type: 'Open-Source Library',
      publisher: 'Python Package Index (PyPI)',
      title: 'Galaxy Object Detection Core',
      desc: 'Modular real-time object detection architecture on YOLO & YOLOWorld',
    },
    {
      type: 'Undergraduate Thesis',
      publisher: 'Universitas Hasanuddin',
      title: 'PPE Detection in Industrial Workers',
      desc: 'Benchmarking computer vision models for industrial worker safety',
    },
    {
      type: 'Technical Guide',
      publisher: 'Medium Publication',
      title: 'Multimodal AI Agent Architecture',
      desc: 'Edge vision pipelines and low-latency full-stack AI deployment',
    },
  ],

  // Verified teaching metrics & photos
  teach: {
    headline: '6+ Talks · 1,560+ Attendees',
    subheadline: 'Workshops, University Seminars & Keynotes',
    items: [
      {
        event: 'GSA AI Forge',
        org: 'Google Student Ambassador',
        attendees: '150+ Attendees',
        stillAsset: 'stills/talk-01.png',
      },
      {
        event: 'Mindful AI Masterclass',
        org: 'Yayasan Khouw Kalbe',
        attendees: 'Keynote Speaker',
        stillAsset: 'stills/talk-02.png',
      },
      {
        event: 'Build with AI',
        org: 'Google Developer Groups',
        attendees: '100+ Attendees',
        stillAsset: 'stills/talk-03.png',
      },
    ],
  },

  // Verified accolades
  proof: {
    primaryAward: {
      title: 'Top 20 AI Talent Hub Indonesia 2025',
      issuer: 'Universitas Indonesia & PT Pertamina',
      stillAsset: 'stills/top-20-ai-talent-hub.png',
    },
    hackathons: [
      '1st Place Winner — Open The Gate Hackathon 2025',
      '2nd Place Winner — Makassar Hackathon 2024',
      'Best Creativity — AI Hackathon TechnoArt 2025',
    ],
  },
} as const;

