import ModelsLogo from "@/features/TopModels/ModelsLogo";
import { ModelType } from "@/shared/types/Model";

type Props = {
  data: ModelType[];
}

export default function TopModelsLogos({ data }: Props) {
  return (
    <div className="w-full max-w-4xl h-[200px] flex justify-center mt-[20px]">
      <div className="flex justify-around">
        {data.map((item, index) => (
          <ModelsLogo key={item.name} model={item} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}
