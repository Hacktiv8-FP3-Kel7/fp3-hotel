import React from "react";
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
} from "react-native";

import Animated from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import color from "../../styles/color";
import size from "../../styles/size";
import useCustomFont from "../../hooks/use-custom-font";
import Text from "../elements/text";

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
  // inputType?: InputType;
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
    placeholderTextColor = color.placeholder,
    selectionColor = color.textInputSelection,
    multiline = false,
    editable = true,
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
    [ref, isFocused]
  );

  const currentIconColor = isFocused ? color.primary : color.black;

  const _handleOnFocus = React.useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onFocus && onFocus(e);
      setIsFocused(true);
    },
    [onFocus]
  );

  const _handleOnBlur = React.useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onBlur && onBlur(e);
      setIsFocused(false);
    },
    [onBlur]
  );

  return (
    <View
      style={[
        styles.defaultTextInputContainer,
        !editable && styles.disabledContainer,
        multiline && styles.multilineContainer,
        textInputContainerStyle,
      ]}
    >
      {leftIconComponent && (
        <Pressable
          onPress={() => _handleOnPressView(leftIconOnPress)}
          style={styles.leftIconContainer}
        >
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
        placeholderTextColor={placeholderTextColor}
        editable={editable}
        ref={(ref ? ref : customRef) as any}
      />
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
    </View>
  );
}

export const iconSize = 22;

const AnimatedText = Animated.createAnimatedComponent(Text);

function AnimatedTextInputComponent(props: AnimatedTextInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const customRef = React.useRef<TextInput>();
  const {
    value,
    placeholder,
    onFocus,
    onBlur,
    leftIconComponent,
    rightIconComponent,
    rightIconOnPress,
    leftIconOnPress,
    requiredText,
    isError = false,
    selectionColor = color.textInputSelection,
    multiline = false,
    ...restProps
  } = props;

  const currentIconColor = React.useMemo(() => {
    return isError ? color.error : isFocused ? color.black : color.primary;
  }, [isError, isFocused]);

  const currentColor = React.useMemo(() => {
    return isError ? color.error : isFocused ? color.black : color.placeholder;
  }, [isError, isFocused]);

  const currentBorderColor = React.useMemo(() => {
    return isError ? color.error : !isFocused ? color.platinum : color.black;
  }, [isError, isFocused]);

  const _handleOnPressView = React.useCallback(
    (onPress?: () => void) => {
      if (customRef.current && !isFocused && !onPress) {
        customRef.current.focus();
      } else {
        onPress && onPress();
      }
    },
    [isFocused]
  );

  const customFont = useCustomFont(restProps, styles.animatedDefaultStyle);

  const _handleOnFocus = React.useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onFocus && onFocus(e);
      setIsFocused(true);
    },
    [onFocus]
  );

  const _handleOnBlur = React.useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onBlur && onBlur(e);
      setIsFocused(false);
    },
    [onBlur]
  );

  const labelStyle: any = {
    position: "absolute",
    fontSize: 13,
    top: -9,
    left: 16,
    color: currentColor,
    lineHeight: 16,
    backgroundColor: color.white,
    paddingHorizontal: 4,
    borderRadius: 4,
  };

  const containerStyle: any = {
    borderColor: currentBorderColor,
    borderWidth: 0.5,
    borderRadius: 10,
  };

  return (
    <Animated.View style={[styles.defaultTextInputContainer, containerStyle]}>
      {!!placeholder && (
        <AnimatedText onPress={() => _handleOnPressView()} style={labelStyle}>
          {placeholder}
          {requiredText && (
            <AnimatedText style={styles.requiredText}>{"    *"}</AnimatedText>
          )}
        </AnimatedText>
      )}
      {leftIconComponent && (
        <TouchableWithoutFeedback
          onPress={() => _handleOnPressView(leftIconOnPress)}
          style={styles.leftIconContainer}
        >
          <View>{leftIconComponent(iconSize, currentIconColor)}</View>
        </TouchableWithoutFeedback>
      )}
      <TextInput
        {...customFont.props}
        selectionColor={selectionColor}
        style={[
          customFont.style,
          styles.animatedDefaultStyle,
          multiline && styles.textAlignTop,
        ]}
        onFocus={_handleOnFocus}
        onBlur={_handleOnBlur}
        value={value}
        placeholderTextColor={color.brightGray}
        ref={customRef as any}
      />
      {rightIconComponent && (
        <TouchableWithoutFeedback
          style={styles.rightIconContainer}
          onPress={() => {
            rightIconOnPress && rightIconOnPress();
          }}
        >
          {rightIconComponent(iconSize, currentIconColor)}
        </TouchableWithoutFeedback>
      )}
    </Animated.View>
  );
}

export const AnimatedTextInput = AnimatedTextInputComponent;

export default React.forwardRef(CustomTextInput);

const styles = StyleSheet.create({
  defaultStyle: {
    height: "100%",
    width: "100%",
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
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16,
    height: "100%",
  },
  rightIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    height: "100%",
  },
  animatedDefaultStyle: {
    height: "100%",
    // backgroundColor: color.bubbles,
    borderColor: color.platinum,
    borderRadius: 10,
    color: color.defaultText,
    paddingHorizontal: 16,
    flex: 1,
    fontSize: size.defaultText,
  },
  defaultTextInputContainer: {
    // flex: 1,
    height: size.inputHeight,
    borderRadius: 6,
    backgroundColor: color.white,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    borderColor: color.neutral,
    borderWidth: 1,
  },
  placeholderStyle: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  textAlignTop: {
    textAlignVertical: "top",
  },
});
