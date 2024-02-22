import { useTheme } from "@aws-amplify/ui-react-native";
import { forwardRef } from "react";
import { StyleSheet, Text, useColorScheme } from "react-native";

type LabelSize = "small" | "default" | "large";

export type LabelProps = { size?: LabelSize } & Text["props"];

export const Label = forwardRef(function (
  props: LabelProps & Text["props"],
  ref: React.ForwardedRef<Text>
) {
  const { style, ...otherProps } = props;
  const styles = getThemedStyles();

  return <Text ref={ref} style={[styles.label, style]} {...otherProps} />;
});

function getThemedStyles() {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  return StyleSheet.create({
    label: {
      fontSize: 16,
      color:
        colorScheme === "dark"
          ? theme.tokens.colors.white
          : theme.tokens.colors.black,
    },
  });
}
