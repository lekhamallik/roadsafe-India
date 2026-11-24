
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { state: "Bihar", rate: 82.2 },
  { state: "Punjab", rate: 77.5 },
  { state: "Jharkhand", rate: 75.3 },
  { state: "Uttarakhand", rate: 62.2 },
  { state: "Uttar Pradesh", rate: 54.0 },
  { state: "Gujarat", rate: 48.3 },
  { state: "Haryana", rate: 47.2 },
  { state: "Rajasthan", rate: 47.1 },
];

export default function DeathRateComparison() {
  return (
    <div className="bg-[#151d32] border border-white/10 rounded-2xl p-6 mt-6">
      <h3 className="text-lg font-bold text-white mb-2">
        Highest Deaths per 100 Accidents, 2022
      </h3>
      <p className="text-slate-400 text-sm mb-4">
        States with 500+ accidents
      </p>

      <div className="h-[380px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 15, right: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" domain={[0, 90]} stroke="#94a3b8" />
            <YAxis
              type="category"
              dataKey="state"
              width={115}
              stroke="#cbd5e1"
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#151d32",
                border: "1px solid #475569",
                borderRadius: 10,
                color: "white",
              }}
            />
            <Bar dataKey="rate" name="Deaths per 100 accidents" fill="#c62828" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-slate-500 mt-2">
        Values are approximate readings from the supplied chart.
      </p>
    </div>
  );
}
