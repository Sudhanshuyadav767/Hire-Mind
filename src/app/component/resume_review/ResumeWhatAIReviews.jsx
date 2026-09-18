import { Layout, Mail, BrainCircuit, FileEdit, Target } from "lucide-react";

const reviewFeatures = [
  {
    title: "Content Quality",
    desc: "Clarity, relevance and impact of your content.",
    icon: Layout,
    color: "bg-blue-50 text-[#2D24D0] border-blue-100"
  },
  {
    title: "ATS Compatibility",
    desc: "Resume format and Keywords for ATS systems.",
    icon: Mail,
    color: "bg-blue-50 text-[#2D24D0] border-blue-100"
  },
  {
    title: "Skill & Keywords",
    desc: "Match with jobs roles and Industry standards.",
    icon: BrainCircuit,
    color: "bg-blue-50 text-[#2D24D0] border-blue-100"
  },
  {
    title: "Formatting",
    desc: "Structure, font, spacing and readability.",
    icon: FileEdit,
    color: "bg-blue-50 text-[#2D24D0] border-blue-100"
  },
  {
    title: "Achievements",
    desc: "Strength of achievements and responsibilities.",
    icon: Target,
    color: "bg-blue-50 text-[#2D24D0] border-blue-100"
  }
];

export default function ResumeWhatAIReviews() {
  return (
    <section className="bg-white border border-[#cbd5e1]/45 p-5 sm:p-6 rounded-3xl shadow-sm text-left space-y-4">
      <h2 className="text-lg sm:text-xl font-bold font-poppins text-[#1E2229]">What Our AI Review</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-1">
        {reviewFeatures.map((item, index) => {
          const IconComp = item.icon;
          return (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-2"
            >
              <div className={`p-3 rounded-2xl border ${item.color}`}>
                <IconComp size={22} className="stroke-[1.8]" />
              </div>
              <h3 className="font-bold text-xs text-[#1E2229] leading-tight">{item.title}</h3>
              <p className="text-[10px] text-slate-400 font-medium leading-normal max-w-[150px]">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
