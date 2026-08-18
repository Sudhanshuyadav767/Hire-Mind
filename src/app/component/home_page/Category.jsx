"use client";

import Link from "next/link";
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
    <section className="home-section home-categories max-w-7xl mx-auto px-6 py-14 select-none">

      {/* Heading */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-poppins font-medium text-[#1D1B20]">
          Top Categories
        </h2>

        <Link href="/categories">
          <button className="flex items-center gap-2 text-[#2D24D0] font-semibold hover:gap-3 transition-all cursor-pointer">
            <span>View All Categories</span>
            <ArrowRight size={18} />
          </button>
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="home-swiper flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-3 lg:grid-cols-6 gap-6">

        {categories.map((item, index) => {
          const Icon = item.icon;

          const CardContent = (
            <div
              className="bg-white border border-gray-200 rounded-2xl p-7 flex flex-col items-center justify-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full w-full"
            >
              {/* Icon Container */}
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
              <h3 className="text-lg font-poppins font-medium text-[#1D1B20] text-center">
                {item.title}
              </h3>

              {/* Jobs Count */}
              <p className="text-gray-500 mt-2 text-xs font-semibold">
                {item.jobs}
              </p>
            </div>
          );

          return item.title === "More" ? (
            <Link key={index} href="/categories" className="snap-start min-w-[180px] md:min-w-0 block h-full">
              {CardContent}
            </Link>
          ) : (
            <div key={index} className="snap-start min-w-[180px] md:min-w-0 h-full">
              {CardContent}
            </div>
          );
        })}
      </div>
    </section>
  );
}
