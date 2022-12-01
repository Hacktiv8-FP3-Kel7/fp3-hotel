// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigationContainer,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { useCredential } from './common/containers/CredentialContainer';
import HomeScreen, { HOME_SCREEN_NAME, HOME_SCREEN_PARAMS } from './screens/home-screen';
import LoginScreen, { LOGIN_SCREEN_NAME, LOGIN_SCREEN_PARAMS } from './screens/login-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from './styles/color';
import Text from './components/elements/text';
import FavoriteScreen, {
  FAVORITE_SCREEN_NAME,
  FAVORITE_SCREEN_PARAMS,
} from './screens/favorite-screen';
import ProfileScreen, {
  PROFILE_SCREEN_NAME,
  PROFILE_SCREEN_PARAMS,
} from './screens/profile-screen';
import SettingScreen, {
  SETTINGS_SCREEN_NAME,
  SETTINGS_SCREEN_PARAMS,
} from './screens/settings-screen';
import typography from './styles/typography';
import { Dimensions, StyleSheet } from 'react-native';
import DetailHotelScreen, {
  DETAIL_HOTEL_NAME,
  DETAIL_HOTEL_PARAMS,
} from './screens/detail-hotel-screen';
import TermsPolicyScreen, {
  TERMS_POLICY_SCREEN_NAME,
  TERMS_POLICY_SCREEN_PARAMS,
} from './screens/terms-policy-screen';
import BookingHotelScreen, {
  BOOKING_HOTEL_NAME,
  BOOKING_HOTEL_PARAMS,
} from './screens/booking-hotel-screen';
import {
  SEARCH_HISTORY_SCREEN_NAME,
  SEARCH_HISTORY_SCREEN_PARAMS,
} from './screens/search-history-screen';

const { width } = Dimensions.get('screen');

export type TabsParamList = {
  [HOME_SCREEN_NAME]: HOME_SCREEN_PARAMS;
  [FAVORITE_SCREEN_NAME]: FAVORITE_SCREEN_PARAMS;
  [PROFILE_SCREEN_NAME]: PROFILE_SCREEN_PARAMS;
  [SETTINGS_SCREEN_NAME]: SETTINGS_SCREEN_PARAMS;
};
export const BOTTOM_TABS_NAME = 'Bottom Tabs';

export type StackParamList = {
  [BOTTOM_TABS_NAME]: NavigatorScreenParams<TabsParamList>;
  [LOGIN_SCREEN_NAME]: LOGIN_SCREEN_PARAMS;
  [DETAIL_HOTEL_NAME]: DETAIL_HOTEL_PARAMS;
  [TERMS_POLICY_SCREEN_NAME]: TERMS_POLICY_SCREEN_PARAMS;
  [BOOKING_HOTEL_NAME]: BOOKING_HOTEL_PARAMS;
  [SEARCH_HISTORY_SCREEN_NAME]: SEARCH_HISTORY_SCREEN_PARAMS;
};
export interface StackNavigationScreenProps<T extends keyof StackParamList> {
  navigation: StackNavigationProp<StackParamList, T>;
  route: RouteProp<StackParamList, T>;
}

export interface TabNavigationScreenProps<T extends keyof TabsParamList> {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<TabsParamList, T>,
    StackNavigationProp<StackParamList>
  >;
  route: RouteProp<TabsParamList, T>;
}

const Tabs = createBottomTabNavigator<TabsParamList>();
const Stack = createStackNavigator<StackParamList>();

const Tab = () => {
  return (
    <Tabs.Navigator
      backBehavior="firstRoute"
      initialRouteName={HOME_SCREEN_NAME}
      sceneContainerStyle={{ backgroundColor: 'white' }}
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarStyle: {
          ...styles.tabStyle,
          position: 'absolute',
        },
      }}
    >
      <Tabs.Screen
        name={HOME_SCREEN_NAME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="home" size={24} color={color.blue} />
            ) : (
              <Ionicons name="home-outline" size={24} color={color.black} />
            ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                typography.body,
                { color: focused ? color.blue : color.black, paddingBottom: 6 },
              ]}
            >
              {'Home'}
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name={FAVORITE_SCREEN_NAME}
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="favorite" size={24} color={color.blue} />
            ) : (
              <MaterialIcons name="favorite-border" size={24} color={color.black} />
            ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                typography.body,
                { color: focused ? color.blue : color.black, paddingBottom: 6 },
              ]}
            >
              {'Favorite'}
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name={PROFILE_SCREEN_NAME}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color={color.blue} />
            ) : (
              <Ionicons name="person-outline" size={24} color={color.black} />
            ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                typography.body,
                { color: focused ? color.blue : color.black, paddingBottom: 6 },
              ]}
            >
              {'Profile'}
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name={SETTINGS_SCREEN_NAME}
        component={SettingScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="settings" size={24} color={color.blue} />
            ) : (
              <Ionicons name="settings-outline" size={24} color={color.black} />
            ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                typography.body,
                { color: focused ? color.blue : color.black, paddingBottom: 6 },
              ]}
            >
              {'Settings'}
            </Text>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default function Router() {
  const { credential } = useCredential();
  const isAuthenticated = !!credential;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#fff' } }}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen name={BOTTOM_TABS_NAME} component={Tab} />
            <Stack.Screen name={TERMS_POLICY_SCREEN_NAME} component={TermsPolicyScreen} />
            <Stack.Screen name={DETAIL_HOTEL_NAME} component={DetailHotelScreen} />
            <Stack.Screen name={BOOKING_HOTEL_NAME} component={BookingHotelScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name={LOGIN_SCREEN_NAME} component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: color.white,
    width: width - 40,
    height: 65,
    paddingTop: 4,
    borderRadius: 16,
    marginBottom: 30,
    paddingBottom: 0,
    elevation: 4,
    alignSelf: 'center',
    shadowColor: color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    left: (width - 40) / 20,
    right: 0,
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
