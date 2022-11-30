import HomeScreenHeader from '@app/components/modules/home-screen/home-screen-header';
import Header from '@app/components/widgets/header';
import Home from '@app/modules/home';
import HotelCard from '@app/modules/home/hotel-card';
import * as React from 'react';
import { View } from 'react-native';
import { TabNavigationScreenProps } from '../router';

export const HOME_SCREEN_NAME = 'Home Screen';
export type HOME_SCREEN_PARAMS = undefined;

interface Props extends TabNavigationScreenProps<typeof HOME_SCREEN_NAME> {}

export default function HomeScreen(props: Props) {
  return (
    <View style={{ flex: 1 }}>
      <HomeScreenHeader />
      <Home />
    </View>
  );
}
