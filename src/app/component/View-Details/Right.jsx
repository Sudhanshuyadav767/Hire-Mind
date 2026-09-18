"use client";
import { ArrowRight, Users, Building2, Globe2, BadgeCheck } from "lucide-react";
import { jobMatchingData1 } from "@/Data/job-matching";
import { jobDetails } from "@/Data/job-matching";
import { skills } from "@/Data/data";
import dynamic from "next/dynamic";
import Image from "next/image";

const CircularProgressbar = dynamic(
  () =>
    import("react-circular-progressbar").then(
      (mod) => mod.CircularProgressbar
    ),
  { ssr: false }
);
function CompanyRow({ icon: Icon, label, value }) {
  return (
    <div className="grid grid-cols-[40px_1fr] sm:grid-cols-[50px_1fr_1fr] items-center gap-3 sm:gap-4">
      
      {/* Icon */}
      <div className="flex items-center justify-start">
        <Icon
          className="h-6 w-6 text-indigo-400"
          strokeWidth={1.8}
        />
      </div>

      {/* Label */}
      <p className="text-sm sm:text-base font-medium text-gray-500">
        {label}
      </p>

      {/* Value */}
      <p className="col-start-2 sm:col-start-auto text-sm sm:text-base font-semibold text-gray-800">
        {value}
      </p>

    </div>
  );
}

import "react-circular-progressbar/dist/styles.css";
import { BiRightArrow } from "react-icons/bi";

export default function Right() {
  return (
    <div className="space-y-4">

      {/* Match Score */}
      <div className="bg-white border border-slate-100 rounded-2xl sm:px-6 sm:py-6 px-4 py-4">

        <h2 className="font-bold sm:text-base text-sm">
          Your Match Score
        </h2>

        <div className="flex items-center justify-center sm:mt-6 mt-4">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">

            <CircularProgressbar
              value={87}
              strokeWidth={6}
              styles={{
                path: {
                  stroke: "#3F37FF",
                  strokeLinecap: "round",
                },
                trail: {
                  stroke: "#F5F5F5",
                },
              }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-xl sm:text-2xl font-bold leading-none">
                87
              </h2>

              <p className="text-xs sm:text-sm text-gray-400">
                /100
              </p>
            </div>

          </div>
        </div>

        <p className="text-center mt-2">
          Excellent Match
        </p>

        <h2 className="sm:text-base text-sm font-medium mt-5">
          Match breakdown
        </h2>

        <div className="w-full space-y-4 mt-4">

          {jobMatchingData1.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3"
            >

              {/* Title */}
              <p className="text-sm font-semibold text-gray-800 w-[120px] sm:w-[150px] shrink-0">
                {item.title}
              </p>

              {/* Progress */}
              <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">

                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{
                    width: `${item.score}%`,
                  }}
                />

              </div>

              {/* Score */}
              <p className="text-sm sm:text-base font-semibold text-gray-500 w-[55px] shrink-0 text-right">
                {item.score}/100
              </p>

            </div>
          ))}

        </div>

      </div>


      {/* Top Matched Skills */}
      <div className="w-full min-w-0 border border-slate-100 rounded-2xl p-4 sm:p-6 shadow-sm bg-white">

        <h2 className="text-sm sm:text-sm font-bold mb-6">
          Top Matched Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">

          {skills.map((skill, index) => (

            <div
              key={index}
              className="flex min-w-0 overflow-hidden rounded-xl bg-[#F3F0FF]"
            >

              <span className="px-3 sm:px-3 py-2 bg-indigo-200 text-indigo-500 font-semibold truncate min-w-0 flex-1 sm:text-sm">
                {skill.name}
              </span>

              <span className="px-3 sm:px-3 py-2 bg-indigo-200 text-indigo-500 font-semibold shrink-0 sm:text-sm">
                {skill.percent}
              </span>

            </div>

          ))}

        </div>
   <button className="group text-indigo-600 text-sm flex items-center justify-center gap-1 mt-4 transition-all duration-300 hover:text-indigo-700 hover:translate-x-1">
  <span>View All Skills</span>
  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
</button>
      </div>

   
      <div className="w-full max-w-4xl space-y-6">

      {/* ================= JOB DETAILS ================= */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        
        <h2 className="mb-8 text-sm font-bold text-gray-900">
          Job details
        </h2>

        <div className="space-y-6">
          {jobDetails.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="grid grid-cols-[40px_1fr] sm:grid-cols-[50px_1fr_1fr] items-center gap-2 sm:gap-4"
              >
                {/* Icon */}
                <div className="flex items-center justify-start">
                  <Icon
                    className="h-6 w-6 text-indigo-400"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Label */}
                <p className="text-xs sm:text-sm font-medium text-gray-500">
                  {item.label}
                </p>

                {/* Value */}
                <p className="col-start-2 sm:col-start-auto text-xs sm:text-sm font-semibold text-gray-800">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= COMPANY ================= */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">

        <h2 className="mb-8 text-sm font-bold text-gray-900">
          About the Company
        </h2>

        {/* Company Header */}
        <div className="flex items-start gap-5">

          {/* Google Logo */}
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-white">
            <Image
            src="/logo/google.jpg"
            alt=""
            width={100}
            height={100}
            className="object-contain"
            
            />
          </div>

          {/* Company Info */}
          <div className="pt-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-gray-900">
                Google
              </h3>

              <BadgeCheck
                className="h-5 w-5 fill-blue-500 text-white"
              />
            </div>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Google is a multinational technology company that
              specializes in Internet-related services and products.
            </p>
          </div>
        </div>

        {/* Company Details */}
        <div className="mt-8 space-y-6">

          {/* Company Size */}
          <CompanyRow
            icon={Users}
            label="Company Size"
            value="10,000+ Employees"
          />

          {/* Industry */}
          <CompanyRow
            icon={Globe2}
            label="Industry"
            value="Internet Services"
          />

          {/* Founded */}
          <CompanyRow
            icon={Building2}
            label="Founded"
            value="1998"
          />

        </div>

        {/* Website */}
        <button className="mt-8 flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-all duration-200 hover:gap-3 hover:text-indigo-700">
        
          Visit Website
          <ArrowRight className="h-4 w-4" />
        </button>

      </div>
    </div>
 </div>
  );
}