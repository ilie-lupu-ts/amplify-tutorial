import { FontAwesome } from "@expo/vector-icons";

import { StyleSheet } from "react-native";
import { Text } from "./Text";
import { useTheme } from "@aws-amplify/ui-react-native";
import { View } from "./View";
import { Spacings } from "@/constants/Spacings";

type AlertVariant = "default" | "error";

type AlertProps = {
  variant?: AlertVariant;
  message?: string;
  title?: string;
};

export const Alert = (props: AlertProps) => {
  const styles = getThemedStyles(props);
  const variant = props.variant || "default";

  return (
    <View style={styles.container}>
      {variant !== "default" && buildIcon()}
      <View style={{ backgroundColor: styles.container.backgroundColor }}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.message}>{props.message}</Text>
      </View>
    </View>
  );

  function buildIcon() {
    return (
      <View style={styles.iconContainer}>
        <FontAwesome
          name="exclamation-circle"
          size={24}
          color={styles.icon.color}
        />
      </View>
    );
  }
};

function getThemedStyles(props: AlertProps) {
  const { tokens } = useTheme();

  const { backgroundColor, color } = getColors();

  return StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: Spacings.x_4,
      paddingHorizontal: Spacings.x_4,
      paddingVertical: Spacings.x_3,
      borderRadius: 8,
      backgroundColor,
    },
    iconContainer: {
      backgroundColor,
    },
    icon: {
      color,
    },
    title: {
      color,
      fontFamily: "Inter-Bold",
      fontSize: 14,
    },
    message: {
      color,
      fontSize: 14,
    },
  });

  function getColors(): { backgroundColor: string; color: string } {
    if (props.variant === "error") {
      return {
        backgroundColor: tokens.colors.background.error,
        color: tokens.colors.red[60],
      };
    }

    return {
      backgroundColor: tokens.colors.neutral[20],
      color: tokens.colors.neutral[60],
    };
  }
}
