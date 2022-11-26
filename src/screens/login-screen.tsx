import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { StackNavigationScreenProps } from "../router";
import { HOME_SCREEN_NAME } from "./home-screen";

export const LOGIN_SCREEN_NAME = "Login Screen";
export type LOGIN_SCREEN_PARAMS = undefined;

interface Props extends StackNavigationScreenProps<typeof LOGIN_SCREEN_NAME> {}

export default function LoginScreen(props: Props) {
  const onClickLogin = React.useCallback(() => {
    props.navigation.navigate({
      name: HOME_SCREEN_NAME,
      params: undefined,
    });
  }, [props]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={onClickLogin}
        style={{
          padding: 16,
          borderWidth: 1,
          borderRadius: 12,
        }}
      >
        <Text>{"Test Login"}</Text>
      </TouchableOpacity>
    </View>
  );
}
