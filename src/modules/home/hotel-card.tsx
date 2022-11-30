import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';
import * as React from 'react';
import Text from '@app/components/elements/text';
import { bodyTypography, headlineTypography } from '@app/styles/typography';
import colors from '@app/styles/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '@app/redux/auth';

interface Props {
  data: HotelModel;
}

export default function HotelCard(props: Props) {
  const { data } = props;

  const favorite = useSelector(authSelector.favoriteSelector);
  const dispatch = useDispatch();

  const isFavorite = React.useMemo(
    () => !!favorite.find((item) => item.hotelId === data.hotelId),
    [data.hotelId, favorite],
  );

  const onAddFavorite = React.useCallback(
    (hotel: HotelModel) => {
      dispatch.auth.addFavorite(hotel);
    },
    [dispatch.auth],
  );

  const onRemoveFavorite = React.useCallback(
    (hotel: HotelModel) => {
      dispatch.auth.removeFavorite(hotel);
    },
    [dispatch.auth],
  );

  return (
    <View style={[styles.card, styles.elevation]}>
      <Image
        style={styles.imageHero}
        source={{
          uri:
            data.images.find((image) => image.isHeroImage)?.url ??
            'https://tempe.wajokab.go.id/img/no-image.png',
        }}
      />
      <View style={styles.informationContainer}>
        <View>
          <Text style={[headlineTypography.semiBold6]}>{data.name}</Text>
          <Text style={[bodyTypography.bodySemiBold4]}>
            {data.address.city} - {data.address.country}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={[bodyTypography.bodyRegular4, { marginRight: 5 }]}>{data.starRating}</Text>
            <Ionicons name="star" size={24} color={colors.yellowStar} />
          </View>
        </View>
        <View style={styles.facilitiesContainer}>
          <Text style={[bodyTypography.bodySemiBold5]}>Fasilitas</Text>
          {data.aminities.slice(0, 2).map((facility) => (
            <Text style={[bodyTypography.bodySemiBold5]}>{facility.formatted}</Text>
          ))}
          {data.aminities.length > 2 && (
            <Text style={[bodyTypography.bodySemiBold5]}>{data.aminities.length - 2} More</Text>
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
        <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={colors.error} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    height: 300,
    position: 'relative',
  },
  elevation: {
    elevation: 10,
    shadowColor: colors.placeholder,
  },
  imageHero: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  ratingContainer: {
    // backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 9999,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
  },
  informationContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  facilitiesContainer: {
    alignItems: 'flex-end',
  },
});
