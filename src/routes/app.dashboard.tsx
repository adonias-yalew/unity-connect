import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export const Route = createFileRoute("/app/dashboard")({
  component: Dashboard,
});

const actions = [
  { title: "Ask a question", desc: "Get guidance from verified leaders.", to: "/app/community" as const, icon: "✦" },
  { title: "View stories", desc: "Daily teachings to ground your day.", to: "/app/content" as const, icon: "❋" },
  { title: "Visit the shop", desc: "Goods made with intention.", to: "/app/shop" as const, icon: "✿" },
];

function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <p className="text-sm text-muted-foreground">Peace be with you,</p>
      <h1 className="mt-1 font-display text-4xl font-semibold">{user?.name}.</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">A quiet moment is a small sanctuary. Here's where you can begin today.</p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {actions.map((a) => (
          <Link key={a.to} to={a.to} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg text-primary">{a.icon}</div>
            <h3 className="font-semibold">{a.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
            <span className="mt-4 inline-block text-xs font-medium text-primary group-hover:underline">Open →</span>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border p-8 text-center" style={{ background: "var(--gradient-warm)" }}>
        <p className="font-display text-xl italic">"Be still, and know."</p>
        <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">Today's reflection</p>
      </div>
    </div>
  );
}
