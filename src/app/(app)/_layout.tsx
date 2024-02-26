import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { authStatus } = useAuthenticator((context) => [context.user]);

  if (authStatus === "authenticated") {
    return <Redirect href="/home/" />;
  }

  return <Stack />;
}
