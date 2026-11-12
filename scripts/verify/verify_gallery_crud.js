require('dotenv/config');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:4000';

async function runGalleryCrudVerification() {
    console.log('====================================================');
    console.log('       GALLERY CRUD & SECURITY VERIFICATION         ');
    console.log('====================================================\n');

    let passed = 0;
    let failed = 0;

    function assert(cond, msg) {
        if (cond) {
            console.log(`✓ PASS: ${msg}`);
            passed++;
        } else {
            console.error(`✗ FAIL: ${msg}`);
            failed++;
        }
    }

    try {
        // 1. Check GET /api/gallery (Public)
        console.log('[1] Testing GET /api/gallery (Public read)...');
        const listRes = await fetch(`${BASE_URL}/api/gallery`);
        assert(listRes.status === 200, 'GET /api/gallery returns 200 OK');
        const listData = await listRes.json();
        assert(listData.success === true, 'Response success is true');
        assert(Array.isArray(listData.data), 'Returns array of gallery items');
        console.log(`    Current gallery count: ${listData.count}, categories: ${listData.categories.join(', ')}\n`);

        // 2. Check Unauthorized Mutations (Security)
        console.log('[2] Testing unauthorized mutations are blocked...');
        const unauthCreate = await fetch(`${BASE_URL}/api/gallery`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Test Unauth', image_url: 'https://example.com/test.jpg' })
        });
        assert(unauthCreate.status === 401, 'POST /api/gallery without auth is blocked with 401');

        const unauthUpdate = await fetch(`${BASE_URL}/api/gallery/dummy-id`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Test Unauth' })
        });
        assert(unauthUpdate.status === 401, 'PUT /api/gallery/:id without auth is blocked with 401');

        const unauthDelete = await fetch(`${BASE_URL}/api/gallery/dummy-id`, {
            method: 'DELETE'
        });
        assert(unauthDelete.status === 401, 'DELETE /api/gallery/:id without auth is blocked with 401\n');

        // 3. Login to get Admin Session Token
        console.log('[3] Authenticating admin...');
        const authRes = await fetch(`${BASE_URL}/api/auth/login-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: 'HaerulPortfolio-2512' })
        });
        const authData = await authRes.json();
        assert(authRes.status === 200 && authData.success === true, 'Admin login succeeded');
        const token = authData.token;
        const cookie = authRes.headers.get('set-cookie');

        // 4. Create Gallery Item via JSON (POST /api/gallery)
        console.log('\n[4] Creating new gallery item via JSON...');
        const newPhotoPayload = {
            title: 'Automated Test: GenAI Workshop Stage',
            category: 'Activity Documentation',
            image_url: 'https://example.com/photos/genai-stage.jpg',
            date: 'November 2026',
            location: 'Grand Ballroom, Makassar',
            tags: ['GenAI', 'Workshop', 'Test'],
            description: 'Automated test stage photo for gallery CRUD verification.',
            sort_order: 99
        };

        const createRes = await fetch(`${BASE_URL}/api/gallery`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPhotoPayload)
        });
        const createData = await createRes.json();
        assert(createRes.status === 201 && createData.success === true, 'POST /api/gallery returns 201 Created');
        assert(createData.data && createData.data.id, 'Created item has unique ID');
        assert(createData.data.title === newPhotoPayload.title, 'Created item has matching title');
        const createdId = createData.data.id;
        console.log(`    Created ID: ${createdId}\n`);

        // 5. Verify Created Item in GET /api/gallery
        console.log('[5] Verifying item exists in GET /api/gallery...');
        const verifyRes = await fetch(`${BASE_URL}/api/gallery`);
        const verifyData = await verifyRes.json();
        const foundItem = verifyData.data.find(i => i.id === createdId);
        assert(!!foundItem, 'Created item found in gallery list');
        assert(foundItem.location === newPhotoPayload.location, 'Location matches');
        assert(foundItem.sort_order === newPhotoPayload.sort_order, 'Sort order matches');

        // 6. Update Gallery Item via PUT /api/gallery/:id
        console.log('\n[6] Updating gallery item via PUT /api/gallery/:id...');
        const updatePayload = {
            title: 'Automated Test: GenAI Workshop Stage (Updated)',
            description: 'Updated description for test verification.',
            category: 'Posters & Flyers',
            location: 'Updated Location Makassar',
            sort_order: 50
        };

        const updateRes = await fetch(`${BASE_URL}/api/gallery/${createdId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatePayload)
        });
        const updateData = await updateRes.json();
        assert(updateRes.status === 200 && updateData.success === true, 'PUT /api/gallery/:id returns 200 OK');
        assert(updateData.data.title === updatePayload.title, 'Updated title matches');
        assert(updateData.data.category === updatePayload.category, 'Updated category matches');
        assert(updateData.data.sort_order === updatePayload.sort_order, 'Updated sort_order matches');

        // 7. Verify Cache Invalidation & Updated Item
        console.log('\n[7] Verifying updated item in GET /api/gallery...');
        const verifyUpdateRes = await fetch(`${BASE_URL}/api/gallery`);
        const verifyUpdateData = await verifyUpdateRes.json();
        const updatedItem = verifyUpdateData.data.find(i => i.id === createdId);
        assert(!!updatedItem, 'Item still present in gallery list');
        assert(updatedItem.title === updatePayload.title, 'Updated title is reflected');
        assert(updatedItem.category === updatePayload.category, 'Updated category is reflected');

        // 8. Delete Gallery Item via DELETE /api/gallery/:id
        console.log('\n[8] Deleting gallery item via DELETE /api/gallery/:id...');
        const deleteRes = await fetch(`${BASE_URL}/api/gallery/${createdId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const deleteData = await deleteRes.json();
        assert(deleteRes.status === 200 && deleteData.success === true, 'DELETE /api/gallery/:id returns 200 OK');

        // 9. Verify Deletion in GET /api/gallery
        console.log('\n[9] Verifying item is removed in GET /api/gallery...');
        const verifyDeleteRes = await fetch(`${BASE_URL}/api/gallery`);
        const verifyDeleteData = await verifyDeleteRes.json();
        const shouldBeNull = verifyDeleteData.data.find(i => i.id === createdId);
        assert(!shouldBeNull, 'Deleted item is no longer returned in GET /api/gallery');

        // 10. Test Multipart File Upload (FormData simulation)
        console.log('\n[10] Testing multipart image file upload...');
        const tempTestImgPath = path.join(__dirname, 'temp_test_gallery.png');
        // Create 1x1 transparent png
        const png1x1 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
        fs.writeFileSync(tempTestImgPath, png1x1);

        const formData = new FormData();
        formData.append('title', 'Automated Test: Uploaded File Photo');
        formData.append('category', 'Activity Documentation');
        formData.append('description', 'Uploaded via FormData test');
        formData.append('date', 'October 2026');
        formData.append('location', 'Studio Test');
        formData.append('sort_order', '95');
        const fileBlob = new Blob([png1x1], { type: 'image/png' });
        formData.append('image', fileBlob, 'temp_test_gallery.png');

        const uploadRes = await fetch(`${BASE_URL}/api/gallery`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });
        const uploadData = await uploadRes.json();
        assert(uploadRes.status === 201 && uploadData.success === true, 'POST /api/gallery with file returns 201 Created');
        assert(uploadData.data && uploadData.data.image_url.startsWith('/uploads/talks/'), 'Uploaded file path points to /uploads/talks/');
        const uploadedId = uploadData.data.id;

        // Clean up uploaded test item
        const cleanupRes = await fetch(`${BASE_URL}/api/gallery/${uploadedId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        assert(cleanupRes.status === 200, 'Uploaded test item deleted cleanly');

        if (fs.existsSync(tempTestImgPath)) fs.unlinkSync(tempTestImgPath);

        console.log('\n====================================================');
        console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
        console.log('====================================================');

        process.exit(failed > 0 ? 1 : 0);
    } catch (err) {
        console.error('Fatal Test Exception:', err);
        process.exit(1);
    }
}

runGalleryCrudVerification();

