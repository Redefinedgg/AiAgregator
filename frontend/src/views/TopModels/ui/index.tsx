"use client";

import { useFetchTopModels } from "@/shared/hooks/useFetchTopModels";
import { useTopModelsStore } from "@/shared/stores/top-models";
import TopModelsChart from "@/widgets/TopModels/Chart";
import TopModelsTitle from "@/widgets/TopModels/Title";

type Props = {
  period?: string;
};

export default function TopModelsView({ period }: Props) {
  useFetchTopModels(period);

  const { isLoading } = useTopModelsStore();

  return (
    <div className="h-[100%] flex flex-col items-center justify-center p-8">
      <TopModelsTitle />

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <TopModelsChart />
        </>
      )}
    </div>
  );
}
