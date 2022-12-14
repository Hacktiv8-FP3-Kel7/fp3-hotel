import * as React from 'react';
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  View,
  // Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { useFormContext, useController } from 'react-hook-form';
import Text from '../text';
import typography from '../../../styles/typography';
import InputGroup from '../input-group';
import colors from '../../../styles/color';
import size from '../../../styles/size';
import TextInput, { TextInputProps } from './text-input-default';
import { FormContext } from '../form';
import { InputProps } from '../field-type';

export interface TextFieldProps extends TextInputProps, InputProps {
  name: string;
  type: 'normal' | 'phone' | 'password' | 'numeric';
  label?: React.ReactNode;
  dialCode?: string;
  required?: boolean;
  isShowingPassword?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onAfterChange?: () => void;
  rightIconOnPress?: () => void;
  onPressShowPassword?: () => void;
  leftIconComponent?: (iconSize: any, iconColor: any) => React.ReactNode;
  rightIconComponent?: (iconSize: any, iconColor: any) => React.ReactNode;
  textInputContainerStyle?: StyleProp<ViewStyle>;
  bottomSheet?: boolean;
}

export default function TextField(props: TextFieldProps) {
  const {
    type,
    dialCode = '',
    onAfterChange,
    rightIconOnPress,
    label,
    containerStyle,
    ...restProps
  } = props;

  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ control, name: props.name });
  const { editable } = React.useContext(FormContext);

  const [showText, setShowText] = React.useState<boolean>(false);

  const onToggle = React.useCallback(() => {
    setShowText((prev) => !prev);
  }, []);

  let content: React.ReactNode = null;

  const _onChange = React.useCallback(
    (value: string) => {
      let newValue = value;

      switch (type) {
        case 'phone':
          const prefix = dialCode;
          let maskedText = value.replace(/(\D|^0)/g, '');
          if (maskedText.length <= prefix.length) {
            maskedText = prefix;
          }
          if (!maskedText.startsWith(prefix)) {
            maskedText = prefix.concat(maskedText);
          }
          newValue = `${prefix ? '+' : ''}${maskedText}`;
          break;
        case 'numeric':
          let output = value.replace(/[^0-9.]/g, '').split('.');
          const newText = output.shift() + (output.length ? '.' + output.join('') : '');
          newValue = newText;

          break;
      }

      field.onChange(newValue);
      onAfterChange && onAfterChange();
    },
    [dialCode, field, onAfterChange, type],
  );

  switch (type) {
    case 'normal':
      const {
        // onChange: normalOnChange,
        // onBlur: normalOnBlur,
        ...normalRestFields
      } = field;
      content = (
        <TextInput
          {...restProps}
          {...normalRestFields}
          editable={editable}
          isError={!!fieldState.error}
          onChangeText={_onChange}
        />
      );
      break;
    case 'numeric':
      const {
        // onChange: numericOnChange,
        // onBlur: numericOnBlur,
        ...numericRestFields
      } = field;
      content = (
        <TextInput
          {...restProps}
          {...numericRestFields}
          editable={editable}
          isError={!!fieldState.error}
          keyboardType="numeric"
          onChangeText={_onChange}
        />
      );
      break;
    case 'phone':
      const {
        // onChange: phoneOnChange,
        // onBlur: phoneOnBlur,
        ...phoneRestFields
      } = field;
      content = (
        <View style={styles.phoneFieldContainer}>
          <View style={styles.prefixContainer}>
            <Text style={[typography.heading2, styles.phonePrefix]}>+62</Text>
          </View>
          <View style={styles.flex}>
            <TextInput
              {...restProps}
              {...phoneRestFields}
              editable={editable}
              isError={!!fieldState.error}
              keyboardType="numeric"
              onChangeText={_onChange}
              rightIconOnPress={rightIconOnPress}
            />
          </View>
        </View>
      );
      break;
    case 'password':
      const {
        // onChange: passwordOnChange,
        // onBlur: passwordOnBlur,
        ...passwordRestFields
      } = field;
      content = (
        <>
          <TextInput
            {...restProps}
            {...passwordRestFields}
            isError={!!fieldState.error}
            rightIconOnPress={onToggle}
            rightIconComponent={() => (
              <Icon
                name={!showText ? 'eye-slash' : 'eye'}
                size={25}
                color={fieldState.error ? colors.error : colors.placeholder}
              />
            )}
            secureTextEntry={!showText}
            onChangeText={_onChange}
          />
        </>
      );
      break;
  }

  const renderLabel = (isError: boolean) => {
    if (typeof label === 'string') {
      return (
        <View style={styles.mb6}>
          <Text style={[typography.body, { color: isError ? colors.red : colors.label }]}>
            {label}
            {restProps.required && <Text style={styles.requiredText}>{'    *'}</Text>}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.mb6}>
        {label}
        {restProps.required && <Text style={styles.requiredText}>{'    *'}</Text>}
      </View>
    );
  };

  return (
    <InputGroup error={!!fieldState.error} style={[styles.inputGroup, containerStyle]}>
      {label && renderLabel(!!fieldState.error)}
      {content}
      {!!fieldState.error?.message && (
        <Text style={styles.infoErrorText}>{fieldState.error?.message}</Text>
      )}
    </InputGroup>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  mb6: {
    marginBottom: 6,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    color: colors.label,
  },
  eyeIcon: {
    position: 'absolute',
    top: 11,
    right: 10,
    zIndex: 1000,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  phoneFieldContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  prefixContainer: {
    backgroundColor: colors.placeholderBackground,
    borderRadius: 8,
    height: size.inputHeight,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  phonePrefix: {
    color: colors.sonicSilver,
  },
  requiredText: {
    color: colors.error,
    letterSpacing: -2,
    fontSize: 12,
  },
  infoErrorText: {
    color: colors.error,
  },
});
