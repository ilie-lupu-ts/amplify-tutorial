import { StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useAuthenticator, useTheme } from "@aws-amplify/ui-react-native";

import Logo from "../../assets/icons/logo.svg";
import { Alert } from "@/components/Alert";
import { Button } from "@/components/Button";
import { PasswordField } from "@/components/PasswordField";
import { Spacings } from "@/constants/Spacings";
import { Text } from "@/components/Text";
import { TextField } from "@/components/TextField";
import { View } from "@/components/View";
import { useTranslation } from "@/i18n";

export type SignInFormValues = {
  username: string;
  password: string;
};

export const SignInForm = () => {
  const styles = getThemedStyles();
  const { t } = useTranslation();

  const { submitForm, toSignUp, error, isPending, toForgotPassword } =
    useAuthenticator();

  const { control, formState, getValues } = useForm<SignInFormValues>({
    mode: "onChange",
  });

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t("signin.title")}</Text>
        <View style={styles.subtitle}>
          <Text>{t("signin.subtitle")}</Text>
          <Text style={styles.link} onPress={toSignUp}>
            {t("signin.subtitle_link")}
          </Text>
        </View>
      </View>

      <View style={styles.signInForm}>
        {error && <Alert variant="error" title="Error" message={error} />}
        <Controller
          control={control}
          name="username"
          rules={{
            required: t("fields.email.validations.required"),
          }}
          render={({ field, formState }) => (
            <TextField
              label={t("fields.email.label")}
              placeholder={t("fields.email.placeholder")}
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
            required: t("fields.password.validations.required"),
            minLength: {
              value: 8,
              message: t("fields.password.validations.minLength", {
                minLength: 8,
              }),
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
