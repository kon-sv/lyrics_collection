from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional


class Settings(BaseSettings):
    subsonic_api_url: str = None
    params: str = None
    api_url: str = None
    database_url: str = None
    app_name: str = "Awesome API"
    admin_email: Optional[str] = None
    items_per_user: int = 50

    model_config = SettingsConfigDict(env_file=".env")
