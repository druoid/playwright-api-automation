import { test, expect } from '@playwright/test';
import { makeGetRequest, makePostRequest } from '../../../utils/apitUtil';
import { createBookingData } from '../../../utils/dataFactory';

test('Get booking ids based on check in date', async ({ baseURL }) => {
  // Create booking  
  const endpoint = '/booking';
  const createBookingUrl = `${baseURL}${endpoint}`;
  
  const response = await makePostRequest(createBookingUrl, createBookingData());
  expect(response.status()).toEqual(200);

  const responseBody = await response.json();
  const checkin: string = responseBody.booking.bookingdates.checkin;
  
  const bookingByCheckInDateUrl = `${baseURL}${endpoint}?checkin=${checkin}`;

  // Get booking by ID
  const getResponse = await makeGetRequest(bookingByCheckInDateUrl);
  expect(getResponse.status()).toEqual(200);
  
  const getResponseBody = await getResponse.json();

  expect(Array.isArray(getResponseBody)).toBe(true);

  const count = Object.keys(getResponseBody).length;

  expect(count).toBeGreaterThanOrEqual(1);
});

