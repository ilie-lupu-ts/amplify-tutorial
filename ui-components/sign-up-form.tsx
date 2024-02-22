import { useState } from "react";
import { useTheme } from "@aws-amplify/ui-react-native";
import { StyleSheet } from "react-native";

import { View } from "@/components/View";
import Logo from "../assets/icons/logo.svg";
import { Text } from "@/components/Text";
import { TextField } from "@/components/TextField";
import { PasswordField } from "@/components/PasswordField";
import { Button } from "@/components/Button";
import Spacings from "@/constants/Spacings";
import { Alert } from "@/components/Alert";

export type SignUpFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignUpFormProps = {
  onSubmit: (values: SignUpFormValues) => void;
  toSignIn?: () => void;
  error?: string;
  isLoading?: boolean;
};

export const SignUpForm = ({
  onSubmit,
  toSignIn,
  error,
  isLoading,
}: SignUpFormProps) => {
  const styles = getThemedStyles();
  const [form, setForm] = useState<SignUpFormValues>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const isDisabled = !form.email || !form.password || !form.confirmPassword;

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
        <TextField
          label="Email"
          placeholder="Enter your email address"
          value={form.email}
          onChangeText={(email) => setForm((form) => ({ ...form, email }))}
        />
        <PasswordField
          label="Password"
          placeholder="Enter your password"
          value={form.password}
          onChangeText={(password) =>
            setForm((form) => ({ ...form, password }))
          }
        />
        <PasswordField
          label="Confirm Password"
          placeholder="Please confirm your Password"
          value={form.confirmPassword}
          onChangeText={(confirmPassword) =>
            setForm((form) => ({ ...form, confirmPassword }))
          }
        />
      </View>
      <Button
        label="Sign up"
        disabled={isDisabled}
        loading={isLoading}
        onPress={() => {
          onSubmit({
            email: form.email,
            password: form.password,
            confirmPassword: form.confirmPassword,
          });
        }}
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
