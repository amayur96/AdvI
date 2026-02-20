# AdvI User Walkthrough Demo (90-120 seconds)

## Demo Setup

### Prerequisites
1. Backend running: `uvicorn app.main:app --reload --port 8000`
2. Student UI: `cd student-web-client && npm run dev` (http://localhost:5173)
3. Faculty UI: `cd faculty-web-client && npm run dev` (http://localhost:5174)
4. Database seeded: `python3 -m app.db.seed`

---

## User Walkthrough Steps

### **Step 1: Student Logs In (5 seconds)**
**Action**: Open Student UI
- Show the clean interface
- Point out: "Student sees their lecture materials and AI tutor ready to go"
- **Highlight**: Activity card shows "0/X Questions" - ready to start

---

### **Step 2: Student Receives First Question (10 seconds)**
**Action**: Look at the chat interface
- **Show**: AI greeting with first preset question
- **Say**: "The AI tutor automatically presents preset questions to check understanding"
- **Point**: Activity card shows "Question 1 of X"
- **Point**: Topbar shows question progress

---

### **Step 3: Student Answers First Question (15 seconds)**
**Action**: Type and send answer
- **Type**: *"Functions allow us to break code into reusable blocks that can be called multiple times. They help avoid repetition and make code more organized."*
- **Click**: Send button
- **Wait**: For AI response (shows feedback)
- **Show**: Activity card updates immediately
  - Progress bar fills
  - Checkmark appears on first question
  - "1/X Questions" updates
- **Say**: "Notice how progress updates instantly"

---

### **Step 4: Student Answers Second Question (15 seconds)**
**Action**: Answer next question
- **Show**: AI presents Question 2 automatically
- **Type**: *"Pass-by-value creates a copy of the argument, so changes don't affect the original variable. Pass-by-reference uses the original variable directly via the address, so changes persist."*
- **Click**: Send
- **Wait**: For AI response
- **Show**: Activity card updates again
  - Second checkmark appears
  - Progress bar continues filling
  - "2/X Questions" updates
- **Say**: "Each answer updates the progress in real-time"

---

### **Step 5: Switch to Faculty View - See Updates (20 seconds)**
**Action**: Switch to Faculty UI window
- **Show**: Faculty dashboard
- **Point**: Critical Concepts section
  - "Faculty can see which concepts students struggle with"
  - Show percentages (e.g., "Functions & Parameters: 45% struggling")
  - **Say**: "These percentages update as students answer questions"
- **Point**: Garmin Analytics
  - "Real-time class metrics"
  - Show comprehension, engagement, questions done percentages
  - **Say**: "All metrics update automatically - no refresh needed"

---

### **Step 6: Faculty Views Student Responses (15 seconds)**
**Action**: Scroll through faculty dashboard
- **Point**: Critical Concepts cards
  - Show struggling percentages
  - **Say**: "Faculty can see exactly which concepts need more attention"
- **Point**: Garmin Analytics donut charts
  - **Say**: "Class-wide comprehension and engagement metrics"
- **Emphasize**: "Everything updates in real-time as students interact"

---

### **Step 7: Faculty Adds a Question (15 seconds)**
**Action**: Click on Suggested Questions section
- **Show**: Suggested Questions interface
- **Say**: "Faculty can add custom questions or use AI-generated ones"
- **Action**: (Optional) Click "Custom Question" button
- **Show**: Question creation interface
- **Say**: "When faculty adds a question, students see it immediately in their chat"

---

### **Step 8: Student Completes Questions - Free-form Mode (15 seconds)**
**Action**: Switch back to Student UI
- **Show**: Final question answered
- **Show**: Activity card shows "X/X Questions" - all done
- **Show**: AI message: "Great work! You can now ask me anything..."
- **Type**: Free-form question: *"Can you explain recursion in more detail?"*
- **Click**: Send
- **Show**: AI provides detailed answer
- **Say**: "After preset questions, students can explore any topic"

---

### **Step 9: Final Faculty View - Updated Analytics (10 seconds)**
**Action**: Switch to Faculty UI
- **Show**: Updated Critical Concepts
  - Percentages have changed based on student responses
- **Show**: Updated Garmin Analytics
  - Comprehension percentage updated
  - Questions done percentage updated
- **Say**: "Faculty can see the final understanding levels and adjust teaching accordingly"

---

## Key User Actions Summary

### Student Journey:
1. ✅ Logs in → Sees AI tutor ready
2. ✅ Receives preset questions automatically
3. ✅ Answers Question 1 → Progress updates
4. ✅ Answers Question 2 → Progress updates
5. ✅ Completes all questions → Enters free-form mode
6. ✅ Asks free-form question → Gets detailed answer

### Faculty Journey:
1. ✅ Views dashboard → Sees real-time analytics
2. ✅ Sees Critical Concepts → Identifies struggling areas
3. ✅ Views Garmin Analytics → Sees class-wide metrics
4. ✅ Can add questions → Students see them immediately
5. ✅ Sees updated analytics → Based on student responses

---

## Timing Breakdown

| Step | Action | Time |
|------|--------|------|
| 1 | Student logs in | 5s |
| 2 | Receives first question | 10s |
| 3 | Answers Question 1 | 15s |
| 4 | Answers Question 2 | 15s |
| 5 | Switch to Faculty - See updates | 20s |
| 6 | Faculty views responses | 15s |
| 7 | Faculty adds question | 15s |
| 8 | Student free-form mode | 15s |
| 9 | Final Faculty view | 10s |
| **Total** | | **120s** |

---

## What Users See Update in Real-Time

### Student Side:
- ✅ Activity Card progress bar
- ✅ Question checkmarks
- ✅ "X/X Questions" counter
- ✅ Chat messages
- ✅ AI responses

### Faculty Side:
- ✅ Critical Concepts percentages
- ✅ Garmin Analytics donut charts
- ✅ Class comprehension metrics
- ✅ Engagement percentages
- ✅ Questions completion rate

---

## Demo Flow Visualization

```
STUDENT VIEW                    FACULTY VIEW
─────────────────               ─────────────────
Login (5s)
  ↓
Q1 Appears (10s)
  ↓
Answer Q1 (15s) ──────────────→ Analytics Update
  ↓                              (20s)
Answer Q2 (15s) ──────────────→ View Updates
  ↓                              (15s)
Complete Questions              Add Question
  ↓                              (15s)
Free-form Mode (15s) ←───────── Final Analytics
                                  (10s)
```

---

## Sample Student Responses (Copy-Paste Ready)

**Question 1 - Functions:**
```
Functions allow us to break code into reusable blocks that can be called multiple times. They help avoid repetition and make code more organized and easier to maintain.
```

**Question 2 - Pass-by-value vs Pass-by-reference:**
```
Pass-by-value creates a copy of the argument, so any changes made inside the function don't affect the original variable. Pass-by-reference uses the original variable directly via its memory address, so changes persist after the function returns.
```

**Question 3 - Function Prototypes (if needed):**
```
Function prototypes declare a function's signature before its definition. They're needed so the compiler knows what parameters and return type to expect, which is especially important in multi-file projects.
```

**Free-form Question:**
```
Can you explain recursion in more detail? How does it work with the call stack?
```

---

## Success Criteria

✅ Student progress updates after each answer
✅ Faculty dashboard shows real-time changes
✅ No page refreshes needed
✅ Smooth user experience
✅ Clear visual feedback at each step
✅ Analytics reflect actual student responses

---

## Troubleshooting During Demo

**If student progress doesn't update:**
- Check backend is processing messages
- Verify `answered_count` is being returned
- Check browser console for errors

**If faculty dashboard doesn't update:**
- Verify analytics endpoint is working
- Check polling is active (5-second intervals)
- Refresh once, then let polling work

**If questions don't appear:**
- Ensure database is seeded
- Check preset questions exist for lecture
- Verify backend is running

---

## Pro Tips

1. **Don't rush** - Let AI responses load naturally
2. **Point to updates** - Draw attention to what's changing
3. **Emphasize "real-time"** - Say it multiple times
4. **Show both sides** - Demonstrate the connection
5. **Use natural language** - Answer questions like a real student would
