import { getOrdersApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getUserOrders = createAsyncThunk('orders/ofUser', getOrdersApi);

export interface TOrdersState {
  orders: Array<TOrder>;
  isLoading: boolean;
}

const initialState: TOrdersState = {
  orders: [],
  isLoading: true
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    listOfOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { listOfOrders } = ordersSlice.selectors;
