import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { mockQuestions } from "@/modules/community/services/communityService";
import type { Question } from "@/modules/community/types";

export const Route = createFileRoute("/app/community")({
  component: CommunityPage,
});

function CommunityPage() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [answering, setAnswering] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState("");

  const ask = () => {
    if (!title.trim() || !user) return;
    setQuestions([
      { id: crypto.randomUUID(), author: user.name, religion: user.religion, title, body, answers: [] },
      ...questions,
    ]);
    setTitle(""); setBody("");
  };

  const answer = (qid: string) => {
    if (!answerText.trim() || !user) return;
    setQuestions((qs) => qs.map((q) => q.id === qid ? {
      ...q,
      answers: [...q.answers, { id: crypto.randomUUID(), leader: user.name, verified: !!user.verified, body: answerText }],
    } : q));
    setAnswerText(""); setAnswering(null);
  };

  const isLeader = user?.role === "leader" || user?.role === "admin";

  return (
    <div>
      <h1 className="font-display text-4xl font-semibold">Community</h1>
      <p className="mt-2 text-muted-foreground">Ask honest questions. Receive thoughtful answers.</p>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-3 font-semibold">Ask a question</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your question..." className="w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:border-ring focus:outline-none" />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Add context (optional)" rows={3} className="mt-2 w-full rounded-md border border-input bg-background px-4 py-2.5 text-sm focus:border-ring focus:outline-none" />
        <button onClick={ask} className="mt-3 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Post question</button>
      </div>

      <div className="mt-8 space-y-4">
        {questions.map((q) => (
          <article key={q.id} className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-2 flex items-center gap-2 text-xs">
              <span className="rounded-full bg-secondary px-2 py-0.5 capitalize">{q.religion}</span>
              <span className="text-muted-foreground">asked by {q.author}</span>
            </div>
            <h3 className="font-display text-xl font-semibold">{q.title}</h3>
            {q.body && <p className="mt-1 text-sm text-muted-foreground">{q.body}</p>}
            {q.answers.map((a) => (
              <div key={a.id} className="mt-4 rounded-lg border-l-2 border-primary bg-secondary/50 p-4">
                <div className="mb-1 flex items-center gap-2 text-xs">
                  <span className="font-medium">{a.leader}</span>
                  {a.verified && <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">✓ verified leader</span>}
                </div>
                <p className="text-sm">{a.body}</p>
              </div>
            ))}
            {isLeader && (
              <div className="mt-4">
                {answering === q.id ? (
                  <div className="space-y-2">
                    <textarea value={answerText} onChange={(e) => setAnswerText(e.target.value)} rows={2} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Your answer..." />
                    <div className="flex gap-2">
                      <button onClick={() => answer(q.id)} className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">Submit</button>
                      <button onClick={() => setAnswering(null)} className="rounded-md border border-border px-3 py-1.5 text-xs">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setAnswering(q.id)} className="text-xs font-medium text-primary hover:underline">+ Answer as leader</button>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
