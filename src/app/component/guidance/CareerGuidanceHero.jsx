import Image from "next/image";
import { Sparkles, Target, Zap, Map, TrendingUp } from "lucide-react";

export default function CareerGuidanceHero() {
  return (
    <section className="relative my-2 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl bg-[#E2E4F8] border border-indigo-100/70 p-5 sm:p-7 lg:p-8 shadow-2xs overflow-hidden">
        
        {/* Soft Background Accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-200/30 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-12 gap-4 items-center">
          
          {/* Left Content Column */}
          <div className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-col justify-center text-left space-y-2.5 sm:space-y-3">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-indigo-200/80 text-[#2D24D0] text-xs font-bold shadow-2xs w-fit">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse shrink-0" />
              <span>Next-Gen AI Powered Career Intelligence</span>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E2229] tracking-tight leading-tight font-poppins">
              AI Career Guidance & <span className="text-[#2D24D0]">Smart Roadmap</span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-[#5E637D] text-xs sm:text-sm lg:text-base leading-relaxed font-poppins font-medium max-w-xl">
              Get personalized career recommendations, in-depth skill gap insights, and an actionable step-by-step roadmap powered by Gemini AI.
            </p>

            {/* Feature Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center gap-1.5 bg-white/90 border border-indigo-100/80 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs">
                <Target className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>98% Match Accuracy</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/90 border border-indigo-100/80 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs">
                <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Skill Gap Analysis</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/90 border border-indigo-100/80 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-2xs">
                <Map className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Custom Roadmap</span>
              </div>
            </div>

          </div>

          {/* Right Robot Mascot Column */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4 relative flex items-center justify-center pt-2 md:pt-0">
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-60 lg:h-60 flex items-center justify-center">
              
              {/* Soft Circle Background */}
              <div className="absolute w-40 h-40 sm:w-52 sm:h-52 lg:w-56 lg:h-56 bg-white/60 rounded-full border border-white/80 shadow-2xs" />

              {/* Robot Mascot Image */}
              <Image
                src="/Images/Robot1.png"
                alt="AI Career Guidance Robot"
                width={280}
                height={280}
                priority
                className="relative z-10 w-auto h-auto max-h-40 sm:max-h-52 lg:max-h-56 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
              />

              {/* Floating Stat Badge Overlay */}
              <div className="absolute -bottom-1 -left-1 sm:bottom-2 sm:left-0 z-20 bg-white/95 rounded-xl p-2 sm:p-2.5 shadow-md border border-indigo-100 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 font-bold">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Hiring Trends</p>
                  <p className="text-xs font-extrabold text-slate-800">Live AI Insights</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


