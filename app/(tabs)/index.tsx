import { StyleSheet, FlatList } from "react-native";
import { generateClient } from "aws-amplify/api";

import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { Todo } from "@/src/API";
import { listTodos } from "@/src/graphql/queries";

const client = generateClient();

export default function TabOneScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todos</Text>
      <View style={styles.separator} />
      <TodosFlatList todos={todos} />
    </View>
  );

  async function fetchTodos() {
    try {
      const todoData = await client.graphql({
        query: listTodos,
      });
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }
}

const TodosFlatList = ({ todos }: { todos: Todo[] }) => {
  return (
    <FlatList
      data={todos}
      renderItem={({ item: { id, name, description } }) => (
        <Text key={id} style={styles.item}>
          {name} - {description}
        </Text>
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
    marginVertical: 16,
    width: "80%",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
