"use client";

import Header from "../component/common/Header";
import Footer from "../component/common/Footer";
import AboutHero from "../component/about/AboutHero";
import AboutStats from "../component/about/AboutStats";
import AboutMissionVision from "../component/about/AboutMissionVision";
import AboutTeam from "../component/about/AboutTeam";

export default function AboutUsPage() {
  return (
    <div className="min-w-[320px] bg-[#f8f9ff] text-[#101014] font-poppins min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <AboutHero />
        <AboutStats />
        <AboutMissionVision />
        <AboutTeam />
      </div>
      <Footer />
    </div>
  );
}
