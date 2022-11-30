import * as React from 'react';
import { StackNavigationScreenProps } from '@app/router';
import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import BookingForm from '@app/modules/booking/form';

export const BOOKING_HOTEL_NAME = 'Booking Screen';
export type BOOKING_HOTEL_PARAMS = {
  data: HotelModel;
};

interface Props extends StackNavigationScreenProps<typeof BOOKING_HOTEL_NAME> {}

export default function BookingHotelScreen(props: Props) {
  const { data } = props.route.params;

  return <BookingForm hotel={data} />;
}
