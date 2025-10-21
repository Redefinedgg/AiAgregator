import { PERIODS } from "../constants";
import PeriodButton from "@/features/Leaderboard/PeriodButton";

export default function LeaderboardPeriods() {
  return (
    <div className="inline-flex border border-[#E9E9E9] rounded-[12px] overflow-hidden h-[45px]">
      {PERIODS.map((period, index) => (
        <PeriodButton
          key={period}
          period={period}
          index={index}
          length={PERIODS.length}
        />
      ))}
    </div>
  );
}
