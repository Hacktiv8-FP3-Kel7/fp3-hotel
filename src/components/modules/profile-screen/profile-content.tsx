import { FlatList, View } from 'react-native';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '@app/redux/auth';
import Text from '@app/components/elements/text';
import BookingCard from './profile-booking-card';
import Header from '@app/components/widgets/header';
import { bodyTypography, headlineTypography } from '@app/styles/typography';

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
        <Text style={[headlineTypography.bold5]}>{user?.firstName || 'No Name'}</Text>
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
      {bookings.length === 0 ? (
        <Text style={[headlineTypography.bold5, { margin: 16 }]}>Tidak ada history booking</Text>
      ) : (
        <View style={{ marginTop: 16, marginBottom: 180 }}>
          <FlatList
            data={bookings}
            contentContainerStyle={{ paddingHorizontal: 8, marginBottom: 180 }}
            renderItem={({ item }) => <BookingCard booking={item} />}
            keyExtractor={(item) => item.hotelId}
          />
        </View>
      )}
    </View>
  );
}
