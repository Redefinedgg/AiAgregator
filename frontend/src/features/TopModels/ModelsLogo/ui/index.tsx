import Image from "next/image";
import { getLogoFromModel } from "@/shared/helpers/getLogoFromModel";
import { getRankColor } from "@/shared/helpers/getRankColor";
import { ModelType } from "@/shared/types/Model";

type Props = {
  model: ModelType;
  rank: number;
}

export default function ModelsLogo({ model, rank }: Props) {
  return (
    <div className={`flex flex-col items-center w-20 ml-[20px]`}>
      <Image
        src={`/logo/${getLogoFromModel(model.name)}.png`}
        alt={model.name}
        width={60}
        height={60}
        className={`rounded-full ${getRankColor(rank)}`}
      />
    </div>
  );
}
