import { useEffect } from "react";
import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { Amplify } from "aws-amplify";
import { StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "@/components/useColorScheme";
import { Authenticator, ThemeProvider } from "@aws-amplify/ui-react-native";

import Theme from "@/constants/Theme";
import amplifyconfig from "../src/amplifyconfiguration.json";

import { Spacings } from "@/constants/Spacings";
import { View } from "@/components/View";
import { SignInForm } from "@/ui-components/sign-in-form";
import { SignUpForm } from "@/ui-components/sign-up-form";
import { ConfirmSignUpForm } from "@/ui-components/confirm-sign-up-form";
import { ForgotPasswordForm } from "@/ui-components/forgot-password-form";
import { ConfirmPasswordResetForm } from "@/ui-components/confirm-reset-password-form";

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
        <Authenticator
          Container={(props) => <View style={styles.container} {...props} />}
          components={{
            SignIn: () => <SignInForm />,
            SignUp: () => <SignUpForm />,
            ConfirmSignUp: () => <ConfirmSignUpForm />,
            ForgotPassword: () => <ForgotPasswordForm />,
            ConfirmResetPassword: () => <ConfirmPasswordResetForm />,
          }}
        >
          <Slot />
        </Authenticator>
      </Authenticator.Provider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Spacings.x_3,
  },
});
