import { CheckCircle2, Circle, Star } from "lucide-react";

export default function CareerProfileCard() {
  const checklist = [
    { label: "Skills Added", done: true },
    { label: "Experience Added", done: true },
    { label: "Education Added", done: true },
    { label: "Resume Uploaded", done: true },
    { label: "Career Goal Added", done: false }
  ];

  return (
    <div className="bg-white border border-[#cbd5e1]/45 p-5 rounded-3xl shadow-sm text-left space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="text-sm font-bold font-poppins text-[#1E2229]">
          Your Career Profile
        </h3>
        <button className="text-[11px] font-bold text-[#2D24D0] hover:underline cursor-pointer">
          Edit Profile
        </button>
      </div>

      {/* Ring & Checklist */}
      <div className="flex items-center gap-4">
        {/* Ring Badge */}
        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border-4 border-[#2D24D0] bg-white flex flex-col items-center justify-center shrink-0 shadow-inner">
          <span className="text-xl font-extrabold text-[#1E2229] leading-none">87</span>
          <span className="text-[9px] text-slate-400 font-bold leading-none mt-0.5">/100</span>
        </div>

        {/* Checklist */}
        <div className="space-y-1 text-xs font-semibold text-slate-600">
          {checklist.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              {item.done ? (
                <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
              ) : (
                <Circle size={13} className="text-slate-300 shrink-0" />
              )}
              <span className={item.done ? "text-slate-700" : "text-slate-400"}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Unlock Full Career Path Box */}
      <div className="bg-[#E2E4F8] border border-blue-100/60 rounded-2xl p-4 flex items-center justify-between gap-3">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <h4 className="text-xs font-bold text-[#1E2229]">Unlock Full Career Path</h4>
          </div>
          <p className="text-[10px] text-slate-500 font-medium leading-tight">
            Get detailed insights, roadmap, and job recommendations
          </p>
          <button className="bg-[#2D24D0] hover:bg-[#1e1c75] text-white px-4 py-1.5 rounded-xl text-[11px] font-bold shadow-xs transition active:scale-98 cursor-pointer">
            Upgrade to Premium
          </button>
        </div>

        <div className="w-10 h-10 rounded-2xl bg-amber-100/80 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
          <Star size={20} className="fill-amber-500 text-amber-500" />
        </div>
      </div>
    </div>
  );
}
