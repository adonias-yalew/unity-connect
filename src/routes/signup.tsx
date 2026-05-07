import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PublicLayout } from "@/layouts/PublicLayout";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import type { Religion } from "@/modules/auth/types";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

const religions: { value: Religion; label: string; glyph: string }[] = [
  { value: "orthodox", label: "Orthodox", glyph: "☦" },
  { value: "muslim", label: "Muslim", glyph: "☾" },
  { value: "protestant", label: "Protestant", glyph: "✝" },
];

function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [religion, setReligion] = useState<Religion | "">("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!religion) return;
    signup(name, email, password, religion);
    navigate({ to: "/app/dashboard" });
  };

  return (
    <PublicLayout>
      <div className="mx-auto flex max-w-md flex-col px-6 py-16">
        <h1 className="font-display text-3xl font-semibold">Join Sanctum</h1>
        <p className="mt-2 text-sm text-muted-foreground">Begin your journey in one quiet place.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Name</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-input bg-card px-4 py-2.5 text-sm focus:border-ring focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-input bg-card px-4 py-2.5 text-sm focus:border-ring focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-md border border-input bg-card px-4 py-2.5 text-sm focus:border-ring focus:outline-none" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Religion <span className="text-destructive">*</span></label>
            <div className="grid grid-cols-3 gap-2">
              {religions.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setReligion(r.value)}
                  className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-xs transition-all ${
                    religion === r.value
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <span className="text-2xl">{r.glyph}</span>
                  {r.label}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" disabled={!religion} className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-40">
            Create account
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already a member? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </PublicLayout>
  );
}
