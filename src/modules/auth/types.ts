export type Religion = "orthodox" | "muslim" | "protestant";
export type Role = "user" | "leader" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  religion: Religion;
  role: Role;
  verified?: boolean;
}
