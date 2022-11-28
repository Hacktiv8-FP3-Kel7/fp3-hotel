import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import { useLogin } from "../api-hooks/auth/auth.mutation";
import { useCredential } from "../common/containers/CredentialContainer";
import ToastHelper from "../common/helpers/toast";
import { authDispatcher } from "../redux/auth";
import { StackNavigationScreenProps } from "../router";

export const LOGIN_SCREEN_NAME = "Login Screen";
export type LOGIN_SCREEN_PARAMS = undefined;

interface Props extends StackNavigationScreenProps<typeof LOGIN_SCREEN_NAME> {}

export default function LoginScreen(props: Props) {
  const { mutateAsync: login } = useLogin();
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const dispatch = useDispatch();
  const { setCredential } = useCredential();
  const onClickLogin = React.useCallback(async () => {
    try {
      const res = await login({
        username: "johnd",
        password: "m38rmF$",
      });
      setCredential({
        token: res.data.token,
      });
      dispatch.auth.setUser({
        firstName: "johnd",
        lastName: "",
        email: "",
        gender: "",
      });
      ToastHelper.success("Berhasil Login");
    } catch (e: any) {
      ToastHelper.error("Error");
    }
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
