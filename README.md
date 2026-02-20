# AdvI – AI Learning Intelligence System

AdvI is a two-sided AI learning platform that connects **students** and **faculty** through a continuous feedback loop. Students learn with an AI study agent, faculty monitor learning gaps in real time, and both experiences stay synchronized through shared analytics and lecture-grounded intelligence.

## Overview

AdvI is organized into three layers:

- **Frontend Layer (UI):**
  - **Student UI** for AI-guided learning conversations.
  - **Faculty UI** for analytics, interventions, and question design.
- **Intelligence Layer:**
  - **AI Agent** drives student tutoring by checking preset-question progress and past conversation context.
  - **LLM API** powers faculty insights by matching lecture concepts to student responses.
- **Data Layer:**
  - **Student DB** stores sessions, preset responses, and progression state.
  - **Faculty DB** stores lecture materials and instructional context.

Together these layers support three flows:

- **Student flow:** student asks/answers → AI Agent checks progress + context → responses are stored in Student DB.
- **Faculty flow:** faculty updates lecture goals/materials → LLM analyzes student evidence → faculty sees insights and suggested actions.
- **Closed-loop flow:** faculty adjustments influence future student guidance; new student responses refresh faculty analytics continuously.

## Repository Structure

```
AdvI/
├── app/                       Python backend – FastAPI + OpenAI
│   ├── agent/                 AI Agent (chatbot) + LLM API (faculty analytics)
│   ├── db/                    In-memory Student DB + Faculty DB
│   ├── models/                Pydantic schemas
│   ├── routes/                API endpoints (student + faculty)
│   └── main.py                FastAPI entry point
├── shared-styles/             Shared design tokens, CSS vars, Tailwind theme
├── faculty-web-client/        React app – Faculty Dashboard
├── student-web-client/        React app – Student AI Agent
├── faculty-wireframe.html     Static wireframe – Faculty UI
├── student-wireframe.html     Static wireframe – Student AI Agent UI
├── package.json               npm workspaces root
└── README.md                  ← You are here
```

## Quick Start

### Frontend

This project uses **npm workspaces**. Install all dependencies from the root:

```bash
npm install
```

This links the shared `@advi/shared-styles` package into both apps automatically.

Then start whichever app you need:

```bash
# Faculty dashboard
cd faculty-web-client && npm run dev

# Student AI agent
cd student-web-client && npm run dev
```

### Backend

```bash
cd app
pip install -r requirements.txt
cp .env.example .env          # add your OpenAI API key
uvicorn app.main:app --reload --port 8000
```

API docs available at **http://localhost:8000/docs**

## Modules

### Shared Styles (`shared-styles/`)

Centralized design system consumed by both web clients. Published as `@advi/shared-styles` via npm workspaces.

| File | Purpose | Consumer |
|---|---|---|
| `tokens.js` | JS design tokens (colors, fonts, shadows) | Any JS/TS code |
| `variables.css` | CSS custom properties (`:root` vars) | Faculty app (plain CSS) |
| `tailwind-theme.css` | Tailwind v4 `@theme` block | Student app (Tailwind) |
| `base.css` | Reset, font import, global base styles | Both apps |
| `animations.css` | Shared keyframes (typing, modal, fade) | Both apps |

**Usage in a Tailwind app:**

```css
@import "tailwindcss";
@import "@advi/shared-styles/tailwind-theme.css";
@import "@advi/shared-styles/animations.css";
```

**Usage in a plain CSS app:**

```css
@import "@advi/shared-styles/variables.css";
@import "@advi/shared-styles/base.css";
@import "@advi/shared-styles/animations.css";
```

### Backend API (`app/`)

FastAPI + OpenAI backend with two core components:

- **`agent/chat_agent.py`** — Student-facing AI chatbot. Guides students through preset questions with Socratic follow-ups, then supports free-form lecture exploration. Reads from both databases, calls OpenAI for responses.
- **`agent/llm_api.py`** — Faculty-facing analytics engine. Analyzes all student conversations against lecture material to produce per-concept insights and auto-generate preset questions.

| Endpoint | Method | Description |
|---|---|---|
| `/api/student/session/start` | POST | Start a chat session (returns greeting + first preset Q) |
| `/api/student/session/message` | POST | Send a student message during preset Q&A |
| `/api/student/session/freeform` | POST | Free-form question after preset Qs complete |
| `/api/student/session/end` | POST | End session, persist conversation to Student DB |
| `/api/faculty/lectures` | POST | Upload lecture materials |
| `/api/faculty/lectures` | GET | List all lectures |
| `/api/faculty/insights/{id}` | GET | Generate AI insights + preset questions |
| `/api/faculty/questions/generate` | POST | Generate & save preset questions |

```bash
cd app
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8000
```

### Faculty Dashboard (`faculty-web-client/`)

React + Vite application providing instructors with student comprehension analytics, critical concept tracking, suggested questions, and AI-powered dive-deep insights.

```bash
cd faculty-web-client
npm run dev
```

Opens at **http://localhost:5173**

### Student AI Agent (`student-web-client/`)

React + Vite + **Tailwind CSS** application with a bento-grid dashboard UI in **maize and blue**. Features an interactive AI study agent chat, preset question progress tracker, confidence metrics, key concepts, session stats, and lecture topic explorer.

```bash
cd student-web-client
npm run dev
```

Opens at **http://localhost:5174** (or next available port)

### Static Wireframes

Open directly in any browser — no build step needed:

```bash
open faculty-wireframe.html
open student-wireframe.html
```

## System Architecture

The architecture follows a layered model with role-specific flows:

| Layer | Components | Responsibility |
|---|---|---|
| **Frontend Layer** | Student UI, Faculty UI | Collect student/faculty interactions and display learning state |
| **Intelligence Layer** | AI Agent, LLM API | Personalize student tutoring and generate faculty-facing insights |
| **Data Layer** | Student DB, Faculty DB | Persist student evidence and lecture context for analysis |

### Flow breakdown

1. **Student flow**
   - Student interacts with the Student UI.
   - AI Agent checks preset-question completion and prior conversation memory.
   - Student answers and messages are stored in Student DB.

2. **Faculty flow**
   - Faculty uses Faculty UI to review progress and manage lecture context.
   - LLM API maps student performance to lecture concepts from Faculty DB.
   - Faculty receives targeted insight cards, concept-risk signals, and suggested interventions.

3. **Closed-loop flow**
   - Faculty interventions (new questions, emphasis changes, concept focus) feed back into student guidance.
   - New student responses are re-analyzed and reflected in faculty analytics, creating a continuous improvement loop.

## Prerequisites

- [Python](https://www.python.org/) 3.11+ (for backend)
- [Node.js](https://nodejs.org/) v18+ (for React modules)
- npm (included with Node.js)
- An [OpenAI API key](https://platform.openai.com/api-keys) (for backend)
- A modern web browser (for static wireframes)
