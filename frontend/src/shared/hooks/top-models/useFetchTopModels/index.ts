import { Period } from "@/shared/api/top-models/enums";
import { getTopModels } from "@/shared/api/top-models/requests";
import { useTopModelsStore } from "@/shared/stores/top-models"
import { useSearchParams } from "next/navigation";
import { useEffect } from "react"

export const useFetchTopModels = () => {
  const { setModels, setIsLoading } = useTopModelsStore();
  const searchParams = useSearchParams();
  const period = searchParams.get("period") || Period.ALL;

  useEffect(() => {
    const fetchTopModels = async () => {
      try {
        setIsLoading(true);
        const data = await getTopModels(period);
        setModels(data.models);
      } catch (err) {
        console.error(`Failed to fetch top models: ${err}`);
      } finally {
        setIsLoading(false)
      }
    }

    fetchTopModels();
  }, [])
}
