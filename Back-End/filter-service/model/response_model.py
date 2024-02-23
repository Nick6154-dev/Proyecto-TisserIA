from pydantic import BaseModel


class ResponseModel(BaseModel):
    is_crochet: bool
    message: str
