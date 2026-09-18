"use client";

import Header from "@/app/component/common/Header";
import Footer from "@/app/component/common/Footer";
import JobMatchingHero from "../component/job_matching/JobMatchingHero";
import JobMatchingScoreBanner from "../component/job_matching/JobMatchingScoreBanner";
import MatchedJobsList from "../component/job_matching/MatchedJobsList";
import ProfileSummaryCard from "../component/job_matching/ProfileSummaryCard";
import TopMatchedSkillsCard from "../component/job_matching/TopMatchedSkillsCard";
import NeedHelpCard from "../component/job_matching/NeedHelpCard";
import JobMatchingCtaBanner from "../component/job_matching/JobMatchingCtaBanner";

export default function JobMatchingPage() {
  return (
    <div className="min-w-[320px] bg-[#f8f9ff] text-[#101014] font-poppins min-h-screen flex flex-col justify-between select-none">
      <div>
        <Header />
        <JobMatchingHero />

        <main className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:px-8 space-y-6 sm:space-y-8">
          <JobMatchingScoreBanner />

          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6 items-start">
            <MatchedJobsList />

            <aside className="space-y-6 w-full">
              <ProfileSummaryCard />
              <TopMatchedSkillsCard />
              <NeedHelpCard />
            </aside>
          </div>

          <JobMatchingCtaBanner />
        </main>
      </div>

      <Footer />
    </div>
  );
}