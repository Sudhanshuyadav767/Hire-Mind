"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, Bot, CheckCircle } from 'lucide-react';

const banners = [
  {
    src: '/Images/HireMind_ Build.png',
    alt: 'HireMind Build Your Future Banner',
  },
  {
    src: '/Images/banner2.png',
    alt: 'HireMind career opportunities banner',
  },
];

const Hero = () => {
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveBanner((currentBanner) => (currentBanner + 1) % banners.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="home-hero relative w-full bg-white overflow-hidden pt-0 mt-0">
      <div className="home-container max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-0 mt-0 pb-3 lg:pb-5 relative z-10">
        
        {/* FULL HERO BANNER IMAGE */}
        <div className="hero-banner relative w-full aspect-[14/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs mt-0">
          <Image
            key={banners[activeBanner].src}
            src={banners[activeBanner].src}
            alt={banners[activeBanner].alt}
            width={1400}
            height={500}
            priority
            className="hero-banner-image hero-banner-image-active w-full h-full object-cover"
          />

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-4" aria-label="Hero banners">
            {banners.map((banner, index) => (
              <button
                key={banner.src}
                type="button"
                onClick={() => setActiveBanner(index)}
                className={`hero-banner-dot ${index === activeBanner ? 'is-active' : ''}`}
                aria-label={`Show banner ${index + 1}`}
                aria-current={index === activeBanner}
              />
            ))}
          </div>
        </div>

        {/* BOTTOM SECTION: 4 AI Feature Cards (Horizontal Scroll on Mobile, 4-Cols Grid on Desktop) */}
        <div className="relative mt-2 sm:mt-3.5 bg-white p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-lg border border-slate-200/70 flex md:grid md:grid-cols-4 gap-2.5 sm:gap-4 items-center overflow-x-auto no-scrollbar">

          {/* Feature 1: AI Resume Reviewer */}
          <Link href="/resume-review" className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl hover:bg-slate-50 transition cursor-pointer group shrink-0 min-w-[175px] sm:min-w-0">
            <div className="w-7.5 h-7.5 sm:w-10 sm:h-10 bg-indigo-50 text-[#2D24D0] rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100 group-hover:scale-105 transition">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
            </div>
            <div className="text-left">
              <h3 className="text-[11px] sm:text-sm font-poppins font-bold text-[#1E2229] group-hover:text-[#2D24D0] transition whitespace-nowrap">AI Resume Reviewer</h3>
              <p className="text-[9px] sm:text-xs text-slate-400 font-medium mt-0.5 leading-tight">Get AI-powered resume analysis & score</p>
            </div>
          </Link>

          {/* Feature 2: Mock Interview */}
          <Link href="/mockinterview" className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl hover:bg-slate-50 transition cursor-pointer group shrink-0 min-w-[175px] sm:min-w-0">
            <div className="w-7.5 h-7.5 sm:w-10 sm:h-10 bg-blue-50 text-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
            </div>
            <div className="text-left">
              <h3 className="text-[11px] sm:text-sm font-poppins font-bold text-[#1E2229] group-hover:text-[#2D24D0] transition whitespace-nowrap">Mock Interview</h3>
              <p className="text-[9px] sm:text-xs text-slate-400 font-medium mt-0.5 leading-tight">Practice with AI bot for interviews</p>
            </div>
          </Link>

          {/* Feature 3: Skill Assessment */}
          <Link href="/ai-services/skill-assessment" className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl hover:bg-slate-50 transition cursor-pointer group shrink-0 min-w-[175px] sm:min-w-0">
            <div className="w-7.5 h-7.5 sm:w-10 sm:h-10 bg-purple-50 text-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border border-purple-100 group-hover:scale-105 transition">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
            </div>
            <div className="text-left">
              <h3 className="text-[11px] sm:text-sm font-poppins font-bold text-[#1E2229] group-hover:text-[#2D24D0] transition whitespace-nowrap">Skill Assessment</h3>
              <p className="text-[9px] sm:text-xs text-slate-400 font-medium mt-0.5 leading-tight">Verify your skills to top companies</p>
            </div>
          </Link>

          {/* Feature 4: AI Career Chatbot */}
          <Link href="/ai-services/Career-Chatbot" className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl hover:bg-slate-50 transition cursor-pointer group shrink-0 min-w-[175px] sm:min-w-0">
            <div className="w-7.5 h-7.5 sm:w-10 sm:h-10 bg-cyan-50 text-cyan-600 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border border-cyan-100 group-hover:scale-105 transition">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
            </div>
            <div className="text-left">
              <h3 className="text-[11px] sm:text-sm font-poppins font-bold text-[#1E2229] group-hover:text-[#2D24D0] transition whitespace-nowrap">AI Career Chatbot</h3>
              <p className="text-[9px] sm:text-xs text-slate-400 font-medium mt-0.5 leading-tight">Get personalized career advice instantly</p>
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
};

export default Hero;
