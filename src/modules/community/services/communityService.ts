import type { Question } from "../types";

export const mockQuestions: Question[] = [
  {
    id: "1",
    author: "Sara M.",
    religion: "muslim",
    title: "What does patience truly mean in faith?",
    body: "I'm trying to understand the deeper meaning of sabr in everyday life.",
    answers: [
      {
        id: "a1",
        leader: "Imam Yusuf",
        verified: true,
        body: "Patience is active trust — moving forward while accepting the timing of the unseen.",
      },
    ],
  },
  {
    id: "2",
    author: "Daniel K.",
    religion: "orthodox",
    title: "How can I deepen my prayer life?",
    body: "I've been praying for years but feel a plateau lately.",
    answers: [
      {
        id: "a2",
        leader: "Father Markos",
        verified: true,
        body: "Begin with stillness. The Jesus Prayer, repeated slowly, opens the heart over time.",
      },
    ],
  },
  {
    id: "3",
    author: "Hannah L.",
    religion: "protestant",
    title: "Is doubt a sin?",
    body: "I've been wrestling with hard questions about my faith.",
    answers: [
      {
        id: "a3",
        leader: "Pastor Grace",
        verified: true,
        body: "Doubt honestly examined is the doorway to mature faith — not its enemy.",
      },
    ],
  },
];

export const communityService = {
  list: () => mockQuestions,
};
