from fastapi import HTTPException
from server.database import category_collection
from server.model import Category
from bson.objectid import ObjectId


class CategoryController:
    @staticmethod
    async def create_category(category: Category):
        try:
            data = category.model_dump()
            if data:
                if not data["name"]:
                    raise HTTPException(
                        status_code=400, detail="Category name is required"
                    )
                data["category_name_slug"] = (
                    data["name"].lower().strip().replace(" ", "-")
                )

                if not data["description"]:
                    raise HTTPException(
                        status_code=400, detail="Category description is required"
                    )

                if category_collection.find_one({"name": data["name"]}):
                    raise HTTPException(
                        status_code=400, detail="Category already exists"
                    )

                result = category_collection.insert_one(data)
                return {
                    "message": "Category created successfully",
                    "id": str(result.inserted_id),
                    "name": data["name"],
                    "category_name_slug": data["category_name_slug"],
                    "description": data["description"],
                    "created_at": data["created_at"],
                }
            else:
                raise HTTPException(status_code=400, detail="Category data is required")
        except HTTPException as he:
            raise he
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_all_category():
        try:
            # pymongo find() returns a cursor, which is synchronous
            cursor = category_collection.find()
            categories = []
            for doc in cursor:
                # Convert ObjectId to string for JSON serialization
                doc["_id"] = str(doc["_id"])
                categories.append(doc)

            return {
                "status_code": 200,
                "message": "Categories fetched successfully",
                "data": categories,
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def delete_category(category_id: str):
        try:
            if category_id:
                category_id = ObjectId(category_id)

                is_category_exists = category_collection.find_one({"_id": category_id})
                if not is_category_exists:
                    raise HTTPException(status_code=404, detail="Category not found")

                result = category_collection.delete_one({"_id": category_id})
                if result.deleted_count == 0:
                    raise HTTPException(
                        status_code=404, detail="Fail to delete Category"
                    )

                return {"message": "Category deleted successfully"}
            else:
                raise HTTPException(status_code=400, detail="Category ID is required")

        except HTTPException as he:
            raise he
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def update_category(category_id: str, category: Category):
        try:
            if category_id:
                category_id = ObjectId(category_id)

                is_category_exists = category_collection.find_one({"_id": category_id})
                if not is_category_exists:
                    raise HTTPException(status_code=404, detail="Category not found")

                data = category.model_dump()
                data["category_name_slug"] = (
                    data["name"].lower().strip().replace(" ", "-")
                )

                result = category_collection.update_one(
                    {"_id": category_id}, {"$set": data}
                )
                if result.modified_count == 0:
                    raise HTTPException(
                        status_code=404, detail="Fail to update Category"
                    )

                return {"message": "Category updated successfully"}
            else:
                raise HTTPException(status_code=400, detail="Category ID is required")

        except HTTPException as he:
            raise he
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
