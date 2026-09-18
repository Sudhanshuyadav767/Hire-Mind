"use client";
import React from "react";
import Link from "next/link";
import Header from "@/app/component/common/Header"
import Footer from "@/app/component/common/Footer"
import {
  Bot,
  User,
  Video,
  Mic,
  Settings,
  Info,
  Signal,
  Flag,
  Square,
} from "lucide-react";

export default function InterviewPage() {
  return (

    
    <>
    <Header />
    <main className="min-h-screen bg-[#f0efff] p-5 text-[#202052]">
      
      {/* Main Interview Area */}
      <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-5">
        
        {/* LEFT - AI Interviewer */}
        <section className="rounded-2xl border border-[#d9d7ee] bg-white shadow-sm overflow-hidden">
          {/* Header */}
          <div className="h-[72px] px-7 flex items-center justify-between border-b">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[#e9e8ff] flex items-center justify-center">
                <Bot className="w-6 h-6 text-[#4b4bd7]" />
              </div>

              <h2 className="font-bold text-lg">AI Interviewer</h2>
            </div>

            <span className="flex items-center gap-1.5 rounded-full bg-[#eafff0] border border-[#b9edca] px-3 py-1 text-sm font-medium text-[#28a653]">
              <span className="w-2 h-2 rounded-full bg-[#35c759]" />
              Speaking
            </span>
          </div>

          {/* AI Area */}
          <div className="p-6">
            <div className="h-[230px] flex items-center justify-center">
              <div className="relative w-44 h-44 rounded-full bg-[#e8e7ff] flex items-center justify-center">
                
                {/* Robot */}
                <div className="relative">
                  <div className="w-28 h-20 rounded-[28px] bg-white border-[5px] border-[#4b4bd7] flex items-center justify-center shadow-sm">
                    <div className="w-20 h-11 rounded-2xl bg-[#24235c] flex items-center justify-center gap-5">
                      <span className="w-3 h-3 rounded-full bg-[#45e3c1]" />
                      <span className="w-3 h-3 rounded-full bg-[#45e3c1]" />
                    </div>
                  </div>

                  {/* Headphones */}
                  <div className="absolute -left-3 top-8 w-5 h-12 bg-[#4b4bd7] rounded-l-full" />
                  <div className="absolute -right-3 top-8 w-5 h-12 bg-[#4b4bd7] rounded-r-full" />

                  {/* Mic */}
                  <div className="absolute left-1/2 -bottom-7 -translate-x-1/2 w-7 h-3 rounded-full bg-[#24235c]" />
                </div>

                {/* Chat Bubble */}
                <div className="absolute -right-5 top-5 bg-white border border-[#d7d5f5] rounded-xl px-4 py-2 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#5555d9] rounded-full" />
                    <span className="w-1.5 h-1.5 bg-[#5555d9] rounded-full" />
                    <span className="w-1.5 h-1.5 bg-[#5555d9] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="rounded-xl bg-[#f6f6fc] border border-[#e4e3f2] p-5 mb-6">
              <h3 className="font-semibold text-sm mb-2">
                Hello Aman! I&apos;m your AI Interviewer
              </h3>

              <p className="text-sm text-gray-500 leading-6">
                I&apos;ll be asking you questions based on your role and
                experience. Let&apos;s get started.
              </p>
            </div>

            {/* Interview Info */}
            <div className="rounded-xl border border-[#e2e1eb] p-5">
              <h3 className="font-semibold mb-5">Interview Info</h3>

              <div className="space-y-5">
                <InfoRow icon={<Bot />} label="Role" value="Software Engineer" />
                <InfoRow
                  icon={<Signal />}
                  label="Experience Level"
                  value="Mid Level (2–5 years)"
                />
                <InfoRow
                  icon={<Video />}
                  label="Interview Type"
                  value="Technical interview"
                />
                <InfoRow
                  icon={<Bot />}
                  label="Difficulty Level"
                  value="Medium"
                />
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT - Candidate Panel */}
        <section className="rounded-2xl border border-[#d9d7ee] bg-white shadow-sm overflow-hidden">
          
          {/* Header */}
          <div className="h-[72px] px-7 flex items-center justify-between border-b">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#21a366] text-white flex items-center justify-center font-bold">
                A
              </div>

              <h2 className="font-bold text-lg">Candidate Panel</h2>
            </div>

            <div className="flex items-center gap-3">
              <StatusButton icon={<Video />} text="CAM ON" />
              <StatusButton icon={<Mic />} text="MIC ON" />

              <Settings className="w-5 h-5 text-gray-400 ml-2" />
            </div>
          </div>

          {/* Candidate */}
          <div className="min-h-[660px] flex flex-col items-center justify-center px-6">
            <div className="w-32 h-32 rounded-full bg-[#eaf8f1] flex items-center justify-center mb-5">
              <User className="w-16 h-16 text-[#579875]" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              Aman Singh
            </h1>

            <p className="mt-2 text-gray-400">
              Software Engineer Candidate
            </p>

            {/* Instructions */}
            <div className="mt-8 w-full max-w-[430px] rounded-xl bg-[#e9e8ff] p-5">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-[#5757d9] shrink-0" />

                <div>
                  <h3 className="font-semibold text-[#5151c9]">
                    Instructions
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Answer the questions clearly and concisely.
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    You can take a moment to think before answering.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Status */}
          <div className="h-[80px] border-t px-7 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Connection:</span>

              <span className="flex items-center gap-1 text-green-600 font-semibold">
                <Signal className="w-4 h-4" />
                Good
              </span>
            </div>

            <div className="text-sm">
              <span className="text-gray-500">Interview Duration:</span>
              <span className="ml-2 font-semibold text-gray-700">
                00:00:12
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Bar */}
      <div className="mt-5 h-[110px] rounded-xl border border-[#d9d7ee] bg-white flex items-center justify-between px-8 shadow-sm">
        
     <Link href='../interview/score'>   <button className="flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-red-500 font-semibold hover:bg-red-50 transition">
          <Square className="w-4 h-4 fill-current" />
          End Interview
        </button></Link>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 rounded-full bg-[#5757d9]" />
            Interview in progress
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Please do not close or refresh this page.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl border border-[#d8d7ed] px-5 py-3 text-[#4b4bd7] font-semibold hover:bg-[#f5f4ff] transition">
          <Flag className="w-4 h-4" />
          Report an Issue
        </button>
      </div>
    </main>
    <Footer />
    </>
  );
}

/* Small Components */

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-9 h-9 rounded-lg bg-[#f0efff] flex items-center justify-center text-[#5757d9]">
        {React.cloneElement(icon, { className: "w-5 h-5" })}
      </div>

      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-semibold text-gray-700">{value}</p>
      </div>
    </div>
      
    
  );
}

function StatusButton({ icon, text }) {
  return (

    <button className="flex items-center gap-1.5 rounded-full bg-[#effff4] border border-[#c7efd3] px-3 py-1 text-xs font-semibold text-green-600">
      {React.cloneElement(icon, { className: "w-3.5 h-3.5" })}
      {text}
    </button>
    
  );
}