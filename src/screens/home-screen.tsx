import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import Home from '@app/modules/home';
import * as React from 'react';
import { TabNavigationScreenProps } from '../router';
import { DETAIL_HOTEL_NAME } from './detail-hotel-screen';

export const HOME_SCREEN_NAME = 'Home Screen';
export type HOME_SCREEN_PARAMS = undefined;

interface Props extends TabNavigationScreenProps<typeof HOME_SCREEN_NAME> {}

export default function HomeScreen(props: Props) {
  const onClick = React.useCallback(
    (hotel: HotelModel) => {
      props.navigation.navigate({
        name: DETAIL_HOTEL_NAME,
        params: { data: hotel },
      });
    },
    [props.navigation],
  );

  return <Home onClick={(hotel) => onClick(hotel)} />;
}
