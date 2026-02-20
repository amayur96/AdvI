"""
Database seeding script — initializes FacultyDB and StudentDB with hardcoded demo data.
Call this on server startup or manually to populate the databases.
"""

from __future__ import annotations

from datetime import datetime

from app.models import (
    ChatMessage,
    LectureMaterial,
    PresetQuestion,
    StudentRecord,
)
from app.db.store import faculty_db, student_db
from app.config import USE_POSTGRES

if USE_POSTGRES:
    from app.db.models import create_tables


# Hardcoded lecture materials for EECS 183
LECTURES = [
    {
        "lecture_id": "lec1",
        "title": "Intro to C++",
        "content": """Introduction to C++ programming language.

Key Topics:
- History and evolution of C++
- Basic program structure (main function, includes)
- Compilation process
- Hello World example
- Basic I/O (cout, cin)
- Comments and code style
""",
    },
    {
        "lecture_id": "lec2",
        "title": "Variables & Data Types",
        "content": """Variables and data types in C++.

Key Topics:
- Variable declaration and initialization
- Primitive data types (int, float, double, char, bool)
- Type modifiers (unsigned, const)
- Variable naming conventions
- Scope and lifetime basics
""",
    },
    {
        "lecture_id": "lec3",
        "title": "Control Flow",
        "content": """Control flow structures in C++.

Key Topics:
- If/else statements
- Switch statements
- For loops
- While loops
- Do-while loops
- Break and continue
- Nested control structures
""",
    },
    {
        "lecture_id": "lec4",
        "title": "Functions",
        "content": """Functions in C++ — one of the foundational building blocks of structured programming.

Key Topics:

1) Pass-by-Value vs Pass-by-Reference — Pass-by-value copies the argument into the parameter; changes inside the function do not affect the caller. Pass-by-reference (using &) passes the actual variable; modifications inside the function persist after the call. Use const& to avoid copying large objects without allowing mutation.

2) For Loops vs While Loops — A for loop is ideal when the number of iterations is known (initializer, condition, and increment on one line). A while loop is better when the exit condition is not count-based (e.g., reading input until EOF). A do-while loop guarantees at least one execution of the body.

3) Header Files (.h) and Source Files (.cpp) — Header files contain declarations (function prototypes, class definitions, constants). Source files contain implementations. This separation enables separate compilation: changing a .cpp file only requires recompiling that file. Include guards (#ifndef / #define / #endif) or #pragma once prevent double inclusion.

4) Function Prototypes — Declaring a function's signature before its definition allows the compiler to check calls before seeing the full implementation. Prototypes typically go in header files.

5) Scope and Lifetime — Local variables exist only within their enclosing block. Parameters are local to the function. Global variables are accessible everywhere but should be avoided. Static local variables persist across calls.

6) Default Arguments — C++ allows default parameter values (e.g., void print(int x, int base = 10)). Defaults must be specified from right to left and are typically declared in the header file.
""",
    },
    {
        "lecture_id": "lec5",
        "title": "Arrays & Strings",
        "content": """Arrays and strings in C++.

Key Topics:
- Array declaration and initialization
- Array indexing and bounds
- C-style strings (char arrays)
- String manipulation
- Multi-dimensional arrays
- Array limitations and alternatives
""",
    },
    {
        "lecture_id": "lec6",
        "title": "Pointers & References",
        "content": """Pointers and references in C++.

Key Topics:
- Pointer declaration and initialization
- Address-of operator (&)
- Dereferencing operator (*)
- Pointer arithmetic
- References vs pointers
- Null pointers and safety
""",
    },
]

# Hardcoded preset questions for Lecture 4 (Functions)
PRESET_QUESTIONS_LEC4 = [
    PresetQuestion(
        id="q1",
        lecture_id="lec4",
        question="What is the difference between pass-by-value and pass-by-reference in C++? When would you use each?",
        concept="Functions & Parameters",
    ),
    PresetQuestion(
        id="q2",
        lecture_id="lec4",
        question="Explain how a for loop differs from a while loop, and when you'd pick one over the other.",
        concept="Control Flow",
    ),
    PresetQuestion(
        id="q3",
        lecture_id="lec4",
        question="What is the purpose of a header file (.h) and how does it relate to the .cpp file?",
        concept="File Organization",
    ),
]

# Hardcoded student responses for demo (2 out of 3 questions answered)
STUDENT_RESPONSES = {
    "q1": [
        ChatMessage(
            role="user",
            content="Pass-by-value copies the argument so changes inside the function don't affect the original. Pass-by-reference uses & and modifies the original variable directly. I'd use const& for large objects I don't want to modify.",
            timestamp=datetime.utcnow(),
        ),
        ChatMessage(
            role="assistant",
            content="Great answer! You've got the core idea down. One thing to add — pass-by-reference also avoids copying large objects, which can be important for performance. Can you think of a situation where you'd use const& instead of just &?",
            timestamp=datetime.utcnow(),
        ),
    ],
    "q2": [
        ChatMessage(
            role="user",
            content="A for loop is best when you know the iteration count — initializer, condition, and increment are all in one line. A while loop is better for unknown iterations, like reading until EOF. There's also do-while which runs at least once.",
            timestamp=datetime.utcnow(),
        ),
        ChatMessage(
            role="assistant",
            content="Spot on! And there's also do-while, which guarantees the body runs at least once since the condition is checked after each iteration. A classic use case is menu-driven programs where you always want to show the menu at least once. Does that distinction make sense?",
            timestamp=datetime.utcnow(),
        ),
    ],
}


def seed_databases() -> None:
    """Initialize both databases with hardcoded demo data."""
    # Create tables if using PostgreSQL
    if USE_POSTGRES:
        create_tables()
    
    # Seed FacultyDB with lectures
    for lecture_data in LECTURES:
        lecture = LectureMaterial(
            lecture_id=lecture_data["lecture_id"],
            title=lecture_data["title"],
            content=lecture_data["content"],
        )
        faculty_db.upsert_lecture(lecture)

    # Seed StudentDB with preset questions for Lecture 4
    student_db.set_preset_questions("lec4", PRESET_QUESTIONS_LEC4)
    
    # Get the actual questions that were saved (they may have different IDs if saved via faculty UI)
    saved_questions = student_db.get_preset_questions("lec4")
    
    # Seed student "alex" with pre-answered questions (2 out of 3) for demo
    if not USE_POSTGRES:
        student_record = student_db.get_student("alex")
        student_record.name = "Alex Johnson"
        # Map responses to actual question IDs
        responses_dict = {}
        for i, q_id in enumerate(["q1", "q2"]):
            if i < len(saved_questions):
                responses_dict[saved_questions[i].id] = STUDENT_RESPONSES[q_id]
        student_record.preset_responses = responses_dict
    else:
        # For PostgreSQL, save preset responses using actual question IDs
        from app.db.postgres_store import StudentDBPostgres
        if isinstance(student_db, StudentDBPostgres):
            # Pre-answer first 2 questions if they exist
            for i in range(min(2, len(saved_questions))):
                q_id = saved_questions[i].id
                # Map to response by index (q1 -> first question, q2 -> second question)
                response_key = f"q{i+1}"
                if response_key in STUDENT_RESPONSES:
                    student_db.save_preset_response("alex", q_id, STUDENT_RESPONSES[response_key])

    print("✅ Databases seeded successfully!")
    print(f"   - {len(LECTURES)} lectures added to FacultyDB")
    print(f"   - {len(PRESET_QUESTIONS_LEC4)} preset questions added for lec4")
    print(f"   - Student 'alex' has {len(STUDENT_RESPONSES)} pre-answered questions")


if __name__ == "__main__":
    seed_databases()
