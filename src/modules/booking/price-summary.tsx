import { View } from 'react-native';
import * as React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Text from '@app/components/elements/text';
import { string2money } from '@app/common/utils/string';

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
      <Text>Rp {string2money(price)}</Text>
      <Text>Rp {string2money(price * rooms)}</Text>
    </View>
  );
}
