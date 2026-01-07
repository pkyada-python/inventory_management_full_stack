from fastapi import HTTPException
from server.model import inquiry
from server.repository.inquiry_repository import InquiryRepository
from server.database import inquiry_collection


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
                if not data["message"]:
                    raise HTTPException(status_code=400, detail="Message is Required")
                inquiry_collection.insert_one(data)
                return {
                    "status_code": 201,
                    "message": "Inquiry created successfully",
                    "data": data,
                }
            else:
                raise HTTPException(status_code=400, detail="Inquiry data is Required")
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_all_inquiry():
        return await InquiryRepository.get_all_inquiry()

    @staticmethod
    async def get_inquiry_by_id(id: str):
        return await InquiryRepository.get_inquiry_by_id(id)

    @staticmethod
    async def update_inquiry(id: str, inquiry: inquiry):
        return await InquiryRepository.update_inquiry(id, inquiry)

    @staticmethod
    async def delete_inquiry(id: str):
        return await InquiryRepository.delete_inquiry(id)
