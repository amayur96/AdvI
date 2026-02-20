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

export async function startSession(studentId, lectureId) {
  return post("/student/session/start", {
    student_id: studentId,
    lecture_id: lectureId,
  });
}

export async function sendMessage(studentId, lectureId, message) {
  return post("/student/session/message", {
    student_id: studentId,
    lecture_id: lectureId,
    message,
  });
}

export async function sendFreeform(studentId, lectureIds, message) {
  return post("/student/session/freeform", {
    student_id: studentId,
    lecture_ids: lectureIds,
    message,
  });
}

export async function endSession(studentId, lectureId) {
  return post("/student/session/end", {
    student_id: studentId,
    lecture_id: lectureId,
  });
}

export async function uploadLecture(lectureId, title, content) {
  return post("/faculty/lectures", {
    lecture_id: lectureId,
    title,
    content,
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

export async function getPresetQuestions(lectureId) {
  return get(`/student/preset-questions/${lectureId}`);
}

export async function getCurrentQuestion(studentId, lectureId) {
  return get(`/student/session/current?student_id=${studentId}&lecture_id=${lectureId}`);
}
