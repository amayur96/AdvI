"""
Faculty-facing endpoints.
Connects the Faculty UI → LLM API.
"""

from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel

from app.agent import LLMApi
from app.db import faculty_db, student_db
from app.models import (
    LectureMaterial,
    FacultyInsightResponse,
    PresetQuestion,
)

router = APIRouter(prefix="/api/faculty", tags=["faculty"])


class UploadLectureRequest(BaseModel):
    lecture_id: str
    title: str
    content: str


class GenerateQuestionsRequest(BaseModel):
    lecture_id: str
    count: int = 5


class SubmitQuestionsRequest(BaseModel):
    lecture_id: str
    questions: list[dict]  # [{question: str, concept: str}, ...]


@router.post("/lectures")
async def upload_lecture(req: UploadLectureRequest):
    """Upload or update lecture materials (simulates Canvas import)."""
    lecture = LectureMaterial(
        lecture_id=req.lecture_id, title=req.title, content=req.content
    )
    faculty_db.upsert_lecture(lecture)
    return {"status": "ok", "lecture_id": req.lecture_id}


@router.get("/lectures")
async def list_lectures():
    """List all uploaded lecture materials."""
    return faculty_db.get_all_lectures()


@router.get("/insights/{lecture_id}", response_model=FacultyInsightResponse)
async def get_insights(lecture_id: str):
    """Generate AI-powered insights for a given lecture."""
    api = LLMApi(lecture_id)
    insights = await api.generate_insights()
    questions = await api.generate_preset_questions()

    return FacultyInsightResponse(
        lecture_id=lecture_id,
        insights=insights,
        suggested_questions=questions,
    )


@router.post("/questions/generate", response_model=FacultyInsightResponse)
async def generate_questions(req: GenerateQuestionsRequest):
    """Generate preset questions for a lecture and save to Student DB."""
    api = LLMApi(req.lecture_id)
    questions = await api.generate_preset_questions(count=req.count)
    insights = await api.generate_insights()

    return FacultyInsightResponse(
        lecture_id=req.lecture_id,
        insights=insights,
        suggested_questions=questions,
    )


@router.post("/questions/submit")
async def submit_questions(req: SubmitQuestionsRequest):
    """Submit manually selected preset questions for a lecture."""
    import uuid
    questions = [
        PresetQuestion(
            id=str(uuid.uuid4()),
            lecture_id=req.lecture_id,
            question=q.get("question", ""),
            concept=q.get("concept", q.get("tag", "")),
        )
        for q in req.questions
    ]
    student_db.set_preset_questions(req.lecture_id, questions)
    return {"status": "ok", "lecture_id": req.lecture_id, "count": len(questions)}


@router.get("/analytics/{lecture_id}")
async def get_analytics(lecture_id: str):
    """Get analytics data for a lecture: concept mastery, critical concepts, and response distributions."""
    from app.analytics import get_lecture_responses
    return await get_lecture_responses(lecture_id)
