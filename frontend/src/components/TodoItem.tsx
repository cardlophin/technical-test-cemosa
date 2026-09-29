import React from "react";
import { Star, Trash2 } from "lucide-react";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  toggleFavorite: (id: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleTodo,
  toggleFavorite,
  deleteTodo,
}) => {
  return (
    <li
      className={`flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 ${
        todo.completed ? "text-gray-400" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="cursor-pointer h-4 w-4"
        aria-label={`Marcar "${todo.title}" como completada`}
      />

      <div className="min-w-0 flex-1">
        <p
          className={`font-medium truncate ${
            todo.completed ? "line-through" : ""
          }`}
        >
          {todo.title}
        </p>

        {todo.description && (
          <p className="mt-1 text-sm text-gray-500 break-words">
            {todo.description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => toggleFavorite(todo.id)}
        aria-label={
          todo.favorite
            ? `Quitar "${todo.title}" de favoritos`
            : `Añadir "${todo.title}" a favoritos`
        }
        title={todo.favorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        className={`rounded-lg p-2 transition cursor-pointer ${
          todo.favorite
            ? "text-yellow-500 hover:bg-yellow-100"
            : "text-gray-400 hover:bg-gray-200 hover:text-yellow-500"
        }`}
      >
        <Star
          size={20}
          fill={todo.favorite ? "currentColor" : "none"}
        />
      </button>

      <button
        type="button"
        onClick={() => deleteTodo(todo.id)}
        aria-label={`Eliminar "${todo.title}"`}
        title="Eliminar tarea"
        className="rounded-lg p-2 text-red-500 transition hover:bg-red-100 hover:text-red-700 cursor-pointer"
      >
        <Trash2 size={20} />
      </button>
    </li>
  );
};

export default TodoItem;
