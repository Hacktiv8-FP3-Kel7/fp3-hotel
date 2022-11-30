import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useLogin } from '../api-hooks/auth/auth.mutation';
import { useCredential } from '../common/containers/CredentialContainer';
import ToastHelper from '../common/helpers/toast';
import { StackNavigationScreenProps } from '../router';
import * as Yup from 'yup';
import useYupValidationResolver from '../hooks/use-yup-validation-resolver';
import { useForm } from 'react-hook-form';
import Form from '@app/components/elements/form';
import Input from '@app/components/elements';
import { RematchDispatcher } from 'redux';

export const LOGIN_SCREEN_NAME = 'Login Screen';
export type LOGIN_SCREEN_PARAMS = undefined;

interface Props extends StackNavigationScreenProps<typeof LOGIN_SCREEN_NAME> {}

export default function LoginScreen(props: Props) {
  const { mutateAsync: login } = useLogin();
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const dispatch = useDispatch<RematchDispatcher>();
  const { setCredential } = useCredential();
  const defaultValues = React.useMemo(() => ({ username: '', password: '' }), []);
  const yupSchema = React.useMemo(
    () =>
      Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
      }),
    [],
  );
  const resolver = useYupValidationResolver(yupSchema);

  const methods = useForm({
    defaultValues,
    resolver,
    mode: 'all',
  });

  const onSubmit = React.useCallback(
    async (values: typeof defaultValues) => {
      try {
        const res = await login({
          username: values.username,
          password: values.password,
        });
        setCredential({
          token: res.data.token,
        });
        dispatch.auth.setUser({
          firstName: values.username,
          lastName: '',
          email: '',
          gender: '',
        });
        ToastHelper.success('Berhasil Login');
      } catch (e: any) {
        ToastHelper.error('Error');
      }
    },
    [dispatch.auth, login, setCredential],
  );

  return (
    <Form methods={methods}>
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
        <Input name="username" type="normal" placeholder="username" label="username" required />
        <Input name="password" type="password" label="password" placeholder="password" required />

        <Input type="submit" text="Login" onSubmit={onSubmit} />
      </View>
    </Form>
  );
}
