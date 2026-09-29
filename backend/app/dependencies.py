from pathlib import Path

from .db import TodoDB

db = TodoDB(Path(__file__).parent / "todos.json")
db.load()


def get_db() -> TodoDB:
    return db
