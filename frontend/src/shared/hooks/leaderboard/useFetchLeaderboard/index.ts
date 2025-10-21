import { Period } from "@/shared/api/leaderboard/enums";
import { getLeaderboard } from "@/shared/api/leaderboard/requests";
import { useLeaderboardStore } from "@/shared/stores/leaderboard"
import { useSearchParams } from "next/navigation";
import { useEffect } from "react"

export const useFetchLeaderboard = () => {
  const { setModels, setIsLoading } = useLeaderboardStore();
  const searchParams = useSearchParams();
  const period = searchParams.get("period") || Period.ALL;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        const data = await getLeaderboard(period);
        setModels(data.models);
      } catch (err) {
        console.error(`Failed to fetch leaderboard: ${err}`);
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboard();
  }, [period])
}
