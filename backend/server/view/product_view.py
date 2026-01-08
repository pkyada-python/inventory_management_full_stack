from typing import List
from server.controller.product_controller import ProductController
from server.model import Product
from fastapi import APIRouter, Depends, File, UploadFile, Form
from server.middleware.auth_token_verify import AuthTokenVerify
from server.cloudinary_config import upload_image


class ProductView:
    router = APIRouter()

    @staticmethod
    @router.post("/addproduct")
    async def create_product(
        name: str = Form(...),
        category: str = Form(None),
        description: str = Form(None),
        product_type: str = Form(...),
        files: List[UploadFile] = File(...),
        token: dict = Depends(AuthTokenVerify.verify_token),
    ):
        image_urls = []
        for file in files:
            url = upload_image(file.file)
            image_urls.append(url)

        product = Product(
            name=name,
            category=category,
            description=description,
            product_type=product_type,
        )
        return await ProductController.create_product(product, image_urls)

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

    @staticmethod
    @router.get("/get_all_category_all_product")
    async def get_all_category__all_product():
        return await ProductController.get_all_category__all_product()
