import { useState, useEffect } from "react";
import { jobService } from "../../../services/jobService";

function formatJobType(rawType) {
  if (!rawType) return "Full Time";
  if (typeof rawType !== "string") return rawType.name || "Full Time";
  const lower = rawType.toLowerCase().replace(/_/g, " ");
  if (lower.includes("full")) return "Full Time";
  if (lower.includes("part")) return "Part Time";
  if (lower.includes("remote")) return "Remote";
  if (lower.includes("intern")) return "Internship";
  if (lower.includes("free")) return "Freelance";
  return "Full Time";
}

function formatExperienceFilter(exp) {
  if (!exp) return "1-3 Years";
  const lower = String(exp).toLowerCase();
  if (lower.includes("fresh") || lower.includes("0-1")) return "Fresher(0-1Yr)";
  if (lower.includes("1-3") || lower.includes("1") || lower.includes("2")) return "1-3 Years";
  if (lower.includes("3-5") || lower.includes("3") || lower.includes("4")) return "3-5 Years";
  if (lower.includes("5-10") || lower.includes("5") || lower.includes("6") || lower.includes("7") || lower.includes("8")) return "5-10 Years";
  if (lower.includes("10+")) return "10+ Years";
  return "1-3 Years";
}

export function useJobsFilter() {
  const [rawJobs, setRawJobs] = useState([]);
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

  // Fetch jobs strictly from backend API
  const fetchBackendJobs = async () => {
    setIsLoading(true);
    let backendMapped = [];

    try {
      const res = await jobService.listJobs({
        search: searchQuery,
        location: searchLocation || searchLocText,
        category: category !== "All Categories" ? category : undefined,
        page: currentPage,
      });

      const fetchedJobs = res?.data?.items || res?.data?.jobs || (Array.isArray(res?.data) ? res.data : null);
      if (fetchedJobs && fetchedJobs.length > 0) {
        backendMapped = fetchedJobs.map((j) => ({
          id: j.id,
          title: j.title,
          company: j.company?.name || j.organization?.name || j.organizationName || j.companyName || "HireMind Enterprise Partner",
          logo: j.company?.logoUrl || j.organization?.logoUrl || j.organizationLogoUrl || "/logo/google.png",
          location: j.location || (j.isRemote ? "Remote" : "Bangalore"),
          salary: j.minSalary ? `$${(j.minSalary / 1000).toFixed(0)}k - $${(j.maxSalary / 1000).toFixed(0)}k` : "$90k - $120k",
          type: formatJobType(j.jobType),
          experience: j.experienceLevel || "2-4Yrs",
          experienceFilter: formatExperienceFilter(j.experienceLevel),
          tags: j.skills || ["React", "Node.js", "AI"],
          description: j.description || "",
          isFeatured: j.isFeatured || false,
          isUrgent: j.isUrgent || false,
          status: j.status || 'published',
          posted: j.createdAt ? new Date(j.createdAt).toLocaleDateString() : "Just now",
        }));
      }
    } catch (e) {
      console.warn("Backend job fetch notice:", e);
    }

    setRawJobs(backendMapped);
    setJobs(filterAlgorithm(backendMapped));
    setIsLoading(false);
  };

  const filterAlgorithm = (list) => {
    let filtered = [...list];

    if (searchQuery && searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
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
      } else if (cat.includes("development") || cat.includes("web") || cat.includes("software") || cat.includes("tech")) {
        filtered = filtered.filter((j) => j.title.toLowerCase().includes("developer") || j.title.toLowerCase().includes("engineer") || j.title.toLowerCase().includes("software"));
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
        filtered = filtered.filter((j) => j.type === targetType || (targetType === "Remote" && j.location?.toLowerCase().includes("remote")));
      }
    }

    return filtered;
  };

  const triggerSearch = () => {
    fetchBackendJobs();
  };

  useEffect(() => {
    fetchBackendJobs();

    // Event listener to instantly sync jobs whenever a recruiter updates postings
    const handleSync = () => fetchBackendJobs();
    if (typeof window !== "undefined") {
      window.addEventListener("hiremind_jobs_updated", handleSync);
      window.addEventListener("storage", handleSync);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("hiremind_jobs_updated", handleSync);
        window.removeEventListener("storage", handleSync);
      }
    };
  }, [activeJobTypes, activeExperienceLevels, activeLocations, searchLocText, activeTab, category]);

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

  const handlePostJob = async (newJob) => {
    setIsLoading(true);
    try {
      const res = await jobService.createJob({
        title: newJob.title,
        shortDescription: newJob.description?.slice(0, 150) || newJob.title,
        description: newJob.description || "Job position at enterprise",
        location: newJob.location,
        jobType: newJob.type?.toLowerCase().replace(' ', '_') || 'full_time',
      });
      if (res?.data?.id) {
        try {
          await jobService.publishJob(res.data.id);
        } catch (pubErr) {}
      }
      await fetchBackendJobs();
    } catch (e) {
      console.error("Failed to post job to backend:", e);
      setIsLoading(false);
    }
  };

  return {
    rawJobs,
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
  };
}

