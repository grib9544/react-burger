const ACCESS_TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';

const session = {
  set token(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  set refreshToken(refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  get token() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  get refreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  reset() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

export { session };
