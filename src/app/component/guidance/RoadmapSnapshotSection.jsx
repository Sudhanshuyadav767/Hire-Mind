import { ArrowRight } from "lucide-react";

const steps = [
  {
    num: 1,
    title: "Foundation",
    duration: "0-3 Months",
    desc: "Learn Python, Statics, and SQL bsics"
  },
  {
    num: 2,
    title: "Core Skills",
    duration: "3-6 Months",
    desc: "Learn Machine Learning, Data Analysis"
  },
  {
    num: 3,
    title: "Advanced Skills",
    duration: "6-12 Months",
    desc: "Deep Learning, Data Visualization"
  },
  {
    num: 4,
    title: "Build & Apply",
    duration: "12+ Months",
    desc: "Work on Projects adn apply for roles"
  }
];

export default function RoadmapSnapshotSection() {
  return (
    <div className="bg-white border border-[#cbd5e1]/45 p-5 sm:p-6 rounded-3xl shadow-sm text-left space-y-4">
      <h3 className="text-base sm:text-lg font-bold font-poppins text-[#1E2229] border-b border-slate-100 pb-2">
        Recommended Roadmap Snapshot
      </h3>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 overflow-x-auto no-scrollbar pt-2">
        {steps.map((step, idx) => (
          <div key={step.num} className="flex items-start sm:items-center gap-3 shrink-0 w-full sm:w-auto">
            <div className="flex items-start gap-3 flex-1 sm:flex-none">
              <div className="w-7 h-7 rounded-full bg-[#2D24D0] text-white flex items-center justify-center font-extrabold text-xs shrink-0 shadow-xs mt-0.5 sm:mt-0">
                {step.num}
              </div>

              <div className="space-y-0.5 max-w-[150px]">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="text-xs font-bold text-[#1E2229] leading-tight">{step.title}</h4>
                  <span className="text-[9px] font-semibold text-slate-400">{step.duration}</span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium leading-tight">
                  {step.desc}
                </p>
              </div>
            </div>

            {idx < steps.length - 1 && (
              <ArrowRight size={16} className="text-slate-300 hidden sm:block shrink-0 ml-1 mr-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
