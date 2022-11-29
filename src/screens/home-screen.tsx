import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useCredential } from '../common/containers/CredentialContainer';
import { Dispatch } from '../redux';
import { authSelector } from '../redux/auth';
import { StackNavigationScreenProps } from '../router';

export const HOME_SCREEN_NAME = 'Home Screen';
export type HOME_SCREEN_PARAMS = undefined;

interface Props extends StackNavigationScreenProps<typeof HOME_SCREEN_NAME> {}

export default function HomeScreen(props: Props) {
  const user = useSelector(authSelector.userSelector);

  return <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}></View>;
}
