import { test, expect } from '@playwright/test';
import { makePostRequest } from '../../../utils/apitUtil';
import { createBookingData } from '../../../utils/dataFactory';

test('Create booking - incorrect endpoint - returns 404', async ({ baseURL }) => {
  const endpoint = '/hello';
  const url = `${baseURL}${endpoint}`; // Use baseURL from the config
  const response = await makePostRequest(url, createBookingData());

  expect(response.status()).toEqual(404);
});