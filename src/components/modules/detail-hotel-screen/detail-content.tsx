import { HotelModel } from '@app/api-hooks/hotel/hotel.model';
import Text from '@app/components/elements/text';
import Header, { HEADER_HEIGHT } from '@app/components/widgets/header';
import colors from '@app/styles/color';
import typography, { bodyTypography, headlineTypography } from '@app/styles/typography';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import ReactNativeParallaxHeader from 'react-native-parallax-header';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  data: HotelModel;
  onClick: (hotel: HotelModel) => void;
}
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const NAV_BAR_HEIGHT = HEADER_HEIGHT - 20;

function FacilityItem(props: { facilityName: string }) {
  const { facilityName } = props;
  return (
    <View
      style={{
        padding: 8,
        marginHorizontal: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 8,
        backgroundColor: 'white',
      }}
    >
      <Text>{facilityName}</Text>
    </View>
  );
}

export default function DetailContent(props: Props) {
  const { data, onClick } = props;
  const navigation = useNavigation();
  const scrolling = React.useRef(new Animated.Value(0)).current;

  const renderNavBar = React.useCallback(() => {
    return (
      <View style={styles.navContainer}>
        <View style={styles.statusBar} />
        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              backgroundColor: colors.white,
              borderRadius: 999,
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 6,
              // marginTop: 4,
            }}
          >
            <AntDesign name="arrowleft" size={24} color={colors.blue} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [navigation]);

  const renderContent = React.useCallback(() => {
    return (
      <View style={{ marginHorizontal: 16 }}>
        <View style={{ marginVertical: 8 }}>
          <Text style={[headlineTypography.semiBold5, { margin: 8, textAlign: 'center' }]}>
            {data.name}
          </Text>
          <Text>Kota : {data.address.city}</Text>
          <Text>Negara : {data.address.country}</Text>
          <Text style={[bodyTypography.bodyRegular4]}>Rating : {data.starRating}</Text>
          <Text>Fasilitas :</Text>
          {data.amenities.length === 0 ? (
            <Text>Tidak ada Fasilitas</Text>
          ) : (
            <FlatList
              data={data.amenities}
              contentContainerStyle={{
                padding: 16,
              }}
              renderItem={({ item }) => (
                <FacilityItem facilityName={item.formatted} key={item.code} />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        <Text style={[headlineTypography.semiBold7]}>Deskripsi</Text>
        <View>
          <Text style={{ textAlign: 'justify' }}>{data.description.short}</Text>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={{ textAlign: 'justify' }}>{data.description.short}</Text>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={{ textAlign: 'justify' }}>{data.description.short}</Text>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={{ textAlign: 'justify' }}>{data.description.short}</Text>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={{ textAlign: 'justify' }}>{data.description.short}</Text>
        </View>

        <TouchableOpacity
          style={{
            borderColor: colors.black,
            borderWidth: 1,
            padding: 12,
            borderRadius: 10,
            marginVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => onClick(data)}
        >
          <Text>Booking</Text>
        </TouchableOpacity>
      </View>
    );
  }, [data, onClick]);

  const titleInterpolation = scrolling.interpolate({
    inputRange: [0, 200],
    outputRange: [0, 1],
  });
  const titleAnimatedStyle = {
    opacity: titleInterpolation,
  };

  return (
    <>
      {/* <Header title="Detail Hotel" titleCenter back /> */}
      <ReactNativeParallaxHeader
        headerMinHeight={HEADER_HEIGHT + 20}
        headerMaxHeight={300}
        extraScrollHeight={50}
        navbarColor={colors.white}
        titleStyle={[styles.titleStyle]}
        title={data.name}
        alwaysShowTitle={true}
        headerTitleStyle={titleAnimatedStyle}
        backgroundImage={{
          uri:
            data.images.find((image) => image.isHeroImage)?.url ??
            'https://tempe.wajokab.go.id/img/no-image.png',
        }}
        backgroundImageScale={2}
        renderNavBar={renderNavBar}
        renderContent={renderContent}
        containerStyle={styles.container}
        contentContainerStyle={styles.contentContainer}
        innerContainerStyle={styles.container}
        scrollViewProps={{
          onScroll: Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrolling,
                  },
                },
              },
            ],
            { useNativeDriver: false },
          ),
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
  },
  heroContainer: {},
  imageContainer: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  navContainer: {
    height: NAV_BAR_HEIGHT + 10,
    marginHorizontal: 10,
  },
  statusBar: {
    height: Constants.statusBarHeight - 14,
    backgroundColor: 'transparent',
  },
  navBar: {
    height: NAV_BAR_HEIGHT + 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 14,
    // backgroundColor: 'red',
    top: 7,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
