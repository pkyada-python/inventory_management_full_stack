from server.controller.category_controller import CategoryController
from server.model import Category
from fastapi import APIRouter, HTTPException, Depends
from server.middleware.auth_token_verify import AuthTokenVerify


class CategoryView:
    router = APIRouter()

    @staticmethod
    @router.post("/addcategory")
    async def create_category(
        category: Category, token: dict = Depends(AuthTokenVerify.verify_token)
    ):
        if token:
            return await CategoryController.create_category(category)
        else:
            raise HTTPException(
                status_code=401, detail="Invalid authentication credentials"
            )

    @staticmethod
    @router.get("/getallcategory")
    async def get_all_category():
        return await CategoryController.get_all_category()
