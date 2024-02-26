import { StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useAuthenticator, useTheme } from "@aws-amplify/ui-react-native";

import Logo from "../assets/icons/logo.svg";
import { Alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { PasswordField } from "@/components/PasswordField";
import { Spacings } from "@/constants/Spacings";
import { Text } from "@/components/Text";
import { TextField } from "@/components/TextField";
import { View } from "@/components/View";

export type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUpForm = () => {
  const styles = getThemedStyles();
  const { submitForm, toSignIn, error, isPending } = useAuthenticator();

  const { control, formState, getValues } = useForm<SignUpFormValues>({
    mode: "onChange",
  });

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />

      <View>
        <Text style={styles.title}>Welcome to app</Text>
        <View style={styles.subtitle}>
          <Text>You already have an account?</Text>
          <Text style={styles.link} onPress={toSignIn}>
            Sign in
          </Text>
        </View>
      </View>

      <View style={styles.signInForm}>
        {error && <Alert variant="error" title="Error" message={error} />}
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
          }}
          render={({ field, formState }) => (
            <TextField
              label="Email"
              placeholder="Enter your email address"
              value={field.value}
              onChangeText={field.onChange}
              error={formState.errors.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
          render={({ field, formState }) => (
            <PasswordField
              label="Password"
              placeholder="Enter your password"
              value={field.value}
              onChangeText={field.onChange}
              error={formState.errors.password?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Please confirm your password",
            validate: (value, { password }) => {
              return value === password || "Passwords do not match";
            },
          }}
          render={({ field, formState }) => (
            <PasswordField
              label="Confirm Password"
              placeholder="Please confirm your Password"
              value={field.value}
              onChangeText={field.onChange}
              error={formState.errors.confirmPassword?.message}
            />
          )}
        />
      </View>
      <Button
        label="Sign up"
        disabled={!formState.isValid}
        loading={isPending}
        onPress={handleFormSubmit}
      />
    </View>
  );

  function handleFormSubmit() {
    const { email, password } = getValues();

    submitForm({ email, password });
  }
};

function getThemedStyles() {
  const theme = useTheme();

  return StyleSheet.create({
    logo: {
      alignSelf: "center",
    },
    container: {
      gap: Spacings.x_10,
    },
    title: {
      alignSelf: "center",
      fontFamily: "Inter-SemiBold",
      fontSize: theme.tokens.fontSizes.xl,
    },
    subtitle: {
      flexDirection: "row",
      gap: Spacings.x_2,
      justifyContent: "center",
      marginTop: Spacings.x_2,
    },
    link: {
      color: theme.components?.button?.textLink?.color,
    },
    signInForm: {
      gap: Spacings.x_2,
    },
  });
}
