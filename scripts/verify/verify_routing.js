const http = require('http');
const app = require('../../src/app');
const prisma = require('../../src/config/db');
const { signToken } = require('../../src/utils/token');
const { PRIMARY_ADMIN_EMAIL } = require('../../src/middlewares/auth');

const adminToken = signToken({
    email: PRIMARY_ADMIN_EMAIL,
    name: 'Muhammad Haerul',
    is_primary: true
});

async function testRequest(server, path, options = {}) {
    const port = server.address().port;
    return new Promise((resolve, reject) => {
        const headers = { ...(options.headers || {}) };
        if (options.auth) {
            headers['Authorization'] = `Bearer ${adminToken}`;
        }
        if (options.body && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }

        const req = http.request(`http://127.0.0.1:${port}${path}`, { ...options, headers }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                let json = null;
                try { json = JSON.parse(data); } catch (e) {}
                resolve({
                    statusCode: res.statusCode,
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

async function runComprehensiveTests() {
    console.log('Starting Full End-to-End Routing & Portfolio API Verification...\n');
    const server = app.listen(0);
    let passed = 0;
    let failed = 0;

    function assert(condition, message) {
        if (condition) {
            console.log(`  [PASS] ${message}`);
            passed++;
        } else {
            console.error(`  [FAIL] ${message}`);
            failed++;
        }
    }

    try {
        // 1. Healthcheck & System Metrics
        console.log('1. Testing /api/health and /api/keep-alive');
        const health = await testRequest(server, '/api/health');
        assert(health.statusCode === 200, 'Status code is 200');
        assert(health.body.success === true, 'Healthcheck success is true');
        assert(health.body.database && health.body.database.status === 'healthy', 'Database status is healthy');
        assert(health.headers['x-response-time'] !== undefined, 'X-Response-Time header is present');

        const keepAlive = await testRequest(server, '/api/keep-alive');
        assert(keepAlive.statusCode === 200, 'Keep-Alive status code is 200');
        assert(keepAlive.body.success === true, 'Keep-Alive success is true');

        // 2. Forms Lifecycle (Authenticated Admin)
        console.log('\n2. Testing Form Creation, Slug Fetch, Response Submission, and Cleanup');
        const createFormRes = await testRequest(server, '/api/forms', {
            method: 'POST',
            auth: true,
            body: {
                title: `Automated Test Form ${Date.now()}`,
                description: 'Test Description',
                type: 'feedback',
                tag: 'automated-test'
            }
        });
        assert(createFormRes.statusCode === 201 && createFormRes.body.success, 'Form created with 201 Created');
        const createdForm = createFormRes.body.data;
        const formId = createdForm.id;
        const formSlug = createdForm.slug;

        const getFormRes = await testRequest(server, `/api/forms/${formSlug}`);
        assert(getFormRes.statusCode === 200 && getFormRes.body.data.id === formId, 'Form retrieved by slug');
        assert(getFormRes.body.data.fields.length > 0, 'Form fields loaded automatically');

        const field0 = getFormRes.body.data.fields[0];
        const field1 = getFormRes.body.data.fields[1];
        const field2 = getFormRes.body.data.fields[2];
        const submitRes = await testRequest(server, `/api/forms/${formSlug}/responses`, {
            method: 'POST',
            body: {
                data: {
                    [field0.id]: 'Tester Name',
                    [field1.id]: 'tester@example.com',
                    [field2.id]: '10'
                }
            }
        });
        assert(submitRes.statusCode === 201 && submitRes.body.success, 'Response submitted successfully');

        const getResponsesRes = await testRequest(server, `/api/forms/${formId}/responses`, { auth: true });
        assert(getResponsesRes.statusCode === 200 && getResponsesRes.body.data.length > 0, 'Form responses retrieved');

        const deleteFormRes = await testRequest(server, `/api/forms/${formId}`, { method: 'DELETE', auth: true });
        assert(deleteFormRes.statusCode === 200 && deleteFormRes.body.success, 'Form deleted successfully');

        // 3. Portfolio Resource Endpoints
        console.log('\n3. Testing All Portfolio Resource APIs');
        const apiEndpoints = [
            '/api/portfolio/bootstrap',
            '/api/settings',
            '/api/educations',
            '/api/experiences',
            '/api/projects',
            '/api/skills',
            '/api/talks',
            '/api/certifications',
            '/api/awards',
            '/api/publications',
            '/api/feedbacks',
            '/api/blogs',
            '/api/gallery'
        ];
        for (const ep of apiEndpoints) {
            const res = await testRequest(server, ep);
            assert(res.statusCode === 200 && res.body && res.body.success !== false, `GET ${ep} returns 200 OK`);
        }

        // Verify RRI Mamuju Talk audience is 910
        const talksRes = await testRequest(server, '/api/talks');
        const rriTalk = (talksRes.body.data || []).find(t => (t.event || t.title || '').includes('Kita Indonesia'));
        assert(rriTalk && Number(rriTalk.jumlah_peserta) === 910, 'RRI Mamuju talk has jumlah_peserta === 910');

        // Verify Experience accent_color consistency
        const expRes = await testRequest(server, '/api/experiences');
        const allExpHaveYearVar = (expRes.body.data || []).every(e => (e.accent_color || '').startsWith('var(--year-'));
        assert(allExpHaveYearVar, 'All experiences use unified var(--year-XXXX) accent_color');

        // 4. HTML Pages & Document Routes
        console.log('\n4. Testing HTML Page & Document Routes');
        const pageChecks = [
            { path: '/', contains: 'Muhammad Haerul' },
            { path: '/dashboard', contains: 'dashboard-layout' },
            { path: '/browse', contains: 'browse' },
            { path: '/projects', contains: 'browse' },
            { path: '/talks', contains: 'browse' },
            { path: '/certifications', contains: 'browse' },
            { path: '/awards', contains: 'browse' },
            { path: '/publications', contains: 'browse' },
            { path: '/feedback', contains: 'Feedback' }
        ];
        for (const pg of pageChecks) {
            const res = await testRequest(server, pg.path);
            assert(res.statusCode === 200 && typeof res.body === 'string' && res.body.includes(pg.contains), `GET ${pg.path} serves valid HTML`);
        }

        console.log(`\n========================================`);
        console.log(`Total tests: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`);
        console.log(`========================================\n`);

    } catch (err) {
        console.error('Lifecycle test error:', err);
        failed++;
    } finally {
        await prisma.feedbacks.deleteMany({
            where: {
                OR: [
                    { nama_lengkap: { contains: 'Tester Name', mode: 'insensitive' } },
                    { email: { contains: 'tester@example.com', mode: 'insensitive' } }
                ]
            }
        });
        await prisma.forms.deleteMany({
            where: {
                OR: [
                    { title: { contains: 'Automated Test Form', mode: 'insensitive' } },
                    { tag: 'automated-test' }
                ]
            }
        });
        server.close();
        await prisma.$disconnect();
        process.exit(failed > 0 ? 1 : 0);
    }
}

runComprehensiveTests();
