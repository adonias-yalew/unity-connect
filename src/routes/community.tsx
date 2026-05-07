import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/layouts/PublicLayout";
import { mockQuestions } from "@/modules/community/services/communityService";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — Sanctum" },
      { name: "description", content: "Read questions and answers from a multi-faith community of seekers and leaders." },
    ],
  }),
  component: CommunityPreview,
});

function CommunityPreview() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-display text-4xl font-semibold">Community</h1>
        <p className="mt-3 text-muted-foreground">Read questions and answers from across traditions. <Link to="/signup" className="text-primary hover:underline">Sign up</Link> to ask your own.</p>

        <div className="mt-10 space-y-4">
          {mockQuestions.map((q) => (
            <article key={q.id} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <div className="mb-2 flex items-center gap-2 text-xs">
                <span className="rounded-full bg-secondary px-2 py-0.5 capitalize text-secondary-foreground">{q.religion}</span>
                <span className="text-muted-foreground">asked by {q.author}</span>
              </div>
              <h3 className="font-display text-xl font-semibold">{q.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{q.body}</p>
              {q.answers.map((a) => (
                <div key={a.id} className="mt-4 rounded-lg border-l-2 border-primary bg-secondary/50 p-4">
                  <div className="mb-1 flex items-center gap-2 text-xs">
                    <span className="font-medium text-foreground">{a.leader}</span>
                    {a.verified && <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">✓ verified</span>}
                  </div>
                  <p className="text-sm">{a.body}</p>
                </div>
              ))}
              <div className="mt-4 rounded-md bg-muted/40 p-3 text-xs text-muted-foreground">
                🔒 Sign in to interact with this question.
              </div>
            </article>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
