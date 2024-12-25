import { describe, expect, test } from '@jest/globals';
import {
  addItem,
  clearAll,
  constructorSlice,
  deleteItem
} from '../constructorSlice';
import { mockData, MockMainIngredient, MockSauce } from './mock';
import { TConstructorIngredient } from '@utils-types';

const mockBun: TConstructorIngredient = {
  ...mockData,
  id: mockData._id
};

const mockIngredient: TConstructorIngredient = {
  ...MockMainIngredient,
  id: MockMainIngredient._id
};

const mockSauce: TConstructorIngredient = {
  ...MockSauce,
  id: MockSauce._id
};

const initialState = {
  bun: null,
  ingredients: []
};

describe('constructorSlice tests', () => {
  test('init state', () => {
    const state = constructorSlice.reducer(undefined, { type: '@INIT' });
    expect(state).toEqual(initialState);
  });

  test('add item', () => {
    const state = constructorSlice.reducer(
      initialState,
      addItem(mockIngredient)
    );
    expect(state.ingredients.length).toEqual(1);
    expect(state.ingredients[0]._id).toEqual(mockIngredient._id);
  });

  test('delete item', () => {
    const filledState = {
      bun: mockBun,
      ingredients: [mockIngredient, mockSauce]
    };
    const state = constructorSlice.reducer(
      filledState,
      deleteItem(mockIngredient)
    );
    expect(state.ingredients).not.toContainEqual(mockIngredient);
    expect(state.ingredients).toHaveLength(1);
  });

  test('clear all', () => {
    const filledState = {
      bun: mockBun,
      ingredients: [mockIngredient, mockSauce]
    };
    const state = constructorSlice.reducer(filledState, clearAll());
    expect(state).toEqual(initialState);
  });
});
