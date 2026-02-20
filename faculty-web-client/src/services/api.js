const BASE = "http://localhost:8000/api";

async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `API error ${res.status}`);
  }
  return res.json();
}

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `API error ${res.status}`);
  }
  return res.json();
}

export async function submitPresetQuestions(lectureId, questions) {
  return post("/faculty/questions/submit", {
    lecture_id: lectureId,
    questions: questions.map((q) => ({
      question: q.q || q.question,
      concept: q.tag || q.concept || "",
    })),
  });
}

export async function generateQuestions(lectureId, count = 3) {
  return post("/faculty/questions/generate", {
    lecture_id: lectureId,
    count,
  });
}

export async function getLectures() {
  return get("/faculty/lectures");
}

export async function getAnalytics(lectureId) {
  return get(`/faculty/analytics/${lectureId}`);
}

export async function getInsights(lectureId) {
  return get(`/faculty/insights/${lectureId}`);
}
