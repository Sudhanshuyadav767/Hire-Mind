
"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  experienceLevelData,
  totalJobOpenings,
  industryDemandData,
} from "@/Data/data5";

// Donut chart colors
const experienceColors = [
  "#4038E5",
  "#2498E5",
  "#0DB83B",
  "#FCAF17",
];

export default function ExperienceIndustry() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {/* ================================================= */}
      {/* JOB OPENINGS BY EXPERIENCE LEVEL */}
      {/* ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-900">
            Job Openings by Experience Level
          </h2>

          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[10px] text-gray-400">
            i
          </span>
        </div>

        {/* Chart + Legend */}
        <div className="mt-6 grid grid-cols-1 items-center gap-5 sm:grid-cols-2">
          {/* Donut Chart */}
          <div className="relative h-[230px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={experienceLevelData}
                  dataKey="openings"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={0}
                  stroke="none"
                >
                  {experienceLevelData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={experienceColors[index]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [
                    Number(value).toLocaleString("en-IN"),
                    "Openings",
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Text */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">
                {Number(totalJobOpenings).toLocaleString("en-IN")}
              </span>

              <span className="mt-1 text-xs text-gray-500">
                Total Openings
              </span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-6">
            {experienceLevelData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  {/* Color Dot */}
                  <span
                    className="h-4 w-4 shrink-0 rounded-full"
                    style={{
                      backgroundColor: experienceColors[index],
                    }}
                  />

                  <span className="text-sm text-gray-700">
                    {item.name}
                  </span>
                </div>

                <span className="whitespace-nowrap text-sm font-medium text-gray-700">
                  {item.percentage}% ({item.openings})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* INDUSTRY WISE DEMAND */}
      {/* ================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">
              Industry Wise Demand
            </h2>

            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[10px] text-gray-400">
              i
            </span>
          </div>

          {/* Dropdown */}
          <button className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-600">
            <span>By Job Openings</span>

            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>

        {/* Bar Chart */}
        <div className="mt-6 h-[285px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={industryDemandData}
              margin={{
                top: 25,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              {/* Grid */}
              <CartesianGrid
                vertical={false}
                stroke="#e5e7eb"
              />

              {/* X Axis */}
              <XAxis
                dataKey="industry"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#6b7280",
                  fontSize: 11,
                }}
              />

              {/* Y Axis */}
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 5000]}
                ticks={[
                  0,
                  1000,
                  2000,
                  3000,
                  4000,
                  5000,
                ]}
                tick={{
                  fill: "#9ca3af",
                  fontSize: 11,
                }}
                tickFormatter={(value) => {
                  if (value === 0) return "0";
                  return `${value / 1000}K`;
                }}
              />

              {/* Tooltip */}
              <Tooltip
                cursor={{
                  fill: "rgba(99,102,241,0.05)",
                }}
                formatter={(value) => [
                  Number(value).toLocaleString("en-IN"),
                  "Job Openings",
                ]}
              />

              {/* Bars */}
              <Bar
                dataKey="openings"
                fill="#4038E5"
                radius={[0, 0, 0, 0]}
                barSize={55}
                label={{
                  position: "top",
                  fill: "#1f2937",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


