import Text from '@app/components/elements/text';
import { BookingModel } from '@app/redux/auth';
import { TouchableOpacity, View } from 'react-native';
import * as React from 'react';
import { string2money } from '@app/common/utils/string';
import { format } from 'date-fns';
import { bodyTypography } from '@app/styles/typography';

interface Props {
  booking: BookingModel;
}

export default function BookingCard(props: Props) {
  const { booking } = props;
  const {
    name,
    orderer,
    guests,
    days,
    rooms,
    email,
    phoneNumber,
    totalPrice,
    images,
    transactionAt,
  } = booking;

  // console.log(transactionAt);

  const mainImage =
    images.find((image) => image.isHeroImage)?.url ??
    'https://tempe.wajokab.go.id/img/no-image.png';

  return (
    <TouchableOpacity
      style={{
        margin: 8,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}
      onPress={() => {}}
    >
      <Text style={[bodyTypography.bodyRegular4, { marginVertical: 2 }]}>
        Waktu Transaksi : {format(transactionAt || new Date(), 'dd-MM-yyyy, HH:mm')}
      </Text>
      <Text numberOfLines={1} style={[bodyTypography.bodyRegular4, { marginVertical: 2 }]}>
        Nama Hotel : {name}
      </Text>
      <Text style={[bodyTypography.bodyRegular4, { marginVertical: 2 }]}>
        Nama Pemesan : {orderer}
      </Text>
      <View style={{ marginVertical: 8 }}>
        <Text style={[bodyTypography.bodyRegular4, { marginVertical: 2 }]}>Kontak</Text>
        <Text style={[bodyTypography.bodyRegular4, { marginVertical: 2 }]}>
          {email} - {phoneNumber}
        </Text>
      </View>
      <Text style={[bodyTypography.bodyRegular4, { marginVertical: 2 }]}>
        {guests} Tamu, {days} Hari, {rooms} Kamar
      </Text>
      <Text style={[bodyTypography.bodyRegular4, { marginVertical: 2 }]}>
        Total Pembayaran : Rp {string2money(totalPrice)}
      </Text>
    </TouchableOpacity>
  );
}
