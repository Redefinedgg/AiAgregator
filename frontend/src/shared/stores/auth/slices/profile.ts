import { AuthStore } from "..";
import { StateCreator } from "zustand";

export interface ProfileSlice {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
}

export const profile: StateCreator<AuthStore, [], [], ProfileSlice> = (set) => ({
  isAuth: false,
  setIsAuth: (isAuth: boolean) => set({ isAuth }),
});

export default profile;