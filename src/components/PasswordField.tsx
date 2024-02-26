import { forwardRef, useState } from "react";
import { useTheme } from "@aws-amplify/ui-react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  TextInput as DefaultTextInput,
  Pressable,
  StyleSheet,
} from "react-native";

import { Label } from "./Label";
import { MaterialIcons } from "@expo/vector-icons";
import { View } from "./View";
import { Spacings } from "@/constants/Spacings";

type PasswordFieldSize = "small" | "default" | "large";

export type PasswordFieldProps = {
  label?: string;
  size?: PasswordFieldSize;
  disabled?: boolean;
  error?: string;
};

export const PasswordField = forwardRef(function (
  props: PasswordFieldProps & DefaultTextInput["props"],
  ref: React.ForwardedRef<DefaultTextInput>
) {
  const { label, style, disabled, error, ...otherProps } = props;
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const styles = getThemedStyles(props);

  return (
    <View style={styles.container}>
      {label && <Label style={styles.label}>{label}</Label>}
      <View style={styles.fieldContainer}>
        <DefaultTextInput
          ref={ref}
          style={styles.field}
          cursorColor={"#000"}
          secureTextEntry={secureTextEntry}
          editable={!disabled}
          {...otherProps}
        />
        <Pressable onPress={toggleSecureTextEntry} style={styles.iconContainer}>
          <FontAwesome name={secureTextEntry ? "eye" : "eye-slash"} size={20} />
        </Pressable>
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <MaterialIcons
            name="error-outline"
            size={20}
            color={styles.errorText.color}
          />
          <Label style={styles.errorText}>{error}</Label>
        </View>
      )}
    </View>
  );

  function toggleSecureTextEntry() {
    if (disabled) {
      return;
    }

    setSecureTextEntry((secureTextEntry) => !secureTextEntry);
  }
});

function getThemedStyles({ size = "default", disabled }: PasswordFieldProps) {
  const { tokens } = useTheme();
  const { height, lineHeight, fontSize } = getSize();
  const borderColor = tokens.colors.neutral[60];

  return StyleSheet.create({
    container: {},
    fieldContainer: {
      backgroundColor: disabled
        ? tokens.colors.neutral[20]
        : tokens.colors.white,
      height,
      borderWidth: 1,
      borderRadius: 4,
      borderColor,
      flexDirection: "row",
    },
    label: {
      marginBottom: 8,
      lineHeight,
      fontSize,
    },
    field: {
      flex: 1,
      fontSize,
      lineHeight,
      paddingHorizontal: 16,
    },
    iconContainer: {
      justifyContent: "center",
      paddingHorizontal: 16,
      borderLeftWidth: 1,
      borderColor,
    },
    errorContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacings.x_2,
      paddingVertical: Spacings.x_2,
    },
    errorText: {
      color: tokens.colors.red[60],
    },
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
