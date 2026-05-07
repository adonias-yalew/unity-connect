import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-display font-bold">
            ✦
          </div>
          <span className="font-display text-lg font-semibold">Sanctum</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/community" className="text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-sm text-foreground font-medium" }}>
            Community
          </Link>
          <Link to="/content" className="text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-sm text-foreground font-medium" }}>
            Content
          </Link>
          <Link to="/shop" className="text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-sm text-foreground font-medium" }}>
            Shop
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium text-foreground hover:text-primary">
            Log in
          </Link>
          <Link to="/signup" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-[var(--shadow-glow)]">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
