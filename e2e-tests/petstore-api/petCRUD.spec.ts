import { test, expect } from '@playwright/test';

test.describe('Petstore API CRUD Tests', () => {
  const safePetId = Math.floor(Math.random() * 1000000); 
  let dynamicPetId: number;

  const petPayload = {
    category: { id: 1, name: "Dogs" },
    name: "Rex",
    photoUrls: ["https://example.com/rex.jpg"],
    tags: [{ id: 1, name: "friendly" }],
    status: "available"
  };

  // SETUP: Create a pet before running tests
  test.beforeAll(async ({ request }) => {
    const response = await request.post('/v2/pet', { 
      data: { ...petPayload, id: safePetId } 
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    dynamicPetId = body.id;
    console.log(`Test Execution started with Safe Pet ID: ${dynamicPetId}`);
  });

  // --- POSITIVE SCENARIOS ---

  test('POST /v2/pet - Positive: Create a new pet', async ({ request }) => {
    const response = await request.post('/v2/pet', { 
      data: { ...petPayload, id: Math.floor(Math.random() * 1000000) } 
    });
    expect(response.status()).toBe(200);
  });

  test('GET /v2/pet/{petId} - Positive: Fetch existing pet', async ({ request }) => {
    const response = await request.get(`/v2/pet/${dynamicPetId}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(dynamicPetId);
  });

  test('PUT /v2/pet - Positive: Update existing pet', async ({ request }) => {
    const updatedPet = { ...petPayload, id: dynamicPetId, status: "sold" };
    
    const response = await request.put('/v2/pet', { data: updatedPet });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.status).toBe("sold");
  });

  test('POST /v2/pet/{petId} - Positive: Update with Form Data', async ({ request }) => {
    const response = await request.post(`/v2/pet/${dynamicPetId}`, {
      headers: {
        'api_key': 'special-key',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: { 
        name: "RexUpdated", 
        status: "pending" 
      }
    });
    expect(response.status()).toBe(200);
  });

  // --- NEGATIVE SCENARIOS ---

  test('GET /v2/pet/{petId} - Negative: Pet not found (404)', async ({ request }) => {
    // Use an ID that definitely doesn't exist
    const response = await request.get('/v2/pet/0'); 
    expect(response.status()).toBe(404);
  });

  test('POST /v2/pet - Negative: Invalid Input (400)', async ({ request }) => {
    const response = await request.post('/v2/pet', { 
      data: "This is a plain string, not JSON" 
    });
    // API usually returns 400 for bad formatting or 415 for wrong media type
    expect(response.status()).toBe(400);
  });

  test('DELETE /v2/pet/{petId} - Negative: Invalid ID format (404)', async ({ request }) => {
    // Passing text instead of a numeric ID
    const response = await request.delete('/v2/pet/not-a-number');
    expect(response.status()).toBe(404);
  });

  // --- FINAL CLEANUP ---

  test('DELETE /v2/pet/{petId} - Positive: Delete the pet', async ({ request }) => {
    const response = await request.delete(`/v2/pet/${dynamicPetId}`, {
      headers: { 'api_key': 'special-key' }
    });
    expect(response.status()).toBe(200);

    // Final verification
    const verify = await request.get(`/v2/pet/${dynamicPetId}`);
    expect(verify.status()).toBe(404);
  });
});