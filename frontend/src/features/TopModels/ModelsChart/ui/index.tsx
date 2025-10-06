import { useFetchTopModels } from "@/shared/hooks/useFetchTopModels";
import { useTopModelsStore } from "@/shared/stores/top-models";
import { ResponsiveContainer } from "recharts";

type Props = {
  period: string | undefined;
}

export default function ModelsChart({ period }: Props) {
  useFetchTopModels();

  const { models, isLoading } = useTopModelsStore();

  return (
    <ResponsiveContainer width="100%" height="400">

    </ResponsiveContainer>
  );
}
