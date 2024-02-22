import { useTheme } from "@aws-amplify/ui-react-native";
import { View as DefaultView, StyleSheet, useColorScheme } from "react-native";

export const View = (props: DefaultView["props"]) => {
  const { style, ...otherProps } = props;
  const styles = getThemedStyles();

  return <DefaultView style={[styles.view, style]} {...otherProps} />;
};

function getThemedStyles() {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  return StyleSheet.create({
    view: {
      backgroundColor:
        colorScheme === "dark"
          ? theme.tokens.colors.black
          : theme.tokens.colors.white,
    },
  });
}
