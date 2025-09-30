import { test, expect } from '@playwright/test';
import { makePutRequest } from '../../../utils/apitUtil';
import { getAuth } from '../../../utils/authUtil';
import { createBookingData } from '../../../utils/dataFactory';

test('Update booking - incorrect endpoint - returns 404', async ({ baseURL }) => {
  const endpoint = '/10000';
  const url = `${baseURL}${endpoint}`; // Use baseURL from the config
  
  // Get Auth
  const authResponse = getAuth();
  expect((await authResponse).status()).toEqual(200);
  const authResponseBody = await (await authResponse).json();
  
  const response = await makePutRequest(url, createBookingData(),  authResponseBody.token);

  expect(response.status()).toEqual(404);
});