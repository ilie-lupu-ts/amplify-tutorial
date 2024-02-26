import { useTheme } from "@aws-amplify/ui-react-native";
import {
  StyleSheet,
  useColorScheme,
  SafeAreaView as DefaultSafeAreaView,
} from "react-native";

export const SafeAreaView = (props: DefaultSafeAreaView["props"]) => {
  const { style, ...otherProps } = props;
  const styles = getThemedStyles();

  return <DefaultSafeAreaView style={[styles.view, style]} {...otherProps} />;
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
