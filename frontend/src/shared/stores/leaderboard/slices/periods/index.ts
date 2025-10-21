import { Period } from "@/shared/api/leaderboard/enums";
import { StateCreator } from "zustand";

export interface LeaderboardPeriodsSlice {
  selected: Period;
  setSelected: (key: Period) => void;
}

export const leaderboardPeriodsSlice: StateCreator<LeaderboardPeriodsSlice> = (set) => ({
  selected: Period.ALL,

  setSelected: (key: Period) => set({ selected: key }),
});
