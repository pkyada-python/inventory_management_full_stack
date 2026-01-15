import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    MONGO_URI: str = os.getenv("MONGO_URI")
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    ALGORITHM: str = os.getenv("ALGORITHM")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
    CLOUDINARY_CLOUD_NAME: str = os.getenv("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY: str = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET: str = os.getenv("CLOUDINARY_API_SECRET")
    ADMIN_WHATSAPP_NUMBER: str = os.getenv("ADMIN_WHATSAPP_NUMBER", "919998978000")
    ULTRAMSG_TOKEN: str = os.getenv("ULTRAMSG_TOKEN")
    ULTRAMSG_INSTANCE_ID: str = os.getenv("ULTRAMSG_INSTANCE_ID")


settings = Settings()
