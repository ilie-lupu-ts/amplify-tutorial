import { StatusBar } from "expo-status-bar";
import { FontAwesome } from "@expo/vector-icons";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const SignOutButton = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  async function onPress() {
    console.log("logOut user: ", user);

    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => signOut() },
    ]);
  }

  return (
    <Pressable onPress={onPress}>
      <FontAwesome name="sign-out" size={25} />
    </Pressable>
  );
};

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <View style={styles.separator} />

      <SignOutButton />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
