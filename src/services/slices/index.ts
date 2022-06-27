import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import burgerReducer from './burger';
import userReducer from './user';

export const rootReducer = combineReducers({
  burger: burgerReducer,
  auth: authReducer,
  user: userReducer
});

export const store = configureStore({
  reducer: rootReducer
});
