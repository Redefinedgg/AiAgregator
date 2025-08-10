import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ScreenStore {
  // State
  height: number;
  width: number;

  // Actions
  setHeight: (height: number) => void;
  setWidth: (width: number) => void;
}

export const useScreenStore = create<ScreenStore>()(
  persist(
    (set) => ({
      // State
      height: 0,
      width: 0,

      // Actions
      setHeight: (height: number) => set({ height }),
      setWidth: (width: number) => set({ width }),
    }),
    {
      name: "screenStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
