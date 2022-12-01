import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import Text from '@app/components/elements/text';
import Header from '@app/components/widgets/header';
import colors from '@app/styles/color';
import { bodyTypography, headlineTypography } from '@app/styles/typography';
import * as React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
  data: HotelModel;
  onClick: (hotel: HotelModel) => void;
}

function FacilityItem(props: { facilityName: string }) {
  const { facilityName } = props;
  return (
    <View
      style={{
        padding: 4,
        marginHorizontal: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 10,
        backgroundColor: 'white',
      }}
    >
      <Text>{facilityName}</Text>
    </View>
  );
}

export default function DetailContent(props: Props) {
  const { data, onClick } = props;
  return (
    <ScrollView style={styles.detailContainer}>
      <Header title="Detail Hotel" titleCenter back />
      <Image
        style={styles.imageContainer}
        source={{
          uri:
            data.images.find((image) => image.isHeroImage)?.url ??
            'https://tempe.wajokab.go.id/img/no-image.png',
        }}
      />
      <View style={{ marginHorizontal: 16 }}>
        <View style={{ marginVertical: 8 }}>
          <Text style={[headlineTypography.semiBold5, { margin: 8, textAlign: 'center' }]}>
            {data.name}
          </Text>
          <Text>Kota : {data.address.city}</Text>
          <Text>Negara : {data.address.country}</Text>
          <Text style={[bodyTypography.bodyRegular4]}>Rating : {data.starRating}</Text>
          <Text>Fasilitas :</Text>
          {data.amenities.length === 0 ? (
            <Text>Tidak ada Fasilitas</Text>
          ) : (
            <FlatList
              data={data.amenities}
              contentContainerStyle={{
                padding: 8,
              }}
              renderItem={({ item }) => (
                <FacilityItem facilityName={item.formatted} key={item.code} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        <Text style={[headlineTypography.semiBold7]}>Deskripsi</Text>
        <Text style={{ textAlign: 'justify' }}>{data.description.short}</Text>

        <TouchableOpacity
          style={{
            borderColor: colors.black,
            borderWidth: 1,
            padding: 12,
            borderRadius: 10,
            marginVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => onClick(data)}
        >
          <Text>Booking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
  },
  heroContainer: {},
  imageContainer: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
});
