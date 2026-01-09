from typing import List
from server.controller.product_controller import ProductController
from server.model import Product
from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from server.middleware.auth_token_verify import AuthTokenVerify
from server.cloudinary_config import upload_image


class ProductView:
    router = APIRouter()

    @staticmethod
    @router.post("/addproduct")
    async def create_product(
        product: Product,
        token: dict = Depends(AuthTokenVerify.verify_token),
    ):
        """
        Receives Product data as JSON.
        Images should already be uploaded and their URLs included in product_images.
        """
        if not product.name:
            raise HTTPException(status_code=400, detail="Product name is required")

        return await ProductController.create_product(product)

    @staticmethod
    @router.post("/updateproduct/{id}")
    async def update_product(
        id: str,
        product_data: dict,
        token: dict = Depends(AuthTokenVerify.verify_token),
    ):
        return await ProductController.update_product(id, product_data)

    @staticmethod
    @router.post("/deleteproduct/{id}")
    async def delete_product(
        id: str,
        token: dict = Depends(AuthTokenVerify.verify_token),
    ):
        return await ProductController.delete_product(id)

    @staticmethod
    @router.post("/upload-images")
    async def upload_product_images(
        files: List[UploadFile] = File(...),
        token: dict = Depends(AuthTokenVerify.verify_token),
    ):
        """
        Helper endpoint to upload images and return Cloudinary URLs.
        """
        image_urls = []
        try:
            for file in files:
                url = upload_image(file.file)
                image_urls.append(url)
            return {"status": "success", "image_urls": image_urls}
        except Exception as e:
            raise HTTPException(
                status_code=500, detail=f"Image upload failed: {str(e)}"
            )

    @staticmethod
    @router.get("/getproductbyslug/{slug}")
    async def get_product_by_slug(slug: str):
        return await ProductController.get_product_by_slug(slug)

    @staticmethod
    @router.get("/get-related-products/{slug}")
    async def get_related_products(slug: str, limit: int = 3):
        return await ProductController.get_related_products(slug, limit)

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
    @router.get("/get-all-category-all-product")
    async def get_all_category__all_product():
        return await ProductController.get_all_category__all_product()

    @staticmethod
    @router.get("/get-random-products")
    async def get_random_products(limit: int = 6):
        return await ProductController.get_random_products(limit)
