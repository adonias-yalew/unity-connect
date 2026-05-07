import type { Religion, Role, User } from "../types";

const KEY = "faith_app_user";

export const authService = {
  getUser(): User | null {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  },
  login(email: string, _password: string): User {
    // Mock: admin@demo.com -> admin, leader@demo.com -> leader
    const role: Role = email.startsWith("admin")
      ? "admin"
      : email.startsWith("leader")
        ? "leader"
        : "user";
    const user: User = {
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
      religion: "orthodox",
      role,
      verified: role === "leader",
    };
    window.localStorage.setItem(KEY, JSON.stringify(user));
    return user;
  },
  signup(name: string, email: string, _password: string, religion: Religion): User {
    const user: User = {
      id: crypto.randomUUID(),
      name,
      email,
      religion,
      role: "user",
    };
    window.localStorage.setItem(KEY, JSON.stringify(user));
    return user;
  },
  logout() {
    window.localStorage.removeItem(KEY);
  },
};
