import { useTheme } from "@aws-amplify/ui-react-native";
import { Text as DefaultText, StyleSheet, useColorScheme } from "react-native";

export const Text = (props: DefaultText["props"]) => {
  const { style, ...otherProps } = props;
  const styles = getThemedStyles();

  return <DefaultText style={[styles.view, style]} {...otherProps} />;
};

function getThemedStyles() {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  return StyleSheet.create({
    view: {
      color:
        colorScheme === "dark"
          ? theme.tokens.colors.white
          : theme.tokens.colors.black,
    },
  });
}
