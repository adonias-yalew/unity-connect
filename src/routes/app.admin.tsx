import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/modules/auth/hooks/useAuth";

export const Route = createFileRoute("/app/admin")({
  component: AdminPage,
});

interface PendingItem { id: string; name: string; detail: string; }

function AdminPage() {
  const { user } = useAuth();
  if (user?.role !== "admin") return <Navigate to="/app/dashboard" />;

  const [leaders, setLeaders] = useState<PendingItem[]>([
    { id: "1", name: "Father Markos", detail: "Orthodox priest — 12 years" },
    { id: "2", name: "Imam Yusuf", detail: "Muslim scholar — Cairo" },
  ]);
  const [vendors, setVendors] = useState<PendingItem[]>([
    { id: "1", name: "Cedar & Ink", detail: "Hand-bound journals" },
  ]);
  const [listings, setListings] = useState<PendingItem[]>([
    { id: "1", name: "Olive Wood Beads", detail: "by Holy Land Crafts" },
  ]);

  const Section = ({ title, items, setItems }: { title: string; items: PendingItem[]; setItems: (v: PendingItem[]) => void }) => (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="mb-4 font-display text-xl font-semibold">{title}</h2>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">All caught up.</p>
      ) : (
        <div className="space-y-2">
          {items.map((it) => (
            <div key={it.id} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium">{it.name}</p>
                <p className="text-xs text-muted-foreground">{it.detail}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setItems(items.filter((i) => i.id !== it.id))} className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">Approve</button>
                <button onClick={() => setItems(items.filter((i) => i.id !== it.id))} className="rounded-md border border-border px-3 py-1.5 text-xs">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <h1 className="font-display text-4xl font-semibold">Admin</h1>
      <p className="mt-2 text-muted-foreground">Approve leaders, vendors, and listings.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6"><p className="text-sm text-muted-foreground">Pending leaders</p><p className="mt-1 font-display text-3xl font-semibold">{leaders.length}</p></div>
        <div className="rounded-2xl border border-border bg-card p-6"><p className="text-sm text-muted-foreground">Pending vendors</p><p className="mt-1 font-display text-3xl font-semibold">{vendors.length}</p></div>
        <div className="rounded-2xl border border-border bg-card p-6"><p className="text-sm text-muted-foreground">Pending listings</p><p className="mt-1 font-display text-3xl font-semibold">{listings.length}</p></div>
      </div>

      <div className="mt-8 grid gap-4">
        <Section title="Leaders awaiting verification" items={leaders} setItems={setLeaders} />
        <Section title="Vendor applications" items={vendors} setItems={setVendors} />
        <Section title="Shop listing reviews" items={listings} setItems={setListings} />
      </div>
    </div>
  );
}
