import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { forgotPassword, resetPassword, signIn, signOut, signUp } from '../api';
import { session } from '../session';

export const signInThunk = createAsyncThunk('auth/signin', async (params) => {
  return signIn(params);
});

export const signOutThunk = createAsyncThunk('auth/signout', async () => {
  return signOut(session.refreshToken);
});

export const signUpThunk = createAsyncThunk('auth/signup', async (params) => {
  return signUp(params);
});

export const forgotPasswordThunk = createAsyncThunk('auth/forgot-password', async (email) => {
  return forgotPassword(email);
});

export const resetPasswordThunk = createAsyncThunk('auth/reset-password', async (params) => {
  return resetPassword(params);
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {},
  extraReducers: {
    [signInThunk.fulfilled]: (_state, action) => {
      session.token = action.payload.accessToken.split(' ')[1];
      session.refreshToken = action.payload.refreshToken;
    },
    [signUpThunk.fulfilled]: (_state, action) => {
      session.token = action.payload.accessToken.split(' ')[1];
      session.refreshToken = action.payload.refreshToken;
    },
    [signOutThunk.fulfilled]: () => {
      session.reset();
    }
  }
});

export default authSlice.reducer;
