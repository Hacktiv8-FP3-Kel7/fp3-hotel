import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import useGetHotels from '@app/api-hooks/hotel/hotel.query';
import HomeScreenHeader from '@app/components/modules/home-screen/home-screen-header';
import colors from '@app/styles/color';
import * as React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import HomeHotelCard from './home-hotel-card';
import HomeAccordionForm from './home-accordion-form';
interface Props {
  onClick: (hotel: HotelModel) => void;
}
export default function HomeContent(props: Props) {
  const { onClick } = props;
  const [params, setParams] = React.useState<any>(undefined);

  const [show, setShow] = React.useState(false);

  const onToggle = React.useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  const { data, isLoading, isFetching, refetch } = useGetHotels({ params: params });

  const hotels = React.useMemo(() => {
    return data?.data.data || [];
  }, [data?.data.data]);

  return (
    <View style={styles.homeContainer}>
      <HomeScreenHeader />
      <HomeAccordionForm
        onSubmit={(input) => setParams({ params: input })}
        show={show}
        onToggle={onToggle}
      />
      {isLoading || isFetching ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator color={colors.black} />
        </View>
      ) : !show ? (
        <View style={{ marginHorizontal: 16 }}>
          <View style={{ marginTop: 12 }} />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={hotels}
            refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
            contentContainerStyle={{ paddingBottom: 120 }}
            renderItem={({ item }) => <HomeHotelCard data={item} onClick={() => onClick(item)} />}
            keyExtractor={(item) => item.hotelId}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    // paddingHorizontal: 16,
    marginBottom: 48,
  },
  activityIndicatorContainer: {
    margin: 16,
  },
});
