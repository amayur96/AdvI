"""
AdvI Chat Agent — student-facing interactive chatbot.

Reads from:
  - Student DB  (chat history, preset questions)
  - Faculty DB  (lecture materials)

Conversation flow:
  1. Begin with preset questions for the current lecture
  2. After each answer, engage in follow-up discussion
  3. Once all preset Qs are done, switch to free-form mode
  4. In free-form mode, student picks lecture topics to explore
  5. Session conversation is returned for the caller to persist
"""

from __future__ import annotations

import logging

from openai import AsyncOpenAI

from app.config import OPENAI_API_KEY, OPENAI_MODEL

log = logging.getLogger("advi.agent")
from app.db import student_db, faculty_db
from app.models import ChatMessage, PresetQuestion, LectureMaterial
from .prompts import (
    AGENT_SYSTEM_PROMPT,
    AGENT_LECTURE_CONTEXT_TEMPLATE,
    AGENT_PRESET_INTRO,
    AGENT_PRESET_TRANSITION,
)

_client = AsyncOpenAI(api_key=OPENAI_API_KEY)


def _format_lectures(lectures: list[LectureMaterial]) -> str:
    parts = []
    for lec in lectures:
        parts.append(f"## {lec.title} (ID: {lec.lecture_id})\n{lec.content}")
    return "\n\n".join(parts)


def _build_system_messages(lectures: list[LectureMaterial]) -> list[dict]:
    lecture_block = AGENT_LECTURE_CONTEXT_TEMPLATE.format(
        lectures=_format_lectures(lectures)
    )
    return [
        {"role": "system", "content": AGENT_SYSTEM_PROMPT},
        {"role": "system", "content": lecture_block},
    ]


class ChatAgent:
    """Manages a single student chat session against the OpenAI API."""

    def __init__(self, student_id: str, lecture_id: str) -> None:
        self.student_id = student_id
        self.lecture_id = lecture_id

        self._preset_questions: list[PresetQuestion] = (
            student_db.get_preset_questions(lecture_id)
        )
        self._preset_index = self._compute_starting_index()
        self._session_messages: list[ChatMessage] = []

        lecture = faculty_db.get_lecture(lecture_id)
        self._lectures = [lecture] if lecture else []
        self._system_msgs = _build_system_messages(self._lectures)

    def _refresh_preset_questions(self) -> tuple[bool, int]:
        """
        Refresh preset questions from DB to catch updates.
        Returns (changed, old_count) where changed is True if questions were added/removed.
        """
        old_count = len(self._preset_questions)
        old_questions = {q.id for q in self._preset_questions}
        self._preset_questions = student_db.get_preset_questions(self.lecture_id)
        new_questions = {q.id for q in self._preset_questions}
        new_count = len(self._preset_questions)
        
        changed = old_questions != new_questions or old_count != new_count
        
        # Always recompute starting index to ensure it's correct
        old_index = self._preset_index
        self._preset_index = self._compute_starting_index()
        
        # Ensure index is within bounds
        if self._preset_index > len(self._preset_questions):
            self._preset_index = len(self._preset_questions)
        elif self._preset_index < 0:
            self._preset_index = 0
        
        return changed, old_count

    # --- Public API ---

    async def start_session(self) -> tuple[str, PresetQuestion | None, bool]:
        """
        Initialize a session. Returns the greeting + the first unanswered
        preset question (if any).
        """
        self._refresh_preset_questions()  # Returns (changed, old_count) but we ignore it on start
        if not self._preset_questions:
            greeting = (
                "Hey! It looks like there are no preset questions for this "
                "lecture yet. Feel free to ask me anything about the material!"
            )
            return greeting, None, True

        if self._preset_index >= len(self._preset_questions):
            return AGENT_PRESET_TRANSITION, None, True

        lecture_title = (
            self._lectures[0].title if self._lectures else self.lecture_id
        )
        intro = AGENT_PRESET_INTRO.format(
            lecture_title=lecture_title,
            count=len(self._preset_questions),
        )
        first_q = self._preset_questions[self._preset_index]
        greeting = f"{intro}\n\n**Question {self._preset_index + 1} of {len(self._preset_questions)}:**\n{first_q.question}"

        self._record("assistant", greeting)
        return greeting, first_q, False

    async def handle_message(
        self, user_message: str
    ) -> tuple[str, PresetQuestion | None, bool]:
        """
        Process a student message. Returns (reply, next_question_or_none, preset_complete).
        """
        # Refresh questions before handling to catch any updates
        questions_changed, old_count = self._refresh_preset_questions()
        self._record("user", user_message)

        in_preset = self._preset_index < len(self._preset_questions)

        if in_preset:
            reply = await self._handle_preset_answer(user_message)
            # After answering, _preset_index has been incremented
            # Refresh questions again in case new ones were added while processing
            questions_changed_after, _ = self._refresh_preset_questions()
            if questions_changed_after:
                questions_changed = True
        else:
            # Was in free-form mode, but check if new questions were added
            reply = await self._handle_freeform(user_message)
            # Refresh questions after free-form to catch any new questions
            questions_changed_after, old_count_after = self._refresh_preset_questions()
            if questions_changed_after:
                questions_changed = True
                old_count = old_count_after  # Update old_count for comparison below

        # If questions changed, add a note to inform the student and update the count
        new_questions_added = False
        if questions_changed:
            new_count = len(self._preset_questions)
            if new_count > old_count:
                new_questions_added = True
                # New questions were added
                reply = f"📝 *Note: {new_count - old_count} new question(s) have been added. There are now {new_count} total questions.*\n\n{reply}"
            elif new_count < old_count:
                reply = f"📝 *Note: The question set has been updated ({old_count} → {new_count} questions).*\n\n{reply}"

        self._record("assistant", reply)

        # Recompute preset_complete after handling the answer (index may have changed)
        # If new questions were added and we were done, we're no longer done
        preset_complete = self._preset_index >= len(self._preset_questions)
        next_q = None

        # If new questions were added, always show them (even if we were in free-form mode)
        if new_questions_added and self._preset_index < len(self._preset_questions):
            # New questions available - show the next one
            next_q = self._preset_questions[self._preset_index]
            current_q_num = self._preset_index + 1
            total_q = len(self._preset_questions)
            reply += f"\n\n**Question {current_q_num} of {total_q}:**\n{next_q.question}"
            preset_complete = False
        elif preset_complete and not new_questions_added:
            # All questions answered and no new ones added - show transition
            transition = f"\n\n{AGENT_PRESET_TRANSITION}"
            reply += transition
        elif self._preset_index < len(self._preset_questions):
            # There are more questions - show the next one
            next_q = self._preset_questions[self._preset_index]
            current_q_num = self._preset_index + 1
            total_q = len(self._preset_questions)
            reply += f"\n\n**Question {current_q_num} of {total_q}:**\n{next_q.question}"
            preset_complete = False

        return reply, next_q, preset_complete

    async def handle_freeform(
        self, message: str, lecture_ids: list[str]
    ) -> str:
        """Handle a free-form question grounded in specific lectures."""
        log.info(
            "[ChatAgent:freeform] student=%s  lectures=%s  question=%r",
            self.student_id,
            lecture_ids,
            message,
        )
        extra_lectures = faculty_db.get_lectures(lecture_ids)
        all_lectures = {l.lecture_id: l for l in self._lectures + extra_lectures}
        system_msgs = _build_system_messages(list(all_lectures.values()))

        self._record("user", message)
        reply = await self._call_openai(system_msgs)
        self._record("assistant", reply)
        return reply

    def get_current_state(self) -> tuple[PresetQuestion | None, bool, int, int]:
        """
        Get the current question state without processing a message.
        Returns (current_question, preset_complete, answered_count, total_questions).
        """
        # Refresh questions to get latest state
        self._refresh_preset_questions()
        
        preset_complete = self._preset_index >= len(self._preset_questions)
        current_q = None
        
        if not preset_complete and self._preset_index < len(self._preset_questions):
            current_q = self._preset_questions[self._preset_index]
        
        return current_q, preset_complete, self._preset_index, len(self._preset_questions)

    def get_session_messages(self) -> list[ChatMessage]:
        return list(self._session_messages)

    def save_session(self) -> None:
        """Persist session conversation into the Student DB."""
        student_db.append_messages(self.student_id, self._session_messages)

    # --- Internals ---

    def _compute_starting_index(self) -> int:
        """Resume from where the student left off based on stored responses."""
        record = student_db.get_student(self.student_id)
        answered_ids = set(record.preset_responses.keys())
        for i, q in enumerate(self._preset_questions):
            if q.id not in answered_ids:
                return i
        return len(self._preset_questions)

    async def _handle_preset_answer(self, user_message: str) -> str:
        current_q = self._preset_questions[self._preset_index]

        context_instruction = {
            "role": "system",
            "content": (
                f"The student is answering preset question {self._preset_index + 1}: "
                f'"{current_q.question}" (concept: {current_q.concept}). '
                "Evaluate their answer, give feedback, and if their understanding "
                "seems solid, acknowledge it and move on. If not, ask a brief "
                "follow-up to guide them."
            ),
        }
        custom_system = self._system_msgs + [context_instruction]
        reply = await self._call_openai(custom_system)

        student_db.save_preset_response(
            self.student_id,
            current_q.id,
            [
                ChatMessage(role="user", content=user_message),
                ChatMessage(role="assistant", content=reply),
            ],
        )
        self._preset_index += 1
        return reply

    async def _handle_freeform(self, user_message: str) -> str:
        return await self._call_openai(self._system_msgs)

    async def _call_openai(self, system_msgs: list[dict]) -> str:
        history = [
            {"role": m.role, "content": m.content}
            for m in self._session_messages
        ]
        prior = [
            {"role": m.role, "content": m.content}
            for m in student_db.get_chat_history(self.student_id)[-20:]
        ]

        messages = system_msgs + prior + history

        response = await _client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=messages,
            temperature=0.7,
            max_tokens=1024,
        )
        usage = response.usage
        log.info(
            "[ChatAgent] model=%s  prompt_tokens=%d  completion_tokens=%d  total_tokens=%d",
            response.model,
            usage.prompt_tokens,
            usage.completion_tokens,
            usage.total_tokens,
        )
        return response.choices[0].message.content or ""

    def _record(self, role: str, content: str) -> None:
        self._session_messages.append(ChatMessage(role=role, content=content))
