import persistPlugin, { getPersistor } from "@rematch/persist";
import { init } from "@rematch/core";
import storage from "@react-native-async-storage/async-storage";
import { models } from ".";

const persistConfig = {
  key: "root",
  storage,
  models: models,
};

export const store = init({
  models: models,
  plugins: [persistPlugin(persistConfig)],
});

export type Store = typeof store;

export const persistor = getPersistor();
