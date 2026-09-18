import { Users, Star, ArrowRight } from "lucide-react";

const successStories = [
  {
    name: "Aman Singh",
    role: "Flutter developer",
    company: "MindManthan",
    text: "The platform is intuitive and the job recommendations are spot on. Highly recommend to all job seekers!",
    time: "1 week ago"
  },
  {
    name: "Aman Singh",
    role: "Flutter developer",
    company: "MindManthan",
    text: "The platform is intuitive and the job recommendations are spot on. Highly recommend to all job seekers!",
    time: "1 week ago"
  },
  {
    name: "Aman Singh",
    role: "Flutter developer",
    company: "MindManthan",
    text: "The platform is intuitive and the job recommendations are spot on. Highly recommend to all job seekers!",
    time: "1 week ago"
  },
  {
    name: "Aman Singh",
    role: "Flutter developer",
    company: "MindManthan",
    text: "The platform is intuitive and the job recommendations are spot on. Highly recommend to all job seekers!",
    time: "1 week ago"
  }
];

export default function SuccessStories() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-gray-150 pb-2">
        <h3 className="text-sm font-poppins font-semibold text-[#1E2229] tracking-wide select-none">Success Stories</h3>
        <button className="text-[10px] font-poppins font-bold text-[#2D24D0] hover:text-[#1E2229] flex items-center gap-0.5 cursor-pointer">
          <span>View All Stories</span>
          <ArrowRight size={12} />
        </button>
      </div>

      <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-4 gap-4">
        {successStories.map((story, i) => (
          <div 
            key={i} 
            className="bg-white border border-[#cbd5e1]/65 hover:border-[#2D24D0]/60 rounded-2xl p-4.5 shadow-3xs flex flex-col justify-between shrink-0 w-[240px] md:w-auto hover:shadow-xs transition duration-150 snap-start"
          >
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-150">
                  <Users size={16} className="text-slate-500" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-[11px] font-poppins font-semibold text-[#1E2229]">{story.name}</h4>
                  <p className="text-[9px] font-poppins font-medium text-[#5E637D] leading-none">
                    {story.role}
                  </p>
                  <p className="text-[9px] font-poppins font-medium text-slate-500 leading-none pt-0.5">
                    Placed at <span className="text-[#2D24D0] font-semibold">{story.company}</span>
                  </p>
                </div>
              </div>

              <p className="text-[10px] font-poppins font-medium text-[#5E637D] leading-relaxed">
                {story.text}
              </p>
            </div>

            <div className="mt-4 pt-3.5 border-t border-[#f1f5f9] flex items-center justify-between">
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, sIdx) => (
                  <Star key={sIdx} size={11} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[9px] font-poppins font-medium text-slate-400 select-none">
                {story.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
