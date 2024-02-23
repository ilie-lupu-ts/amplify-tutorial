import { Slot } from "expo-router";
import { StyleSheet } from "react-native";
import { Authenticator } from "@aws-amplify/ui-react-native";

import { ConfirmPasswordResetForm } from "./confirm-reset-password-form";
import { ConfirmSignUpForm } from "./confirm-sign-up-form";
import { ForgotPasswordForm } from "./forgot-password-form";
import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";
import { Spacings } from "@/constants/Spacings";
import { View } from "@/components/View";

export const CognitoAuthenticator = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Spacings.x_3,
  },
});
