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
  console.log(responseBody);
  const firstName = responseBody.booking.firstname;
  
  const bookingByIdUrl = `${baseURL}${endpoint}?firstname=${firstName}`;
  console.log(bookingByIdUrl);


  // Get booking by ID
  const getResponse = await makeGetRequest(bookingByIdUrl);
  expect(getResponse.status()).toEqual(200);
  
  const getResponseBody = await getResponse.json();
  console.log(getResponseBody);

  expect(Array.isArray(getResponseBody)).toBe(true);

  const count = Object.keys(getResponseBody).length;

  console.log(count);

  expect(count).toEqual(1);
});
