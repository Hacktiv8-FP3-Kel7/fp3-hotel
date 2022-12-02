import { Image, StyleSheet, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import * as React from 'react';
import Text from '@app/components/elements/text';
import { bodyTypography, headlineTypography } from '@app/styles/typography';
import colors from '@app/styles/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '@app/redux/auth';
import { RematchDispatcher } from 'redux';
import ToastHelper from '@app/common/helpers/toast';

interface Props {
  data: HotelModel;
  onClick: () => void;
}

export default function HomeHotelCard(props: Props) {
  const { data, onClick } = props;

  const favorite = useSelector(authSelector.favoriteSelector);
  const dispatch = useDispatch<RematchDispatcher>();

  const isFavorite = React.useMemo(
    () => !!favorite?.find((item) => item.hotelId === data.hotelId),
    [data.hotelId, favorite],
  );

  const onAddFavorite = React.useCallback(
    (hotel: HotelModel) => {
      ToastHelper.success('Add Favorite');
      dispatch.auth.addFavorite(hotel);
    },
    [dispatch.auth],
  );

  const onRemoveFavorite = React.useCallback(
    async (hotel: HotelModel) => {
      ToastHelper.success('Remove Favorite');
      dispatch.auth.removeFavorite(hotel);
    },
    [dispatch.auth],
  );

  return (
    <TouchableOpacity onPress={onClick} style={[styles.card, styles.elevation]}>
      <Image
        style={styles.imageHero}
        source={{
          uri:
            data.images.find((image) => image.isHeroImage)?.url ??
            'https://tempe.wajokab.go.id/img/no-image.png',
        }}
      />
      <View style={styles.informationContainer}>
        <View style={styles.detailContainer}>
          <Text style={[headlineTypography.semiBold6]} numberOfLines={1}>
            {data.name}
          </Text>
          <Text style={[bodyTypography.bodySemiBold4]}>
            {data.address.city} - {data.address.country}
          </Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={24} color={colors.green} />
            <Text style={[bodyTypography.bodyRegular4, { marginLeft: 5 }]}>{data.starRating}</Text>
          </View>
        </View>
        <View style={styles.facilitiesContainer}>
          <Text style={[bodyTypography.bodySemiBold4]}>Fasilitas</Text>
          {data.amenities.length === 0 && (
            <Text style={[bodyTypography.bodyRegular5]}>Tidak ada fasilitas</Text>
          )}
          {data.amenities.slice(0, 2).map((facility, idx) => (
            <Text style={[bodyTypography.bodyRegular5]} key={idx}>
              {facility.formatted}
            </Text>
          ))}
          {data.amenities.length > 2 && (
            <Text style={[bodyTypography.bodyRegular5]}>{data.amenities.length - 2} More</Text>
          )}
        </View>
      </View>

      <TouchableHighlight
        style={styles.favoriteButton}
        underlayColor={colors.white}
        onPress={() => {
          isFavorite ? onRemoveFavorite(data) : onAddFavorite(data);
        }}
      >
        <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={28} color={colors.error} />
      </TouchableHighlight>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    flex: 1,
    height: 300,
    position: 'relative',
    marginVertical: 16,
    borderRadius: 24,
  },
  elevation: {
    elevation: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageHero: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  ratingContainer: {
    // backgroundColor: 'black',
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 9999,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
    top: 10,
  },
  informationContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 2,
    marginHorizontal: 16,
    marginTop: 8,
  },
  facilitiesContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  detailContainer: {
    flex: 1,
  },
});
