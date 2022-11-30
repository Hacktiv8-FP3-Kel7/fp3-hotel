import * as React from 'react';
import { StackNavigationScreenProps } from '@app/router';
import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import DetailHotel from '@app/modules/detail-hotel/index';
import { BOOKING_HOTEL_NAME } from './booking-hotel-screen';
export const DETAIL_HOTEL_NAME = 'Detail Screen';
export type DETAIL_HOTEL_PARAMS = {
  data: HotelModel;
};

interface Props extends StackNavigationScreenProps<typeof DETAIL_HOTEL_NAME> {}

export default function DetailHotelScreen(props: Props) {
  const { data } = props.route.params;

  const onClick = React.useCallback(
    (hotel: HotelModel) => {
      props.navigation.navigate({
        name: BOOKING_HOTEL_NAME,
        params: { data: hotel },
      });
    },
    [props.navigation],
  );

  return <DetailHotel data={data} onClick={(hotel) => onClick(hotel)} />;
}
