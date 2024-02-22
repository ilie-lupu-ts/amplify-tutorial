import { Slot } from "expo-router";
import { StyleSheet } from "react-native";
import { signUp } from "aws-amplify/auth";
import { Authenticator } from "@aws-amplify/ui-react-native";

import { SignInForm } from "./sign-in-form";
import { View } from "@/components/View";
import Spacings from "@/constants/Spacings";
import { SignUpForm } from "./sign-up-form";

// {"options": {"autoSignIn": true, "userAttributes": {"email": "ilie.lupu+213@thinslices.com"}}, "password": "12345678", "username": "ilie.lupu+213@thinslices.com"}

export const CognitoAuthenticator = () => {
  const handleSubmit = (e: any, props: any) => {
    props;
  };
  return (
    <Authenticator
      Container={(props) => <View style={styles.container} {...props} />}
      services={{
        handleSignUp: async (input) => {
          console.log("handleSignUp", input);

          return signUp(input);
        },
      }}
      components={{
        SignIn: (props) => (
          <SignInForm
            onSubmit={props.handleSubmit}
            error={props.error}
            isLoading={props.isPending}
            toSignup={props.toSignUp}
            toForgotPassword={props.toForgotPassword}
          />
        ),
        SignUp: (props) => {
          return (
            <SignUpForm
              onSubmit={({
                confirmPassword: confirm_password,
                email,
                password,
              }) => {
                props.handleSubmit({
                  confirm_password,
                  email,
                  password,
                });
              }}
              error={props.error}
              isLoading={props.isPending}
              toSignIn={props.toSignIn}
            />
          );
        },
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
