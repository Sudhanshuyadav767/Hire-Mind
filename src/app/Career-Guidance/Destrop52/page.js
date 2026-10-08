
"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  CircleDollarSign,
  ClipboardCheck,
  GraduationCap,
  Lightbulb,
  MessageSquareText,
} from "lucide-react";

// Components
import JobMarketOverview from "@/app/component/Career-guidance/Destrop52/Overview";
import JobMarketStats from "@/app/component/Career-guidance/Destrop52/TopLocation";
import ExperienceIndustry from "@/app/component/Career-guidance/Destrop52/Experiencelevel";
import KeyInsights from "@/app/component/Career-guidance/Destrop52/Insights";

import Header from "@/app/component/common/Header";
import Footer from "@/app/component/common/Footer";

const tabs = [
  {
    name: "Overview",
    icon: BookOpen,
    href: "#overview",
  },
  {
    name: "Roadmap",
    icon: BriefcaseBusiness,
    href: "#roadmap",
  },
  {
    name: "Skills",
    icon: Lightbulb,
    href: "#skills",
  },
  {
    name: "Courses",
    icon: GraduationCap,
    href: "#courses",
  },
  {
    name: "Top Jobs",
    icon: ClipboardCheck,
    href: "#jobs",
  },
  {
    name: "Insights",
    icon: MessageSquareText,
    href: "#insights",
  },
];

export default function DataScientist() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        {/* ================= HERO SECTION ================= */}
        <section className="border-b border-[#e4e4f5] bg-[#f0f0ff]">
          <div className="mx-auto max-w-[1500px] px-5 pt-8 sm:px-8 lg:px-12">
            {/* Back Navigation */}
            <Link
              href="/Career-Guidance"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-gray-700 transition-all duration-200 hover:-translate-x-1 hover:text-[#6457e8]"
            >
              <ArrowLeft size={18} />
              <span>Back to AI Career Guidance</span>
            </Link>

            {/* Hero Content */}
            <div className="flex flex-col items-center justify-between gap-8 pb-8 pt-4 lg:flex-row">
              {/* Left Content */}
              <div className="w-full lg:w-[65%]">
                {/* Title */}
                <div className="mb-3 flex flex-wrap items-center gap-4">
                  <h1 className="text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
                    Data Scientist Insights
                  </h1>

                  <span className="inline-flex items-center rounded-md border border-green-300 bg-green-100 px-4 py-2 text-sm font-semibold text-green-600 shadow-sm">
                    Top Career Match
                  </span>
                </div>

                {/* Description */}
                <p className="mb-7 max-w-[680px] text-base leading-7 text-gray-600">
                  Data scientists analyze complex data to help organizations
                  make better decisions and build data-driven solutions.
                </p>

                {/* Career Stats */}
                <div className="flex flex-wrap gap-4">
                  {/* Demand */}
                  <div className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                      <BriefcaseBusiness size={19} />
                    </div>

                    <span className="font-semibold text-gray-500">
                      High Demand
                    </span>
                  </div>

                  {/* Growth */}
                  <div className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-md">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-600 transition-transform duration-300 group-hover:scale-110">
                      <ChartNoAxesCombined size={19} />
                    </div>

                    <span className="font-semibold text-gray-500">
                      High Growth
                    </span>
                  </div>

                  {/* Salary */}
                  <div className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-md">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-transform duration-300 group-hover:scale-110">
                      <CircleDollarSign size={19} />
                    </div>

                    <span className="font-semibold text-gray-500">
                      Avg. Salary: ₹8–18 LPA
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="flex w-full justify-center lg:w-[35%] lg:justify-end">
                <img
                  src="/Images/destrop.png"
                  alt="Data Scientist career illustration"
                  className="w-[300px] object-contain sm:w-[340px] lg:w-[380px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= CAREER NAVIGATION ================= */}
        <nav
          aria-label="Career sections"
          className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-8"
        >
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex w-full overflow-x-auto scrollbar-hide">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = index === 0;

                return (
                  <a
                    key={tab.name}
                    href={tab.href}
                    className={`relative flex min-w-[120px] flex-1 items-center justify-center gap-2 px-4 py-4 font-semibold transition-colors duration-200 ${
                      isActive
                        ? "text-[#6254e7]"
                        : "text-gray-400 hover:text-[#6254e7]"
                    }`}
                  >
                    <Icon size={20} className="shrink-0" />

                    <span className="whitespace-nowrap">
                      {tab.name}
                    </span>

                    {isActive && (
                      <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-t-full bg-[#6254e7]" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </nav>

        {/* ================= CAREER OVERVIEW ================= */}
        <section
          id="overview"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          {/* Job Market Overview */}
          <div className="mb-5 mt-6">
            <JobMarketOverview />
          </div>

          {/* Top Locations / Job Market Stats */}
          <div className="mb-5">
            <JobMarketStats />
          </div>

          {/* Experience & Industry */}
          <div className="mb-5">
            <ExperienceIndustry />
          </div>
     

        {/* ================= INSIGHTS ================= */}
        <section id="insights" className="mt-5 mb-4" >
          <KeyInsights />
        </section>
           </section>
      </main>

      <Footer />
    </>
  );
}



