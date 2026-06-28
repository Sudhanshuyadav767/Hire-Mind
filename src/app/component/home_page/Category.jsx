"use client";

import {
  Code2,
  PenTool,
  Megaphone,
  Database,
  BriefcaseBusiness,
  Ellipsis,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    title: "Development",
    jobs: "24,000 Jobs",
    icon: Code2,
    bg: "bg-blue-500",
  },
  {
    title: "Design",
    jobs: "12,000 Jobs",
    icon: PenTool,
    bg: "bg-orange-100",
  },
  {
    title: "Marketing",
    jobs: "12,000 Jobs",
    icon: Megaphone,
    bg: "bg-yellow-100",
  },
  {
    title: "Data Science",
    jobs: "12,000 Jobs",
    icon: Database,
    bg: "bg-indigo-200",
  },
  {
    title: "Business",
    jobs: "12,000 Jobs",
    icon: BriefcaseBusiness,
    bg: "bg-blue-200",
  },
  {
    title: "More",
    jobs: "See ALL",
    icon: Ellipsis,
    bg: "bg-violet-200",
  },
];

export default function TopCategories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-14">

      {/* Heading */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-poppins font-medium text-[#1D1B20]">
          Top Categories
        </h2>

        <button className="flex items-center gap-2 text-[#433FE3] font-semibold hover:gap-3 transition-all">
          View All Categories
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        {categories.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-7 flex flex-col items-center justify-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-5`}
              >
                <Icon
                  size={30}
                  className={
                    item.title === "Development"
                      ? "text-white"
                      : "text-gray-700"
                  }
                />
              </div>

              {/* Title */}
              <h3 className="text-xl  font-poppins font-medium text-[#1D1B20] text-center">
                {item.title}
              </h3>

              {/* Jobs */}
              <p className="text-gray-500 mt-2 text-base">
                {item.jobs}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}