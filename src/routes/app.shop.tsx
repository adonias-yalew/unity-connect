import { createFileRoute } from "@tanstack/react-router";
import { mockShop } from "@/modules/shop/services/shopService";

export const Route = createFileRoute("/app/shop")({
  component: ShopPage,
});

function ShopPage() {
  return (
    <div>
      <h1 className="font-display text-4xl font-semibold">Marketplace</h1>
      <p className="mt-2 text-muted-foreground">Reach out to vendors directly.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mockShop.map((s) => (
          <article key={s.id} className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-secondary text-6xl">{s.emoji}</div>
            <h3 className="font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-semibold text-primary">{s.price}</span>
              <span className="text-xs text-muted-foreground">{s.vendor}</span>
            </div>
            <div className="mt-4 space-y-1.5 border-t border-border pt-3 text-xs">
              <p className="flex items-center gap-2"><span>📞</span> <a href={`tel:${s.phone}`} className="hover:text-primary">{s.phone}</a></p>
              <p className="flex items-center gap-2"><span>✈️</span> <a href={`https://t.me/${s.telegram.replace("@","")}`} className="hover:text-primary">{s.telegram}</a></p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
