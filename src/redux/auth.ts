import { createModel } from '@rematch/core';
import { produce } from 'immer';
import type { Dispatch, RootModel, RootState } from '.';
import { User } from '../api-hooks/user/user.model';

export interface AuthState {
  data?: User;
}

const initialState: AuthState = {
  data: undefined,
};

const auth = createModel<RootModel>()({
  name: 'auth',
  state: initialState,
  reducers: {
    setUser(state: AuthState, payload: User): AuthState {
      return {
        ...state,
        data: payload,
      };
    },
    reset(): AuthState {
      return {
        ...initialState,
      };
    },
  },
});

const userSelector = (state: RootState) => state.auth?.data;

export const authSelector = {
  userSelector,
};

export default auth;
