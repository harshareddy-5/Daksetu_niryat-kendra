import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "DakSetu – Dak Ghar Niryat Kendra AI Assistant"
    API_V1_STR: str = "/api"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./daksetu.db")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "daksetu-sih-2026-secret-key-dnk-ai")
    DATA_DIR: str = os.path.join(os.path.dirname(__file__), "data")
    UPLOAD_DIR: str = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")

    class Config:
        case_sensitive = True

settings = Settings()
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
