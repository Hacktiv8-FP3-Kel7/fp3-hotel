import useGetHotels from '@app/api-hooks/hotel/hotel.query';
import Home from '@app/modules/home';
import HotelCard from '@app/modules/home/hotel-card';
import * as React from 'react';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useCredential } from '../common/containers/CredentialContainer';
import { RematchDispatcher } from '../redux';
import { authSelector } from '../redux/auth';
import { TabNavigationScreenProps } from '../router';

export const HOME_SCREEN_NAME = 'Home Screen';
export type HOME_SCREEN_PARAMS = undefined;

interface Props extends TabNavigationScreenProps<typeof HOME_SCREEN_NAME> {}

export default function HomeScreen(props: Props) {
  const user = useSelector(authSelector.userSelector);
  const favorite = useSelector(authSelector.favoriteSelector);

  const dispatch = useDispatch<RematchDispatcher>();
  const { setCredential } = useCredential();
  const onClickLogout = React.useCallback(() => {
    dispatch.auth.reset();
    setCredential(undefined);
  }, [dispatch.auth, setCredential]);

  const { data } = useGetHotels();

  const hotels = data?.data.data || [];

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      {/* <BookingForm /> */}
      <FlatList
        data={hotels || []}
        renderItem={({ item }) => <HotelCard data={item} />}
        keyExtractor={(item) => item.hotelId}
      />

      <Home />
    </View>
  );
}
