import { orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

export interface TNewOrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | undefined;
}

const initialState: TNewOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

export const createOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: () => initialState
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const { resetOrder } = createOrderSlice.actions;
export const { getOrderRequest, getOrderModalData } =
  createOrderSlice.selectors;
