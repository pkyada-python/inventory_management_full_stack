from server.controller.product_controller import ProductController
from server.model import Product
from fastapi import APIRouter, Depends
from server.middleware.auth_token_verify import AuthTokenVerify


class ProductView:
    router = APIRouter()

    @staticmethod
    @router.post("/addproduct")
    async def create_product(
        product: Product, token: dict = Depends(AuthTokenVerify.verify_token)
    ):
        return await ProductController.create_product(product)

    @staticmethod
    @router.get("/getallproduct")
    async def get_all_product():
        return await ProductController.get_all_product()

    @staticmethod
    @router.get("/getproductbyid/{id}")
    async def get_product_by_id(id: str):
        return await ProductController.get_product_by_id(id)

    @staticmethod
    @router.get("/getallproductbycategory/{category}")
    async def get_all_product_by_category(category: str):
        return await ProductController.get_all_product_by_category(category)
