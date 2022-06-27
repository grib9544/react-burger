const ACCESS_TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';

const session = {
  set token(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  set refreshToken(refreshToken: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  get token(): string {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!token) {
      return '';
    }

    return token;
  },

  get refreshToken(): string {
    const token = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!token) {
      return '';
    }

    return token;
  },

  reset() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

export { session };
