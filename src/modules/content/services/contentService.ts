import type { ContentItem } from "../types";

export const mockContent: ContentItem[] = [
  { id: "1", type: "quote", title: "On Mercy", body: "Mercy is the seed of every transformation.", author: "Anonymous", likes: 42 },
  { id: "2", type: "story", title: "The Lamp at Dawn", body: "An old monk taught his student that light begins inside before it ever shines outside...", author: "Father Iakov", likes: 87 },
  { id: "3", type: "quote", title: "Trust", body: "Tie your camel, then trust.", author: "Hadith", likes: 120 },
  { id: "4", type: "story", title: "Two Brothers", body: "Two brothers carried wheat across a field every night, secretly leaving sheaves for one another...", author: "Folk wisdom", likes: 55 },
  { id: "5", type: "quote", title: "Grace", body: "Grace is what arrives uninvited and stays anyway.", author: "Pastor Grace", likes: 33 },
];

export const contentService = { list: () => mockContent };
