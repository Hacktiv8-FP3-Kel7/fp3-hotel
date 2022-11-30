import { View } from 'react-native';
import * as React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Text from '@app/components/elements/text';

export default function PriceSummary() {
  const { control } = useFormContext();
  const [days, rooms, guests, price] = useWatch({
    control,
    name: ['days', 'rooms', 'guests', 'price'],
  });

  return (
    <View>
      <Text>
        {days} Hari, {rooms} Kamar, {guests} Tamu
      </Text>
      <Text>Rp {price}</Text>
      <Text>Rp {price * rooms}</Text>
    </View>
  );
}
