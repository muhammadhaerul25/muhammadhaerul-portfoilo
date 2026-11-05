const assert = require('assert');
const path = require('path');
const fs = require('fs');
const { signToken } = require('../../src/utils/token');
const prisma = require('../../src/config/db');

const BASE_URL = 'http://localhost:4000';
const PRIMARY_ADMIN_EMAIL = (process.env.PRIMARY_ADMIN_EMAIL || 'haerulmuhammad01@gmail.com').toLowerCase().trim();

async function runGalleryCrudTest() {
    console.log('================================================================');
    console.log('            VISUAL GALLERY COMPREHENSIVE CRUD TEST              ');
    console.log('================================================================');

    const adminToken = signToken({
        email: PRIMARY_ADMIN_EMAIL,
        name: 'Muhammad Haerul',
        role: 'primary_owner'
    });

    let createdItem1Id = null;
    let createdItem2Id = null;

    try {
        // --- 1. Test Security / Unauthorized Protection ---
        console.log('\nSTEP 1: Security & Auth Gate Check');
        const unauthPost = await fetch(`${BASE_URL}/api/gallery`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Hacked Item', image_url: '/dummy.jpg' })
        });
        assert.strictEqual(unauthPost.status, 401, 'POST /api/gallery must block unauthenticated requests with 401');
        console.log('  [PASS] POST /api/gallery blocked with 401');

        const unauthPut = await fetch(`${BASE_URL}/api/gallery/dummy-id`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Hacked Item' })
        });
        assert.strictEqual(unauthPut.status, 401, 'PUT /api/gallery/:id must block unauthenticated requests with 401');
        console.log('  [PASS] PUT /api/gallery/:id blocked with 401');

        const unauthDel = await fetch(`${BASE_URL}/api/gallery/dummy-id`, {
            method: 'DELETE'
        });
        assert.strictEqual(unauthDel.status, 401, 'DELETE /api/gallery/:id must block unauthenticated requests with 401');
        console.log('  [PASS] DELETE /api/gallery/:id blocked with 401');

        // --- 2. Test READ (Public) ---
        console.log('\nSTEP 2: READ Public Gallery');
        const readRes = await fetch(`${BASE_URL}/api/gallery`);
        assert.strictEqual(readRes.status, 200, 'GET /api/gallery must return 200');
        const readData = await readRes.json();
        assert.strictEqual(readData.success, true, 'GET /api/gallery response.success must be true');
        assert(Array.isArray(readData.data), 'readData.data must be an array');
        assert(readData.data.length >= 24, `Expected at least 24 gallery items, got ${readData.data.length}`);
        console.log(`  [PASS] GET /api/gallery returned ${readData.data.length} photos with ${readData.categories.length} categories`);

        // --- 3. Test CREATE with JSON (URL) ---
        console.log('\nSTEP 3: CREATE Gallery Photo via JSON (URL)');
        const createPayload = {
            title: 'Test Automated Photo (JSON URL)',
            description: 'Automated test description for CRUD verification',
            category: 'Activity Documentation',
            image_url: '/assets/images/muhammad-haerul-workshop-ai-web-engineering.webp',
            date: 'November 2026',
            location: 'Makassar Tech Center',
            tags: ['AI', 'Workshop', 'Test'],
            sort_order: 999
        };

        const createRes = await fetch(`${BASE_URL}/api/gallery`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`
            },
            body: JSON.stringify(createPayload)
        });

        assert.strictEqual(createRes.status, 201, `Expected 201 Created, got ${createRes.status}`);
        const createData = await createRes.json();
        assert.strictEqual(createData.success, true, 'Create response success must be true');
        assert(createData.data && createData.data.id, 'Created item must have an id');
        createdItem1Id = createData.data.id;
        assert.strictEqual(createData.data.title, createPayload.title);
        assert.strictEqual(createData.data.category, createPayload.category);
        assert.deepStrictEqual(createData.data.tags, createPayload.tags);
        console.log(`  [PASS] CREATE via JSON succeeded with ID: ${createdItem1Id}`);

        // --- 4. Test CREATE with Multipart/FormData (File Upload) ---
        console.log('\nSTEP 4: CREATE Gallery Photo via Multipart File Upload');
        // Create a small dummy webp image buffer
        const dummyBuffer = Buffer.from('RIFF200000WEBPVP8X0a000000100000000000', 'binary');
        const blob = new Blob([dummyBuffer], { type: 'image/webp' });
        const formData = new FormData();
        formData.append('title', 'Test Automated Photo (File Upload)');
        formData.append('category', 'Posters & Flyers');
        formData.append('image', blob, 'test_upload_crud.webp');
        formData.append('date', 'December 2026');
        formData.append('location', 'Jakarta International Expo');
        formData.append('tags', 'Cloud, AI, Event');
        formData.append('description', 'Uploaded via FormData');
        formData.append('sort_order', '998');

        const uploadRes = await fetch(`${BASE_URL}/api/gallery`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${adminToken}`
            },
            body: formData
        });

        assert.strictEqual(uploadRes.status, 201, `Expected 201 Created on file upload, got ${uploadRes.status}`);
        const uploadData = await uploadRes.json();
        assert.strictEqual(uploadData.success, true, 'File upload response success must be true');
        assert(uploadData.data && uploadData.data.id, 'Uploaded item must have an id');
        createdItem2Id = uploadData.data.id;
        assert.strictEqual(uploadData.data.title, 'Test Automated Photo (File Upload)');
        assert(uploadData.data.image_url.includes('/uploads/talks/'), 'image_url should point to uploaded file');
        console.log(`  [PASS] CREATE via File Upload succeeded with ID: ${createdItem2Id} (${uploadData.data.image_url})`);

        // --- 5. Test UPDATE (PUT) ---
        console.log('\nSTEP 5: UPDATE Gallery Photo (PUT)');
        const updatePayload = {
            title: 'Test Automated Photo (UPDATED TITLE)',
            category: 'Certificates & Awards',
            sort_order: 100,
            location: 'Makassar Government Center (MGC)'
        };

        const updateRes = await fetch(`${BASE_URL}/api/gallery/${createdItem1Id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`
            },
            body: JSON.stringify(updatePayload)
        });

        assert.strictEqual(updateRes.status, 200, `Expected 200 OK on update, got ${updateRes.status}`);
        const updateData = await updateRes.json();
        assert.strictEqual(updateData.success, true, 'Update response success must be true');
        assert.strictEqual(updateData.data.title, updatePayload.title);
        assert.strictEqual(updateData.data.category, updatePayload.category);
        assert.strictEqual(updateData.data.location, updatePayload.location);
        assert.strictEqual(updateData.data.sort_order, updatePayload.sort_order);
        console.log(`  [PASS] UPDATE succeeded: title and category properly mutated`);

        // --- 6. Test CATEGORY FILTER ---
        console.log('\nSTEP 6: Category Filter Query');
        const filterRes = await fetch(`${BASE_URL}/api/gallery?category=${encodeURIComponent('Certificates & Awards')}`);
        assert.strictEqual(filterRes.status, 200);
        const filterData = await filterRes.json();
        assert(filterData.data.some(i => i.id === createdItem1Id), 'Updated item should appear in Certificates & Awards filter');
        console.log(`  [PASS] Filter query returned ${filterData.data.length} items correctly containing updated item`);

        // --- 7. Test DELETE ---
        console.log('\nSTEP 7: DELETE Gallery Photos (Teardown)');
        const delRes1 = await fetch(`${BASE_URL}/api/gallery/${createdItem1Id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${adminToken}` }
        });
        assert.strictEqual(delRes1.status, 200, `Expected 200 OK on DELETE, got ${delRes1.status}`);
        const delData1 = await delRes1.json();
        assert.strictEqual(delData1.success, true);
        console.log(`  [PASS] DELETE ${createdItem1Id} succeeded`);

        const delRes2 = await fetch(`${BASE_URL}/api/gallery/${createdItem2Id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${adminToken}` }
        });
        assert.strictEqual(delRes2.status, 200, `Expected 200 OK on DELETE, got ${delRes2.status}`);
        const delData2 = await delRes2.json();
        assert.strictEqual(delData2.success, true);
        console.log(`  [PASS] DELETE ${createdItem2Id} succeeded`);

        // Clean up uploaded file if created
        if (uploadData.data && uploadData.data.image_url) {
            const relPath = uploadData.data.image_url.startsWith('/') ? uploadData.data.image_url.slice(1) : uploadData.data.image_url;
            const fullPath = path.join(__dirname, '../../public', relPath);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
                console.log(`  [CLEANUP] Deleted uploaded test image: ${relPath}`);
            }
        }

        // Verify items no longer exist in DB
        const verifyDb = await prisma.galleryItem.findMany({
            where: { id: { in: [createdItem1Id, createdItem2Id] } }
        });
        assert.strictEqual(verifyDb.length, 0, 'Deleted items must not exist in DB');
        console.log('  [PASS] Verified items completely purged from database');

        console.log('\n================================================================');
        console.log('   ALL 7 CRUD & SECURITY VERIFICATION STEPS PASSED 100%!        ');
        console.log('================================================================\n');
        process.exit(0);
    } catch (err) {
        console.error('\n[FAIL] Gallery CRUD Verification failed:', err);
        // Attempt cleanup in case of failure
        if (createdItem1Id || createdItem2Id) {
            try {
                await prisma.galleryItem.deleteMany({
                    where: { id: { in: [createdItem1Id, createdItem2Id].filter(Boolean) } }
                });
            } catch (_) {}
        }
        process.exit(1);
    }
}

runGalleryCrudTest();
