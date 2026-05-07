import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircleQuestion, MessagesSquare, BookOpen, Heart, Plus, Store, HandHeart, ArrowUpRight, TrendingUp } from "lucide-react";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { mockQuestions } from "@/modules/community/services/communityService";
import { mockContent } from "@/modules/content/services/contentService";

export const Route = createFileRoute("/app/dashboard")({
  component: Dashboard,
});

const stats = [
  { label: "Questions asked", value: 12, delta: "+3 this week", icon: MessageCircleQuestion },
  { label: "Answers received", value: 28, delta: "+5 this week", icon: MessagesSquare },
  { label: "Content viewed", value: 146, delta: "+22 this week", icon: BookOpen },
  { label: "Likes received", value: 84, delta: "+11 this week", icon: Heart },
];

const quickActions = [
  { to: "/app/community" as const, label: "Ask a question", icon: Plus, tone: "primary" },
  { to: "/app/content" as const, label: "View content", icon: BookOpen, tone: "ghost" },
  { to: "/app/shop" as const, label: "Go to shop", icon: Store, tone: "ghost" },
  { to: "/app/donate" as const, label: "Donate", icon: HandHeart, tone: "ghost" },
];

function Dashboard() {
  const { user } = useAuth();
  const recentQuestions = mockQuestions.slice(0, 3);
  const recentAnswers = mockQuestions.flatMap((q) => q.answers.map((a) => ({ ...a, on: q.title }))).slice(0, 3);
  const recentContent = mockContent.slice(0, 3);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Peace be with you,</p>
          <h1 className="mt-1 font-display text-4xl font-semibold">Welcome back, {user?.name}.</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">A small moment of stillness reshapes the whole day. Here's what's waiting for you.</p>
        </div>
        <Link to="/app/community" className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90">
          <Plus className="h-4 w-4" />
          Ask a question
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-emerald-600">
                  <TrendingUp className="h-3 w-3" />
                </span>
              </div>
              <p className="mt-4 font-display text-3xl font-semibold tabular-nums">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              <p className="mt-2 text-[11px] text-muted-foreground">{s.delta}</p>
            </div>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {/* Recent questions */}
        <Card title="Recent questions" to="/app/community">
          <ul className="divide-y divide-border">
            {recentQuestions.map((q) => (
              <li key={q.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-secondary text-[11px] font-semibold uppercase">
                  {q.author[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{q.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">by {q.author} · <span className="capitalize">{q.religion}</span></p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Recent answers */}
        <Card title="Recent answers" to="/app/community">
          <ul className="divide-y divide-border">
            {recentAnswers.map((a) => (
              <li key={a.id} className="py-3 first:pt-0 last:pb-0">
                <p className="text-xs text-muted-foreground">on <span className="text-foreground">{a.on}</span></p>
                <p className="mt-1 line-clamp-2 text-sm">{a.body}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">— {a.leader}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Recent content */}
        <Card title="Recently viewed" to="/app/content">
          <ul className="divide-y divide-border">
            {recentContent.map((c) => (
              <li key={c.id} className="py-3 first:pt-0 last:pb-0">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">{c.type}</span>
                <p className="mt-0.5 text-sm font-medium">{c.title}</p>
                <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{c.body}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((a) => {
            const Icon = a.icon;
            const primary = a.tone === "primary";
            return (
              <Link
                key={a.to}
                to={a.to}
                className={`flex items-center justify-between rounded-xl border p-4 transition-all hover:-translate-y-0.5 ${
                  primary
                    ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{a.label}</span>
                </div>
                <ArrowUpRight className="h-4 w-4 opacity-60" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Card({ title, to, children }: { title: string; to: "/app/community" | "/app/content"; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-base font-semibold">{title}</h3>
        <Link to={to} className="text-xs font-medium text-primary hover:underline">View all</Link>
      </div>
      {children}
    </div>
  );
}
