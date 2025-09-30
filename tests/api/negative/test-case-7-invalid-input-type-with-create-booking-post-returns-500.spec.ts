import { test, expect } from '@playwright/test';
import { makePostRequest } from '../../../utils/apitUtil';

test('Create booking - incorrect input type - returns 500', async ({ baseURL }) => {
  const endpoint = '/booking';
  const url = `${baseURL}${endpoint}`;

  const payload = {
    "firstname" : 1,
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
}
  const response = await makePostRequest(url, payload);

  expect(response.status()).toEqual(500);
});