import { client } from './client';

export async function passwordReset(email) {
  const { data } = await client.post('/api/password-reset', {
    email: email
  });

  return data;
}
