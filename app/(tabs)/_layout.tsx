import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Alert, Pressable, Text, View } from "react-native";

import {
  withAuthenticator,
  useAuthenticator,
} from "@aws-amplify/ui-react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const SignOutButton = () => {
  const { user, signOut } = useAuthenticator();

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

function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Todos",
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="list-alt" color={color} />
          ),

          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 8, marginRight: 20 }}>
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              <SignOutButton />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="add-todo"
        options={{
          title: "Add",
          headerTitle: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="pencil-square-o" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default withAuthenticator(TabLayout);
