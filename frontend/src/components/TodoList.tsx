import React from "react";
import type { Todo } from "../types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  title: string;
  emptyMessage: string;
  todos: Todo[];
  toggleTodo: (id: string) => void;
  toggleFavorite: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  title,
  emptyMessage,
  todos,
  toggleTodo,
  toggleFavorite,
  deleteTodo,
}) => {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-2 text-gray-700">
        {title} <span className="text-gray-400">({todos.length})</span>
      </h2>

      {todos.length === 0 ? (
        <p className="text-sm text-gray-400">{emptyMessage}</p>
      ) : (
        <ul className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              toggleFavorite={toggleFavorite}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default TodoList;
