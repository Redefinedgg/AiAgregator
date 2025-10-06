"use client";

import { useFetchTopModels } from "@/shared/hooks/useFetchTopModels";
import { useTopModelsStore } from "@/shared/stores/top-models";
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { COLORS } from "../constants";

type Props = {
  period: string | undefined;
}

export default function ModelsChart({ period }: Props) {
  useFetchTopModels(period);

  const { models, isLoading } = useTopModelsStore();

  const sorted = [...models].sort((a, b) => b.messages - a.messages);

  return (
    <>
      {isLoading && (
        <ResponsiveContainer width="100%" height="400">
          <BarChart data={sorted}>
            <XAxis
              dataKey="name"
              tick={{ fill: "white", fontSize: 14 }}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "white", fontSize: 14 }}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="messages" radius={[10, 10, 0, 0]}>
              <LabelList dataKey="messages" position="top" fill="white" />
              {sorted.map((_, index) => (
                <Cell key={index} fill={COLORS[index & COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
}
