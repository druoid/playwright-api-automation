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
  const checkout: string = responseBody.booking.bookingdates.checkout;
  
  const bookingByCheckOutDateUrl = `${baseURL}${endpoint}?checkout=${checkout}`;

  // Get booking by check out date
  const getResponse = await makeGetRequest(bookingByCheckOutDateUrl);
  expect(getResponse.status()).toEqual(200);
  
  const getResponseBody = await getResponse.json();

  expect(Array.isArray(getResponseBody)).toBe(true);

  const count = Object.keys(getResponseBody).length;

  expect(count).toBeGreaterThanOrEqual(1);
});

