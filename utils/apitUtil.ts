import { request } from '@playwright/test';

export async function makeGetRequest(url: string, _headers: object = {}) {
  const context = await request.newContext();
  const response = await context.get(url, { headers: { 'Accept': 'application/json'} });
  return response;
}

export async function makePostRequest(url: string, payload: object, _headers: object = {} ) {
  const context = await request.newContext();
  const response = await context.post(url, { 
    data: payload,
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    },
  });
  return response;
}

export async function makePutRequest(url: string, payload: object, authToken: string) {
  const context = await request.newContext();
  const response = await context.put(url, {
    data: payload,
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cookie': `token=${authToken}`,
    },
  });
  return response;
}

export async function makeDeleteRequest(url: string, authToken: string) {
  const context = await request.newContext();
  const response = await context.delete(url, {
    headers: {
    'Content-Type': 'application/json',
    'Cookie': `token=${authToken}`,
    },
  }); 
  return response;
}

export async function makePatchRequest(url: string, payload: object, authToken: string) {
  const context = await request.newContext();
  const response = await context.patch(url, {
    data: payload,
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cookie': `token=${authToken}`,
    },
  });
  return response;
}