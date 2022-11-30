import useGetHotels from '@app/api-hooks/hotel/hotel.query';
import HomeScreenHeader from '@app/components/modules/home-screen/home-screen-header';
import Home from '@app/modules/home';
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
  const dispatch = useDispatch<RematchDispatcher>();
  const { setCredential } = useCredential();
  const onClickLogout = React.useCallback(() => {
    dispatch.auth.reset();
    setCredential(undefined);
  }, [dispatch.auth, setCredential]);

  const { data } = useGetHotels();

  const hotels = data?.data || [];
  // console.log(hotels?.data);
  // hotels?.data?.map((hotel) => console.log(hotel.name)); //worked
  // hotels?.map((hotel) => console.log(hotel.name)); //error

  return (
    <>
      <HomeScreenHeader />
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        {/* <BookingForm /> */}
        <FlatList
          data={hotels || []}
          renderItem={(item) => <></>}
          keyExtractor={(item) => item.hotelId}
        />

        <Home />
      </View>
    </>
  );
}
