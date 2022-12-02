import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Text from '@app/components/elements/text';
import { string2money } from '@app/common/utils/string';
import colors from '@app/styles/color';

export default function BookingPriceSummary() {
  const { control } = useFormContext();
  const [days, rooms, guests, price] = useWatch({
    control,
    name: ['days', 'rooms', 'guests', 'price'],
  });

  return (
    <View style={styles.cardContainer}>
      <Text>
        {days} Hari, {rooms} Kamar, {guests} Tamu
      </Text>
      <Text>Harga Kamar : Rp {string2money(price)} / Kamar</Text>
      <Text>Total Harga : Rp {string2money(price * rooms * days)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 36,
    paddingVertical: 24,
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 5,
    borderRadius: 8,
  },
});
