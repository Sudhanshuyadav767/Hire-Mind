import Link from "next/link";
import { 
  Code2, 
  ArrowRight,
  Database,
  Megaphone,
  PenTool
} from "lucide-react";

const featuredCategories = [
  {
    title: "Data Science",
    desc: "High demand. Great opportunities",
    jobs: "3,500 Jobs",
    icon: Database,
    color: "text-[#2D24D0] bg-blue-50 border-blue-100"
  },
  {
    title: "Software Development",
    desc: "Build the future with code",
    jobs: "3,500 Jobs",
    icon: Code2,
    color: "text-emerald-500 bg-emerald-50 border-emerald-100"
  },
  {
    title: "Digital Marketing",
    desc: "Grow brands. Drive results",
    jobs: "3,500 Jobs",
    icon: Megaphone,
    color: "text-amber-500 bg-amber-50 border-amber-100"
  },
  {
    title: "UI/UX Design",
    desc: "Design experiences people love",
    jobs: "3,500 Jobs",
    icon: PenTool,
    color: "text-purple-500 bg-purple-50 border-purple-100"
  }
];

export default function FeaturedCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8 space-y-4">
      <div className="flex items-center justify-between border-b border-gray-150 pb-2">
        <h3 className="text-sm font-poppins font-semibold text-[#1E2229] select-none">Featured Categories</h3>
        <Link href="/categories">
          <button className="text-[10px] font-poppins font-bold text-[#2D24D0] hover:text-[#1E2229] flex items-center gap-0.5 cursor-pointer">
            <span>View All Categories</span>
            <ArrowRight size={12} />
          </button>
        </Link>
      </div>

      <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-4 gap-4">
        {featuredCategories.map((feat, i) => {
          const FeatIcon = feat.icon;
          return (
            <div 
              key={i} 
              className="bg-white border border-[#cbd5e1]/65 hover:border-[#2D24D0]/60 rounded-2xl p-4.5 flex flex-col justify-between shrink-0 w-[200px] md:w-auto hover:shadow-xs transition text-left snap-start"
            >
              <div className="space-y-4">
                <div className={`p-3 rounded-2xl shrink-0 border w-fit ${feat.color}`}>
                  <FeatIcon size={18} className="stroke-[1.5]" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-poppins font-bold text-[#1E2229]">{feat.title}</h4>
                  <p className="text-[10px] font-poppins font-semibold text-[#5E637D] leading-tight line-clamp-1">
                    {feat.desc}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-[#f1f5f9] flex items-center justify-between">
                <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-[9px] font-poppins font-bold text-slate-500 select-none">
                  {feat.jobs}
                </span>
                
                <Link href="/find-jobs">
                  <button className="p-1.5 rounded-lg bg-[#2D24D0]/10 hover:bg-[#2D24D0] text-[#2D24D0] hover:text-white transition cursor-pointer">
                    <ArrowRight size={12} />
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
