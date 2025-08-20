import { StateCreator } from "zustand";
import { createHydrationSlice } from "../../middlewares/hydrationMiddleware";
import { HydrationSlice } from "../../middlewares/hydrationMiddleware";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const createPersistedStore = <T extends object>(
  name: string,
  stateCreator: StateCreator<T & HydrationSlice, [], [], T>
) => {
  return create<T & HydrationSlice>()(
    persist(
      (set, get, store) => ({
        ...stateCreator(set, get, store),
        ...createHydrationSlice<T>()(set, get, store),
      }),
      {
        name,
        storage: createJSONStorage(() => {
          if (typeof window !== "undefined") {
            return localStorage;
          }
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      }
    )
  );
};