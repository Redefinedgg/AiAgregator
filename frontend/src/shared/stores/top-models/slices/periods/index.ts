import { Period } from "@/shared/api/top-models/enums";
import { StateCreator } from "zustand";

export interface TopModelsPeriodsSlice {
  selected: Period;
  setSelected: (key: Period) => void;
}

export const topModelsPeriodsSlice: StateCreator<TopModelsPeriodsSlice> = (set) => ({
  selected: Period.ALL,

  setSelected: (key: Period) => set({ selected: key }),
});
