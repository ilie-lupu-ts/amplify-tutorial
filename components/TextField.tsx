import { forwardRef } from "react";
import { useTheme } from "@aws-amplify/ui-react-native";
import { TextInput as DefaultTextInput, StyleSheet } from "react-native";

import { Label } from "./Label";
import { View } from "./View";

type TextFieldSize = "small" | "default" | "large";

export type TextFieldProps = {
  label?: string;
  size?: TextFieldSize;
  disabled?: boolean;
};

export const TextField = forwardRef(function (
  props: TextFieldProps & DefaultTextInput["props"],
  ref: React.ForwardedRef<DefaultTextInput>
) {
  const { label, style, disabled, ...otherProps } = props;
  const styles = getThemedStyles(props);

  return (
    <View style={styles.container}>
      {label && <Label style={styles.label}>{label}</Label>}
      <View style={styles.fieldContainer}>
        <DefaultTextInput
          ref={ref}
          style={styles.field}
          cursorColor={"#000"}
          editable={!disabled}
          {...otherProps}
        />
      </View>
    </View>
  );
});

function getThemedStyles({ size = "default", disabled }: TextFieldProps) {
  const { tokens } = useTheme();
  const { height, lineHeight, fontSize } = getSize();

  return StyleSheet.create({
    container: {},
    fieldContainer: {
      backgroundColor: disabled
        ? tokens.colors.neutral[20]
        : tokens.colors.white,
      height,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: tokens.colors.neutral[60],
      justifyContent: "center",
    },
    label: {
      marginBottom: 8,
      lineHeight,
      fontSize,
    },
    field: {
      fontSize,
      lineHeight,
      paddingHorizontal: 16,
    },
    iconContainer: {},
  });

  function getSize(): { fontSize: number; lineHeight: number; height: number } {
    if (size === "small") {
      return { height: 33, fontSize: 14, lineHeight: 21 };
    } else if (size === "large") {
      return { height: 46, fontSize: 20, lineHeight: 30 };
    }

    return { height: 40, fontSize: 16, lineHeight: 24 };
  }
}
