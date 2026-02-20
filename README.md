# AdvI – The Future of Education

An AI-powered platform that improves classroom quality for both **students** and **faculty** while keeping education human-centered, fair, transparent, and trustworthy. Built for the 2026 AI Hackathon.

## Overview

AdvI connects two sides of the classroom through AI:

- **Students** interact with an AI study agent that guides them through preset comprehension questions and free-form lecture exploration.
- **Faculty** get a real-time dashboard showing which concepts students are struggling with, AI-generated assessment questions, and deep-dive insights into learning gaps.

## Repository Structure

```
AdvI/
├── shared-styles/             Shared design tokens, CSS vars, Tailwind theme
├── faculty-web-client/        React app – Faculty Dashboard
├── student-web-client/        React app – Student AI Agent
├── faculty-wireframe.html     Static wireframe – Faculty UI
├── student-wireframe.html     Static wireframe – Student AI Agent UI
├── package.json               npm workspaces root
└── README.md                  ← You are here
```

## Quick Start

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

The platform consists of four core backend components:

| Component | Role |
|---|---|
| **AI Agent** | Chatbot that interacts with students — guides them through preset questions then free-form discussion |
| **Student Database** | Stores chat histories, preset question responses, and interaction data |
| **Faculty Database** | Stores lecture notes and materials imported from Canvas |
| **LLM API** | Analyzes student + faculty data to generate insights and suggested questions |

**Data flow:**

1. Faculty upload lecture materials → stored in Faculty Database
2. LLM API reads Faculty Database + Student Database → generates preset questions (written to Student Database) and faculty insights (displayed in Faculty UI)
3. Student opens AI Agent → agent prompts with preset questions from Student Database, grounded in lecture content from Faculty Database
4. Student completes preset questions → enters free-form mode to explore specific lectures
5. Session ends → full conversation saved to Student Database for future context

## Prerequisites

- [Node.js](https://nodejs.org/) v18+ (for React modules)
- npm (included with Node.js)
- A modern web browser (for static wireframes)
