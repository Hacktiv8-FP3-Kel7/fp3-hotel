import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import Favorite from '@app/modules/favorite/favorite-index';
import HotelCard from '@app/modules/home/home-hotel-card';
import { authSelector } from '@app/redux/auth';
import * as React from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';

import { TabNavigationScreenProps } from '../router';
import { DETAIL_HOTEL_NAME } from './detail-hotel-screen';

export const FAVORITE_SCREEN_NAME = 'Favorite Screen';
export type FAVORITE_SCREEN_PARAMS = undefined;

interface Props extends TabNavigationScreenProps<typeof FAVORITE_SCREEN_NAME> {}

export default function FavoriteScreen(props: Props) {
  const onClick = React.useCallback(
    (hotel: HotelModel) => {
      props.navigation.navigate({
        name: DETAIL_HOTEL_NAME,
        params: { data: hotel },
      });
    },
    [props.navigation],
  );

  return <Favorite onClick={(hotel) => onClick(hotel)} />;
}
