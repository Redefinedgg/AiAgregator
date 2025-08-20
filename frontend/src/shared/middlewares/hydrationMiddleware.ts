// middleware/hydrationMiddleware.ts
import { StateCreator } from "zustand";

// Интерфейс для гидратации
export interface HydrationSlice {
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

// Middleware для добавления функционала гидратации
export const createHydrationSlice = <T>(): StateCreator<
  T & HydrationSlice,
  [],
  [],
  HydrationSlice
> => (set) => ({
  _hasHydrated: false,
  setHasHydrated: (state: boolean) => {
    set({
      _hasHydrated: state
    } as Partial<T & HydrationSlice>);
  },
});