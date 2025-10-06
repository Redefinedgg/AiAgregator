import { Model } from "@/shared/types/Model";
import { StateCreator } from "zustand";

export interface TopModelsSlice {
  models: Model[];
  isLoading: boolean;
  setModels: (models: Model[]) => void;
  setIsLoading: (loading: boolean) => void;
}

export const topModelsSlice: StateCreator<TopModelsSlice> = (set) => ({
  models: [],
  isLoading: true,

  setModels: (models: Model[]) => set({ models: models }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading })
});
