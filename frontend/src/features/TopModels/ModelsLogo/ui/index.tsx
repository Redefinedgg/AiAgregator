import { getLogoFromModel } from "@/shared/helpers/getLogoFromModel";
import { ModelType } from "@/shared/types/Model";

type Props = {
  x: string | number | undefined;
  y: string | number | undefined;
  width: string | number | undefined;
  height: string | number | undefined;
  value: string | number | undefined;
  data: ModelType[];
}

export default function ModelsLogo({ x, y, width, height, value, data }: Props) {
  if (x === undefined || y === undefined || width === undefined || height === undefined) return null;

  const model = data.find(m => m.name === value);
  if (!model) return null;

  const cx = Number(x) + Number(width) / 2 - 60 / 2;
  const cy = Number(y) + 5;

  return (
    <image
      href={`/logo/${getLogoFromModel(model.name)}.png`}
      x={cx}
      y={cy}
      width="60"
      height="60"
      clipPath="circle(30px at center)"
    />
  );
}
