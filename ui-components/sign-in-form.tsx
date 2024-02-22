import { useState } from "react";
import { StyleSheet } from "react-native";
import { SignInInput } from "aws-amplify/auth";
import { useTheme } from "@aws-amplify/ui-react-native";

import { View } from "@/components/View";
import Logo from "../assets/icons/logo.svg";
import { Text } from "@/components/Text";
import { TextField } from "@/components/TextField";
import { PasswordField } from "@/components/PasswordField";
import { Button } from "@/components/Button";
import Spacings from "@/constants/Spacings";
import { Alert } from "@/components/Alert";

export type SignInFormValues = {
  email: string;
  password: string;
};

export type SignInFormProps = {
  onSubmit: (values: SignInInput) => void;
  toSignup?: () => void;
  toForgotPassword?: () => void;
  error?: string;
  isLoading?: boolean;
};

export const SignInForm = ({
  onSubmit,
  toSignup,
  toForgotPassword,
  error,
  isLoading,
}: SignInFormProps) => {
  const styles = getThemedStyles();
  const [form, setForm] = useState<SignInFormValues>({
    email: "",
    password: "",
  });
  const isDisabled = !form.email || !form.password;

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />

      <View>
        <Text style={styles.title}>Welcome to app</Text>
        <View style={styles.subtitle}>
          <Text>Don't have an account?</Text>
          <Text style={styles.link} onPress={toSignup}>
            Create an account
          </Text>
        </View>
      </View>

      <View style={styles.signInForm}>
        {error && <Alert variant="error" title="Error" message={error} />}
        <TextField
          label="Email"
          placeholder="Enter your email address"
          value={form.email}
          onChangeText={(email) =>
            setForm(({ password }) => ({ email, password }))
          }
        />
        <PasswordField
          label="Password"
          placeholder="Enter your password"
          value={form.password}
          onChangeText={(password) =>
            setForm(({ email }) => ({ email, password }))
          }
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
        disabled={isDisabled}
        loading={isLoading}
        onPress={() =>
          onSubmit({
            username: form.email,
            password: form.password,
            options: {},
          })
        }
      />
    </View>
  );
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
