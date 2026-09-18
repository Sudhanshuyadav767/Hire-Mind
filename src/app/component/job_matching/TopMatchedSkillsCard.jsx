import { ChevronRight } from "lucide-react";

const matchedSkills = [
  { name: "Python", pct: "90%" },
  { name: "React", pct: "80%" },
  { name: "JavaScript", pct: "90%" },
  { name: "SQL", pct: "90%" },
  { name: "Problem Solving", pct: "90%" },
  { name: "Machine learning", pct: "90%" }
];

export default function TopMatchedSkillsCard() {
  return (
    <div className="bg-white border border-[#cbd5e1]/45 p-5 rounded-3xl shadow-sm text-left space-y-4">
      <h3 className="text-sm font-bold font-poppins text-[#1E2229] border-b border-slate-100 pb-2">
        Top Matched Skills
      </h3>

      <div className="grid grid-cols-2 gap-2">
        {matchedSkills.map((skill, idx) => (
          <div 
            key={idx}
            className="flex items-center justify-between bg-blue-50/70 border border-blue-100 rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#2D24D0]"
          >
            <span className="truncate pr-1">{skill.name}</span>
            <span className="shrink-0 text-[10px] text-blue-600 bg-white px-1.5 py-0.5 rounded-md shadow-3xs">{skill.pct}</span>
          </div>
        ))}
      </div>

      <button className="text-[11px] font-bold text-[#2D24D0] hover:underline flex items-center gap-0.5 cursor-pointer pt-1">
        <span>View All Skills</span>
        <ChevronRight size={12} />
      </button>
    </div>
  );
}
