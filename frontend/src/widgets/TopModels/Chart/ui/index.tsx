import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { COLORS } from "../constants";
import { ModelType } from "@/shared/types/Model";
import { getLogoFromModel } from "@/shared/helpers/getLogoFromModel";
import ModelsLogo from "@/features/TopModels/ModelsLogo";

type Props = {
  data: ModelType[];
};

export default function TopModelsChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 40, right: 20, left: 20, bottom: 40 }}
      >
        <XAxis
          dataKey="name"
          stroke="#ffffff"
          tick={{ fill: "#ffffff" }}
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          stroke="#ffffff"
          tickLine={false}
          axisLine={false}
        />

        <Bar
          dataKey="messages"
          radius={[10, 10, 0, 0]}
        >
          <LabelList
            dataKey="name"
            content={({ x, y, width, height, value }) => {
              return (
                <ModelsLogo
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  value={value}
                  data={data}
                />
              );
            }}
          />

          <LabelList
            dataKey="messages"
            position="insideTop"
            fill="#fff"
            style={{ fontSize: 18, fontWeight: 600 }}
            offset={70}
          />

          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
