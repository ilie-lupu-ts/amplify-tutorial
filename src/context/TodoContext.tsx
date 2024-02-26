import { Todo } from "@/API";
import { createTodo } from "@/graphql/mutations";
import { listTodos } from "@/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { createContext, useEffect, useMemo, useState } from "react";

type AddTodoParams = Pick<Todo, "name" | "description">;

type TodoContext = {
  todos: Todo[];
  addTodo: (todo: AddTodoParams) => Promise<void>;
  isLoading: boolean;
};

const defaultContext: TodoContext = {
  todos: [],
  addTodo: async () => {},
  isLoading: false,
};

export const TodoContext = createContext<TodoContext>(defaultContext);

export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const client = useMemo(() => generateClient(), []);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchTodos().then((todos) => {
      setTodos(todos);
      setIsLoading(false);
    });
  }, []);

  async function addTodo({ name, description }: AddTodoParams) {
    try {
      console.log("adding todo", { name, description });
      setIsLoading(true);

      await client.graphql({
        query: createTodo,
        variables: {
          input: {
            name,
            description,
          },
        },
      });
      const newTodos = await fetchTodos();

      setTodos(newTodos);
      setIsLoading(false);
    } catch (error) {
      console.log("error creating todo", error);
    }
  }

  async function fetchTodos() {
    try {
      const todoData = await client.graphql({
        query: listTodos,
      });
      return todoData.data.listTodos.items ?? [];
    } catch (err) {
      console.log("error fetching todos");
      return [];
    }
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, isLoading }}>
      {children}
    </TodoContext.Provider>
  );
};
