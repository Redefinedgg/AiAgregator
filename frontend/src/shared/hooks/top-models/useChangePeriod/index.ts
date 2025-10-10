import { Period } from "@/shared/api/top-models/enums";
import { useTopModelsStore } from "@/shared/stores/top-models"
import { useRouter, useSearchParams } from "next/navigation";

export const useChangePeriod = () => {
  const { setSelected } = useTopModelsStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const changePeriod = (period: Period) => {
    setSelected(period);

    const params = new URLSearchParams(searchParams);
    params.set("period", period);
    router.replace(`/top-models?${params.toString()}`);
  }

  return { changePeriod }
}
