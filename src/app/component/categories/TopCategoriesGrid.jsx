import Link from "next/link";
import { Code2, ArrowRight } from "lucide-react";

const topCategories = Array.from({ length: 14 }).map((_, i) => ({
  id: i + 1,
  title: "Development",
  jobs: "1,000 Jobs"
}));

export default function TopCategoriesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8 space-y-5 text-center">
      <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory lg:grid lg:grid-cols-7 gap-4">
        {topCategories.map((item) => (
          <div 
            key={item.id}
            className="bg-white border border-[#cbd5e1]/65 hover:border-[#2D24D0]/60 rounded-2xl p-5 flex flex-col items-center justify-between gap-3 text-center shadow-3xs hover:shadow-xs hover:-translate-y-1 transition duration-150 shrink-0 min-w-[140px] lg:min-w-0 snap-start"
          >
            <div className="p-3.5 bg-blue-50 text-[#2D24D0] rounded-2xl shrink-0 border border-blue-100/50">
              <Code2 size={22} className="stroke-[1.5]" />
            </div>

            <div className="space-y-0.5">
              <h4 className="text-xs font-poppins font-bold text-[#1E2229] leading-snug">
                {item.title}
              </h4>
              <p className="text-[10px] font-poppins font-semibold text-[#5E637D]">
                {item.jobs}
              </p>
            </div>

            <Link 
              href="/find-jobs"
              className="text-[9px] font-poppins font-bold text-[#2D24D0] hover:underline flex items-center gap-0.5 mt-1 cursor-pointer select-none"
            >
              <span>Explore Jobs</span>
              <ArrowRight size={10} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
