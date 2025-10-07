"use client";

import { useFetchTopModels } from "@/shared/hooks/useFetchTopModels";
import { useTopModelsStore } from "@/shared/stores/top-models";
import TopModelsChart from "@/widgets/TopModels/Chart";
import TopModelsLogos from "@/widgets/TopModels/Logos";
import TopModelsTitle from "@/widgets/TopModels/Title";

type Props = {
  period: string | undefined;
}

export default function TopModelsView({ period }: Props) {
  useFetchTopModels(period);

  const { models, isLoading } = useTopModelsStore();

  const sorted = [...models].sort((a, b) => b.messages - a.messages);

  return (
    <div className="h-[100%] flex flex-col items-center justify-center p-8">
      <TopModelsTitle />

      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <TopModelsLogos data={sorted} />
          <TopModelsChart data={sorted} />
        </>
      )}
    </div>
  );
}
