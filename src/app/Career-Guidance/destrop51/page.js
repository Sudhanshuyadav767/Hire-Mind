
"use client";

import Link from "next/link";
import {
  ArrowLeft,  BookOpen, Check,
  Lightbulb,CircleDollarSign, ChartNoAxesCombined,BriefcaseBusiness, MessageSquareText,ClipboardCheck,  GraduationCap,
} from "lucide-react";

import JobFilters from "@/app/component/Career-guidance/Destrop51/Left";
import JobList from "@/app/component/Career-guidance/Destrop51/Right";

import Header from "@/app/component/common/Header"
import Footer from "@/app/component/common/Footer"

const tabs = [
  { name: "Overview", icon: BookOpen, href: "#overview" },
  { name: "Roadmap", icon: BriefcaseBusiness, href: "#roadmap" },
  { name: "Skills", icon: Lightbulb, href: "#skills" },
  { name: "Courses", icon: GraduationCap, href: "#courses" },
  { name: "Top Jobs", icon: ClipboardCheck, href: "#jobs" },
  { name: "Insights", icon: MessageSquareText, href: "#insights" },
];

export default function DataScientist() {
  return (
   <>
   <Header />
    <main className="min-h-screen bg-white">
      {/* ================= HERO ================= */}
      <section className="border-b border-[#e4e4f5] bg-[#f0f0ff]">
        <div className="mx-auto max-w-[1500px] px-5 pt-8 sm:px-8 lg:px-12">

          {/* Back */}
          <Link href="/Career-Guidance" className="inline-flex items-center gap-2 text-[15px] font-semibold text-gray-700 transition-all duration-200 hover:-translate-x-1 hover:text-[#6457e8]">
            <ArrowLeft size={18} />
            Back to AI Career Guidance
          </Link>

          {/* Main Hero */}
          <div className="flex flex-col items-center justify-between gap-8 pb-8 pt-1 lg:flex-row">

            {/* LEFT */}
            <div className="w-full lg:w-[65%]">
              <div className="mb-3 flex flex-wrap items-center gap-4">
                <h1 className="text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
                  Data Scientist Courses
                </h1>

                <span className="inline-flex items-center rounded-md border border-green-300 bg-green-100 px-4 py-2 text-sm font-semibold text-green-500 shadow-xs">
                  Top Career Match
                </span>
              </div>

              <p className="mb-7 max-w-[680px] text-base leading-7 text-gray-600 sm:text-base">
                Data scientists analyze complex data to help organizations
                make better decisions and build data-driven solutions.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4">

                {/* Demand */}
                <div className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-transform group-hover:scale-110">
                    <BriefcaseBusiness size={19} />
                  </div>
                  <span className="font-semibold text-gray-500">High Demand</span>
                </div>

                {/* Growth */}
                <div className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-md">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-600 transition-transform group-hover:scale-110">
                    <ChartNoAxesCombined size={19} />
                  </div>
                  <span className="font-semibold text-gray-500">High Growth</span>
                </div>

                {/* Salary */}
                <div className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-md">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-transform group-hover:scale-110">
                    <CircleDollarSign size={19} />
                  </div>
                  <span className="font-semibold text-gray-500">Avg. Salary: ₹8–18 LPA</span>
                </div>

              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex w-full justify-center lg:w-[35%] lg:justify-end">
              <img
                src="/Images/Bag2.png"
                alt="Data Scientist"
                className="w-[380px] object-contain "
              />
            </div>

          </div>
        </div>

      </section>
<div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
  <div className="flex w-full overflow-x-auto scrollbar-hide">

    {/* Overview */}
    <div className="relative flex min-w-[120px] flex-1 cursor-pointer items-center justify-center gap-2 px-4 py-4 font-semibold text-[#6254e7]">
      <BookOpen size={20} className="shrink-0" />
      <span className="whitespace-nowrap">Overview</span>

      <div className="absolute bottom-0 left-0 h-[3px] w-full rounded-t-full bg-[#6254e7]" />
    </div>

    {/* Roadmap */}
    <div className="flex min-w-[120px] flex-1 cursor-pointer items-center justify-center gap-2 px-4 py-4 font-semibold text-gray-400 transition hover:text-[#6254e7]">
      <BriefcaseBusiness size={20} className="shrink-0" />
      <span className="whitespace-nowrap">Roadmap</span>
    </div>

    {/* Skills */}
    <div className="flex min-w-[120px] flex-1 cursor-pointer items-center justify-center gap-2 px-4 py-4 font-semibold text-gray-400 transition hover:text-[#6254e7]">
      <Lightbulb size={20} className="shrink-0" />
      <span className="whitespace-nowrap">Skills</span>
    </div>

    {/* Courses */}
    <div className="flex min-w-[120px] flex-1 cursor-pointer items-center justify-center gap-2 px-4 py-4 font-semibold text-gray-400 transition hover:text-[#6254e7]">
      <GraduationCap size={20} className="shrink-0" />
      <span className="whitespace-nowrap">Courses</span>
    </div>

    {/* Top Jobs */}
    <div className="flex min-w-[120px] flex-1 cursor-pointer items-center justify-center gap-2 px-4 py-4 font-semibold text-gray-400 transition hover:text-[#6254e7]">
      <ClipboardCheck size={20} className="shrink-0" />
      <span className="whitespace-nowrap">Top Jobs</span>

     
    </div>

    {/* Insights */}
   <Link href="/Career-Guidance/Destrop52"> <div className="flex min-w-[120px] flex-1 cursor-pointer items-center justify-center gap-2 px-4 py-4 font-semibold text-gray-400 transition hover:text-[#6254e7]">
      <MessageSquareText size={20} className="shrink-0" />
      <span className="whitespace-nowrap">Insights</span>
    </div> </Link>

  </div>
</div>

<div className="mx-auto mt-6 flex w-full max-w-7xl flex-col gap-8 px-6 md:flex-row lg:px-8">

  {/* ================= LEFT FILTER ================= */}
  <aside className="w-full shrink-0 md:w-[300px]">
    <JobFilters />
  </aside>

  {/* ================= RIGHT JOBS ================= */}
  <section className="mb-4 min-w-0 flex-1">
    <JobList />
  </section>

</div>

</main>
<Footer />
</>
  )
}