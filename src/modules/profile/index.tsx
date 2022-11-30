import { FlatList, View } from 'react-native';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '@app/redux/auth';
import Text from '@app/components/elements/text';
import BookingCard from './booking-card';
import Header from '@app/components/widgets/header';

export default function Profile() {
  const user = useSelector(authSelector.userSelector);
  const favorities = useSelector(authSelector.favoriteSelector);
  const bookings = useSelector(authSelector.bookingSelector);
  const search = useSelector(authSelector.searchHistories);

  return (
    <View>
      <Header title="Profile Screen" titleCenter back />
      <View>
        <Text>{user?.firstName || 'No Name'}</Text>
        <Text>{search.length} Pencarian</Text>
        <Text>{favorities.length} Favorite</Text>
        <Text>{bookings.length} Booking</Text>
      </View>
      <FlatList
        data={bookings}
        renderItem={({ item }) => <BookingCard booking={item} />}
        keyExtractor={(item) => item.hotelId}
      />
    </View>
  );
}
