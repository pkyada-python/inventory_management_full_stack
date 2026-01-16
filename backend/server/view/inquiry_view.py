from server.controller.inquiry_controller import InquiryController
from server.model import inquiry
from fastapi import APIRouter
# from fastapi import HTTPException


class InquiryView:
    router = APIRouter()

    @staticmethod
    @router.post("/addinquiry")
    async def create_inquiry(inquiry: inquiry):
        return await InquiryController.create_inquiry(inquiry)

    @staticmethod
    @router.get("/getallinquiry")
    async def get_all_inquiry():
        return await InquiryController.get_all_inquiry()

    @staticmethod
    @router.get("/get-admin-whatsapp")
    async def get_admin_whatsapp():
        return await InquiryController.get_admin_whatsapp()

    # @staticmethod
    # @router.get("/getinquiry/{id}", response_model=inquiry)
    # async def get_inquiry_by_id(id: str):
    #     return await InquiryController.get_inquiry_by_id(id)

    # @staticmethod
    # @router.put("/updateinquiry/{id}", response_model=inquiry)
    # async def update_inquiry(id: str, inquiry: inquiry):
    #     return await InquiryController.update_inquiry(id, inquiry)

    # @staticmethod
    # @router.delete("/deleteinquiry/{id}", response_model=inquiry)
    # async def delete_inquiry(id: str):
    #     return await InquiryController.delete_inquiry(id)
