import { useCallback, useEffect, useState } from "react";
import type { Todo } from "./types/todo";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo as deleteTodoRequest,
} from "./api/todo";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadTodos = useCallback(async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  }, []);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const addTodo = async () => {
    if (!title.trim()) return;

    try {
      await createTodo({
        title: title.trim(),
        description: description.trim(),
      });

      await loadTodos();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((item) => item.id === id);

    if (!todo) return;

    try {
      await updateTodo(id, { completed: !todo.completed });
      await loadTodos();
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const toggleFavorite = async (id: string) => {
    const todo = todos.find((item) => item.id === id);

    if (!todo) return;

    try {
      await updateTodo(id, { favorite: !todo.favorite });
      await loadTodos();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    const todo = todos.find((item) => item.id === id);

    if (!todo) return;

    const confirmed = window.confirm(
      `¿Quieres eliminar la tarea "${todo.title}"?`,
    );

    if (!confirmed) return;

    try {
      await deleteTodoRequest(id);
      await loadTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const favoriteTodos = todos.filter((todo) => todo.favorite);
  const otherTodos = todos.filter((todo) => !todo.favorite);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          ToDo List
        </h1>

        <div className="mb-8">
          <TodoForm
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
            addTodo={addTodo}
          />
        </div>

        <div className="space-y-8">
          <TodoList
            title="Favorites"
            emptyMessage="Mark a task to have it here."
            todos={favoriteTodos}
            toggleTodo={toggleTodo}
            toggleFavorite={toggleFavorite}
            deleteTodo={deleteTodo}
          />

          <TodoList
            title="Tasks"
            emptyMessage="There are no pending tasks."
            todos={otherTodos}
            toggleTodo={toggleTodo}
            toggleFavorite={toggleFavorite}
            deleteTodo={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
