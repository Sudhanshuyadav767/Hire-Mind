"use client";

import React, { useState } from "react";
import Header from "@/app/component/common/Header";
import Footer from "@/app/component/common/Footer";
import CareerGuidanceHero from "../component/guidance/CareerGuidanceHero";
import GuidanceFormSection from "../component/guidance/GuidanceFormSection";
import GuidanceResultsSection from "../component/guidance/GuidanceResultsSection";
import RoadmapSnapshotSection from "../component/guidance/RoadmapSnapshotSection";
import CareerProfileCard from "../component/guidance/CareerProfileCard";
import PopularCareerPathsCard from "../component/guidance/PopularCareerPathsCard";
import RecommendedNextStepsCard from "../component/guidance/RecommendedNextStepsCard";
import { careerGuidanceService } from "@/services/careerGuidanceService";

export default function CareerGuidancePage() {
  const [guidanceData, setGuidanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetGuidance = async (formData) => {
    setIsLoading(true);
    try {
      const res = await careerGuidanceService.getCareerGuidanceResults(formData);
      if (res?.data) {
        setGuidanceData(res.data);
      }
    } catch (e) {
      console.warn("Guidance generation notice:", e);
    } finally {
      setIsLoading(false);
      window.scrollTo({ top: 420, behavior: "smooth" });
    }
  };

  return (
    <div className="min-w-[320px] bg-[#f8f9ff] text-[#101014] font-poppins min-h-screen flex flex-col justify-between select-none">
      <div>
        <Header />
        <CareerGuidanceHero />

        <main className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:px-8 space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6 items-start">
            <div className="space-y-6 w-full">
              <GuidanceFormSection onGetGuidance={handleGetGuidance} />
              <GuidanceResultsSection data={guidanceData} isLoading={isLoading} />
              <RoadmapSnapshotSection />
            </div>

            <aside className="space-y-6 w-full">
              <CareerProfileCard />
              <PopularCareerPathsCard />
              <RecommendedNextStepsCard />
            </aside>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

