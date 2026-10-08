import {
  Code2,
  Database,
  BarChart3,
  Brain,
  ChartNoAxesCombined,
  Sigma,
  Boxes,
} from "lucide-react";

export const skillCategories = [
  {
    title: "Programming",
    icon: Code2,
    count: 3,
    skills: [
      {
        name: "Python",
        description:
          "Core programming language for data analysis, machine learning, and automation.",
        percentage: 92,
        level: "Advanced",
        icon: "🐍",
      },
      {
        name: "SQL",
        description:
          "Query databases, write complex joins, and extract valuable insights.",
        percentage: 76,
        level: "Advanced",
        icon: "SQL",
      },
      {
        name: "R Programming",
        description:
          "Statistical computing and data visualization using R language.",
        percentage: 40,
        level: "Intermediate",
        icon: "R",
      },
    ],
  },

  {
    title: "Data Analysis",
    icon: Database,
    count: 3,
    skills: [
      {
        name: "Data Analysis with Pandas",
        description:
          "Data manipulation, cleaning and analysis using Pandas library.",
        percentage: 85,
        level: "Advanced",
        icon: "▥",
      },
      {
        name: "NumPy",
        description:
          "Perform mathematical operations and work with large multi-dimensional arrays.",
        percentage: 70,
        level: "Advanced",
        icon: "N",
      },
      {
        name: "Statistics & Probability",
        description:
          "Understand probability distributions, hypothesis testing and statistical modeling.",
        percentage: 62,
        level: "Intermediate",
        icon: "Σ",
      },
    ],
  },

  {
    title: "Machine Learning",
    icon: Brain,
    count: 3,
    skills: [
      {
        name: "Machine Learning Basics",
        description:
          "Supervised, unsupervised learning and model evaluation techniques.",
        percentage: 75,
        level: "Advanced",
        icon: "🧠",
      },
      {
        name: "Scikit-learn",
        description:
          "Build and evaluate machine learning models using scikit-learn.",
        percentage: 65,
        level: "Advanced",
        icon: "ML",
      },
      {
        name: "Deep Learning Basics",
        description:
          "Neural networks, training models and deep learning fundamentals.",
        percentage: 36,
        level: "Intermediate",
        icon: "✣",
      },
    ],
  },

  {
    title: "Data Visualization",
    icon: BarChart3,
    count: 3,
    skills: [
      {
        name: "Data Visualization with Matplotlib",
        description:
          "Create static, animated and interactive visualizations in Python.",
        percentage: 80,
        level: "Advanced",
        icon: "📊",
      },
      {
        name: "Seaborn",
        description:
          "Statistical data visualization based on Matplotlib.",
        percentage: 65,
        level: "Advanced",
        icon: "🌊",
      },
      {
        name: "Dashboarding (Tableau/ Power BI)",
        description:
          "Build interactive dashboards and communicate insights effectively.",
          percentage: 45,
          level:"Intermidiate",
          icon: "▮"
      }
    ]
}
]


//destop-50
export const courses = [
  {
    id: 1,
    title: "Python for Data Science and Machine Learning",
    provider: "Coursera",
    level: "Beginner",
    duration: "21 hours",
    rating: "4.8",
    reviews: "12.4K",
    image: "/logo/python.png",
  },
  {
    id: 2,
    title: "SQL for Data Science",
    provider: "Coursera",
    level: "Beginner",
    duration: "16 hours",
    rating: "4.8",
    reviews: "12.4K",
    image: "/logo/python.png",
  },
  {
    id: 3,
    title: "R Programming for Data Science",
    provider: "edX",
    level: "Intermediate",
    duration: "18 hours",
    rating: "4.8",
    reviews: "12.4K",
    image: "/logo/python.png",
  },
  {
    id: 4,
    title: "Data Analysis with Pandas",
    provider: "Coursera",
    level: "Intermediate",
    duration: "16 hours",
    rating: "4.8",
    reviews: "12.4K",
    image: "/logo/python.png",
  },
  {
    id: 5,
    title: "NumPy for Data Science",
    provider: "Udemy",
    level: "Intermediate",
    duration: "10.5 hours",
    rating: "4.8",
    reviews: "12.4K",
    image: "/logo/python.png",
  },
  {
    id: 6,
    title: "Statistics & Probability for Data Science",
    provider: "Coursera",
    level: "Intermediate",
    duration: "21 hours",
    rating: "4.8",
    reviews: "12.4K",
    image:"/logo/python.png",
  },
  {
    id: 7,
    title: "Machine Learning with Scikit-learn",
    provider: "Coursera",
    level: "Advanced",
    duration: "24 hours",
    rating: "4.8",
    reviews: "12.4K",
    image: "/logo/python.png",
  },
  {
    id: 8,
    title: "Data Visualization with Tableau",
    provider: "Coursera",
    level: "Advanced",
    duration: "14 hours",
    rating: "4.8",
    reviews: "12.4K",
    image:"/logo/python.png",
  },
  {
    id: 9,
    title: "Deep Learning Specialization",
    provider: "Coursera",
    level: "Advanced",
    duration: "36 hours",
    rating: "4.8",
    reviews: "12.4K",
    image: "/logo/python.png",
  },
  {
    id: 10,
    title: "Feature Engineering for Machine Learning",
    provider: "Udemy",
    level: "Advanced",
    duration: "12 hours",
    rating: "4.8",
    reviews: "12.4K",
    image: "/logo/python.png",
  },
  {
    id: 11,
    title: "Big Data Analytics with PySpark",
    provider: "Coursera",
    level: "Advanced",
    duration: "21 hours",
    rating: "4.8",
    reviews: "12.4K",
    image: "/logo/python.png",
  },
  {
    id: 12,
    title: "Databases for Data Scientists",
    provider: "Coursera",
    level: "Intermediate",
    duration: "13 hours",
    rating: "4.8",
    reviews: "12.4K",
    image: "/logo/python.png",
  },
];

export const jobTypes = [
  { id: "all", label: "All Jobs Type" },
  { id: "full-time", label: "Full Time" },
  { id: "part-time", label: "Part Time" },
  { id: "remote", label: "Remote" },
  { id: "internship", label: "Internship" },
  { id: "freelance", label: "Freelance" },
];

export const experienceLevels = [
  { id: "fresher", label: "Fresher (0-1Yr)", count: 1234 },
  { id: "1-3", label: "1-3 Years", count: 2345 },
  { id: "3-5", label: "3-5 Years", count: 1254 },
  { id: "5-10", label: "5-10 Years", count: 1204 },
  { id: "10+", label: "10+ Years", count: 102 },
];

export const locations = [
  { id: "bangalore", label: "Bangalore", count: 1234 },
  { id: "mumbai", label: "Mumbai", count: 2345 },
  { id: "delhi", label: "Delhi", count: 1254 },
  { id: "pune", label: "Pune", count: 1204 },
  { id: "hyderabad", label: "Hyderabad", count: 102 },
  { id: "chennai", label: "Chennai", count: 856 },
  { id: "noida", label: "Noida", count: 743 },
  { id: "gurgaon", label: "Gurgaon", count: 621 },
];

export const salaryRange = {
  min: 0,
  max: 5000000,
};


export const jobs = [
  {
    id: 1,
    title: "Data Scientist",
    company: "Google",
    logo: "/logo/google.png",
    experience: "5+ Yrs",
    location: "Bangalore, India",
    salary: "₹15-28LPA",
    jobType: "Full Time",
    posted: "15 hours",
    skills: [
      "Python",
      "Machine Learning",
      "SQL",
      "Statistics",
    ],
  },

  {
    id: 2,
    title: "Data Scientist",
    company: "Amazon",
    logo: "/logo/google.png",
    experience: "5+ Yrs",
    location: "Bangalore, India",
    salary: "₹15-28LPA",
    jobType: "Full Time",
    posted: "15 hours",
    skills: [
      "Python",
      "Machine Learning",
      "SQL",
      "Statistics",
    ],
  },

  {
    id: 3,
    title: "Data Scientist",
    company: "Microsoft",
    logo: "/logo/google.png",
    experience: "5+ Yrs",
    location: "Bangalore, Karnataka",
    salary: "₹15-28LPA",
    jobType: "Full Time",
    posted: "15 hours",
    skills: [
      "Python",
      "Machine Learning",
      "SQL",
      "Statistics",
    ],
  },

  {
    id: 4,
    title: "Data Scientist",
    company: "Swiggy",
    logo: "/logo/google.png",
    experience: "5+ Yrs",
    location: "Bangalore, Karnataka",
    salary: "₹15-28LPA",
    jobType: "Full Time",
    posted: "15 hours",
    skills: [
      "Python",
      "Machine Learning",
      "SQL",
      "Statistics",
    ],
  },

  {
    id: 5,
    title: "Data Scientist",
    company: "ZS Associates",
    logo: "/logo/google.png",
    experience: "5+ Yrs",
    location: "Bangalore, Karnataka",
    salary: "₹15-28LPA",
    jobType: "Full Time",
    posted: "15 hours",
    skills: [
      "Python",
      "Machine Learning",
      "SQL",
      "Statistics",
    ],
  },

  {
    id: 6,
    title: "Data Scientist",
    company: "TCS",
    logo: "/logo/google.png",
    experience: "5+ Yrs",
    location: "Bangalore, Karnataka",
    salary: "₹15-28LPA",
    jobType: "Full Time",
    posted: "15 hours",
    skills: [
      "Python",
      "Machine Learning",
      "SQL",
      "Statistics",
    ],
  },
];

export const totalJobs = 196;