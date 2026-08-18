"use client";

export const mockJobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Google",
    location: "Bangalore, Karnataka",
    experience: "2-4Yrs",
    experienceFilter: "1-3 Years",
    type: "Full Time",
    salary: "₹8-18.5LPA",
    posted: "1 w ago"
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Google",
    location: "Pune, Maharashtra",
    experience: "1-3Yrs",
    experienceFilter: "1-3 Years",
    type: "Part Time",
    salary: "₹6-12LPA",
    posted: "2 d ago"
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Google",
    location: "Bangalore, Karnataka",
    experience: "0-1Yr",
    experienceFilter: "Fresher(0-1Yr)",
    type: "Internship",
    salary: "₹4-8LPA",
    posted: "3 d ago"
  },
  {
    id: 4,
    title: "Product Manager",
    company: "Google",
    location: "Mumbai, Maharashtra",
    experience: "5-10Yrs",
    experienceFilter: "5-10 Years",
    type: "Remote",
    salary: "₹18-35LPA",
    posted: "1 w ago"
  },
  {
    id: 5,
    title: "Data Analyst",
    company: "Google",
    location: "Delhi, NCR",
    experience: "3-5Yrs",
    experienceFilter: "3-5 Years",
    type: "Full Time",
    salary: "₹8-15LPA",
    posted: "4 d ago"
  },
  {
    id: 6,
    title: "Machine Learning Engineer",
    company: "Google",
    location: "Hyderabad, Telangana",
    experience: "10+Yrs",
    experienceFilter: "10+ Years",
    type: "Full Time",
    salary: "₹25-45LPA",
    posted: "5 d ago"
  },
  {
    id: 7,
    title: "DevOps Engineer",
    company: "Google",
    location: "Bangalore, Karnataka",
    experience: "3-5Yrs",
    experienceFilter: "3-5 Years",
    type: "Freelance",
    salary: "₹12-20LPA",
    posted: "1 w ago"
  },
  {
    id: 8,
    title: "Cloud Architect",
    company: "Google",
    location: "Mumbai, Maharashtra",
    experience: "5-10Yrs",
    experienceFilter: "5-10 Years",
    type: "Remote",
    salary: "₹24-40LPA",
    posted: "2 w ago"
  },
  {
    id: 9,
    title: "QA Automation Engineer",
    company: "Google",
    location: "Hyderabad, Telangana",
    experience: "1-3Yrs",
    experienceFilter: "1-3 Years",
    type: "Full Time",
    salary: "₹6-11LPA",
    posted: "1 w ago"
  }
];

export function fetchJobs(filters = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...mockJobs];

      // 1. Filter by search query (title or company)
      if (filters.query && filters.query.trim() !== "") {
        const q = filters.query.toLowerCase();
        filtered = filtered.filter(
          (j) => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q)
        );
      }

      // 2. Filter by search location query
      if (filters.locationQuery && filters.locationQuery.trim() !== "") {
        const locQ = filters.locationQuery.toLowerCase();
        filtered = filtered.filter((j) => j.location.toLowerCase().includes(locQ));
      }

      // 3. Filter by Category Dropdown (Mock filter)
      if (filters.category && filters.category !== "All Categories") {
        const cat = filters.category.toLowerCase();
        // Just checking if category matches keywords in title
        if (cat.includes("design")) {
          filtered = filtered.filter((j) => j.title.toLowerCase().includes("design") || j.title.toLowerCase().includes("ux"));
        } else if (cat.includes("development") || cat.includes("web") || cat.includes("software")) {
          filtered = filtered.filter((j) => j.title.toLowerCase().includes("developer") || j.title.toLowerCase().includes("engineer"));
        }
      }

      // 4. Filter by Job Type checkboxes
      if (filters.jobTypes && filters.jobTypes.length > 0 && !filters.jobTypes.includes("All Jobs Type")) {
        filtered = filtered.filter((j) => filters.jobTypes.includes(j.type));
      }

      // 5. Filter by Experience Level checkboxes
      if (filters.experienceLevels && filters.experienceLevels.length > 0) {
        filtered = filtered.filter((j) => filters.experienceLevels.includes(j.experienceFilter));
      }

      // 6. Filter by Location checkboxes (Cities)
      if (filters.cities && filters.cities.length > 0) {
        filtered = filtered.filter((j) => 
          filters.cities.some((c) => j.location.toLowerCase().includes(c.toLowerCase()))
        );
      }

      // 7. Filter by Main Job Category Tabs
      if (filters.mainTab && filters.mainTab !== "all") {
        // e.g. "fullTime", "partTime", "remote", "internship", "freelance"
        const mapping = {
          fullTime: "Full Time",
          partTime: "Part Time",
          remote: "Remote",
          internship: "Internship",
          freelance: "Freelance"
        };
        const targetType = mapping[filters.mainTab];
        if (targetType) {
          filtered = filtered.filter((j) => j.type === targetType);
        }
      }

      resolve(filtered);
    }, 300); // 300ms delay
  });
}
