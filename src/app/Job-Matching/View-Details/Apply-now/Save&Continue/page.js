import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Applynow as ApplyNowData } from "@/Data/job-matching";
import Page from "@/app/component/Apply-now/SaveContinue/Left";
import Page1 from "@/app/component/Apply-now/SaveContinue/Right";

export default function SaveAndContinue() {
  return (
    <>
      {/* HERO / JOB HEADER */}
      <section className="w-full bg-[#f0efff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 mt-15">

          {/* Back to Job */}
          <Link
            href="/Job-Matching"
            className="group inline-flex items-center gap-2 text-black hover:text-indigo-600 transition-all duration-200"
          >
            <ArrowLeft
              size={20}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />

            <span>Back to Job</span>
          </Link>

          {/* Job Details */}
          {ApplyNowData.map((item, index) => (
            <div key={index} className="mt-4 sm:mt-6">

              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                {item.apply}
              </h1>

              <div
                className="
                  flex flex-col sm:flex-row
                  sm:items-center
                  sm:gap-6
                  gap-2
                  mt-2
                "
              >
                <span className="text-sm sm:text-base text-gray-500">
                  🏢 {item.company}
                </span>

                <span className="text-sm sm:text-base text-gray-500">
                  📍 {item.location}
                </span>

                <span className="text-sm sm:text-base text-gray-500">
                  ⏰ {item.jobtype}
                </span>
              </div>

            </div>
          ))}

        </div>
      </section>

 {/* Main Content */}
      <div
        className="flex flex-col lg:flex-row max-w-7xl mx-auto   mt-4 sm:mt-6gap-4 sm:gap-6 px-3 sm:px-4 items-stretch"
       >
        {/* Left */}
        <div className="w-full lg:flex-1 min-w-0 mb-4">
          <Page />
        </div>

        {/* Right */}
        <div className="w-full lg:w-[420px] lg:shrink-0">
          <Page1 />
        </div>

      </div>
    </>
  );
}