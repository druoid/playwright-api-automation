import { test, expect } from '@playwright/test';
import { makePostRequest, makeGetRequest } from '../../../utils/apitUtil';
import { createBookingData } from '../../../utils/dataFactory';
import AjvDraft04 from 'ajv-draft-04';
import * as fs from 'fs';
import * as path from 'path';

test('Get booking valid schema validation', async ({ baseURL }) => {
  // Load the JSON schema from a file
  const schemaPath = path.resolve('schemas/getBookingJsonSchema.json');
  const schemaData = fs.readFileSync(schemaPath, 'utf-8');
  const userSchema = JSON.parse(schemaData);    

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

  // Parse the response JSON
  const responseData = await getResponse.json();

  // Initialize Ajv with Draft 4 support
  const ajv = new AjvDraft04();

  // Validate the response against the schema
  const validate = ajv.compile(userSchema);
  const valid = validate(responseData);

  // Assert that the response matches the schema
  expect(valid).toBe(true);

  if (!valid) {
    console.error(validate.errors);
  }
});