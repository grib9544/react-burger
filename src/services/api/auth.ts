import { IUser } from '../../types';
import { client, IMessageRes, IResponse } from './client';

export type TSignInParams = Pick<IUser, 'email'> & { password: string };

export interface ISignInRes extends IResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export type TSignUpParams = IUser & { password: string };

export interface ISignUpRes extends IResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export type TResetPassParams = { password: string; token: string };

export async function signIn({ email, password }: TSignInParams): Promise<ISignInRes> {
  const { data } = await client.post<ISignInRes>('/api/auth/login', {
    email: email,
    password: password
  });

  return data;
}

export async function signOut(token: string): Promise<IMessageRes> {
  const { data } = await client.post<IMessageRes>('/api/auth/logout', {
    token: token
  });

  return data;
}

export async function signUp({ email, password, name }: TSignUpParams): Promise<ISignUpRes> {
  const { data } = await client.post<ISignUpRes>('/api/auth/register', {
    email: email,
    password: password,
    name: name
  });

  return data;
}

export async function forgotPassword(email: string): Promise<IMessageRes> {
  const { data } = await client.post<IMessageRes>('/api/password-reset', {
    email: email
  });

  return data;
}

export async function resetPassword({ password, token }: TResetPassParams): Promise<IMessageRes> {
  const { data } = await client.post<IMessageRes>('/api/password-reset/reset', {
    password: password,
    token: token
  });

  return data;
}
