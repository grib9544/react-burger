import { client } from './client';

export async function signIn(credentials) {
  const { data } = await client.post('/api/auth/login', {
    email: credentials.email,
    password: credentials.password
  });

  return data;
}

export async function signOut(token) {
  const { data } = await client.post('/api/auth/logout', {
    token: token
  });

  return data;
}

export async function signUp(credentials) {
  const { data } = await client.post('/api/auth/register', {
    email: credentials.email,
    password: credentials.password,
    name: credentials.name
  });

  return data;
}

export async function forgotPassword(email) {
  const { data } = await client.post('/api/password-reset', {
    email: email
  });

  return data;
}

export async function resetPassword(email, token) {
  const { data } = await client.post('/api/password-reset/reset', {
    email: email,
    token: token
  });

  return data;
}
