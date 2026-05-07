import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { authService } from "../services/authService";
import type { Religion, User } from "../types";

interface AuthCtx {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => User;
  signup: (name: string, email: string, password: string, religion: Religion) => User;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(authService.getUser());
    setLoading(false);
  }, []);

  const value: AuthCtx = {
    user,
    loading,
    login: (e, p) => {
      const u = authService.login(e, p);
      setUser(u);
      return u;
    },
    signup: (n, e, p, r) => {
      const u = authService.signup(n, e, p, r);
      setUser(u);
      return u;
    },
    logout: () => {
      authService.logout();
      setUser(null);
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
