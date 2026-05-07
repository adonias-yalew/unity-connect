import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowBigUp, MessageCircle, BadgeCheck, Plus, Sparkles } from "lucide-react";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { mockQuestions } from "@/modules/community/services/communityService";
import type { Question } from "@/modules/community/types";

export const Route = createFileRoute("/app/community")({
  component: CommunityPage,
});

interface PostState extends Question {
  upvotes: number;
  comments: number;
}

const seed: PostState[] = mockQuestions.map((q, i) => ({
  ...q,
  upvotes: 12 + i * 7,
  comments: q.answers.length + i,
}));

const religionStyles: Record<string, string> = {
  orthodox: "bg-[oklch(0.94_0.04_60)] text-[oklch(0.35_0.08_50)]",
  muslim: "bg-[oklch(0.93_0.05_160)] text-[oklch(0.35_0.08_160)]",
  protestant: "bg-[oklch(0.93_0.04_260)] text-[oklch(0.35_0.08_260)]",
};

function CommunityPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostState[]>(seed);
  const [voted, setVoted] = useState<Set<string>>(new Set());
  const [composing, setComposing] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [filter, setFilter] = useState<"all" | "answered" | "open">("all");

  const isLeader = user?.role === "leader" || user?.role === "admin";
  const [answering, setAnswering] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState("");

  const toggleVote = (id: string) => {
    setVoted((s) => {
      const next = new Set(s);
      const had = next.has(id);
      if (had) next.delete(id); else next.add(id);
      setPosts((arr) => arr.map((p) => p.id === id ? { ...p, upvotes: p.upvotes + (had ? -1 : 1) } : p));
      return next;
    });
  };

  const ask = () => {
    if (!title.trim() || !user) return;
    setPosts([
      { id: crypto.randomUUID(), author: user.name, religion: user.religion, title, body, answers: [], upvotes: 1, comments: 0 },
      ...posts,
    ]);
    setTitle(""); setBody(""); setComposing(false);
  };

  const answer = (qid: string) => {
    if (!answerText.trim() || !user) return;
    setPosts((qs) => qs.map((q) => q.id === qid ? {
      ...q,
      answers: [...q.answers, { id: crypto.randomUUID(), leader: user.name, verified: !!user.verified, body: answerText }],
      comments: q.comments + 1,
    } : q));
    setAnswerText(""); setAnswering(null);
  };

  const visible = posts.filter((p) =>
    filter === "all" ? true : filter === "answered" ? p.answers.length > 0 : p.answers.length === 0
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <div className="min-w-0">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-semibold">Community</h1>
            <p className="mt-1 text-sm text-muted-foreground">Honest questions. Thoughtful answers.</p>
          </div>
          <button
            onClick={() => setComposing((v) => !v)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Ask
          </button>
        </div>

        {/* Filters */}
        <div className="mb-4 flex gap-1 rounded-lg border border-border bg-card p-1 text-xs">
          {(["all", "answered", "open"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 rounded-md px-3 py-1.5 capitalize transition-colors ${
                filter === f ? "bg-secondary font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Composer */}
        {composing && (
          <div className="mb-4 rounded-2xl border border-border bg-card p-5">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What's your question?" className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:border-ring focus:outline-none" />
            <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Add context (optional)" rows={3} className="mt-2 w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:border-ring focus:outline-none" />
            <div className="mt-3 flex justify-end gap-2">
              <button onClick={() => setComposing(false)} className="rounded-md border border-border px-3 py-1.5 text-xs">Cancel</button>
              <button onClick={ask} className="rounded-md bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90">Post</button>
            </div>
          </div>
        )}

        {/* Feed */}
        <div className="space-y-3">
          {visible.map((p) => (
            <article key={p.id} className="group flex gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
              {/* Vote rail */}
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => toggleVote(p.id)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                    voted.has(p.id) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <ArrowBigUp className="h-5 w-5" fill={voted.has(p.id) ? "currentColor" : "none"} />
                </button>
                <span className="text-xs font-semibold">{p.upvotes}</span>
              </div>

              {/* Body */}
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${religionStyles[p.religion] ?? "bg-secondary"}`}>
                    {p.religion}
                  </span>
                  <span>·</span>
                  <span>by <span className="text-foreground">{p.author}</span></span>
                </div>
                <h3 className="font-display text-lg font-semibold leading-snug">{p.title}</h3>
                {p.body && <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>}

                {/* Verified leader answer */}
                {p.answers.length > 0 && (
                  <div className="mt-4 rounded-xl border border-primary/20 bg-primary/[0.04] p-4">
                    <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                      <Sparkles className="h-3 w-3" />
                      Verified leader answer
                    </div>
                    {p.answers.map((a) => (
                      <div key={a.id} className="mt-2 first:mt-0">
                        <div className="mb-1 flex items-center gap-1.5 text-xs">
                          <span className="font-medium">{a.leader}</span>
                          {a.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary" />}
                        </div>
                        <p className="text-sm leading-relaxed">{a.body}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MessageCircle className="h-3.5 w-3.5" />
                    {p.comments} {p.comments === 1 ? "comment" : "comments"}
                  </span>
                  {isLeader && (
                    <button onClick={() => setAnswering(answering === p.id ? null : p.id)} className="font-medium text-primary hover:underline">
                      {answering === p.id ? "Cancel" : "Answer as leader"}
                    </button>
                  )}
                </div>

                {answering === p.id && (
                  <div className="mt-3 space-y-2">
                    <textarea value={answerText} onChange={(e) => setAnswerText(e.target.value)} rows={2} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Your answer..." />
                    <button onClick={() => answer(p.id)} className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">Submit answer</button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Side rail */}
      <aside className="hidden lg:block">
        <div className="sticky top-6 space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="font-display text-sm font-semibold">Community guidelines</h3>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li>· Speak with kindness across traditions.</li>
              <li>· Ask in good faith; answer with humility.</li>
              <li>· Verified leaders are reviewed by admins.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border p-5" style={{ background: "var(--gradient-warm)" }}>
            <p className="font-display text-base italic leading-snug">"A gentle answer turns away wrath."</p>
            <p className="mt-2 text-[11px] uppercase tracking-wider text-muted-foreground">Today</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
