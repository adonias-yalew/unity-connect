import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/layouts/PublicLayout";
import { mockContent } from "@/modules/content/services/contentService";

export const Route = createFileRoute("/content")({
  head: () => ({
    meta: [
      { title: "Content — Sanctum" },
      { name: "description", content: "Daily teachings, stories, and quotes from across faith traditions." },
    ],
  }),
  component: ContentPreview,
});

function ContentPreview() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-display text-4xl font-semibold">Teachings</h1>
        <p className="mt-3 text-muted-foreground">A preview of daily stories and quotes. <Link to="/signup" className="text-primary hover:underline">Sign up</Link> to like and save.</p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {mockContent.map((c) => (
            <article key={c.id} className="rounded-2xl border border-border bg-card p-6">
              <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wider text-accent">{c.type}</span>
              <h3 className="font-display text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              <p className="mt-4 text-xs text-muted-foreground">— {c.author}</p>
            </article>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
