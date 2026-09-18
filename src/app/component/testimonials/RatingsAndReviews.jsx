import { Users, Star, ArrowRight, CheckCircle2 } from "lucide-react";

export default function RatingsAndReviews() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-gray-150 pb-2 select-none">
        <h3 className="text-sm font-poppins font-semibold text-[#1E2229] tracking-wide">Rating & Reviews</h3>
        <button className="text-[10px] font-poppins font-bold text-[#2D24D0] hover:text-[#1E2229] flex items-center gap-0.5 cursor-pointer">
          <span>View All Reviews</span>
          <ArrowRight size={12} />
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_2fr] items-start">
        {/* Score breakdown card */}
        <div className="bg-white border border-[#cbd5e1]/45 p-5 rounded-2xl shadow-sm grid gap-5 grid-cols-1 sm:grid-cols-[140px_1fr] md:grid-cols-1 items-center">
          <div className="text-center sm:text-left md:text-center space-y-1.5 border-b sm:border-b-0 md:border-b border-gray-100 pb-3 sm:pb-0 md:pb-3 shrink-0">
            <div className="text-5xl font-poppins font-semibold text-[#1E2229] tracking-tighter">4.6</div>
            
            <div className="flex items-center justify-center sm:justify-start md:justify-center gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-[9px] font-poppins font-medium text-slate-400 uppercase tracking-wide">
              Out of 5
            </p>
            <p className="text-[9px] font-poppins font-medium text-[#5E637D] select-none">
              Based on 31,234 reviews
            </p>
          </div>

          <div className="space-y-1.5 text-[9px] font-poppins font-medium text-[#5E637D]">
            {[
              { stars: 5, pct: "65%", count: "20,241" },
              { stars: 4, pct: "30%", count: "10,542" },
              { stars: 3, pct: "3%", count: "500" },
              { stars: 2, pct: "1%", count: "200" },
              { stars: 1, pct: "1%", count: "200" }
            ].map((bar) => (
              <div key={bar.stars} className="flex items-center gap-3">
                <span className="w-2 shrink-0">{bar.stars}★</span>
                <div className="h-2 bg-gray-100 rounded-full flex-1 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: bar.pct }} />
                </div>
                <span className="w-14 text-right text-slate-400 shrink-0">{bar.count} ({bar.pct})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews detail cards */}
        <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory sm:grid sm:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div 
              key={i} 
              className="bg-white border border-[#cbd5e1]/45 p-4.5 rounded-2xl shadow-3xs flex flex-col justify-between h-full text-left shrink-0 min-w-[240px] sm:min-w-0 snap-start"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-150">
                    <Users size={14} className="text-slate-500" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-[11px] font-poppins font-semibold text-[#1E2229]">Aman Singh</h4>
                    <span className="text-[9px] font-poppins font-bold text-[#2D24D0] flex items-center gap-0.5">
                      <CheckCircle2 size={10} className="fill-[#2D24D0] text-white" />
                      <span>Verified User</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 select-none">
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={10} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-poppins font-semibold text-[#1E2229]">5.0</span>
                </div>

                <p className="text-[10px] font-poppins font-medium text-[#5E637D] leading-relaxed">
                  Got placed in my dream company. Thank you HireMind for all the support!
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#f1f5f9] text-[9px] font-poppins font-medium text-slate-400 select-none">
                2 weeks ago
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
