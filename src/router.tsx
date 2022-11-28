import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { useCredential } from "./common/containers/CredentialContainer";
import HomeScreen, {
  HOME_SCREEN_NAME,
  HOME_SCREEN_PARAMS,
} from "./screens/home-screen";
import LoginScreen, {
  LOGIN_SCREEN_NAME,
  LOGIN_SCREEN_PARAMS,
} from "./screens/login-screen";

export interface StackNavigationScreenProps<T extends keyof StackParamList> {
  navigation: StackNavigationProp<StackParamList, T>;
  route: RouteProp<StackParamList, T>;
}

export type StackParamList = {
  [HOME_SCREEN_NAME]: HOME_SCREEN_PARAMS;
  [LOGIN_SCREEN_NAME]: LOGIN_SCREEN_PARAMS;
};

export type TabsParamList = {};

const Tabs = createBottomTabNavigator<TabsParamList>();
const Stack = createStackNavigator<StackParamList>();

export default function Router() {
  const { credential } = useCredential();
  const isAuthenticated = !!credential;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name={HOME_SCREEN_NAME} component={HomeScreen} />
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
