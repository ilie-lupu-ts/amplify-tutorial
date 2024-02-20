import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import Button from "@/components/Button";
import Spacings from "@/constants/Spacings";
import { TextInput } from "@/components/TextInput";
import { SafeAreaView } from "@/components/Themed";
import { TodoContext } from "@/context/TodoContext";

export default function AddTodoScreen() {
  const { addTodo, isLoading } = useContext(TodoContext);

  const [inputName, setInputName] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [enabledSubmit, setEnabledSubmit] = useState(false);
  const disabled = !enabledSubmit || isLoading;

  useEffect(() => {
    const shouldEnableSubmit =
      inputName.length > 0 && inputDescription.length > 0;

    setEnabledSubmit(shouldEnableSubmit);
  }, [inputName, inputDescription]);

  async function handleSubmit() {
    try {
      resetFormInput();

      await addTodo({
        name: inputName,
        description: inputDescription,
      });
    } catch (error) {
      console.log("error creating todo", error);
    }
  }

  function resetFormInput() {
    setInputName("");
    setInputDescription("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todos</Text>
      <View style={styles.separator} />
      <View style={{ gap: Spacings.x_4 }}>
        <TextInput
          placeholder="Name"
          value={inputName}
          onChangeText={setInputName}
        />
        <TextInput
          placeholder="Description"
          value={inputDescription}
          onChangeText={setInputDescription}
        />
      </View>
      <View style={styles.separator} />
      <Button
        disabled={disabled}
        loading={isLoading}
        label="Add"
        onPress={handleSubmit}
      />
    </SafeAreaView>
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
    height: 24,
  },
  input: {
    borderColor: "#222",
    borderWidth: 1,
    height: 40,
    borderRadius: 4,
    paddingHorizontal: 16,
    color: "#000",
  },
});
