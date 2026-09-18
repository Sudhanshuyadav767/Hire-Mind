import { Users, Briefcase, Award, Star } from "lucide-react";

const stats = [
  { label: "Happy Job Seekers", value: "10M+", icon: Users, bg: "bg-[#2D24D0]/10 text-[#2D24D0]" },
  { label: "Applications Submitted", value: "24M+", icon: Briefcase, bg: "bg-[#2D24D0]/10 text-[#2D24D0]" },
  { label: "Successful Placements", value: "200K+", icon: Award, bg: "bg-[#2D24D0]/10 text-[#2D24D0]" },
  { label: "Average Rating", value: "4.7/5", icon: Star, bg: "bg-[#2D24D0]/10 text-[#2D24D0]" }
];

export default function TestimonialsStats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8 select-none">
      <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-4 gap-4 bg-white border border-[#cbd5e1]/45 p-4 rounded-2xl shadow-2xs">
        {stats.map((stat, i) => {
          const StatIcon = stat.icon;
          return (
            <div 
              key={i} 
              className={`flex items-center gap-3.5 p-3 rounded-xl border border-slate-50 shrink-0 min-w-[155px] md:min-w-0 snap-start h-full ${
                i < stats.length - 1 ? "md:border-r md:border-gray-100" : ""
              }`}
            >
              <div className={`p-2.5 rounded-full shrink-0 ${stat.bg}`}>
                <StatIcon size={16} className="stroke-[1.5]" />
              </div>
              <div className="space-y-0.5 text-left">
                <b className="text-sm sm:text-base font-poppins font-semibold text-[#1E2229] block leading-none">
                  {stat.value}
                </b>
                <span className="text-[9px] sm:text-[10px] font-poppins font-medium text-[#5E637D] block leading-tight">
                  {stat.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
