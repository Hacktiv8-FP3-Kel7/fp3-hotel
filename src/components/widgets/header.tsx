import typography from '@app/styles/typography';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  Dimensions,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  SafeAreaView,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Constants from 'expo-constants';
import colors from '@app/styles/color';

interface Props {
  title?: React.ReactNode;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  children?: React.ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
  back?: boolean;
  titleStyle?: StyleProp<TextStyle>;
  titleCenter?: boolean;
  topSafeArea?: boolean;
}

export const HEADER_HEIGHT = 60;

const { width: screenWidth } = Dimensions.get('window');

export default function Header(props: Props) {
  const navigation = useNavigation();
  const {
    title,
    leftComponent,
    rightComponent,
    children,
    wrapperStyle,
    back,
    titleStyle,
    titleCenter,
    topSafeArea = true,
  } = props;
  const { goBack } = navigation;
  const close = React.useCallback(() => {
    goBack();
  }, [goBack]);
  const renderTitle = React.useCallback(() => {
    return (
      <View>
        {title ? (
          typeof title === 'string' ? (
            <View
              style={[styles.titleContainer, { alignItems: titleCenter ? 'center' : 'flex-start' }]}
            >
              <Text
                style={[typography.heading1, titleStyle]}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {title}
              </Text>
            </View>
          ) : (
            title
          )
        ) : null}
      </View>
    );
  }, [title, titleCenter, titleStyle]);

  const renderLeft = React.useCallback(() => {
    if (leftComponent) {
      return leftComponent;
    } else {
      return back ? (
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={24} color={colors.blue} />
        </TouchableOpacity>
      ) : null;
    }
  }, [back, leftComponent]);

  const renderRight = React.useCallback(
    () => (rightComponent ? rightComponent : null),
    [rightComponent],
  );

  return (
    <>
      {topSafeArea && Platform.OS === 'ios' && (
        <View style={[styles.statusBar, { backgroundColor: colors.white }]} />
      )}
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent barStyle={'dark-content'} />
        {children ? (
          children
        ) : (
          <>
            {(leftComponent || back) && (
              <View style={[styles.left, { flexShrink: 1 }]}>{renderLeft()}</View>
            )}
            {title && <View style={styles.center}>{renderTitle()}</View>}
            {rightComponent && <View style={[styles.right]}>{renderRight()}</View>}
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  left: {
    justifyContent: 'center',
    height: HEADER_HEIGHT,
  },
  center: {
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 1,
    height: HEADER_HEIGHT,
  },
  right: {
    justifyContent: 'center',
    height: HEADER_HEIGHT,
  },
  statusBar: {
    height: Constants.statusBarHeight - 14,
  },
});
