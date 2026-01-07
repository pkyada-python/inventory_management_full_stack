from fastapi import HTTPException
from bson import ObjectId
import re
from server.model import User, UserLogin
from server.database import user_collection
import bcrypt
from jose import jwt
from app.core.config import settings


# region user
class UserController:
    @staticmethod
    async def register_user(user: User):
        try:
            data = user.model_dump()
            if data:
                if data["username"]:
                    is_user_exist = user_collection.find_one(
                        {"username": data["username"]}
                    )
                    if is_user_exist:
                        raise HTTPException(
                            status_code=400, detail="User already exists"
                        )
                else:
                    raise HTTPException(status_code=400, detail="Username is Required")

                if data["email"]:
                    email_regex = r"^[\w.-]+@([a-zA-Z-]+\.)+[a-zA-Z]{2,}$"
                    if not re.match(email_regex, data["email"]):
                        raise HTTPException(status_code=400, detail="Invalid Email")

                    is_email_exist = user_collection.find_one({"email": data["email"]})
                    if is_email_exist:
                        raise HTTPException(
                            status_code=400, detail="Email already exists"
                        )
                else:
                    raise HTTPException(status_code=400, detail="Email is Required")

                if data["password"] == data["confirm_password"]:
                    hash_password = bcrypt.hashpw(
                        data["password"].encode("utf-8"), bcrypt.gensalt()
                    )
                else:
                    raise HTTPException(
                        status_code=401,
                        detail="Password and Confirm password does not match",
                    )
            else:
                raise HTTPException(status_code=400, detail="User data is Required")

            data.pop("confirm_password", None)

            hashed_password_str = hash_password.decode("utf-8")
            data["password"] = hashed_password_str
            user_collection.insert_one(data)

            token_data = {"sub": str(data["_id"]), "username": data["username"]}

            user_access_token = jwt.encode(
                token_data, settings.SECRET_KEY, algorithm=settings.ALGORITHM
            )

            return {
                "status_code": 201,
                "message": "User registered successfully",
                "data": {
                    "username": data["username"],
                    "email": data["email"],
                    "role": data["role"],
                },
                "access_token": user_access_token,
                "token_type": "bearer",
            }

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def login_user(user: UserLogin):
        try:
            data = user.model_dump()
            if data:
                if data["username"]:
                    user_data = user_collection.find_one({"username": data["username"]})
                    if not user_data:
                        raise HTTPException(status_code=404, detail="User not found")
                else:
                    raise HTTPException(status_code=400, detail="Username is Required")

                if data["password"]:
                    if not bcrypt.checkpw(
                        data["password"].encode("utf-8"),
                        user_data["password"].encode("utf-8"),
                    ):
                        raise HTTPException(
                            status_code=401, detail="Incorrect password"
                        )
                else:
                    raise HTTPException(status_code=400, detail="Password is Required")
            else:
                raise HTTPException(status_code=400, detail="User data is Required")

            user_data_id = str(user_data["_id"])

            token_data = {"sub": user_data_id, "username": user_data["username"]}

            user_access_token = jwt.encode(
                token_data, settings.SECRET_KEY, algorithm=settings.ALGORITHM
            )
            return {
                "status_code": 200,
                "message": "User logged in successfully",
                "data": {
                    "username": user_data["username"],
                    "email": user_data["email"],
                    "role": user_data["role"],
                },
                "access_token": user_access_token,
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_all_user():
        try:
            user_data = user_collection.find()
            user_list = []
            for user in user_data:
                user["_id"] = str(user["_id"])
                user_list.append(user)
            if user_list:
                return user_list
            else:
                raise HTTPException(status_code=404, detail="User not found")
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_user_by_id(id: str):
        try:
            user_data = user_collection.find_one({"_id": ObjectId(id)})
            if user_data:
                return user_data
            else:
                raise HTTPException(status_code=404, detail="User not found")
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
