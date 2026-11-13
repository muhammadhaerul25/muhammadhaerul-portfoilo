import type { BrowserContextOptions } from 'playwright';

export const SITE = 'https://www.muhammadhaerul.tech/';

/** Mobile emulation required by the brief. */
export const MOBILE_CONTEXT: BrowserContextOptions = {
  viewport: { width: 430, height: 932 },
  deviceScaleFactor: 2.5,
  isMobile: true,
  hasTouch: true,
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  locale: 'en-US',
};

export const SECTION_IDS = ['hero', 'experience', 'projects', 'publications', 'talks', 'awards', 'certifications'] as const;

/** Capture frame rate for website footage. */
export const CAPTURE_FPS = 60;

/**
 * A scroll target. The element is resolved inside `section` by CSS `selector`, optionally filtered by
 * text content. `offset` is added to the element top (negative = leave room above, e.g. under the fixed nav).
 */
export type Target = { selector: string; text?: string; offset?: number; inModal?: boolean };

export type Step =
  | { kind: 'hold'; seconds: number; label?: string }
  | { kind: 'scroll'; to: Target | number; seconds: number; label?: string }
  | { kind: 'scrollBy'; px: number; seconds: number; label?: string; inModal?: boolean };

export type ClipPlan = {
  name: string;
  section: (typeof SECTION_IDS)[number];
  /** Where the clip starts (absolute target resolved before recording). */
  start: Target | number;
  /** Optional element to click before recording (e.g. open a project modal). */
  clickBefore?: { selector: string; text?: string };
  steps: Step[];
};

const NAV = -78; // fixed nav height + breathing room (CSS px)

export const CLIPS: ClipPlan[] = [
  {
    name: 'hero',
    section: 'hero',
    start: 0,
    steps: [
      { kind: 'hold', seconds: 2.2, label: 'headline' },
      { kind: 'scroll', to: { selector: '#hero .hero-stat-val', offset: -300 }, seconds: 1.6, label: 'to-stats' },
      { kind: 'hold', seconds: 1.6, label: 'stats' },
      { kind: 'scroll', to: { selector: '#about img', offset: NAV - 40 }, seconds: 2.2, label: 'to-portrait' },
      { kind: 'hold', seconds: 1.6, label: 'portrait' },
    ],
  },
  {
    name: 'experiences',
    section: 'experience',
    start: { selector: '#experience', offset: 0 },
    steps: [
      { kind: 'hold', seconds: 1.0, label: 'title' },
      { kind: 'scroll', to: { selector: '#experience h3', text: 'Co-Founder', offset: NAV - 60 }, seconds: 1.4, label: 'aksarahub' },
      { kind: 'hold', seconds: 1.2, label: 'aksarahub-hold' },
      { kind: 'scroll', to: { selector: '#experience h3', text: 'AI Engineer', offset: NAV - 60 }, seconds: 2.0, label: 'paperid' },
      { kind: 'hold', seconds: 1.8, label: 'paperid-hold' },
      { kind: 'scroll', to: { selector: '#experience h3', text: 'AIoT Engineer', offset: NAV - 60 }, seconds: 2.0, label: 'xl' },
      { kind: 'hold', seconds: 1.8, label: 'xl-hold' },
    ],
  },
  {
    name: 'projects',
    section: 'projects',
    start: { selector: '#projects', offset: 0 },
    steps: [
      { kind: 'hold', seconds: 0.8, label: 'title' },
      { kind: 'scroll', to: { selector: '#projects article.p-card h3', text: 'Aksara Lontara Recognition', offset: NAV - 260 }, seconds: 1.6, label: 'aksara-card' },
      { kind: 'hold', seconds: 1.4, label: 'aksara-hold' },
      { kind: 'scroll', to: { selector: '#projects article.p-card h3', text: 'AI Split Bills', offset: NAV - 260 }, seconds: 2.2, label: 'splitbills-card' },
      { kind: 'hold', seconds: 1.2, label: 'splitbills-hold' },
      { kind: 'scroll', to: { selector: '#projects article.p-card h3', text: 'Galaxy ALPR', offset: NAV - 260 }, seconds: 2.0, label: 'alpr-card' },
      { kind: 'hold', seconds: 1.2, label: 'alpr-hold' },
    ],
  },
  ...(
    [
      ['project-aksara', 'Aksara Lontara Recognition'],
      ['project-splitbills', 'AI Split Bills'],
      ['project-alpr', 'Galaxy ALPR'],
    ] as const
  ).map(
    ([name, title]): ClipPlan => ({
      name,
      section: 'projects',
      start: { selector: '#projects article.p-card h3', text: title, offset: NAV - 260 },
      clickBefore: { selector: '#projects article.p-card', text: title },
      steps: [
        { kind: 'hold', seconds: 1.4, label: 'modal-top' },
        { kind: 'scrollBy', px: 520, seconds: 2.2, label: 'modal-scroll', inModal: true },
        { kind: 'hold', seconds: 1.2, label: 'modal-hold' },
      ],
    }),
  ),
  {
    name: 'publications',
    section: 'publications',
    start: { selector: '#publications', offset: 0 },
    steps: [
      { kind: 'hold', seconds: 1.0, label: 'title' },
      { kind: 'scroll', to: { selector: '#publications h3', text: 'Medium', offset: NAV - 70 }, seconds: 1.4, label: 'medium' },
      { kind: 'hold', seconds: 1.4, label: 'medium-hold' },
      { kind: 'scroll', to: { selector: '#publications h3', text: 'Galaxy Object Detection', offset: NAV - 70 }, seconds: 1.4, label: 'pypi' },
      { kind: 'hold', seconds: 1.4, label: 'pypi-hold' },
      { kind: 'scroll', to: { selector: '#publications h3', text: 'PPE Detection', offset: NAV - 70 }, seconds: 1.4, label: 'thesis' },
      { kind: 'hold', seconds: 1.6, label: 'thesis-hold' },
    ],
  },
  {
    name: 'talks',
    section: 'talks',
    start: { selector: '#talks', offset: 0 },
    steps: [
      { kind: 'hold', seconds: 1.0, label: 'title' },
      { kind: 'scroll', to: { selector: '#talks h3', text: 'GSA AI Forge', offset: NAV - 470 }, seconds: 3.0, label: 'gsa' },
      { kind: 'hold', seconds: 1.2, label: 'gsa-hold' },
      { kind: 'scroll', to: { selector: '#talks h3', text: 'AI Web Engineering', offset: NAV - 470 }, seconds: 2.2, label: 'unsulbar' },
      { kind: 'hold', seconds: 1.2, label: 'unsulbar-hold' },
    ],
  },
  {
    name: 'awards',
    section: 'awards',
    start: { selector: '#awards', offset: 0 },
    steps: [
      { kind: 'hold', seconds: 0.6, label: 'title' },
      { kind: 'scroll', to: { selector: '#awards h3', text: 'Top 20 AI Talent Hub', offset: NAV - 360 }, seconds: 1.6, label: 'top20' },
      { kind: 'hold', seconds: 1.6, label: 'top20-hold' },
    ],
  },
  {
    name: 'certifications',
    section: 'certifications',
    start: { selector: '#certifications', offset: 0 },
    steps: [
      { kind: 'hold', seconds: 0.6, label: 'title' },
      { kind: 'scrollBy', px: 620, seconds: 1.8, label: 'cards' },
      { kind: 'hold', seconds: 1.4, label: 'cards-hold' },
    ],
  },
];

/** Original image assets to extract (resolved from the live DOM, downloaded at native resolution). */
export const STILLS = [
  { out: 'hero-portrait.png', from: { selector: '#about img' } },
  { out: 'top-20-ai-talent-hub.png', from: { url: '/assets/images/awards/award_img_4.jpg', mustAppearIn: '#awards' } },
  { out: 'talk-01.png', from: { url: '/assets/images/gsa-ai-forge-doc-1.jpg', mustAppearIn: '#talks,#gallery' } },
  { out: 'talk-02.png', from: { url: '/assets/images/muhammad-haerul-workshop-ai-web-engineering.webp', mustAppearIn: '#talks,#gallery' } },
  { out: 'talk-03.png', from: { url: '/assets/images/gsa-ai-forge-doc-3.jpg', mustAppearIn: '#talks,#gallery' } },
] as const;
