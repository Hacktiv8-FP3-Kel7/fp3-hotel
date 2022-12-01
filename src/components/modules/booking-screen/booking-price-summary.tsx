import { View } from 'react-native';
import * as React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Text from '@app/components/elements/text';
import { string2money } from '@app/common/utils/string';

export default function BookingPriceSummary() {
  const { control } = useFormContext();
  const [days, rooms, guests, price] = useWatch({
    control,
    name: ['days', 'rooms', 'guests', 'price'],
  });

  return (
    <View
      style={{
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        margin: 16,
        padding: 16,
        borderRadius: 8,
        elevation: 5,
      }}
    >
      <Text>
        {days} Hari, {rooms} Kamar, {guests} Tamu
      </Text>
      <Text>Harga Kamar : Rp {string2money(price)} / Kamar</Text>
      <Text>Total Harga : Rp {string2money(price * rooms)}</Text>
    </View>
  );
}
