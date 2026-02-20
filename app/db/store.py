"""
Database stores for Student DB and Faculty DB.
Automatically uses PostgreSQL if configured, otherwise falls back to in-memory storage.
"""

from __future__ import annotations

from app.config import USE_POSTGRES
from app.models import (
    ChatMessage,
    PresetQuestion,
    StudentRecord,
    LectureMaterial,
)

if USE_POSTGRES:
    from app.db.postgres_store import StudentDBPostgres, FacultyDBPostgres


class StudentDB:
    """Stores per-student chat histories and preset questions."""

    def __init__(self) -> None:
        self._students: dict[str, StudentRecord] = {}
        self._preset_questions: dict[str, list[PresetQuestion]] = {}

    def get_student(self, student_id: str) -> StudentRecord:
        if student_id not in self._students:
            self._students[student_id] = StudentRecord(
                student_id=student_id, name=student_id
            )
        return self._students[student_id]

    def append_messages(self, student_id: str, messages: list[ChatMessage]) -> None:
        record = self.get_student(student_id)
        record.chat_history.extend(messages)

    def save_preset_response(
        self, student_id: str, question_id: str, messages: list[ChatMessage]
    ) -> None:
        record = self.get_student(student_id)
        record.preset_responses.setdefault(question_id, []).extend(messages)

    def get_chat_history(self, student_id: str) -> list[ChatMessage]:
        return self.get_student(student_id).chat_history

    # --- Preset questions (written by the LLM API, read by the Agent) ---

    def set_preset_questions(
        self, lecture_id: str, questions: list[PresetQuestion]
    ) -> None:
        self._preset_questions[lecture_id] = questions

    def get_preset_questions(self, lecture_id: str) -> list[PresetQuestion]:
        return self._preset_questions.get(lecture_id, [])

    def get_all_histories(self) -> dict[str, list[ChatMessage]]:
        return {sid: r.chat_history for sid, r in self._students.items()}


class FacultyDB:
    """Stores lecture materials uploaded by faculty."""

    def __init__(self) -> None:
        self._lectures: dict[str, LectureMaterial] = {}

    def upsert_lecture(self, lecture: LectureMaterial) -> None:
        self._lectures[lecture.lecture_id] = lecture

    def get_lecture(self, lecture_id: str) -> LectureMaterial | None:
        return self._lectures.get(lecture_id)

    def get_lectures(self, lecture_ids: list[str]) -> list[LectureMaterial]:
        return [
            self._lectures[lid]
            for lid in lecture_ids
            if lid in self._lectures
        ]

    def get_all_lectures(self) -> list[LectureMaterial]:
        return list(self._lectures.values())


# Singleton instances - use PostgreSQL if configured, otherwise in-memory
if USE_POSTGRES:
    student_db = StudentDBPostgres()
    faculty_db = FacultyDBPostgres()
else:
    student_db = StudentDB()
    faculty_db = FacultyDB()
