"use client";

import {
  TrendingUp,
  Banknote,
  Building2,
  Lightbulb,
} from "lucide-react";

import { keyInsights } from "@/Data/data5";

const iconMap = {
  growth: TrendingUp,
  salary: Banknote,
  cities: Building2,
  skills: Lightbulb,
};

export default function KeyInsights() {
  return (
    <section className="w-full">
      <div className="rounded-xl border border-gray-200 bg-white px-6 py-6 shadow-sm">

        {/* Heading */}
        <h2 className="mb-7 text-xl font-semibold text-gray-800">
          Key Insights
        </h2>

        {/* Insights */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-4">

          {keyInsights.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <div
                key={item.id}
                className="flex items-center gap-5"
              >
                {/* Icon Circle */}
                <div
                  className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full
                    ${
                      item.icon === "growth"
                        ? "bg-green-100 text-green-500"
                        : item.icon === "salary"
                        ? "bg-indigo-100 text-indigo-500"
                        : item.icon === "cities"
                        ? "bg-orange-100 text-orange-500"
                        : "bg-purple-100 text-purple-500"
                    }`}
                >
                  <Icon size={38} strokeWidth={2} />
                </div>

                {/* Text */}
                <p className="text-sm leading-6 text-gray-600">
                  {item.text}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}