import { getLogoFromModel } from "@/shared/helpers/getLogoFromModel";
import { ModelType } from "@/shared/types/Model";
import { LOGO_SIZES } from "@/shared/constants/LOGO_SIZES";
import { Model } from "@/shared/api/ai/enums";

type Props = {
  x?: number;
  y?: number;
  width?: number;
  value?: string | number;
  data: ModelType[];
  logoSize: number;
  className?: string;
};

export default function ModelsLogo({ x, y, width, value, data, logoSize, className }: Props) {
  if (x === undefined || y === undefined || width === undefined) return null;

  const model = data.find((m) => m.name === value);
  if (!model) return null;

  const logo = getLogoFromModel(model.name);
  const logoW = LOGO_SIZES[logo].w;
  const logoH = LOGO_SIZES[logo].h;

  // Центрируем по ширине бара
  const cx = x + width / 2 - logoSize / 2;
  const cy = y - logoSize; // немного выше бара

  return (
    <image
      href={`/logo/${logo}.png`}
      x={cx}
      y={cy-24}
      width={logoSize}
      height={logoSize}
      clipPath="circle(70px at center)"
      className={className}
    />
  );
}

