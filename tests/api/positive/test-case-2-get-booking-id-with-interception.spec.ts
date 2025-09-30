import { test, expect } from '@playwright/test';

test('Should intercept and return custom response for /booking endpoint - get booking by id', async ({ page, baseURL }) => {
  const endpoint = '/booking/1';
  const url = `${baseURL}${endpoint}`; 

  // Intercept the request and provide a custom response
  await page.route(url, (route) => {
    const customResponse = {
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { bookingid: 1 }
      ]),

    };
    route.fulfill(customResponse);
  });

  // Use page.goto to trigger the request interception
  const response = await page.goto(url);
  
  // Check if response is not null
  if (response) {
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody).toEqual([
      { bookingid: 1 }
    ]);
  } else {
    throw new Error('Navigation failed, response is null');
  }
});