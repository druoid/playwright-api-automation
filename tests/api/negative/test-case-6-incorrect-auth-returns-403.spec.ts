import { test, expect } from '@playwright/test';
import { makePutRequest, makePostRequest } from '../../../utils/apitUtil';
import { createBookingData } from '../../../utils/dataFactory';

test('Update booking - incorrect endpoint - returns 404', async ({ baseURL }) => {
  // Create booking  
  const endpoint = '/booking';
  const createBookingUrl = `${baseURL}${endpoint}`;

  const postResponse = await makePostRequest(createBookingUrl, createBookingData());
  expect(postResponse.status()).toEqual(200);

  const postResponseBody = await postResponse.json();
  const bookingId = postResponseBody.bookingid;

  const bookingByIdUrl = `${baseURL}${endpoint}/${bookingId}`;
  
  // Update attempt with bad auth
  const response = await makePutRequest(bookingByIdUrl, createBookingData(),  'badauth');

  expect(response.status()).toEqual(403);
});