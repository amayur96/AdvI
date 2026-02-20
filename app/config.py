from __future__ import annotations

import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "gpt-4o")

# PostgreSQL Database URL (fallback to in-memory if not set)
DATABASE_URL: str = os.getenv(
    "DATABASE_URL",
    "sqlite:///./advi.db"  # Fallback to SQLite for local dev
)

# Use PostgreSQL if URL is provided, otherwise use in-memory
USE_POSTGRES = DATABASE_URL.startswith("postgresql://")
