import * as React from "react";
import { Text, TextProps, StyleSheet, TextStyle } from "react-native";
import useCustomFont from "../../hooks/use-custom-font";
export { Text as TextBase } from "react-native";
import colorConstant from "../../styles/color";
import sizeConstant from "../../styles/size";

interface Props extends TextProps {}

const CustomText: React.ForwardRefRenderFunction<Text, Props> = (
  props,
  ref
) => {
  const customFont = useCustomFont(props, styles.text);
  return <Text {...customFont.props} style={customFont.style} ref={ref} />;
};

export default React.forwardRef<Text, Props>(CustomText);

const styles = StyleSheet.create<{
  text: TextStyle;
}>({
  text: {
    color: colorConstant.black,
    fontSize: sizeConstant.defaultText,
  },
});
