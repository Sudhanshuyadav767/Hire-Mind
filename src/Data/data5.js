
export const jobMarketData = {
  title: "Job Market Overview",

  subtitle: "Data Scientists job openings over time",

  period: "Last 6 Months",

  openings: [
    { month: "Jan '24", value: 5000 },
    { month: "Feb '24", value: 10000 },
    { month: "Mar '24", value: 8500 },
    { month: "Apr '24", value: 9800 },
    { month: "May '24", value: 8500 },
    { month: "Jun '24", value: 14000 },
  ],

  selectedMonth: {
    month: "Apr '24",
    openings: 14690,
  },
};


export const jobDemandData = {
  title: "Job Demand",

  score: 8.6,

  maxScore: 10,

  label: "High Demand",

  growth: 26,

  growthText: "vs last 6 months",
};


export const salaryData = {
  title: "Average Salary",

  salary: "₹ 12.8 LPA",

  subtitle: "Average Base Salary",

  growth: 18,

  growthText: "vs last year",

  range: "₹8–18 LPA",
};

export const topLocations = [
  {
    name: "Bangalore",
    openings: 5420,
  },
  {
    name: "Hyderabad",
    openings: 3210,
  },
  {
    name: "Pune",
    openings: 2480,
  },
  {
    name: "Delhi NCR",
    openings: 2310,
  },
  {
    name: "Mumbai",
    openings: 1980,
  },
];


// ===============================
// TOP HIRING COMPANIES
// ===============================

export const topHiringCompanies = [
  {
    name: "Google",
    openings: 1240,
    logo: "G",
    logoType: "google",
  },
  {
    name: "Microsoft",
    openings: 1080,
    logo: "▦",
    logoType: "microsoft",
  },
  {
    name: "Amazon",
    openings: 920,
    logo: "a",
    logoType: "amazon",
  },
  {
    name: "TCS",
    openings: 890,
    logo: "TCS",
    logoType: "tcs",
  },
  {
    name: "Accenture",
    openings: 650,
    logo: "＞",
    logoType: "accenture",
  },
];


// ===============================
// IN-DEMAND SKILLS
// ===============================

export const inDemandSkills = [
  {
    name: "Python",
    demand: 65,
  },
  {
    name: "Machine Learning",
    demand: 60,
  },
  {
    name: "Deep Learning",
    demand: 70,
  },
  {
    name: "NLP",
    demand: 90,
  },
  {
    name: "Data Analysis",
    demand: 30,
  },
  {
    name: "SQL",
    demand: 32,
  },
];

// ========================================
// JOB OPENINGS BY EXPERIENCE LEVEL
// ========================================

export const experienceLevelData = [
  {
    name: "Fresher (0-1 Yr)",
    percentage: 23,
    openings: 4220,
  },
  {
    name: "Junior (1-3 Yrs)",
    percentage: 26,
    openings: 4780,
  },
  {
    name: "Mid-Level (3-6 Yrs)",
    percentage: 28,
    openings: 5150,
  },
  {
    name: "Senior (6+ Yrs)",
    percentage: 23,
    openings: 4220,
  },
];

export const totalJobOpenings = 18370;


// ========================================
// INDUSTRY-WISE JOB DEMAND
// ========================================

export const industryDemandData = [
  {
    industry: "IT Services",
    openings: 4250,
  },
  {
    industry: "BFSI",
    openings: 3180,
  },
  {
    industry: "E-Commerce",
    openings: 2450,
  },
  {
    industry: "HealthCare",
    openings: 2130,
  },
  {
    industry: "EdTech",
    openings: 1860,
  },
  {
    industry: "Others",
    openings: 1550,
  },
];

export const keyInsights = [
  {
    id: 1,
    icon: "growth",
    text: "Data Scientist roles are in high demand with 21% growth in the last 6 months.",
  },
  {
    id: 2,
    icon: "salary",
    text: "Average salary for Data Scientists has increased by 15% compared to last year.",
  },
  {
    id: 3,
    icon: "cities",
    text: "Bangalore, Hyderabad, and Pune are the top cities hiring Data Scientists.",
  },
  {
    id: 4,
    icon: "skills",
    text: "Python, Machine Learning and SQL are the most in-demand skills.",
  },
];

//job matching
export const careerProfile = {
  score: 87,
  maxScore: 100,

  checklist: [
    {
      id: 1,
      label: "Skills Added",
      completed: true,
    },
    {
      id: 2,
      label: "Experience Added",
      completed: true,
    },
    {
      id: 3,
      label: "Education Added",
      completed: true,
    },
    {
      id: 4,
      label: "Resume Uploaded",
      completed: true,
    },
    {
      id: 5,
      label: "Career Goal Added",
      completed: false,
    },
  ],
};

export const popularCareerPaths = [
  {
    id: 1,
    title: "Software Developer",
    status: "High Growth",
  },
  {
    id: 2,
    title: "Data Scientist",
    status: "High Demand",
  },
  {
    id: 3,
    title: "Product Manager",
    status: "High Growth",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    status: "Growing",
  },
  {
    id: 5,
    title: "Cloud Engineer",
    status: "High Growth",
  },
];

export const recommendedNextSteps = [
  {
    id: 1,
    title: "Fill skill gaps to improve your match",
  },
  {
    id: 2,
    title: "Take recommended courses",
  },
  {
    id: 3,
    title: "Build projects to showcase your skills",
  },
  {
    id: 4,
    title: "Get certificate to boost your profile",
  },
];