import { useMemo } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from "react-native";

import { View, useColor } from "./Themed";

type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary";
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function Button({
  variant = "primary",
  disabled = false,
  loading = false,
  label,
  onPress,
}: ButtonProps) {
  const buttonVariant = getButtonVariantColor();
  const backgroundColor = useColor(`button.${buttonVariant}.backgroundColor`);
  const borderColor = useColor(`button.${buttonVariant}.borderColor`);
  const color = useColor(`button.${buttonVariant}.color`);

  const opacity = useMemo(() => new Animated.Value(1), []);

  return (
    <View>
      <Pressable
        disabled={disabled || loading}
        onPress={onPress}
        onPressIn={() => handlePressIn(opacity)}
        onPressOut={() => handlePressOut(opacity)}
      >
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              backgroundColor,
              borderColor,
              opacity,
            },
          ]}
        >
          <View style={{ width: loading ? 24 : 0 }} />
          <Text style={[styles.buttonLabel, { color }]}>{label}</Text>
          {loading && <ActivityIndicator color={color} size={24} />}
        </Animated.View>
      </Pressable>
    </View>
  );

  function getButtonVariantColor() {
    if ((loading || disabled) && variant === "primary") {
      return "disabled";
    }
    if ((loading || disabled) && variant === "secondary") {
      return "disabledSecondary";
    }

    return variant;
  }

  function handlePressIn(animation: Animated.Value) {
    Animated.timing(animation, {
      toValue: 0.7,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }

  function handlePressOut(animation: Animated.Value) {
    Animated.timing(animation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 4,
    opacity: 1,
  },
  buttonLabel: {
    fontWeight: "600",
  },
});
