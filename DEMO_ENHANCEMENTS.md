# Demo Enhancements - Dynamic Updates

## Overview
The faculty dashboard now updates dynamically based on student chat interactions, making the demo more realistic and engaging.

---

## What Updates Dynamically

### 1. **Class Analytics (GarminAnalytics Component)**
All metrics update based on student responses:

- **Comprehension**: Average of concept mastery percentages
  - Updates as students answer questions
  - Range: 0-100%

- **Questions Done**: Percentage of questions with at least one response
  - Increases as students answer questions
  - Baseline: 33% (1/3 done) if no responses yet

- **Engagement**: Based on total number of responses
  - 0 responses = 50%
  - 1-3 responses = 55-65%
  - 4-6 responses = 65-75%
  - 7+ responses = 75-85%

- **Active Students**: Number of unique students who responded
  - Minimum: 3 (for demo)
  - Increases with actual responses

- **AI Convos**: Estimated conversations
  - Baseline: 150
  - Increases by 3 per response

- **Avg Score**: Same as comprehension percentage

### 2. **Critical Concepts**
Percentages update based on student response quality:

- **Baseline Percentages** (starting point):
  - Functions & Parameters: 45%
  - Control Flow: 35%
  - File Organization: 52%

- **Dynamic Updates**:
  - Increases when students struggle (struggling responses)
  - Decreases when students do well (strong responses)
  - Blends baseline with actual data:
    - Few responses (<3): 80% baseline, 20% actual
    - Medium responses (3-5): 60% baseline, 40% actual
    - More responses (5-10): 40% baseline, 60% actual
    - Many responses (10+): 20% baseline, 80% actual

- **Bounds**: Always stays between 20% and 80% for realistic demo

### 3. **Lecture Feedback (AI Insights)**
New insights appear automatically when students answer questions:

- **Appears when**: Student responses exist
- **Source**: LLM-generated insights from `LLMApi.generate_insights()`
- **Format**: 
  - Tag (Pacing/Coverage/Structure/Improvement)
  - Title (from recommendation)
  - Summary text
- **Animation**: Cards fade in one by one with delay
- **Limit**: Up to 3 insights displayed

### 4. **Response Breakdown**
Shows actual student response distributions:

- **Strong** (green): Correct answers
- **Partial** (amber): Partial understanding
- **Struggling** (red): Incorrect/confused answers

Updates based on actual response quality analysis.

---

## How It Works

### Backend (`app/analytics.py`)
1. Fetches all preset questions for the lecture
2. Gets all student responses from database
3. Analyzes response quality (strong/partial/struggling)
4. Calculates:
   - Concept mastery percentages
   - Critical concepts struggling percentages
   - Class analytics metrics
   - Generates AI insights via LLM
5. Returns all data to frontend

### Frontend (`faculty-web-client/src/App.jsx`)
1. Polls analytics endpoint every 5 seconds
2. Updates state with new data
3. Passes data to components:
   - `GarminAnalytics`: Class metrics, question responses, lecture feedback
   - `CriticalInfo`: Critical concepts with struggling percentages

### Components
- **GarminAnalytics**: Displays dynamic donut charts, pulse stats, and lecture feedback
- **CriticalInfo**: Shows critical concepts with percentages that update

---

## Demo Flow

### Initial State (No Student Responses)
- Comprehension: ~61% (baseline)
- Questions Done: 33% (1/3 baseline)
- Engagement: 50%
- Critical Concepts: Baseline percentages (45%, 35%, 52%)
- Lecture Feedback: Empty ("AI insights will appear...")

### After Student Answers Question 1
- Comprehension: Updates based on response quality
- Questions Done: Increases (e.g., 33% → 50% if 1/2 questions)
- Engagement: Increases (e.g., 50% → 55%)
- AI Convos: Increases (150 → 153)
- Critical Concepts: Percentages adjust based on response
- Lecture Feedback: May show first insight if response indicates struggle

### After Student Answers Question 2
- All metrics continue updating
- More insights may appear in Lecture Feedback
- Critical Concepts percentages refine further

### After Multiple Responses
- Metrics stabilize around actual student performance
- Multiple insights appear in Lecture Feedback
- Critical Concepts show realistic struggling patterns

---

## Key Features for Demo

✅ **Real-time Updates**: No page refresh needed - updates every 5 seconds
✅ **Realistic Baselines**: Starts with believable percentages, not 0%
✅ **Dynamic Adjustments**: Numbers increase/decrease based on actual responses
✅ **AI Insights**: New insights appear automatically as students interact
✅ **Smooth Animations**: Donut charts animate, insights fade in
✅ **Demo-Friendly**: Works well even with limited student responses

---

## Testing the Demo

1. **Start Backend**: `uvicorn app.main:app --reload --port 8000`
2. **Start Faculty UI**: `cd faculty-web-client && npm run dev`
3. **Start Student UI**: `cd student-web-client && npm run dev`
4. **Open Faculty Dashboard**: Should show baseline metrics
5. **Answer Questions as Student**: Watch metrics update in real-time
6. **Check Lecture Feedback**: Insights should appear after responses

---

## Expected Behavior

- **Metrics increase** when students answer questions
- **Critical Concepts** adjust based on response quality
- **Lecture Feedback** shows insights after student interactions
- **All updates happen automatically** without page refresh
- **Numbers stay realistic** (within reasonable bounds)
