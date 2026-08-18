"use client";

import { useState } from "react";
import Header from "../../component/common/Header";
import Footer from "../../component/common/Footer";
import CoursesOverview from "../../component/ai_services/courses/CoursesOverview";
import SearchBar from "../../component/ai_services/courses/SearchBar";
import FiltersSidebar from "../../component/ai_services/courses/FiltersSidebar";
import CourseCatalog from "../../component/ai_services/courses/CourseCatalog";
import { 
  RecommendedForYou, 
  SkillGapAnalyzer, 
  CareerOutcomes, 
  TopSkills, 
  LearningCoach, 
  RecentDiscussions 
} from "../../component/ai_services/courses/LearningInsights";

export default function AllCoursesPage() {
  const [filters, setFilters] = useState({});

  return (
    <div className="min-w-[320px] bg-[#f8f9ff] text-[#101014] font-poppins min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        
        {/* Banner Section */}
        <CoursesOverview />
        
        {/* Search Bar section */}
        <SearchBar />

        {/* Main Content Layout Grid */}
        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Left Column: Sidebar Filters */}
            <aside className="space-y-6">
              <FiltersSidebar onFilterChange={setFilters} />
            </aside>

            {/* Right Column: Catalog and Dashboard Widgets */}
            <div className="space-y-6">
              {/* Course Catalog (Courses listing header and grid) */}
              <CourseCatalog filters={filters} />
              
              {/* Recommended learning tracks */}
              <RecommendedForYou />
              
              {/* Skill Gap Analyzer & Career Outcomes (2 columns) */}
              <div className="mobile-card-swipe grid gap-6 md:grid-cols-2">
                <SkillGapAnalyzer />
                <CareerOutcomes />
              </div>

              {/* Top Skills, Learning Coach, Discussions (3 columns) */}
              <div className="mobile-card-swipe grid gap-6 md:grid-cols-3">
                <TopSkills />
                <LearningCoach />
                <RecentDiscussions />
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
