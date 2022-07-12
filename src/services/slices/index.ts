import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ORDERS_PROFILE_WS, ORDERS_WS } from '../../constants';
import { orderActions, orderMiddleware, profileOrderActions } from '../middlewares/orders';
import authReducer from './auth';
import burgerReducer from './burger';
import orderReducer from './orders';
import profileOrderReducer from './profile-orders';
import userReducer from './user';

export const rootReducer = combineReducers({
  burger: burgerReducer,
  auth: authReducer,
  user: userReducer,
  orders: orderReducer,
  pOrders: profileOrderReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      orderMiddleware(ORDERS_WS, orderActions, false),
      orderMiddleware(ORDERS_PROFILE_WS, profileOrderActions, true)
    )
});
