"use client";

import React, { useState } from "react";
import Header from "@/app/component/common/Header";
import Footer from "@/app/component/common/Footer";
import Image from "next/image";
import { Clock3, Users, Folder, Bot, Sparkles } from "lucide-react";
import CareerChat from "@/app/component/Chatbot/Left";
import CareerPage from "@/app/component/Chatbot/Right";

export default function CareerChatbot() {
  const [externalPrompt, setExternalPrompt] = useState(null);

  const handleSelectQuestionFromRight = (questionText) => {
    setExternalPrompt(questionText);
  };

  return (
    <div className="min-w-[320px] bg-[#f8f9ff] text-[#1E2229] font-poppins min-h-screen flex flex-col justify-between">
      <div>
        <Header />

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <section className="w-full bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white rounded-2xl overflow-hidden shadow-lg border border-indigo-700/50">
            <div className="flex items-center justify-between px-6 md:px-12 py-8">
              
              {/* Left Content */}
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-medium mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  HireMind AI Intelligence
                </div>

                <h1 className="sm:text-3xl text-2xl font-extrabold text-white tracking-tight">
                  AI Career Chatbot
                </h1>

                <h2 className="mt-2 text-lg md:text-xl font-semibold text-indigo-200">
                  Your Smart Career Assistant, Anytime, Anywhere.
                </h2>

                <p className="mt-2 text-indigo-100 text-sm md:text-base max-w-2xl leading-relaxed">
                  Get instant answers to your career questions, explore options,
                  and make confident decisions with personalized AI-powered guidance.
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-6 md:gap-10 mt-8">
                  <Feature
                    icon={<Clock3 className="w-5 h-5" />}
                    title="Instant Answers"
                    text="Quick and reliable career advice."
                  />

                  <Feature
                    icon={<Users className="w-5 h-5" />}
                    title="Personalized Guidance"
                    text="Tailored to your background & goals."
                  />

                  <Feature
                    icon={<Folder className="w-5 h-5" />}
                    title="24/7 AI Advisor"
                    text="Your career questions always answered."
                  />
                </div>
              </div>

              {/* Right Hero Image */}
              <div className="hidden md:block shrink-0">
                <div className="w-64 h-64 relative flex items-center justify-center">
                  <Image
                    src="/Images/Girl.png"
                    alt="AI Career Assistant"
                    width={260}
                    height={260}
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>

            </div>
          </section>
        </div>

        {/* Main Chatbot Interface Layout */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            
            {/* Main Interactive AI Chatbot Container */}
            <div className="w-full lg:flex-1 min-w-0">
              <CareerChat 
                externalPrompt={externalPrompt} 
                onClearExternalPrompt={() => setExternalPrompt(null)} 
              /> 
            </div>

            {/* Right Sidebar Tools & Questions */}
            <div className="w-full lg:w-[380px] lg:shrink-0">
              <CareerPage 
                onSelectQuestion={handleSelectQuestionFromRight} 
              />
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-start gap-3 max-w-[200px]">
      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-indigo-200 shrink-0">
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-white text-xs md:text-sm">
          {title}
        </h3>

        <p className="text-[11px] text-indigo-200/80 mt-0.5 leading-tight">
          {text}
        </p>
      </div>
    </div>
  );
}