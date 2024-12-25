import { describe, expect, test } from '@jest/globals';
import {
  createOrder,
  createOrderSlice,
  resetOrder,
  TNewOrderState
} from '../createOrderSlice';
import { TNewOrderResponse, TOrderResponse } from '../../../utils/burger-api';
import { MockOrder } from './mock';

export const mockOrderResponse: TOrderResponse = {
  success: true,
  orders: [MockOrder]
};

export const mockNewOrderResponse: TNewOrderResponse = {
  success: true,
  order: MockOrder,
  name: 'John Doe'
};

const initialOrderState: TNewOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

describe('createOrderSlice tests', () => {
  test('resetOrder must clean order', () => {
    const state = {
      ...initialOrderState,
      orderModalData: mockOrderResponse.orders[0],
      orderError: 'Ошибка',
      orderRequest: true
    };
    const newState = createOrderSlice.reducer(state, resetOrder());
    expect(newState).toEqual(initialOrderState);
  });

  test('createOrder.pending up request flag', () => {
    const action = { type: createOrder.pending.type };
    const newState = createOrderSlice.reducer(initialOrderState, action);
    expect(newState.orderRequest).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  test('createOrder.fulfilled creates order data', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: { order: mockNewOrderResponse }
    };
    const newState = createOrderSlice.reducer(initialOrderState, action);
    expect(newState.orderRequest).toBe(false);
    expect(newState.orderModalData).toEqual(mockNewOrderResponse);
  });

  test('createOrder.rejected save error', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка создания заказа' }
    };
    const newState = createOrderSlice.reducer(initialOrderState, action);
    expect(newState.orderRequest).toBe(false);
    expect(newState.error).toBe('Ошибка создания заказа');
  });
});
