"use client";

import Header from "../component/common/Header";
import Footer from "../component/common/Footer";
import FindJobsHero from "../component/find_jobs/FindJobsHero";
import FindJobsFilters from "../component/find_jobs/FindJobsFilters";
import FindJobsList from "../component/find_jobs/FindJobsList";
import PostJobModal from "../component/find_jobs/PostJobModal";
import { useJobsFilter } from "../component/find_jobs/useJobsFilter";

export default function FindJobsPage() {
  const {
    jobs,
    isLoading,
    isPostModalOpen,
    setIsPostModalOpen,
    searchQuery,
    setSearchQuery,
    searchLocation,
    setSearchLocation,
    category,
    setCategory,
    activeJobTypes,
    activeExperienceLevels,
    activeLocations,
    searchLocText,
    setSearchLocText,
    activeTab,
    setActiveTab,
    currentPage,
    setCurrentPage,
    triggerSearch,
    handleToggleJobType,
    handleToggleExperienceLevel,
    handleToggleLocation,
    handleResetFilters,
    handlePostJob
  } = useJobsFilter();

  return (
    <div className="min-w-[320px] bg-[#f8f9ff] text-[#101014] font-poppins min-h-screen flex flex-col justify-between">
      <div>
        <Header />

        <FindJobsHero 
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          searchLocation={searchLocation}
          onSearchLocationChange={setSearchLocation}
          category={category}
          onCategoryChange={setCategory}
          onSearchTrigger={triggerSearch}
        />

        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="space-y-6">
              <FindJobsFilters 
                activeJobTypes={activeJobTypes}
                onToggleJobType={handleToggleJobType}
                activeExperienceLevels={activeExperienceLevels}
                onToggleExperienceLevel={handleToggleExperienceLevel}
                activeLocations={activeLocations}
                onToggleLocation={handleToggleLocation}
                searchLocText={searchLocText}
                onSearchLocTextChange={setSearchLocText}
                onReset={handleResetFilters}
              />
            </aside>

            <div className="space-y-6">
              <FindJobsList 
                jobs={jobs}
                isLoading={isLoading}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                onOpenPostModal={() => setIsPostModalOpen(true)}
              />
            </div>
          </div>
        </main>
      </div>

      <Footer />

      <PostJobModal 
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onPostJob={handlePostJob}
      />
    </div>
  );
}
