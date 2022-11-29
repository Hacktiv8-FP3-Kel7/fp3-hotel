import Text from '@app/components/elements/text';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useCredential } from '../common/containers/CredentialContainer';
import { RematchDispatcher } from '../redux';
import { authSelector } from '../redux/auth';
import { StackNavigationScreenProps } from '../router';

export const HOME_SCREEN_NAME = 'Home Screen';
export type HOME_SCREEN_PARAMS = undefined;

interface Props extends StackNavigationScreenProps<typeof HOME_SCREEN_NAME> {}

export default function HomeScreen(props: Props) {
  const user = useSelector(authSelector.userSelector);
  const dispatch = useDispatch<RematchDispatcher>();
  const { setCredential } = useCredential();
  const onClickLogout = React.useCallback(() => {
    dispatch.auth.reset();
    setCredential(undefined);
  }, [dispatch.auth, setCredential]);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <TouchableOpacity onPress={onClickLogout} style={{ backgroundColor: 'red', padding: 20 }}>
        <Text>{'Logout'}</Text>
      </TouchableOpacity>
    </View>
  );
}
