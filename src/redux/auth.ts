import { createModel } from "@rematch/core";
import { produce } from "immer";
import { Dispatch } from "react";
import { RematchDispatch, RootModel, RootState } from ".";
import { User } from "../api-hooks/user/user.model";

export interface AuthState {
  data?: User;
}

const initialState: AuthState = {
  data: undefined,
};

const auth = createModel<RootModel>()({
  name: "auth",
  state: initialState,
  reducers: {
    setUser(state: AuthState, payload: User): AuthState {
      return produce(state, (draft) => {
        draft.data = payload;
      });
    },
    reset(): AuthState {
      return {
        ...initialState,
      };
    },
  },
  effects: {
    async logout(): Promise<void> {
      this.reset();
    },
  },
});

const userSelector = (state: RootState) => state.auth.data;

export const authSelector = {
  userSelector,
};

export const authDispatcher = (dispatch: RematchDispatch) => {
  const authDispatch = dispatch as RematchDispatch;
  return {
    reset: () => {
      return authDispatch.auth.logout();
    },
  };
};

export default auth;
