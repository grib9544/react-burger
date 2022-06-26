import { IUser } from '../../types';
import { client, IResponse } from './client';

export interface IUserRes extends IResponse {
  user: IUser;
}

export type TPatchUserParams = {
  name: keyof IUser | 'password';
  value: string;
};

export async function getUser(): Promise<IUserRes> {
  const { data } = await client.get<IUserRes>('/api/auth/user');

  return data;
}

export async function patchUser({ name, value }: TPatchUserParams): Promise<IUserRes> {
  const { data } = await client.patch<IUserRes>('/api/auth/user', {
    [name]: value
  });

  return data;
}
