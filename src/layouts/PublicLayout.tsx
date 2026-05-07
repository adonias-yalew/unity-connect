import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>{children}</main>
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sanctum — A multi-faith community.
        </div>
      </footer>
    </div>
  );
}
