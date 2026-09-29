import type { Todo } from "../types/todo";

const BASE_URL = "http://localhost:8000/todos";

export interface CreateTodoInput {
  title: string;
  description: string;
}

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Error fetching todos");
  return res.json();
};

export const createTodo = async ({
  title,
  description,
}: CreateTodoInput): Promise<Todo> => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });
  if (!res.ok) throw new Error("Error creating todo");
  return res.json();
};

export type UpdateTodoInput = Partial<Pick<Todo, "completed" | "favorite">>;

export const updateTodo = async (
  id: string,
  changes: UpdateTodoInput
): Promise<Todo> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(changes),
  });
  if (!res.ok) throw new Error("Error updating todo");
  return res.json();
};

export const deleteTodo = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error deleting todo");
};
