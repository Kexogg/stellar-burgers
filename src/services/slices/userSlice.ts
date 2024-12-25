import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

export const register = createAsyncThunk('user/register', registerUserApi);
export const login = createAsyncThunk('user/login', loginUserApi);
export const getUserInfo = createAsyncThunk('user/getuser', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const logout = createAsyncThunk('user/logout', logoutApi);

export interface TUserState {
  isAuthChecked: boolean;
  user: TUser;
  error: string | undefined;
}

const initialState: TUserState = {
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    getUser: (state) => state.user,
    getName: (state) => state.user.name,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.error = '';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message!;
      });
    builder
      .addCase(login.pending, (state) => {
        state.isAuthChecked = false;
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      });
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.error = '';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthChecked = false;
      state.user = { email: '', name: '' };
    });
  }
});

export const { isAuthCheckedSelector, getUser, getName, getError } =
  userSlice.selectors;
