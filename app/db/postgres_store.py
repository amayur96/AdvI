"""
PostgreSQL-based implementations of StudentDB and FacultyDB.
Uses SQLAlchemy for database operations.
"""

from __future__ import annotations

import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy.orm import Session

from app.models import ChatMessage, LectureMaterial, PresetQuestion, StudentRecord
from app.db.models import (
    ChatMessageModel,
    LectureMaterialModel,
    PresetQuestionModel,
    PresetResponseModel,
    SessionLocal,
    StudentRecordModel,
)


class StudentDBPostgres:
    """PostgreSQL-backed StudentDB implementation."""

    def get_student(self, student_id: str) -> StudentRecord:
        with SessionLocal() as session:
            record = session.query(StudentRecordModel).filter_by(student_id=student_id).first()
            if not record:
                # Create new student record
                new_record = StudentRecordModel(student_id=student_id, name=student_id)
                session.add(new_record)
                session.commit()
            
            # Get preset responses for this student
            preset_responses = self._get_preset_responses(student_id)
            # Convert to ChatMessage objects
            preset_responses_dict: dict[str, list[ChatMessage]] = {}
            for q_id, msgs in preset_responses.items():
                preset_responses_dict[q_id] = msgs
            
            return StudentRecord(
                student_id=student_id,
                name=record.name if record else student_id,
                preset_responses=preset_responses_dict,
            )

    def append_messages(self, student_id: str, messages: list[ChatMessage]) -> None:
        with SessionLocal() as session:
            for msg in messages:
                msg_model = ChatMessageModel(
                    id=str(uuid.uuid4()),
                    student_id=student_id,
                    role=msg.role,
                    content=msg.content,
                    timestamp=msg.timestamp,
                )
                session.add(msg_model)
            session.commit()

    def save_preset_response(
        self, student_id: str, question_id: str, messages: list[ChatMessage]
    ) -> None:
        with SessionLocal() as session:
            # Check if response already exists
            existing = (
                session.query(PresetResponseModel)
                .filter_by(student_id=student_id, question_id=question_id)
                .first()
            )
            msg_data = [
                {"role": m.role, "content": m.content, "timestamp": m.timestamp.isoformat()}
                for m in messages
            ]
            if existing:
                # Update existing response
                existing.messages = msg_data
                existing.updated_at = datetime.utcnow()
            else:
                # Create new response
                new_response = PresetResponseModel(
                    id=str(uuid.uuid4()),
                    student_id=student_id,
                    question_id=question_id,
                    messages=msg_data,
                )
                session.add(new_response)
            session.commit()

    def get_chat_history(self, student_id: str) -> list[ChatMessage]:
        with SessionLocal() as session:
            messages = (
                session.query(ChatMessageModel)
                .filter_by(student_id=student_id)
                .order_by(ChatMessageModel.timestamp)
                .all()
            )
            return [
                ChatMessage(role=m.role, content=m.content, timestamp=m.timestamp)
                for m in messages
            ]

    def set_preset_questions(
        self, lecture_id: str, questions: list[PresetQuestion]
    ) -> None:
        with SessionLocal() as session:
            # Delete existing questions for this lecture
            session.query(PresetQuestionModel).filter_by(lecture_id=lecture_id).delete()
            # Add new questions
            for q in questions:
                q_model = PresetQuestionModel(
                    id=q.id,
                    lecture_id=q.lecture_id,
                    question=q.question,
                    concept=q.concept,
                )
                session.add(q_model)
            session.commit()

    def get_preset_questions(self, lecture_id: str) -> list[PresetQuestion]:
        with SessionLocal() as session:
            questions = (
                session.query(PresetQuestionModel)
                .filter_by(lecture_id=lecture_id)
                .all()
            )
            return [
                PresetQuestion(
                    id=q.id,
                    lecture_id=q.lecture_id,
                    question=q.question,
                    concept=q.concept,
                )
                for q in questions
            ]

    def get_all_histories(self) -> dict[str, list[ChatMessage]]:
        with SessionLocal() as session:
            all_messages = session.query(ChatMessageModel).order_by(ChatMessageModel.timestamp).all()
            histories: dict[str, list[ChatMessage]] = {}
            for m in all_messages:
                if m.student_id not in histories:
                    histories[m.student_id] = []
                histories[m.student_id].append(
                    ChatMessage(role=m.role, content=m.content, timestamp=m.timestamp)
                )
            return histories

    def _get_preset_responses(self, student_id: str) -> dict[str, list[ChatMessage]]:
        """Internal helper to get preset responses for a student."""
        with SessionLocal() as session:
            responses = session.query(PresetResponseModel).filter_by(student_id=student_id).all()
            result: dict[str, list[ChatMessage]] = {}
            for r in responses:
                result[r.question_id] = [
                    ChatMessage(
                        role=msg["role"],
                        content=msg["content"],
                        timestamp=datetime.fromisoformat(msg["timestamp"]),
                    )
                    for msg in r.messages
                ]
            return result


class FacultyDBPostgres:
    """PostgreSQL-backed FacultyDB implementation."""

    def upsert_lecture(self, lecture: LectureMaterial) -> None:
        with SessionLocal() as session:
            existing = (
                session.query(LectureMaterialModel)
                .filter_by(lecture_id=lecture.lecture_id)
                .first()
            )
            if existing:
                existing.title = lecture.title
                existing.content = lecture.content
                existing.updated_at = datetime.utcnow()
            else:
                new_lecture = LectureMaterialModel(
                    lecture_id=lecture.lecture_id,
                    title=lecture.title,
                    content=lecture.content,
                )
                session.add(new_lecture)
            session.commit()

    def get_lecture(self, lecture_id: str) -> Optional[LectureMaterial]:
        with SessionLocal() as session:
            lecture = (
                session.query(LectureMaterialModel)
                .filter_by(lecture_id=lecture_id)
                .first()
            )
            if not lecture:
                return None
            return LectureMaterial(
                lecture_id=lecture.lecture_id,
                title=lecture.title,
                content=lecture.content,
            )

    def get_lectures(self, lecture_ids: list[str]) -> list[LectureMaterial]:
        with SessionLocal() as session:
            lectures = (
                session.query(LectureMaterialModel)
                .filter(LectureMaterialModel.lecture_id.in_(lecture_ids))
                .all()
            )
            return [
                LectureMaterial(
                    lecture_id=l.lecture_id,
                    title=l.title,
                    content=l.content,
                )
                for l in lectures
            ]

    def get_all_lectures(self) -> list[LectureMaterial]:
        with SessionLocal() as session:
            lectures = session.query(LectureMaterialModel).all()
            return [
                LectureMaterial(
                    lecture_id=l.lecture_id,
                    title=l.title,
                    content=l.content,
                )
                for l in lectures
            ]
