
"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  jobMarketData,
  jobDemandData,
  salaryData,
} from "@/Data/data5";

export default function JobMarketOverview() {
  return (
    <div className="w-full">
      {/* ================================================= */}
      {/* MAIN GRID */}
      {/* ================================================= */}

      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12">

        {/* ================================================= */}
        {/* JOB MARKET */}
        {/* ================================================= */}

        <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 md:col-span-2 lg:col-span-5">

          {/* Header */}
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                {jobMarketData.title}
              </h2>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                {jobMarketData.subtitle}
              </p>
            </div>

            {/* Period */}
            <button
              type="button"
              className="flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 sm:px-3 sm:text-sm"
            >
              <span>{jobMarketData.period}</span>

              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>

          {/* Area Chart */}
          <div className="h-[220px] w-full sm:h-[230px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={jobMarketData.openings}
                margin={{
                  top: 10,
                  right: 5,
                  left: -10,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="jobGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#6366f1"
                      stopOpacity={0.18}
                    />

                    <stop
                      offset="100%"
                      stopColor="#6366f1"
                      stopOpacity={0.03}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  vertical={false}
                  stroke="#eeeeee"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#9ca3af",
                    fontSize: 10,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  width={35}
                  tick={{
                    fill: "#9ca3af",
                    fontSize: 10,
                  }}
                  tickFormatter={(value) => {
                    if (value === 0) {
                      return "0";
                    }

                    if (value >= 1000) {
                      return `${value / 1000}K`;
                    }

                    return value;
                  }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                    boxShadow:
                      "0 5px 20px rgba(0,0,0,0.08)",
                  }}
                  formatter={(value) => [
                    Number(value).toLocaleString("en-IN"),
                    "Openings",
                  ]}
                />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  fill="url(#jobGradient)"
                  dot={{
                    r: 3,
                    fill: "#ffffff",
                    stroke: "#4f46e5",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 5,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ================================================= */}
        {/* JOB DEMAND */}
        {/* ================================================= */}

        <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 md:col-span-1 lg:col-span-3">

          {/* Title */}
          <h2 className="text-base font-bold text-gray-900 sm:text-lg">
            {jobDemandData.title}
          </h2>

          {/* Gauge */}
          <div className="relative mx-auto mt-4 w-full max-w-[210px]">
            <div className="aspect-[220/130] w-full">

              <svg
                viewBox="0 0 220 130"
                className="h-full w-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Background */}
                <path
                  d="M 20 110 A 90 90 0 0 1 200 110"
                  fill="none"
                  stroke="#d1d5db"
                  strokeWidth="24"
                  strokeLinecap="butt"
                />

                {/* Progress */}
                <path
                  d="M 20 110 A 90 90 0 0 1 200 110"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="24"
                  strokeLinecap="butt"
                  pathLength="100"
                  strokeDasharray={`${jobDemandData.score * 10} 100`}
                />
              </svg>

              {/* Score */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
                <span className="text-2xl font-bold text-gray-900">
                  {jobDemandData.score}
                </span>

                <span className="mt-0.5 text-xs font-semibold text-indigo-600">
                  {jobDemandData.label}
                </span>
              </div>
            </div>
          </div>

          {/* Growth */}
          <div className="mt-3 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 rounded-md bg-emerald-100 px-3 py-1.5 text-emerald-600">
              <span className="text-base font-bold">
                ↗️
              </span>

              <span className="font-semibold">
                {jobDemandData.growth}%
              </span>
            </div>

            <p className="mt-2 max-w-[220px] text-xs leading-5 text-gray-500">
              {jobDemandData.growthText}
            </p>
          </div>
        </div>

        {/* ================================================= */}
        {/* SALARY */}
        {/* ================================================= */}

        <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 md:col-span-1 lg:col-span-4">

          {/* Title */}
          <h2 className="text-base font-bold text-gray-900 sm:text-lg">
            {salaryData.title}
          </h2>

          {/* Salary */}
          <div className="mt-5 flex items-center justify-between gap-4">

            <div className="min-w-0">
              <h3 className="break-words text-xl font-bold text-gray-900 sm:text-2xl">
                {salaryData.salary}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {salaryData.subtitle}
              </p>
            </div>

            {/* Circle */}
            <div className="h-12 w-12 shrink-0 rounded-full bg-emerald-100 sm:h-16 sm:w-16" />
          </div>

          {/* Growth */}
          <div className="mt-5 flex flex-wrap items-center gap-2">

            <div className="inline-flex items-center gap-2 rounded-md bg-emerald-100 px-3 py-1.5 text-emerald-600">
              <span className="text-base font-bold">
                ↗️
              </span>

              <span className="font-semibold">
                {salaryData.growth}%
              </span>
            </div>

            <span className="text-xs text-gray-500">
              {salaryData.growthText}
            </span>
          </div>

          {/* Salary Range */}
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-gray-500">
              Salary Range:
            </span>

            <span className="font-medium text-gray-700">
              {salaryData.range}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


