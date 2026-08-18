"use client";

import React from 'react';
import Image from 'next/image';
import { Search, MapPin, Briefcase, Sparkles, FileText, CheckCircle, Bot, ChartNoAxesCombined } from 'lucide-react';

const Hero = () => {
  return (
    <section className="home-hero relative w-full bg-white overflow-hidden">
      <div className="home-container max-w-7xl mx-auto bg-[#E2E4F8] px-4 sm:px-6 lg:px-8 py-10 lg:py-16 rounded-3xl relative z-10 my-4">
        <div className="grid grid-cols-12 gap-4 items-center">
          
          {/* LEFT CONTENT: Heading, Subtext, Search Bar & Popular Tags */}
          <div className="col-span-7 flex flex-col justify-center text-left">
            
            {/* Top AI Badge */}
            <div className="inline-flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full w-fit mb-4 shadow-xs select-none">
              <Sparkles className="w-3.5 h-3.5 text-[#2D24D0]" />
              <span className="text-[10px] font-semibold text-[#2D24D0] tracking-wide font-poppins">
                AI-Powered Job Portal
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[clamp(1.1rem,4.5vw,3.75rem)] font-medium font-poppins text-[#1E2229] tracking-tight leading-tight">
              Find Jobs. Grow Skills. <br />
              <span className="text-[#1E2229] mt-1 block">Build Your <span className="text-[#2D24D0]">Future.</span></span>
            </h1>

            {/* Paragraph Subtext */}
            <p className="text-gray-600 text-[clamp(0.65rem,1.8vw,1rem)] max-w-xl mt-3 sm:mt-6 leading-relaxed font-poppins font-medium">
              Discover the best job opportunities, internships, and freelance projects. <br className="hidden sm:inline" />
              Get AI-powered support for resume, mock interviews, and more.
            </p>

            {/* Multi-Input Search Bar Block */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl gap-2.5 w-full max-w-full md:max-w-[850px] mt-4 sm:mt-8 z-20 p-2 sm:p-1.5 shadow-sm border border-slate-100/40 md:border-none">
              
              {/* Job Title Input */}
              <div className="bg-white flex flex-1 items-center gap-2 px-3 h-[38px] sm:h-[49px] rounded-xl border border-gray-200 shadow-2xs md:shadow-none md:border-none">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Job title or company" 
                  className="w-full text-xs sm:text-sm font-medium text-gray-700 placeholder:text-slate-400 outline-none bg-transparent"
                />
              </div>

              {/* Location Input */}
              <div className="bg-white flex flex-1 items-center gap-2 px-3 h-[38px] sm:h-[49px] rounded-xl border border-gray-200 shadow-2xs md:shadow-none md:border-none">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Location" 
                  className="w-full text-xs sm:text-sm font-medium text-gray-700 placeholder:text-slate-400 outline-none bg-transparent"
                />
              </div>

              {/* Experience Input */}
              <div className="bg-white flex flex-1 items-center gap-2 px-3 h-[38px] sm:h-[49px] rounded-xl border border-gray-200 shadow-2xs md:shadow-none md:border-none">
                <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Experience" 
                  className="w-full text-xs sm:text-sm font-medium text-gray-700 placeholder:text-slate-400 outline-none bg-transparent"
                />
              </div>
             
              {/* Search Action Button */}
              <button className="h-[38px] sm:h-[49px] bg-[#4240E5] hover:bg-[#2D24D0] text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 px-4 shrink-0 transition shadow-md border border-[#4240E5]/10 cursor-pointer">
                <Search className="w-3.5 h-3.5" />
                <span>Search Jobs</span>
              </button>
            
            </div>

            {/* Popular Searches Tags Section */}
            <div className="flex flex-wrap items-center gap-1.5 mt-4 text-[10px] text-gray-500 font-poppins font-medium select-none">
              <span className="text-[#1E2229] font-bold mr-1">Popular:</span>
              {['Web Dev', 'App Dev', 'UI/UX', 'Product Manager'].map((tag) => (
                <span key={tag} className="bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full hover:border-[#2D24D0] hover:text-[#2D24D0] transition cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>

          </div>

          {/* RIGHT CONTENT: Vector Circle Background, Main Image & Floating Cards */}
          <div className="col-span-5 relative flex items-center justify-center select-none shrink-0">
            
            {/* Main Candidate Image */}
            <div className="relative w-full max-w-[140px] sm:max-w-[340px] md:max-w-[440px] aspect-square overflow-hidden">
              <Image 
                src="/Images/Hero_Homepage.jpeg" 
                alt="Candidate Profile Hero" 
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* FLOATING CARD 1: AI Career Guide (Top Right) */}
            <div className="hidden md:flex absolute top-4 -right-4 bg-white/95 backdrop-blur-xs p-2.5 rounded-xl shadow-lg border border-gray-150 items-center gap-2.5 z-20 min-w-[150px]">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-green-500">
                <ChartNoAxesCombined className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] text-black tracking-wider font-poppins font-bold">AI Career Guide</span>
                <span className="text-[11px] font-poppins font-extrabold text-[#2D24D0]">Get AI Advice</span>
                <span className="text-[10px] text-gray-400 font-poppins font-semibold">Chat with AI</span>
              </div>
            </div>

            {/* FLOATING CARD 2: AI Resume Review (Middle Right) */}
            <div className="hidden md:flex absolute top-1/3 -right-6 bg-white/95 backdrop-blur-xs p-2.5 rounded-xl shadow-lg border border-gray-150 items-center gap-2.5 z-20 min-w-[150px]">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-poppins font-bold text-black tracking-wider">AI Resume Review</span>
                <span className="text-[11px] text-[#2D24D0] font-poppins font-extrabold">Good</span>
                <span className="text-[10px] text-gray-400 font-poppins font-semibold">Skills Score</span>
              </div>
            </div>

            {/* FLOATING CARD 3: AI Match Score (Bottom Right) */}
            <div className="hidden md:flex absolute bottom-6 -right-4 bg-white/95 backdrop-blur-xs p-2.5 rounded-xl shadow-lg border border-gray-150 items-center gap-2.5 z-20 min-w-[150px]">
              <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-500">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] text-black font-poppins font-bold tracking-wider">AI Match Score</span>
                <span className="text-[11px] text-[#2D24D0] font-poppins font-extrabold">88% Match</span>
                <span className="text-[10px] text-green-500 font-bold">Excellent Fit</span>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: Floating Highlights Feature Card Grid */}
        <div className="home-swiper hero-highlights relative -mb-16 mt-16 bg-white p-4 sm:p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-row overflow-x-auto no-scrollbar snap-x snap-mandatory lg:grid lg:grid-cols-4 gap-6 items-center">
          
          {/* Highlight Item 1 */}
          <div className="flex items-start gap-3.5 shrink-0 min-w-[200px] lg:min-w-0 snap-start">
            <div className="w-10 h-10 bg-indigo-50 text-[#2D24D0] rounded-2xl flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-poppins font-bold text-gray-900">AI Resume Reviewer</h3>
              <p className="text-xs text-gray-500 mt-1 leading-normal font-semibold">Get AI-powered resume analysis & score benchmarks</p>
            </div>
          </div>

          {/* Highlight Item 2 */}
          <div className="flex items-start gap-3.5 shrink-0 min-w-[200px] lg:min-w-0 snap-start">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-poppins font-bold text-gray-900">Mock Interview</h3>
              <p className="text-xs text-gray-500 mt-1 leading-normal font-semibold">Practice with AI bot and improve interview speech</p>
            </div>
          </div>

          {/* Highlight Item 3 */}
          <div className="flex items-start gap-3.5 shrink-0 min-w-[200px] lg:min-w-0 snap-start">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-poppins font-bold text-gray-900">Skill Assessment</h3>
              <p className="text-xs text-gray-500 mt-1 leading-normal font-semibold">Take dynamic checks to verify skills to companies</p>
            </div>
          </div>

          {/* Highlight Item 4 */}
          <div className="flex items-start gap-3.5 shrink-0 min-w-[200px] lg:min-w-0 snap-start">
            <div className="w-10 h-10 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-poppins font-bold text-gray-900">AI Career Chatbot</h3>
              <p className="text-xs text-gray-500 mt-1 leading-normal font-semibold">Get personalized syllabus maps & guide suggestions</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
