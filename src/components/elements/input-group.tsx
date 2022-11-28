import React from "react";
import Text from "./text";
import { StyleSheet, View, ViewProps } from "react-native";
import colors from "../../styles/color";
import size from "../../styles/size";

export interface InputGroupProps extends ViewProps {
  // label?: string;
  children: React.ReactNode;
  suffix?: React.ReactNode;
  error?: string | boolean | undefined;
  loading?: boolean;
  required?: boolean;
}

export default function InputGroup(props: InputGroupProps) {
  const {
    error,
    style,
    children,
    suffix,
    loading = false,
    required = false,
  } = props;

  return (
    <View style={style}>
      <View style={[styles.container, !!error && styles.errorContainer]}>
        <View style={styles.content}>
          <Text style={[styles.label, !!error && styles.errorText]}>
            {required && <Text style={styles.required}> *</Text>}
          </Text>
          {children}
        </View>
        {suffix || null}
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 2,
  },
  content: {
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1,
  },
  label: {
    color: colors.sonicSilver,
    fontSize: size.inputLabel,
    position: "absolute",
    top: size.inputBottomPadding,
    left: size.inputHorizontalPadding,
  },
  errorLabel: {
    color: colors.error,
  },
  errorContainer: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 13,
  },
  required: {
    color: colors.error,
    fontSize: 13,
    fontWeight: "500",
  },
});
