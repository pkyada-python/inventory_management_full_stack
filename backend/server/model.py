from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from datetime import timezone, timedelta

IST = timezone(timedelta(hours=5, minutes=30))

PRODUCT_TYPE = ["Powder", "Liquid", "Return"]
ROLE = ["user", "admin"]


class Category(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
    category_name_slug: Optional[str] = Field(None, min_length=3, max_length=50)
    description: Optional[str] = Field(None)
    created_at: datetime = Field(default=datetime.now(IST))
    updated_at: datetime = Field(default=datetime.now(IST))


class Product(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
    product_name_slug: Optional[str] = Field(None, min_length=3, max_length=50)
    category: str = Field(..., description="Category Name or ID")

    description: Optional[str] = Field(None)
    product_type: str = Field(..., enum=PRODUCT_TYPE)
    created_at: datetime = Field(default=datetime.now(IST))
    updated_at: datetime = Field(default=datetime.now(IST))

    #  package_size, packagingSize, targetCrops, Packaging Type, Minimum order quantity, Application, Form, Crop Type,Country Of Origin,Solubility,Benefits, Mode of Use, Major crops, Brand


class User(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, unique=True)
    email: EmailStr = Field(...)
    role: str = Field(default="user", enum=ROLE)
    password: str = Field(..., min_length=8, max_length=50)
    confirm_password: str = Field(..., min_length=8, max_length=50)
    created_at: datetime = Field(default=datetime.now(IST))
    updated_at: datetime = Field(default=datetime.now(IST))


class UpdateUserRole(BaseModel):
    role: str = Field(...)


class UserLogin(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8, max_length=50)


class inquiry(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
    phone: str = Field(..., max_digits=10, min_length=10)
    email: EmailStr = Field(..., unique=True)
    message: str = Field(...)
    created_at: datetime = Field(default=datetime.now(IST))
    updated_at: datetime = Field(default=datetime.now(IST))
