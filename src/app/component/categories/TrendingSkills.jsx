import { Database, ArrowRight } from "lucide-react";

const trendingSkills = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  name: "Python",
  jobs: "8,000Jobs"
}));

export default function TrendingSkills() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8 space-y-4 pb-12">
      <div className="flex items-center justify-between border-b border-gray-150 pb-2 select-none">
        <h3 className="text-sm font-poppins font-semibold text-[#1E2229]">Trending Skills</h3>
        <button className="text-[10px] font-poppins font-bold text-[#2D24D0] hover:text-[#1E2229] flex items-center gap-0.5 cursor-pointer">
          <span>View All Skills</span>
          <ArrowRight size={12} />
        </button>
      </div>

      <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-6 gap-4">
        {trendingSkills.map((skill) => (
          <div 
            key={skill.id} 
            className="bg-white border border-[#cbd5e1]/65 hover:border-[#2D24D0]/60 rounded-2xl p-4 flex items-center gap-3 shrink-0 w-[160px] md:w-auto hover:shadow-xs transition text-left cursor-pointer snap-start"
          >
            <div className="p-2.5 bg-blue-50 text-[#2D24D0] rounded-xl shrink-0 border border-blue-100/50 shadow-3xs">
              <Database size={15} />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-[11px] font-poppins font-bold text-[#334155] leading-none">{skill.name}</h4>
              <p className="text-[9px] font-poppins font-semibold text-slate-400 leading-none pt-1">
                {skill.jobs}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
