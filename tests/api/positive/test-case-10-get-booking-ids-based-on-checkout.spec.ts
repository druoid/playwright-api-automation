import { test, expect } from '@playwright/test';
import { makeGetRequest, makePostRequest } from '../../../utils/apitUtil';
import { createBookingData } from '../../../utils/dataFactory';

test('Get booking ids based on check out date', async ({ baseURL }) => {
  // Create booking  
  const endpoint = '/booking';
  const createBookingUrl = `${baseURL}${endpoint}`;
  
  const response = await makePostRequest(createBookingUrl, createBookingData());
  expect(response.status()).toEqual(200);

  const responseBody = await response.json();
  console.log(responseBody);
  const checkout: string = responseBody.booking.bookingdates.checkout;
  
  const bookingByIdUrl = `${baseURL}${endpoint}?checkout=${checkout}`;
  console.log(bookingByIdUrl);

  // Get booking by ID
  const getResponse = await makeGetRequest(bookingByIdUrl);
  expect(getResponse.status()).toEqual(200);
  
  const getResponseBody = await getResponse.json();
  console.log(getResponseBody);

  expect(Array.isArray(getResponseBody)).toBe(true);

  const count = Object.keys(getResponseBody).length;

  console.log(count);

  expect(count).toBeGreaterThanOrEqual(1);
});

