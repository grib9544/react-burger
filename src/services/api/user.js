import { client } from './client';

export async function getUser() {
  const { data } = await client.get('/api/auth/user');

  return data;
}

export async function patchUser(params) {
  const { data } = await client.patch('/api/auth/user', {
    [params.name]: params.value
  });

  return data;
}
