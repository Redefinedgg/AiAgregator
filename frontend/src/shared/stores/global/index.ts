import { createPersistedStore } from "@/shared/hooks/createPersistedStore";
export interface GlobalStore {
  // State
  isClient: boolean;

  // Actions
  setIsClient: (isClient: boolean) => void;
}

export const useGlobalStore = createPersistedStore<GlobalStore>("globalStore", (set) => ({
  // State
  isClient: false,
  // Actions
  setIsClient: (isClient: boolean) => set({ isClient }),
}));
