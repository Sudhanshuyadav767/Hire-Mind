import {
  Check,
  MapPin,
  Briefcase,
  IndianRupee,
  Bookmark,
} from "lucide-react";

import { jobmatching } from "@/Data/data";

export default function JobMatching1() {
  return (
    <>
      {/* ================= MATCH SUMMARY ================= */}
      
      <div className="w-full flex flex-col md:flex-row gap-5 lg:gap-6 border rounded-xl shadow-sm bg-[#F3F0FF] p-4 sm:p-5">
        
        {/* Score */}
        <div className="flex items-center justify-center px-2 sm:px-4 py-4 lg:py-6 shrink-0">
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 border-4 rounded-full border-blue-600 flex items-center justify-center"
            style={{
              background:
                "conic-gradient(#2563eb 87%, #e5e7eb 87%)",
            }}
          >
            <div className="text-center">
              <h2 className="text-3xl font-semibold leading-none">
                87
              </h2>
              <p className="text-sm font-medium leading-none mt-1">
                /100
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-4 text-center md:text-left">
            Great! You have a strong match with several job opportunities
          </h2>

          <div className="flex flex-col lg:flex-row gap-4 mt-4 items-start lg:items-center">
            
            <div className="w-full lg:flex-1">
              
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-green-600">
                  <Check size={18} className="text-white" strokeWidth={3} />
                </span>
                <span className="text-sm sm:text-base">
                  Your skills align well with these roles
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-green-600">
                  <Check size={18} className="text-white" strokeWidth={3} />
                </span>
                <span className="text-sm sm:text-base">
                  High career growth potential
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-green-600">
                  <Check size={18} className="text-white" strokeWidth={3} />
                </span>
                <span className="text-sm sm:text-base">
                  Better chances of getting hired
                </span>
              </div>

            </div>

            <div className="w-full lg:w-auto">
              <button className="w-full lg:w-auto bg-white text-blue-600 rounded-xl border border-gray-600 shadow-sm px-4 py-3 sm:px-6 sm:py-4">
                Retake Assessment
              </button>
            </div>

          </div>
        </div>
      </div>


      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 w-full">
        
        <div>
          <h2 className="text-xl font-medium">
            Top Matched Jobs
          </h2>

          <p className="text-gray-600">
            Jobs ranked by AI match score
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <span className="text-gray-600 font-medium whitespace-nowrap">
            Sort by:
          </span>

          <select className="outline-none bg-white text-sm border rounded-lg px-3 py-2 w-full sm:w-auto">
            <option>Best Match</option>
          </select>
        </div>
      </div>


      {/* ================= JOB LIST ================= */}
      <div className="mt-4 flex flex-col gap-4 w-full">

        {jobmatching.map((item, index) => (

          <div
            key={index}
            className="
              w-full
              min-w-0
              bg-white
              border
              rounded-xl
              p-4 sm:p-5
              shadow-sm
              hover:shadow-md
              transition
              flex flex-col
              lg:flex-row
              gap-5
            "
          >

            {/* ================= LEFT SIDE ================= */}
            <div className="flex gap-4 items-start min-w-0 flex-1">

              {/* Image */}
              <img
                src={item.image}
                alt={item.companyname}
                width={80}
                height={80}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0"
              />

              {/* Job Details */}
              <div className="min-w-0 flex-1">

                <h2 className="text-lg font-semibold break-words">
                  {item.jobtype}
                </h2>

                <p className="text-gray-500 flex items-center gap-1">
                  {item.companyname}
                  <span className="text-blue-500">✔️</span>
                </p>

                {/* Job Info */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600 mt-2">

                  <span className="flex items-center gap-1">
                    <MapPin size={16} />
                    {item.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <Briefcase size={16} />
                    {item.experience}
                  </span>

                  <span className="flex items-center gap-1">
                    <IndianRupee size={16} />
                    {item.package}
                  </span>

                </div>


                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">

                  {[1, 2, 3, 4, 5].map((num) => (
                    <span
                      key={num}
                      className="px-3 py-1 border rounded-xl text-sm"
                      style={{
                        color: "blue",
                        backgroundColor: "#DDD0FF",
                      }}
                    >
                      {item[`buttontype${num}`]}
                    </span>
                  ))}

                </div>

              </div>
            </div>


            {/* ================= RIGHT SIDE ================= */}
            <div
              className="
                w-full
                lg:w-auto
                lg:min-w-[180px]
                flex
                flex-row
                lg:flex-col
                justify-between
                lg:justify-start
                items-center
                lg:items-end
                gap-4
                border-t
                lg:border-t-0
                pt-4
                lg:pt-0
              "
            >

              {/* Match */}
              <div className="flex flex-col items-start lg:items-end shrink-0">

                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-semibold">
                  {item.matching}
                </div>

                <p className="text-green-600 text-sm whitespace-nowrap">
                  ★ Excellent Match
                </p>

              </div>


              {/* Actions */}
              <div className="flex flex-col items-end gap-2 shrink-0">

                <Bookmark
                  size={20}
                  className="text-gray-400 cursor-pointer"
                />

                <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg whitespace-nowrap">
                  View Details
                </button>

                <button
                  className="text-sm font-medium whitespace-nowrap"
                  style={{ color: "blue" }}
                >
                  Why this match? →
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>
      
    </>
  );
}