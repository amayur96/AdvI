export const student = {
  name: "Alex Johnson",
  initials: "A",
  course: "EECS 183 – Elementary Programming Concepts in C++",
};

export const presetQuestions = [
  { id: 1, text: "What is the difference between pass-by-value and pass-by-reference in C++?" },
  { id: 2, text: "Explain how a for loop differs from a while loop, and when you'd pick one over the other." },
  { id: 3, text: "What is the purpose of a header file (.h) and how does it relate to the .cpp file?" },
];

export const lectureTopics = [
  { id: 1, label: "Lec 1 – Intro to C++" },
  { id: 2, label: "Lec 2 – Variables & Data Types" },
  { id: 3, label: "Lec 3 – Control Flow" },
  { id: 4, label: "Lec 4 – Functions" },
  { id: 5, label: "Lec 5 – Arrays & Strings" },
  { id: 6, label: "Lec 6 – Pointers & References" },
];

export const keyConcepts = [
  { label: "Variables & Types", status: "strong" },
  { label: "Control Flow", status: "strong" },
  { label: "Functions", status: "partial" },
  { label: "Pass-by-Reference", status: "weak" },
  { label: "Header Files", status: "weak" },
  { label: "Pointers", status: "weak" },
];

export const confidenceBars = [
  { label: "Pass-by-value", pct: 82, color: "var(--success)" },
  { label: "Loops", pct: 65, color: "var(--warning)" },
  { label: "Header Files", pct: 20, color: "var(--danger)" },
  { label: "Pointers", pct: 10, color: "#CBD5E1" },
];

export const initialMessages = [
  {
    role: "ai",
    presetLabel: null,
    text: 'Hey Alex! 👋 Welcome back. We\'re working through <strong>Lecture 4 – Functions</strong> today. I have 3 questions to help check your understanding, and then we can dive into anything you\'d like to explore further. Ready to get started?',
    time: "2:30 PM",
  },
  {
    role: "student",
    text: "Yes, let's do it!",
    time: "2:30 PM",
  },
  {
    role: "ai",
    presetLabel: "Preset Question 1 of 3",
    text: "<strong>What is the difference between pass-by-value and pass-by-reference in C++?</strong> Think about what happens to the original variable in each case.",
    time: "2:31 PM",
  },
  {
    role: "student",
    text: "Pass-by-value copies the argument into the function parameter, so changes inside the function don't affect the original. Pass-by-reference passes the actual variable using &, so modifications inside the function change the original value too.",
    time: "2:33 PM",
  },
  {
    role: "ai",
    presetLabel: null,
    text: "Great answer! You've got the core idea down. One thing to add — pass-by-reference also avoids copying large objects, which can be important for performance. Can you think of a situation where you'd use <code>const&</code> instead of just <code>&</code>?",
    time: "2:33 PM",
  },
  {
    role: "student",
    text: "When you want the performance benefit of avoiding a copy but don't want the function to accidentally modify the original? Like passing a large string to a print function.",
    time: "2:34 PM",
  },
  {
    role: "ai",
    presetLabel: null,
    text: "Exactly right! ✅ <code>const&</code> gives you the best of both worlds — no copy, no accidental mutation. Great understanding. Let's move on!",
    time: "2:34 PM",
  },
  {
    role: "ai",
    presetLabel: "Preset Question 2 of 3",
    text: "<strong>Explain how a <code>for</code> loop differs from a <code>while</code> loop, and when you'd pick one over the other.</strong>",
    time: "2:35 PM",
  },
  {
    role: "student",
    text: "A for loop is best when you know how many times to iterate — it puts the initializer, condition, and increment all in one line. A while loop is better when you don't know the number of iterations upfront, like reading input until the user types 'quit'.",
    time: "2:37 PM",
  },
  {
    role: "ai",
    presetLabel: null,
    text: "Spot on! And there's also <code>do-while</code>, which guarantees the body runs at least once since the condition is checked <em>after</em> each iteration. A classic use case is menu-driven programs where you always want to show the menu at least once. Does that distinction make sense?",
    time: "2:37 PM",
  },
  {
    role: "student",
    text: "Yes! That makes sense — do-while for 'run first, check later' situations. Got it.",
    time: "2:38 PM",
  },
  {
    role: "ai",
    presetLabel: null,
    text: "Nice work! ✅ Two down, one to go.",
    time: "2:38 PM",
  },
  {
    role: "ai",
    presetLabel: "Preset Question 3 of 3",
    text: "<strong>What is the purpose of a header file (<code>.h</code>) and how does it relate to the <code>.cpp</code> file?</strong> Think about why we split code into two files.",
    time: "2:39 PM",
  },
];

export const aiResponses = [
  "Good start! A header file (<code>.h</code>) contains <strong>declarations</strong> — function prototypes, class definitions, and constants — while the <code>.cpp</code> file contains the <strong>implementations</strong>. This separation lets other files use your functions by including just the header, without needing to see the full implementation. Would you like to walk through an example?",
  "Great question! Think of the header file like a menu at a restaurant — it tells you what's available (function names and signatures), while the .cpp file is the kitchen where the actual work happens. The <code>#include</code> directive copies the header's contents into any file that needs it. What part would you like to explore more?",
  "That's a thoughtful answer. One key benefit of this split is <strong>separate compilation</strong> — if you change only the .cpp file, you only need to recompile that one file, not everything that uses it. The header acts as a stable contract. Want me to explain include guards (<code>#ifndef</code>) too?",
  "Interesting! You're building a solid mental model. Remember that <code>#include</code> is literally a copy-paste by the preprocessor. That's why include guards or <code>#pragma once</code> are important — they prevent the same header from being included twice. Shall we explore that further?",
];
