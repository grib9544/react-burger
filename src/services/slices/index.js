import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import burgerReducer from './burger';
import userReducer from './user';

export const rootReducer = combineReducers({
  burger: burgerReducer,
  auth: authReducer,
  user: userReducer
});
