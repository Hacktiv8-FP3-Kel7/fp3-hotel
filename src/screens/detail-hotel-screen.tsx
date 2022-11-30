import { View } from 'react-native';
import * as React from 'react';
import { StackNavigationScreenProps } from '@app/router';
import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import DetailHotel from '@app/modules/detail-hotel/index';
export const DETAIL_HOTEL_NAME = 'Detail Screen';
export type DETAIL_HOTEL_PARAMS = {
  data: HotelModel;
};

interface Props extends StackNavigationScreenProps<typeof DETAIL_HOTEL_NAME> {}

export default function DetailHotelScreen(props: Props) {
  const { data } = props.route.params;
  return <DetailHotel data={data} />;
}
