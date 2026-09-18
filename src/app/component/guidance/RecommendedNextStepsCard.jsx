import { Folder, ChevronRight } from "lucide-react";

const nextSteps = [
  "Fill skill gaps to improve your match",
  "Take recommended courses",
  "Build projects to showcase your skills",
  "Get certificate to boost your profile"
];

export default function RecommendedNextStepsCard() {
  return (
    <div className="bg-white border border-[#cbd5e1]/45 p-5 rounded-3xl shadow-sm text-left space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="text-sm font-bold font-poppins text-[#1E2229]">
          Recommended Next Steps
        </h3>
        <button className="text-[11px] font-bold text-[#2D24D0] hover:underline cursor-pointer">
          View All
        </button>
      </div>

      <div className="space-y-2">
        {nextSteps.map((step, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/50 border border-slate-100/80 hover:bg-slate-50 transition cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <div className="p-1.5 rounded-lg bg-blue-50 text-[#2D24D0] shrink-0 border border-blue-100">
                <Folder size={14} />
              </div>
              <span className="text-xs font-semibold text-slate-700 leading-tight">{step}</span>
            </div>

            <ChevronRight size={14} className="text-slate-400 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
