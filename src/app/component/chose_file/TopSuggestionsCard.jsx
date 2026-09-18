import { useState } from "react";
import { BarChart3, Key, Type, ChevronDown } from "lucide-react";

const suggestions = [
  {
    id: 1,
    title: "Add more quantifiable achievements",
    desc: "Include numbers and metrics to showcase your impact",
    badge: "Impact",
    badgeColor: "bg-blue-50 text-[#2D24D0] border-blue-100",
    icon: BarChart3,
    iconColor: "bg-blue-50 text-[#2D24D0]"
  },
  {
    id: 2,
    title: "Include more relevant keywords",
    desc: "Add keywords related to your target role for better visibility",
    badge: "Keywords",
    badgeColor: "bg-blue-50 text-[#2D24D0] border-blue-100",
    icon: Key,
    iconColor: "bg-blue-50 text-[#2D24D0]"
  },
  {
    id: 3,
    title: "Improve formatting in some sections",
    desc: "Enhance spacing and consistency for better readability.",
    badge: "Formatting",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    icon: Type,
    iconColor: "bg-amber-100/80 text-amber-700"
  }
];

export default function TopSuggestionsCard() {
  const [openId, setOpenId] = useState(null);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-white border border-[#cbd5e1]/45 p-6 sm:p-8 rounded-3xl shadow-sm text-left space-y-6">
      <h2 className="text-lg sm:text-xl font-bold font-poppins text-[#1E2229]">
        Top Suggestions
      </h2>

      <div className="space-y-4">
        {suggestions.map((item, idx) => {
          const IconComp = item.icon;
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className="space-y-2">
              <div 
                onClick={() => toggleOpen(item.id)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/50 border border-slate-100/80 hover:bg-slate-50 transition cursor-pointer"
              >
                <div className="flex items-center gap-3.5 min-w-0 pr-4">
                  <div className={`w-10 h-10 rounded-2xl ${item.iconColor} flex items-center justify-center shrink-0 border border-blue-100/60`}>
                    <IconComp size={18} />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <h3 className="text-xs sm:text-sm font-bold text-[#1E2229] leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium leading-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                  <ChevronDown 
                    size={16} 
                    className={`text-slate-400 transition-transform ${isOpen ? "rotate-180 text-[#2D24D0]" : ""}`} 
                  />
                </div>
              </div>

              {isOpen && (
                <div className="p-3.5 ml-14 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-slate-600 font-medium leading-relaxed">
                  💡 <strong>Actionable Tip:</strong> Standardize section margins, ensure uniform bullet spacing, and use consistent month/year date formats across all work experiences.
                </div>
              )}

              {idx < suggestions.length - 1 && <hr className="border-slate-100 mt-2" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
