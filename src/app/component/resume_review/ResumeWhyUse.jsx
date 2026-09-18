import { Clock, TrendingUp, Lightbulb, Lock } from "lucide-react";

const whyFeatures = [
  {
    title: "Save Time",
    desc: "Get instant feedback in seconds",
    icon: Clock
  },
  {
    title: "Increase Shortlist Chances",
    desc: "Make your resume ATS-friendly and recruiter ready",
    icon: TrendingUp
  },
  {
    title: "Improve Effectively",
    desc: "Get actionable tips to improve your resume",
    icon: Lightbulb
  },
  {
    title: "100% Confidential",
    desc: "We ensure your data privacy and security",
    icon: Lock
  }
];

export default function ResumeWhyUse() {
  return (
    <section className="bg-white border border-[#cbd5e1]/45 p-5 sm:p-6 rounded-3xl shadow-sm text-left space-y-4">
      <h2 className="text-lg sm:text-xl font-bold font-poppins text-[#1E2229]">
        Why Use Our AI Resume Review?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
        {whyFeatures.map((feat, index) => {
          const FeatIcon = feat.icon;
          return (
            <div key={index} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/50 border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-[#2D24D0]/10 text-[#2D24D0] flex items-center justify-center shrink-0 border border-blue-100">
                <FeatIcon size={18} className="stroke-[1.8]" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-xs text-[#1E2229] leading-tight">{feat.title}</h3>
                <p className="text-[10px] text-slate-400 font-medium leading-tight">{feat.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
