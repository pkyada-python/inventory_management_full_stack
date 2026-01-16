from fastapi import APIRouter
from app.core.config import settings

router = APIRouter()


@router.get("/config")
async def get_config():
    return {
        "admin_whatsapp_number": settings.ADMIN_WHATSAPP_NUMBER,
    }
