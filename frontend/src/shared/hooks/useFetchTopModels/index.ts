import { getTopModels } from "@/shared/api/top-models/requests";
import { useTopModelsStore } from "@/shared/stores/top-models"
import { useEffect } from "react"

export const useFetchTopModels = () => {
  const { setModels, setIsLoading } = useTopModelsStore();

  useEffect(() => {
    const fetchTopModels = async (period?: string) => {
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
