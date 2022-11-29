import isEmpty from 'lodash/isEmpty';
import { useFormContext, SubmitHandler } from 'react-hook-form';
import * as React from 'react';
import { TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';

import colors from '../../styles/color';
import { headlineTypography } from '../../styles/typography';
import Text from './text';
import { FormContext } from './form';
import { InputProps } from './field-type';

export interface SubmitFieldProps extends Omit<InputProps, 'name'> {
  type: 'submit';
  text?: string;
  leftIconComponent?: (size: any, color: any) => React.ReactNode;
  rightIconComponent?: (size: any, color: any) => React.ReactNode;
  onSubmit: SubmitHandler<any>;
  loading?: boolean;
}
export default function SubmitField(props: SubmitFieldProps) {
  const { onSubmit, text = 'Submit', leftIconComponent, rightIconComponent, loading } = props;
  const methods = useFormContext<any>();
  const context = React.useContext(FormContext);

  const {
    formState: { isSubmitting, errors },
  } = methods;

  const isValid = isEmpty(errors);

  const disabled = !context.editable || !isValid || isSubmitting;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => {
        !disabled && methods.handleSubmit(onSubmit)();
      }}
      style={[
        styles.container,
        {
          ...(!disabled
            ? { backgroundColor: colors.lightSilver, color: colors.sonicSilver }
            : { borderColor: colors.black, borderWidth: 1 }),
        },
      ]}
    >
      {leftIconComponent && !(loading || isSubmitting) && (
        <View style={styles.leftIconContainer}>{leftIconComponent(iconSize, colors.black)}</View>
      )}
      {loading || isSubmitting ? (
        <View style={styles.leftIconContainer}>
          <ActivityIndicator color={colors.defaultText} />
        </View>
      ) : (
        <></>
      )}
      <Text style={[headlineTypography.bold7, { color: isValid ? colors.black : colors.white }]}>
        {text}
      </Text>
      {rightIconComponent && (
        <View style={styles.rightIconContainer}>{rightIconComponent(iconSize, colors.black)}</View>
      )}
    </TouchableOpacity>
  );
}

export const iconSize = 22;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
    // height: '100%',
  },
  rightIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
    height: '100%',
  },
});
