"""
Student-facing endpoints.
Connects the Student UI → AI Agent.
"""

from __future__ import annotations

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.agent import ChatAgent
from app.db import student_db
from app.models import SessionRequest, SessionResponse, FreeFormRequest, ChatMessage

router = APIRouter(prefix="/api/student", tags=["student"])

_active_sessions: dict[str, ChatAgent] = {}


def _session_key(student_id: str, lecture_id: str) -> str:
    return f"{student_id}::{lecture_id}"


class MessageRequest(BaseModel):
    student_id: str
    lecture_id: str
    message: str


@router.post("/session/start", response_model=SessionResponse)
async def start_session(req: SessionRequest):
    """Start a new chat session for a student on a given lecture."""
    key = _session_key(req.student_id, req.lecture_id)
    agent = ChatAgent(req.student_id, req.lecture_id)
    _active_sessions[key] = agent

    reply, preset_q, preset_complete = await agent.start_session()
    
    # Get answered count and total questions
    total_questions = len(agent._preset_questions)
    answered_count = agent._preset_index  # _preset_index is the next question index, so it equals answered count

    return SessionResponse(
        reply=reply,
        preset_question=preset_q,
        preset_complete=preset_complete,
        answered_count=answered_count,
        total_questions=total_questions,
        conversation=agent.get_session_messages(),
    )


@router.post("/session/message", response_model=SessionResponse)
async def send_message(req: MessageRequest):
    """Send a message during an active preset-question session."""
    key = _session_key(req.student_id, req.lecture_id)
    agent = _active_sessions.get(key)
    if not agent:
        raise HTTPException(404, "No active session. Call /session/start first.")

    reply, next_q, preset_complete = await agent.handle_message(req.message)
    
    # Get updated answered count and total questions
    total_questions = len(agent._preset_questions)
    answered_count = agent._preset_index

    return SessionResponse(
        reply=reply,
        preset_question=next_q,
        preset_complete=preset_complete,
        answered_count=answered_count,
        total_questions=total_questions,
        conversation=agent.get_session_messages(),
    )


@router.post("/session/freeform", response_model=SessionResponse)
async def freeform_message(req: FreeFormRequest):
    """Send a free-form question after preset questions are completed."""
    key = _session_key(req.student_id, req.lecture_ids[0] if req.lecture_ids else "")
    agent = _active_sessions.get(key)
    if not agent:
        raise HTTPException(404, "No active session. Call /session/start first.")

    reply = await agent.handle_freeform(req.message, req.lecture_ids)

    return SessionResponse(
        reply=reply,
        preset_question=None,
        preset_complete=True,
        conversation=agent.get_session_messages(),
    )


@router.post("/session/end")
async def end_session(req: SessionRequest):
    """End the session and persist conversation to the Student DB."""
    key = _session_key(req.student_id, req.lecture_id)
    agent = _active_sessions.pop(key, None)
    if agent:
        agent.save_session()
        return {"status": "saved", "messages": len(agent.get_session_messages())}
    return {"status": "no_session"}


@router.get("/preset-questions/{lecture_id}")
async def get_preset_questions(lecture_id: str):
    """Get all preset questions for a lecture."""
    questions = student_db.get_preset_questions(lecture_id)
    return {"lecture_id": lecture_id, "questions": questions}


@router.get("/session/current")
async def get_current_question(student_id: str, lecture_id: str):
    """Get the current question state for an active session."""
    key = _session_key(student_id, lecture_id)
    agent = _active_sessions.get(key)
    if not agent:
        raise HTTPException(404, "No active session. Call /session/start first.")
    
    current_q, preset_complete, answered_count, total_questions = agent.get_current_state()
    
    return SessionResponse(
        reply="",  # Empty reply since we're just getting state
        preset_question=current_q,
        preset_complete=preset_complete,
        answered_count=answered_count,
        total_questions=total_questions,
        conversation=[],  # Don't return full conversation for this endpoint
    )
