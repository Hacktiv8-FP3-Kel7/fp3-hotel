import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import Text from '@app/components/elements/text';
import HomeScreenHeader from '@app/components/modules/home-screen/home-screen-header';
import Header from '@app/components/widgets/header';
import * as React from 'react';
import { FlatList, Image, StyleSheet, TouchableHighlight, View } from 'react-native';

interface Props {
  data: HotelModel;
  onClick: (hotel: HotelModel) => void;
}

function FacilityItem(props: { facilityName: string }) {
  const { facilityName } = props;
  return (
    <View>
      <Text>{facilityName}</Text>
    </View>
  );
}

export default function DetailHotel(props: Props) {
  const { data, onClick } = props;
  return (
    <View style={styles.detailContainer}>
      <Header title="Detail Hotel" titleCenter back />
      <Image
        style={styles.imageContainer}
        source={{
          uri:
            data.images.find((image) => image.isHeroImage)?.url ??
            'https://tempe.wajokab.go.id/img/no-image.png',
        }}
      />
      <Text>{data.name}</Text>
      <Text>
        {data.address.city}, {data.address.country}
      </Text>
      <Text>({data.starRating}) Rating</Text>

      <Text>Deskripsi</Text>
      <Text>{data.description.short}</Text>

      <Text>Fasilitas</Text>
      <FlatList
        data={data.amenities}
        renderItem={({ item }) => <FacilityItem facilityName={item.formatted} key={item.code} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <TouchableHighlight onPress={() => onClick(data)}>
        <Text>Booking</Text>
      </TouchableHighlight>
    </View>
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
