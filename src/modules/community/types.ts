import type { Religion } from "../auth/types";

export interface Answer {
  id: string;
  leader: string;
  verified: boolean;
  body: string;
}

export interface Question {
  id: string;
  author: string;
  religion: Religion;
  title: string;
  body: string;
  answers: Answer[];
}
