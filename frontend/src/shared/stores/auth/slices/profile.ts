import { AuthStore } from "..";
import { StateCreator } from "zustand";

export interface ProfileSlice {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  logout: () => void;
}

export const profile: StateCreator<AuthStore, [], [], ProfileSlice> = (set) => ({
  isAuth: false,
  setIsAuth: (isAuth: boolean) => set({ isAuth }),
  logout: () => set({ isAuth: false, user: null }),
});

export default profile;