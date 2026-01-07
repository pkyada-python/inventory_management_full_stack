from fastapi import HTTPException
from server.database import category_collection
from server.model import Category


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
