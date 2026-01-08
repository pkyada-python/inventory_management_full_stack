from typing import List
from server.database import product_collection, category_collection
from server.model import Product
from bson import ObjectId, errors
from fastapi import HTTPException


class ProductController:
    @staticmethod
    async def create_product(product: Product, image_urls: List[str] = None):
        try:
            data = product.model_dump()
            if data:
                if not data["name"]:
                    raise HTTPException(
                        status_code=400, detail="Product name is required"
                    )

                # Generate slug: "Product Name" -> "product-name"
                data["product_name_slug"] = (
                    data["name"].lower().strip().replace(" ", "-")
                )

                if not data["description"]:
                    raise HTTPException(
                        status_code=400, detail="Product description is required"
                    )
                if not data["product_type"]:
                    raise HTTPException(
                        status_code=400, detail="Product type is required"
                    )
                if not data["category"]:
                    raise HTTPException(status_code=400, detail="Category is required")

                if product_collection.find_one({"name": data["name"]}):
                    raise HTTPException(
                        status_code=400, detail="Product already exists"
                    )

                try:
                    category_id = ObjectId(data["category"])
                except errors.InvalidId:
                    raise HTTPException(
                        status_code=400, detail="Invalid Category ID format"
                    )

                if not category_collection.find_one({"_id": category_id}):
                    raise HTTPException(status_code=400, detail="Category not found")

                if image_urls:
                    data["product_images"] = image_urls

                result = product_collection.insert_one(data)

            return {
                "message": "Product created successfully",
                "id": str(result.inserted_id),
                "name": data["name"],
                "product_name_slug": data["product_name_slug"],
                "description": data["description"],
                "product_images": data.get("product_images", []),
            }

        except HTTPException as he:
            raise he
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_all_product():
        try:
            data = list(product_collection.find())
            if data:
                dataa = []
                for doc in data:
                    doc["_id"] = str(doc["_id"])
                    dataa.append(doc)
                return {
                    "status_code": 200,
                    "message": "Products fetched successfully",
                    "data": data,
                }
            else:
                raise HTTPException(status_code=404, detail="No products found")

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_product_by_id(id: str):
        try:
            data = product_collection.find_one({"_id": ObjectId(id)})
            if not data:
                raise HTTPException(status_code=404, detail="Product not found")
            data["_id"] = str(data["_id"])

            # Add category name for convenience
            if "category" in data:
                try:
                    cat_doc = category_collection.find_one(
                        {"_id": ObjectId(data["category"])}
                    )
                    if cat_doc:
                        data["category_name"] = cat_doc["name"]
                except:
                    pass

            return {
                "status_code": 200,
                "message": "Product fetched successfully",
                "data": data,
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_all_product_by_category(category: str):
        try:
            data = list(product_collection.find({"category": category}))
            dataa = []
            for doc in data:
                doc["_id"] = str(doc["_id"])
                dataa.append(doc)
            return {
                "status_code": 200,
                "message": "Products fetched successfully",
                "data": data,
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_all_category__all_product():
        try:
            categories = list(category_collection.find())
            result = []
            for cat in categories:
                cat_id_str = str(cat["_id"])
                # Fetch all products belonging to this category
                products = list(product_collection.find({"category": cat_id_str}))

                # Format products for JSON serialization
                formatted_products = []
                for p in products:
                    p["_id"] = str(p["_id"])
                    formatted_products.append(p)

                result.append(
                    {
                        "category_name": cat["name"],
                        "category_id": cat_id_str,
                        "category_description": cat.get("description", ""),
                        "product_count": len(formatted_products),
                        "products": formatted_products,
                    }
                )

            return {
                "status_code": 200,
                "message": "Categories and products fetched successfully",
                "data": result,
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
