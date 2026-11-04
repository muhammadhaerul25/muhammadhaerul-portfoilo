# Muhammad Haerul — Digital Portfolio & Feedback Platform

An interactive, full-stack personal portfolio, speaking engagement showcase, and dynamic feedback management platform built for **Muhammad Haerul (`@muhammadhaerul.25`)**, powered by **Node.js, Express 5, Prisma ORM 7, and PostgreSQL**.

Live Production: **[https://www.muhammadhaerul.tech](https://www.muhammadhaerul.tech)**

---

## Key Features

- **Bilingual Portfolio Experience (EN / ID)**:
  - Complete separation of English and Indonesian copy across all 13 sections (Education, Work Experience, Projects, Skills, Talks & Sharing, Certifications, Honors & Awards, Publications, Recommendations, Session Feedbacks, Articles & Blog, Gallery, Contact).
  - Consistent year-based color-coded timeline badges and markers across Work Experience, Certifications, Talks, Awards, and Publications.
  - Multi-page certificate and talk media viewer with interactive zoom, rotation, and curriculum page switching.

- **Comprehensive Admin Dashboard (`/dashboard`)**:
  - Hero statistics displaying attendee reach, average ratings, and real-time visitor analytics.
  - Symmetrical metric cards for managing Projects, Talks, Forms, Feedbacks, Certifications, Awards, Publications, Articles, Gallery, and Site Settings.

- **Interactive Feedback Forms & Custom Survey Builder (`/feedback`, `/form/:slug`)**:
  - Standardized speaker session feedback forms mapped to PostgreSQL `feedbacks`.
  - Dynamic custom form builder supporting text, textarea, rating (1–10), radio, select, and checkbox questions with CSV export.

---

## Project Architecture & Directory Structure

```text
├── prisma/
│   └── schema.prisma                # Prisma ORM 7 schema & PostgreSQL indexes
├── public/
│   ├── assets/
│   │   ├── certificates/            # High-resolution single & multi-page certificates
│   │   ├── images/
│   │   │   ├── awards/              # Honors & competition photos/certificates
│   │   │   ├── logos/               # Institution, company & issuer logos
│   │   │   ├── projects/            # Project thumbnails & architecture previews
│   │   │   └── publications/        # Journal, thesis & book cover thumbnails
│   │   └── resume-muhammad-haerul.pdf
│   ├── uploads/
│   │   └── talks/                   # Speaking posters, certificates & event photos
│   ├── index.html                   # Main bilingual portfolio page
│   ├── browse.html                  # Unified directory browser (/projects, /talks, /certifications, etc.)
│   ├── dashboard.html               # Single-Page Admin Dashboard UI
│   ├── form-feedbacks.html          # Public speaking feedback submission form
│   ├── form-renderer.html           # Dynamic custom form renderer
│   ├── styles.css                   # Unified design system & responsive styles
│   └── script.js                    # Client-side state, i18n, rendering & modals
├── scripts/
│   ├── db/                          # Database schema checks & table setup utilities
│   ├── maintenance/                 # WebP conversion, PDF generator & index optimizer
│   ├── seed/                        # Initial data & admin seed scripts
│   ├── verify/                      # Automated route & backend optimization checks
│   └── _archive/                    # Historical one-off migration scripts
├── src/
│   ├── config/
│   │   └── db.js                    # Prisma Pg adapter & connection pool configuration
│   ├── controllers/                 # Route handlers with in-memory TTL caching
│   ├── middlewares/                 # Security headers, rate limiters & error handling
│   ├── routes/
│   │   ├── index.js                 # Centralized /api router
│   │   ├── pages.routes.js          # Clean HTML page & document routes
│   │   └── *.routes.js              # Resource-specific API endpoints
│   ├── utils/
│   │   └── cache.js                 # Zero-latency in-memory cache with pattern invalidation
│   ├── app.js                       # Express application pipeline
│   └── server.js                    # HTTP server bootstrap & graceful shutdown
├── package.json
└── vercel.json                      # Vercel serverless deployment configuration
```

---

## Getting Started

### 1. Prerequisites
- **Node.js**: v18+ or v20+
- **PostgreSQL Database**

### 2. Environment Variables
Create a `.env` file in the project root:

```env
PORT=4000
DATABASE_URL="postgresql://user:password@host:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:5432/postgres"
```

### 3. Installation & Useful Scripts
```bash
# Install dependencies
npm install

# Generate Prisma Client & push schema
npm run db:generate
npm run db:push

# Start development server with live reload
npm run dev

# Verify database connectivity & routes
npm run db:check
npm run verify:routes
```

---

## License
© 2026 @muhammadhaerul.25. All rights reserved.
