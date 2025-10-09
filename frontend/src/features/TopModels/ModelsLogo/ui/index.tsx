import { getLogoFromModel } from "@/shared/helpers/getLogoFromModel";
import { getRankColor } from "@/shared/helpers/getRankColor";
import { ModelType } from "@/shared/types/Model";

type Props = {
  x?: number;
  y?: number;
  width?: number;
  value?: string | number;
  data: ModelType[];
  logoSize: number;
  rank: number;
  className?: string;
};

export default function ModelsLogo({ x, y, width, value, data, logoSize, rank, className }: Props) {
  if (x === undefined || y === undefined || width === undefined) return null;

  const model = data.find((m) => m.name === value);
  if (!model) return null;

  const logo = getLogoFromModel(model.name);

  // Центрируем по ширине бара
  const cx = x + width / 2 - logoSize / 2;
  const cy = y - logoSize; // немного выше бара

  return (
    <image
      href={`/logo/${logo}.png?v=${Date.now()}`}
      x={cx}
      y={cy - 24}
      width={logoSize}
      height={logoSize}
      className={`${className} ${getRankColor(rank)}`}
    />
  );
}

