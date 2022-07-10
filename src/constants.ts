export const API_URL = 'https://norma.nomoreparties.space';
export const ORDERS_WS = 'wss://norma.nomoreparties.space/orders/all';
export const ORDERS_PROFILE_WS = 'wss://norma.nomoreparties.space/orders';

export enum APP_ROUTES {
  ORDER = '/',
  LOGIN = '/login',
  REGISTRATION = '/register',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',
  PROFILE = '/profile',
  PROFILE_ORDER = '/profile/orders',
  PROFILE_ORDER_INFO = '/profile/orders/:id',
  INGREDIENT_DEATILS = '/ingredients/:id',
  ORDER_FEED = '/feed',
  ORDER_INFO = '/feed/:id'
}
