"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/app/component/common/Header";
import Footer from "@/app/component/common/Footer";
import MockInterviewAvatar from "../component/mockinterview/MockInterviewAvatar";
import MockInterviewCard from "../component/mockinterview/MockInterviewCard";
import { Sparkles, ArrowRight, ShieldCheck, Video, Mic, CheckCircle2 } from "lucide-react";

/**
 * MockInterviewStart Page Component
 * Introductory setup screen before entering the live AI Mock Technical & HR Interview studio.
 */
export default function MockInterviewStart() {
  const [details, setDetails] = useState({
    role: "Software Engineer",
    experience: "Mid Level (2-5 Years)",
    type: "Technical & HR Interview",
    difficulty: "Medium"
  });

  // Read saved session or role if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("hiremind_user");
      if (savedUser) {
        try {
          const userObj = JSON.parse(savedUser);
          if (userObj.roleTitle) {
            setDetails(prev => ({ ...prev, role: userObj.roleTitle }));
          }
        } catch (e) {}
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f7ff] font-poppins text-[#101014] flex flex-col justify-between">
      <div>
        <Header />
        
        <main className="flex flex-col items-center px-4 py-10 max-w-4xl mx-auto text-center">
          
          {/* Top Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2D24D0]/10 border border-[#2D24D0]/20 text-[#2D24D0] text-xs font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Mock Interview Studio</span>
          </div>

          {/* Animated Avatar */}
          <MockInterviewAvatar isSpeaking={false} />

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mt-2">
            Your Mock Interview is Ready
          </h1>

          <p className="text-slate-500 text-xs sm:text-sm mt-3 max-w-lg leading-relaxed font-medium">
            Our AI engine will ask real-time questions customized to your job role and experience level. 
            Speak using your microphone or type your technical answers.
          </p>

          {/* Parameter Details Card */}
          <div className="w-full mt-6 flex justify-center">
            <MockInterviewCard details={details} />
          </div>

          {/* Guidelines Banner */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl text-left">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 flex items-start gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Webcam Monitor</h4>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Ensure your camera is turned on for live proctoring.</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 flex items-start gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 text-[#2D24D0] shrink-0">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Voice Speech</h4>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Speak answers directly or use the text editor.</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 flex items-start gap-2.5">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">No Tab Switching</h4>
                <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Stay on the tab throughout the session.</p>
              </div>
            </div>
          </div>

          {/* Start CTA */}
          <div className="mt-8 space-y-3">
            <Link href="/interview">
              <button className="text-white bg-[#2D24D0] hover:bg-[#1e1c75] px-8 py-4 font-bold rounded-2xl shadow-xl shadow-indigo-900/20 transition-all transform hover:-translate-y-0.5 active:scale-98 cursor-pointer flex items-center gap-3 text-sm mx-auto">
                <span>Enter Live Interview Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <p className="text-slate-400 font-medium text-[11px] flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Session initialized & AI questions queued
            </p>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}