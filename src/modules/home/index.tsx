import { getHotels } from '@app/api-hooks/hotel/hotel.model';
import useGetHotels from '@app/api-hooks/hotel/hotel.query';
import Text from '@app/components/elements/text';
import HomeScreenHeader from '@app/components/modules/home-screen/home-screen-header';
import colors from '@app/styles/color';
import * as React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import BookingForm from './form';
import HotelCard from './hotel-card';

export default function Home() {
  const [params, setParams] = React.useState<any>(undefined);

  const { data, isLoading, isFetching } = useGetHotels({ params });

  const hotels = React.useMemo(() => {
    return data?.data.data || [];
  }, [data?.data.data]);

  return (
    <View style={styles.homeContainer}>
      <HomeScreenHeader title="Halaman Beranda" />
      <BookingForm onSubmit={(input) => setParams({ params: input })} />
      {isLoading || isFetching ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator color={colors.black} />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={hotels}
          style={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => <HotelCard data={item} />}
          keyExtractor={(item) => item.hotelId}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    // paddingHorizontal: 16,
  },
  activityIndicatorContainer: {
    margin: 16,
  },
});
