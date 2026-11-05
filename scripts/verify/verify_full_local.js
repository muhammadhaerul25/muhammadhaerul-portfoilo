require('dotenv/config');
const http = require('http');
const prisma = require('../../src/config/db');
const { signToken } = require('../../src/utils/token');
const { PRIMARY_ADMIN_EMAIL } = require('../../src/middlewares/auth');

const BASE_URL = 'http://127.0.0.1:4000';

async function request(path, options = {}) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BASE_URL);
        const headers = { ...(options.headers || {}) };
        if (options.token) {
            headers['Authorization'] = `Bearer ${options.token}`;
        }
        if (options.body && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }

        const req = http.request(url, {
            method: options.method || 'GET',
            headers
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                let json = null;
                try { json = JSON.parse(data); } catch (e) {}
                resolve({
                    status: res.statusCode,
                    headers: res.headers,
                    body: json || data
                });
            });
        });
        req.on('error', reject);
        if (options.body) {
            req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
        }
        req.end();
    });
}

async function runComprehensiveAudit() {
    console.log('================================================================');
    console.log('    COMPREHENSIVE LOCAL ENVIRONMENT & APP AUDIT & PRE-CHECK    ');
    console.log('================================================================\n');

    let total = 0;
    let passed = 0;
    let failed = 0;

    function assert(cond, name, details = '') {
        total++;
        if (cond) {
            console.log(`  [PASS] ${name}`);
            passed++;
        } else {
            console.error(`  [FAIL] ${name} ${details ? '(' + details + ')' : ''}`);
            failed++;
        }
    }

    try {
        // --- 1. Database Health Check ---
        console.log('SECTION 1: Database & Connection Pool Pre-Check');
        const dbHealth = await prisma.checkDbHealth();
        assert(dbHealth.status === 'healthy', 'Database connectivity check', `status: ${dbHealth.status}`);
        assert(typeof dbHealth.latencyMs === 'number' && dbHealth.latencyMs < 2000, `Database latency is acceptable (${dbHealth.latencyMs}ms)`);
        assert(dbHealth.pool && typeof dbHealth.pool.totalCount === 'number', 'Pool metrics available', JSON.stringify(dbHealth.pool));

        // --- 2. Security Headers & Telemetry ---
        console.log('\nSECTION 2: HTTP Security Headers & Telemetry');
        const rootRes = await request('/');
        assert(rootRes.status === 200, 'GET / returns 200 OK');
        assert(rootRes.headers['x-content-type-options'] === 'nosniff', 'X-Content-Type-Options is nosniff');
        assert(rootRes.headers['x-frame-options'] === 'SAMEORIGIN', 'X-Frame-Options is SAMEORIGIN');
        assert(rootRes.headers['referrer-policy'] !== undefined, 'Referrer-Policy header present');

        const apiHealthRes = await request('/api/health');
        assert(apiHealthRes.headers['x-response-time'] !== undefined, 'X-Response-Time header present on API responses');

        // CORS validation
        const corsRes = await request('/api/health', {
            headers: { 'Origin': 'http://localhost:4000' }
        });
        assert(corsRes.headers['access-control-allow-origin'] === 'http://localhost:4000', 'CORS dynamically allows localhost:4000');

        // --- 3. Static Pages & PWA Assets ---
        console.log('\nSECTION 3: Static Pages, Document Routes & PWA Assets');
        const pageRoutes = [
            { path: '/', expectedType: 'text/html' },
            { path: '/dashboard', expectedType: 'text/html' },
            { path: '/feedback', expectedType: 'text/html' },
            { path: '/form-feedbacks', expectedType: 'text/html' },
            { path: '/browse', expectedType: 'text/html' },
            { path: '/projects', expectedType: 'text/html' },
            { path: '/talks', expectedType: 'text/html' },
            { path: '/certifications', expectedType: 'text/html' },
            { path: '/awards', expectedType: 'text/html' },
            { path: '/publications', expectedType: 'text/html' },
            { path: '/offline', expectedType: 'text/html' },
            { path: '/sw.js', expectedType: 'javascript' },
            { path: '/manifest.json', expectedType: 'manifest' },
            { path: '/resume', expectedType: 'application/pdf' },
            { path: '/full-materi.pdf', expectedType: 'application/pdf' },
            { path: '/recommendation', expectedType: 'text/html' },
            { path: '/llms.txt', expectedType: 'text/plain' },
            { path: '/sitemap.xml', expectedType: 'xml' },
            { path: '/robots.txt', expectedType: 'text/plain' }
        ];

        for (const p of pageRoutes) {
            const res = await request(p.path);
            const contentType = res.headers['content-type'] || '';
            const isMatch = contentType.toLowerCase().includes(p.expectedType);
            assert(res.status === 200 && isMatch, `GET ${p.path} serves 200 with ${p.expectedType}`);
        }

        // Test section redirects
        const blogRedirect = await request('/blog');
        assert(blogRedirect.status === 302 && blogRedirect.headers['location'] === '/#blog', 'GET /blog redirects to /#blog');

        const galleryRedirect = await request('/gallery');
        assert(galleryRedirect.status === 302 && galleryRedirect.headers['location'] === '/#gallery', 'GET /gallery redirects to /#gallery');

        // --- 4. Core Public APIs & Data Integrity ---
        console.log('\nSECTION 4: Public APIs & Data Retrieval');
        const apiEndpoints = [
            { path: '/api', check: (b) => b.success && b.version },
            { path: '/api/health', check: (b) => b.success && b.status === 'healthy' },
            { path: '/api/keep-alive', check: (b) => b.success && b.latencyMs !== undefined },
            { path: '/api/portfolio/bootstrap', check: (b) => b.success && b.data && b.data.settings },
            { path: '/api/settings', check: (b) => b.success && b.data },
            { path: '/api/projects', check: (b) => b.success && Array.isArray(b.data) },
            { path: '/api/talks', check: (b) => b.success && Array.isArray(b.data) },
            { path: '/api/experiences', check: (b) => b.success && Array.isArray(b.data) },
            { path: '/api/educations', check: (b) => b.success && Array.isArray(b.data) },
            { path: '/api/certifications', check: (b) => b.success && Array.isArray(b.data) },
            { path: '/api/awards', check: (b) => b.success && Array.isArray(b.data) },
            { path: '/api/publications', check: (b) => b.success && Array.isArray(b.data) },
            { path: '/api/skills', check: (b) => b.success && Array.isArray(b.data) },
            { path: '/api/gallery', check: (b) => b.success && Array.isArray(b.data) },
            { path: '/api/feedbacks', check: (b) => b.success && Array.isArray(b.data) },
            { path: '/api/blogs', check: (b) => b.success && Array.isArray(b.data) },
            { path: '/api/forms', check: (b) => b.success && Array.isArray(b.data) },
            { path: '/api/auth/config', check: (b) => b.success && (b.googleClientId !== undefined || b.clientId !== undefined) },
            { path: '/api/analytics/stats', check: (b) => b.success && b.data },
            { path: '/api/analytics/detailed', check: (b) => b.success && b.data && (b.data.dailyTrend !== undefined || b.data.daily_trend !== undefined) }
        ];

        for (const ep of apiEndpoints) {
            const res = await request(ep.path);
            const isValid = res.status === 200 && ep.check(res.body);
            assert(isValid, `GET ${ep.path} returns 200 OK & valid schema`, JSON.stringify(res.body).substring(0, 80));
        }

        // --- 5. Cache Verification ---
        console.log('\nSECTION 5: Response In-Memory Caching (X-Cache)');
        const cacheTest = await request('/api/projects');
        assert(cacheTest.headers['x-cache'] === 'HIT', 'GET /api/projects delivers X-Cache: HIT');

        // --- 6. Analytics Tracking Integration ---
        console.log('\nSECTION 6: Analytics Page Visit Tracking');
        const trackRes = await request('/api/analytics/track', {
            method: 'POST',
            body: { visitorId: `local-audit-${Date.now()}`, path: '/test-audit-page' }
        });
        assert(trackRes.status === 200 && trackRes.body.success, 'POST /api/analytics/track logs visit successfully');

        // --- 7. Security & Authorization Safeguards ---
        console.log('\nSECTION 7: Security Guardrails & Unauthorized Mutation Blocking');
        const unauthTests = [
            { method: 'POST', path: '/api/projects', body: { name: 'Test' } },
            { method: 'PUT', path: '/api/projects/1', body: { name: 'Test' } },
            { method: 'DELETE', path: '/api/projects/1' },
            { method: 'PUT', path: '/api/settings', body: { title: 'Test' } },
            { method: 'POST', path: '/api/forms', body: { title: 'Test' } },
            { method: 'DELETE', path: '/api/feedbacks/9999' },
            { method: 'GET', path: '/api/auth/admins' }
        ];

        for (const ut of unauthTests) {
            const res = await request(ut.path, { method: ut.method, body: ut.body });
            assert(res.status === 401, `${ut.method} ${ut.path} blocked with 401 Unauthorized`);
        }

        // --- 8. Authenticated Admin Workflows ---
        console.log('\nSECTION 8: Authenticated Admin Session & Workflow');
        const adminToken = signToken({
            email: PRIMARY_ADMIN_EMAIL,
            name: 'Muhammad Haerul',
            is_primary: true
        });

        const authAdminsRes = await request('/api/auth/admins', { token: adminToken });
        assert(authAdminsRes.status === 200 && authAdminsRes.body.success, 'GET /api/auth/admins allowed with valid admin JWT');

        const authMeRes = await request('/api/auth/me', { token: adminToken });
        assert(authMeRes.status === 200 && authMeRes.body.success && authMeRes.body.user.email === PRIMARY_ADMIN_EMAIL, 'GET /api/auth/me confirms admin identity');

        // --- 9. Dynamic Form Creation, Fetch, Submission, Responses & Teardown ---
        console.log('\nSECTION 9: Dynamic Form End-to-End Cycle');
        const timestamp = Date.now();
        const createFormRes = await request('/api/forms', {
            method: 'POST',
            token: adminToken,
            body: {
                title: `Local Audit Form ${timestamp}`,
                description: 'Pre-check test form',
                type: 'feedback',
                tag: 'audit-test'
            }
        });
        assert(createFormRes.status === 201 && createFormRes.body.success, 'Admin creates form with 201');
        const createdForm = createFormRes.body.data;
        const formId = createdForm.id;
        const formSlug = createdForm.slug;

        const getFormRes = await request(`/api/forms/${formSlug}`);
        assert(getFormRes.status === 200 && getFormRes.body.data.slug === formSlug, 'Public can fetch form by slug');

        const fields = getFormRes.body.data.fields;
        const responseData = {};
        if (fields && fields.length > 0) {
            responseData[fields[0].id] = 'Audit Tester';
            if (fields[1]) responseData[fields[1].id] = 'test@example.com';
            if (fields[2]) responseData[fields[2].id] = 10;
        }

        const submitFormRes = await request(`/api/forms/${formSlug}/responses`, {
            method: 'POST',
            body: { data: responseData }
        });
        assert(submitFormRes.status === 201 && submitFormRes.body.success, 'Public can submit form response');

        const getResponsesRes = await request(`/api/forms/${formId}/responses`, { token: adminToken });
        assert(getResponsesRes.status === 200 && getResponsesRes.body.data.length >= 1, 'Admin can view submitted responses');

        const deleteFormRes = await request(`/api/forms/${formId}`, {
            method: 'DELETE',
            token: adminToken
        });
        assert(deleteFormRes.status === 200 && deleteFormRes.body.success, 'Admin cleanly cleans up test form');

        // --- 10. Visual Gallery End-to-End CRUD Cycle ---
        console.log('\nSECTION 10: Visual Gallery End-to-End CRUD Cycle');
        const createGalRes = await request('/api/gallery', {
            method: 'POST',
            token: adminToken,
            body: {
                title: `Audit Gallery Photo ${timestamp}`,
                description: 'Pre-check test photo',
                category: 'Activity Documentation',
                image_url: '/assets/images/muhammad-haerul-workshop-ai-web-engineering.webp',
                date: 'November 2026',
                location: 'Audit Venue',
                tags: ['AI', 'Audit'],
                sort_order: 999
            }
        });
        assert(createGalRes.status === 201 && createGalRes.body.success && createGalRes.body.data.id, 'Admin creates gallery photo (POST 201)');
        const galPhotoId = createGalRes.body.data.id;

        const updateGalRes = await request(`/api/gallery/${galPhotoId}`, {
            method: 'PUT',
            token: adminToken,
            body: {
                title: `Audit Gallery Photo Updated ${timestamp}`,
                category: 'Posters & Flyers',
                sort_order: 10
            }
        });
        assert(updateGalRes.status === 200 && updateGalRes.body.success && updateGalRes.body.data.category === 'Posters & Flyers', 'Admin updates gallery photo (PUT 200)');

        const filterGalRes = await request(`/api/gallery?category=${encodeURIComponent('Posters & Flyers')}`);
        assert(filterGalRes.status === 200 && filterGalRes.body.data.some(i => i.id === galPhotoId), 'Public can filter gallery photos by category');

        const deleteGalRes = await request(`/api/gallery/${galPhotoId}`, {
            method: 'DELETE',
            token: adminToken
        });
        assert(deleteGalRes.status === 200 && deleteGalRes.body.success, 'Admin cleanly deletes gallery photo (DELETE 200)');

        // --- 11. 404 & Error Handling ---
        console.log('\nSECTION 11: 404 Routing & Error Handling');
        const notFoundRes = await request('/api/non-existent-route-999');
        assert(notFoundRes.status === 404 && notFoundRes.body.success === false, 'Non-existent API endpoint returns 404 JSON');

        const notFoundJsonRes = await request('/non-existent-page-xyz', {
            headers: { 'Accept': 'application/json' }
        });
        assert(notFoundJsonRes.status === 404 && notFoundJsonRes.body.success === false, 'Accept: application/json unknown route returns 404 JSON');

        const notFoundWebRes = await request('/this-page-does-not-exist-xyz');
        assert(notFoundWebRes.status === 302 && notFoundWebRes.headers['location'] === '/dashboard', 'Non-existent web route gracefully redirects to /dashboard (302)');

        console.log('\n================================================================');
        console.log(` AUDIT SUMMARY: Total: ${total} | Passed: ${passed} | Failed: ${failed}`);
        console.log('================================================================');

        if (failed > 0) {
            process.exit(1);
        } else {
            console.log('🎉 ALL AUDIT PRE-CHECKS PASSED WITH ZERO ERRORS!');
            process.exit(0);
        }
    } catch (err) {
        console.error('Audit encountered unexpected failure:', err);
        process.exit(1);
    }
}

runComprehensiveAudit();
