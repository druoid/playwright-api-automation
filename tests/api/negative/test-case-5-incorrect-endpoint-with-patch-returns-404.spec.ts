import { test, expect } from '@playwright/test';
import { makePatchRequest } from '../../../utils/apitUtil';
import { getAuth } from '../../../utils/authUtil';

test('Partial update booking - incorrect endpoint - returns 404', async ({ baseURL }) => {
  const endpoint = '/10000';
  const url = `${baseURL}${endpoint}`; // Use baseURL from the config
  
  // Get Auth
  const authResponse = getAuth();
  expect((await authResponse).status()).toEqual(200);
  const authResponseBody = await (await authResponse).json();

  const payload = {
    "firstname" : "James",
    "lastname" : "Brown"
  };
  
  const response = await makePatchRequest(url, payload,  authResponseBody.token);

  expect(response.status()).toEqual(404);
});