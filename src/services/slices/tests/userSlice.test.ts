import { afterAll, beforeAll, expect, test } from '@jest/globals';
import {
  login,
  logout,
  register,
  TUserState,
  updateUser,
  userSlice
} from '../userSlice';
import { MockError, MockUser } from './mock';

const initialState: TUserState = {
  isAuthChecked: false,
  user: MockUser,
  error: undefined
};

describe('userSlice tests', () => {
  beforeAll(() => {
    global.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      key: jest.fn(),
      length: 0
    };
  });

  jest.mock('../../../utils/cookie', () => ({
    setCookie: jest.fn(),
    getCookie: jest.fn(),
    deleteCookie: jest.fn()
  }));

  afterAll(() => {
    jest.clearAllMocks();
  });

  const checkState = (testState: TUserState, expectedState: TUserState) => {
    expect(testState).toEqual(expectedState);
  };

  describe('register', () => {
    test('register.pending', () => {
      const action = { type: register.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, error: '' });
    });

    test('register.fulfilled', () => {
      const action = {
        type: register.fulfilled.type,
        payload: { user: MockUser }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        user: MockUser,
        isAuthChecked: true,
        error: ''
      });
    });

    test('register.rejected', () => {
      const action = {
        type: register.rejected.type,
        error: { message: MockError.message }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        error: MockError.message
      });
    });
  });

  describe('login tests', () => {
    test('login.pending', () => {
      const action = { type: login.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        isAuthChecked: false,
        error: ''
      });
    });

    test('login.fulfilled', () => {
      const action = {
        type: login.fulfilled.type,
        payload: { user: MockUser }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        user: MockUser,
        isAuthChecked: true,
        error: ''
      });
    });

    test('login.rejected', () => {
      const action = {
        type: login.rejected.type,
        error: { message: MockError.message }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        error: MockError.message
      });
    });
  });

  describe('updateUser tests', () => {
    test('updateUser.pending', () => {
      const action = { type: updateUser.pending.type };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, { ...initialState, error: '' });
    });

    test('updateUser.fulfilled', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user: MockUser }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        user: MockUser,
        isAuthChecked: true
      });
    });

    test('updateUser.rejected', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: MockError.message }
      };
      const newState = userSlice.reducer(initialState, action);
      checkState(newState, {
        ...initialState,
        isAuthChecked: false,
        error: MockError.message
      });
    });
  });

  describe('logout test', () => {
    test('logout must clear user data', () => {
      const initialStateWithUser = {
        isAuthChecked: true,
        user: MockUser,
        error: undefined
      };

      const action = {
        type: logout.fulfilled.type
      };

      const newState = userSlice.reducer(initialStateWithUser, action);

      expect(newState).toEqual({
        error: undefined,
        isAuthChecked: false,
        user: { email: '', name: '' }
      });
    });
  });
});
