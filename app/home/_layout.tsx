import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs, useRouter, useNavigation } from "expo-router";
import { Alert, Pressable } from "react-native";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { View } from "@/components/View";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const SignOutButton = () => {
  const router = useRouter();

  const { user, signOut, authStatus, challengeName } = useAuthenticator(
    (context) => [context.user]
  );

  async function onPress() {
    console.log({ user, authStatus, challengeName });

    Alert.alert("Sign out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          signOut();
        },
      },
    ]);
  }

  return (
    <Pressable onPress={onPress}>
      <FontAwesome name="sign-out" size={25} />
    </Pressable>
  );
};

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
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

export default TabLayout;
