import { test, expect } from '@playwright/test';
import { makeGetRequest } from '../../../utils/apitUtil';

test('Get booking ids - incorrect endpoint - returns 404', async ({ baseURL }) => {
  const endpoint = '/hello';
  const url = `${baseURL}${endpoint}`; // Use baseURL from the config
  const response = await makeGetRequest(url);

  expect(response.status()).toEqual(404);
});