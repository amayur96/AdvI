"""
SQLAlchemy models for PostgreSQL databases.
"""

from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlalchemy import JSON, Column, DateTime, String, Text, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.config import DATABASE_URL

Base = declarative_base()


# ============================================================================
# Student Database Models
# ============================================================================

class StudentRecordModel(Base):
    __tablename__ = "students"
    __table_args__ = {"schema": None}  # Use default schema

    student_id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class ChatMessageModel(Base):
    __tablename__ = "chat_messages"
    __table_args__ = {"schema": None}

    id = Column(String, primary_key=True)
    student_id = Column(String, nullable=False, index=True)
    role = Column(String, nullable=False)  # 'user' | 'assistant' | 'system'
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, index=True)
    session_id = Column(String, nullable=True, index=True)  # Optional: group messages by session


class PresetQuestionModel(Base):
    __tablename__ = "preset_questions"
    __table_args__ = {"schema": None}

    id = Column(String, primary_key=True)
    lecture_id = Column(String, nullable=False, index=True)
    question = Column(Text, nullable=False)
    concept = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class PresetResponseModel(Base):
    __tablename__ = "preset_responses"
    __table_args__ = {"schema": None}

    id = Column(String, primary_key=True)
    student_id = Column(String, nullable=False, index=True)
    question_id = Column(String, nullable=False, index=True)
    messages = Column(JSON, nullable=False)  # Store array of ChatMessage dicts
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# ============================================================================
# Faculty Database Models
# ============================================================================

class LectureMaterialModel(Base):
    __tablename__ = "lectures"
    __table_args__ = {"schema": None}

    lecture_id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# ============================================================================
# Database Engine and Session
# ============================================================================

# Single engine for both student and faculty tables
engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def create_tables():
    """Create all tables in the database."""
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")
