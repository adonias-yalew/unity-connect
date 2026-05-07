import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HandHeart, Heart, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/donate")({
  component: DonatePage,
});

const presets = [10, 25, 50, 100];
const causes = [
  { title: "Community fund", desc: "Support free access for seekers worldwide.", icon: Heart },
  { title: "Leader stipends", desc: "Honor verified leaders for their time.", icon: Sparkles },
  { title: "Artisan grants", desc: "Help vendors grow their craft.", icon: HandHeart },
];

function DonatePage() {
  const [amount, setAmount] = useState<number>(25);
  const [cause, setCause] = useState(0);

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <HandHeart className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-display text-4xl font-semibold">Donate</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your gift keeps Sanctum open and free for all.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="font-display text-xl font-semibold">Choose an amount</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(p)}
                className={`rounded-lg border px-5 py-2.5 text-sm font-medium transition-all ${
                  amount === p
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background hover:border-primary/40"
                }`}
              >
                ${p}
              </button>
            ))}
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="w-28 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none"
              placeholder="Other"
            />
          </div>

          <h2 className="mt-8 font-display text-xl font-semibold">Direct your gift</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {causes.map((c, i) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.title}
                  onClick={() => setCause(i)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    cause === i ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                  }`}
                >
                  <Icon className="mb-2 h-5 w-5 text-primary" />
                  <p className="text-sm font-semibold">{c.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
                </button>
              );
            })}
          </div>

          <button className="mt-8 w-full rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5">
            Give ${amount} to {causes[cause].title.toLowerCase()}
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Payments are not yet enabled — this is a placeholder.</p>
        </div>

        <div className="rounded-2xl border border-border p-8" style={{ background: "var(--gradient-warm)" }}>
          <p className="font-display text-2xl italic leading-snug">"Each one should give what they have decided in their heart to give."</p>
          <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">On generosity</p>
          <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">This month</span><span className="font-semibold">$12,480</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Donors</span><span className="font-semibold">324</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Goal</span><span className="font-semibold">$20,000</span></div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary" style={{ width: "62%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
