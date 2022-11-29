import {registerRootComponent} from 'expo';
import {StyleSheet, View} from 'react-native';
import Router from './router';
import React from 'react';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';
import CredentialPersist from './common/containers/CredentialPersist';
import {QueryClient, QueryClientProvider} from 'react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {useInitiateCustomFont} from './hooks/use-custom-font';

const queryClient = new QueryClient();

function App() {
  const [fontsLoaded] = useInitiateCustomFont();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <QueryClientProvider client={queryClient}>
          <CredentialPersist>
            <View style={styles.container}>
              <GestureHandlerRootView style={{flex: 1}}>
                <Router />
                <Toast position="top" topOffset={40} />
              </GestureHandlerRootView>
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
