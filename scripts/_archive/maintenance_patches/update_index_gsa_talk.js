const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../public/index.html');
let content = fs.readFileSync(filePath, 'utf8');

const target = `<article class="talk-dynamic-card reveal in-view">
            <div class="talk-poster-wrap"
              onclick="window.openLightbox('/assets/images/muhammad-haerul-speaker-gsa-ai-forge.webp', 'GSA AI Forge: AI for Personal Branding — Google Student Ambassadors')"
              title="Click to view full image" style="cursor:zoom-in;">
              <div class="talk-poster-backdrop"
                style="background-image: url('/assets/images/muhammad-haerul-speaker-gsa-ai-forge.webp');"></div>
              <img class="talk-poster-img" src="/assets/images/muhammad-haerul-speaker-gsa-ai-forge.webp"
                alt="Muhammad Haerul speaking at GSA AI Forge: AI for Personal Branding — AI Trainer & Full-Stack Engineer"
                title="Muhammad Haerul — GSA AI Forge: AI for Personal Branding" decoding="async" loading="lazy">
              <div class="talk-poster-overlay">
                <span class="talk-zoom-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span>View Full Image</span>
                </span>
              </div>
            </div>
            <div class="talk-card-body">
              <div>
                <div class="talk-meta-bar">
                  <span class="talk-date-badge">January 2025</span>
                  <span class="talk-attendees-badge"><svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
                      aria-hidden="true">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg> <span>120+ Attendees</span></span>
                </div>
                <h3 class="talk-card-title">GSA AI Forge: AI for Personal Branding</h3>
                <p class="talk-card-org">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                  Google Student Ambassador Program
                </p>
              </div>
            </div>
          </article>`;

const replacement = `<article class="talk-dynamic-card reveal in-view" data-tid="cmt2k5bn000019sb9mvzbynus">
            <div class="talk-poster-wrap" id="talk-prev-cmt2k5bn000019sb9mvzbynus"
              data-active-src="/uploads/talks/saveclip_app_752916423_18047968217611708_109289192688503691_n_1787293047380.webp"
              data-active-title="GSA AI Forge: AI for Personal Branding &amp; Digital Portfolio (Poster)"
              data-pages='[{"label":"Poster","url":"/uploads/talks/saveclip_app_752916423_18047968217611708_109289192688503691_n_1787293047380.webp","type":"poster"},{"label":"Documentation 1","url":"/assets/images/gsa-ai-forge-doc-1.jpg","type":"documentation"},{"label":"Documentation 2","url":"/assets/images/gsa-ai-forge-doc-2.jpg","type":"documentation"},{"label":"Documentation 3","url":"/assets/images/gsa-ai-forge-doc-3.jpg","type":"documentation"}]'
              data-page-index="0"
              data-talk-event="GSA AI Forge: AI for Personal Branding &amp; Digital Portfolio"
              onclick="window.openLightbox(this.getAttribute('data-active-src') || '/uploads/talks/saveclip_app_752916423_18047968217611708_109289192688503691_n_1787293047380.webp', this.getAttribute('data-active-title') || 'GSA AI Forge: AI for Personal Branding &amp; Digital Portfolio')"
              title="Click to view full image" style="cursor:zoom-in;">
              <div class="talk-poster-backdrop"
                style="background-image: url('/uploads/talks/saveclip_app_752916423_18047968217611708_109289192688503691_n_1787293047380.webp');"></div>
              <img class="talk-poster-img" src="/uploads/talks/saveclip_app_752916423_18047968217611708_109289192688503691_n_1787293047380.webp"
                alt="Muhammad Haerul speaking at GSA AI Forge: AI for Personal Branding &amp; Digital Portfolio — AI Trainer &amp; Full-Stack Engineer"
                title="Muhammad Haerul — GSA AI Forge: AI for Personal Branding &amp; Digital Portfolio" decoding="async" loading="lazy">
              <div class="talk-media-tabs" role="tablist" aria-label="Talk Media Tabs" onclick="event.stopPropagation();">
                <button type="button" class="talk-tab-btn active" role="tab" aria-selected="true"
                  onclick="event.stopPropagation(); window.switchTalkPage('cmt2k5bn000019sb9mvzbynus', '/uploads/talks/saveclip_app_752916423_18047968217611708_109289192688503691_n_1787293047380.webp', this, 'GSA AI Forge: AI for Personal Branding &amp; Digital Portfolio (Poster)')">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <span>Poster</span>
                </button>
                <button type="button" class="talk-tab-btn" role="tab" aria-selected="false"
                  onclick="event.stopPropagation(); window.switchTalkPage('cmt2k5bn000019sb9mvzbynus', '/assets/images/gsa-ai-forge-doc-1.jpg', this, 'GSA AI Forge: AI for Personal Branding &amp; Digital Portfolio (Documentation 1)')">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <span>Documentation 1</span>
                </button>
                <button type="button" class="talk-tab-btn" role="tab" aria-selected="false"
                  onclick="event.stopPropagation(); window.switchTalkPage('cmt2k5bn000019sb9mvzbynus', '/assets/images/gsa-ai-forge-doc-2.jpg', this, 'GSA AI Forge: AI for Personal Branding &amp; Digital Portfolio (Documentation 2)')">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <span>Documentation 2</span>
                </button>
                <button type="button" class="talk-tab-btn" role="tab" aria-selected="false"
                  onclick="event.stopPropagation(); window.switchTalkPage('cmt2k5bn000019sb9mvzbynus', '/assets/images/gsa-ai-forge-doc-3.jpg', this, 'GSA AI Forge: AI for Personal Branding &amp; Digital Portfolio (Documentation 3)')">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <span>Documentation 3</span>
                </button>
              </div>
              <div class="talk-poster-overlay">
                <span class="talk-zoom-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span class="talk-zoom-text">View Full Image</span>
                </span>
              </div>
            </div>
            <div class="talk-card-body">
              <div>
                <div class="talk-meta-bar">
                  <span class="talk-date-badge year-2026">Jul 28, 2026</span>
                  <span class="talk-attendees-badge"><svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"
                      aria-hidden="true">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg> <span>150+ Attendees</span></span>
                </div>
                <h3 class="talk-card-title">GSA AI Forge: AI for Personal Branding &amp; Digital Portfolio</h3>
                <p class="talk-card-org">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                  Google Student Ambassador
                </p>
                <p class="talk-card-place">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Makassar Government Center
                </p>
              </div>
            </div>
          </article>`;

// Normalize CRLF to LF for matching
const normalize = str => str.replace(/\r\n/g, '\n');

if (normalize(content).includes(normalize(target))) {
  // Replace using regex or normalized string
  const normalizedContent = normalize(content);
  const normalizedTarget = normalize(target);
  const normalizedReplacement = normalize(replacement);
  const updated = normalizedContent.replace(normalizedTarget, normalizedReplacement);
  // Restore CRLF
  fs.writeFileSync(filePath, updated.replace(/\n/g, '\r\n'), 'utf8');
  console.log('Successfully updated index.html static talk card!');
} else {
  console.error('Target not found in index.html!');
  process.exit(1);
}

