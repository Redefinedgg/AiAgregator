"use client";

import { Period } from "@/shared/api/leaderboard/enums";
import { useChangePeriod } from "@/shared/hooks/leaderboard/useChangePeriod";
import { useLeaderboardStore } from "@/shared/stores/leaderboard";
import Button from "@/shared/ui/Button";
import clsx from "clsx";

type Props = {
  period: Period;
  index: number;
  length: number;
}

export default function PeriodButton({ period, index, length }: Props) {
  const { selected } = useLeaderboardStore();
  const { changePeriod } = useChangePeriod();

  return (
    <Button
      key={period}
      label={period.toUpperCase()}
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
