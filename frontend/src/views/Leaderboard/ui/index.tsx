"use client";

import { useChangePeriodOnLoad } from "@/shared/hooks/leaderboard/useChangePeriodOnLoad";
import { useFetchLeaderboard } from "@/shared/hooks/leaderboard/useFetchLeaderboard";
import { useLeaderboardStore } from "@/shared/stores/leaderboard";
import LeaderboardChart from "@/widgets/Leaderboard/Chart";
import LeaderboardPeriods from "@/widgets/Leaderboard/Periods";
import LeaderboardTitle from "@/widgets/Leaderboard/Title";

export default function LeaderboardView() {
  useChangePeriodOnLoad();
  useFetchLeaderboard();

  const { isLoading } = useLeaderboardStore();

  return (
    <div className="relative h-[100%] flex flex-col items-center justify-center p-8">
      <div className="w-[93%] flex justify-between items-center mb-[30px]">
        <LeaderboardTitle />
        <LeaderboardPeriods />
      </div>

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <LeaderboardChart />
      )}
    </div>
  );
}
