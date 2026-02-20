# AdvI Demo Script (90-120 seconds)

## Pre-Demo Setup

### 1. Start Backend
```bash
cd /Users/arjunmayur/Documents/AdvI
uvicorn app.main:app --reload --port 8000
```

### 2. Start Student UI (Terminal 1)
```bash
cd student-web-client
npm run dev
# Usually runs on http://localhost:5173
```

### 3. Start Faculty UI (Terminal 2)
```bash
cd faculty-web-client
npm run dev
# Usually runs on http://localhost:5174
```

### 4. Ensure Database is Seeded
```bash
python3 -m app.db.seed
```

### 5. Open Two Browser Windows
- **Window 1**: Student UI (http://localhost:5173)
- **Window 2**: Faculty UI (http://localhost:5174)

---

## Demo Flow (90-120 seconds)

### **Opening (10 seconds)**
**"AdvI is an AI-powered learning platform that helps faculty understand student comprehension in real-time."**

- Show both windows side-by-side
- Point to Faculty Dashboard: "Faculty get live analytics"
- Point to Student UI: "Students interact with an AI tutor"

---

### **Part 1: Student Interaction (30-40 seconds)**

**"Let me show you how a student interacts with the system."**

1. **Switch to Student Window**
   - Point to chat: "The AI tutor greets students with preset questions"
   - Show the Activity Card: "Students see their progress in real-time"

2. **Answer First Question (15 seconds)**
   - Type a response like: *"Functions allow us to break code into reusable blocks that can be called multiple times."*
   - Click send
   - **Wait for AI response** (shows feedback)
   - Point to Activity Card: "Notice the progress updates immediately"

3. **Answer Second Question (15 seconds)**
   - Type: *"Pass-by-value creates a copy, pass-by-reference uses the original variable directly."*
   - Click send
   - **Wait for AI response**
   - Point to Topbar/Activity: "Progress continues to update"

---

### **Part 2: Faculty Dashboard Updates (30-40 seconds)**

**"Now watch what happens on the faculty side."**

1. **Switch to Faculty Window**
   - Point to Critical Concepts: "Faculty see which concepts students struggle with"
   - Point to Garmin Analytics: "Real-time class analytics"
   - **Highlight**: "Notice the percentages are updating based on student responses"

2. **Show Dynamic Updates**
   - Point to Critical Concepts: "As students answer, struggling percentages adjust"
   - Point to Garmin Analytics: "Class comprehension, engagement metrics update live"
   - **Say**: "This happens automatically - no refresh needed"

3. **Show Suggested Questions**
   - Click on Suggested Questions section
   - **Say**: "Faculty can add custom questions or use AI-generated ones"
   - **Highlight**: "When new questions are added, students see them immediately"

---

### **Part 3: Real-Time Synchronization (20-30 seconds)**

**"The system updates in real-time across both interfaces."**

1. **Switch back to Student Window**
   - Show Activity Card: "Student progress is tracked"
   - **Say**: "If faculty adds a new question, it appears here automatically"

2. **Show Free-form Mode**
   - Complete remaining questions (or show that preset questions are done)
   - **Say**: "After preset questions, students can ask anything"
   - Type a free-form question: *"Can you explain recursion?"*
   - Show AI response

3. **Final Faculty View**
   - Switch to Faculty Window
   - Point to Critical Concepts: "Final struggling percentages"
   - **Say**: "Faculty can see exactly where students need help"

---

### **Closing (10 seconds)**
**"AdvI provides real-time insights into student learning, helping faculty identify struggling concepts and adjust their teaching accordingly. The AI tutor personalizes the learning experience for each student."**

---

## Key Talking Points to Emphasize

1. **Real-Time Updates**: "Notice how the dashboard updates automatically - no page refresh needed"
2. **Dynamic Analytics**: "Percentages adjust based on actual student responses"
3. **Synchronization**: "Changes on one side immediately reflect on the other"
4. **AI-Powered**: "The AI tutor provides personalized feedback"
5. **Actionable Insights**: "Faculty can see exactly which concepts need more attention"

---

## Troubleshooting Tips

### If updates don't appear:
- Check that backend is running and polling is working (5-second intervals)
- Refresh faculty page once to ensure analytics are loading
- Check browser console for errors

### If student progress doesn't update:
- Ensure backend is processing messages correctly
- Check that `answered_count` is being returned in API responses
- Verify database has preset questions seeded

### To make it look more realistic:
- Have multiple preset questions ready (3-4 questions)
- Ensure baseline percentages are set (not starting at 0%)
- Let the demo run naturally - don't rush through responses

---

## Quick Demo Checklist

- [ ] Backend running on port 8000
- [ ] Student UI running
- [ ] Faculty UI running
- [ ] Database seeded with preset questions
- [ ] Both browser windows open side-by-side
- [ ] Student logged in as "alex" for lecture "lec4"
- [ ] Faculty dashboard showing analytics for "lec4"

---

## Timing Breakdown

- **Opening**: 10 seconds
- **Student Interaction**: 30-40 seconds
- **Faculty Dashboard**: 30-40 seconds
- **Synchronization Demo**: 20-30 seconds
- **Closing**: 10 seconds
- **Total**: 100-130 seconds (fits 90-120 sec target with buffer)
