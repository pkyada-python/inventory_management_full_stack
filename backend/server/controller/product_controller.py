from server.database import product_collection, category_collection
from server.model import Product, IST
from bson import ObjectId
from fastapi import HTTPException
from datetime import datetime


class ProductController:
    @staticmethod
    async def create_product(product: Product):
        try:
            data = product.model_dump()

            # Ensure we don't store the placeholder in the database
            if "product_images" in data and isinstance(data["product_images"], list):
                data["product_images"] = [
                    img for img in data["product_images"] if img != "/placeholder.svg"
                ]

            print(data)
            if data:
                if not data["name"]:
                    raise HTTPException(
                        status_code=400, detail="Product name is required"
                    )

                # Generate slug: "Product Name" -> "product-name"
                data["product_name_slug"] = (
                    data["name"].lower().strip().replace(" ", "-")
                )

                if data.get("category"):
                    # Smart Category Linking (Try ID first, then Name)
                    category_doc = None
                    try:
                        category_id = ObjectId(data["category"])
                        category_doc = category_collection.find_one(
                            {"_id": category_id}
                        )
                    except Exception:
                        # If not a valid ID, search by category name
                        category_doc = category_collection.find_one(
                            {"name": data["category"]}
                        )

                    if category_doc:
                        # Normalize data with IDs and Slugs
                        data["category"] = str(category_doc["_id"])
                        data["category_slug"] = category_doc.get("category_name_slug")
                        data["category_name"] = category_doc.get("name")
                    else:
                        raise HTTPException(
                            status_code=400,
                            detail=f"Category '{data['category']}' not found",
                        )

                if product_collection.find_one({"name": data["name"]}):
                    raise HTTPException(
                        status_code=400, detail="Product already exists"
                    )

                result = product_collection.insert_one(data)

            return {
                "message": "Product created successfully",
                "id": str(result.inserted_id),
                "name": data["name"],
                "product_name_slug": data["product_name_slug"],
                "category_slug": data.get("category_slug"),
                "description": data["description"],
                "product_images": data.get("product_images", []),
                "features": data.get("features", []),
                "applications": data.get("applications", []),
                "dosage": data.get("dosage"),
                "composition": data.get("composition"),
                "packing": data.get("packing", []),
            }

        except HTTPException as he:
            raise he
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_all_product():
        try:
            products = list(product_collection.find())

            # Fetch all categories once to avoid multiple DB calls
            categories = list(category_collection.find())
            category_map = {str(cat["_id"]): cat for cat in categories}

            formatted_products = []
            for p in products:
                cat_id = str(p.get("category", ""))
                cat_doc = category_map.get(cat_id)

                images = p.get("product_images", [])
                image_url = (
                    images[0] if (images and len(images) > 0) else "/placeholder.svg"
                )

                formatted_products.append(
                    {
                        "id": p.get("product_name_slug") or str(p["_id"]),
                        "db_id": str(p["_id"]),
                        "name": p.get("name"),
                        "category": cat_id,
                        "category_name": cat_doc.get("name") if cat_doc else "Unknown",
                        "categorySlug": p.get("category_slug")
                        or (cat_doc.get("category_name_slug") if cat_doc else ""),
                        "description": p.get("description", ""),
                        "features": p.get("features", []),
                        "applications": p.get("applications", []),
                        "dosage": p.get("dosage", ""),
                        "composition": p.get("composition", ""),
                        "packing": p.get("packing", []),
                        "product_image": image_url,
                        "product_images": images,
                        "product_type": p.get("product_type"),
                        "created_at": p.get("created_at"),
                        "updated_at": p.get("updated_at"),
                    }
                )

            return {
                "status_code": 200,
                "message": "Products fetched successfully",
                "data": formatted_products,
            }

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
                except Exception:
                    pass

            # Format for frontend
            formatted_data = {
                "id": data.get("product_name_slug"),
                "db_id": str(data["_id"]),
                "name": data.get("name"),
                "category": data.get("category_name"),
                "categorySlug": data.get("category_slug"),
                "description": data.get("description"),
                "features": data.get("features", []),
                "applications": data.get("applications", []),
                "dosage": data.get("dosage"),
                "composition": data.get("composition"),
                "packing": data.get("packing", []),
                "product_image": data.get("product_images", ["/placeholder.svg"])[0]
                if data.get("product_images")
                and len(data.get("product_images", [])) > 0
                else "/placeholder.svg",
                "product_images": data.get("product_images", []),
                "product_type": data.get("product_type"),
                "created_at": data.get("created_at"),
                "updated_at": data.get("updated_at"),
            }

            return {
                "status_code": 200,
                "message": "Product fetched successfully",
                "data": formatted_data,
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
                cat_name = cat.get("name")

                # Fetch all products belonging to this category.
                # Query matches by string ID, ObjectId, or category name for robustness.
                products = list(
                    product_collection.find(
                        {
                            "$or": [
                                {"category": cat_id_str},
                                {"category": cat["_id"]},
                                {"category": cat_name},
                            ]
                        }
                    )
                )

                # Format products for JSON serialization to match frontend structure
                formatted_products = []
                for p in products:
                    # Determine image URL
                    images = p.get("product_images", [])
                    image_url = (
                        images[0]
                        if (images and len(images) > 0)
                        else "/placeholder.svg"
                    )

                    formatted_products.append(
                        {
                            "id": p.get("product_name_slug") or str(p["_id"]),
                            "db_id": str(p["_id"]),
                            "name": p.get("name"),
                            "category": cat_name,
                            "categorySlug": cat.get("category_name_slug"),
                            "description": p.get("description", ""),
                            "features": p.get("features", []),
                            "applications": p.get("applications", []),
                            "dosage": p.get("dosage", ""),
                            "composition": p.get("composition", ""),
                            "packing": p.get("packing", []),
                            "product_image": image_url,
                            "product_images": images,
                        }
                    )

                result.append(
                    {
                        "name": cat_name,
                        "slug": cat.get("category_name_slug"),
                        "icon": cat.get("icon", "Sprout"),
                        "description": cat.get("description", ""),
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

    @staticmethod
    async def get_random_products(limit: int = 6):
        try:
            # Use aggregation to get random samples from MongoDB
            pipeline = [{"$sample": {"size": limit}}]
            random_products = list(product_collection.aggregate(pipeline))

            formatted_products = []
            for p in random_products:
                formatted_products.append(
                    {
                        "id": p.get("product_name_slug") or str(p["_id"]),
                        "name": p.get("name"),
                    }
                )

            return {
                "status_code": 200,
                "message": f"Fetched {len(formatted_products)} random products",
                "data": formatted_products,
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_product_by_slug(slug: str):
        try:
            data = product_collection.find_one({"product_name_slug": slug})
            if not data:
                # Fallback to id if slug not found (handling legacy links)
                try:
                    data = product_collection.find_one({"_id": ObjectId(slug)})
                except Exception:
                    raise HTTPException(status_code=404, detail="Product not found")

            if not data:
                raise HTTPException(status_code=404, detail="Product not found")

            # Add category name and slug for convenience
            category_doc = None
            if "category" in data:
                try:
                    category_doc = category_collection.find_one(
                        {"_id": ObjectId(data["category"])}
                    )
                except Exception:
                    pass

            formatted_data = {
                "id": data.get("product_name_slug") or str(data["_id"]),
                "db_id": str(data["_id"]),
                "name": data.get("name"),
                "category": category_doc.get("name") if category_doc else "Unknown",
                "category_id": str(category_doc["_id"]) if category_doc else None,
                "categorySlug": category_doc.get("category_name_slug")
                if category_doc
                else "biologicals",
                "description": data.get("description"),
                "features": data.get("features", []),
                "applications": data.get("applications", []),
                "dosage": data.get("dosage"),
                "composition": data.get("composition"),
                "packing": data.get("packing", []),
                "product_image": data.get("product_images", ["/placeholder.svg"])[0]
                if data.get("product_images")
                and len(data.get("product_images", [])) > 0
                else "/placeholder.svg",
                "product_images": data.get("product_images", []),
                "product_type": data.get("product_type"),
                "created_at": data.get("created_at"),
                "updated_at": data.get("updated_at"),
            }

            return {
                "status_code": 200,
                "message": "Product fetched successfully",
                "data": formatted_data,
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_related_products(slug: str, limit: int = 3):
        try:
            # Find the original product to get its category
            product = product_collection.find_one({"product_name_slug": slug})
            if not product:
                return {
                    "status_code": 404,
                    "message": "Source product not found",
                    "data": [],
                }

            category_id = product.get("category")
            if not category_id:
                return {
                    "status_code": 200,
                    "message": "No category for product",
                    "data": [],
                }

            # Find other products in the same category
            related = list(
                product_collection.find(
                    {"category": category_id, "_id": {"$ne": product["_id"]}}
                ).limit(limit)
            )

            formatted_related = []
            for p in related:
                formatted_related.append(
                    {
                        "id": p.get("product_name_slug") or str(p["_id"]),
                        "name": p.get("name"),
                        "description": p.get("description", ""),
                        "product_image": p.get("product_images", ["/placeholder.svg"])[
                            0
                        ]
                        if p.get("product_images")
                        and len(p.get("product_images", [])) > 0
                        else "/placeholder.svg",
                        "product_images": p.get("product_images", []),
                    }
                )

            return {
                "status_code": 200,
                "message": "Related products fetched successfully",
                "data": formatted_related,
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def update_product(id: str, product: dict):
        try:
            # Check if product exists - can be by slug or ObjectId
            query = {"$or": [{"product_name_slug": id}]}
            try:
                query["$or"].append({"_id": ObjectId(id)})
            except Exception:
                pass

            existing_product = product_collection.find_one(query)
            if not existing_product:
                raise HTTPException(status_code=404, detail="Product not found")

            # Prepare update data
            update_data = product.copy()

            # Generate new slug if name is changed
            if "name" in update_data:
                update_data["product_name_slug"] = (
                    update_data["name"].lower().strip().replace(" ", "-")
                )

            # Update category info if category changed
            if "category" in update_data:
                category_doc = None
                try:
                    category_id = ObjectId(update_data["category"])
                    category_doc = category_collection.find_one({"_id": category_id})
                except Exception:
                    category_doc = category_collection.find_one(
                        {"name": update_data["category"]}
                    )

                if category_doc:
                    update_data["category"] = str(category_doc["_id"])
                    update_data["category_slug"] = category_doc.get(
                        "category_name_slug"
                    )
                    update_data["category_name"] = category_doc.get("name")

            # Remove /placeholder.svg from product_images if it somehow got there
            if "product_images" in update_data and isinstance(
                update_data["product_images"], list
            ):
                update_data["product_images"] = [
                    img
                    for img in update_data["product_images"]
                    if img != "/placeholder.svg"
                ]

            update_data["updated_at"] = datetime.now(IST)

            product_collection.update_one(
                {"_id": existing_product["_id"]}, {"$set": update_data}
            )

            return {"message": "Product updated successfully"}
        except HTTPException as he:
            raise he
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def delete_product(id: str):
        try:
            query = {"$or": [{"product_name_slug": id}]}
            try:
                query["$or"].append({"_id": ObjectId(id)})
            except Exception:
                pass

            result = product_collection.delete_one(query)
            if result.deleted_count == 0:
                raise HTTPException(status_code=404, detail="Product not found")

            return {"message": "Product deleted successfully"}
        except HTTPException as he:
            raise he
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
