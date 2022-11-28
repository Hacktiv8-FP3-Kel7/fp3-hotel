import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import Text from "../components/elements/text";
import { StackNavigationScreenProps } from "../router";
import colors from "../styles/color";
import typography from "../styles/typography";
import { HOME_SCREEN_NAME } from "./home-screen";
import * as Yup from "yup";
import useYupValidationResolver from "../hooks/use-yup-validation-resolver";
import { useForm, FormProvider } from "react-hook-form";
import SubmitField from "../components/widgets/field-components/submit-field";
import TextField from "../components/widgets/field-components/text-field";

export const LOGIN_SCREEN_NAME = "Login Screen";
export type LOGIN_SCREEN_PARAMS = undefined;

interface Props extends StackNavigationScreenProps<typeof LOGIN_SCREEN_NAME> {}

export default function LoginScreen(props: Props) {
  const defaultValues = React.useMemo(() => ({ username: "" }), []);
  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
      }),
    []
  );
  const resolver = useYupValidationResolver(yupSchema);

  const methods = useForm({
    defaultValues,
    resolver,
    mode: "all",
  });

  const onSubmit = React.useCallback(async (values: typeof defaultValues) => {
    try {
      console.log(values);
    } catch (e) {}
  }, []);

  const onClickLogin = React.useCallback(() => {
    props.navigation.navigate({
      name: HOME_SCREEN_NAME,
      params: undefined,
    });
  }, [props]);

  return (
    <FormProvider {...methods}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TextField
          name="username"
          type="normal"
          placeholder="username"
          label="username"
          required
        />
        <TextField
          name="password"
          type="password"
          label="password"
          placeholder="password"
          required
        />
        <SubmitField onSubmit={onSubmit} />
      </View>
    </FormProvider>
  );
}
