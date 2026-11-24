
import React from "react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

const cluster1 = [
  { state: "Bihar", x: 13, y: 80, size: 80 },
  { state: "Punjab", x: 5, y: 77, size: 70 },
  { state: "Jharkhand", x: 9, y: 73, size: 60 },
  { state: "Meghalaya", x: 0, y: 70, size: 40 },
  { state: "Arunachal Pradesh", x: -20, y: 59, size: 35 },
  { state: "Uttarakhand", x: 19, y: 62, size: 50 },
];

const cluster2 = [
  { state: "Uttar Pradesh", x: 11, y: 55, size: 100 },
  { state: "Gujarat", x: 4, y: 48, size: 80 },
  { state: "Haryana", x: 5, y: 47, size: 65 },
  { state: "Odisha", x: 6, y: 47, size: 60 },
  { state: "Rajasthan", x: 13, y: 48, size: 75 },
  { state: "West Bengal", x: 14, y: 47, size: 80 },
  { state: "Maharashtra", x: 14, y: 46, size: 100 },
  { state: "Assam", x: -5, y: 41, size: 60 },
  { state: "Chhattisgarh", x: 7, y: 42, size: 60 },
  { state: "Himachal Pradesh", x: 8, y: 41, size: 45 },
  { state: "Andhra Pradesh", x: -1, y: 38, size: 70 },
  { state: "Telangana", x: 2, y: 35, size: 65 },
  { state: "Karnataka", x: 15, y: 29, size: 85 },
  { state: "Tamil Nadu", x: 15, y: 28, size: 85 },
  { state: "Delhi", x: 20, y: 27, size: 55 },
  { state: "Madhya Pradesh", x: 11, y: 25, size: 75 },
  { state: "Puducherry", x: 13, y: 14, size: 35 },
  { state: "Ladakh", x: 14, y: 14, size: 30 },
  { state: "Nagaland", x: -35, y: 10, size: 40 },
  { state: "Goa", x: 6, y: 9, size: 50 },
  { state: "Kerala", x: 32, y: 10, size: 70 },
];

const cluster3 = [
  { state: "Mizoram", x: 93, y: 83, size: 30 },
  { state: "D & N Haveli", x: 40, y: 53, size: 35 },
  { state: "Tripura", x: 20, y: 41, size: 35 },
  { state: "Chandigarh", x: 14, y: 39, size: 30 },
  { state: "Sikkim", x: 36, y: 39, size: 35 },
  { state: "Manipur", x: 39, y: 28, size: 40 },
  { state: "A & N Islands", x: 22, y: 13, size: 30 },
];

function PointLabel(props) {
  const { x, y, value } = props;
  return (
    <text x={x + 5} y={y + 4} fontSize={11} fill="#334155">
      {value}
    </text>
  );
}

export default function KMeansChart() {
  return (
    <div className="bg-[#151d32] border border-white/10 rounded-2xl p-6 mt-6">
      <h3 className="text-lg font-bold text-white mb-2">
        States grouped by size, change and severity (K-means)
      </h3>
      <p className="text-slate-400 text-sm mb-4">
        Accident change, severity and accident volume across states
      </p>

      <div className="h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 35, bottom: 35, left: 15 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              type="number"
              dataKey="x"
              domain={[-40, 100]}
              stroke="#94a3b8"
              label={{
                value: "Change in accidents, 2021 to 2022 (%)",
                position: "insideBottom",
                offset: -20,
                fill: "#cbd5e1",
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[5, 90]}
              stroke="#94a3b8"
              label={{
                value: "Deaths per 100 accidents",
                angle: -90,
                position: "insideLeft",
                fill: "#cbd5e1",
              }}
            />
            <ZAxis type="number" dataKey="size" range={[100, 650]} />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                backgroundColor: "#151d32",
                border: "1px solid #475569",
                borderRadius: 10,
                color: "white",
              }}
              formatter={(value, name) => [value, name]}
              labelFormatter={() => ""}
            />

            <Scatter name="Cluster 1" data={cluster1} fill="#a855c7">
              <LabelList dataKey="state" content={<PointLabel />} />
            </Scatter>

            <Scatter name="Cluster 2" data={cluster2} fill="#48b5ad">
              <LabelList dataKey="state" content={<PointLabel />} />
            </Scatter>

            <Scatter name="Cluster 3" data={cluster3} fill="#facc15">
              <LabelList dataKey="state" content={<PointLabel />} />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <p className="text-xs text-slate-500 mt-3">
        Illustrative reconstruction from the supplied K-means chart.
        Coordinates and bubble sizes are approximate.
      </p>
    </div>
  );
}
