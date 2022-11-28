import { useFonts } from "expo-font";
import { useMemo } from "react";
import { StyleProp, TextStyle, TextProps, StyleSheet } from "react-native";

interface Fonts {
  fontFamily: string;
  fontStyles: any;
  fontWeights: any;
}

const fonts: Fonts = {
  fontFamily: "Poppins",
  fontWeights: {
    100: "Thin",
    200: "ExtraLight",
    300: "Light",
    400: "Regular",
    500: "Medium",
    600: "SemiBold",
    700: "Bold",
    800: "ExtraBold",
    900: "Black",
    normal: "Regular",
    semiBold: "SemiBold",
    bold: "Black",
  },
  fontStyles: {
    normal: "",
    italic: "Italic",
  },
};

interface CustomFont {
  style: StyleProp<TextStyle>;
  props: TextProps;
}

export function getFontFamily({
  fontWeight,
  fontStyle,
}: {
  fontWeight?: string;
  fontStyle?: string;
}) {
  const customFontWeight = fontWeight
    ? fonts.fontWeights[fontWeight]
    : "Regular";
  const customFontStyle = fontStyle ? fonts.fontStyles[fontStyle] : "";
  const modifier = customFontWeight + customFontStyle;
  return `${fonts.fontFamily}-${modifier}`;
}

const useCustomFont = (
  props: TextProps,
  defaultStyle: TextStyle
): CustomFont => {
  const { style, ...restProps } = props;
  const customizedStyle = useMemo((): StyleProp<TextStyle> => {
    const { fontWeight, fontStyle, ...rest } =
      StyleSheet.flatten(style) || ({} as any);
    return {
      ...rest,
      fontFamily: getFontFamily({ fontWeight, fontStyle }),
    };
  }, [style]);
  const newStyle = StyleSheet.flatten([defaultStyle, customizedStyle]);
  return {
    style: newStyle,
    props: restProps,
  };
};

export function useInitiateCustomFont() {
  return useFonts({
    "Poppins-Thin": require("../../assets/fonts/Poppins-Thin.ttf"),
    "Poppins-ExtraLight": require("../../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Black": require("../../assets/fonts/Poppins-Black.ttf"),
  });
}

export default useCustomFont;
