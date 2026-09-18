import { Database } from "lucide-react";

const featuresAppreciated = [
  { title: "Easy to Use", desc: "Simple and intuitive Platform" },
  { title: "Great Opportunities", desc: "Wide range of job opportunities" },
  { title: "AI-Powered Tools", desc: "Smart tools that make a difference" },
  { title: "Top Companies", desc: "Connect with leading companies" },
  { title: "Helpful Support", desc: "Responsive support when you need it" }
];

export default function FeaturesAppreciated() {
  return (
    <section className="bg-white border border-[#cbd5e1]/45 p-5 rounded-2xl shadow-sm space-y-4">
      <h3 className="text-xs font-poppins font-semibold text-[#1E2229] select-none uppercase tracking-wider text-left">What Our Users Appreciate</h3>
      
      <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-5 gap-4">
        {featuresAppreciated.map((feat, i) => (
          <div key={i} className="flex items-start gap-3 shrink-0 w-[200px] md:w-auto text-left snap-start">
            <div className="w-9 h-9 bg-blue-50 text-[#2D24D0] rounded-xl flex items-center justify-center shrink-0 border border-blue-100 shadow-3xs">
              <Database size={16} className="stroke-[1.5]" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-[11px] font-poppins font-semibold text-[#334155]">{feat.title}</h4>
              <p className="text-[9px] font-poppins font-medium text-[#5E637D] leading-tight">
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
