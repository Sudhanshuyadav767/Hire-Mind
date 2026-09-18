import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";

export default function ProfileSummaryCard() {
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
          Your Profile Summary
        </h3>
        <Link href="/edit-profile" className="text-[11px] font-bold text-[#2D24D0] hover:underline cursor-pointer">
          Edit Profile
        </Link>
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

      {/* Goal Inner Box */}
      <div className="bg-[#E2E4F8] border border-blue-100/60 rounded-2xl p-3.5 flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-700 leading-tight">
            Add your career goal to improve matching accuracy
          </p>
          <Link href="/career-guidance" className="text-[10px] font-bold text-[#2D24D0] hover:underline inline-flex items-center gap-0.5 cursor-pointer">
            <span>Add Career Goal</span>
            <ChevronRight size={12} />
          </Link>
        </div>

        <div className="w-12 h-12 relative shrink-0">
          <Image 
            src="/Images/goal.png"
            alt="Goal Target"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
