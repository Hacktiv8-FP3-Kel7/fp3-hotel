import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { TabNavigationScreenProps } from '../router';

export const FAVORITE_SCREEN_NAME = 'Favorite Screen';
export type FAVORITE_SCREEN_PARAMS = undefined;

interface Props extends TabNavigationScreenProps<typeof FAVORITE_SCREEN_NAME> {}

export default function FavoriteScreen(props: Props) {
  return <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}></View>;
}
