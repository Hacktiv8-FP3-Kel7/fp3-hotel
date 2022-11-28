import persistPlugin, { getPersistor } from "@rematch/persist";
import { init } from "@rematch/core";
import storage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage,
};

export const store = init({
  plugins: [persistPlugin(persistConfig)],
});

export const persistor = getPersistor();
