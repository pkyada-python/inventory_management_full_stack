from server.database import product_collection, category_collection
from server.model import Product
from bson import ObjectId, errors
from fastapi import HTTPException


class ProductController:
    @staticmethod
    async def create_product(product: Product):
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
                result = product_collection.insert_one(data)

            return {
                "message": "Product created successfully",
                "id": str(result.inserted_id),
                "name": data["name"],
                "product_name_slug": data["product_name_slug"],
                "description": data["description"],
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
