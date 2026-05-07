import { Link, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/modules/auth/hooks/useAuth";

const items = [
  { to: "/app/dashboard", label: "Dashboard", icon: "◈" },
  { to: "/app/community", label: "Community", icon: "✦" },
  { to: "/app/content", label: "Content", icon: "❋" },
  { to: "/app/shop", label: "Shop", icon: "✿" },
] as const;

export function Sidebar() {
  const { user, logout } = useAuth();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const allItems = user?.role === "admin"
    ? [...items, { to: "/app/admin" as const, label: "Admin", icon: "✪" }]
    : items;

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-display font-bold">✦</div>
        <span className="font-display text-lg font-semibold">Sanctum</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-6">
        {allItems.map((item) => {
          const active = path === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-sidebar-accent font-medium text-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              }`}
            >
              <span className="text-base text-primary">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <div className="mb-3 flex items-center gap-3 px-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{user?.name}</p>
            <p className="truncate text-xs capitalize text-muted-foreground">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full rounded-md border border-border px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
