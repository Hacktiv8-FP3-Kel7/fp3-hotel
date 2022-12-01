import Text from '@app/components/elements/text';
import { BookingModel } from '@app/redux/auth';
import { View } from 'react-native';
import * as React from 'react';
import { string2money } from '@app/common/utils/string';

interface Props {
  booking: BookingModel;
}

export default function BookingCard(props: Props) {
  const { booking } = props;
  const { name, orderer, guests, days, rooms, email, phoneNumber, totalPrice, images } = booking;

  const mainImage =
    images.find((image) => image.isHeroImage)?.url ??
    'https://tempe.wajokab.go.id/img/no-image.png';

  return (
    <View>
      <Text>{name}</Text>
      <Text>{orderer}</Text>
      <Text>
        {email} - {phoneNumber}
      </Text>
      <Text>
        {guests} Tamu, {days} Hari, {rooms} Kamar
      </Text>
      <Text>{string2money(totalPrice)}</Text>
    </View>
  );
}
