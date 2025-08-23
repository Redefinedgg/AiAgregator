import { AuthStore } from "..";
import User from "@/shared/types/User";
import { StateCreator } from "zustand";

export interface DashboardSlice {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const dashboard: StateCreator<AuthStore, [], [], DashboardSlice> = (
  set
) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
});

export default dashboard;
