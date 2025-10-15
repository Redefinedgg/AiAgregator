import { Period } from "@/shared/api/top-models/enums";
import { useTopModelsStore } from "@/shared/stores/top-models";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react"

export const useChangePeriodOnLoad = () => {
  const { setSelected } = useTopModelsStore();
  const searchParams = useSearchParams();
  const periodString = searchParams.get("period");

  useEffect(() => {
    let periodEnum: Period = Period.ALL;

    switch (periodString) {
      case Period.YEAR:
        periodEnum = Period.YEAR;
        break;
      case Period.MONTH:
        periodEnum = Period.MONTH;
        break;
      case Period.DAY:
        periodEnum = Period.DAY;
        break;
      default:
        periodEnum = Period.ALL;
        break;
    }

    setSelected(periodEnum);
  }, [periodString]);
}
