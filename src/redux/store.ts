import createPersistPlugin, { getPersistor } from "@rematch/persist";
import { init } from "@rematch/core";
import storage from "@react-native-async-storage/async-storage";
import { models } from ".";

const persistPlugin = createPersistPlugin({
  key: "root",
  version: 2,
  whitelist: ["auth"],
  storage,
});

export const store = init({
  models,
  plugins: [persistPlugin],
});

export type Store = typeof store;

export const persistor = getPersistor();
