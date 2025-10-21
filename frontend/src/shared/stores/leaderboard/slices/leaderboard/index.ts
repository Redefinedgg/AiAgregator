import { ModelType } from "@/shared/types/Model";
import { StateCreator } from "zustand";

export interface LeaderboardSlice {
  models: ModelType[];
  isLoading: boolean;
  setModels: (models: ModelType[]) => void;
  setIsLoading: (loading: boolean) => void;
}

export const leaderboardSlice: StateCreator<LeaderboardSlice> = (set) => ({
  models: [],
  isLoading: true,

  setModels: (models: ModelType[]) => set({ models: models }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading })
});
