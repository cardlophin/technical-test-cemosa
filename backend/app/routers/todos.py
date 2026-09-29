from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from ..db import TodoDB
from ..dependencies import get_db
from ..models.payloads import CreateTodoPayload, UpdateTodoPayload
from ..models.todo import UUID, Todo

router = APIRouter(prefix="/todos", tags=["todos"])

DB = Annotated[TodoDB, Depends(get_db)]


def _not_found(todo_id: UUID) -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Todo with id '{todo_id}' was not found",
    )


@router.get("", response_model=list[Todo])
async def get_todos(db: DB):
    """Get all todos."""
    return db.get_initialized_or_raise()


@router.post("", response_model=Todo, status_code=status.HTTP_201_CREATED)
async def add_todo(payload: CreateTodoPayload, db: DB) -> Todo:
    """Add a new todo."""
    todo = Todo(**payload.model_dump())
    db.add(todo)
    db.save()

    return todo


@router.patch("/{todo_id}", response_model=Todo)
async def update_todo(todo_id: UUID, payload: UpdateTodoPayload, db: DB) -> Todo:
    """Update the completed and/or favorite status of a todo."""
    todo = db.find(todo_id)

    if todo is None:
        raise _not_found(todo_id)

    for field, value in payload.model_dump(exclude_none=True).items():
        setattr(todo, field, value)
    db.save()

    return todo


@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(todo_id: UUID, db: DB) -> None:
    """Delete a todo."""
    if db.delete(id=todo_id) is None:
        raise _not_found(todo_id)

    db.save()
