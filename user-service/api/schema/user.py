from datetime import datetime

from pydantic import BaseModel
from sqlalchemy import DateTime


class UserBase(BaseModel):
    userid: str
    name: str
    email: str

    class Config:
        from_attributes=True

class UserLogin(BaseModel):
    userid: str
    passwd: str

class UserCreate(UserBase):
    passwd: str

class User(UserBase):
    mno: int
    #regdate: datetime
    regdate: str



class Token(BaseModel):
    access_token: str
    token_type: str
