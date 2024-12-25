import { expect, test } from '@jest/globals';
import { TFeedsResponse } from '../../../utils/burger-api';
import { feedSlice, getAllFeeds, TFeedsState } from '../feedSlice';
import { MockOrder } from './mock';

const mockFeedsResponse: TFeedsResponse = {
  success: true,
  orders: [MockOrder],
  total: 1,
  totalToday: 1
};

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: true,
  error: ''
};

describe('ordersFeedsSlice tests', () => {
  test('getFeeds.pending check state', () => {
    const action = {
      type: getAllFeeds.pending.type
    };
    const testState = feedSlice.reducer(initialState, action);
    const expectedState = {
      ...initialState,
      isLoading: true,
      error: undefined
    };
    expect(testState).toEqual(expectedState);
  });

  test('getFeeds.fulfilled return feed data', () => {
    const action = {
      type: getAllFeeds.fulfilled.type,
      payload: mockFeedsResponse
    };
    const testState = feedSlice.reducer(initialState, action);
    const expectedState: TFeedsState = {
      orders: mockFeedsResponse.orders,
      total: mockFeedsResponse.total,
      totalToday: mockFeedsResponse.totalToday,
      isLoading: false,
      error: ''
    };
    expect(testState).toEqual(expectedState);
  });

  test('getFeeds.rejected saves error', () => {
    const action = {
      type: getAllFeeds.rejected.type,
      error: { message: 'Ошибка загрузки ленты' }
    };
    const testState = feedSlice.reducer(initialState, action);
    const expectedState: TFeedsState = {
      ...initialState,
      isLoading: false,
      error: 'Ошибка загрузки ленты'
    };
    expect(testState).toEqual(expectedState);
  });
});
