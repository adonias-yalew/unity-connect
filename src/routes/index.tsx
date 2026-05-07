import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/layouts/PublicLayout";
import { mockContent } from "@/modules/content/services/contentService";
import { mockShop } from "@/modules/shop/services/shopService";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sanctum — A multi-faith community" },
      { name: "description", content: "A peaceful home for faith, learning, and community across Orthodox, Muslim, and Protestant traditions." },
      { property: "og:title", content: "Sanctum — A multi-faith community" },
      { property: "og:description", content: "Faith, teachings, and a thoughtful marketplace — under one roof." },
    ],
  }),
  component: Landing,
});

const religions = [
  { name: "Orthodox", glyph: "☦", blurb: "Liturgy, Fathers, and the Jesus Prayer." },
  { name: "Muslim", glyph: "☾", blurb: "Qur'an, Sunnah, and the path of sabr." },
  { name: "Protestant", glyph: "✝", blurb: "Scripture, grace, and living faith." },
];

const features = [
  { title: "Community Q&A", body: "Ask honest questions. Receive answers from verified spiritual leaders.", icon: "✦" },
  { title: "Daily Teachings", body: "Curated stories and quotes from across traditions.", icon: "❋" },
  { title: "Conscious Marketplace", body: "Discover crafts and goods made by faithful artisans.", icon: "✿" },
];

function Landing() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-warm)" }} />
        <div className="mx-auto max-w-5xl px-6 py-28 text-center md:py-36">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Open to all traditions
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Faith, gathered <br />
            <span className="italic text-primary">in one quiet place.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Sanctum is a multi-faith community for honest questions, timeless teachings, and goods made with intention.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/signup" className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5">
              Begin your journey
            </Link>
            <Link to="/community" className="rounded-md border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-secondary">
              Explore community
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-xl text-primary">{f.icon}</div>
              <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Religions */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Three traditions. One sanctuary.</h2>
          <p className="mt-3 text-muted-foreground">A respectful home for every path.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {religions.map((r) => (
            <div key={r.name} className="group flex flex-col items-center rounded-2xl border border-border bg-card p-10 text-center transition-all hover:border-primary/40">
              <div className="mb-4 text-5xl text-primary transition-transform group-hover:scale-110">{r.glyph}</div>
              <h3 className="font-display text-xl font-semibold">{r.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content preview */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl font-semibold">Daily teachings</h2>
          <Link to="/content" className="text-sm font-medium text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {mockContent.slice(0, 2).map((c) => (
            <div key={c.id} className="rounded-2xl border border-border bg-card p-8">
              <span className="mb-3 inline-block text-xs font-medium uppercase tracking-wider text-accent">{c.type}</span>
              <h3 className="mb-2 font-display text-xl font-semibold">{c.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              <p className="mt-4 text-xs text-muted-foreground">— {c.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shop preview */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-3xl font-semibold">From the marketplace</h2>
          <Link to="/shop" className="text-sm font-medium text-primary hover:underline">Browse shop →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {mockShop.map((s) => (
            <div key={s.id} className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1">
              <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-secondary text-5xl">{s.emoji}</div>
              <h4 className="text-sm font-semibold">{s.title}</h4>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{s.description}</p>
              <p className="mt-3 text-sm font-medium text-primary">{s.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-3xl p-12 text-center text-primary-foreground shadow-[var(--shadow-glow)]" style={{ background: "var(--gradient-hero)" }}>
          <h2 className="font-display text-4xl font-semibold">Step inside the sanctuary.</h2>
          <p className="mx-auto mt-4 max-w-xl opacity-90">Create a free account to ask questions, save teachings, and connect with verified leaders.</p>
          <Link to="/signup" className="mt-8 inline-block rounded-md bg-card px-6 py-3 text-sm font-medium text-foreground hover:opacity-95">
            Create your account
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
