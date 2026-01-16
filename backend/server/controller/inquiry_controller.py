from fastapi import HTTPException
from server.model import inquiry

# from server.repository.inquiry_repository import InquiryRepository
from server.database import product_collection, inquiry_collection
from server.utils.whatsapp_service import notify_inquiry_via_whatsapp
import re


class InquiryController:
    @staticmethod
    async def create_inquiry(inquiry: inquiry):
        try:
            data = inquiry.model_dump()
            if data:
                if not data["name"]:
                    raise HTTPException(status_code=400, detail="Name is Required")

                if not data["email"]:
                    raise HTTPException(status_code=400, detail="Email is Required")

                emailRegex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                if not re.match(emailRegex, data["email"]):
                    raise HTTPException(status_code=400, detail="Invalid Email")

                isProductExist = product_collection.find_one({"name": data["product"]})
                if not isProductExist:
                    raise HTTPException(status_code=400, detail="Product is Not Exist")

                if not data["phone"]:
                    raise HTTPException(status_code=400, detail="Phone is Required")

                phoneRegex = r"^\d{10}$"
                if not re.match(phoneRegex, data["phone"]):
                    raise HTTPException(status_code=400, detail="Invalid Phone Number")

                if not data["product"]:
                    raise HTTPException(status_code=400, detail="Product is Required")

                if not data["quantity"]:
                    raise HTTPException(status_code=400, detail="Quantity is Required")

                # isQuantityValid = re.match(r"^\d+$", data["quantity"])
                # if not isQuantityValid:
                #     raise HTTPException(status_code=400, detail="Invalid Quantity")

                if not data["message"]:
                    raise HTTPException(status_code=400, detail="Message is Required")
                result = inquiry_collection.insert_one(data)

                # Send WhatsApp Notifications
                try:
                    notify_inquiry_via_whatsapp(data)
                except Exception as ex:
                    print(f"Failed to send WhatsApp message: {ex}")

                return {
                    "status_code": 201,
                    "message": "Inquiry created successfully",
                    "data": str(result.inserted_id),
                }
            else:
                raise HTTPException(status_code=400, detail="Inquiry data is Required")
        except HTTPException as he:
            raise he
        except Exception as e:
            print(e)
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_all_inquiry():
        try:
            data = list(inquiry_collection.find())
            dataa = []
            for doc in data:
                doc["_id"] = str(doc["_id"])
                dataa.append(doc)
            return {
                "status_code": 200,
                "message": "Inquiries fetched successfully",
                "data": dataa,
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_admin_whatsapp():
        import os

        admin_number = os.getenv("ADMIN_WHATSAPP_NUMBER", "917487853898")
        return {"whatsapp_number": admin_number}

    # @staticmethod
    # async def get_inquiry_by_id(id: str):

    # @staticmethod
    # async def update_inquiry(id: str, inquiry: inquiry):
    #     return await InquiryRepository.update_inquiry(id, inquiry)

    # @staticmethod
    # async def delete_inquiry(id: str):
    #     return await InquiryRepository.delete_inquiry(id)
