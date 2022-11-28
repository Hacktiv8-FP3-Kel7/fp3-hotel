import { useFormContext, SubmitHandler } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import colors from "../../../styles/color";
import typography from "../../../styles/typography";
import Text from "../../elements/text";
interface Props {
  text?: string;
  onSubmit: SubmitHandler<any>;
}
export default function SubmitField(props: Props) {
  const { onSubmit, text = "Submit" } = props;
  const methods = useFormContext();
  const {
    formState: { isValid, isSubmitting },
  } = methods;

  return (
    <TouchableOpacity
      disabled={!isValid || isSubmitting}
      onPress={methods.handleSubmit(onSubmit)}
      style={{
        padding: 16,
        borderRadius: 12,
        ...(!isValid
          ? { backgroundColor: colors.grey }
          : { borderColor: colors.black, borderWidth: 1 }),
      }}
    >
      <Text
        style={[
          typography.body1,
          { color: isValid ? colors.black : colors.white },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
