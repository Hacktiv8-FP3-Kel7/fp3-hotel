import { useCredential } from '@app/common/containers/CredentialContainer';
import Text from '@app/components/elements/text';
import colors from '@app/styles/color';
import * as React from 'react';
import { StyleSheet, ScrollView, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@app/redux';
import { StackNavigationScreenProps, TabNavigationScreenProps } from '@app/router';
import { authSelector } from '@app/redux/auth';
import useCustomFont from '@app/hooks/use-custom-font';
import { TextInputProps } from '@app/components/elements/text-field/text-input-default';
import size from '@app/styles/size';
import { SETTINGS_SCREEN_NAME } from '@app/screens/settings-screen';
import { TERMS_POLICY_SCREEN_NAME } from '@app/screens/terms-policy-screen';

interface Props extends TabNavigationScreenProps<typeof SETTINGS_SCREEN_NAME> {}

function Action(props: {
  onPress?: () => void;
  text: string;
  rightText?: string;
  hasRightArrow?: boolean;
  style?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
}) {
  const { text, hasRightArrow = true, onPress, rightText, style, buttonTextStyle } = props;
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, buttonTextStyle]}>{text}</Text>
      <View style={styles.rightSideButton}>
        {rightText && <Text>{rightText}</Text>}
        {hasRightArrow && <Text style={{ color: colors.grey, marginLeft: 8 }}>{'>'}</Text>}
      </View>
    </TouchableOpacity>
  );
}

function ProfileInput(
  props: { text: string; onBlur?: (value: string) => void } & Omit<TextInputProps, 'onBlur'>,
) {
  const tempValue = React.useRef(props.value || '');
  const customFont = useCustomFont(props, styles.textField);
  return (
    <View style={[styles.button]}>
      <Text style={styles.buttonText}>{props.text}</Text>
      <TextInput
        placeholder={props.text}
        style={customFont.style}
        defaultValue={tempValue.current}
        onChangeText={(text) => {
          tempValue.current = text;
        }}
        onBlur={() => {
          props.onBlur?.(tempValue.current);
        }}
      />
    </View>
  );
}

const Divider = () => <View style={styles.divider} />;

export default function SettingContent(props: Props) {
  const { setCredential } = useCredential();
  const user = useSelector(authSelector.userSelector);
  const dispatch = useDispatch<Dispatch>();
  const onClickLogout = React.useCallback(() => {
    dispatch.auth.reset();
    setCredential(undefined);
  }, [dispatch.auth, setCredential]);

  const onProfileChange = (param: { value: string; name: string }) => {
    dispatch.auth.setUser({ ...user, [`${param.name}`]: param.value });
  };

  const onClickTerms = React.useCallback(() => {
    props.navigation.navigate({
      name: TERMS_POLICY_SCREEN_NAME,
      params: undefined,
    });
  }, [props.navigation]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.mt12}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>My Account</Text>
        <ProfileInput
          text="First Name"
          value={user?.firstName}
          onBlur={(value) => onProfileChange({ value, name: 'firstName' })}
        />
        <Divider />
        <ProfileInput
          text="last Name"
          value={user?.lastName}
          onBlur={(value) => onProfileChange({ value, name: 'lastName' })}
        />
        <Divider />
        <ProfileInput
          text="Email"
          value={user?.email}
          onBlur={(value) => onProfileChange({ value, name: 'email' })}
        />
        <Divider />
        <ProfileInput
          text="Gender"
          value={user?.gender}
          onBlur={(value) => onProfileChange({ value, name: 'gender' })}
        />
        <Divider />
        <Action text="Language" onPress={() => {}} />
        <Divider />
        <Action text="Search History" onPress={() => {}} />
        <Divider />
        <Action text="Report A Problem" onPress={() => {}} />
      </View>
      <View style={styles.separatorVertical} />
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>Support</Text>
        <Action text="Term & Policy" onPress={onClickTerms} />
        <Divider />
        <Action buttonTextStyle={{ color: colors.red }} text="Log out" onPress={onClickLogout} />
      </View>
      <View style={styles.separatorVertical} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separatorVertical: {
    marginVertical: 8,
  },
  button: {
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonText: {
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  rightSideButton: {
    flexDirection: 'row',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: colors.background,
  },
  cardTitle: {
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingTop: 12,

    // Shadow
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textField: {
    marginLeft: 8,
    flex: 1,
    color: colors.grey,
    fontSize: size.defaultText,
    textAlign: 'right',
  },
  mt12: {
    marginTop: 12,
  },
});
