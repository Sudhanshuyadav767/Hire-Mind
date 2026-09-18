import { Users, Briefcase, Building2, FileText } from "lucide-react";

const stats = [
  { 
    label: "Active Users", 
    sub: "Growing community of job seekers and professionals", 
    value: "500K+", 
    icon: Users,
    bg: "bg-[#eef1ff] text-[#2D24D0]"
  },
  { 
    label: "Job Opportunites", 
    sub: "Access thousands of job listings across industries", 
    value: "50K+", 
    icon: Briefcase,
    bg: "bg-[#eef1ff] text-[#2D24D0]"
  },
  { 
    label: "Verified Companies", 
    sub: "Top companies trust us to find the right talent", 
    value: "5K+", 
    icon: Building2,
    bg: "bg-[#eef1ff] text-[#2D24D0]"
  },
  { 
    label: "Applications", 
    sub: "Successful applications submitted by our users", 
    value: "90K+", 
    icon: FileText,
    bg: "bg-[#eef1ff] text-[#2D24D0]"
  }
];

export default function AboutStats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8 select-none">
      <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-4 gap-4 bg-white border border-[#cbd5e1]/45 p-4 rounded-2xl shadow-2xs">
        {stats.map((stat, i) => {
          const StatIcon = stat.icon;
          return (
            <div 
              key={i} 
              className={`flex items-start gap-3 p-2.5 rounded-xl border border-slate-50 shrink-0 min-w-[200px] md:min-w-0 snap-start h-full ${
                i < stats.length - 1 ? "md:border-r md:border-gray-100" : ""
              }`}
            >
              <div className={`p-2 rounded-full shrink-0 ${stat.bg}`}>
                <StatIcon size={16} className="stroke-[1.5]" />
              </div>
              <div className="space-y-1 text-left">
                <b className="text-sm sm:text-base font-poppins font-semibold text-[#1E2229] block leading-none">
                  {stat.value}
                </b>
                <h4 className="text-[10px] sm:text-[11px] font-poppins font-bold text-[#334155] leading-snug">
                  {stat.label}
                </h4>
                <p className="text-[8px] sm:text-[9px] font-poppins font-medium text-[#5E637D] leading-tight pr-1">
                  {stat.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
