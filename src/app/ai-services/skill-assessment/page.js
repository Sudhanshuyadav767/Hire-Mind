"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../../component/common/Header";
import Footer from "../../component/common/Footer";
import {
  BrainCircuit,
  Sparkles,
  Target,
  Play,
  ArrowRight,
  ArrowLeft,
  Code2,
  Database,
  Megaphone,
  PenTool,
  CheckCircle2,
  Clock,
  Users,
  CheckCircle,
  Eye,
  Award,
  Star,
  Lock,
  Monitor,
  Signal,
  HelpCircle,
  CheckSquare,
  Info,
  ListTodo,
  Terminal,
  ChevronDown,
  Bookmark,
  Trash2,
  Share2,
  Download,
  Check
} from "lucide-react";

// Mock Data matching Figma Mockups Exactly
const categories = [
  "Programming & Development",
  "Design & Creative",
  "Marketing & Sales",
  "Finance & Accounting",
  "Business & Management"
];

const skillsByCategory = {
  "Programming & Development": ["JavaScript", "Python", "React", "SQL Database", "Node.js", "HTML & CSS"],
  "Design & Creative": ["UI/UX Design", "Figma Prototyping", "Adobe Illustrator", "Graphic Design"],
  "Marketing & Sales": ["Digital Marketing", "SEO Optimization", "Content Strategy", "Social Media"],
  "Finance & Accounting": ["Financial Analysis", "Excel Modeling", "Bookkeeping", "Tax Auditing"],
  "Business & Management": ["Agile Project Management", "Business Strategy", "Product Management", "Team Leadership"]
};

const popularSkills = [
  { id: 1, name: "JavaScript", questions: "12 Questions", level: "Intermediate", category: "Programming & Development", logo: "JS", bg: "bg-amber-100 text-amber-600 border-amber-200" },
  { id: 2, name: "Python", questions: "12 Questions", level: "Intermediate", category: "Programming & Development", logo: "PY", bg: "bg-blue-100 text-blue-600 border-blue-200" },
  { id: 3, name: "React", questions: "12 Questions", level: "Advanced", category: "Programming & Development", logo: "RE", bg: "bg-sky-100 text-sky-600 border-sky-200" },
  { id: 4, name: "SQL Database", questions: "12 Questions", level: "Beginner", category: "Programming & Development", logo: "SQL", bg: "bg-emerald-100 text-emerald-600 border-emerald-200" }
];

const recentAssessments = [
  { id: 1, name: "JavaScript", level: "Intermediate", date: "5 May 2026", score: 87, status: "Good" },
  { id: 2, name: "React", level: "Advanced", date: "2 May 2026", score: 92, status: "Excellent" },
  { id: 3, name: "Python", level: "Intermediate", date: "28 April 2026", score: 65, status: "Good" },
  { id: 4, name: "UI/UX Design", level: "Intermediate", date: "15 April 2026", score: 45, status: "Needs Improvement" }
];

const mockQuestions = [
  {
    id: 1,
    question: "Which of the following is the correct way to declare a variable in JavaScript?",
    options: [
      { key: "A", text: "variable x = 10;" },
      { key: "B", text: "var x = 10;" },
      { key: "C", text: "declare x = 10;" },
      { key: "D", text: "x := 10;" }
    ],
    correct: "B",
    category: "Variables & Data Types",
    explanation: "In JavaScript, variables can be declared using var, let, or const. The var x = 10; syntax is one of the correct ways."
  },
  {
    id: 2,
    question: "Which keyword is used to declare a block-scoped variable in JavaScript?",
    options: [
      { key: "A", text: "var" },
      { key: "B", text: "let" },
      { key: "C", text: "const" },
      { key: "D", text: "Both let and const" }
    ],
    correct: "D",
    category: "Variables & Data Types",
    explanation: "Both let and const provide block-scoping in modern JavaScript (ES6+)."
  },
  {
    id: 3,
    question: "Which of the following is used to add a comment in JavaScript?",
    options: [
      { key: "A", text: "// This is a comment" },
      { key: "B", text: "<!-- This is a comment -->" },
      { key: "C", text: "# This is a comment" },
      { key: "D", text: "Both A and B" }
    ],
    correct: "A",
    category: "Best Practices",
    explanation: "Double forward slashes (//) are used to start single line comments in JavaScript."
  },
  {
    id: 4,
    question: "Which operator is used to compare both value and type?",
    options: [
      { key: "A", text: "==" },
      { key: "B", text: "===" },
      { key: "C", text: "=" },
      { key: "D", text: "!=" }
    ],
    correct: "B",
    category: "ES6+ Features",
    explanation: "The triple equals (===) operator is the strict equality comparison operator that checks value and type."
  },
  {
    id: 5,
    question: "What will be the output of: console.log(typeof null);",
    options: [
      { key: "A", text: "\"null\"" },
      { key: "B", text: "\"undefined\"" },
      { key: "C", text: "\"object\"" },
      { key: "D", text: "\"number\"" }
    ],
    correct: "C",
    category: "Variables & Data Types",
    explanation: "Historically in JavaScript, null is treated as an object type, which is a known design flaw."
  },
  {
    id: 6,
    question: "How do you create a function in JavaScript?",
    options: [
      { key: "A", text: "function myFunction()" },
      { key: "B", text: "function:myFunction()" },
      { key: "C", text: "create myFunction()" },
      { key: "D", text: "def myFunction()" }
    ],
    correct: "A",
    category: "Functions",
    explanation: "Functions are declared using the function keyword followed by function name and parentheses."
  },
  {
    id: 7,
    question: "Which method is used to select an HTML element by its ID in the DOM?",
    options: [
      { key: "A", text: "document.getElementById()" },
      { key: "B", text: "document.querySelector()" },
      { key: "C", text: "document.getElements()" },
      { key: "D", text: "document.selectId()" }
    ],
    correct: "A",
    category: "DOM Manipulation",
    explanation: "getElementById() is the standard DOM method to retrieve a reference to a unique element by ID."
  },
  {
    id: 8,
    question: "Which promise method resolves as soon as any of the promises resolves or rejects?",
    options: [
      { key: "A", text: "Promise.all()" },
      { key: "B", text: "Promise.race()" },
      { key: "C", text: "Promise.any()" },
      { key: "D", text: "Promise.allSettled()" }
    ],
    correct: "B",
    category: "Async JavaScript",
    explanation: "Promise.race() settles (resolves or rejects) as soon as the first input promise in the iterable settles."
  },
  {
    id: 9,
    question: "What is the output of the following: console.log(typeof NaN);",
    options: [
      { key: "A", text: "\"number\"" },
      { key: "B", text: "\"NaN\"" },
      { key: "C", text: "\"undefined\"" },
      { key: "D", text: "\"object\"" }
    ],
    correct: "A",
    category: "Variables & Data Types",
    explanation: "NaN stands for Not-a-Number, but its ECMAScript standard type is a number."
  },
  {
    id: 10,
    question: "Which array method creates a new array with all elements that pass a test?",
    options: [
      { key: "A", text: "map()" },
      { key: "B", text: "filter()" },
      { key: "C", text: "reduce()" },
      { key: "D", text: "forEach()" }
    ],
    correct: "B",
    category: "Problem Solving",
    explanation: "filter() executes a callback function on each element and returns a new filtered array."
  },
  {
    id: 11,
    question: "Which ES6 feature allows matching properties of an object or elements of an array?",
    options: [
      { key: "A", text: "Destructuring" },
      { key: "B", text: "Spread Operator" },
      { key: "C", text: "Template Literals" },
      { key: "D", text: "Arrow Functions" }
    ],
    correct: "A",
    category: "ES6+ Features",
    explanation: "Destructuring assignment allows unpacking values from arrays or properties from objects into variables."
  },
  {
    id: 12,
    question: "What keyword is used to handle exceptions in JavaScript?",
    options: [
      { key: "A", text: "try...catch" },
      { key: "B", text: "throw" },
      { key: "C", text: "handle" },
      { key: "D", text: "Both A and B" }
    ],
    correct: "D",
    category: "Problem Solving",
    explanation: "Exceptions can be raised using throw and handled using try...catch blocks in JavaScript."
  }
];

export default function SkillAssessmentPage() {
  // Wizard steps: 'dashboard', 'instructions', 'assessment', 'review', 'results'
  const [currentStep, setCurrentStep] = useState("dashboard");

  // Selection state parameters
  const [selectedCategory, setSelectedCategory] = useState("Programming & Development");
  const [selectedSkill, setSelectedSkill] = useState("JavaScript");
  const [selectedLevel, setSelectedLevel] = useState("Intermediate");

  // Running test parameters
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOptionKey }
  const [markedForReview, setMarkedForReview] = useState({}); // { questionId: boolean }
  const [timeLeft, setTimeLeft] = useState(1884); // 31:24 remaining
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [resultsScore, setResultsScore] = useState(87);

  // Review screen pagination
  const [reviewPage, setReviewPage] = useState(1);
  const itemsPerReviewPage = 5;

  // Sync skill list directly via category change
  const handleCategoryChange = (catName) => {
    setSelectedCategory(catName);
    const list = skillsByCategory[catName] || [];
    if (list.length > 0) {
      setSelectedSkill(list[0]);
    }
  };

  const handleFinishTest = useCallback(() => {
    setIsTimerRunning(false);
    // Count exact correct answers
    let correctCount = 0;
    mockQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / mockQuestions.length) * 100);
    setResultsScore(finalScore);
    setCurrentStep("results");
  }, [answers]);

  // Countdown timer logic
  useEffect(() => {
    if (!isTimerRunning) return;

    if (timeLeft <= 0) {
      const timer = setTimeout(() => {
        handleFinishTest();
      }, 0);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, handleFinishTest]);

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleStartTestFlow = (skillName) => {
    setSelectedSkill(skillName || "JavaScript");
    setCurrentStep("instructions");
  };

  const handleBeginAssessment = () => {
    setCurrentStep("assessment");
    setTimeLeft(1884); // Reset to 31:24
    setIsTimerRunning(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setMarkedForReview({});
  };

  const handleOptionSelect = (optionKey) => {
    setAnswers({
      ...answers,
      [mockQuestions[currentQuestionIndex].id]: optionKey
    });
  };

  const handleClearAnswer = () => {
    const newAnswers = { ...answers };
    delete newAnswers[mockQuestions[currentQuestionIndex].id];
    setAnswers(newAnswers);
  };

  const handleToggleReview = () => {
    const qId = mockQuestions[currentQuestionIndex].id;
    setMarkedForReview({
      ...markedForReview,
      [qId]: !markedForReview[qId]
    });
  };

  const countAnswered = () => {
    return Object.keys(answers).length;
  };

  return (
    <div className="min-w-[320px] bg-[#f8f9ff] text-[#1E2229] font-poppins min-h-screen flex flex-col justify-between select-none">
      <div>
        <Header />

        {/* -------------------- STEP 1: DASHBOARD VIEW -------------------- */}
        {currentStep === "dashboard" && (
          <div className="space-y-6 sm:space-y-10 pb-16">
            {/* Hero Section */}
            <section className="bg-[#E2E4F8] px-4 py-6 sm:py-8 lg:px-8 rounded-b-3xl my-1 sm:my-2 mx-auto max-w-7xl relative shadow-3xs overflow-hidden">
              <div className="mx-auto max-w-7xl grid grid-cols-12 gap-4 sm:gap-6 items-center z-10 relative">
                
                {/* Left Column Content */}
                <div className="col-span-12 md:col-span-7 flex flex-col justify-center text-left space-y-2 sm:space-y-4">
                  <h1 className="text-[clamp(1.1rem,4.2vw,2.5rem)] font-poppins font-medium text-[#1E2229] tracking-tight leading-tight">
                    Skill Assessment
                  </h1>
                  
                  <div className="text-[clamp(9px,2.5vw,13px)] font-poppins font-bold text-[#2D24D0] uppercase tracking-wide">
                    Evaluate Your Skills. Know Your Strength. Grow Your Career.
                  </div>

                  <p className="text-[#5E637D] text-[clamp(0.6rem,1.8vw,0.85rem)] max-w-2xl leading-relaxed font-poppins font-medium">
                    Take our AI-powered skill assessments and get a detailed analysis of your abilities compared to industry standards. Discover your strengths and areas to improve.
                  </p>

                  {/* Highlights Row */}
                  <div className="flex flex-row flex-wrap gap-1.5 sm:gap-2.5 pt-1">
                    <div className="flex items-center gap-1 bg-white/70 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-100/50 shadow-3xs text-[clamp(8px,2.2vw,11px)] font-bold text-[#334155]">
                      <BrainCircuit size={12} className="text-[#2D24D0]" />
                      <span>AI-Powered Evaluation</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/70 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-100/50 shadow-3xs text-[clamp(8px,2.2vw,11px)] font-bold text-[#334155]">
                      <Users size={12} className="text-[#2D24D0]" />
                      <span>Industry Benchmarking</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/70 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-100/50 shadow-3xs text-[clamp(8px,2.2vw,11px)] font-bold text-[#334155]">
                      <Sparkles size={12} className="text-[#2D24D0]" />
                      <span>Personalized Insights</span>
                    </div>
                  </div>
                </div>

                {/* Right Column Image */}
                <div className="col-span-12 md:col-span-5 relative flex items-center justify-center shrink-0">
                  <div className="relative w-[35vw] md:w-full max-w-[140px] sm:max-w-[240px] aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-white border border-white sm:border-4">
                    <Image 
                      src="/Images/assessment_hero.jpg" 
                      alt="Skill Assessment Illustration"
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>

              </div>
            </section>

            {/* Selector Section & Category Input panel */}
            <main className="mx-auto max-w-7xl px-3 sm:px-4 space-y-8 sm:space-y-10">
              
              {/* Start a New Skill Assessment Block */}
              <section className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-sm space-y-4 sm:space-y-5 text-left">
                <h3 className="text-[clamp(10px,3.2vw,13px)] font-poppins font-bold text-[#1e293b] tracking-wide select-none uppercase">
                  Start a New Skill Assessment
                </h3>

                <div className="grid gap-3 sm:grid-cols-3">
                  
                  {/* Select Category */}
                  <div className="space-y-0.5 sm:space-y-1">
                    <label className="text-[9px] sm:text-[10px] font-bold text-slate-400 font-poppins uppercase block">Select Category</label>
                    <div className="relative">
                      <select 
                        value={selectedCategory} 
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-2.5 py-2.5 sm:py-3 text-[clamp(10px,2.8vw,12px)] text-[#334155] font-semibold outline-hidden focus:ring-1 focus:ring-[#2D24D0] cursor-pointer appearance-none"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
                    </div>
                  </div>

                  {/* Selected Skill */}
                  <div className="space-y-0.5 sm:space-y-1">
                    <label className="text-[9px] sm:text-[10px] font-bold text-slate-400 font-poppins uppercase block">Selected Skill</label>
                    <div className="relative">
                      <select 
                        value={selectedSkill} 
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-2.5 py-2.5 sm:py-3 text-[clamp(10px,2.8vw,12px)] text-[#334155] font-semibold outline-hidden focus:ring-1 focus:ring-[#2D24D0] cursor-pointer appearance-none"
                      >
                        {(skillsByCategory[selectedCategory] || []).map((skill) => (
                          <option key={skill} value={skill}>{skill}</option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
                    </div>
                  </div>

                  {/* Selected Experience Level */}
                  <div className="space-y-0.5 sm:space-y-1">
                    <label className="text-[9px] sm:text-[10px] font-bold text-slate-400 font-poppins uppercase block">Selected Experience Level</label>
                    <div className="relative">
                      <select 
                        value={selectedLevel} 
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-2.5 py-2.5 sm:py-3 text-[clamp(10px,2.8vw,12px)] text-[#334155] font-semibold outline-hidden focus:ring-1 focus:ring-[#2D24D0] cursor-pointer appearance-none"
                      >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
                    </div>
                  </div>

                </div>

                {/* Submits row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-50">
                  
                  {/* Meta Indicators */}
                  <div className="flex items-center gap-3.5 text-[9px] sm:text-[11px] text-slate-450 font-semibold select-none">
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-[#2D24D0]" /> 30-45 Mins
                    </span>
                    <span className="flex items-center gap-1">
                      <ListTodo size={12} className="text-[#2D24D0]" /> 12 Questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Award size={12} className="text-[#2D24D0]" /> Passing: 60%
                    </span>
                  </div>

                  {/* Button */}
                  <button 
                    onClick={() => handleStartTestFlow(selectedSkill)}
                    className="w-full sm:w-auto bg-[#2D24D0] hover:bg-[#1e1a8a] text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition active:scale-98 cursor-pointer shadow-sm"
                  >
                    <Play size={10} className="fill-current" />
                    <span>Start Assessment</span>
                  </button>

                </div>
              </section>

              {/* How It Works Section */}
              <section className="space-y-4">
                <div className="text-left select-none space-y-0.5">
                  <h3 className="text-sm sm:text-base font-semibold text-[#1E2229]">How It Works?</h3>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-medium">Four simple steps to benchmark your proficiency</p>
                </div>

                <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
                  {[
                    { id: 1, title: "Choose Assessment", desc: "Select a skill and experience level that you want to evaluate." },
                    { id: 2, title: "Take Assessment", desc: "Answer multiple choice questions and complete coding challenges." },
                    { id: 3, title: "AI Evaluation", desc: "Our AI model evaluates your answers and calculates your score." },
                    { id: 4, title: "Improve & Practice", desc: "Receive feedback, recommended learning materials, and practice paths." }
                  ].map((step) => (
                    <div key={step.id} className="bg-white border border-[#cbd5e1]/45 p-[3vw] sm:p-5 rounded-2xl shadow-3xs text-left flex flex-col justify-between gap-2.5">
                      <span className="w-6 h-6 bg-[#2D24D0]/10 text-[#2D24D0] rounded-lg flex items-center justify-center font-bold text-[10px] select-none">
                        {step.id}
                      </span>
                      <div className="space-y-0.5">
                        <h4 className="text-[clamp(10px,3.2vw,13px)] font-bold text-[#1e293b] leading-tight">{step.title}</h4>
                        <p className="text-[clamp(8.5px,2.6vw,11px)] text-slate-400 font-medium leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Grid content: Popular & Recent Assessments */}
              <section className="grid gap-4 sm:gap-6 md:grid-cols-[1.5fr_1fr] items-start">
                
                {/* Popular Skill Assessments (Left Side) */}
                <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-5 rounded-3xl shadow-sm space-y-4 text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <h3 className="text-xs sm:text-sm font-poppins font-bold text-[#1e293b] tracking-wide select-none">Popular Skill Assessments</h3>
                    <Link href="/categories" className="text-[9px] sm:text-[11px] font-bold text-[#2D24D0] hover:underline flex items-center gap-0.5">
                      <span>View All</span>
                      <ArrowRight size={8} />
                    </Link>
                  </div>

                  <div className="grid gap-3 grid-cols-2">
                    {popularSkills.map((skill) => (
                      <div 
                        key={skill.id}
                        className="bg-white border border-[#cbd5e1]/65 hover:border-[#2D24D0]/60 rounded-2xl p-[2vw] sm:p-4 flex flex-col justify-between gap-3 sm:gap-4 shadow-3xs transition"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-[8vw] h-[8vw] max-w-[40px] max-h-[40px] min-w-[32px] min-h-[32px] rounded-xl flex items-center justify-center shrink-0 border text-[clamp(10px,2.8vw,12px)] font-extrabold ${skill.bg}`}>
                            {skill.logo}
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="text-[clamp(10px,3vw,13px)] font-bold text-[#1E2229] leading-tight">{skill.name}</h4>
                            <p className="text-[clamp(8px,2.5vw,10px)] text-slate-400 font-semibold leading-none">{skill.questions}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-50 pt-2">
                          <span className="rounded-lg bg-gray-50 text-[clamp(7.5px,2.2vw,9px)] font-bold px-1.5 py-0.5 text-slate-500">{skill.level}</span>
                          <button 
                            onClick={() => handleStartTestFlow(skill.name)}
                            className="text-[clamp(8px,2.3vw,10px)] font-bold bg-[#2D24D0]/10 hover:bg-[#2D24D0] text-[#2D24D0] hover:text-white px-2 py-1 rounded-lg transition cursor-pointer"
                          >
                            Start Test
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Your Recent Assessments (Right Side) */}
                <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-5 rounded-3xl shadow-sm space-y-4 text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <h3 className="text-xs sm:text-sm font-poppins font-bold text-[#1e293b] tracking-wide select-none">Your Recent Assessments</h3>
                    <button className="text-[9px] sm:text-[11px] font-bold text-[#2D24D0] hover:underline flex items-center gap-0.5 cursor-pointer">
                      <span>View All</span>
                      <ArrowRight size={8} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {recentAssessments.map((record) => (
                      <div key={record.id} className="flex items-center justify-between gap-3 border-b border-slate-50 pb-2.5 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2 text-left">
                          <div className="w-[7vw] h-[7vw] max-w-[32px] max-h-[32px] min-w-[24px] min-h-[24px] rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                            <Code2 size={13} className="text-[#2D24D0]" />
                          </div>
                          <div>
                            <h4 className="text-[clamp(10px,3.2vw,12px)] font-bold text-[#1E2229] leading-tight">{record.name}</h4>
                            <p className="text-[clamp(8px,2.5vw,9px)] text-slate-400 font-semibold leading-none pt-0.5">
                              {record.level} • {record.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <div className="flex flex-col items-end text-right">
                            <span className="text-[clamp(10px,3.2vw,12px)] font-bold text-[#1E2229] leading-none">{record.score}/100</span>
                            <span className={`text-[clamp(7.5px,2.2vw,9px)] font-bold pt-0.5 ${
                              record.status === "Excellent" ? "text-emerald-500" :
                              record.status === "Good" ? "text-blue-500" : "text-amber-500"
                            }`}>{record.status}</span>
                          </div>
                          <ChevronDown size={12} className="text-slate-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </section>

              {/* Why Take a Skill Assessment? */}
              <section className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-xs space-y-4 sm:space-y-6 text-left">
                <h3 className="text-xs sm:text-sm font-poppins font-bold text-[#1e293b] select-none uppercase tracking-wide">
                  Why Take a Skill Assessment?
                </h3>

                <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
                  {[
                    { title: "Find Your Strengths", desc: "Identify your strong areas and build confidence." },
                    { title: "Improve Weak Areas", desc: "Get personalized suggestions to improve your skills." },
                    { title: "Boost Career Opportunities", desc: "Showcase your skills to employers and get noticed." },
                    { title: "Track Your Progress", desc: "Monitor your improvement over time with reports." }
                  ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-left">
                      <div className="p-[1.5vw] sm:p-2 bg-blue-50 text-[#2D24D0] rounded-xl shrink-0 border border-blue-100">
                        <CheckSquare size={13} className="stroke-[1.5]" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-[clamp(10px,3.2vw,12px)] font-bold text-[#334155] leading-tight">{feat.title}</h4>
                        <p className="text-[clamp(8px,2.5vw,10px)] text-[#5e637d] font-semibold leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Bottom CTA Card */}
              <section className="bg-[#E2E4F8] rounded-3xl p-5 sm:p-6 text-[#1E2229] flex flex-col md:flex-row items-center justify-between gap-5 shadow-3xs relative overflow-hidden select-none">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2.5 bg-white text-[#2D24D0] rounded-2xl shadow-3xs shrink-0 hidden sm:flex">
                    <BrainCircuit size={24} className="stroke-[1.5]" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="text-sm sm:text-lg font-poppins font-bold text-[#1E2229]">Unlock Your Full Potential</h3>
                    <p className="text-[#5E637D] text-[10px] sm:text-xs font-poppins font-semibold max-w-xl leading-normal">
                      Take a skill assessment today and take the first step towards a better career tomorrow.
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    window.scrollTo({ top: 120, behavior: "smooth" });
                  }}
                  className="rounded-xl bg-[#2D24D0] hover:bg-[#1e1c75] text-white px-5 py-3 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shrink-0 w-full md:w-auto cursor-pointer"
                >
                  <span>Start Your Assessment Now</span>
                  <ArrowRight size={12} />
                </button>
              </section>

            </main>
          </div>
        )}

        {/* -------------------- STEP 2: INSTRUCTIONS VIEW (Image 4) -------------------- */}
        {currentStep === "instructions" && (
          <main className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8 space-y-5 sm:space-y-6 text-left">
            
            {/* Header / Nav Breadcrumb */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
              <div className="space-y-1">
                <button 
                  onClick={() => setCurrentStep("dashboard")}
                  className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#2D24D0] hover:underline cursor-pointer"
                >
                  <ArrowLeft size={12} />
                  <span>Back to Skill Assessment</span>
                </button>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-lg sm:text-2xl font-bold text-gray-950 tracking-tight font-poppins">
                    {selectedSkill} Assessment
                  </h1>
                  <span className="px-2 py-0.5 rounded-lg bg-blue-50 border border-blue-200 text-[9px] sm:text-[10px] font-bold text-[#2D24D0]">
                    {selectedLevel}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-400 font-semibold font-poppins">
                  Test your {selectedSkill} skills and knowledge
                </p>
              </div>

              {/* Duration info */}
              <div className="bg-[#eef1ff] border border-blue-100 rounded-2xl p-2.5 sm:p-3.5 flex items-center gap-2.5 shrink-0 self-start sm:self-center">
                <Clock size={16} className="text-[#2D24D0]" />
                <div className="text-left leading-tight">
                  <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase block">Duration</span>
                  <b className="text-[10px] sm:text-xs font-bold text-[#2D24D0]">30 - 45 Minutes</b>
                </div>
              </div>
            </div>

            {/* Step Progress Tracker */}
            <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-sm">
              <div className="flex items-center justify-between max-w-xl mx-auto relative select-none">
                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-100 -translate-y-1/2 z-0" />
                <div className="absolute top-1/2 left-0 w-1/3 h-[2px] bg-[#2D24D0] -translate-y-1/2 z-0" />

                {[
                  { key: 1, label: "Instructions", active: true, done: false },
                  { key: 2, label: "Assessment", active: false, done: false },
                  { key: 3, label: "Review", active: false, done: false },
                  { key: 4, label: "Results", active: false, done: false }
                ].map((step) => (
                  <div key={step.key} className="flex flex-col items-center gap-1 z-10">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border transition ${
                      step.key === 1 ? "bg-[#2D24D0] border-[#2D24D0] text-white" :
                      "bg-white border-slate-200 text-slate-400"
                    }`}>
                      {step.key}
                    </div>
                    <span className={`text-[9px] sm:text-[10px] font-bold ${step.key === 1 ? "text-[#2D24D0]" : "text-slate-400"}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Split layout: instructions details (left) & summary parameters (right) */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-[1.8fr_1fr] items-start">
              
              {/* Instructions Panel */}
              <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-sm space-y-4 sm:space-y-6">
                <div className="space-y-0.5">
                  <h3 className="text-sm sm:text-base font-bold text-[#1e293b]">Before You Start</h3>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-medium">Please read the instructions carefully before beginning the assessment.</p>
                </div>

                <div className="space-y-3.5">
                  {[
                    { icon: Clock, bg: "bg-blue-50 text-blue-500", title: "Time Duration", desc: "The assessment has a time limit of 30-45 minutes. Make sure you have enough time to complete it." },
                    { icon: HelpCircle, bg: "bg-amber-50 text-amber-500", title: "Questions", desc: "The assessment contains 10-15 questions covering Javascript concepts, problem solving, and best practices." },
                    { icon: Award, bg: "bg-emerald-50 text-emerald-500", title: "Passing Score", desc: "You need to score 60% or higher to pass this assessment." },
                    { icon: Lock, bg: "bg-purple-50 text-purple-500", title: "No Pause", desc: "The timer will start immediately and cannot be paused. Make sure you are ready to begin." },
                    { icon: Signal, bg: "bg-cyan-50 text-cyan-500", title: "Stable Connection", desc: "Ensure you have a stable internet connection throughout the assessment." },
                    { icon: Code2, bg: "bg-rose-50 text-rose-500", title: "Code Editor", desc: "For coding questions, use the built-in code editor. Your code will be automatically saved." }
                  ].map((item, index) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={index} className="flex gap-3 items-start border-b border-slate-50 pb-2.5 last:border-0 last:pb-0 text-left">
                        <div className={`p-[2vw] sm:p-2.5 rounded-xl ${item.bg} shrink-0`}>
                          <ItemIcon size={15} className="stroke-[1.5]" />
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-[clamp(10px,3.2vw,12px)] font-bold text-[#334155]">{item.title}</h4>
                          <p className="text-[clamp(8.5px,2.6vw,10px)] text-slate-400 font-semibold leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Integrity box */}
                  <div className="bg-[#2D24D0]/5 border border-[#2D24D0]/10 rounded-2xl p-3 sm:p-4.5 flex gap-2.5 text-left">
                    <Monitor size={15} className="text-[#2D24D0] shrink-0" />
                    <div className="space-y-0.5">
                      <h4 className="text-[11px] sm:text-xs font-bold text-[#2D24D0]">Assessment Integrity</h4>
                      <p className="text-[9px] text-[#2D24D0]/80 font-bold leading-normal">
                        This assessment is monitored to ensure fairness and integrity. Please do not switch tabs or use any external help.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Back and Submit buttons */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <button 
                    onClick={() => setCurrentStep("dashboard")}
                    className="border border-[#cbd5e1] hover:bg-slate-50 text-[#5e637d] font-bold text-[10px] sm:text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleBeginAssessment}
                    className="bg-[#2D24D0] hover:bg-[#1f1a8c] text-white font-bold text-[10px] sm:text-xs px-5 py-3 rounded-xl transition flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                  >
                    <span>Start Assessment</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Right column details */}
              <div className="space-y-5 sm:space-y-6">
                
                {/* Summary Parameters Box */}
                <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-5 rounded-3xl shadow-sm text-left space-y-3.5">
                  <h3 className="text-[10px] sm:text-xs font-bold text-[#1e293b] uppercase tracking-wider select-none">Assessment Summary</h3>
                  
                  {/* Skill Badge */}
                  <div className="flex items-center gap-2.5 bg-slate-50/50 p-2 sm:p-2.5 rounded-2xl border border-slate-100">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center font-extrabold text-[10px] sm:text-xs border border-amber-200">
                      JS
                    </div>
                    <div>
                      <h4 className="text-[11px] sm:text-xs font-bold text-[#1E2229] leading-tight">{selectedSkill}</h4>
                      <span className="text-[9px] font-bold text-slate-400">{selectedCategory}</span>
                    </div>
                  </div>

                  {/* Summary list values */}
                  <div className="space-y-2 text-[clamp(8.5px,2.6vw,10px)] font-semibold text-slate-400">
                    {[
                      { label: "Duration", value: "30-45 Minutes" },
                      { label: "Questions", value: "Full Time / 12 Questions" },
                      { label: "Experience Level", value: selectedLevel },
                      { label: "Passing Score", value: "60%" },
                      { label: "Skills Tested", value: "Javascript ES6+, DOM, Async, Problem Solving" }
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between items-center gap-3">
                        <span className="select-none">{row.label}</span>
                        <b className="text-slate-700 text-right">{row.value}</b>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills will be Tested tag lists */}
                <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-5 rounded-3xl shadow-sm text-left space-y-3">
                  <h3 className="text-[10px] sm:text-xs font-bold text-[#1e293b] uppercase tracking-wider select-none">Skills you will be Tested On</h3>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Variables & Data Types",
                      "Functions",
                      "ES6+ Features",
                      "DOM Manipulation",
                      "Async Javascript",
                      "Array & Objects",
                      "Problem Solving",
                      "Best Practices"
                    ].map((tag) => (
                      <span key={tag} className="text-[9px] font-bold text-[#2D24D0] bg-[#2D24D0]/5 border border-blue-100 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Success Tips */}
                <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-5 rounded-3xl shadow-sm text-left space-y-3.5">
                  <h3 className="text-[10px] sm:text-xs font-bold text-[#1e293b] uppercase tracking-wider select-none">Tips for Success</h3>
                  
                  <div className="space-y-3">
                    {[
                      { icon: HelpCircle, bg: "bg-blue-50 text-[#2D24D0]", title: "Read Carefully", desc: "Read each question carefully and understand what is being asked." },
                      { icon: Clock, bg: "bg-purple-50 text-purple-600", title: "Manage Your Time", desc: "Keep an eye on the timer and manage your time effectively." },
                      { icon: Code2, bg: "bg-blue-50 text-[#2D24D0]", title: "Test your Code", desc: "For coding questions, test your code with different inputs." },
                      { icon: Sparkles, bg: "bg-cyan-50 text-cyan-600", title: "Stay Focused", desc: "Minimize distractions and focus on one question at a time." }
                    ].map((tip, i) => {
                      const TipIcon = tip.icon;
                      return (
                        <div key={i} className="flex gap-2 text-left">
                          <div className="p-1.5 rounded-xl bg-blue-50 text-[#2D24D0] shrink-0">
                            <TipIcon size={12} className="stroke-[1.5]" />
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="text-[clamp(9.5px,2.8vw,11px)] font-bold text-slate-700">{tip.title}</h4>
                            <p className="text-[clamp(8.5px,2.6vw,10px)] text-slate-400 font-semibold leading-snug">{tip.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

            {/* Lock Secure Message */}
            <div className="flex items-center justify-center gap-1 text-[9px] font-bold text-slate-400 pt-3 select-none">
              <Lock size={10} />
              <span>Your assessment data is secure and confidential.</span>
            </div>

          </main>
        )}

        {/* -------------------- STEP 3: MOCK TEST INTERFACE (Image 2) -------------------- */}
        {currentStep === "assessment" && (
          <main className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8 space-y-5 text-left">
            
            {/* Header info bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div className="space-y-1.5">
                <button 
                  onClick={() => setCurrentStep("dashboard")}
                  className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#2D24D0] hover:underline cursor-pointer"
                >
                  <ArrowLeft size={12} />
                  <span>Back to Skill Assessment</span>
                </button>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-gray-950 font-poppins">{selectedSkill} Assessment</h1>
                  <span className="px-2 py-0.5 rounded-lg bg-blue-50 border border-blue-200 text-[9px] sm:text-[10px] font-bold text-[#2D24D0]">{selectedLevel}</span>
                </div>
                <p className="text-xs text-slate-400 font-semibold font-poppins">Test your {selectedSkill} skills and knowledge</p>
              </div>

              {/* Metric parameter blocks (Duration, Questions, Passing Score) */}
              <div className="flex items-center gap-3 select-none">
                <div className="bg-[#eef1ff] border border-blue-100 rounded-2xl p-2.5 flex items-center gap-2">
                  <Clock size={16} className="text-[#2D24D0]" />
                  <div className="text-left leading-none">
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Duration</span>
                    <b className="text-[10px] font-bold text-[#2D24D0] block pt-0.5">30 - 45 Minutes</b>
                  </div>
                </div>
                <div className="bg-[#eef1ff] border border-blue-100 rounded-2xl p-2.5 flex items-center gap-2">
                  <ListTodo size={16} className="text-[#2D24D0]" />
                  <div className="text-left leading-none">
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Questions</span>
                    <b className="text-[10px] font-bold text-[#2D24D0] block pt-0.5">10-15</b>
                  </div>
                </div>
                <div className="bg-[#eef1ff] border border-blue-100 rounded-2xl p-2.5 flex items-center gap-2">
                  <Award size={16} className="text-[#2D24D0]" />
                  <div className="text-left leading-none">
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Passing Score</span>
                    <b className="text-[10px] font-bold text-[#2D24D0] block pt-0.5">60%</b>
                  </div>
                </div>
              </div>
            </div>

            {/* Stepper Progress bar tracker */}
            <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-sm">
              <div className="flex items-center justify-between max-w-xl mx-auto relative select-none">
                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-100 -translate-y-1/2 z-0" />
                <div className="absolute top-1/2 left-0 w-1/3 h-[2px] bg-[#2D24D0] -translate-y-1/2 z-0" />

                {[
                  { key: 1, label: "Instructions", active: false, done: true },
                  { key: 2, label: "Assessment", active: true, done: false },
                  { key: 3, label: "Review", active: false, done: false },
                  { key: 4, label: "Results", active: false, done: false }
                ].map((step) => (
                  <div key={step.key} className="flex flex-col items-center gap-1 z-10">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border transition ${
                      step.key === 2 ? "bg-[#2D24D0] border-[#2D24D0] text-white" :
                      step.key === 1 ? "bg-[#2D24D0] border-[#2D24D0] text-white" :
                      "bg-white border-slate-200 text-slate-400"
                    }`}>
                      {step.key}
                    </div>
                    <span className={`text-[9px] sm:text-[10px] font-bold ${step.key <= 2 ? "text-[#2D24D0]" : "text-slate-400"}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Test Split layout */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-[1.8fr_1fr] items-start">
              
              {/* Left Column: Questions Card */}
              <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-sm space-y-6">
                
                {/* Header row */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-800">
                      Question {currentQuestionIndex + 1} of {mockQuestions.length}
                    </span>
                    <span className="text-[10px] text-slate-450 block font-semibold leading-none">
                      Category: {mockQuestions[currentQuestionIndex].category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 select-none text-[10px] font-bold text-slate-400">
                    <span>1 Mark</span>
                    <button 
                      onClick={handleToggleReview}
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${
                        markedForReview[mockQuestions[currentQuestionIndex].id] ? "bg-amber-500 border-amber-500 text-white" : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <Bookmark size={14} />
                    </button>
                  </div>
                </div>

                {/* Question Prompt */}
                <h3 className="text-sm font-bold text-slate-900 leading-normal">
                  {mockQuestions[currentQuestionIndex].question}
                </h3>

                {/* Radio options loops */}
                <div className="space-y-3.5">
                  {mockQuestions[currentQuestionIndex].options.map((option) => {
                    const isSelected = answers[mockQuestions[currentQuestionIndex].id] === option.key;
                    return (
                      <div 
                        key={option.key}
                        onClick={() => handleOptionSelect(option.key)}
                        className={`border rounded-xl p-3 flex items-center justify-between cursor-pointer transition select-none ${
                          isSelected ? "border-[#2D24D0] bg-[#2D24D0]/5 text-[#2D24D0]" : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center border transition ${
                            isSelected ? "bg-[#2D24D0] border-[#2D24D0] text-white" : "bg-white border-slate-200 text-slate-400"
                          }`}>
                            {option.key}
                          </span>
                          <span className="text-xs font-semibold text-slate-700">{option.text}</span>
                        </div>
                        {isSelected && <CheckCircle2 size={15} className="text-[#2D24D0]" />}
                      </div>
                    );
                  })}
                </div>

                {/* Dynamic Explanation card (Always shown when selected inside this mockup) */}
                {answers[mockQuestions[currentQuestionIndex].id] && (
                  <div className="bg-[#2D24D0]/5 border border-[#2D24D0]/10 rounded-2xl p-4 flex gap-3 text-left">
                    <Sparkles size={16} className="text-[#2D24D0] shrink-0 pt-0.5" />
                    <div className="space-y-1">
                      <h4 className="text-[10px] font-bold text-[#2D24D0] uppercase tracking-wide">Explanation</h4>
                      <p className="text-[9px] text-[#2D24D0]/90 font-bold leading-normal font-mono">
                        {mockQuestions[currentQuestionIndex].explanation}
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer Back/Next controls */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <button 
                    onClick={() => {
                      if (currentQuestionIndex > 0) {
                        setCurrentQuestionIndex(currentQuestionIndex - 1);
                      }
                    }}
                    disabled={currentQuestionIndex === 0}
                    className="border border-[#cbd5e1] hover:bg-slate-50 text-[#5e637d] font-bold text-[10px] sm:text-xs px-4 py-2 rounded-xl disabled:opacity-40 transition cursor-pointer"
                  >
                    ← Previous
                  </button>

                  <button 
                    onClick={() => {
                      if (currentQuestionIndex < mockQuestions.length - 1) {
                        setCurrentQuestionIndex(currentQuestionIndex + 1);
                      } else {
                        // Submit test to review step
                        setCurrentStep("review");
                      }
                    }}
                    className="bg-[#2D24D0] hover:bg-[#1f1a8c] text-white font-bold text-[10px] sm:text-xs px-5 py-2.5 rounded-xl transition flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                  >
                    <span>{currentQuestionIndex < mockQuestions.length - 1 ? "Next Question →" : "Submit & Review Answers →"}</span>
                  </button>
                </div>

              </div>

              {/* Right Column: Time Progress & Grid navigations */}
              <div className="space-y-5">
                
                {/* Assessment Progress */}
                <div className="bg-white border border-[#cbd5e1]/45 p-4 rounded-3xl shadow-sm space-y-3.5 text-left">
                  <h3 className="text-[10px] sm:text-xs font-bold text-[#1e293b] uppercase tracking-wider select-none">Assessment Progress</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold font-mono">
                      <span className="text-slate-400 select-none">Time Left</span>
                      <span className="text-[#2D24D0]">{formatTime(timeLeft)}</span>
                    </div>

                    {/* Progress slider bar */}
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#2D24D0]" style={{ width: `${(countAnswered() / mockQuestions.length) * 100}%` }} />
                    </div>

                    <div className="text-[9px] text-slate-400 font-bold select-none text-right">
                      {countAnswered()}/{mockQuestions.length} Questions Answered
                    </div>
                  </div>
                </div>

                {/* Questions Navigation grid */}
                <div className="bg-white border border-[#cbd5e1]/45 p-4 rounded-3xl shadow-sm space-y-4 text-left">
                  <h3 className="text-[10px] sm:text-xs font-bold text-[#1e293b] uppercase tracking-wider select-none">Questions</h3>
                  
                  {/* Grid Buttons */}
                  <div className="grid gap-2 grid-cols-4">
                    {mockQuestions.map((q, idx) => {
                      const hasAns = !!answers[q.id];
                      const isMarked = !!markedForReview[q.id];
                      const isCurrent = currentQuestionIndex === idx;

                      let btnStyle = "border-slate-200 text-slate-600 bg-white hover:bg-slate-50";
                      if (isCurrent) {
                        btnStyle = "border-[#2D24D0] bg-[#2D24D0] text-white";
                      } else if (isMarked) {
                        btnStyle = "border-amber-500 bg-amber-500 text-white";
                      } else if (hasAns) {
                        btnStyle = "border-emerald-500 bg-emerald-500 text-white";
                      }

                      return (
                        <button 
                          key={q.id}
                          onClick={() => setCurrentQuestionIndex(idx)}
                          className={`w-10 h-10 rounded-xl border font-bold text-xs transition flex items-center justify-center cursor-pointer ${btnStyle}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Clear answer button */}
                  <div className="border-t border-slate-100 pt-3 select-none">
                    <button 
                      onClick={handleClearAnswer}
                      className="w-full border border-red-200 bg-red-50/50 hover:bg-red-50 text-red-500 font-bold text-[10px] py-2 rounded-xl flex items-center justify-center gap-1 transition cursor-pointer"
                    >
                      <Trash2 size={13} />
                      <span>Clear Answer</span>
                    </button>
                  </div>

                  {/* Legend guide */}
                  <div className="border-t border-slate-100 pt-3 flex flex-wrap gap-2 text-[8px] font-bold text-slate-400 select-none">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Answered
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2D24D0]" /> Current
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Review
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-200" /> Unanswered
                    </span>
                  </div>
                </div>

                {/* Tips Box */}
                <div className="bg-white border border-[#cbd5e1]/45 p-4 rounded-3xl shadow-sm text-left space-y-3 select-none">
                  <h3 className="text-[10px] sm:text-xs font-bold text-[#1e293b] uppercase tracking-wider">Tips</h3>
                  
                  <div className="space-y-2 text-[clamp(8px,2.5vw,10px)] font-semibold text-slate-400">
                    {[
                      "Read each question carefully.",
                      "Manage your time effectively.",
                      "You can review and change answers before submitting.",
                      "Ensure a stable internet connection."
                    ].map((row, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D24D0] mt-1 shrink-0" />
                        <span>{row}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Lock Secure Message */}
            <div className="flex items-center justify-center gap-1 text-[9px] font-bold text-slate-400 pt-3 select-none">
              <Lock size={10} />
              <span>Your assessment data is secure and confidential.</span>
            </div>

          </main>
        )}

        {/* -------------------- STEP 4: REVIEW VIEW (Image 3) -------------------- */}
        {currentStep === "review" && (
          <main className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8 space-y-5 text-left">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 select-none">
              <div className="space-y-1.5">
                <button 
                  onClick={() => setCurrentStep("assessment")}
                  className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#2D24D0] hover:underline cursor-pointer"
                >
                  <ArrowLeft size={12} />
                  <span>Back to Assessment Questions</span>
                </button>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-gray-950 font-poppins">{selectedSkill} Assessment</h1>
                  <span className="px-2 py-0.5 rounded-lg bg-blue-50 border border-blue-200 text-[9px] sm:text-[10px] font-bold text-[#2D24D0]">{selectedLevel}</span>
                </div>
                <p className="text-xs text-slate-400 font-semibold font-poppins">Review your answers before submitting</p>
              </div>

              {/* Parameter blocks */}
              <div className="flex items-center gap-3">
                <div className="bg-[#eef1ff] border border-blue-100 rounded-2xl p-2.5 flex items-center gap-2">
                  <Clock size={16} className="text-[#2D24D0]" />
                  <div className="text-left leading-none">
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Duration</span>
                    <b className="text-[10px] font-bold text-[#2D24D0] block pt-0.5">30 - 45 Minutes</b>
                  </div>
                </div>
                <div className="bg-[#eef1ff] border border-blue-100 rounded-2xl p-2.5 flex items-center gap-2">
                  <ListTodo size={16} className="text-[#2D24D0]" />
                  <div className="text-left leading-none">
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Questions</span>
                    <b className="text-[10px] font-bold text-[#2D24D0] block pt-0.5">12</b>
                  </div>
                </div>
                <div className="bg-[#eef1ff] border border-blue-100 rounded-2xl p-2.5 flex items-center gap-2">
                  <Award size={16} className="text-[#2D24D0]" />
                  <div className="text-left leading-none">
                    <span className="text-[8px] font-bold text-slate-400 uppercase">Passing Score</span>
                    <b className="text-[10px] font-bold text-[#2D24D0] block pt-0.5">60%</b>
                  </div>
                </div>
              </div>
            </div>

            {/* Stepper Progress bar tracker */}
            <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-sm">
              <div className="flex items-center justify-between max-w-xl mx-auto relative select-none">
                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-100 -translate-y-1/2 z-0" />
                <div className="absolute top-1/2 left-0 w-2/3 h-[2px] bg-[#2D24D0] -translate-y-1/2 z-0" />

                {[
                  { key: 1, label: "Instructions", active: false, done: true },
                  { key: 2, label: "Assessment", active: false, done: true },
                  { key: 3, label: "Review", active: true, done: false },
                  { key: 4, label: "Results", active: false, done: false }
                ].map((step) => (
                  <div key={step.key} className="flex flex-col items-center gap-1 z-10">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border transition ${
                      step.key === 3 ? "bg-[#2D24D0] border-[#2D24D0] text-white" :
                      step.key < 3 ? "bg-[#2D24D0] border-[#2D24D0] text-white" :
                      "bg-white border-slate-200 text-slate-400"
                    }`}>
                      {step.key}
                    </div>
                    <span className={`text-[9px] sm:text-[10px] font-bold ${step.key <= 3 ? "text-[#2D24D0]" : "text-slate-400"}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Split Screen layout */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-[1.8fr_1fr] items-start">
              
              {/* Left Column: Review Your Answers list */}
              <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-sm space-y-6">
                
                {/* Section Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                  <div className="space-y-0.5">
                    <h3 className="text-sm sm:text-base font-bold text-slate-800">Review Your Answers</h3>
                    <p className="text-[10px] text-slate-400 font-semibold select-none">Please review all your answers before final submission.</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#2D24D0] bg-[#2D24D0]/5 border border-blue-100 px-3 py-1 rounded-full select-none">
                    {countAnswered()} of {mockQuestions.length} answered
                  </span>
                </div>

                {/* Answers Items Loop with paginations */}
                <div className="space-y-4">
                  {mockQuestions
                    .slice((reviewPage - 1) * itemsPerReviewPage, reviewPage * itemsPerReviewPage)
                    .map((q, idx) => {
                      const localIdx = (reviewPage - 1) * itemsPerReviewPage + idx;
                      const hasAns = answers[q.id];
                      const isMarked = markedForReview[q.id];
                      const optionObject = q.options.find((o) => o.key === hasAns);

                      let badgeText = "Unanswered";
                      let badgeStyle = "bg-slate-100 text-slate-500 border-slate-200";

                      if (isMarked) {
                        badgeText = "Review";
                        badgeStyle = "bg-amber-50 text-amber-500 border-amber-200";
                      } else if (hasAns) {
                        // In review screen, we mock test validations (B is correct for Q1 etc)
                        const isCorrect = hasAns === q.correct;
                        badgeText = isCorrect ? "Correct" : "Incorrect";
                        badgeStyle = isCorrect ? "bg-emerald-50 text-emerald-500 border-emerald-200" : "bg-red-50 text-red-500 border-red-200";
                      }

                      return (
                        <div key={q.id} className="border border-slate-100 rounded-2xl p-4 flex gap-4 text-left items-start">
                          <span className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 select-none ${
                            badgeText === "Correct" ? "bg-emerald-50 text-emerald-500 border border-emerald-100" :
                            badgeText === "Incorrect" ? "bg-red-50 text-red-500 border border-red-100" : "bg-slate-50 text-slate-400 border border-slate-100"
                          }`}>
                            {localIdx + 1}
                          </span>

                          <div className="space-y-3.5 flex-1">
                            <div className="flex justify-between items-start gap-4">
                              <h4 className="text-xs font-bold text-slate-800 leading-snug">{q.question}</h4>
                              <span className={`text-[8px] font-bold px-2 py-0.5 rounded-lg border ${badgeStyle} select-none shrink-0`}>
                                {badgeText}
                              </span>
                            </div>

                            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 text-[9px] font-semibold">
                              <div>
                                <span className="text-slate-450 block select-none">Your Answer:</span>
                                <b className={badgeText === "Correct" ? "text-emerald-500" : "text-red-500"}>
                                  {hasAns ? `${hasAns}. ${optionObject?.text || ""}` : "Not Answered"}
                                </b>
                              </div>
                              <div>
                                <span className="text-slate-450 block select-none">Correct Answer:</span>
                                <b className="text-emerald-500">
                                  {q.correct}. {q.options.find((o) => o.key === q.correct)?.text}
                                </b>
                              </div>
                            </div>

                            {/* Chevron collapse trigger */}
                            <div className="border-t border-slate-50 pt-2.5">
                              <details className="outline-hidden select-none">
                                <summary className="text-[9px] font-bold text-[#2D24D0] hover:underline cursor-pointer list-none flex items-center gap-0.5">
                                  <span>View Explanation</span>
                                  <ChevronDown size={12} />
                                </summary>
                                <p className="text-[9px] text-slate-450 leading-relaxed pt-1.5 font-mono">
                                  {q.explanation}
                                </p>
                              </details>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Paginations Controls & Submit button */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-5">
                  <button 
                    onClick={() => setCurrentStep("assessment")}
                    className="border border-[#cbd5e1] hover:bg-slate-50 text-[#5e637d] font-bold text-[10px] sm:text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
                  >
                    ← Previous Page
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1.5 select-none">
                    <span className="text-[10px] text-slate-400 font-semibold pr-2">Showing 1 to 5 of 12</span>
                    {[1, 2, 3].map((pNum) => (
                      <button 
                        key={pNum}
                        onClick={() => setReviewPage(pNum)}
                        className={`w-7 h-7 rounded-lg border font-bold text-[10px] transition ${
                          reviewPage === pNum ? "border-[#2D24D0] bg-[#2D24D0]/5 text-[#2D24D0]" : "border-slate-100 text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        {pNum}
                      </button>
                    ))}
                    <button 
                      onClick={() => reviewPage < 3 && setReviewPage(reviewPage + 1)}
                      className="w-7 h-7 rounded-lg border border-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-50"
                    >
                      →
                    </button>
                  </div>

                  <button 
                    onClick={handleFinishTest}
                    className="bg-[#2D24D0] hover:bg-[#1f1a8c] text-white font-bold text-[10px] sm:text-xs px-6 py-3 rounded-xl transition flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                  >
                    <span>Submit Assessment</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                {/* Submit disclaimer prompt */}
                <div className="bg-[#2D24D0]/5 border border-[#2D24D0]/10 rounded-2xl p-4 flex gap-3 text-left">
                  <Sparkles size={16} className="text-[#2D24D0] shrink-0 pt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="text-[10px] font-bold text-[#2D24D0] uppercase tracking-wide">Ready to Submit?</h4>
                    <p className="text-[9px] text-[#2D24D0]/90 font-bold leading-normal">
                      Make sure you have reviewed all your answers. Once submitted, you cannot make any changes.
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Column: Summaries & Overview Grid */}
              <div className="space-y-5">
                
                {/* Assessment Summary Panel */}
                <div className="bg-white border border-[#cbd5e1]/45 p-4 rounded-3xl shadow-sm space-y-4 text-left">
                  <h3 className="text-[10px] sm:text-xs font-bold text-[#1e293b] uppercase tracking-wider select-none font-poppins">Assessment Summary</h3>
                  
                  <div className="space-y-2.5 text-[clamp(9.5px,2.6vw,11px)] font-semibold text-slate-400">
                    {[
                      { label: "Total Questions", value: mockQuestions.length, style: "text-slate-800" },
                      { label: "Answered", value: countAnswered(), style: "text-blue-600" },
                      { label: "Correct Answers", value: 10, style: "text-emerald-500" }, // Mock target
                      { label: "Incorrect Answers", value: 2, style: "text-red-500" }, // Mock target
                      { label: "Unanswered", value: mockQuestions.length - countAnswered(), style: "text-slate-450" }
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between items-center gap-3">
                        <span className="select-none">{row.label}</span>
                        <b className={row.style}>{row.value}</b>
                      </div>
                    ))}
                  </div>

                  {/* Current Score predicted info */}
                  <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-400 select-none">Your Score (Current)</span>
                    <span className="text-[#2D24D0] font-mono text-base">80%</span>
                  </div>
                </div>

                {/* Question Overview navigation grid (with correct/incorrect marks) */}
                <div className="bg-white border border-[#cbd5e1]/45 p-4 rounded-3xl shadow-sm space-y-4 text-left">
                  <h3 className="text-[10px] sm:text-xs font-bold text-[#1e293b] uppercase tracking-wider select-none font-poppins">Question Overview</h3>
                  
                  {/* Color Grid list */}
                  <div className="grid gap-2 grid-cols-4">
                    {mockQuestions.map((q, idx) => {
                      const hasAns = answers[q.id];
                      const isMarked = markedForReview[q.id];

                      let styleClass = "border-slate-100 text-slate-450 bg-slate-50";

                      if (isMarked) {
                        styleClass = "border-amber-500 bg-amber-500 text-white";
                      } else if (hasAns) {
                        const isCorrect = hasAns === q.correct;
                        styleClass = isCorrect ? "border-emerald-500 bg-emerald-500 text-white" : "border-red-500 bg-red-500 text-white";
                      }

                      return (
                        <button 
                          key={q.id}
                          onClick={() => {
                            setReviewPage(Math.floor(idx / itemsPerReviewPage) + 1);
                          }}
                          className={`w-10 h-10 rounded-xl border font-bold text-xs flex items-center justify-center transition cursor-pointer ${styleClass}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend guide */}
                  <div className="border-t border-slate-100 pt-3 flex flex-wrap gap-2 text-[8px] font-bold text-slate-400 select-none">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Correct
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Incorrect
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Review
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-200" /> Unanswered
                    </span>
                  </div>
                </div>

                {/* Success Tips Before submission */}
                <div className="bg-white border border-[#cbd5e1]/45 p-4 rounded-3xl shadow-sm text-left space-y-3.5 select-none">
                  <h3 className="text-[10px] sm:text-xs font-bold text-[#1e293b] uppercase tracking-wider">Tips Before Submission</h3>
                  
                  <div className="space-y-2 text-[clamp(8px,2.5vw,10px)] font-semibold text-slate-450">
                    {[
                      "Read each question carefully.",
                      "Ensure all questions are answered.",
                      "You cannot change answers after submission.",
                      "Click on Submit Assessment when you are ready."
                    ].map((row, i) => (
                      <div key={i} className="flex gap-2 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D24D0] mt-1 shrink-0" />
                        <span>{row}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Lock secure footnote */}
            <div className="flex items-center justify-center gap-1 text-[9px] font-bold text-slate-400 pt-3 select-none">
              <Lock size={10} />
              <span>Your assessment data is secure and confidential.</span>
            </div>

          </main>
        )}

        {/* -------------------- STEP 5: RESULTS VIEW (Image 1) -------------------- */}
        {currentStep === "results" && (
          <main className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8 space-y-5 text-left">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 select-none">
              <div className="space-y-1.5">
                <button 
                  onClick={() => setCurrentStep("dashboard")}
                  className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#2D24D0] hover:underline cursor-pointer"
                >
                  <ArrowLeft size={12} />
                  <span>Back to Skill Assessment Dashboard</span>
                </button>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-gray-950 font-poppins">{selectedSkill} Assessment</h1>
                  <span className="px-2 py-0.5 rounded-lg bg-blue-50 border border-blue-200 text-[9px] sm:text-[10px] font-bold text-[#2D24D0]">{selectedLevel}</span>
                </div>
                <p className="text-xs text-slate-400 font-semibold font-poppins">Test your JavaScript skills and knowledge</p>
              </div>
            </div>

            {/* Stepper Progress bar tracker */}
            <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-sm">
              <div className="flex items-center justify-between max-w-xl mx-auto relative select-none">
                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-100 -translate-y-1/2 z-0" />
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#2D24D0] -translate-y-1/2 z-0" />

                {[
                  { key: 1, label: "Instructions", active: false, done: true },
                  { key: 2, label: "Assessment", active: false, done: true },
                  { key: 3, label: "Review", active: false, done: true },
                  { key: 4, label: "Results", active: true, done: false }
                ].map((step) => (
                  <div key={step.key} className="flex flex-col items-center gap-1 z-10">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border transition ${
                      step.key === 4 ? "bg-[#2D24D0] border-[#2D24D0] text-white" :
                      "bg-[#2D24D0] border-[#2D24D0] text-white"
                    }`}>
                      {step.key}
                    </div>
                    <span className={`text-[9px] sm:text-[10px] font-bold text-[#2D24D0]`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Layout Split grids */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-[1.8fr_1fr] items-start">
              
              {/* Left Column: Assessment Completed summary details */}
              <div className="bg-white border border-[#cbd5e1]/45 p-5 sm:p-7 rounded-3xl shadow-sm text-center space-y-6">
                
                {/* SVG Clipboard Folder Illustration */}
                <div className="flex justify-center relative select-none">
                  <div className="w-28 h-28 relative flex items-center justify-center">
                    {/* SVG Clipboard Folder */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500 fill-current">
                      <rect x="25" y="20" width="50" height="65" rx="8" fill="#EEF0FC" stroke="#DCE1F8" strokeWidth="3" />
                      <rect x="38" y="12" width="24" height="12" rx="4" fill="#5B65F2" />
                      <line x1="35" y1="40" x2="60" y2="40" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                      <line x1="35" y1="52" x2="52" y2="52" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                      <line x1="35" y1="64" x2="58" y2="64" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                      
                      {/* Checkmarks */}
                      <path d="M36 38 l3 3 l6 -6" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
                      <path d="M36 50 l3 3 l6 -6" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
                      <path d="M36 62 l3 3 l6 -6" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
                    </svg>

                    {/* Circular Floating Checkmark Badge */}
                    <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-emerald-500 border-4 border-white flex items-center justify-center text-white shadow-md">
                      <Check size={18} className="stroke-[3.5]" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1 select-none">
                  <h2 className="text-base sm:text-xl font-bold text-slate-800">Assessment Completed!</h2>
                  <p className="text-[10px] sm:text-xs text-slate-400 font-semibold leading-relaxed max-w-md mx-auto">
                    Great job! You have successfully completed the {selectedSkill} Assessment. Here is your performance summary.
                  </p>
                </div>

                {/* Score & result box */}
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-3xl p-4 grid grid-cols-2 items-center gap-4 text-left">
                  
                  {/* Radial progress score */}
                  <div className="flex items-center gap-3 border-r border-emerald-100 pr-4 h-16">
                    <div className="relative w-14 h-14 flex items-center justify-center shrink-0 select-none">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="28" cy="28" r="23" strokeWidth="4" stroke="#e2e8f0" fill="transparent" />
                        <circle 
                          cx="28" 
                          cy="28" 
                          r="23" 
                          strokeWidth="4" 
                          stroke="#10b981" 
                          fill="transparent" 
                          strokeDasharray={2 * Math.PI * 23}
                          strokeDashoffset={2 * Math.PI * 23 * (1 - resultsScore / 100)}
                        />
                      </svg>
                      <span className="absolute text-xs font-bold font-mono text-emerald-600">{resultsScore}%</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase select-none block">Your Score</span>
                      <b className="text-sm font-bold text-slate-800">{resultsScore}%</b>
                    </div>
                  </div>

                  {/* Result label */}
                  <div className="pl-2">
                    <span className="text-[8px] font-bold text-slate-400 uppercase select-none block">Result</span>
                    <b className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                      <span>Passed</span>
                      <Star size={14} className="fill-current text-emerald-500" />
                    </b>
                    <p className="text-[8.5px] text-slate-450 font-semibold pt-0.5 leading-none">Well done! You met passing score.</p>
                  </div>

                </div>

                {/* Stats panel cards (Total, Correct, Incorrect, Time Taken) */}
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 select-none">
                  
                  {/* Total */}
                  <div className="border border-slate-100 rounded-2xl p-3.5 flex items-center gap-3 text-left">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 border border-blue-100 shadow-3xs">
                      <HelpCircle size={16} className="stroke-[1.5]" />
                    </div>
                    <div className="leading-none">
                      <span className="text-[8px] font-bold text-slate-400 uppercase">Total Questions</span>
                      <b className="text-xs font-bold text-slate-800 block pt-1">12</b>
                    </div>
                  </div>

                  {/* Correct */}
                  <div className="border border-slate-100 rounded-2xl p-3.5 flex items-center gap-3 text-left">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 border border-emerald-100 shadow-3xs">
                      <CheckCircle2 size={16} className="stroke-[1.5]" />
                    </div>
                    <div className="leading-none">
                      <span className="text-[8px] font-bold text-slate-400 uppercase">Correct</span>
                      <b className="text-xs font-bold text-slate-800 block pt-1">10</b>
                    </div>
                  </div>

                  {/* Incorrect */}
                  <div className="border border-slate-100 rounded-2xl p-3.5 flex items-center gap-3 text-left">
                    <div className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100 shadow-3xs">
                      <Trash2 size={16} className="stroke-[1.5]" />
                    </div>
                    <div className="leading-none">
                      <span className="text-[8px] font-bold text-slate-400 uppercase">Incorrect</span>
                      <b className="text-xs font-bold text-slate-800 block pt-1">2</b>
                    </div>
                  </div>

                  {/* Time Taken */}
                  <div className="border border-slate-100 rounded-2xl p-3.5 flex items-center gap-3 text-left">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100 shadow-3xs">
                      <Clock size={16} className="stroke-[1.5]" />
                    </div>
                    <div className="leading-none">
                      <span className="text-[8px] font-bold text-slate-400 uppercase">Time Taken</span>
                      <b className="text-xs font-bold text-slate-800 block pt-1">28:45 Min</b>
                    </div>
                  </div>

                </div>

                {/* Share achievements row */}
                <div className="border-t border-slate-50 pt-4 flex flex-col items-center gap-3 select-none">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Share your achievement</span>
                  
                  <div className="flex items-center justify-center gap-3">
                    {/* LinkedIn */}
                    <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center hover:bg-[#2D24D0] hover:text-white transition cursor-pointer">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </button>
                    {/* X Twitter */}
                    <button className="w-8 h-8 rounded-full bg-slate-50 text-[#101014] border border-slate-200 flex items-center justify-center hover:bg-black hover:text-white transition cursor-pointer">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </button>
                    {/* Facebook */}
                    <button className="w-8 h-8 rounded-full bg-blue-50 text-blue-800 border border-blue-200 flex items-center justify-center hover:bg-blue-800 hover:text-white transition cursor-pointer">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                      </svg>
                    </button>
                    {/* Link copy */}
                    <button className="w-8 h-8 rounded-full bg-slate-50 text-slate-500 border border-slate-200 flex items-center justify-center hover:bg-slate-500 hover:text-white transition cursor-pointer">
                      <Share2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Footer action buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                  <button className="w-full sm:w-auto border border-[#2D24D0] text-[#2D24D0] hover:bg-blue-50 font-bold text-xs px-6 py-3.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer">
                    <Download size={14} />
                    <span>Download Report</span>
                  </button>
                  <button 
                    onClick={() => setCurrentStep("dashboard")}
                    className="w-full sm:w-auto bg-[#2D24D0] hover:bg-[#1f1a8c] text-white font-bold text-xs px-6 py-3.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>View Solutions</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

              </div>

              {/* Right Column details (Performance score + Section wise progress) */}
              <div className="space-y-5 select-none">
                
                {/* Your Performance score */}
                <div className="bg-white border border-[#cbd5e1]/45 p-5 rounded-3xl shadow-sm text-center space-y-4 text-left">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide select-none">Your Performance</h3>
                  
                  <div className="flex flex-col items-center py-2 space-y-3">
                    {/* Circle chart */}
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="40" cy="40" r="32" strokeWidth="6" stroke="#f1f5f9" fill="transparent" />
                        <circle 
                          cx="40" 
                          cy="40" 
                          r="32" 
                          strokeWidth="6" 
                          stroke="#2D24D0" 
                          fill="transparent" 
                          strokeDasharray={2 * Math.PI * 32}
                          strokeDashoffset={2 * Math.PI * 32 * (1 - resultsScore / 100)}
                        />
                      </svg>
                      <span className="absolute text-sm font-bold font-mono text-slate-800">{resultsScore}%</span>
                    </div>

                    <div className="text-center space-y-0.5">
                      <h4 className="text-xs font-bold text-emerald-500">Excellent Performance</h4>
                      <p className="text-[10px] text-slate-400 font-semibold">You scored {resultsScore} out of 100</p>
                    </div>
                  </div>

                  {/* Green alert panel */}
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 flex gap-2 text-left">
                    <Star size={16} className="text-emerald-500 fill-emerald-500 shrink-0 pt-0.5" />
                    <p className="text-[9.5px] text-emerald-600 font-bold leading-normal">
                      Congratulations! You have successfully passed the assessment.
                    </p>
                  </div>
                </div>

                {/* Section Wise Performance list progress bars */}
                <div className="bg-white border border-[#cbd5e1]/45 p-5 rounded-3xl shadow-sm text-left space-y-4">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide select-none font-poppins">Section Wise Performance</h3>
                  
                  <div className="space-y-4">
                    {[
                      { label: "Variables & Data Types", pct: "85%", stroke: "bg-emerald-500" },
                      { label: "Functions", pct: "90%", stroke: "bg-emerald-500" },
                      { label: "ES6+ Features", pct: "77%", stroke: "bg-emerald-500" },
                      { label: "DOM Manipulation", pct: "65%", stroke: "bg-emerald-500" },
                      { label: "Aysnc JavaScript", pct: "90%", stroke: "bg-emerald-500" },
                      { label: "Problem Solving", pct: "77%", stroke: "bg-emerald-500" }
                    ].map((sec, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-700">
                          <span>{sec.label}</span>
                          <span className="font-mono">{sec.pct}</span>
                        </div>
                        {/* Progress slider bar */}
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${sec.stroke}`} style={{ width: sec.pct }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </main>
        )}

      </div>

      <Footer />
    </div>
  );
}
