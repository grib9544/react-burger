import axios from 'axios';
import { API_URL } from '../../constants';
import { FetchError } from '../../error';
import { session } from '../session';

export interface IResponse {
  success: boolean;
}

export interface IMessageRes {
  message: string;
}

const client = axios.create({
  baseURL: API_URL
});

client.interceptors.request.use(
  (config) => {
    const { token } = session;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.data.message === 'jwt expired') {
      return client
        .post('/api/auth/token', {
          token: session.refreshToken
        })
        .then((res) => {
          if (res.data.success) {
            session.token = res.data.accessToken.split(' ')[1];
            session.refreshToken = res.data.refreshToken;

            error.response.config.headers['Authorization'] = 'Bearer ' + res.data.token;

            return client(error.config);
          }
        })
        .catch(() => {
          window.location.href = '/login';
        });
    }

    if (error.response.status >= 400) {
      const { message } = error.response.data;
      return Promise.reject(new FetchError(message));
    }

    return Promise.reject(error);
  }
);

export { client };
