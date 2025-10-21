import ModelsLogo from "@/features/Leaderboard/ModelsLogo";
import { ModelType } from "@/shared/types/Model";

type Props = {
  data: ModelType[];
}

export default function LeaderboardLogos({ data }: Props) {
  return (
    <div className="w-full max-w-4xl h-[200px] flex justify-center mt-[20px]">
      <div className="flex justify-around">
        {data.map((item, index) => (
          <ModelsLogo key={item.name} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}
