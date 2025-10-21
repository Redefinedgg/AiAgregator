import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { COLORS } from "../constants";
import { getLogoFromModel } from "@/shared/helpers/getLogoFromModel";
import ModelsLogo from "@/features/Leaderboard/ModelsLogo";
import { useLeaderboardStore } from "@/shared/stores/leaderboard";
import { LOGO_SIZES } from "@/shared/constants/LOGO_SIZES";
import ModelNameLabel from "@/features/Leaderboard/ModelNameLabel";
import ModelMessagesLabel from "@/features/Leaderboard/ModelMessagesLabel";

export default function   LeaderboardChart() {
  const { models } = useLeaderboardStore();

  const sorted = [...models].sort((a, b) => b.messages - a.messages);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={sorted}
        margin={{ top: 110, right: 20, left: 20, bottom: 40 }}
        className="relative"
      >
        <YAxis stroke="#ffffff" tickLine={false} axisLine={false} />

        <Bar dataKey="messages" radius={[10, 10, 0, 0]} className="relative">
          <LabelList
            dataKey="name"
            content={(props) => {
              const { x, y, width, index } = props;
              const model = sorted[index as number];
              const logo = getLogoFromModel(model.name);
              const logoSize = LOGO_SIZES[logo].w + 10;

              if (x === undefined || y === undefined || width === undefined) return null;

              const cx = x as number + Number(width) / 2;
              const topY = y as number - logoSize - 20;

              return (
                <>
                  <ModelsLogo
                    x={cx - logoSize / 2}
                    y={topY}
                    logo={logo}
                    logoSize={logoSize}
                    rank={index as number + 1}
                    className={LOGO_SIZES[logo].className}
                  />
                  <ModelNameLabel
                    x={cx}
                    y={topY + logoSize - 12}
                    name={model.name.charAt(0).toUpperCase() + model.name.slice(1)}
                  />
                  <ModelMessagesLabel
                    x={cx}
                    y={topY + logoSize + 10}
                    messages={model.messages}
                  />
                </>
              );
            }}
          />

          {sorted.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
