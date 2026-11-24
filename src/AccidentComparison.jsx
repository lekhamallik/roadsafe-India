
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
  { state: "Tamil Nadu", accidents: 64000 },
  { state: "Madhya Pradesh", accidents: 54400 },
  { state: "Kerala", accidents: 44000 },
  { state: "Uttar Pradesh", accidents: 41800 },
  { state: "Karnataka", accidents: 39800 },
  { state: "Maharashtra", accidents: 33300 },
  { state: "Rajasthan", accidents: 23600 },
  { state: "Telangana", accidents: 21600 },
];

export default function AccidentComparison() {
  return (
    <div className="bg-[#151d32] border border-white/10 rounded-2xl p-6 mt-6">
      <h3 className="text-lg font-bold text-white mb-2">
        States with the Most Road Accidents, 2022
      </h3>
      <p className="text-slate-400 text-sm mb-4">
        Top 8 states by accident volume
      </p>

      <div className="h-[380px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 15, right: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" stroke="#94a3b8" />
            <YAxis
              type="category"
              dataKey="state"
              width={125}
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
            <Bar dataKey="accidents" name="Accidents" fill="#4b91c0" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-slate-500 mt-2">
        Values are approximate readings from the supplied chart.
      </p>
    </div>
  );
}
