import useCustomFont from '@app/hooks/use-custom-font';
import colors from '@app/styles/color';
import color from '@app/styles/color';
import size from '@app/styles/size';
import typography from '@app/styles/typography';
import { format } from 'date-fns';
import React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FormContext } from './form';
import InputGroup from './input-group';
import { iconSize } from './submit-field';
import Text from './text';

export interface DateFieldProps extends TextProps {
  name: string;
  type: 'date';
  label?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  leftIconComponent?: (iconSize: any, iconColor: any) => React.ReactNode;
  rightIconComponent?: (iconSize: any, iconColor: any) => React.ReactNode;
  onAfterChange?: () => void;
  rightIconOnPress?: () => void;
  leftIconOnPress?: () => void;
  isError?: boolean;
  required?: boolean;
  textInputContainerStyle?: StyleProp<ViewStyle>;
  multiline?: boolean;
  placeholder?: string;
  valueDate?: Date;
  dateFormat?: string;
}

function DateField(props: DateFieldProps, ref: any) {
  const {
    name,
    label,
    containerStyle,
    leftIconComponent,
    rightIconComponent,
    rightIconOnPress,
    textInputContainerStyle,
    isError,
    placeholder,
    multiline,
    valueDate,
    leftIconOnPress,
    dateFormat = 'dd MMMM yyyy',
    ...restProps
  } = props;
  const customRef = React.useRef<TextInput>();
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ control, name: name });
  const { editable } = React.useContext(FormContext);
  const [isFocused, setIsFocused] = React.useState(false);
  const _handleOnPressView = React.useCallback(
    (onPress?: () => void) => {
      if (!isFocused && !onPress) {
        if (customRef?.current) {
          customRef.current.focus();
        } else if (ref?.current) {
          ref?.current?.focus && ref?.current?.focus();
        }
      } else {
        onPress && onPress();
      }
    },
    [isFocused, ref],
  );
  const currentIconColor = isFocused ? color.primary : color.black;
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);

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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    field.onChange(currentDate);
  };

  return (
    <InputGroup error={!!fieldState.error} style={[styles.inputGroup]}>
      {label && renderLabel(!!fieldState.error)}
      <TouchableOpacity
        style={[
          styles.defaultTextInputContainer,
          !editable && styles.disabledContainer,
          multiline && styles.multilineContainer,
          isError && containerStyle,
          textInputContainerStyle,
        ]}
        onPress={() => {
          setShow(!show);
        }}
      >
        {leftIconComponent && (
          <Pressable
            onPress={() => _handleOnPressView(leftIconOnPress)}
            style={styles.leftIconContainer}
          >
            <View>{leftIconComponent(iconSize, currentIconColor)}</View>
          </Pressable>
        )}
        {field.value ? (
          <Text style={{ paddingHorizontal: 16 }}>{format(field.value, dateFormat)}</Text>
        ) : (
          <Text style={[{ color: isError ? color.red : color.placeholder, paddingHorizontal: 16 }]}>
            {placeholder}
          </Text>
        )}

        {rightIconComponent && (
          <Pressable
            style={styles.rightIconContainer}
            onPress={() => {
              rightIconOnPress && rightIconOnPress();
            }}
          >
            {rightIconComponent(iconSize, currentIconColor)}
          </Pressable>
        )}
      </TouchableOpacity>
      {!!fieldState.error?.message && (
        <Text style={styles.infoErrorText}>{fieldState.error?.message}</Text>
      )}
      {show && <DateTimePicker value={date} mode={'date'} onChange={onChange} />}
    </InputGroup>
  );
}

export default React.forwardRef(DateField);

const styles = StyleSheet.create({
  defaultStyle: {
    height: '100%',
    width: '100%',
    color: color.defaultText,
    paddingHorizontal: 16,
    flex: 1,
    fontSize: size.defaultText,
  },
  multilineContainer: {
    height: 100,
    paddingVertical: 8,
  },
  disabledContainer: {
    backgroundColor: color.placeholderBackground,
  },
  requiredText: {
    color: color.error,
    letterSpacing: -2,
  },
  leftIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    height: '100%',
  },
  rightIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
    height: '100%',
  },
  animatedDefaultStyle: {
    height: '100%',
    borderColor: color.platinum,
    borderRadius: 10,
    color: color.defaultText,
    paddingHorizontal: 16,
    flex: 1,
    fontSize: size.defaultText,
  },
  defaultTextInputContainer: {
    height: size.inputHeight,
    borderRadius: 6,
    backgroundColor: color.white,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: color.neutral,
    borderWidth: 1,
  },
  placeholderStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  textAlignTop: {
    textAlignVertical: 'top',
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
  infoErrorText: {
    color: colors.error,
  },
});
