import { test, expect } from '@playwright/test';
import { makeGetRequest } from '../../../utils/apitUtil';

test('Ping - health check', async ({ baseURL }) => {
  const endpoint = '/ping';
  const url = `${baseURL}${endpoint}`;
  const response = await makeGetRequest(url);

  expect(response.status()).toEqual(201);
});
