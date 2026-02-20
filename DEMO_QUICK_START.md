# Quick Demo Start Guide

## 1. Start Everything (2 minutes)

### Terminal 1 - Backend
```bash
cd /Users/arjunmayur/Documents/AdvI
uvicorn app.main:app --reload --port 8000
```

### Terminal 2 - Student UI
```bash
cd student-web-client
npm run dev
# Opens: http://localhost:5173
```

### Terminal 3 - Faculty UI
```bash
cd faculty-web-client
npm run dev
# Opens: http://localhost:5174
```

### Terminal 4 - Seed Database (if needed)
```bash
cd /Users/arjunmayur/Documents/AdvI
python3 -m app.db.seed
```

---

## 2. Open Browser Windows

- **Window 1**: Student UI → http://localhost:5173
- **Window 2**: Faculty UI → http://localhost:5174
- Arrange side-by-side for demo

---

## 3. Demo Sequence (90 seconds)

### 0:00-0:10 - Introduction
- Show both windows
- Explain: "Faculty dashboard + Student AI tutor"

### 0:10-0:50 - Student Side
1. Show chat greeting with preset questions
2. Answer Question 1: *"Functions break code into reusable blocks"*
3. **Wait for response** → Point to Activity Card updating
4. Answer Question 2: *"Pass-by-value copies, pass-by-reference uses original"*
5. **Wait for response** → Show progress updating

### 0:50-1:20 - Faculty Side
1. Switch to Faculty window
2. Point to Critical Concepts (showing struggling percentages)
3. Point to Garmin Analytics (live metrics)
4. **Emphasize**: "Updates automatically, no refresh needed"
5. Show Suggested Questions section

### 1:20-1:30 - Closing
- Switch back to Student
- Show free-form mode (if questions done)
- Final summary: "Real-time insights for faculty, personalized learning for students"

---

## 4. Key Things to Say

✅ **"Notice how it updates automatically"** (when showing faculty dashboard)
✅ **"The AI provides personalized feedback"** (when showing student responses)
✅ **"Faculty can see exactly where students struggle"** (when showing Critical Concepts)
✅ **"Changes sync in real-time"** (when switching between windows)

---

## 5. What to Avoid

❌ Don't refresh pages during demo (defeats "real-time" message)
❌ Don't rush through responses (let AI responses load)
❌ Don't click around randomly (follow the script)
❌ Don't apologize for loading times (they're normal)

---

## 6. If Something Breaks

**Backend not responding?**
- Check Terminal 1 for errors
- Restart: `uvicorn app.main:app --reload --port 8000`

**Updates not showing?**
- Check browser console (F12) for errors
- Verify backend is running
- Refresh once, then let polling work

**No preset questions?**
- Run: `python3 -m app.db.seed`
- Refresh student page

---

## 7. Pre-Demo Verification

Before starting, verify:
- [ ] Backend shows "Application startup complete"
- [ ] Student UI loads with chat interface
- [ ] Faculty UI shows Critical Concepts and Analytics
- [ ] At least 2-3 preset questions exist in database
- [ ] Both UIs show "Online" status (not "Offline demo")

---

## 8. Sample Student Responses (Quick Copy-Paste)

**Question 1 (Functions):**
```
Functions allow us to break code into reusable blocks that can be called multiple times. They help avoid repetition and make code more organized.
```

**Question 2 (Pass-by-value vs Pass-by-reference):**
```
Pass-by-value creates a copy of the argument, so changes don't affect the original. Pass-by-reference uses the original variable directly, so changes persist.
```

**Question 3 (if needed):**
```
Function prototypes declare a function's signature before its definition. They're needed so the compiler knows what to expect, especially in multi-file projects.
```

---

## 9. Demo Flow Diagram

```
START
  ↓
Show Both Windows (10s)
  ↓
Student: Answer Q1 → Show Progress (15s)
  ↓
Student: Answer Q2 → Show Progress (15s)
  ↓
Faculty: Show Dashboard Updates (30s)
  ↓
Faculty: Show Analytics & Questions (10s)
  ↓
Student: Show Free-form Mode (10s)
  ↓
END (90-120s total)
```

---

## 10. Success Indicators

✅ Faculty dashboard percentages change as student answers
✅ Student Activity Card updates after each answer
✅ No page refreshes needed
✅ Smooth transitions between windows
✅ AI responses are relevant and helpful
