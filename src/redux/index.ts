import { init, Models, RematchRootState } from "@rematch/core";
import auth from "./auth";

export interface RootModel extends Models<RootModel> {
  auth: typeof auth;
}

export const models: RootModel = { auth };

const store = init({ models });

export type RematchDispatch = typeof store.dispatch;
export type RootState = RematchRootState<typeof models>;
