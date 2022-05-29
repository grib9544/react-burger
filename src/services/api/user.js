import { client } from './client';

export async function getUser() {
  const { data } = await client.get('/api/auth/user');

  return data;
}

export async function patchUser(name, value) {
  const { data } = await client.patch('/api/auth/user', {
    [name]: value
  });

  return data;
}
