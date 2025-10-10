import { ModelType } from "@/shared/types/Model";
import { StateCreator } from "zustand";

export interface TopModelsSlice {
  models: ModelType[];
  isLoading: boolean;
  setModels: (models: ModelType[]) => void;
  setIsLoading: (loading: boolean) => void;
}

export const topModelsSlice: StateCreator<TopModelsSlice> = (set) => ({
  models: [],
  isLoading: true,

  setModels: (models: ModelType[]) => set({ models: models }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading })
});
