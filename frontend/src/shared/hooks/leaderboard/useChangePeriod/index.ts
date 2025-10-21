import { Period } from "@/shared/api/leaderboard/enums";
import { useLeaderboardStore } from "@/shared/stores/leaderboard"
import { useRouter, useSearchParams } from "next/navigation";

export const useChangePeriod = () => {
  const { setSelected } = useLeaderboardStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const changePeriod = (period: Period) => {
    setSelected(period);

    const params = new URLSearchParams(searchParams);
    params.set("period", period);
    router.replace(`/leaderboard?${params.toString()}`);
  }

  return { changePeriod }
}
