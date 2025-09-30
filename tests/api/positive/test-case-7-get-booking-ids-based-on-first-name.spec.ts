import { test, expect } from '@playwright/test';
import { makeGetRequest, makePostRequest } from '../../../utils/apitUtil';
import { createBookingData } from '../../../utils/dataFactory';

test('Get booking ids based on first name', async ({ baseURL }) => {
  // Create booking  
  const endpoint = '/booking';
  const createBookingUrl = `${baseURL}${endpoint}`;
  
  const response = await makePostRequest(createBookingUrl, createBookingData());
  expect(response.status()).toEqual(200);

  const responseBody = await response.json();
  const firstName = responseBody.booking.firstname;
  
  const bookingByFirstNameUrl = `${baseURL}${endpoint}?firstname=${firstName}`;

  // Get booking by ID
  const getResponse = await makeGetRequest(bookingByFirstNameUrl);
  expect(getResponse.status()).toEqual(200);
  
  const getResponseBody = await getResponse.json();

  expect(Array.isArray(getResponseBody)).toBe(true);

  const count = Object.keys(getResponseBody).length;

  expect(count).toEqual(1);
});
