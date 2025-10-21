import { createPersistedStore } from "@/shared/helpers/createPersistedStore";
import { leaderboardSlice, LeaderboardSlice } from "./slices/leaderboard";
import { LeaderboardPeriodsSlice, leaderboardPeriodsSlice } from "./slices/periods";

interface LeaderboardStore extends LeaderboardSlice, LeaderboardPeriodsSlice { }

export const useLeaderboardStore = createPersistedStore<LeaderboardStore>(
  "leaderboardStore",
  (set, get, ...args) => ({
    ...leaderboardSlice(set, get, ...args),
    ...leaderboardPeriodsSlice(set, get, ...args)
  })
);
