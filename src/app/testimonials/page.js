"use client";

import Header from "../component/common/Header";
import Footer from "../component/common/Footer";
import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  Users, 
  Briefcase, 
  Award, 
  CheckCircle, 
  Play, 
  ArrowRight,
  Database,
  Star,
  CheckCircle2,
  Bot
} from "lucide-react";

// Mock Data matching mockup screenshots exactly
const stats = [
  { label: "Happy Job Seekers", value: "10M+", icon: Users, bg: "bg-[#2D24D0]/10 text-[#2D24D0]" },
  { label: "Applications Submitted", value: "24M+", icon: Briefcase, bg: "bg-[#2D24D0]/10 text-[#2D24D0]" },
  { label: "Successful Placements", value: "200K+", icon: Award, bg: "bg-[#2D24D0]/10 text-[#2D24D0]" },
  { label: "Average Rating", value: "4.7/5", icon: Star, bg: "bg-[#2D24D0]/10 text-[#2D24D0]" }
];

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

const videoTestimonials = [
  { name: "Aman Singh", role: "Flutter Developer", placed: "MindManthan" },
  { name: "Aman Singh", role: "Flutter Developer", placed: "MindManthan" },
  { name: "Aman Singh", role: "Flutter Developer", placed: "MindManthan" },
  { name: "Aman Singh", role: "Flutter Developer", placed: "MindManthan" }
];

const featuresAppreciated = [
  { title: "Easy to Use", desc: "Simple and intuitive Platform" },
  { title: "Great Opportunities", desc: "Wide range of job opportunities" },
  { title: "AI-Powered Tools", desc: "Smart tools that make a difference" },
  { title: "Top Companies", desc: "Connect with leading companies" },
  { title: "Helpful Support", desc: "Responsive support when you need it" }
];

export default function TestimonialsPage() {
  return (
    <div className="min-w-[320px] bg-[#f8f9ff] text-[#101014] font-poppins min-h-screen flex flex-col justify-between">
      <div>
        <Header />

        {/* 1. Hero Section (Aligned to Figma colors and Poppins font style) */}
        <section className="bg-[#E2E4F8] px-4 py-8 lg:px-8 rounded-b-3xl my-2 mx-auto max-w-7xl shadow-3xs">
          <div className="mx-auto max-w-7xl grid grid-cols-12 gap-4 items-center">
            
            {/* Left Column Description */}
            <div className="col-span-7 flex flex-col justify-center text-left space-y-2">
              <h1 className="text-[clamp(1.1rem,4.5vw,3rem)] font-poppins font-medium text-[#1E2229] tracking-tight leading-tight">
                What Job Seekers Say
              </h1>
              
              <div className="text-[10px] sm:text-xs font-poppins font-bold text-[#2D24D0] select-none uppercase tracking-wide">
                Real stories, Real success.
              </div>

              <p className="text-[#5E637D] text-[clamp(0.65rem,1.8vw,0.9rem)] max-w-xl leading-relaxed font-poppins font-medium">
                Read inspiring stories and honest reviews from job seekers who found the right opportunities with HireMind.
              </p>
            </div>

            {/* Right Column Image */}
            <div className="col-span-5 relative flex items-center justify-center h-[160px] sm:h-[260px] scale-95 sm:scale-100 origin-center shrink-0">
              <div className="relative w-full max-w-[280px] h-full rounded-2xl overflow-hidden  sm:">
                <Image 
                  src="/Images/testimonials_hero_woman.jpg" 
                  alt="What Job Seekers Say"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </section>

        {/* 2. Stats bar metrics */}
        <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8 select-none">
          <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-4 gap-4 bg-white border border-[#cbd5e1]/45 p-4 rounded-2xl shadow-2xs">
            {stats.map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <div 
                  key={i} 
                  className={`flex items-center gap-3.5 p-3 rounded-xl border border-slate-50 shrink-0 min-w-[155px] md:min-w-0 snap-start h-full ${
                    i < stats.length - 1 ? "md:border-r md:border-gray-100" : ""
                  }`}
                >
                  <div className={`p-2.5 rounded-full shrink-0 ${stat.bg}`}>
                    <StatIcon size={16} className="stroke-[1.5]" />
                  </div>
                  <div className="space-y-0.5 text-left">
                    <b className="text-sm sm:text-base font-poppins font-semibold text-[#1E2229] block leading-none">
                      {stat.value}
                    </b>
                    <span className="text-[9px] sm:text-[10px] font-poppins font-medium text-[#5E637D] block leading-tight">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Main Content Containers */}
        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8 space-y-10">
          
          {/* 3. Success Stories */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-150 pb-2">
              <h3 className="text-sm font-poppins font-semibold text-[#1E2229] tracking-wide select-none">Success Stories</h3>
              <button className="text-[10px] font-poppins font-bold text-[#2D24D0] hover:text-[#1E2229] flex items-center gap-0.5 cursor-pointer">
                <span>View All Stories</span>
                <ArrowRight size={12} />
              </button>
            </div>

            {/* Horizontal scroll elements on mobile, 4-col wrapper layout on desktop */}
            <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-4 gap-4">
              {successStories.map((story, i) => (
                <div 
                  key={i} 
                  className="bg-white border border-[#cbd5e1]/65 hover:border-[#2D24D0]/60 rounded-2xl p-4.5 shadow-3xs flex flex-col justify-between shrink-0 w-[240px] md:w-auto hover:shadow-xs transition duration-150 snap-start"
                >
                  <div className="space-y-3 text-left">
                    {/* Identity Details */}
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
                    {/* Star icons */}
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

          {/* 4. What Our Users Appreciate */}
          <section className="bg-white border border-[#cbd5e1]/45 p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-xs font-poppins font-semibold text-[#1E2229] select-none uppercase tracking-wider text-left">What Our Users Appreciate</h3>
            
            <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-5 gap-4">
              {featuresAppreciated.map((feat, i) => (
                <div key={i} className="flex items-start gap-3 shrink-0 w-[200px] md:w-auto text-left snap-start">
                  {/* Database barrel shapes */}
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

          {/* 5. Video Testimonials */}
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

                    {/* Circular Play Icon using brand color #2D24D0 */}
                    <button className="p-3 bg-white hover:scale-105 text-[#2D24D0] rounded-full shadow-md z-10 transition duration-150 cursor-pointer">
                      <Play size={18} className="fill-[#2D24D0]" />
                    </button>
                    
                    <span className="absolute bottom-2 right-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[8px] font-poppins font-bold text-white font-mono select-none z-10">
                      2:00
                    </span>
                  </div>

                  {/* Text labels */}
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

          {/* 6. Ratings & Reviews */}
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

                {/* Progress bar lists */}
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

          {/* 7. Bottom CTA banner */}
          <section className="bg-[#E2E4F8] rounded-3xl p-6 sm:p-8 text-[#1E2229] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden select-none">
            
            <div className="flex items-center gap-4 text-left">
              <div className="p-3 bg-white text-[#2D24D0] rounded-2xl shadow-3xs shrink-0 hidden sm:flex">
                <Bot size={28} className="stroke-[1.5]" />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-poppins font-semibold text-[#1E2229]">Ready to start your success story?</h3>
                <p className="text-[#5E637D] text-xs sm:text-sm font-poppins font-medium max-w-xl leading-normal">
                  Join thousands of job seekers who found their dream jobs with HireMind.
                </p>
              </div>
            </div>

            <Link 
              href="/find-jobs"
              className="rounded-xl bg-[#2D24D0] hover:bg-[#1e1c75] text-white px-6 py-3 text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shrink-0 w-full md:w-auto cursor-pointer"
            >
              <span>Find Your Dream Job</span>
              <ArrowRight size={14} />
            </Link>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  );
}
