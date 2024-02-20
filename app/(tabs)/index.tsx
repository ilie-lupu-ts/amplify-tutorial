import { useContext } from "react";
import { StyleSheet, FlatList } from "react-native";

import { Todo } from "@/src/API";
import { TodoContext } from "@/context/TodoContext";
import { SafeAreaView, Text, View } from "@/components/Themed";

export default function TabOneScreen() {
  const { todos } = useContext(TodoContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add todo</Text>
      <View style={styles.separator} />
      <TodosFlatList todos={todos} />
    </SafeAreaView>
  );
}

const TodosFlatList = ({ todos }: { todos: Todo[] }) => {
  return (
    <FlatList
      data={todos}
      renderItem={({ item: { id, name, description } }) => (
        <View style={styles.item}>
          <Text key={id} style={styles.itemText}>
            {name} - {description}
          </Text>
        </View>
      )}
    />
  );
};

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
    height: 16,
  },
  item: {
    padding: 8,
    marginBottom: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  itemText: {
    fontSize: 18,
  },
});
