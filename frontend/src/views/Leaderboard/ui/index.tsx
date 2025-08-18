"use client";

import { useMemo, useState } from "react";
import Button from "@/shared/ui/Button";



type Model = {
  id: string;
  name: string;
  provider: string;
  power: number; 
  speed: number; 
  cost: number; 
  context: number; 
  params: number; 
};

const DEMO_MODELS: Model[] = [
  {
    id: "gpt-35",
    name: "GPT-3.5",
    provider: "OpenAI",
    power: 68,
    speed: 150,
    cost: 1.5,
    context: 16_000,
    params: 175,
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o-mini",
    provider: "OpenAI",
    power: 82,
    speed: 180,
    cost: 2.2,
    context: 128_000,
    params: 350,
  },
  {
    id: "gpt-turbo",
    name: "GPT Turbo",
    provider: "OpenAI",
    power: 74,
    speed: 190,
    cost: 1.2,
    context: 128_000,
    params: 200,
  },
  {
    id: "sonnet-4",
    name: "Sonnet 4",
    provider: "Anthropic",
    power: 86,
    speed: 160,
    cost: 2.9,
    context: 200_000,
    params: 400,
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek-V3",
    provider: "DeepSeek",
    power: 88,
    speed: 220,
    cost: 0.9,
    context: 131_072,
    params: 671,
  },
];

type SortKey = keyof Pick<Model, "power" | "speed" | "cost" | "context" | "params" | "name" | "provider">;

export default function LeaderboardView() {
  const [sortKey, setSortKey] = useState<SortKey>("power");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState<string>("all");

  const providers = useMemo(
    () => ["all", ...Array.from(new Set(DEMO_MODELS.map((m) => m.provider)))],
    []
  );

  const data = useMemo(() => {
    let rows = DEMO_MODELS.filter((m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.provider.toLowerCase().includes(query.toLowerCase())
    );

    if (provider !== "all") rows = rows.filter((m) => m.provider === provider);

    rows.sort((a, b) => {
      const av = a[sortKey] as any;
      const bv = b[sortKey] as any;
      if (typeof av === "string" && typeof bv === "string") {
        return sortDir === "asc"
          ? av.localeCompare(bv)
          : bv.localeCompare(av);
      }
      return sortDir === "asc" ? av - bv : bv - av;
    });

    return rows;
  }, [sortKey, sortDir, query, provider]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "name" || key === "provider" ? "asc" : "desc");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h2 className="text-[28px] font-bold bg-gradient-to-r from-[#8B07FF] to-[#FF00DD] bg-clip-text text-transparent">
          AI Models Leaderboard
        </h2>

        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by model or provider"
            className="bg-[#070708] text-[#E9E9E9] border border-[#E9E9E9] rounded-[12px] px-3 py-2 outline-none w-[220px]"
          />

          <select
            className="bg-[#070708] text-[#E9E9E9] border border-[#E9E9E9] rounded-[12px] px-3 py-2 outline-none"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            {providers.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <Button
            label={`Sort: ${sortKey} (${sortDir})`}
            onClick={() => toggleSort(sortKey)}
            className="h-[44px]"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-[#2a2d36] rounded-[12px] overflow-hidden">
          <thead className="bg-[#0e1016]">
            <tr>
              <Th onClick={() => toggleSort("name")} active={sortKey === "name"} dir={sortDir}>
                Model
              </Th>
              <Th onClick={() => toggleSort("provider")} active={sortKey === "provider"} dir={sortDir}>
                Provider
              </Th>
              <Th onClick={() => toggleSort("power")} active={sortKey === "power"} dir={sortDir}>
                Power
              </Th>
              <Th onClick={() => toggleSort("speed")} active={sortKey === "speed"} dir={sortDir}>
                Speed
              </Th>
              <Th onClick={() => toggleSort("cost")} active={sortKey === "cost"} dir={sortDir}>
                Cost ($/1M)
              </Th>
              <Th onClick={() => toggleSort("context")} active={sortKey === "context"} dir={sortDir}>
                Context
              </Th>
              <Th onClick={() => toggleSort("params")} active={sortKey === "params"} dir={sortDir}>
                Params (B)
              </Th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((m) => (
              <tr key={m.id} className="border-t border-[#2a2d36] hover:bg-[#0e1016]">
                <Td>{m.name}</Td>
                <Td>{m.provider}</Td>
                <Td>
                  <span className="font-semibold">{m.power}</span>
                </Td>
                <Td>{m.speed}</Td>
                <Td>{m.cost}</Td>
                <Td>{m.context.toLocaleString()}</Td>
                <Td>{m.params}</Td>
                <Td>
                  <div className="flex gap-2">
                    <Button label="Benchmark" defaultBorder={false} />
                    <Button label="Compare" defaultBorder={false} />
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2 flex-wrap">
        <span className="opacity-70 text-sm">Quick sort:</span>
        <Button label="Power" onClick={() => { setSortKey("power"); setSortDir("desc"); }} />
        <Button label="Speed" onClick={() => { setSortKey("speed"); setSortDir("desc"); }} />
        <Button label="Cheapest" onClick={() => { setSortKey("cost"); setSortDir("asc"); }} />
        <Button label="Context" onClick={() => { setSortKey("context"); setSortDir("desc"); }} />
      </div>
    </div>
  );
}

function Th({ children, onClick, active, dir }: { children: React.ReactNode; onClick?: () => void; active?: boolean; dir?: "asc" | "desc" }) {
  return (
    <th
      onClick={onClick}
      className="text-left px-4 py-3 select-none cursor-pointer whitespace-nowrap"
    >
      <span className={active ? "text-[#C89EFF]" : undefined}>{children}</span>
      {active && <span className="ml-1 opacity-70">{dir === "asc" ? "↑" : "↓"}</span>}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-3 whitespace-nowrap">{children}</td>;
}
