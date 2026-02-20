export const lectures = [
  { id: 1, title: "Intro to C++" },
  { id: 2, title: "Variables & Data Types" },
  { id: 3, title: "Control Flow" },
  { id: 4, title: "Functions" },
  { id: 5, title: "Arrays & Strings" },
  { id: 6, title: "Pointers & References" },
];

export const materials = [
  { name: "Lecture_1_Intro_Slides.pdf", type: "pdf", date: "Jan 15", size: "4.2 MB", course: "EECS 183" },
  { name: "Lecture_2_Variables_Slides.pdf", type: "pdf", date: "Jan 22", size: "3.9 MB", course: "EECS 183" },
  { name: "Lecture_3_ControlFlow_Notes.pptx", type: "ppt", date: "Jan 29", size: "5.8 MB", course: "EECS 183" },
  { name: "Lecture_4_Functions_Slides.pdf", type: "pdf", date: "Feb 5", size: "3.8 MB", course: "EECS 183" },
  { name: "Lab_4_Instructions.docx", type: "doc", date: "Feb 6", size: "1.1 MB", course: "EECS 183" },
  { name: "Functions_Notes.pptx", type: "ppt", date: "Feb 5", size: "6.2 MB", course: "EECS 183" },
  { name: "Practice_Problems_Set1.pdf", type: "pdf", date: "Feb 7", size: "2.3 MB", course: "EECS 183" },
  { name: "Lecture_5_Arrays_Slides.pdf", type: "pdf", date: "Feb 12", size: "4.1 MB", course: "EECS 183" },
  { name: "Midterm_Study_Guide.pdf", type: "pdf", date: "Feb 10", size: "5.2 MB", course: "EECS 183" },
  { name: "Lab_5_Instructions.docx", type: "doc", date: "Feb 13", size: "1.4 MB", course: "EECS 183" },
];

export const criticalConcepts = [
  {
    id: "passbyref",
    concept: "Pass-by-Reference vs Pass-by-Value",
    pct: 72,
    desc: "Students struggle to understand when to use pass-by-reference (&) versus pass-by-value, and the implications for modifying original variables.",
    severity: 700,
  },
  {
    id: "headerfiles",
    concept: "Header Files (.h) and Source Files (.cpp)",
    pct: 58,
    desc: "Many students are confused about the separation of declarations in header files versus implementations in source files, and how #include works.",
    severity: 600,
  },
  {
    id: "loops",
    concept: "For Loops vs While Loops",
    pct: 42,
    desc: "Students have difficulty choosing between for loops and while loops, and understanding when do-while loops are appropriate.",
    severity: 400,
  },
  {
    id: "scope",
    concept: "Variable Scope and Lifetime",
    pct: 35,
    desc: "A subset of students struggle with understanding local vs global scope, and how variable lifetime relates to function calls.",
    severity: 300,
  },
];

export const questionSets = [
  [
    { q: "What is the difference between pass-by-value and pass-by-reference in C++? When would you use each?", tag: "Functions & Parameters" },
    { q: "Explain how a for loop differs from a while loop, and when you'd pick one over the other.", tag: "Control Flow" },
    { q: "What is the purpose of a header file (.h) and how does it relate to the .cpp file?", tag: "File Organization" },
  ],
  [
    { q: "When would you use const& instead of just & for a function parameter? Provide an example.", tag: "Functions & Parameters" },
    { q: "Explain the difference between a for loop, while loop, and do-while loop with concrete examples.", tag: "Control Flow" },
    { q: "What are include guards and why are they necessary in header files?", tag: "File Organization" },
  ],
  [
    { q: "Write a function that swaps two integers using pass-by-reference. Explain why pass-by-value wouldn't work.", tag: "Functions & Parameters" },
    { q: "When should you use a do-while loop instead of a regular while loop?", tag: "Control Flow" },
    { q: "Explain the compilation process: how does the compiler use header files and source files together?", tag: "File Organization" },
  ],
];

export const diveDeepData = {
  passbyref: [
    { title: "Root Cause", text: 'Students conflate "copying values" with "passing references." 65% of struggling students incorrectly stated that pass-by-value modifies the original variable when the function changes the parameter.' },
    { title: "Conversation Pattern", text: "When asked follow-up questions, students could not explain why const& is useful for large objects or articulate the memory implications of each approach." },
    { title: "Recommendation", text: "Consider a hands-on lab with visual debugging showing memory addresses. A side-by-side comparison of pass-by-value vs pass-by-reference with actual variable addresses would help bridge the gap." },
  ],
  headerfiles: [
    { title: "Root Cause", text: "62% of students understand the concept but cannot explain the mechanism. They lack intuition for how #include literally copies header content and why separate compilation matters." },
    { title: "Conversation Pattern", text: 'Students repeatedly asked the AI agent to "re-explain" header files, suggesting the initial lecture explanation did not provide sufficient concrete examples of the compilation process.' },
    { title: "Recommendation", text: "A step-by-step walkthrough showing raw code → preprocessor output → compiled object files would make this concept tangible. Include a visual diagram of the compilation pipeline." },
  ],
  loops: [
    { title: "Root Cause", text: "Students treat loop types as interchangeable. 68% of struggling students could not explain when a do-while loop is necessary versus a regular while loop." },
    { title: "Conversation Pattern", text: 'Students frequently asked "which loop should I use?" indicating a memorization rather than understanding approach to control flow.' },
    { title: "Recommendation", text: "An interactive exercise where students see the same problem solved with different loop types, highlighting when each is most appropriate, would build deeper intuition." },
  ],
  scope: [
    { title: "Root Cause", text: "Students are unfamiliar with stack frames and how local variables are created/destroyed. 55% confused global variables with static local variables." },
    { title: "Conversation Pattern", text: 'Students asked the AI agent for "example code showing scope" more than any other topic in this lecture, suggesting they need more concrete examples in course materials.' },
    { title: "Recommendation", text: "Provide a worked example with a visual call stack showing variable creation/destruction across function calls. A downloadable debugger walkthrough would be highly valuable." },
  ],
};

export const conceptMastery = [
  { label: "Variables & Types", pct: 88 },
  { label: "Control Flow", pct: 82 },
  { label: "Functions", pct: 65 },
  { label: "Pass-by-Reference", pct: 48 },
  { label: "Header Files", pct: 42 },
  { label: "Pointers", pct: 28 },
];

export const questionResponses = [
  { label: "Q1", correct: 68, partial: 22, incorrect: 10 },
  { label: "Q2", correct: 55, partial: 30, incorrect: 15 },
  { label: "Q3", correct: 45, partial: 35, incorrect: 20 },
];

export const dashboardStats = [
  { label: "Avg. Comprehension", value: "61%", change: "+5% from last lecture", up: true },
  { label: "AI Conversations", value: "287", change: "+18% from last lecture", up: true },
  { label: "Questions Completed", value: "76%", change: "+12% from last lecture", up: true },
];
