import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core";
import auth from "./auth";

export interface RootModel extends Models<RootModel> {
  auth: typeof auth;
}

export const models: RootModel = { auth };

export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
