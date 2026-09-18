"use client";

import React from 'react';
import Image from 'next/image';
import { Search, MapPin, Briefcase, Sparkles, FileText, CheckCircle, Bot, ChartNoAxesCombined } from 'lucide-react';

const Hero = () => {
  return (
    <section className="home-hero relative w-full bg-white overflow-hidden">
      <div className="home-container max-w-7xl mx-auto bg-[#E2E4F8] px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-8 lg:pb-12 rounded-2xl sm:rounded-3xl relative z-10 mt-1 sm:mt-2 mb-4">
        
        {/* Main Content Grid (Stack on mobile, 12-cols on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* LEFT CONTENT: Heading, Subtext, Search Bar & Tags */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">

            {/* Top AI Badge */}
            <div className="inline-flex items-center gap-1.5 bg-white border border-gray-200/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full w-fit mb-2.5 sm:mb-3 shadow-2xs select-none">
              <Sparkles className="w-3.5 h-3.5 text-[#2D24D0]" />
              <span className="text-[10px] sm:text-xs font-semibold text-[#2D24D0] tracking-wide font-poppins">
                AI-Powered Job Portal
              </span>
            </div>

            {/* Main Headline (Reduced Font Size for Mobile & Desktop) */}
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold font-poppins text-[#1E2229] tracking-tight leading-snug sm:leading-tight">
              Find Jobs. Grow Skills. <br />
              <span className="text-[#1E2229] mt-0.5 sm:mt-1 block">
                Build Your <span className="text-[#2D24D0]">Future.</span>
              </span>
            </h1>

            {/* Paragraph Subtext */}
            <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-xl mt-2 sm:mt-3 leading-relaxed font-poppins font-medium">
              Discover top job opportunities, internships, and freelance projects. <br className="hidden sm:inline" />
              Get AI-powered support for resume building, mock interviews, and career growth.
            </p>

            {/* Multi-Input Search Bar Block (Optimized for Mobile & Touch) */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center bg-white rounded-2xl p-2 sm:p-2.5 gap-2 sm:gap-3 border border-gray-200/80 shadow-md w-full max-w-[1100px] mt-5 sm:mt-6 z-20">

              {/* Job Title Input */}
              <div className="bg-slate-50 md:bg-white flex flex-1 items-center gap-2 px-3 h-[42px] sm:h-[46px] rounded-xl border border-gray-150 md:border-none">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Job title or company"
                  className="w-full text-xs sm:text-sm font-medium text-gray-800 placeholder:text-slate-400 outline-none bg-transparent"
                />
              </div>

              {/* Location Input */}
              <div className="bg-slate-50 md:bg-white flex flex-1 items-center gap-2 px-3 h-[42px] sm:h-[46px] rounded-xl border border-gray-150 md:border-none">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full text-xs sm:text-sm font-medium text-gray-800 placeholder:text-slate-400 outline-none bg-transparent"
                />
              </div>

              {/* Experience Input */}
              <div className="bg-slate-50 md:bg-white flex flex-1 items-center gap-2 px-3 h-[42px] sm:h-[46px] rounded-xl border border-gray-150 md:border-none">
                <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Experience"
                  className="w-full text-xs sm:text-sm font-medium text-gray-800 placeholder:text-slate-400 outline-none bg-transparent"
                />
              </div>

              {/* Search Action Button */}
              <button className="h-[44px] sm:h-[46px] bg-[#4240E5] hover:bg-[#2D24D0] text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 px-5 shrink-0 transition shadow-md border border-[#4240E5]/10 cursor-pointer w-full md:w-auto">
                <Search className="w-3.5 h-3.5" />
                <span>Search Jobs</span>
              </button>

            </div>

            {/* Popular Searches Tags Section */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3 sm:mt-4 text-[10px] sm:text-xs text-gray-500 font-poppins font-medium select-none">
              <span className="text-[#1E2229] font-bold mr-1">Popular:</span>
              {['Web Dev', 'App Dev', 'UI/UX', 'Product Manager'].map((tag) => (
                <span key={tag} className="bg-white border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full hover:border-[#2D24D0] hover:text-[#2D24D0] transition cursor-pointer">
                  {tag}
                </span>
              ))}
            </div>

          </div>

          {/* RIGHT CONTENT: Candidate Image & Floating AI Badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center select-none shrink-0 py-2 lg:py-0">

            {/* Candidate Image (Responsive Size) */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px] aspect-square rounded-3xl overflow-hidden shadow-xs">
              <Image
                src="/Images/Hero_Homepage.jpeg"
                alt="Candidate Profile Hero"
                fill
                priority
                className="object-cover rounded-3xl"
              />
            </div>

            {/* FLOATING CARD 1: AI Career Guide (Desktop) */}
            <div className="hidden md:flex absolute top-4 -right-2 bg-white/95 backdrop-blur-xs p-2.5 rounded-xl shadow-lg border border-gray-150 items-center gap-2.5 z-20 min-w-[145px]">
              <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center text-green-500">
                <ChartNoAxesCombined className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-black tracking-wider font-poppins font-bold">AI Career Guide</span>
                <span className="text-[10px] font-poppins font-extrabold text-[#2D24D0]">Get AI Advice</span>
              </div>
            </div>

            {/* FLOATING CARD 2: AI Resume Review (Desktop) */}
            <div className="hidden md:flex absolute top-1/3 -right-4 bg-white/95 backdrop-blur-xs p-2.5 rounded-xl shadow-lg border border-gray-150 items-center gap-2.5 z-20 min-w-[145px]">
              <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-poppins font-bold text-black tracking-wider">AI Resume Review</span>
                <span className="text-[10px] text-[#2D24D0] font-poppins font-extrabold">Good Score</span>
              </div>
            </div>

            {/* FLOATING CARD 3: AI Match Score (Desktop) */}
            <div className="hidden md:flex absolute bottom-4 -right-2 bg-white/95 backdrop-blur-xs p-2.5 rounded-xl shadow-lg border border-gray-150 items-center gap-2.5 z-20 min-w-[145px]">
              <div className="w-7 h-7 bg-cyan-50 rounded-lg flex items-center justify-center text-cyan-500">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-black font-poppins font-bold tracking-wider">AI Match Score</span>
                <span className="text-[10px] text-[#2D24D0] font-poppins font-extrabold">88% Match</span>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM SECTION: Highlights Feature Cards (Responsive Grid) */}
        <div className="relative mt-4 sm:mt-6 bg-white p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 items-center">

          {/* Highlight Item 1 */}
          <div className="flex items-center sm:items-start gap-3 p-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-indigo-50 text-[#2D24D0] rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-xs sm:text-sm font-poppins font-bold text-gray-900">AI Resume Reviewer</h3>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-tight font-medium">Get AI-powered resume analysis & score</p>
            </div>
          </div>

          {/* Highlight Item 2 */}
          <div className="flex items-center sm:items-start gap-3 p-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-50 text-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-xs sm:text-sm font-poppins font-bold text-gray-900">Mock Interview</h3>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-tight font-medium">Practice with AI bot for interviews</p>
            </div>
          </div>

          {/* Highlight Item 3 */}
          <div className="flex items-center sm:items-start gap-3 p-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-purple-50 text-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-xs sm:text-sm font-poppins font-bold text-gray-900">Skill Assessment</h3>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-tight font-medium">Verify your skills to top companies</p>
            </div>
          </div>

          {/* Highlight Item 4 */}
          <div className="flex items-center sm:items-start gap-3 p-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-cyan-50 text-cyan-600 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-xs sm:text-sm font-poppins font-bold text-gray-900">AI Career Chatbot</h3>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-tight font-medium">Get personalized career advice instantly</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
