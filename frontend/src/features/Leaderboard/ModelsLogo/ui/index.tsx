import { getRankColor } from "@/shared/helpers/getRankColor";

type Props = {
  x?: number;
  y?: number;
  logo?: string;
  logoSize?: number;
  rank: number;
  className?: string;
};

export default function ModelsLogo({ x = 0, y = 0, logoSize = 48, rank, className, logo }: Props) {
  if (logo?.startsWith("google") || logo?.startsWith("Claude")) {
    y = y - 10;
  } else if (logo?.startsWith("qwen") || logo?.startsWith("llama")) {
    y = y + 4;
  }

  return (
    <image
      href={`/logo/${logo}.png?v=${Date.now()}`}
      x={x}
      y={y - 24}
      width={logoSize}
      height={logoSize}
      className={`${className} ${getRankColor(rank)}`}
    />
  );
}

