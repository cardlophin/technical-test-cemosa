import json
from pathlib import Path

from pydantic import TypeAdapter

from .models.todo import UUID, Todo


class TodoDB:
    def __init__(self, todos_path: Path) -> None:
        self.todos_path: Path = todos_path

        if not self.todos_path.exists():
            raise RuntimeError("path does not exists.")

        if not self.todos_path.is_file():
            raise RuntimeError("path is not a file.")

        if not str(self.todos_path).endswith(".json"):
            raise RuntimeError("db file is not a json file.")

        self.db = None

    def get_initialized_or_raise(self) -> list[Todo]:
        if self.db is None:
            raise RuntimeError("db is not initialized")
        return self.db

    def load(self):
        with open(self.todos_path, "r") as f:
            raw_db = json.load(f)
            self.db = TypeAdapter(list[Todo]).validate_python(raw_db)

    def save(self):
        db = self.get_initialized_or_raise()

        with open(self.todos_path, "w", encoding="utf-8") as f:
            raw_db = [t.model_dump(mode="json") for t in db]
            json.dump(raw_db, f, indent=3)

    def add(self, todo: Todo):
        db = self.get_initialized_or_raise()
        db.append(todo)

    def find(self, id: UUID) -> Todo | None:
        db = self.get_initialized_or_raise()
        for t in db:
            if id == t.id:
                return t
        return None

    def delete(self, id: UUID) -> Todo | None:
        db = self.get_initialized_or_raise()
        for i, t in enumerate(db):
            if id == t.id:
                return db.pop(i)
        return None
