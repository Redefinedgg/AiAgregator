import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { COLORS } from "../constants";
import { ModelType } from "@/shared/types/Model";
import { getLogoFromModel } from "@/shared/helpers/getLogoFromModel";
import ModelsLogo from "@/features/TopModels/ModelsLogo";
import { useTopModelsStore } from "@/shared/stores/top-models";
import { LOGO_SIZES } from "@/shared/constants/LOGO_SIZES";
import { Model } from "@/shared/api/ai/enums";

export default function TopModelsChart() {
  const { models } = useTopModelsStore();

  const sorted = [...models].sort((a, b) => b.messages - a.messages);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={sorted}
        margin={{ top: 110, right: 20, left: 20, bottom: 40 }}
        className="relative"
      >
        <XAxis
          dataKey="name"
          stroke="#ffffff"
          tick={{ fill: "#ffffff" }}
          tickLine={false}
          axisLine={false}
        />

        <YAxis stroke="#ffffff" tickLine={false} axisLine={false} />

        <Bar dataKey="messages" radius={[10, 10, 0, 0]} className="relative">
          <LabelList
            dataKey="name"
            content={(props) => (
              <ModelsLogo
                x={props.x as number}
                y={props.y as number}
                width={props.width as number}
                value={props.value as string}
                data={sorted}
                logoSize={
                  LOGO_SIZES[getLogoFromModel(props.value as Model)].w + 10
                }
                className={LOGO_SIZES[getLogoFromModel(props.value as Model)].className}
              />
            )}
          />

          <LabelList
            dataKey="messages"
            position="insideTop"
            fill="#fff"
            style={{ fontSize: 18, fontWeight: 600 }}
            offset={70}
          />

          {sorted.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
