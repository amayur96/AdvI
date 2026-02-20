# AdvI – Student AI Agent

Student-facing bento dashboard for the AdvI platform (2026 AI Hackathon – "The Future of Education"). An interactive AI study agent with a card-based dashboard UI inspired by modern fintech design, built with React, Vite, and Tailwind CSS in maize and blue.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (included with Node.js)

## Getting Started

```bash
cd student-web-client
npm install
npm run dev
```

The app will be available at **http://localhost:5173** (or the next available port).

## Production Build

```bash
npm run build
npm run preview
```

## Tech Stack

- **React 19** via Vite
- **Tailwind CSS v4** with custom maize/blue theme
- No external component libraries — fully custom UI

## Project Structure

```
src/
├── components/
│   ├── Topbar.jsx               – Brand, search, avatar (top bar)
│   ├── HeroRow.jsx              – Date, CTA button, greeting
│   ├── ChatCard.jsx             – Main AI chat (messages, input, typing)
│   ├── PresetProgressCard.jsx   – Circular progress + question checklist
│   ├── SessionStatsCard.jsx     – Message count, duration, grade
│   ├── ConfidenceCard.jsx       – Dark card with ring + per-concept bars
│   ├── KeyConceptsCard.jsx      – Concept list with status badges
│   ├── LectureInfoCard.jsx      – Current lecture context
│   ├── LectureTopicsCard.jsx    – Free-form lecture picker + trend chart
│   └── ActivityCard.jsx         – Timeline of question completions
├── data/
│   └── mockData.js              – Centralized mock data (swap for API later)
├── styles/
│   └── global.css               – Tailwind directives + custom animations
├── App.jsx                      – Bento grid layout + chat state
└── main.jsx                     – React entry point
```
