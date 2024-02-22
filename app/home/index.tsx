import { Link } from "expo-router";
import { useContext } from "react";
import { StyleSheet, FlatList, SafeAreaView, Text, View } from "react-native";

import { Todo } from "@/src/API";
import { TodoContext } from "@/context/TodoContext";
import { FontAwesome } from "@expo/vector-icons";
import Spacings from "@/constants/Spacings";

export default function TabOneScreen() {
  const { todos } = useContext(TodoContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add todo</Text>
      <View style={styles.separator} />
      <TodoList todos={todos} />
    </SafeAreaView>
  );
}

const TodoList = ({ todos }: { todos: Todo[] }) => {
  if (todos.length === 0) {
    return (
      <View style={styles.emptyTodoContainer}>
        <FontAwesome name="list-alt" size={100} color="#ccc" />
        <Text style={styles.emptyTodoText}>No todos yet</Text>
        <View style={styles.separator} />
        <Link href="/home/add-todo" style={styles.addTodoText}>
          Add a todo
        </Link>
      </View>
    );
  }

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
    paddingHorizontal: Spacings.x_3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    height: Spacings.x_4,
  },
  item: {
    padding: Spacings.x_2,
    marginBottom: Spacings.x_2,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#aaa",
  },
  itemText: {
    fontSize: 18,
  },
  emptyTodoContainer: {
    alignItems: "center",
    paddingVertical: Spacings.x_5,
  },
  emptyTodoText: {
    fontSize: 20,
  },
  addTodoText: {
    fontSize: 16,
  },
});
