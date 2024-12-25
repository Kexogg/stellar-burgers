import { expect, describe, test } from '@jest/globals';
import { getIngredientsList, ingredientsSlice } from '../ingredientsSlice';
import { mockData, MockMainIngredient, MockSauce } from './mock';

const mockIngredients = [mockData, MockMainIngredient, MockSauce];

const initialState = {
  ingredients: [],
  loading: false,
  error: null
};

describe('ingredientsSlice test', () => {
  test('init state', () => {
    const state = ingredientsSlice.reducer(undefined, { type: '@INIT' });
    expect(state).toEqual(initialState);
  });

  test('getIngredientsList.pending switch loading to true', () => {
    const action = { type: getIngredientsList.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  test('getIngredientsList.fulfilled update ingredients', () => {
    const action = {
      type: getIngredientsList.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ingredients: mockIngredients,
      loading: false,
      error: null
    });
  });

  test('getIngredientsList.rejected saves error', () => {
    const action = {
      type: getIngredientsList.rejected.type,
      error: { message: 'Ошибка загрузки ингредиентов' }
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка загрузки ингредиентов'
    });
  });
});
