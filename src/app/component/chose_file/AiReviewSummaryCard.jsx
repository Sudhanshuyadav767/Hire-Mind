export default function AiReviewSummaryCard() {
  const scores = [
    { label: "Content Quality", score: "85/100", pct: "85%", color: "bg-emerald-500" },
    { label: "ATS Compatibility", score: "90/100", pct: "90%", color: "bg-emerald-500" },
    { label: "Skill & Keywords", score: "77/100", pct: "77%", color: "bg-blue-600" },
    { label: "Formatting", score: "65/100", pct: "65%", color: "bg-amber-400" }
  ];

  return (
    <div className="bg-white border border-[#cbd5e1]/45 p-6 sm:p-8 rounded-3xl shadow-sm text-left space-y-6">
      <h2 className="text-lg sm:text-xl font-bold font-poppins text-[#1E2229]">
        AI Review Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Side: Score & Message */}
        <div className="flex items-center gap-5">
          <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-full border-4 border-[#2D24D0] bg-white flex flex-col items-center justify-center shrink-0 shadow-inner">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#1E2229] leading-none">87</span>
            <span className="text-[10px] text-slate-400 font-bold leading-none mt-0.5">/100</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-[#2D24D0]">
              Great Job!
            </h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs">
              Your resume is strong. A few improvements can make it excellent.
            </p>
          </div>
        </div>

        {/* Right Side: Progress Bars */}
        <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8">
          {scores.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-[#1E2229]">
                <span>{item.label}</span>
                <span className="text-slate-500 font-semibold">{item.score}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${item.color} rounded-full`} style={{ width: item.pct }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
