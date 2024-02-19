import { StyleSheet, TextInput } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import Button from "@/components/Button";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input}></TextInput>
      <View style={styles.separator} />
      <Button label="Add" onPress={() => console.log("add todo pressed")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 16,
  },
  input: { borderColor: "red", borderWidth: 1 },
});
