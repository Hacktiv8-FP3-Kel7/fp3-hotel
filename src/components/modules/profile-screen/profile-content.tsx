import { FlatList, Image, StyleSheet, View } from 'react-native';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '@app/redux/auth';
import Text from '@app/components/elements/text';
import BookingCard from './profile-booking-card';
import Header from '@app/components/widgets/header';
import { bodyTypography, headlineTypography } from '@app/styles/typography';
import EmptyView from '@app/components/widgets/empty-view';

export default function ProfileContent() {
  const user = useSelector(authSelector.userSelector);
  const favorities = useSelector(authSelector.favoriteSelector);
  const bookings = useSelector(authSelector.bookingSelector);
  const search = useSelector(authSelector.searchHistories);

  return (
    <View>
      <Header title="Profile Screen" titleCenter />
      <View
        style={{
          margin: 16,
          alignItems: 'center',
          paddingVertical: 8,
          paddingHorizontal: 24,
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderRadius: 8,
        }}
      >
        <Image style={styles.imageHero} source={require('../../../../assets/aheng.jpeg')} />
        <Text style={[headlineTypography.bold5, { textTransform: 'capitalize', marginTop: 12 }]}>
          {user?.firstName || 'No Name'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 16,
            width: '100%',
          }}
        >
          <Text style={[bodyTypography.bodyRegular3]}>{search.length} Pencarian</Text>
          <Text style={[bodyTypography.bodyRegular3]}>{favorities.length} Favorite</Text>
          <Text style={[bodyTypography.bodyRegular3]}>{bookings.length} Booking</Text>
        </View>
      </View>
      <Text style={[headlineTypography.bold5, { margin: 16 }]}>History Booking</Text>
      <View style={{ alignItems: 'center' }}>
        {bookings.length === 0 ? (
          <EmptyView title={'Tidak Ada History Booking'} />
        ) : (
          <View>
            <FlatList
              data={bookings}
              contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 180 }}
              renderItem={({ item }) => <BookingCard booking={item} />}
              keyExtractor={(item) => item.hotelId}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageHero: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 999,
  },
});
