import { Folder } from "lucide-react";

const popularPaths = [
  { name: "Software Developer", tag: "High Growth", color: "text-emerald-600" },
  { name: "Data Scientist", tag: "High Demand", color: "text-emerald-600" },
  { name: "Product Manager", tag: "High Growth", color: "text-emerald-600" },
  { name: "UI/UX Designer", tag: "Growing", color: "text-purple-600" },
  { name: "Cloud Engineer", tag: "High Growth", color: "text-emerald-600" }
];

export default function PopularCareerPathsCard() {
  return (
    <div className="bg-white border border-[#cbd5e1]/45 p-5 rounded-3xl shadow-sm text-left space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="text-sm font-bold font-poppins text-[#1E2229]">
          Popular Career Paths
        </h3>
        <button className="text-[11px] font-bold text-[#2D24D0] hover:underline cursor-pointer">
          View All
        </button>
      </div>

      <div className="space-y-2">
        {popularPaths.map((path, idx) => (
          <div 
            key={idx} 
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/50 border border-slate-100/80 hover:bg-slate-50 transition cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-blue-50 text-[#2D24D0] shrink-0 border border-blue-100">
                <Folder size={14} />
              </div>
              <span className="text-xs font-bold text-[#1E2229] truncate">{path.name}</span>
            </div>

            <span className={`text-[10px] font-extrabold ${path.color} shrink-0`}>
              {path.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
