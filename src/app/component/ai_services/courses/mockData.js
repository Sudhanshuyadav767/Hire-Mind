// Mock data for AI Services - All Courses page

const mockUserOverview = {
  welcomeMessage: "👋 Welcome back, Aman!",
  learningScore: 87,
  currentGoal: "Become AI/ML Engineer",
  recommendedSkill: "Machine Learning Fundamentals",
  statistics: [
    { type: "completed", label: "Courses Completed", value: "12" },
    { type: "hours", label: "Learning Hours", value: "24" },
    { type: "skills", label: "Skill Acquired", value: "18" },
    { type: "readiness", label: "Career Readiness", value: "82%" }
  ]
};

const mockFilterConfig = [
  {
    id: "category",
    title: "Category",
    options: ["Artificial intelligence", "Machine Learning", "NLP", "Gen AI", "Python"],
    hasShowMore: true,
  },
  {
    id: "level",
    title: "Level",
    options: ["Beginner", "Intermediate", "Advanced"],
    hasShowMore: false,
  },
  {
    id: "duration",
    title: "Duration",
    options: ["5-10 Hours", "10-20 Hours", "20-30 Hours", "30+ Hours"],
    hasShowMore: false,
  },
  {
    id: "provider",
    title: "Provider",
    options: ["Coursera", "Udemy", "Google", "IBM", "Microsoft", "Meta"],
    hasShowMore: true,
  },
  {
    id: "careerGoal",
    title: "Career Goal",
    options: ["Data Scientist", "ML Engineer", "AI Engineer"],
    hasShowMore: true,
  }
];

const mockRoadmap = [
  { name: "Python", type: "terminal" },
  { name: "Data Science", type: "database" },
  { name: "Machine Learning", type: "network" },
  { name: "Deep Learning", type: "brain" },
  { name: "Generative AI", type: "sparkles" },
  { name: "ML Ops", type: "cpu" }
];

const mockCoursesList = [
  { id: 1, title: "Python for Data Science", provider: "Coursera", duration: "24 hours", level: "Beginner", rating: "4.8", reviews: "12.4K", category: "Python", tag: "Python Programming", badge: "Best seller" },
  { id: 2, title: "Python for Data Science", provider: "Udemy", duration: "24 hours", level: "Beginner", rating: "4.8", reviews: "12.4K", category: "Python", tag: "Python Programming", badge: "Popular" },
  { id: 3, title: "Introduction to Machine Learning", provider: "Coursera", duration: "32 hours", level: "Intermediate", rating: "4.7", reviews: "8.9K", category: "Machine Learning", tag: "ML Algorithms", badge: "Best seller" },
  { id: 4, title: "Deep Learning Specialization", provider: "Coursera", duration: "48 hours", level: "Advanced", rating: "4.9", reviews: "15.2K", category: "Artificial intelligence", tag: "Deep Learning", badge: "Top Rated" },
  { id: 5, title: "Natural Language Processing in Python", provider: "Udemy", duration: "20 hours", level: "Intermediate", rating: "4.6", reviews: "5.1K", category: "NLP", tag: "NLP Programming", badge: "Popular" },
  { id: 6, title: "Generative AI Bootcamp", provider: "Google", duration: "12 hours", level: "Beginner", rating: "4.8", reviews: "22.3K", category: "Gen AI", tag: "Generative AI", badge: "Trending" },
  { id: 7, title: "TensorFlow Developer Certificate", provider: "Coursera", duration: "40 hours", level: "Advanced", rating: "4.8", reviews: "9.7K", category: "Machine Learning", tag: "TensorFlow", badge: "Specialization" },
  { id: 8, title: "Advanced ML Ops & Pipelines", provider: "Udemy", duration: "28 hours", level: "Advanced", rating: "4.7", reviews: "3.4K", category: "Machine Learning", tag: "ML Ops", badge: "New" }
];

const mockRecommendedTracks = [
  { title: "Core AI Skills", type: "Micro-coursed Project" },
  { title: "Core AI Skills", type: "Micro-coursed Project" },
  { title: "Core AI Skills", type: "Micro-coursed Project" }
];

const mockSkillGapData = {
  currentRole: "Software Engineer",
  targetRole: "AI Engineer",
  overallScore: 87,
  skills: [
    { title: "Python", value: 95, color: "bg-[#10b981]" },
    { title: "Machine Learning", value: 90, color: "bg-[#10b981]" },
    { title: "Deep Learning", value: 77, color: "bg-[#3b82f6]" },
    { title: "NLP", value: 65, color: "bg-[#f59e0b]" },
  ],
  missingSkills: ["Problem Solving", "Machine learning"]
};

const mockCareerOutcomes = [
  { title: "AI Engineer" },
  { title: "Data Scientist" },
  { title: "ML Engineer" },
  { title: "Prompt Engineer" }
];

const mockTopSkills = [
  { name: "AI Engineer", percentage: "+175%" },
  { name: "Data Scientist", percentage: "+165%" },
  { name: "ML Engineer", percentage: "+125%" },
  { name: "Prompt Engineer", percentage: "+100%" }
];

const mockDiscussions = [
  { title: "How difficult is deep learning for beginners?", replies: 24, time: "5 hrs ago" },
  { title: "How difficult is deep learning for beginners?", replies: 24, time: "5 hrs ago" },
  { title: "How difficult is deep learning for beginners?", replies: 24, time: "5 hrs ago" }
];

// Helper delay simulator
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated Asynchronous APIs
export async function fetchUserOverview() {
  await delay(800); // 800ms simulated backend delay
  return { ...mockUserOverview };
}

export async function fetchFilterConfig() {
  await delay(600);
  return [...mockFilterConfig];
}

export async function fetchRoadmap() {
  await delay(700);
  return [...mockRoadmap];
}

export async function fetchCourses(filters = {}) {
  await delay(900);
  
  // Filter logic simulation
  let filtered = [...mockCoursesList];
  
  if (filters.category && filters.category.length > 0) {
    filtered = filtered.filter(c => filters.category.includes(c.category));
  }
  
  if (filters.level && filters.level.length > 0) {
    filtered = filtered.filter(c => filters.level.includes(c.level));
  }
  
  if (filters.provider && filters.provider.length > 0) {
    filtered = filtered.filter(c => filters.provider.includes(c.provider));
  }
  
  // If filters leave nothing, return default list or empty
  return filtered;
}

export async function fetchRecommendedTracks() {
  await delay(500);
  return [...mockRecommendedTracks];
}

export async function fetchSkillGapData() {
  await delay(750);
  return { ...mockSkillGapData };
}

export async function fetchCareerOutcomes() {
  await delay(650);
  return [...mockCareerOutcomes];
}

export async function fetchTopSkills() {
  await delay(600);
  return [...mockTopSkills];
}

export async function fetchDiscussions() {
  await delay(700);
  return [...mockDiscussions];
}
