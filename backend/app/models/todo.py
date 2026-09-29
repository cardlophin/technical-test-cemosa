from uuid import UUID, uuid4

from pydantic import BaseModel, Field


class Todo(BaseModel):
    id: UUID = Field(
        default_factory=uuid4
    )  # https://stackoverflow.com/questions/3530294/how-to-generate-unique-64-bits-integers-from-python
    title: str
    description: str = ""
    favorite: bool = False
    completed: bool = False
