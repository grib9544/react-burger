import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  forgotPassword,
  ISignInRes,
  ISignUpRes,
  resetPassword,
  signIn,
  signOut,
  signUp,
  TResetPassParams,
  TSignInParams,
  TSignUpParams
} from '../api';
import { IMessageRes } from '../api/client';
import { session } from '../session';

export const signInThunk = createAsyncThunk<ISignInRes, TSignInParams>(
  'auth/signin',
  async (params) => {
    return signIn(params);
  }
);

export const signOutThunk = createAsyncThunk('auth/signout', async () => {
  return signOut(session.refreshToken);
});

export const signUpThunk = createAsyncThunk<ISignUpRes, TSignUpParams>(
  'auth/signup',
  async (params) => {
    return signUp(params);
  }
);

export const forgotPasswordThunk = createAsyncThunk<IMessageRes, string>(
  'auth/forgot-password',
  async (email) => {
    return forgotPassword(email);
  }
);

export const resetPasswordThunk = createAsyncThunk<IMessageRes, TResetPassParams>(
  'auth/reset-password',
  async (params) => {
    return resetPassword(params);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInThunk.fulfilled, (_state, action) => {
      session.token = action.payload.accessToken.split(' ')[1];
      session.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(signUpThunk.fulfilled, (_state, action) => {
      session.token = action.payload.accessToken.split(' ')[1];
      session.refreshToken = action.payload.refreshToken;
    });
    builder.addCase(signOutThunk.fulfilled, () => {
      session.reset();
    });
  }
});

export default authSlice.reducer;
