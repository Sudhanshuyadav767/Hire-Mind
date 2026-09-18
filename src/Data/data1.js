export const Applynow = [
  {
    apply: "Apply for Software Engineer",
    company: "Google",
    location: "Bangalore",
    jobtype: "Full Time",
  },
];

export const AdditionalInfo = {
  infoBox: {
    title: "Almost there! Just a few more details.",
    description:
      "This information helps employers understand you better.",
  },

  education: {
    title: "Education",

    highestDegree: {
      label: "Highest Degree",
      defaultValue: "Bachelor's Degree",
      options: [
        "High School",
        "Diploma",
        "Associate Degree",
        "Bachelor's Degree",
        "Master's Degree",
        "Doctorate",
      ],
    },

    fieldOfStudy: {
      label: "Field of Study",
      defaultValue: "Computer Science",
      options: [
        "Computer Science",
        "Information Technology",
        "Electronics & Communication",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Business Administration",
        "Other",
      ],
    },

    university: {
      label: "University/College",
      defaultValue: "Indian Institute of Technology, Delhi",
      placeholder: "Enter your university/college",
    },

    graduationYear: {
      label: "Year of Graduation",
      defaultValue: "2021",
      options: [
        "2021",
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
        "2030",
      ],
    },
  },

  workExperience: {
    title: "Work Experience",

    employmentStatus: {
      label: "Current Employment Status",
      defaultValue: "Currently Employed",
      options: [
        "Currently Employed",
        "Self Employed",
        "Freelancer",
        "Student",
        "Unemployed",
      ],
    },

    currentCompany: {
      label: "Current Company",
      defaultValue: "Tech Solutions Pvt. Ltd.",
      placeholder: "Enter your current company",
    },

    currentJobTitle: {
      label: "Current Job Title",
      defaultValue: "Software Engineer",
      placeholder: "Enter your current job title",
    },

    totalExperience: {
      label: "Total Experience",
      defaultValue: "2-4 Years",
      options: [
        "Fresher",
        "Less than 1 Year",
        "1-2 Years",
        "2-4 Years",
        "5-7 Years",
        "8+ Years",
      ],
    },
  },

  additionalInformation: {
    title: "Additional Information",

    noticePeriod: {
      label: "Notice Period",
      defaultValue: "Currently Employed",
      options: [
        "Immediate",
        "15 Days",
        "30 Days",
        "60 Days",
        "90 Days",
        "Currently Employed",
      ],
    },

    willingToRelocate: {
      label: "Willing to Relocate?",
      defaultValue: "Yes",
      options: ["Yes", "No", "Maybe"],
    },

    portfolio: {
      label: "Portfolio / GitHub",
      optional: true,
      defaultValue: "https://github.com/amansingh",
      placeholder: "Enter your portfolio or GitHub URL",
    },

    linkedin: {
      label: "LinkedIn Profile",
      optional: true,
      defaultValue: "http://linkedin.com/in/amansingh",
      placeholder: "Enter your LinkedIn profile",
    },

    aboutYourself: {
      label: "Tell us about yourself",
      description:
        "Share a short summary about your experience, skills and what motivates you.",
      defaultValue:
        "Passionate software engineer with expertise in building scalable web applications using modern technologies. I enjoy solving complex problems and collaborating with cross-functional teams to create impactful products.",
      maxLength: 500,
    },
  },

  buttons: {
    back: "Back",
    continue: "Save & Continue",
  },
};

export const ApplicationSuccessData = {
  title: "Application Submitted Successfully!",

  description: [
    "Thank you for applying for the Software Engineer position at Google.",
    "We have received your application.",
  ],

  matchScore: {
    score: 87,
    total: 100,
    label: "Excellent Match",
  },

  steps: [
    {
      id: 1,
      title: "Application Review",
      description:
        "Our team will review your application and assess your profile.",
      duration: "2-3 Business Days",
      icon: "mail",
    },
    {
      id: 2,
      title: "AI Assessment (if Shortlisted)",
      description:
        "You may be invited to complete an AI assessment to evaluate your skills.",
      duration: "3-5 Business Days",
      icon: "assessment",
    },
    {
      id: 3,
      title: "Interview Round",
      description:
        "Shortlisted candidates will be invited for an interview with the hiring team.",
      duration: "5-7 Business Days",
      icon: "users",
    },
    {
      id: 4,
      title: "Offer & Onboarding",
      description:
        "If selected, you will receive an offer and onboarding details.",
      duration: "Varies",
      icon: "offer",
    },
  ],

  dashboardNotice: {
    title: "We will keep you updated on your application status",
    description:
      "You can track your application anytime from your dashboard.",
    buttonText: "Go to Dashboard",
  },

  opportunities: {
    title: "Explore more opportunities",
    description:
      "Check out similar jobs that match your skills and experience",
    buttonText: "Browse Jobs",
  },
};


export const reviewData = {
  steps: [
    {
      id: 1,
      title: "Personal Details",
      completed: true,
    },
    {
      id: 2,
      title: "Resume & Skills",
      completed: true,
    },
    {
      id: 3,
      title: "Additional Info",
      completed: true,
    },
    {
      id: 4,
      title: "Review & Submit",
      completed: false,
    },
  ],

  reviewMessage: {
    title: "Review your application before submitting",
    description: "Please ensure all details are correct and complete.",
  },

  personalInformation: {
    fullName: "Aman Singh",
    email: "aman.singh@gmail.com",
    phone: "+91 9876543210",
    currentLocation: "Bangalore, Karnataka",
    linkedin: "linkedin.com/in/amansingh",
    workAuthorization: "Yes, I am authorized to work in India",
  },

  resumeSkills: {
    resume: {
      name: "Aman_Singh_Resume.pdf",
      size: "534 KB",
    },

    skills: [
      "Python",
      "React",
      "Javascript",
      "SQL",
      "Problem Solving",
    ],

    yearsOfExperience: "2-4 Years",
  },

  additionalInformation: {
    education: {
      highestDegree: "Bachelor's Degree",
      fieldOfStudy: "Computer Science",
      university: "Indian Institute of Technology, Delhi",
      yearOfGraduation: "2021",
    },

    workExperience: {
      employmentStatus: "Currently Employed",
      currentCompany: "Tech Solutions Pvt. Ltd.",
      jobTitle: "Software Engineer",
      totalExperience: "2-4 Years",
    },

    additionalInfo: {
      noticePeriod: "30 Days",
      willingToRelocate: "Yes",
      portfolio: "https://github.com/amansingh",
    },

    aboutYou:
      "Passionate software engineer with expertise in building scalable web applications using modern technologies. I enjoy solving complex problems and collaborating with cross-functional teams to create impactful products.",
  },
};



//Chatbot
export const careerPaths = [
  {
    title: "Software Development",
    growth: "High Growth",
    salary: "₹8–21 LPA",
  },
  {
    title: "Software Development",
    growth: "High Growth",
    salary: "₹5–21 LPA",
  },
  {
    title: "Software Development",
    growth: "High Growth",
    salary: "₹8–21 LPA",
  },
];


export const popularQuestions = [
  "What career is right for me?",
  "How can I improve my resume?",
  "What skills are in demand?",
  "How to prepare for interview?",
  "What are the highest paying jobs?",
];

export const careerTools = [
  {
    title: "Resume Builder",
    description: "Create a professional resume",
    icon: "resume",
  },
  {
    title: "Job Matcher",
    description: "Find jobs that match your profile",
    icon: "job",
  },
  {
    title: "Skill Assessment",
    description: "Assess and improve your skills",
    icon: "skill",
  },
  {
    title: "Interview Prep",
    description: "Practice with AI mock interviews",
    icon: "interview",
  },
];

export const resources = [
  {
    title: "In-Demand Skills in 2026",
    description: "Top skills employers are looking for",
    icon: "skills",
  },
  {
    title: "Career Growth Roadmap",
    description: "Plan your career path effectively",
    icon: "roadmap",
  },
  {
    title: "Resume Writing Guide",
    description: "Tips to write a winning resume",
    icon: "resume",
  },
];

//destrop-22

export const learningData = {
  match: 85,

  profile: {
    careerGoal: "Data Scientist",
    experience: "2-3 Years",
    topInterest: "Machine Learning",
  },

  courses: [
    {
      id: 1,
      title: "Python for Data Science and Machine Learning",
      description:
        "Learn Python programming with real-world examples in data science and machine learning.",
      level: "Beginner to Advanced",
      rating: "4.5",
      reviews: "9.1k",
      duration: "24 Hours",
      match: 92,
      image: "/logo/python.png",
    },
    {
      id: 2,
      title: "Python for Data Science and Machine Learning",
      description:
        "Learn Python programming with real-world examples in data science and machine learning.",
      level: "Beginner to Advanced",
      rating: "4.5",
      reviews: "9.1k",
      duration: "24 Hours",
      match: 92,
      image: "/logo/python.png",
    },
    {
      id: 3,
      title: "Python for Data Science and Machine Learning",
      description:
        "Learn Python programming with real-world examples in data science and machine learning.",
      level: "Beginner to Advanced",
      rating: "4.6",
      reviews: "8.1k",
      duration: "24 Hours",
      match: 92,
      image: "/logo/python.png",
    },
    {
      id: 4,
      title: "Python for Data Science and Machine Learning",
      description:
        "Learn Python programming with real-world examples in data science and machine learning.",
      level: "Beginner to Advanced",
      rating: "4.5",
      reviews: "9.1k",
      duration: "24 Hours",
      match: 92,
      image: "/logo/python.png",
    },
  ],
};


export const learningProgress = {
  overallProgress: 68,
  coursesEnrolled: 12,
  coursesCompleted: 5,
  hoursLearned: 24,
  certificatesEarned: 5,
};

export const skills = [
  "Python",
  "React",
  "JavaScript",
  "SQL",
  "Problem Solving",
  "Machine Learning",
];

export const learningPath = [
  {
    id: 1,
    title: "Python for Data Science",
    status: "In Progress",
    progress: 65,
  },
  {
    id: 2,
    title: "SQL for Data Analysis",
    status: "Not Started",
    progress: 0,
  },
  {
    id: 3,
    title: "Statistics for Data Science",
    status: "Not Started",
    progress: 0,
  },
  {
    id: 4,
    title: "Machine Learning",
    status: "Not Started",
    progress: 0,
  },
  {
    id: 5,
    title: "Data Visualization with Python",
    status: "Not Started",
    progress: 0,
  },
];

export const aiAssistant = {
  title: "Need Help Choosing?",
  description:
    "Chat with our AI career assistant to get personalized course suggestions.",
  buttonText: "Chat with AI Assistant",
  image: "/Images/Robot.png",
};
