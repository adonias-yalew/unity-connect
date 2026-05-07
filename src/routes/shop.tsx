import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/layouts/PublicLayout";
import { mockShop } from "@/modules/shop/services/shopService";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Sanctum" },
      { name: "description", content: "Discover goods made by faithful artisans from around the world." },
    ],
  }),
  component: ShopPreview,
});

function ShopPreview() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="font-display text-4xl font-semibold">Marketplace</h1>
        <p className="mt-3 text-muted-foreground">Goods made with intention. <Link to="/signup" className="text-primary hover:underline">Sign up</Link> to view vendor contact details.</p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mockShop.map((s) => (
            <article key={s.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-secondary text-6xl">{s.emoji}</div>
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold text-primary">{s.price}</span>
                <span className="text-xs text-muted-foreground">{s.vendor}</span>
              </div>
              <div className="mt-3 rounded-md bg-muted/40 p-2 text-center text-xs text-muted-foreground">🔒 Login to contact vendor</div>
            </article>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
