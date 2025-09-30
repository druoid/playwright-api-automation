import { test, expect } from '@playwright/test';
import { makeDeleteRequest, makePostRequest, makePatchRequest, makeGetRequest } from '../../../utils/apitUtil';
import { getAuth } from '../../../utils/authUtil';
import { createBookingData } from '../../../utils/dataFactory';

test('Update booking by id', async ({ baseURL }) => {
  // Create booking  
  const endpoint = '/booking';
  const createBookingUrl = `${baseURL}${endpoint}`;
  
  const postResponse = await makePostRequest(createBookingUrl, createBookingData());
  expect(postResponse.status()).toEqual(200);

  const postResponseBody = await postResponse.json();
  const bookingId = postResponseBody.bookingid;
  
  const bookingByIdUrl = `${baseURL}${endpoint}/${bookingId}`;

  // Get booking by ID
  const getResponse = await makeGetRequest(bookingByIdUrl);
  expect(getResponse.status()).toEqual(200);

  // Get Auth
  const authResponse = getAuth();
  expect((await authResponse).status()).toEqual(200);
  const authResponseBody = await (await authResponse).json();

  // Partial update of booking by ID
  const payload = {
    "firstname" : "James",
    "lastname" : "Brown"
  };
  
  const updateResponse = await makePatchRequest(bookingByIdUrl, payload, authResponseBody.token)
  expect(updateResponse.status()).toEqual(200);

  // Get booking by ID again 
  const getResponsePostUpdate = await makeGetRequest(bookingByIdUrl);
  expect(getResponsePostUpdate.status()).toEqual(200);

  // Delete booking by ID
  const deleteResponse = await makeDeleteRequest(bookingByIdUrl, authResponseBody.token)
  expect(deleteResponse.status()).toEqual(201);

  // Get booking by ID again to make sure it's deleted
  const getResponsePostDelete = await makeGetRequest(bookingByIdUrl);
  expect(getResponsePostDelete.status()).toEqual(404);
});