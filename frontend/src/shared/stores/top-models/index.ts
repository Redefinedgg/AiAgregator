import { createPersistedStore } from "@/shared/helpers/createPersistedStore";
import { topModelsSlice, TopModelsSlice } from "./slices/top-models";
import { TopModelsPeriodsSlice, topModelsPeriodsSlice } from "./slices/periods";

interface TopModelsStore extends TopModelsSlice, TopModelsPeriodsSlice { }

export const useTopModelsStore = createPersistedStore<TopModelsStore>(
  "topModelsStore",
  (set, get, ...args) => ({
    ...topModelsSlice(set, get, ...args),
    ...topModelsPeriodsSlice(set, get, ...args)
  })
);
