import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Amplify } from "aws-amplify";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as SplashScreen from "expo-splash-screen";

import { useColorScheme } from "@/components/useColorScheme";

import amplifyconfig from "../src/amplifyconfiguration.json";
import Theme from "@/constants/Theme";

import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react-native";
import { CognitoAuthenticator } from "@/ui-components/cognito-authenticator";

Amplify.configure(amplifyconfig);

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorMode = useColorScheme();

  return (
    <ThemeProvider theme={Theme} colorMode={colorMode}>
      <Authenticator.Provider>
        <CognitoAuthenticator />
      </Authenticator.Provider>
    </ThemeProvider>
  );
}
