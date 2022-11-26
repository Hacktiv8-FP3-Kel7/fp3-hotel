import { StatusBar } from "expo-status-bar";
import { registerRootComponent } from "expo";
import { StyleSheet, Text, View } from "react-native";
import Router from "./router";

function App() {
  return (
    <View style={styles.container}>
      <Router />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default registerRootComponent(App);
