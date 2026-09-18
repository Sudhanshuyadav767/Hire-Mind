"use client";

import { learningData } from "@/Data/data1";

export default function LearningRecommendations1() {
  return (
    <div className="w-full bg-white p-4 md:p-6">

      {/* ================= TABS ================= */}
      <div className="flex gap-8 border-b border-gray-200">
        <button className="border-b-2 border-[#4438df] pb-2 text-sm font-semibold text-[#4438df]">
          Recommended For You
        </button>

        <button className="pb-2 text-sm font-semibold text-gray-400">
          All Courses
        </button>
      </div>

      {/* ================= MATCH CARD ================= */}
      <div className="mt-4 rounded-2xl border border-gray-300 bg-[#eeeeff] p-5 md:p-6">

        <div className="flex flex-col items-center gap-6 md:flex-row">

          {/* MATCH CIRCLE */}
          <div className="relative flex h-35 w-35 shrink-0 items-center justify-center rounded-full border-[8px] border-[#4338df] bg-white">

            <div className="text-center">
              <p className="text-3xl font-bold text-black">
                {learningData.match}%
              </p>

              <p className="text-base text-gray-500">
                Learning
              </p>

              <p className="text-base text-gray-500">
                Match
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex-1">

            <h2 className="sm:text-lg text-base font-semibold text-black">
              Great! These recommendations are tailored for you
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Based on your profile, skills, and career goals, we found
              the best learning recommendations for you.
            </p>

            {/* PROFILE DETAILS */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">

              <div>
                <p className="text-xs text-gray-500">
                  Career Goal
                </p>
                <p className="mt-1 font-semibold text-black">
                  {learningData.profile.careerGoal}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Experience Level
                </p>
                <p className="mt-1 font-semibold text-black">
                  {learningData.profile.experience}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Top Interest
                </p>
                <p className="mt-1 font-semibold text-black">
                  {learningData.profile.topInterest}
                </p>
              </div>

            </div>
          </div>

          {/* BUTTON */}
         

<button className="w-full rounded-xl bg-white px-6 py-4 font-semibold text-[#4438df] shadow-sm transition-all duration-200 hover:bg-[#f5f3ff] hover:shadow-md active:scale-[0.98] md:w-auto">
  🔄 Retake Assessment
</button>





        </div>
      </div>

      {/* ================= COURSES ================= */}
      <div className="mt-5 rounded-xl border border-gray-200 p-4 md:p-5">

        {/* HEADING */}
        <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">

          <div>
            <h2 className="text-lg font-bold text-black md:text-base">
              Top Recommended Courses
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Start with these handpicked courses to build in-demand skills.
            </p>
          </div>

        
<button className="font-semibold text-[#4438df] transition-all duration-300 hover:translate-x-1 hover:text-[#3128b8] active:scale-95">
  Explore More Courses →
</button>


        </div>

        {/* COURSE LIST */}
        <div className="space-y-3">

          {learningData.courses.map((course) => (

            <div
              key={course.id}
              className="flex flex-col gap-5 rounded-lg border border-gray-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center"
            >

              {/* COURSE INFO */}
              <div className="flex flex-1 gap-4">

                {/* IMAGE */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* TEXT */}
                <div>

                  <h3 className="font-semibold text-black md:text-lg">
                    {course.title}
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    {course.description}
                  </p>

                  {/* DETAILS */}
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">

                    <span>
                      🟢 {course.level}
                    </span>

                    <span>
                      ⭐ {course.rating} ({course.reviews})
                    </span>

                    <span>
                      ◷ {course.duration}
                    </span>

                  </div>
                </div>
              </div>

              {/* MATCH */}
              <div className="flex shrink-0 items-center justify-center">

                <div className="relative flex h-27 w-27 items-center justify-center rounded-full border-[7px] border-[#4338df] bg-white">

                  <div className="text-center">
                    <p className="text-xl font-bold text-black">
                      {course.match}%
                    </p>

                    <p className="text-sm text-gray-500">
                      Match
                    </p>
                  </div>

                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex w-full flex-col gap-3 lg:w-52">

              
<button className="rounded-lg bg-[#4438df] px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#372fc5] hover:shadow-lg active:scale-95">
  View Course
</button>



                
<button className="text-sm font-semibold text-[#4438df] transition-all duration-300 hover:translate-x-1 hover:text-[#3128b8] active:scale-95">
  Why recommended? →
</button>



              </div>

            </div>

          ))}

        </div>
      </div>

      {/* ================= BOTTOM BANNER ================= */}
      <div className="mt-5 flex flex-col items-center justify-between gap-5 rounded-xl border border-gray-300 bg-[#eeeeff] p-5 md:flex-row md:p-7">

        <div className="flex items-center gap-5">

          <div className="text-4xl">
            🚀
          </div>

          <div>
            <h2 className="text-base font-bold text-black md:text-lg">
              Stay consistent and achieve your goals!
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Learning a new skill today can create a better tomorrow.
            </p>
          </div>

        </div>

     

<button className="w-full rounded-xl bg-white px-6 py-4 font-semibold text-[#4438df] shadow-sm transition-all duration-200 hover:bg-[#f5f3ff] hover:shadow-md active:scale-[0.98] md:w-auto">
  View Learning Dashboard →
</button>




      </div>

    </div>
  );
}