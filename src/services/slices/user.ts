import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser, IUserRes, patchUser, TPatchUserParams } from '../api/user';

export const fetchUserThunk = createAsyncThunk<IUserRes>('user/get-user', async () => {
  return getUser();
});

export const patchUserThunk = createAsyncThunk<IUserRes, TPatchUserParams>(
  'user/patch-user',
  async (data) => {
    return patchUser(data);
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    name: ''
  },
  reducers: {
    resetUser: (state) => {
      state.email = '';
      state.name = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
      state.email = action.payload.user.email;
      state.name = action.payload.user.name;
    });
    builder.addCase(fetchUserThunk.rejected, (state) => {
      state.email = '';
      state.name = '';
    });
    builder.addCase(patchUserThunk.fulfilled, (state, action) => {
      state.email = action.payload.user.email;
      state.name = action.payload.user.name;
    });
  }
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
