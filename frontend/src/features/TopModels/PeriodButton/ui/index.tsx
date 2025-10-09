"use client";

import { Period } from "@/shared/api/top-models/enums";
import { useChangePeriod } from "@/shared/hooks/top-models/useChangePeriod";
import { useTopModelsStore } from "@/shared/stores/top-models";
import Button from "@/shared/ui/Button";
import clsx from "clsx";

type Props = {
  period: Period;
  index: number;
  length: number;
}

export default function PeriodButton({ period, index, length }: Props) {
  const { selected } = useTopModelsStore();
  const { changePeriod } = useChangePeriod();

  return (
    <Button
      key={period}
      label={period}
      selected={selected === period}
      onClick={() => changePeriod(period)}
      defaultBorder={false}
      className={clsx(
        "rounded-none !px-[20px] text-[16px]",
        index !== length - 1 && "border-r border-r-[#E9E9E9]"
      )}
    />
  );
}
