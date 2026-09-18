"use client";

import Header from "@/app/component/common/Header";
import Footer from "@/app/component/common/Footer";
import { Lock } from "lucide-react";
import ChoseFileHero from "../component/chose_file/ChoseFileHero";
import AiReviewSummaryCard from "../component/chose_file/AiReviewSummaryCard";
import TopSuggestionsCard from "../component/chose_file/TopSuggestionsCard";

export default function ResumeUploadedPage() {
  return (
    <div className="min-w-[320px] bg-[#f8f9ff] text-[#101014] font-poppins min-h-screen flex flex-col justify-between select-none">
      <div>
        <Header />
        <ChoseFileHero />

        <main className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:px-8 space-y-6 sm:space-y-8">
          <AiReviewSummaryCard />
          <TopSuggestionsCard />

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-semibold pt-2 pb-4">
            <Lock size={14} />
            <span>Your data is secure and confidential.</span>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}