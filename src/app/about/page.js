"use client";

import Header from "../component/common/Header";
import Footer from "../component/common/Footer";
import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  Briefcase, 
  Building2, 
  FileText, 
  Target, 
  Eye, 
  ArrowRight
} from "lucide-react";

// Mock stats matching mockup exactly
const stats = [
  { 
    label: "Active Users", 
    sub: "Growing community of job seekers and professionals", 
    value: "500K+", 
    icon: Users,
    bg: "bg-[#eef1ff] text-[#2D24D0]"
  },
  { 
    label: "Job Opportunites", 
    sub: "Access thousands of job listings across industries", 
    value: "50K+", 
    icon: Briefcase,
    bg: "bg-[#eef1ff] text-[#2D24D0]"
  },
  { 
    label: "Verified Companies", 
    sub: "Top companies trust us to find the right talent", 
    value: "5K+", 
    icon: Building2,
    bg: "bg-[#eef1ff] text-[#2D24D0]"
  },
  { 
    label: "Applications", 
    sub: "Successful applications submitted by our users", 
    value: "90K+", 
    icon: FileText,
    bg: "bg-[#eef1ff] text-[#2D24D0]"
  }
];

// Mock team members
const team = Array.from({ length: 4 }).map((_, i) => ({
  id: i + 1,
  name: "Aman Singh",
  role: "CEO & Co-Founder"
}));

export default function AboutUsPage() {
  return (
    <div className="min-w-[320px] bg-[#f8f9ff] text-[#101014] font-poppins min-h-screen flex flex-col justify-between">
      <div>
        <Header />

        {/* 1. Hero banner section with lavender background */}
        <section className="bg-[#E2E4F8] px-4 py-8 lg:px-8 rounded-b-3xl my-2 mx-auto max-w-7xl relative shadow-3xs overflow-hidden">
          
          <div className="mx-auto max-w-7xl grid grid-cols-12 gap-4 items-center z-10 relative">
            
            {/* Left Content Column */}
            <div className="col-span-7 flex flex-col justify-center text-left space-y-2.5 sm:space-y-4">
              <span className="text-[9px] sm:text-[10px] font-poppins font-bold text-[#2D24D0] uppercase tracking-wider block select-none">
                About Us
              </span>

              <h1 className="text-[clamp(1.1rem,4.5vw,3rem)] font-poppins font-medium text-[#1E2229] tracking-tight leading-tight">
                Empowering Career. <br />
                Building <span className="text-[#2D24D0]">Futures.</span>
              </h1>

              <p className="text-[#5E637D] text-[clamp(0.65rem,1.8vw,0.9rem)] max-w-xl leading-relaxed font-poppins font-medium">
                At HireMind AI, we believe every talent deserves the right opportunity. Our AI-powered platform connects job seekers with employers, provides smart career guidance, and helps you grow at every step of your journey.
              </p>

              {/* Join our mission button */}
              <Link href="/find-jobs" className="inline-block pt-1">
                <button className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#2D24D0] hover:bg-[#1f1a8c] text-white text-[10px] sm:text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer shadow-sm">
                  <span>Join Our Mission</span>
                  <ArrowRight size={12} />
                </button>
              </Link>
            </div>

            {/* Right Candidate Group Photo */}
            <div className="col-span-5 relative flex items-center justify-center aspect-[3/2] scale-90 sm:scale-100 origin-center shrink-0">
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg bg-white border-2 border-white sm:border-4">
                <Image 
                  src="/Images/about_hero_team.jpg" 
                  alt="HireMind Team Collaboration"
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
                  className={`flex items-start gap-3 p-2.5 rounded-xl border border-slate-50 shrink-0 min-w-[200px] md:min-w-0 snap-start h-full ${
                    i < stats.length - 1 ? "md:border-r md:border-gray-100" : ""
                  }`}
                >
                  <div className={`p-2 rounded-full shrink-0 ${stat.bg}`}>
                    <StatIcon size={16} className="stroke-[1.5]" />
                  </div>
                  <div className="space-y-1 text-left">
                    <b className="text-sm sm:text-base font-poppins font-semibold text-[#1E2229] block leading-none">
                      {stat.value}
                    </b>
                    <h4 className="text-[10px] sm:text-[11px] font-poppins font-bold text-[#334155] leading-snug">
                      {stat.label}
                    </h4>
                    <p className="text-[8px] sm:text-[9px] font-poppins font-medium text-[#5E637D] leading-tight pr-1">
                      {stat.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Mission & Vision Cards */}
        <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8 grid gap-4 grid-cols-2">
          
          {/* Mission Card */}
          <div className="bg-[#2D24D0]/5 border border-[#2D24D0]/10 rounded-3xl p-3 sm:p-6 flex flex-col sm:flex-row items-start gap-2 sm:gap-4 relative overflow-hidden text-left h-full">
            <div className="p-2 sm:p-3.5 bg-[#2D24D0]/10 text-[#2D24D0] rounded-xl sm:rounded-2xl shrink-0">
              <Target className="w-4 h-4 sm:w-6 sm:h-6 stroke-[1.5]" />
            </div>
            
            <div className="space-y-1.5 sm:space-y-2.5 z-10">
              <h3 className="text-[10px] sm:text-base font-poppins font-bold text-[#2D24D0]">Our Mission</h3>
              <p className="text-[9px] sm:text-xs font-poppins font-medium text-emerald-600/80 leading-relaxed max-w-md">
                To empower individuals to achieve their career goals by connecting them with right opportunities, leveraging AI technology and expert guidance.
              </p>
            </div>
            
            {/* Mountain peak graphic representation at bottom right */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#2D24D0]/5 rounded-full select-none" />
          </div>

          {/* Vision Card */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-3 sm:p-6 flex flex-col sm:flex-row items-start gap-2 sm:gap-4 relative overflow-hidden text-left h-full">
            <div className="p-2 sm:p-3.5 bg-emerald-100/60 text-emerald-600 rounded-xl sm:rounded-2xl shrink-0">
              <Eye className="w-4 h-4 sm:w-6 sm:h-6 stroke-[1.5]" />
            </div>
            
            <div className="space-y-1.5 sm:space-y-2.5 z-10">
              <h3 className="text-[10px] sm:text-base font-poppins font-bold text-emerald-700">Our Vision</h3>
              <p className="text-[9px] sm:text-xs font-poppins font-medium text-emerald-600/80 leading-relaxed max-w-md">
                To become the world&apos;s most trusted career platform, transforming the way people discover opportunities and build meaningful careers.
              </p>
            </div>

            {/* Telescope graphic representation at bottom right */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-100/20 rounded-full select-none" />
          </div>

        </section>

        {/* 4. Meet Our Team Section */}
        <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8 space-y-6 text-center pb-12">
          
          <div className="space-y-1.5 select-none">
            <h2 className="text-lg sm:text-2xl font-poppins font-semibold text-[#1E2229]">Meet Our team</h2>
            <p className="text-[10px] sm:text-sm font-poppins font-medium text-[#5E637D] max-w-2xl mx-auto">
              Passionate professionals working together to revolutionize the future of hiring and career growth.
            </p>
          </div>

          {/* Team Cards Grid */}
          <div className="flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-4 gap-4">
            {team.map((member) => (
              <div 
                key={member.id}
                className="bg-white border border-[#cbd5e1]/65 hover:border-[#2D24D0]/60 rounded-2xl p-5 flex flex-col items-center justify-between gap-4 text-center shadow-3xs hover:shadow-xs hover:-translate-y-1 transition duration-150 shrink-0 min-w-[160px] md:min-w-0 snap-start"
              >
                {/* User avatar container */}
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-150 overflow-hidden shadow-2xs select-none">
                  <Users size={28} className="text-slate-500 stroke-[1.2]" />
                </div>

                <div className="space-y-0.5">
                  <h4 className="text-xs font-poppins font-bold text-[#1E2229]">
                    {member.name}
                  </h4>
                  <p className="text-[10px] font-poppins font-semibold text-[#5E637D]">
                    {member.role}
                  </p>
                </div>

                {/* Social icons row */}
                <div className="flex items-center justify-center gap-2 pt-1 select-none">
                  {/* LinkedIn SVG */}
                  <button className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center hover:bg-[#2D24D0] hover:text-white transition cursor-pointer">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </button>
                  {/* X (Twitter) SVG */}
                  <button className="w-6 h-6 rounded-full bg-slate-50 text-[#101014] border border-slate-200 flex items-center justify-center hover:bg-black hover:text-white transition cursor-pointer">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </button>
                  {/* Mail SVG */}
                  <button className="w-6 h-6 rounded-full bg-sky-50 text-sky-500 border border-sky-100 flex items-center justify-center hover:bg-sky-500 hover:text-white transition cursor-pointer">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                    </svg>
                  </button>
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
