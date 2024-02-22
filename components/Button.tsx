import { useMemo } from "react";
import {
  Pressable,
  StyleSheet,
  Animated,
  ActivityIndicator,
  useColorScheme,
} from "react-native";

import { useTheme } from "@aws-amplify/ui-react-native";
import { View } from "./View";
import { Text } from "./Text";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  label: string;
  variant?: ButtonVariant;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export const Button = ({
  variant = "primary",
  disabled = false,
  loading = false,
  label,
  onPress,
}: ButtonProps) => {
  const styles = getThemedStyles({ variant, disabled, loading });

  const opacity = useMemo(() => new Animated.Value(1), []);

  return (
    <View>
      <Pressable
        disabled={disabled || loading}
        onPress={onPress}
        onPressIn={() => handlePressIn(opacity)}
        onPressOut={() => handlePressOut(opacity)}
      >
        <Animated.View style={[styles.container, { opacity }]}>
          {loading ? (
            <ActivityIndicator
              size={24}
              color={styles.loadingIndicator.color}
            />
          ) : (
            <Text style={styles.text}>{label}</Text>
          )}
        </Animated.View>
      </Pressable>
    </View>
  );

  function handlePressIn(animation: Animated.Value) {
    Animated.timing(animation, {
      toValue: 0.8,
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
};

type GetThemedStylesProps = {
  variant: ButtonVariant;
  disabled: boolean;
  loading: boolean;
};

function getThemedStyles({ variant, disabled, loading }: GetThemedStylesProps) {
  const { tokens } = useTheme();
  const colorScheme = useColorScheme();
  const { backgroundColor, color } = getColors();

  return StyleSheet.create({
    container: {
      borderRadius: 4,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor,
    },
    text: {
      fontFamily: "Inter-Bold",
      color,
    },
    loadingIndicator: {
      color,
    },
  });

  function getColors(): { backgroundColor: string; color: string } {
    if (disabled) {
      return {
        backgroundColor: tokens.colors.neutral[20],
        color: tokens.colors.neutral[80],
      };
    }

    if (variant === "primary") {
      return {
        backgroundColor: tokens.colors.purple[60],
        color: tokens.colors.white,
      };
    }

    return {
      backgroundColor: tokens.colors.neutral[20],
      color: tokens.colors.neutral[60],
    };
  }
}
