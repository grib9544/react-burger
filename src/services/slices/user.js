import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser, patchUser } from '../api/user';

export const fetchUserThunk = createAsyncThunk('user/get-user', async () => {
  return getUser();
});

export const patchUserThunk = createAsyncThunk('user/patch-user', async (data) => {
  return patchUser(data);
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
    name: null
  },
  reducers: {
    updateUserField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    resetUser: (state) => {
      state.email = null;
      state.name = null;
    }
  },
  extraReducers: {
    [fetchUserThunk.fulfilled]: (state, action) => {
      state.email = action.payload.user.email;
      state.name = action.payload.user.name;
    },
    [fetchUserThunk.rejected]: (state) => {
      state.email = null;
      state.name = null;
    },
    [patchUserThunk.fulfilled]: (state, action) => {
      state.email = action.payload.user.email;
      state.name = action.payload.user.name;
    }
  }
});

export const { updateUserField, resetUser } = userSlice.actions;

export default userSlice.reducer;
