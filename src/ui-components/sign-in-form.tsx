import { StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useAuthenticator, useTheme } from "@aws-amplify/ui-react-native";
import { useLocales } from "expo-localization";

import Logo from "../assets/icons/logo.svg";
import { Alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { PasswordField } from "@/components/PasswordField";
import { Spacings } from "@/constants/Spacings";
import { Text } from "@/components/Text";
import { TextField } from "@/components/TextField";
import { View } from "@/components/View";

export type SignInFormValues = {
  username: string;
  password: string;
};

export const SignInForm = () => {
  const styles = getThemedStyles();
  const locales = useLocales();

  const { submitForm, toSignUp, error, isPending, toForgotPassword } =
    useAuthenticator();

  const { control, formState, getValues } = useForm<SignInFormValues>({
    mode: "onChange",
  });

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome to app</Text>
        <View style={styles.subtitle}>
          <Text>Don't have an account?</Text>
          <Text style={styles.link} onPress={toSignUp}>
            Create an account
          </Text>
        </View>
      </View>

      <View style={styles.signInForm}>
        {error && <Alert variant="error" title="Error" message={error} />}
        <Controller
          control={control}
          name="username"
          rules={{
            required: "Email is required",
          }}
          render={({ field, formState }) => (
            <TextField
              label="Email"
              placeholder="Enter your email address"
              value={field.value}
              onChangeText={field.onChange}
              error={formState.errors.username?.message}
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
        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={[styles.link, { fontFamily: "Inter-Bold" }]}
            onPress={toForgotPassword}
          >
            Forgot your password?
          </Text>
        </View>
      </View>

      <Button
        label="Sign in"
        disabled={!formState.isValid}
        loading={isPending}
        onPress={handleFormSubmit}
      />
    </View>
  );

  function handleFormSubmit() {
    const { username, password } = getValues();

    submitForm({ username, password });
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
    titleContainer: {
      flexDirection: "column",
      gap: Spacings.x_2,
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
    },
    link: {
      color: theme.components?.button?.textLink?.color,
    },
    signInForm: {
      gap: Spacings.x_2,
    },
  });
}
