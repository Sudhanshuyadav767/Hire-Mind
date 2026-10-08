"use client";

import React from "react";
import Link from "next/link";
import Header from "@/app/component/common/Header";
import Footer from "@/app/component/common/Footer";
import MockInterviewAvatar from "../component/mockinterview/MockInterviewAvatar";
import MockInterviewCard from "../component/mockinterview/MockInterviewCard";

/**
 * MockInterviewStart Page Component
 * Renders the introductory setup screen for starting an AI Mock Technical & HR Interview session.
 */
export default function MockInterviewStart() {
  const defaultDetails = {
    role: "Software Engineer",
    experience: "Mid Level (2-5 Years)",
    type: "Technical Interview",
    difficulty: "Medium"
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] font-poppins text-[#101014] flex flex-col justify-between">
      <div>
        <Header />
        
        <main className="flex flex-col items-center px-4 py-10 max-w-4xl mx-auto text-center">
          <MockInterviewAvatar />

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Your Mock Interview is Starting
          </h1>

          <p className="text-gray-500 text-sm mt-3 max-w-xl leading-relaxed">
            AI will ask real-time questions based on your selected job role and technical level.
            Please speak clearly or type your response as in a live technical interview.
          </p>

          <MockInterviewCard details={defaultDetails} />

          <p className="text-gray-500 font-medium mt-8 text-sm">
            The interview session is ready to begin...
          </p>

          <div className="flex gap-4 mt-4">
            <span className="w-3.5 h-3.5 rounded-full bg-indigo-600 animate-ping" />
            <span className="w-3.5 h-3.5 rounded-full bg-indigo-600" />
            <span className="w-3.5 h-3.5 rounded-full bg-gray-300" />
          </div>

          <Link href="/interview">
            <button className="mt-6 text-white bg-[#2D24D0] hover:bg-[#1e1c75] px-6 py-3.5 font-bold rounded-xl shadow-md transition cursor-pointer flex items-center gap-2 text-sm">
              <span>Start Interview</span>
              <span>➜</span>
            </button>
          </Link>
        </main>
      </div>

      <Footer />
    </div>
  );
}