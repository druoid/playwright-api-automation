import { test, expect } from '@playwright/test';
import { makeGetRequest } from '../../../utils/apitUtil';

test('Get booking ids correct endpoint', async ({ baseURL }) => {
  const endpoint = '/booking';
  const url = `${baseURL}${endpoint}`;
  const response = await makeGetRequest(url);

  expect(response.status()).toEqual(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);

  responseBody.forEach((booking: object) => {
    expect(booking).toHaveProperty('bookingid');
  });
});

