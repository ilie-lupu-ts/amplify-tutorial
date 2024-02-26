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

export type ConfirmSignUpFormValues = {
  confirmation_code: string;
};

export const ConfirmSignUpForm = () => {
  const styles = getThemedStyles();
  const { submitForm, error, isPending, resendCode, codeDeliveryDetails } =
    useAuthenticator();

  const { control, formState, getValues, reset } =
    useForm<ConfirmSignUpFormValues>({
      mode: "onChange",
    });

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />

      <View>
        <Text style={styles.title}>Confirm your email</Text>
        <View style={styles.subtitle}>
          <Text>{`Your code is on the way. To log in, enter the code we emailed to ${codeDeliveryDetails.Destination}. It may take a minute to arrive.`}</Text>
        </View>
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
              placeholder="Enter your code"
              value={field.value}
              onChangeText={field.onChange}
              error={formState.errors.confirmation_code?.message}
            />
          )}
        />

        <View style={{ alignItems: "flex-end" }}>
          <Text
            style={[styles.link, { fontFamily: "Inter-Bold" }]}
            onPress={() => {
              resendCode();
              reset();
            }}
          >
            Request a new code
          </Text>
        </View>
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
    const { confirmation_code } = getValues();

    submitForm({ confirmation_code });
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
