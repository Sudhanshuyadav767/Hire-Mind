"use client";

import Header from "../component/common/Header";
import Footer from "../component/common/Footer";
import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  Search, 
  ChevronDown, 
  Code2, 
  ArrowRight,
  Database,
  Megaphone,
  PenTool,
  Play,
  Cpu
} from "lucide-react";

// Mock data matching mockup exactly
const topCategories = Array.from({ length: 14 }).map((_, i) => ({
  id: i + 1,
  title: "Development",
  jobs: "1,000 Jobs"
}));

const featuredCategories = [
  {
    title: "Data Science",
    desc: "High demand. Great opportunities",
    jobs: "3,500 Jobs",
    icon: Database,
    color: "text-[#2D24D0] bg-blue-50 border-blue-100"
  },
  {
    title: "Software Development",
    desc: "Build the future with code",
    jobs: "3,500 Jobs",
    icon: Code2,
    color: "text-emerald-500 bg-emerald-50 border-emerald-100"
  },
  {
    title: "Digital Marketing",
    desc: "Grow brands. Drive results",
    jobs: "3,500 Jobs",
    icon: Megaphone,
    color: "text-amber-500 bg-amber-50 border-amber-100"
  },
  {
    title: "UI/UX Design",
    desc: "Design experiences people love",
    jobs: "3,500 Jobs",
    icon: PenTool,
    color: "text-purple-500 bg-purple-50 border-purple-100"
  }
];

const trendingSkills = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  name: "Python",
  jobs: "8,000Jobs"
}));

export default function CategoriesPage() {
  return (
    <div className="min-w-[320px] bg-[#f8f9ff] text-[#101014] font-poppins min-h-screen flex flex-col justify-between">
      <div>
        <Header />

        {/* 1. Hero banner section with lavender background */}
        <section className="bg-[#E2E4F8] px-4 py-8 lg:px-8 rounded-b-3xl my-2 mx-auto max-w-7xl relative shadow-3xs overflow-hidden">
          
          <div className="mx-auto max-w-7xl grid grid-cols-12 gap-4 items-center z-10 relative">
            
            {/* Left Content Column */}
            <div className="col-span-7 flex flex-col justify-center text-left space-y-2 sm:space-y-4">
              <h1 className="text-[clamp(1.1rem,4.5vw,3rem)] font-poppins font-medium text-[#1E2229] tracking-tight leading-tight">
                Top Categories
              </h1>
              
              <div className="text-[10px] sm:text-xs font-poppins font-bold text-[#2D24D0] uppercase tracking-wide select-none">
                Explore top job categories and find the right fit for your career.
              </div>

              <p className="text-[#5E637D] text-[clamp(0.65rem,1.8vw,0.9rem)] max-w-xl leading-relaxed font-poppins font-medium">
                Browse job opportunities across leading industries and discover roles that match your skills and passion.
              </p>

              {/* Banner Search Input Grids */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl gap-2 w-full max-w-lg mt-3 p-1.5 shadow-sm border border-slate-100/50">
                {/* Text query input */}
                <div className="flex flex-1 items-center gap-1.5 px-2 py-1">
                  <Search size={14} className="text-slate-400 shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Search Categories, roles..."
                    className="w-full bg-transparent text-[10px] sm:text-xs text-[#1e293b] outline-none placeholder:text-slate-400 font-semibold"
                  />
                </div>

                {/* Industry select dropdown */}
                <div className="flex items-center gap-1.5 px-2 py-1 border-t sm:border-t-0 sm:border-l border-gray-150 select-none">
                  <select className="bg-transparent text-[10px] sm:text-xs text-[#475569] font-bold outline-none cursor-pointer">
                    <option>All Industries</option>
                    <option>Technology</option>
                    <option>Marketing</option>
                  </select>
                </div>

                {/* Explore button */}
                <Link href="/find-jobs" className="shrink-0">
                  <button className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#2D24D0] hover:bg-[#1f1a8c] text-white text-[10px] sm:text-xs font-bold transition flex items-center justify-center cursor-pointer">
                    <span>Explore</span>
                  </button>
                </Link>
              </div>

            </div>

            {/* Right Candidate Image */}
            <div className="col-span-5 relative flex items-center justify-center aspect-square scale-[0.6] sm:scale-100 origin-center shrink-0">
              <div className="relative w-full h-full  overflow-hidden ">
                <Image 
                  src="/Images/testimonials_hero_woman.jpg" 
                  alt="Explore categories"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </section>

        {/* 2. Top Categories 14 Grid */}
        <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8 space-y-5 text-center">
          <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory lg:grid lg:grid-cols-7 gap-4">
            {topCategories.map((item) => (
              <div 
                key={item.id}
                className="bg-white border border-[#cbd5e1]/65 hover:border-[#2D24D0]/60 rounded-2xl p-5 flex flex-col items-center justify-between gap-3 text-center shadow-3xs hover:shadow-xs hover:-translate-y-1 transition duration-150 shrink-0 min-w-[140px] lg:min-w-0 snap-start"
              >
                {/* Code Bracket Icon */}
                <div className="p-3.5 bg-blue-50 text-[#2D24D0] rounded-2xl shrink-0 border border-blue-100/50">
                  <Code2 size={22} className="stroke-[1.5]" />
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-xs font-poppins font-bold text-[#1E2229] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[10px] font-poppins font-semibold text-[#5E637D]">
                    {item.jobs}
                  </p>
                </div>

                <Link 
                  href="/find-jobs"
                  className="text-[9px] font-poppins font-bold text-[#2D24D0] hover:underline flex items-center gap-0.5 mt-1 cursor-pointer select-none"
                >
                  <span>Explore Jobs</span>
                  <ArrowRight size={10} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Featured Categories */}
        <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-150 pb-2">
            <h3 className="text-sm font-poppins font-semibold text-[#1E2229] select-none">Featured Categories</h3>
            <Link href="/categories">
              <button className="text-[10px] font-poppins font-bold text-[#2D24D0] hover:text-[#1E2229] flex items-center gap-0.5 cursor-pointer">
                <span>View All Categories</span>
                <ArrowRight size={12} />
              </button>
            </Link>
          </div>

          <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-4 gap-4">
            {featuredCategories.map((feat, i) => {
              const FeatIcon = feat.icon;
              return (
                <div 
                  key={i} 
                  className="bg-white border border-[#cbd5e1]/65 hover:border-[#2D24D0]/60 rounded-2xl p-4.5 flex flex-col justify-between shrink-0 w-[200px] md:w-auto hover:shadow-xs transition text-left snap-start"
                >
                  <div className="space-y-4">
                    {/* Icon banner */}
                    <div className={`p-3 rounded-2xl shrink-0 border w-fit ${feat.color}`}>
                      <FeatIcon size={18} className="stroke-[1.5]" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs font-poppins font-bold text-[#1E2229]">{feat.title}</h4>
                      <p className="text-[10px] font-poppins font-semibold text-[#5E637D] leading-tight line-clamp-1">
                        {feat.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-[#f1f5f9] flex items-center justify-between">
                    <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-[9px] font-poppins font-bold text-slate-500 select-none">
                      {feat.jobs}
                    </span>
                    
                    <Link href="/find-jobs">
                      <button className="p-1.5 rounded-lg bg-[#2D24D0]/10 hover:bg-[#2D24D0] text-[#2D24D0] hover:text-white transition cursor-pointer">
                        <ArrowRight size={12} />
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Trending Skills */}
        <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8 space-y-4 pb-12">
          <div className="flex items-center justify-between border-b border-gray-150 pb-2 select-none">
            <h3 className="text-sm font-poppins font-semibold text-[#1E2229]">Trending Skills</h3>
            <button className="text-[10px] font-poppins font-bold text-[#2D24D0] hover:text-[#1E2229] flex items-center gap-0.5 cursor-pointer">
              <span>View All Skills</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-6 gap-4">
            {trendingSkills.map((skill) => (
              <div 
                key={skill.id} 
                className="bg-white border border-[#cbd5e1]/65 hover:border-[#2D24D0]/60 rounded-2xl p-4 flex items-center gap-3 shrink-0 w-[160px] md:w-auto hover:shadow-xs transition text-left cursor-pointer snap-start"
              >
                {/* DB database cylinder icon */}
                <div className="p-2.5 bg-blue-50 text-[#2D24D0] rounded-xl shrink-0 border border-blue-100/50 shadow-3xs">
                  <Database size={15} />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-[11px] font-poppins font-bold text-[#334155] leading-none">{skill.name}</h4>
                  <p className="text-[9px] font-poppins font-semibold text-slate-400 leading-none pt-1">
                    {skill.jobs}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}
