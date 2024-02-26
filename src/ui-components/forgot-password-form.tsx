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

export type ForgotPasswordFormValues = {
  username: string;
};

export const ForgotPasswordForm = () => {
  const styles = getThemedStyles();
  const { submitForm, error, isPending, resendCode } = useAuthenticator();

  const { control, formState, getValues, reset } =
    useForm<ForgotPasswordFormValues>({
      mode: "onChange",
    });

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />

      <View>
        <Text style={styles.title}>Forgot your password?</Text>
        <View style={styles.subtitle}>
          <Text>Oh no! It happens to the best of us.</Text>
        </View>
      </View>

      <View style={styles.signInForm}>
        {error && <Alert variant="error" title="Error" message={error} />}
        <Controller
          control={control}
          name="username"
          rules={{
            required: "Email address is required",
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
    const { username } = getValues();

    submitForm({ username });
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
