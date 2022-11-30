import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import Text from '@app/components/elements/text';
import HomeScreenHeader from '@app/components/modules/home-screen/home-screen-header';
import * as React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

interface Props {
  data: HotelModel;
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
  const { data } = props;
  return (
    <View>
      <HomeScreenHeader title="Detail Hotel" back />
      <Text>{data.name}</Text>
      <Text>
        {data.address.city}, {data.address.country}
      </Text>
      <Text>({data.starRating})</Text>

      <Text>Deskripsi</Text>
      <Text>{data.description.short}</Text>

      <Text>Fasilitas</Text>
      <FlatList
        data={data.amenities}
        renderItem={({ item }) => <FacilityItem facilityName={item.formatted} key={item.code} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {},
});
