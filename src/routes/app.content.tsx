import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { mockContent } from "@/modules/content/services/contentService";

export const Route = createFileRoute("/app/content")({
  component: ContentPage,
});

function ContentPage() {
  const [items, setItems] = useState(mockContent);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLiked((s) => {
      const next = new Set(s);
      const isLiked = next.has(id);
      if (isLiked) next.delete(id); else next.add(id);
      setItems((arr) => arr.map((c) => c.id === id ? { ...c, likes: c.likes + (isLiked ? -1 : 1) } : c));
      return next;
    });
  };

  return (
    <div>
      <h1 className="font-display text-4xl font-semibold">Teachings</h1>
      <p className="mt-2 text-muted-foreground">Stories and quotes for daily reflection.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map((c) => (
          <article key={c.id} className="rounded-2xl border border-border bg-card p-6">
            <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wider text-accent">{c.type}</span>
            <h3 className="font-display text-lg font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">— {c.author}</p>
              <button onClick={() => toggleLike(c.id)} className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${liked.has(c.id) ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                <span>{liked.has(c.id) ? "♥" : "♡"}</span>
                {c.likes}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
