"use client";

import {
  learningProgress,
  skills,
  learningPath,
  aiAssistant,
} from "@/Data/data1";

export default function LearningDashboard() {
  return (
    <div className="w-full space-y-5 bg-white p-4 md:p-6">

      {/* =====================================
          LEARNING PROGRESS
      ====================================== */}
      <section className="rounded-2xl border border-gray-300 bg-white p-5 shadow-sm">

        {/* HEADER */}
        <div className="flex">
          <h2 className="text-base font-bold text-black md:text-lg">
            Your Learning Progress
          </h2>

     
<button className="font-semibold text-[#4438df] transition-all duration-200 hover:text-[#3128b8] hover:underline underline-offset-4 active:scale-[0.98]">
  View Dashboard
</button>


        </div>

        {/* PROGRESS + STATS */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">

          {/* CIRCLE */}
          <div className="relative mx-auto flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-[8px] border-[#4338df] bg-white sm:mx-0">

            <div className="text-center">
              <p className="text-xl font-bold text-black">
                {learningProgress.overallProgress}%
              </p>

              <p className="text-sm text-gray-400">
                Overall
              </p>

              <p className="text-sm text-gray-400">
                Progress
              </p>
            </div>

          </div>

          {/* STATS */}
          <div className="grid flex-1 grid-cols-1 gap-1">

            <ProgressItem
              number={learningProgress.coursesEnrolled}
              title="Courses Enrolled"
            />

            <ProgressItem
              number={learningProgress.coursesCompleted}
              title="Courses Completed"
            />

            <ProgressItem
              number={learningProgress.hoursLearned}
              title="Hours Learned"
            />

            <ProgressItem
              number={learningProgress.certificatesEarned}
              title="Certificates Earned"
            />

          </div>

        </div>

        {/* MESSAGE */}
        <div className="mt-2 flex items-center gap-5 rounded-2xl border border-gray-300 bg-[#eeeeff] p-3">

          <div className="text-3xl">
            🏅
          </div>

          <div>
            <h3 className="text-base font-bold text-black md:text-lg">
              Keep learning to unlock new opportunities!
            </h3>

            <p className="mt-2 text-sm text-gray-400 md:text-base">
              You’re doing great. Stay consistent!
            </p>
          </div>

        </div>

      </section>


      {/* =====================================
          SKILLS
      ====================================== */}
      <section className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm">

        <h2 className="text-base font-bold text-black md:text-lg">
          Skills You Will Gain
        </h2>

        {/* SKILL TAGS */}
        <div className="mt-3 flex flex-wrap gap-4">

          {skills.map((skill, index) => (
            <span
              key={index}
              className="rounded-xl border border-[#b8c0e8] bg-[#dce3ff] px-2 py-2 text-center font-semibold text-[#4438df] shadow-sm"
            >
              {skill}
            </span>
          ))}

        </div>

        {/* VIEW ALL */}
     
<button className="mt-3 font-semibold text-[#4438df] transition-all duration-200 hover:translate-x-1 hover:text-[#3128b8] active:scale-[0.98]">
  View All Skills →
</button>



      </section>


      {/* =====================================
          LEARNING PATH
      ====================================== */}
      <section className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm">

        <h2 className="text-base font-bold text-black md:text-lg">
          Recommended Learning Path
        </h2>

        {/* PATH */}
        <div className="mt-3 space-y-3">

          {learningPath.map((item) => (

            <div
              key={item.id}
              className="flex items-center gap-3"
            >

              {/* NUMBER */}
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4338df] text-sm font-bold text-white">
                {item.id}
              </div>

              {/* TITLE */}
              <p
                className={`flex-1 font-medium ${
                  item.status === "In Progress"
                    ? "text-[#4438df]"
                    : "text-black"
                }`}
              >
                {item.title}
              </p>

              {/* STATUS */}
              {item.status === "In Progress" ? (

                <div className="flex items-center gap-4">

                  <span className="rounded-md border border-green-300 bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                    In Progress
                  </span>

                  <span className="font-semibold text-[#4438df]">
                    {item.progress}%
                  </span>

                </div>

              ) : (

                <span className="rounded-md border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                  Not Started
                </span>

              )}

            </div>

          ))}

        </div>

        {/* ROADMAP */}
  
<button className="mt-6 ml-12 font-semibold text-[#4438df] transition-all duration-200 hover:translate-x-1 hover:text-[#3128b8] active:scale-[0.98]">
  View Roadmap →
</button>



      </section>


      {/* =====================================
          AI ASSISTANT
      ====================================== */}
      <section className="overflow-hidden rounded-xl border border-gray-300 bg-[#eeeeff] p-5 md:p-7">

        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

          {/* LEFT */}
          <div className="">

            <h2 className="text-base font-bold text-black md:text-lg">
              {aiAssistant.title}
            </h2>

            <p className="mt-4 max-w-md text-base leading-5 text-gray-500">
              {aiAssistant.description}
            </p>

            

          </div>

          {/* IMAGE */}
          <div className="shrink-0">

            <img
              src={aiAssistant.image}
              alt="AI Career Assistant"
              className="h-25 w-auto object-contain md:h-30"
            />

          </div>

        </div>

<button className="mt-6 rounded-xl bg-[#4438df] px-10 py-4 font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#372fc5] hover:shadow-lg active:scale-[0.98]">
  {aiAssistant.buttonText}
</button>


      </section>

    </div>
  );
}


/* =====================================
   PROGRESS ITEM
====================================== */

function ProgressItem({ number, title }) {
  return (
    <div className="flex items-center gap-3">

      <span className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-gray-100 text-sm font-semibold text-gray-700">
        {String(number).padStart(2, "0")}
      </span>

      <span className="text-base text-gray-500 md:text-lg">
        {title}
      </span>

    </div>
  );
}