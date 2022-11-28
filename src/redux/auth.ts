import { createModel } from "@rematch/core";
import { produce } from "immer";
//@ts-expect-error
import { Dispatch } from "react-redux";
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
});

const userSelector = (state: RootState) => state.auth?.data;

export const authSelector = {
  userSelector,
};

//Dispatcher
export const authDispatcher = (dispatch: Dispatch) => {
  const authDispatch = dispatch as RematchDispatch;

  return {
    reset: () => {
      return authDispatch.auth.reset();
    },
    setUser: (payload: User) => {
      return authDispatch.auth.setUser(payload);
    },
  };
};

export default auth;
