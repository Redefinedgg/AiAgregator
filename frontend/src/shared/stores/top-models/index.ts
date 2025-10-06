import { createPersistedStore } from "@/shared/helpers/createPersistedStore";
import { topModelsSlice, TopModelsSlice } from "./slices/top-models";

interface TopModelsStore extends TopModelsSlice { }

export const useTopModelsStore = createPersistedStore<TopModelsStore>(
  "topModelsStore",
  (set, get, ...args) => ({
    ...topModelsSlice(set, get, ...args)
  })
);
