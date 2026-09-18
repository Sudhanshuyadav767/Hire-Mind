import { FileCheck, FileText, ClipboardCheck } from "lucide-react";

export default function ResumeSampleReport() {
  const scores = [
    { label: "Content Quality", score: "85/100", pct: "85%", color: "bg-emerald-500" },
    { label: "ATS Compatibility", score: "90/100", pct: "90%", color: "bg-emerald-500" },
    { label: "Skill & Keywords", score: "77/100", pct: "77%", color: "bg-blue-500" },
    { label: "Formatting", score: "65/100", pct: "65%", color: "bg-amber-400" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6 text-left">
      {/* Sample AI Review Report */}
      <div className="bg-white border border-[#cbd5e1]/45 p-5 sm:p-6 rounded-3xl shadow-sm space-y-5">
        <h2 className="text-lg sm:text-xl font-bold font-poppins text-[#1E2229]">
          Sample AI Review Report
        </h2>

        {/* Score & Progress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 items-center">
          {/* Score Badge */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-4 border-[#2D24D0] flex flex-col items-center justify-center shrink-0 shadow-inner">
              <span className="text-2xl font-extrabold text-[#1E2229] leading-none">87</span>
              <span className="text-[10px] text-slate-400 font-bold leading-none mt-0.5">/100</span>
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase">Overall Score</h4>
              <p className="text-xs font-bold text-[#2D24D0]">Great Job!</p>
              <p className="text-[10px] text-slate-500 font-medium leading-tight">
                Your resume is strong. A few improvements can make it excellent.
              </p>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-2">
            {scores.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between text-[11px] font-bold text-[#1E2229]">
                  <span>{item.label}</span>
                  <span className="text-slate-500">{item.score}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: item.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Top Suggestions & Action Button */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-[#1E2229] uppercase tracking-wider">Top Suggestions</h3>

          <div className="space-y-2">
            <div className="flex items-start gap-2.5 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
              <FileCheck size={16} className="text-[#2D24D0] shrink-0 mt-0.5" />
              <p className="text-[11px] font-medium text-slate-600 leading-normal">
                Add more quantifiable achievements to showcase your impact.
              </p>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
              <FileText size={16} className="text-[#2D24D0] shrink-0 mt-0.5" />
              <p className="text-[11px] font-medium text-slate-600 leading-normal">
                Include more relevant keywords related to your target role.
              </p>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
              <ClipboardCheck size={16} className="text-[#2D24D0] shrink-0 mt-0.5" />
              <p className="text-[11px] font-medium text-slate-600 leading-normal">
                Improve formatting in some sections for better readability.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer">
              View Full Report
            </button>
          </div>
        </div>
      </div>

      {/* Resume Summary */}
      <div className="bg-white border border-[#cbd5e1]/45 p-5 sm:p-6 rounded-3xl shadow-sm text-left flex flex-col justify-between h-full space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold font-poppins text-[#1E2229]">
            Resume Summary
          </h2>

          <div className="space-y-4 pt-4">
            <div>
              <span className="text-xs font-bold text-[#1E2229]">File Name:</span>
              <p className="text-xs font-medium text-slate-500 mt-0.5">Aman_Singh_Resume.pdf</p>
            </div>

            <div>
              <span className="text-xs font-bold text-[#1E2229]">Uploaded On:</span>
              <p className="text-xs font-medium text-slate-500 mt-0.5">20 May 2024, 10:30 AM</p>
            </div>

            <div>
              <span className="text-xs font-bold text-[#1E2229] block mb-1">Review Status:</span>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                Completed
              </span>
            </div>
          </div>
        </div>

        <button className="w-full bg-[#2D24D0] hover:bg-[#1e1c75] text-white py-3 rounded-xl text-xs font-bold shadow-md cursor-pointer transition active:scale-98">
          Review Another Resume
        </button>
      </div>
    </div>
  );
}
