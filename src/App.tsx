import { StatusBar } from "expo-status-bar";
import { registerRootComponent } from "expo";
import { StyleSheet, Text, View } from "react-native";
import Router from "./router";
import React from "react";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import CredentialPersist from "./common/containers/CredentialPersist";
import { QueryClient, QueryClientProvider } from "react-query";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <QueryClientProvider client={queryClient}>
          <CredentialPersist>
            <View style={styles.container}>
              <Router />
              <Toast position="top" topOffset={40} />
            </View>
          </CredentialPersist>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default registerRootComponent(App);
