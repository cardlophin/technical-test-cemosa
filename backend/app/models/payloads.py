from pydantic import BaseModel, Field


class CreateTodoPayload(BaseModel):
    title: str = Field(min_length=1)
    description: str = ""


class UpdateTodoPayload(BaseModel):
    completed: bool | None = None
    favorite: bool | None = None
