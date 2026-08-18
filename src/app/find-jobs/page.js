"use client";

import { useState, useEffect } from "react";
import Header from "../component/common/Header";
import Footer from "../component/common/Footer";
import FindJobsHero from "../component/find_jobs/FindJobsHero";
import FindJobsFilters from "../component/find_jobs/FindJobsFilters";
import FindJobsList from "../component/find_jobs/FindJobsList";
import PostJobModal from "../component/find_jobs/PostJobModal";
import { mockJobs } from "../component/find_jobs/mockJobsData";

export default function FindJobsPage() {
  // Raw Jobs Storage
  const [rawJobs, setRawJobs] = useState(mockJobs);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Hero Inputs
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [category, setCategory] = useState("All Categories");

  // Sidebar Filters
  const [activeJobTypes, setActiveJobTypes] = useState(["All Jobs Type"]);
  const [activeExperienceLevels, setActiveExperienceLevels] = useState([]);
  const [activeLocations, setActiveLocations] = useState([]);
  const [searchLocText, setSearchLocText] = useState("");

  // Tab & Page Filters
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Data Loading States
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search trigger button click
  const triggerSearch = () => {
    setIsLoading(true);
    // Runs filter algorithm locally on rawJobs state
    setTimeout(() => {
      let filtered = [...rawJobs];

      if (searchQuery && searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (j) => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q)
        );
      }

      const locQ = (searchLocation || searchLocText).toLowerCase().trim();
      if (locQ !== "") {
        filtered = filtered.filter((j) => j.location.toLowerCase().includes(locQ));
      }

      if (category && category !== "All Categories") {
        const cat = category.toLowerCase();
        if (cat.includes("design")) {
          filtered = filtered.filter((j) => j.title.toLowerCase().includes("design") || j.title.toLowerCase().includes("ux"));
        } else if (cat.includes("development") || cat.includes("web") || cat.includes("software")) {
          filtered = filtered.filter((j) => j.title.toLowerCase().includes("developer") || j.title.toLowerCase().includes("engineer"));
        }
      }

      if (activeJobTypes && activeJobTypes.length > 0 && !activeJobTypes.includes("All Jobs Type")) {
        filtered = filtered.filter((j) => activeJobTypes.includes(j.type));
      }

      if (activeExperienceLevels && activeExperienceLevels.length > 0) {
        filtered = filtered.filter((j) => activeExperienceLevels.includes(j.experienceFilter));
      }

      if (activeLocations && activeLocations.length > 0) {
        filtered = filtered.filter((j) => 
          activeLocations.some((c) => j.location.toLowerCase().includes(c.toLowerCase()))
        );
      }

      if (activeTab && activeTab !== "all") {
        const mapping = {
          fullTime: "Full Time",
          partTime: "Part Time",
          remote: "Remote",
          internship: "Internship",
          freelance: "Freelance"
        };
        const targetType = mapping[activeTab];
        if (targetType) {
          filtered = filtered.filter((j) => j.type === targetType);
        }
      }

      setJobs(filtered);
      setIsLoading(false);
    }, 400);
  };

  // Instantly search when checklists, queries or tabs are changed
  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      let filtered = [...rawJobs];

      if (searchQuery && searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (j) => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q)
        );
      }

      const locQ = (searchLocation || searchLocText).toLowerCase().trim();
      if (locQ !== "") {
        filtered = filtered.filter((j) => j.location.toLowerCase().includes(locQ));
      }

      if (category && category !== "All Categories") {
        const cat = category.toLowerCase();
        if (cat.includes("design")) {
          filtered = filtered.filter((j) => j.title.toLowerCase().includes("design") || j.title.toLowerCase().includes("ux"));
        } else if (cat.includes("development") || cat.includes("web") || cat.includes("software")) {
          filtered = filtered.filter((j) => j.title.toLowerCase().includes("developer") || j.title.toLowerCase().includes("engineer"));
        }
      }

      if (activeJobTypes && activeJobTypes.length > 0 && !activeJobTypes.includes("All Jobs Type")) {
        filtered = filtered.filter((j) => activeJobTypes.includes(j.type));
      }

      if (activeExperienceLevels && activeExperienceLevels.length > 0) {
        filtered = filtered.filter((j) => activeExperienceLevels.includes(j.experienceFilter));
      }

      if (activeLocations && activeLocations.length > 0) {
        filtered = filtered.filter((j) => 
          activeLocations.some((c) => j.location.toLowerCase().includes(c.toLowerCase()))
        );
      }

      if (activeTab && activeTab !== "all") {
        const mapping = {
          fullTime: "Full Time",
          partTime: "Part Time",
          remote: "Remote",
          internship: "Internship",
          freelance: "Freelance"
        };
        const targetType = mapping[activeTab];
        if (targetType) {
          filtered = filtered.filter((j) => j.type === targetType);
        }
      }

      if (active) {
        setJobs(filtered);
        setIsLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      active = false;
    };
  }, [rawJobs, activeJobTypes, activeExperienceLevels, activeLocations, searchLocText, activeTab, searchQuery, searchLocation, category]);

  // Checklist handlers
  const handleToggleJobType = (type) => {
    setIsLoading(true);
    if (type === "All Jobs Type") {
      setActiveJobTypes(["All Jobs Type"]);
    } else {
      setActiveJobTypes((prev) => {
        const filtered = prev.filter((t) => t !== "All Jobs Type");
        return filtered.includes(type)
          ? filtered.filter((t) => t !== type)
          : [...filtered, type];
      });
    }
  };

  const handleToggleExperienceLevel = (exp) => {
    setIsLoading(true);
    setActiveExperienceLevels((prev) => 
      prev.includes(exp) ? prev.filter((e) => e !== exp) : [...prev, exp]
    );
  };

  const handleToggleLocation = (loc) => {
    setIsLoading(true);
    setActiveLocations((prev) => 
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const handleResetFilters = () => {
    setIsLoading(true);
    setSearchQuery("");
    setSearchLocation("");
    setCategory("All Categories");
    setActiveJobTypes(["All Jobs Type"]);
    setActiveExperienceLevels([]);
    setActiveLocations([]);
    setSearchLocText("");
    setActiveTab("all");
  };

  const handlePostJob = (newJob) => {
    setIsLoading(true);
    setRawJobs((prev) => [newJob, ...prev]);
  };

  return (
    <div className="min-w-[320px] bg-[#f8f9ff] text-[#101014] font-poppins min-h-screen flex flex-col justify-between">
      <div>
        <Header />

        {/* Search Hero banner */}
        <FindJobsHero 
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          searchLocation={searchLocation}
          onSearchLocationChange={setSearchLocation}
          category={category}
          onCategoryChange={setCategory}
          onSearchTrigger={triggerSearch}
        />

        {/* Main Content Layout Grid */}
        <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Left Column: Sidebar Filters */}
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

            {/* Right Column: Dynamic Listings */}
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

      {/* Post a Job Modal Sheet */}
      <PostJobModal 
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onPostJob={handlePostJob}
      />
    </div>
  );
}
