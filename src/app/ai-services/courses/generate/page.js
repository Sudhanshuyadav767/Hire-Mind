"use client";

import Header from "../../../component/common/Header";
import Footer from "../../../component/common/Footer";
import GenerateHeaderBanner from "../../../component/ai_services/courses/generate/GenerateHeaderBanner";
import GenerateSearchBar from "../../../component/ai_services/courses/generate/GenerateSearchBar";
import GenerateFiltersSidebar from "../../../component/ai_services/courses/generate/GenerateFiltersSidebar";
import GenerateRoadmap from "../../../component/ai_services/courses/generate/GenerateRoadmap";
import GenerateFooterMetrics from "../../../component/ai_services/courses/generate/GenerateFooterMetrics";
import GenerateWhyBanner from "../../../component/ai_services/courses/generate/GenerateWhyBanner";

export default function GenerateCoursesPage() {
  return (
    <div className="min-w-[320px] bg-[#f8f9ff] text-[#101014] font-poppins min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        
        {/* Banner Section */}
        <GenerateHeaderBanner />

        {/* Search & Sort Section */}
        <GenerateSearchBar />

        {/* Main Content Layout Grid */}
        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8 space-y-6">
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Left Column: Sidebar Filters */}
            <aside className="space-y-6">
              <GenerateFiltersSidebar />
            </aside>

            {/* Right Column: Dynamic Roadmap Timeline */}
            <div className="space-y-6">
              <GenerateRoadmap />
            </div>
          </div>

          {/* Bottom Dashboards Row (Outcomes and Coverage metrics) */}
          <GenerateFooterMetrics />

          {/* Why recommended courses banner highlights */}
          <GenerateWhyBanner />
        </main>
      </div>

      <Footer />
    </div>
  );
}
