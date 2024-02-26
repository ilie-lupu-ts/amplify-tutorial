import { StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useAuthenticator, useTheme } from "@aws-amplify/ui-react-native";

import Logo from "../../assets/icons/logo.svg";
import { Alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { Spacings } from "@/constants/Spacings";
import { Text } from "@/components/Text";
import { TextField } from "@/components/TextField";
import { View } from "@/components/View";
import { PasswordField } from "@/components/PasswordField";

export type ConfirmPasswordResetFormValues = {
  confirmation_code: string;
  password: string;
  confirm_password: string;
};

export const ConfirmPasswordResetForm = () => {
  const styles = getThemedStyles();
  const { submitForm, error, isPending, resendCode } = useAuthenticator();

  const { control, formState, getValues, reset } =
    useForm<ConfirmPasswordResetFormValues>({
      mode: "onChange",
    });

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Reset password</Text>
        <Text style={styles.subtitle}>
          Time to reset your password! Ensure your account stays safe with a
          fresh password.
        </Text>
      </View>

      <View style={styles.signInForm}>
        {error && <Alert variant="error" title="Error" message={error} />}
        <Controller
          control={control}
          name="confirmation_code"
          rules={{
            required: "Confirmation code is required",
          }}
          render={({ field, formState }) => (
            <TextField
              label="Confirmation code"
              placeholder="Enter your confirmation code"
              value={field.value}
              onChangeText={field.onChange}
              error={formState.errors.confirmation_code?.message}
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
          name="confirm_password"
          rules={{
            required: "Please confirm your password",
            validate: (value, { password }) => {
              return value === password || "Passwords do not match";
            },
          }}
          render={({ field, formState }) => (
            <PasswordField
              label="Confirm Password"
              placeholder="Enter your password"
              value={field.value}
              onChangeText={field.onChange}
              error={formState.errors.confirm_password?.message}
            />
          )}
        />
      </View>

      <Button
        label="Confirm"
        disabled={!formState.isValid}
        loading={isPending}
        onPress={handleFormSubmit}
      />
    </View>
  );

  function handleFormSubmit() {
    const { confirmation_code, password } = getValues();

    submitForm({ confirmation_code, password });
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
      gap: Spacings.x_3,
    },
    title: {
      alignSelf: "center",
      fontFamily: "Inter-SemiBold",
      fontSize: theme.tokens.fontSizes.xl,
    },
    subtitle: {
      textAlign: "center",
    },
    link: {
      color: theme.components?.button?.textLink?.color,
    },
    signInForm: {
      gap: Spacings.x_2,
    },
  });
}
