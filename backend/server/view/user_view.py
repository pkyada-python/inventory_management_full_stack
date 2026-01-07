from server.controller.user_controller import UserController
from server.model import User, UserLogin
from fastapi import APIRouter, Depends, HTTPException
from server.middleware.auth_token_verify import AuthTokenVerify


class UserView:
    router = APIRouter()

    @staticmethod
    @router.post("/register")
    async def register_user(user: User):
        return await UserController.register_user(user)

    @staticmethod
    @router.post("/login")
    async def login_user(user: UserLogin):
        return await UserController.login_user(user)

    @staticmethod
    @router.get("/getalluser")
    async def get_all_user(token: dict = Depends(AuthTokenVerify.verify_token)):
        if token:
            return await UserController.get_all_user()
        else:
            raise HTTPException(
                status_code=401, detail="Invalid authentication credentials"
            )
