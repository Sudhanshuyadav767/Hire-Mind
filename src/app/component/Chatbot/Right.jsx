"use client";

import {
  FileText,
  Users,
  GraduationCap,
  Monitor,
  TrendingUp,
} from "lucide-react";

import {
  popularQuestions,
  careerTools,
  resources,
} from "@/Data/data1";

export default function CareerPage() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">

      {/* Popular Questions */}
      <section className="bg-white border border-slate-200 rounded-2xl rounded-lg p-6">
        <h2 className="sm:text-lg text-base  font-bold mb-3">
          Popular Questions
        </h2>

        <div>
          {popularQuestions.map((question, index) => (
            <div
              key={index}
              className="flex items-center gap-3 py-1 border-b last:border-0 cursor-pointer"
            >
            
  <IconBox icon="resume" />


              <p className="flex-1 font-semibold">
                {question}
              </p>

              <span className="text-gray-500">
                ›
              </span>
            </div>
          ))}
        </div>

        <button className="block mx-auto mt-4 text-blue-600 font-semibold transition-all duration-300 hover:text-blue-800 hover:underline hover:scale-105">
          View More Questions
        </button>
      </section>

      {/* Career Tools */}
      <section className="bg-white border border-slate-200 rounded-2xl p-4">
        <h2 className="sm:text-xl text-base font-bold mb-2">
          Career Tools
        </h2>

        <div>
          {careerTools.map((tool, index) => (
            <div
              key={index}
              className="flex items-center gap-5 py-1"
            >
              <IconBox icon={tool.icon} />

              <div>
                <h3 className="font-semibold">
                  {tool.title}
                </h3>

                <p className="text-gray-300 text-sm">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="block mx-auto mt-4 text-blue-600 font-semibold transition-all duration-300 hover:text-blue-800 hover:underline hover:scale-105">
          Explore All Tools
        </button>
      </section>

      {/* Resources */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6">
        <h2 className="sm:text-lg text-base font-bold mb-3">
          Resources For You
        </h2>

        <div>
          {resources.map((resource, index) => (
            <div
              key={index}
              className="flex items-center gap-5 py-1"
            >
              <IconBox icon={resource.icon} />

              <div>
                <h3 className="font-semibold">
                  {resource.title}
                </h3>

                <p className="text-gray-300 text-sm">
                  {resource.description}
                </p>
              </div>
            </div>
          ))}
        </div>

       <button className="block mx-auto mt-4 text-blue-600 font-semibold transition-all duration-300 hover:text-blue-800 hover:underline hover:scale-105">
  View All Resources
</button>
      </section>

    </div>
  );
}


/* Icon Box */
function IconBox({ icon }) {
  let Icon = FileText;

  if (icon === "job") Icon = Users;
  if (icon === "skill") Icon = GraduationCap;
  if (icon === "interview") Icon = Monitor;
  if (icon === "skills") Icon = TrendingUp;
  if (icon === "roadmap") Icon = FileText;

  return (
    <div className="w-13 h-13 shrink-0 rounded-xl bg-[#eef1ff] flex items-center justify-center text-blue-500">
      <Icon size={25} />
    </div>
  );
}