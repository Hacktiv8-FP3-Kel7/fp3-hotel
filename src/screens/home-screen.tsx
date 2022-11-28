import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useCredential } from "../common/containers/CredentialContainer";
import { authDispatcher, authSelector } from "../redux/auth";
import { StackNavigationScreenProps } from "../router";

export const HOME_SCREEN_NAME = "Home Screen";
export type HOME_SCREEN_PARAMS = undefined;

interface Props extends StackNavigationScreenProps<typeof HOME_SCREEN_NAME> {}

export default function HomeScreen(props: Props) {
  const user = useSelector(authSelector.userSelector);
  const { setCredential } = useCredential();
  const dispatch = useDispatch();
  const { setUser } = authDispatcher(dispatch);
  const onClickLogout = React.useCallback(() => {
    setUser({
      firstName: "Johnd",
      email: "johnd@gmail.com",
      gender: "male",
      lastName: "Johndddd",
    });
    // setCredential(undefined);
  }, [setCredential]);
  console.log(user?.firstName);
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <TouchableOpacity
        onPress={onClickLogout}
        style={{
          padding: 16,
          borderWidth: 1,
          borderRadius: 12,
        }}
      >
        <Text>{"Logout"}</Text>
      </TouchableOpacity>
    </View>
  );
}
