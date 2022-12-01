import HotelCard from '../home/home-hotel-card';
import * as React from 'react';
import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { authSelector } from '@app/redux/auth';
import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import Header from '@app/components/widgets/header';
import Text from '@app/components/elements/text';

interface Props {
  onClick: (hotel: HotelModel) => void;
}

export default function Favorite(props: Props) {
  const { onClick } = props;
  const favorities = useSelector(authSelector.favoriteSelector);

  return (
    <View style={{ flex: 1 }}>
      <Header title="Favorite Screen" titleCenter />
      {favorities.length === 0 ? (
        <Text>Belum ada favorite</Text>
      ) : (
        <FlatList
          data={favorities}
          renderItem={({ item }) => <HotelCard data={item} onClick={() => onClick(item)} />}
          keyExtractor={(item) => item.hotelId}
        />
      )}
    </View>
  );
}
