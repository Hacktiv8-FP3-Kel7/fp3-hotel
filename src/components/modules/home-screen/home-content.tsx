import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import useGetHotels from '@app/api-hooks/hotel/hotel.query';
import HomeScreenHeader from '@app/components/modules/home-screen/home-screen-header';
import colors from '@app/styles/color';
import * as React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import BookingForm from './home-search-form';
import HotelCard from './home-hotel-card';
interface Props {
  onClick: (hotel: HotelModel) => void;
}
export default function HomeContent(props: Props) {
  const { onClick } = props;
  const [params, setParams] = React.useState<any>(undefined);

  const { data, isLoading, isFetching, refetch } = useGetHotels({ params: params });

  const hotels = React.useMemo(() => {
    return data?.data.data || [];
  }, [data?.data.data]);

  return (
    <View style={styles.homeContainer}>
      <HomeScreenHeader />
      <BookingForm onSubmit={(input) => setParams({ params: input })} />
      {isLoading || isFetching ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator color={colors.black} />
        </View>
      ) : (
        <>
          <View style={{ marginTop: 12 }} />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={hotels}
            refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
            style={{ paddingHorizontal: 16 }}
            contentContainerStyle={{ paddingBottom: 120 }}
            renderItem={({ item }) => <HotelCard data={item} onClick={() => onClick(item)} />}
            keyExtractor={(item) => item.hotelId}
          />
        </>
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
