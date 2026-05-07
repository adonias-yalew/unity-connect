export interface ContentItem {
  id: string;
  type: "quote" | "story";
  title: string;
  body: string;
  author: string;
  likes: number;
}
