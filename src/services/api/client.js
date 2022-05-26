import axios from 'axios';
import { API_URL } from '../../constants';
import { FetchError } from '../../error';
import { session } from '../session';

const client = axios.create({
  baseURL: API_URL
});

client.interceptors.request.use(
  (config) => {
    const { token } = session;

    if (token) {
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
    if (error.response.status === 401) {
      return axios
        .post('/api/auth/refresh', {
          refreshToken: session.refreshToken
        })
        .then((res) => {
          if (res.data.success) {
            session.token = res.data.accessToken;
            session.refreshToken = res.data.refreshToken;

            error.response.config.headers['Authorization'] = 'Bearer ' + res.data.refreshToken;

            return client(error.config);
          }
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
