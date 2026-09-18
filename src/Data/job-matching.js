import {
  BriefcaseBusiness, GraduationCap, MapPin, Wallet, CalendarDays, IndianRupee, UserRound, Network, ClipboardList, ArrowRight, LockKeyhole, ShieldCheck
} from "lucide-react";

// ===============================
// JOB MATCHING DATA
// ===============================

export const jobMatchingData = {
  job: {
    title: "Software Engineer",
    image: "google.png",
    company: "Google",
    verified: true,
    location: "Bangalore, Karnataka",
    experience: "2-4 Yrs",
    salary: "₹8-18.5 LPA",
    match: 87,
    matchText: "Excellent Match",
    tags: ["Full Time", "Remote", "React", "Python", "+3"],
  },

  aboutRole:
    "As a Software Engineer at Google, you will design, develop, and deploy scalable software solutions that impact billions of users. You'll work with a team of talented engineers to solve complex problems and build products that make a difference.",

  responsibilities: [
    "Design and build reliable software solutions.",
    "Collaborate with cross-functional teams to define and implement new features.",
    "Write clean, efficient, and testable code.",
    "Review code and provide constructive feedback.",
    "Optimize applications for maximum speed and scalability.",
  ],

  requirements: [
    "Bachelor's degree in Computer Science or related field.",
    "2-4 years of experience in software development.",
    "Proficiency in Python, React, analytical skills.",
    "Strong problem-solving and analytical skills.",
    "Excellent communication and teamwork abilities.",
  ],

  niceToHave: [
    "Experience with Google Cloud Platform (GCP).",
    "Knowledge of distributed systems and microservices.",
    "Open source contributions.",
  ],

  benefits: [
    {
      icon: "💳",
      title: "Competitive Salary",
      description: "Best in industry compensation",
    },
    {
      icon: "♡",
      title: "Health & Wellness",
      description: "Medical, dental & wellness benefits",
    },
    {
      icon: "🎓",
      title: "Learn & Growth",
      description: "Access to courses and certifications",
    },
    {
      icon: "👥",
      title: "Great Culture",
      description: "Inclusive, innovative & collaborative",
    },
  ],

  whyMatch: {
    title: "Why this match?",
    description:
      "Your skills and experience align very well with this role and requirements.",
    estimatedSalary: "₹8-18.5 LPA",
    salaryDescription: "Based on market data",
  },
};

// ===============================
// JOB MATCH SCORES
// ===============================

export const jobMatchingData1 = [
  {
    title: "Skills Match",
    score: 85,
  },
  {
    title: "Experience Match",
    score: 90,
  },
  {
    title: "Role Match",
    score: 77,
  },
  {
    title: "Location Match",
    score: 85,
  },
];

// ===============================
// JOB DETAILS
// ===============================

export const jobDetails = [
  {
    icon: BriefcaseBusiness,
    label: "Job Type",
    value: "Full Time",
  },
  {
    icon: GraduationCap,
    label: "Experience",
    value: "2-4 Yrs",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bangalore, Karnataka",
  },
  {
    icon: Wallet,
    label: "Salary",
    value: "₹8-18.5 LPA",
  },
  {
    icon: CalendarDays,
    label: "Posted On",
    value: "2 Days Ago",
  },
];

// ===============================
// APPLY NOW
// ===============================

export const Applynow = [
  {
    apply: "Apply for Software Engineer",
    company: "Google",
    location: "Bangalore",
    jobtype: "Full Time",
  },
];

// ===============================
// PERSONAL DETAILS
// ===============================

export const personalDetailsData = {
  steps: [
    {
      id: 1,
      title: "Personal Details",
    },
    {
      id: 2,
      title: "Resume & Skills",
    },
    {
      id: 3,
      title: "Additional Info",
    },
    {
      id: 4,
      title: "Review & Submit",
    },
  ],

  description: "Please fill in your personal details accurately.",

  personalInformation: {
    title: "Personal Information",

    fullName: {
      label: "Full name",
      value: "Arman Singh",
    },

    email: {
      label: "Email Address",
      value: "arman.singh@gmail.com",
    },

    phone: {
      label: "Phone Number",
      countryCode: "+91",
      value: "9876543210",
    },

    location: {
      label: "Current Location",
      value: "Bengaluru, Karnataka",
    },

    linkedin: {
      label: "LinkedIn Profile",
      optional: "Optional",
      value: "http://linkedin.com/in/armansingh",
    },
  },

  workAuthorization: {
    title: "Work Authorization",
    question: "Are you authorized to work in India?",

    options: [
      {
        label: "Yes",
        value: "yes",
        checked: true,
      },
      {
        label: "No",
        value: "no",
        checked: false,
      },
      {
        label: "Not Sure",
        value: "not-sure",
        checked: false,
      },
    ],
  },

  buttons: {
    back: "Back",
    continue: "Save & Continue",
  },
};

// ===============================
// JOB SUMMARY
// ===============================

export const jobSummaryData = {
  jobType: "Full Time",
  experience: "2-4 Yrs",
  location: "Bangalore, Karnataka",
  salary: "₹8-18.5 LPA",
};

export const jobSummary = [
  {
    icon: BriefcaseBusiness,
    label: "Job Type",
    value: jobSummaryData.jobType,
  },
  {
    icon: CalendarDays,
    label: "Experience",
    value: jobSummaryData.experience,
  },
  {
    icon: MapPin,
    label: "Location",
    value: jobSummaryData.location,
  },
  {
    icon: IndianRupee,
    label: "Salary",
    value: jobSummaryData.salary,
  },
];

// ===============================
// ICON MAP
// ===============================

export const iconMap = {
  user: UserRound,
  network: Network,
  file: ClipboardList,
  arrow: ArrowRight,
};

export const datasecurity=[
  {
    icon:LockKeyhole,
    value:"Encrypted Data"
  },
  {
    icon: ShieldCheck,
    value:"Private & Secure"
  },
  {
    icon: UserRound,
    value:"Employer only"
  }
]

export const resumeData = {
  skills: [
    "Python",
    "React",
    "JavaScript",
    "SQL",
    "Problem Solving",
  ],

  experience: [
    "Fresher",
    "0-1 Years",
    "1-2 Years",
    "2-4 Years",
    "4-6 Years",
    "6+ Years",
  ],
};

export const jobData = {
  title: "Software Engineer",
  company: "Google",
  jobType: "Full Time",
  experience: "2-4Yrs",
  location: "Bengaluru, Karnataka",
  salary: "8-18.5 LPA",
  matchScore: 87,

  progress: [
    {
      number: "✓",
      title: "Personal Information",
      status: "Completed",
    },
    {
      number: "✓",
      title: "Resume & Skills",
      status: "In Progress",
    },
    {
      number: "✓",
      title: "Additional Information",
      status: "Pending",
    },
    {
      number: "4",
      title: "Review & Submit",
      status: "Pending",
    },
  ],
};