import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { COLORS } from "../constants";
import { ModelType } from "@/shared/types/Model";

type Props = {
  data: ModelType[];
}

export default function TopModelsChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 50, right: 20, left: 20, bottom: 40 }}
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
            dataKey="messages"
            position="insideTop"
            fill="#fff"
            style={{ fontSize: 24, fontWeight: 600 }}
          />

          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>

  );
}
