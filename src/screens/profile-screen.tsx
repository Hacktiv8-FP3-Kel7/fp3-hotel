import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { StackNavigationScreenProps } from '../router';

export const PROFILE_SCREEN_NAME = 'Profile Screen';
export type PROFILE_SCREEN_PARAMS = undefined;

interface Props extends StackNavigationScreenProps<typeof PROFILE_SCREEN_NAME> {}

export default function ProfileScreen(props: Props) {
  return <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}></View>;
}
