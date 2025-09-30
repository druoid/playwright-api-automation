import { test, expect } from '@playwright/test';
import { makeGetRequest, makePostRequest } from '../../../utils/apitUtil';
import { createBookingData } from '../../../utils/dataFactory';

test('Get booking ids based on last name', async ({ baseURL }) => {
  // Create booking  
  const endpoint = '/booking';
  const createBookingUrl = `${baseURL}${endpoint}`;
  
  const response = await makePostRequest(createBookingUrl, createBookingData());
  expect(response.status()).toEqual(200);

  const responseBody = await response.json();
  const lastName = responseBody.booking.lastname;
  
  const bookingByLastNameUrl = `${baseURL}${endpoint}?lastname=${lastName}`;

  // Get booking by lastname
  const getResponse = await makeGetRequest(bookingByLastNameUrl);
  expect(getResponse.status()).toEqual(200);
  
  const getResponseBody = await getResponse.json();

  expect(Array.isArray(getResponseBody)).toBe(true);

  const count = Object.keys(getResponseBody).length;

  expect(count).toEqual(1);
});

