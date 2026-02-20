from __future__ import annotations

from datetime import datetime
from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: str = Field(..., pattern="^(system|user|assistant)$")
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class PresetQuestion(BaseModel):
    id: str
    lecture_id: str
    question: str
    concept: str


class StudentRecord(BaseModel):
    student_id: str
    name: str
    chat_history: list[ChatMessage] = []
    preset_responses: dict[str, list[ChatMessage]] = {}


class LectureMaterial(BaseModel):
    lecture_id: str
    title: str
    content: str


class FacultyInsight(BaseModel):
    lecture_id: str
    concept: str
    struggling_pct: float
    summary: str
    recommendation: str


# --- API request / response ---

class SessionRequest(BaseModel):
    student_id: str
    lecture_id: str


class SessionResponse(BaseModel):
    reply: str
    preset_question: PresetQuestion | None = None
    preset_complete: bool = False
    answered_count: int = 0  # Number of preset questions already answered
    total_questions: int = 0  # Total number of preset questions
    conversation: list[ChatMessage] = []


class FreeFormRequest(BaseModel):
    student_id: str
    lecture_ids: list[str]
    message: str


class FacultyInsightResponse(BaseModel):
    lecture_id: str
    insights: list[FacultyInsight]
    suggested_questions: list[PresetQuestion]
