import { useContext } from "react";
import { StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/Button";
import { SafeAreaView } from "@/components/SafeAreaView";
import { Spacings } from "@/constants/Spacings";
import { Text } from "@/components/Text";
import { TextField } from "@/components/TextField";
import { TodoContext } from "@/context/TodoContext";
import { View } from "@/components/View";

type AddTodoFormValues = {
  name: string;
  description: string;
};

export default function AddTodoScreen() {
  const { addTodo, isLoading } = useContext(TodoContext);
  const { control, formState, getValues } = useForm<AddTodoFormValues>({
    mode: "onChange",
  });

  async function handleSubmit() {
    try {
      const { name, description } = getValues();

      await addTodo({
        name,
        description,
      });
    } catch (error) {
      console.log("error creating todo", error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todos</Text>
      <View style={styles.separator} />
      <View style={{ gap: Spacings.x_4 }}>
        <Controller
          control={control}
          name="name"
          rules={{
            required: "Name is required",
          }}
          render={({ field: { value, onChange } }) => (
            <TextField
              label="Name"
              placeholder="Enter a name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onChange } }) => (
            <TextField
              label="Description"
              placeholder="Enter a description"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
      </View>
      <View style={styles.separator} />
      <Button
        disabled={!formState.isValid}
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
    height: Spacings.x_6,
  },
  input: {
    borderColor: "#222",
    borderWidth: 1,
    height: 40,
    borderRadius: 4,
    paddingHorizontal: Spacings.x_4,
    color: "#000",
  },
});
