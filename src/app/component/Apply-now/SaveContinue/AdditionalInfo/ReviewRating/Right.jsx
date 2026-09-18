
"use client";

import { jobData } from "@/Data/job-matching";
import Image from "next/image";
export default function Page3() {
  return (
    <div className="bg-white w-full min-h-screen">

      {/* Top Background */}
      <div className="absolute top-0 left-0 w-full h-[140px] sm:h-[170px] bg-[#eeeeff]" />

      <main className="relative z-10 w-full max-w-[430px] mx-auto px-3 sm:px-4 pt-[10px] sm:pt-[12px] pb-8">

        {/* Job Summary */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 sm:p-6">

          <h2 className="text-[17px] sm:text-[18px] font-bold text-gray-900">
            Job Summary
          </h2>

          {/* Job Title */}
          <div className="mt-5 sm:mt-6 flex items-center">
            <div>
                <Image
                src="/logo/Google.png"
                alt=""
                width={100}
                height={100}
                className="object-contain"
                />
            </div>
            <div>
            <h1 className="text-[18px] sm:text-[20px] font-bold leading-6">
              {jobData.title}
            </h1>

            <p className="text-gray-400 text-sm sm:text-base mt-2">
              {jobData.company}
            </p>
            </div>
          </div>

          {/* Job Details */}
          <div className="grid grid-cols-2 gap-y-6 sm:gap-y-8 mt-8 sm:mt-10 text-xs sm:text-[16px]">

            <span className="text-gray-500">
              Job Type
            </span>

            <span className="text-right break-words">
              {jobData.jobType}
            </span>

            <span className="text-gray-500">
              Experience
            </span>

            <span className="text-right break-words">
              {jobData.experience}
            </span>

            <span className="text-gray-500">
              Location
            </span>

            <span className="text-right break-words">
              {jobData.location}
            </span>

            <span className="text-gray-500">
              Salary
            </span>

            <span className="text-right break-words">
              {jobData.salary}
            </span>

          </div>

          <hr className="my-5 sm:my-6" />

          {/* Match Score */}
          <h3 className="font-semibold text-sm">
            Your Match Score
          </h3>

          <div className="flex justify-center mt-5">

            <div
              className="relative w-[95px] h-[95px] sm:w-[105px] sm:h-[105px]
              rounded-full
              bg-[conic-gradient(#4338e8_87%,#eeeeee_0)]
              flex items-center justify-center"
            >

              <div
                className="w-[74px] h-[74px] sm:w-[82px] sm:h-[82px]
                bg-white rounded-full
                flex flex-col items-center justify-center"
              >

                <span className="text-[25px] sm:text-[28px] font-bold">
                  {jobData.matchScore}
                </span>

                <span className="text-[11px] sm:text-xs text-gray-500">
                  /100
                </span>

              </div>
            </div>
          </div>

          <p className="text-center text-green-500 font-semibold text-xs sm:text-sm mt-3">
            ★ Excellent Match
          </p>

        </section>


        {/* Application Progress */}
        <section className="bg-white border border-gray-200 shadow-sm mt-4 sm:mt-5 p-4 sm:p-6 rounded-xl">

          <h2 className="text-[17px] sm:text-[18px] font-bold">
            Application Progress
          </h2>

          <div className="mt-6 sm:mt-7 space-y-8 sm:space-y-10">

            {jobData.progress.map((item, index) => (

              <div
                key={index}
                className="flex items-center gap-3 sm:gap-5"
              >

                {/* Number */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10
                  flex-shrink-0 rounded-full
                  flex items-center justify-center
                  font-semibold text-xs sm:text-sm
                  ${
                    index === 3
                      ? "bg-[#4338e8] text-white"
                      : "bg-[#eeeeff] text-gray-500"
                  }`}
                >
                  {item.number}
                </div>

                {/* Text */}
                <div className="min-w-0">

                  <h3 className="font-semibold text-xs sm:text-sm break-words">
                    {item.title}
                  </h3>

                  <p
                    className={`text-[11px] sm:text-xs mt-1 break-words
                    ${
                      index === 3
                        ? "text-[#4338e8]"
                        : "text-gray-500"
                    }`}
                  >
                    {item.status}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </section>


        {/* Need Help */}
        <section className="bg-[#e5e5ff] border border-gray-300 mt-4 sm:mt-5 p-4 sm:p-6 rounded-xl">

          <h2 className="text-[17px] sm:text-[18px] font-bold">
            Need Help?
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 mt-5 sm:mt-6 leading-5">
            Our AI career assistant is here to help
            you at every step.
          </p>

          <button
            className="mt-5 sm:mt-10 w-full sm:w-auto
            bg-[#4338e8] text-white
            px-5 py-3 rounded-md
            text-xs sm:text-sm
            shadow-sm hover:bg-[#352bd0]
            transition"
          >
            Chat with AI Assistant
          </button>

        </section>

      </main>

    </div>
  );
}

