"use client";

import { useChangePeriodOnLoad } from "@/shared/hooks/top-models/useChangePeriodOnLoad";
import { useFetchTopModels } from "@/shared/hooks/top-models/useFetchTopModels";
import { useTopModelsStore } from "@/shared/stores/top-models";
import TopModelsChart from "@/widgets/TopModels/Chart";
import TopModelsPeriods from "@/widgets/TopModels/Periods";
import TopModelsTitle from "@/widgets/TopModels/Title";

export default function TopModelsView() {
  useChangePeriodOnLoad();
  useFetchTopModels();

  const { isLoading } = useTopModelsStore();

  return (
    <div className="relative h-[100%] flex flex-col items-center justify-center p-8">
      <div className="w-[93%] flex justify-between items-center mb-[30px]">
        <TopModelsTitle />
        <TopModelsPeriods />
      </div>

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <TopModelsChart />
      )}
    </div>
  );
}
