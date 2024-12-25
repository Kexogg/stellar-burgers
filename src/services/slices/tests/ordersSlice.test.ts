import { describe, expect, test } from '@jest/globals';
import { getUserOrders, ordersSlice, TOrdersState } from '../ordersSlice';
import { TOrder } from '@utils-types';
import { MockOrder } from './mock';

const orderData: TOrder[] = [MockOrder];

const initialState: TOrdersState = {
  orders: [],
  isLoading: true
};

describe('userOrdersSlice test', () => {
  test('getUserOrders.pending isLoading true', () => {
    const action = { type: getUserOrders.pending.type };
    const newState = ordersSlice.reducer(initialState, action);
    const expectedState: TOrdersState = {
      ...initialState,
      isLoading: true
    };
    expect(newState).toEqual(expectedState);
  });

  test('getUserOrders.fulfilled returns user orders', () => {
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: orderData
    };
    const newState = ordersSlice.reducer(initialState, action);
    const expectedState: TOrdersState = {
      ...initialState,
      orders: orderData,
      isLoading: false
    };
    expect(newState).toEqual(expectedState);
  });

  test('getUserOrders.rejected stop with isLoading false', () => {
    const action = { type: getUserOrders.rejected.type };
    const newState = ordersSlice.reducer(initialState, action);
    const expectedState: TOrdersState = {
      ...initialState,
      isLoading: false
    };
    expect(newState).toEqual(expectedState);
  });
});
