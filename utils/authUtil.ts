import { request } from '@playwright/test';

export async function getAuth() {
  const context = await request.newContext();
  const response = await context.post('https://restful-booker.herokuapp.com/auth', {
    data: {
        "username": "admin",
        "password": "password123"
    },
    headers: {
        'Content-Type': 'application/json',
    }
  }
);
  return response;
}