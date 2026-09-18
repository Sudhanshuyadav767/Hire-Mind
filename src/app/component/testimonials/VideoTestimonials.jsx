import { Users, Play, ArrowRight } from "lucide-react";

const videoTestimonials = [
  { name: "Aman Singh", role: "Flutter Developer", placed: "MindManthan" },
  { name: "Aman Singh", role: "Flutter Developer", placed: "MindManthan" },
  { name: "Aman Singh", role: "Flutter Developer", placed: "MindManthan" },
  { name: "Aman Singh", role: "Flutter Developer", placed: "MindManthan" }
];

export default function VideoTestimonials() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-gray-150 pb-2 select-none">
        <h3 className="text-sm font-poppins font-semibold text-[#1E2229] tracking-wide">Video Testimonials</h3>
        <button className="text-[10px] font-poppins font-bold text-[#2D24D0] hover:text-[#1E2229] flex items-center gap-0.5 cursor-pointer">
          <span>View All Stories</span>
          <ArrowRight size={12} />
        </button>
      </div>

      <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-4 gap-4">
        {videoTestimonials.map((vid, i) => (
          <div 
            key={i} 
            className="bg-white border border-[#cbd5e1]/65 hover:border-[#2D24D0]/60 rounded-2xl p-3 shadow-3xs hover:shadow-xs transition shrink-0 w-[240px] md:w-auto snap-start"
          >
            <div className="relative aspect-video rounded-xl bg-slate-900 overflow-hidden flex items-center justify-center group shadow-3xs">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-0 opacity-80" />
              <div className="absolute inset-0 bg-slate-800 flex items-center justify-center opacity-60">
                <Users size={48} className="text-slate-400 stroke-[1]" />
              </div>

              <button className="p-3 bg-white hover:scale-105 text-[#2D24D0] rounded-full shadow-md z-10 transition duration-150 cursor-pointer">
                <Play size={18} className="fill-[#2D24D0]" />
              </button>
              
              <span className="absolute bottom-2 right-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[8px] font-poppins font-bold text-white font-mono select-none z-10">
                2:00
              </span>
            </div>

            <div className="mt-3.5 space-y-1 text-left px-0.5">
              <h4 className="text-[11px] font-poppins font-semibold text-[#1E2229] leading-snug">{vid.name}</h4>
              <p className="text-[9px] font-poppins font-medium text-[#5E637D] leading-none">{vid.role}</p>
              <p className="text-[9px] font-poppins font-medium text-slate-500 leading-none pt-1">
                Placed at: <b className="text-[#334155] font-semibold">{vid.placed}</b>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
