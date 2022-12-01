import * as React from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { authSelector } from '@app/redux/auth';
import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import Header from '@app/components/widgets/header';
import Text from '@app/components/elements/text';
import HomeHotelCard from '@app/components/modules/home-screen/home-hotel-card';

interface Props {
  onClick: (hotel: HotelModel) => void;
}

export default function FavoriteContent(props: Props) {
  const { onClick } = props;
  const favorities = useSelector(authSelector.favoriteSelector);

  return (
    <View style={{ flex: 1, marginHorizontal: 16, alignItems: 'center' }}>
      <Header title="Favorite Screen" titleCenter />
      {favorities.length === 0 ? (
        <Text>Belum ada favorite</Text>
      ) : (
        <FlatList
          data={favorities}
          style={{ flex: 1, width: '100%' }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <HomeHotelCard data={item} onClick={() => onClick(item)} />}
          keyExtractor={(item) => item.hotelId}
        />
      )}
    </View>
  );
}
