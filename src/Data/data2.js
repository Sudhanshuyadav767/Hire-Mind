import {
  BarChart3,
  User,
  TrendingUp,
  Award,
  Network,
  Mail,
  Target,
} from "lucide-react";

export const careerOverview = {
  title: "Career Overview",
  icon: BarChart3,

  description:
    "Data Scientists use statistics, machine learning and programming to analyze data and derive insights. They work across diverse industries to solve business problems and drive data-informed decisions.",

  stats: [
    {
      icon: User,
      title: "Experience Level",
      value: "1–3 Years",
      subtitle: "Recommended",
    },
    {
      icon: BarChart3,
      title: "Industry Demand",
      value: "Very High",
      subtitle: "Growing rapidly",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      value: "Excellent",
      subtitle: "Future Outlook",
    },
    {
      icon: Award,
      title: "Job Satisfaction",
      value: "4.6/5",
      subtitle: "High",
    },
  ],

  responsibilities: [
    "Collect, clean and analyze large datasets",
    "Build machine learning models and algorithms",
    "Identify trends and patterns in data",
    "Create data visualizations and dashboards",
    "Communicate insights to stakeholders",
    "Collaborate with cross-functional teams",
  ],
};

export const careerPath = [
  {
    icon: User,
    title: "Junior Data Scientist",
    experience: "0–2 Years",
  },
  {
    icon: Network,
    title: "Data Scientist",
    experience: "2–5 Years",
    active: true,
  },
  {
    icon: BarChart3,
    title: "Senior Data Scientist",
    experience: "5–8 Years",
  },
  {
    icon: Mail,
    title: "Lead Data Scientist",
    experience: "8+ Years",
  },
  {
    icon: Target,
    title: "Head of Data /",
    secondTitle: "Data Science",
    experience: "10+ Years",
  },
];

export const skillsRequired = [
  {
    category: "Programming",
    technologies: "Python, R, SQL",
    percentage: 65,
    level: "High",
  },
  {
    category: "Data Analysis",
    technologies: "Pandas, NumPy, SQL",
    percentage: 60,
    level: "High",
  },
  {
    category: "Machine Learning",
    technologies: "Scikit-learn, ML Models",
    percentage: 70,
    level: "High",
  },
  {
    category: "Data Visualization",
    technologies: "Tableau, Power BI, Matplotlib",
    percentage: 90,
    level: "Medium",
  },
  {
    category: "Statistics & Math",
    technologies: "Probability, Linear Algebra",
    percentage: 30,
    level: "Medium",
  },
  {
    category: "Big Data",
    technologies: "Hadoop, Spark",
    percentage: 32,
    level: "Low",
  },
];