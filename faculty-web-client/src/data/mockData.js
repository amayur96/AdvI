export const lectures = [
  { id: 1, title: "Intro to ML" },
  { id: 2, title: "Linear Regression" },
  { id: 3, title: "Classification" },
  { id: 4, title: "Decision Trees" },
  { id: 5, title: "Neural Networks" },
  { id: 6, title: "CNNs" },
  { id: 7, title: "RNNs & LSTMs" },
  { id: 8, title: "Transformers" },
  { id: 9, title: "Attention Mechanisms" },
  { id: 10, title: "Fine-Tuning LLMs" },
  { id: 11, title: "RAG Systems" },
  { id: 12, title: "AI Ethics" },
];

export const materials = [
  { name: "Lecture_10_Slides.pdf", type: "pdf", date: "Feb 14", size: "4.2 MB" },
  { name: "FineTuning_LLMs_Notes.pptx", type: "ppt", date: "Feb 14", size: "8.1 MB" },
  { name: "Lab_10_Instructions.docx", type: "doc", date: "Feb 15", size: "1.3 MB" },
  { name: "Supplementary_Reading.pdf", type: "pdf", date: "Feb 16", size: "2.7 MB" },
];

export const criticalConcepts = [
  {
    id: "lora",
    concept: "LoRA vs Full Fine-Tuning Trade-offs",
    pct: 78,
    desc: "Students cannot clearly differentiate when to use LoRA adapters versus full parameter fine-tuning and its impact on model performance and cost.",
    severity: 700,
  },
  {
    id: "forgetting",
    concept: "Catastrophic Forgetting",
    pct: 62,
    desc: "Many students struggle to explain what catastrophic forgetting is and the strategies used to mitigate it during fine-tuning.",
    severity: 600,
  },
  {
    id: "hyperparams",
    concept: "Hyperparameter Selection for Fine-Tuning",
    pct: 45,
    desc: "Students are uncertain about choosing learning rate, batch size, and epoch count when fine-tuning pre-trained models.",
    severity: 400,
  },
  {
    id: "dataprep",
    concept: "Data Preparation for Fine-Tuning",
    pct: 34,
    desc: "A subset of students are confused about dataset formatting, tokenization, and prompt-template construction for instruction-tuning.",
    severity: 300,
  },
];

export const questionSets = [
  [
    { q: "Explain the key differences between LoRA fine-tuning and full-parameter fine-tuning. When would you recommend each approach?", tag: "LoRA & Fine-Tuning" },
    { q: "What is catastrophic forgetting and what are two strategies to mitigate it when fine-tuning a large language model?", tag: "Catastrophic Forgetting" },
    { q: "Describe how you would prepare a dataset for instruction-tuning a pre-trained model, including the role of prompt templates.", tag: "Data Preparation" },
  ],
  [
    { q: "Compare the computational costs of LoRA adapters versus full fine-tuning for a 7B parameter model. What are the practical implications?", tag: "LoRA & Fine-Tuning" },
    { q: "How does learning rate warmup help prevent catastrophic forgetting? Provide a concrete example.", tag: "Catastrophic Forgetting" },
    { q: "What role does the rank parameter play in LoRA, and how does it affect model capacity and training efficiency?", tag: "LoRA Configuration" },
  ],
  [
    { q: "A startup wants to fine-tune an open-source LLM for customer support. Should they use LoRA or full fine-tuning? Justify your answer.", tag: "Applied Fine-Tuning" },
    { q: "Explain how elastic weight consolidation (EWC) helps mitigate catastrophic forgetting. What are its limitations?", tag: "Catastrophic Forgetting" },
    { q: "Why is evaluation on a held-out set critical during fine-tuning? What metrics would you track and why?", tag: "Evaluation" },
  ],
];

export const diveDeepData = {
  lora: [
    { title: "Root Cause", text: 'Students conflate "fewer trainable parameters" with "worse performance." 68% of struggling students incorrectly stated LoRA always produces inferior models.' },
    { title: "Conversation Pattern", text: "When asked follow-up questions, students could not articulate the concept of rank decomposition or explain how LoRA modifies attention weight matrices." },
    { title: "Recommendation", text: "Consider a hands-on lab comparing LoRA vs full fine-tuning on a small model. Visual side-by-side comparisons of loss curves and parameter counts may help bridge the gap." },
  ],
  forgetting: [
    { title: "Root Cause", text: "58% of students understand the definition but cannot explain the mechanism. They lack intuition for how gradient updates overwrite previously learned representations." },
    { title: "Conversation Pattern", text: 'Students repeatedly asked the AI agent to "re-explain" forgetting, suggesting the initial lecture explanation did not provide sufficient concrete examples.' },
    { title: "Recommendation", text: "A before-and-after demonstration showing model outputs on general tasks pre/post fine-tuning could make this concept tangible." },
  ],
  hyperparams: [
    { title: "Root Cause", text: "Students treat hyperparameters as arbitrary numbers. 72% of struggling students could not explain why a lower learning rate is typically used for fine-tuning vs. training from scratch." },
    { title: "Conversation Pattern", text: 'Students frequently asked "what is the best learning rate?" indicating a memorization rather than understanding approach.' },
    { title: "Recommendation", text: "An interactive hyperparameter exploration exercise where students see real-time effects on training curves would build deeper intuition." },
  ],
  dataprep: [
    { title: "Root Cause", text: "Students are unfamiliar with the instruction-following format (system/user/assistant structure). 61% confused tokenization for fine-tuning with tokenization for inference." },
    { title: "Conversation Pattern", text: 'Students asked the AI agent for "example datasets" more than any other topic in this lecture, suggesting they need more concrete examples in course materials.' },
    { title: "Recommendation", text: "Provide a worked example walking through raw data → cleaned format → prompt template → tokenized input. A downloadable sample dataset would be highly valuable." },
  ],
};

export const conceptMastery = [
  { label: "Tokenization", pct: 92 },
  { label: "Transfer Learning", pct: 85 },
  { label: "Prompt Templates", pct: 74 },
  { label: "Hyperparameters", pct: 55 },
  { label: "Catastrophic Forget.", pct: 38 },
  { label: "LoRA Trade-offs", pct: 22 },
];

export const questionResponses = [
  { label: "Q1", correct: 32, partial: 40, incorrect: 28 },
  { label: "Q2", correct: 45, partial: 30, incorrect: 25 },
  { label: "Q3", correct: 58, partial: 28, incorrect: 14 },
  { label: "Q4", correct: 70, partial: 20, incorrect: 10 },
  { label: "Q5", correct: 50, partial: 35, incorrect: 15 },
];

export const dashboardStats = [
  { label: "Active Students", value: "128", change: "+12% from last lecture", up: true },
  { label: "Avg. Comprehension", value: "67%", change: "-8% from last lecture", up: false },
  { label: "AI Conversations", value: "342", change: "+23% from last lecture", up: true },
  { label: "Questions Completed", value: "89%", change: "+5% from last lecture", up: true },
];
