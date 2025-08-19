import { createPersistedStore } from "@/shared/helpers/createPersistedStore";
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
