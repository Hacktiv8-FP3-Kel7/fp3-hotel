import React from 'react';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native';

import color from '../../styles/color';
import size from '../../styles/size';
import useCustomFont from '../../hooks/use-custom-font';

interface Props extends TextInputProps {
  value?: string;
  children?: any;
  ref?: React.Ref<TextInput>;
  containerStyle?: StyleProp<ViewStyle>;
  leftIconComponent?: (size: any, color: any) => React.ReactNode;
  rightIconComponent?: (size: any, color: any) => React.ReactNode;
  rightIconOnPress?: () => void;
  leftIconOnPress?: () => void;
  isError?: boolean;
  required?: boolean;
  textInputContainerStyle?: StyleProp<ViewStyle>;
  mask?: string;
}

interface AnimatedTextInputProps extends Props {
  isError?: boolean;
  requiredText?: boolean;
}

function CustomTextInput(props: Props, ref: any) {
  const [isFocused, setIsFocused] = React.useState(false);
  const customRef = React.useRef<TextInput>();
  const {
    value,
    style,
    onFocus,
    onBlur,
    textInputContainerStyle,
    leftIconComponent,
    rightIconComponent,
    rightIconOnPress,
    leftIconOnPress,
    selectionColor = color.textInputSelection,
    multiline = false,
    editable = true,
    isError = false,
    ...restProps
  } = props;

  const customFont = useCustomFont(restProps, styles.defaultStyle);

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
    [ref, isFocused],
  );

  const currentIconColor = isFocused ? color.primary : color.black;

  const _handleOnFocus = React.useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onFocus && onFocus(e);
      setIsFocused(true);
    },
    [onFocus],
  );

  const _handleOnBlur = React.useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onBlur && onBlur(e);
      setIsFocused(false);
    },
    [onBlur],
  );

  const currentBorderColor = React.useMemo(() => {
    return isError ? color.error : !isFocused ? color.platinum : color.black;
  }, [isError, isFocused]);

  const containerStyle: any = {
    borderColor: currentBorderColor,
    borderWidth: 0.5,
    // borderRadius: 10,
  };

  return (
    <View
      style={[
        styles.defaultTextInputContainer,
        !editable && styles.disabledContainer,
        multiline && styles.multilineContainer,
        isError && containerStyle,
        textInputContainerStyle,
      ]}>
      {leftIconComponent && (
        <Pressable
          onPress={() => _handleOnPressView(leftIconOnPress)}
          style={styles.leftIconContainer}>
          <View>{leftIconComponent(iconSize, currentIconColor)}</View>
        </Pressable>
      )}
      <TextInput
        {...customFont.props}
        style={[customFont.style, multiline && styles.textAlignTop, style]}
        selectionColor={selectionColor}
        value={value}
        multiline={multiline}
        onFocus={_handleOnFocus}
        onBlur={_handleOnBlur}
        placeholderTextColor={isError ? color.red : color.placeholder}
        editable={editable}
        ref={(ref ? ref : customRef) as any}
      />
      {rightIconComponent && (
        <Pressable
          style={styles.rightIconContainer}
          onPress={() => {
            rightIconOnPress && rightIconOnPress();
          }}>
          {rightIconComponent(iconSize, currentIconColor)}
        </Pressable>
      )}
    </View>
  );
}

export const iconSize = 22;

export default React.forwardRef(CustomTextInput);

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
});
