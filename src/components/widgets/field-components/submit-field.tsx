import { useFormContext, SubmitHandler } from "react-hook-form";
import { StyleSheet } from "react-native";
import { TouchableOpacity, View } from "react-native";
import colors from "../../../styles/color";
import typography, { headlineTypography } from "../../../styles/typography";
import Text from "../../elements/text";
interface Props {
  text?: string;
  leftIconComponent?: (size: any, color: any) => React.ReactNode;
  rightIconComponent?: (size: any, color: any) => React.ReactNode;
  onSubmit: SubmitHandler<any>;
}
export default function SubmitField(props: Props) {
  const {
    onSubmit,
    text = "Submit",
    leftIconComponent,
    rightIconComponent,
  } = props;
  const methods = useFormContext();

  const {
    formState: { isValid, isSubmitting },
  } = methods;

  return (
    <TouchableOpacity
      disabled={!isValid || isSubmitting}
      onPress={methods.handleSubmit(onSubmit)}
      style={{
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
        ...(!isValid
          ? { backgroundColor: colors.grey }
          : { borderColor: colors.black, borderWidth: 1 }),
      }}
    >
      {leftIconComponent && (
        <View style={styles.leftIconContainer}>
          {leftIconComponent(iconSize, colors.black)}
        </View>
      )}
      <Text
        style={[
          headlineTypography.bold7,
          { color: isValid ? colors.black : colors.white },
        ]}
      >
        {text}
      </Text>
      {rightIconComponent && (
        <View style={styles.rightIconContainer}>
          {rightIconComponent(iconSize, colors.black)}
        </View>
      )}
    </TouchableOpacity>
  );
}

export const iconSize = 22;

const styles = StyleSheet.create({
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
});
