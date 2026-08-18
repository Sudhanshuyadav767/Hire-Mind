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
  RefreshCw,
  Terminal,
  ChevronDown
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
  { id: 1, name: "JavaScript", questions: "15 Questions", level: "Intermediate", category: "Programming & Development", logo: "JS", bg: "bg-amber-100 text-amber-600 border-amber-200" },
  { id: 2, name: "Python", questions: "15 Questions", level: "Intermediate", category: "Programming & Development", logo: "PY", bg: "bg-blue-100 text-blue-600 border-blue-200" },
  { id: 3, name: "React", questions: "12 Questions", level: "Advanced", category: "Programming & Development", logo: "RE", bg: "bg-sky-100 text-sky-600 border-sky-200" },
  { id: 4, name: "SQL Database", questions: "10 Questions", level: "Beginner", category: "Programming & Development", logo: "SQL", bg: "bg-emerald-100 text-emerald-600 border-emerald-200" }
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
    question: "What is the output of the following JavaScript code snippet?\n\nconsole.log(typeof NaN);",
    options: [
      { key: "A", text: "\"number\"" },
      { key: "B", text: "\"NaN\"" },
      { key: "C", text: "\"undefined\"" },
      { key: "D", text: "\"object\"" }
    ],
    correct: "A",
    explanation: "Although NaN stands for 'Not-a-Number', its type in JavaScript is actually 'number'."
  },
  {
    id: 2,
    question: "Which keyword is used to declare a variable that has block scope and cannot be reassigned?",
    options: [
      { key: "A", text: "var" },
      { key: "B", text: "let" },
      { key: "C", text: "const" },
      { key: "D", text: "def" }
    ],
    correct: "C",
    explanation: "The 'const' keyword creates a read-only, block-scoped reference to a value that cannot be reassigned."
  },
  {
    id: 3,
    question: "What is the primary difference between double equals (==) and triple equals (===) in JavaScript?",
    options: [
      { key: "A", text: "== compares value and type, === only compares value" },
      { key: "B", text: "== performs type coercion before comparing, === compares value and type strictly" },
      { key: "C", text: "== is used for numbers, === is used for strings" },
      { key: "D", text: "There is no difference in JavaScript" }
    ],
    correct: "B",
    explanation: "Double equals (==) performs type coercion to convert values before comparison, while triple equals (===) requires both values and types to match exactly."
  }
];

export default function SkillAssessmentPage() {
  // Navigation states: 'dashboard', 'instructions', 'test', 'results'
  const [currentStep, setCurrentStep] = useState("dashboard");

  // Selection states
  const [selectedCategory, setSelectedCategory] = useState("Programming & Development");
  const [selectedSkill, setSelectedSkill] = useState("JavaScript");
  const [selectedLevel, setSelectedLevel] = useState("Intermediate");

  // Quiz execution states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOptionKey }
  const [codeContent, setCodeContent] = useState(`function sumArray(arr) {
  // Write your code here to return sum of numbers
  return arr.reduce((acc, curr) => acc + curr, 0);
}`);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [resultsScore, setResultsScore] = useState(87);

  // Sync skill choices when category changes directly via handler
  const handleCategoryChange = (catName) => {
    setSelectedCategory(catName);
    const list = skillsByCategory[catName] || [];
    if (list.length > 0) {
      setSelectedSkill(list[0]);
    }
  };

  const handleFinishTest = useCallback(() => {
    setIsTimerRunning(false);
    // Calculate mock score
    let correctCount = 0;
    mockQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / mockQuestions.length) * 100);
    setResultsScore(finalScore > 0 ? finalScore : 67); // fallback value
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
    setCurrentStep("test");
    setTimeLeft(1800); // Reset to 30 mins
    setIsTimerRunning(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setConsoleLogs([]);
  };

  const handleOptionSelect = (optionKey) => {
    setAnswers({
      ...answers,
      [mockQuestions[currentQuestionIndex].id]: optionKey
    });
  };

  const handleRunCode = () => {
    setConsoleLogs(["Running tests..."]);
    setTimeout(() => {
      try {
        if (codeContent.includes("reduce") || codeContent.includes("for") || codeContent.includes("forEach")) {
          setConsoleLogs([
            "✓ Test Case 1: sumArray([1, 2, 3]) => Passed (Returned: 6)",
            "✓ Test Case 2: sumArray([10, -5, 15]) => Passed (Returned: 20)",
            "✓ Test Case 3: sumArray([]) => Passed (Returned: 0)",
            "\nResult: All tests passed successfully! AI score updated."
          ]);
        } else {
          setConsoleLogs([
            "✗ Test Case 1 Failed: Expected function to sum numbers",
            "Result: Please check logic and try again."
          ]);
        }
      } catch (err) {
        setConsoleLogs(["Error running code:", err.message]);
      }
    }, 800);
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
                      <ListTodo size={12} className="text-[#2D24D0]" /> 10-15 Questions
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

        {/* -------------------- STEP 2: INSTRUCTIONS VIEW (Image 1) -------------------- */}
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
                  { key: 1, label: "Instructions", active: true, done: true },
                  { key: 2, label: "Assessment", active: false, done: false },
                  { key: 3, label: "Review", active: false, done: false },
                  { key: 4, label: "Results", active: false, done: false }
                ].map((step) => (
                  <div key={step.key} className="flex flex-col items-center gap-1 z-10">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border transition ${
                      step.active ? "bg-[#2D24D0] border-[#2D24D0] text-white" :
                      step.done ? "bg-[#2D24D0] border-[#2D24D0] text-white" :
                      "bg-white border-slate-200 text-slate-400"
                    }`}>
                      {step.key}
                    </div>
                    <span className={`text-[9px] sm:text-[10px] font-bold ${step.active || step.done ? "text-[#2D24D0]" : "text-slate-400"}`}>
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
                      { label: "Questions", value: "Full Time / 10-15 Questions" },
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
                          <div className={`p-1.5 rounded-xl ${tip.bg} shrink-0`}>
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

        {/* -------------------- STEP 3: MOCK TEST INTERFACE -------------------- */}
        {currentStep === "test" && (
          <main className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8 space-y-5 text-left">
            
            {/* Header Panel */}
            <div className="bg-white border border-[#cbd5e1]/45 p-3 rounded-2xl shadow-3xs flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-bold text-[#2D24D0]">
                  JS
                </div>
                <div>
                  <h2 className="text-[11px] font-bold text-slate-700 leading-none">{selectedSkill} Test</h2>
                  <span className="text-[9px] text-slate-400 font-semibold">{selectedCategory}</span>
                </div>
              </div>

              {/* Working Clock timer countdown */}
              <div className="bg-red-50 text-red-500 font-mono text-[10px] sm:text-xs font-bold px-2.5 py-1.5 rounded-xl border border-red-100 flex items-center gap-1.5 animate-pulse">
                <Clock size={12} />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Stepper tracker */}
            <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-sm">
              <div className="flex items-center justify-between max-w-xl mx-auto relative select-none">
                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-100 -translate-y-1/2 z-0" />
                <div className="absolute top-1/2 left-0 w-2/3 h-[2px] bg-[#2D24D0] -translate-y-1/2 z-0" />

                {[
                  { key: 1, label: "Instructions", active: false, done: true },
                  { key: 2, label: "Assessment", active: true, done: false },
                  { key: 3, label: "Review", active: false, done: false },
                  { key: 4, label: "Results", active: false, done: false }
                ].map((step) => (
                  <div key={step.key} className="flex flex-col items-center gap-1 z-10">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border transition ${
                      step.active ? "bg-[#2D24D0] border-[#2D24D0] text-white" :
                      step.done ? "bg-[#2D24D0] border-[#2D24D0] text-white" :
                      "bg-white border-slate-200 text-slate-400"
                    }`}>
                      {step.key}
                    </div>
                    <span className={`text-[9px] sm:text-[10px] font-bold ${step.active || step.done ? "text-[#2D24D0]" : "text-slate-400"}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Split Screen layout: Left (Multiple Choice) & Right (Code Editor panel) */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-[1.1fr_0.9fr] items-stretch">
              
              {/* Left Column: Interactive MCQ Questions list */}
              <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-sm flex flex-col justify-between space-y-6">
                
                {/* Question Details header */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                    <span className="text-[9px] font-bold text-[#2D24D0] uppercase tracking-wider">
                      Question {currentQuestionIndex + 1} of {mockQuestions.length}
                    </span>
                    <span className="text-[8px] font-bold bg-amber-50 text-amber-500 rounded px-1.5 py-0.5 border border-amber-100 select-none">
                      Single Choice
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-[#1E2229] whitespace-pre-line leading-normal font-poppins">
                    {mockQuestions[currentQuestionIndex].question}
                  </h3>

                  {/* Option Cards */}
                  <div className="space-y-2 pt-1">
                    {mockQuestions[currentQuestionIndex].options.map((option) => {
                      const isSelected = answers[mockQuestions[currentQuestionIndex].id] === option.key;
                      return (
                        <div 
                          key={option.key}
                          onClick={() => handleOptionSelect(option.key)}
                          className={`border rounded-xl p-[3vw] sm:p-3.5 flex items-center justify-between cursor-pointer transition select-none ${
                            isSelected ? "border-[#2D24D0] bg-[#2D24D0]/5 text-[#2D24D0]" : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-[5vw] h-[5vw] max-w-[24px] max-h-[24px] min-w-[18px] min-h-[18px] rounded-lg text-[clamp(8px,2.4vw,10px)] font-bold flex items-center justify-center transition border ${
                              isSelected ? "bg-[#2D24D0] border-[#2D24D0] text-white" : "bg-white border-slate-200 text-slate-400"
                            }`}>
                              {option.key}
                            </span>
                            <span className="text-[clamp(10px,3.2vw,12px)] font-semibold">{option.text}</span>
                          </div>
                          
                          {isSelected && <CheckCircle2 size={14} className="text-[#2D24D0]" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Next buttons */}
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
                    Previous
                  </button>

                  {currentQuestionIndex < mockQuestions.length - 1 ? (
                    <button 
                      onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                      className="bg-[#2D24D0] hover:bg-[#1f1a8c] text-white font-bold text-[10px] sm:text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-sm"
                    >
                      Next Question
                    </button>
                  ) : (
                    <button 
                      onClick={handleFinishTest}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[10px] sm:text-xs px-4 py-2 rounded-xl transition cursor-pointer shadow-sm"
                    >
                      Finish Test
                    </button>
                  )}
                </div>

              </div>

              {/* Right Column: Code Editor Console Sandbox */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-sm flex flex-col justify-between text-left space-y-3">
                
                {/* Editor Header labels */}
                <div className="space-y-1 text-slate-300">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-wide">
                      <Terminal size={12} className="text-[#2D24D0]" />
                      <span>Interactive Sandbox Editor</span>
                    </div>
                    <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[8px] font-mono text-slate-400">
                      JavaScript (ES6)
                    </span>
                  </div>
                  <h4 className="text-[10px] font-bold text-slate-200 leading-tight">
                    Challenge: Write a function sumArray(arr) that returns the sum of all elements inside it.
                  </h4>
                </div>

                {/* Editor Textarea */}
                <div className="flex-1 min-h-[140px] bg-slate-950 rounded-xl p-2.5 border border-slate-800 font-mono text-[10px] text-emerald-400 relative">
                  <textarea
                    value={codeContent}
                    onChange={(e) => setCodeContent(e.target.value)}
                    className="w-full h-full bg-transparent text-emerald-400 outline-none resize-none font-mono text-[10px] leading-relaxed"
                    spellCheck="false"
                  />
                </div>

                {/* Actions row */}
                <div className="flex items-center justify-between border-t border-slate-800 pt-2.5">
                  <span className="text-[8px] font-bold text-slate-500 select-none">
                    Tests run in localized secure sandbox environment.
                  </span>
                  
                  <button 
                    onClick={handleRunCode}
                    className="bg-[#2D24D0] hover:bg-[#1c167d] text-white font-bold text-[9px] px-2.5 py-2 rounded-lg flex items-center justify-center gap-1 transition cursor-pointer"
                  >
                    <RefreshCw size={10} />
                    <span>Run Code</span>
                  </button>
                </div>

                {/* Console Log outputs */}
                <div className="bg-slate-950 rounded-xl p-2.5 border border-slate-800 h-[80px] overflow-y-auto font-mono text-[8px] text-slate-350">
                  <div className="text-slate-500 font-bold uppercase select-none pb-0.5">Console Output:</div>
                  {consoleLogs.map((log, i) => (
                    <div key={i} className="whitespace-pre-line leading-normal py-0.5">{log}</div>
                  ))}
                </div>

              </div>

            </div>

          </main>
        )}

        {/* -------------------- STEP 4: EVALUATION RESULTS VIEW -------------------- */}
        {currentStep === "results" && (
          <main className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8 space-y-5 text-left">
            
            {/* Nav Header breadcrumb */}
            <div className="space-y-0.5 select-none">
              <button 
                onClick={() => setCurrentStep("dashboard")}
                className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-[#2D24D0] hover:underline cursor-pointer"
              >
                <ArrowLeft size={12} />
                <span>Back to Skill Assessment Dashboard</span>
              </button>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-950 tracking-tight font-poppins">
                Assessment Results
              </h1>
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
                      step.active ? "bg-[#2D24D0] border-[#2D24D0] text-white" :
                      step.done ? "bg-[#2D24D0] border-[#2D24D0] text-white" :
                      "bg-white border-slate-200 text-slate-400"
                    }`}>
                      {step.key}
                    </div>
                    <span className={`text-[9px] sm:text-[10px] font-bold ${step.active || step.done ? "text-[#2D24D0]" : "text-slate-400"}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Layout grids: Main Score Breakdown (left) & detail statistics (right) */}
            <div className="grid gap-4 sm:gap-6 md:grid-cols-[1.5fr_1fr] items-start">
              
              {/* Score evaluation feedback summary */}
              <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-6 rounded-3xl shadow-sm space-y-4 sm:space-y-6 text-center sm:text-left">
                
                <div className="flex flex-col sm:flex-row items-center gap-4 pb-4 border-b border-slate-100">
                  {/* Radial progress circle */}
                  <div className="relative w-[22vw] h-[22vw] max-w-[112px] max-h-[112px] min-w-[80px] min-h-[80px] flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="56" cy="56" r="46" strokeWidth="8" stroke="#f1f5f9" fill="transparent" />
                      <circle 
                        cx="56" 
                        cy="56" 
                        r="46" 
                        strokeWidth="8" 
                        stroke="#2D24D0" 
                        fill="transparent" 
                        strokeDasharray={2 * Math.PI * 46}
                        strokeDashoffset={2 * Math.PI * 46 * (1 - resultsScore / 100)}
                      />
                    </svg>
                    <span className="absolute text-[clamp(11px,3.5vw,16px)] font-bold font-mono text-[#1E2229]">{resultsScore}%</span>
                  </div>

                  {/* Feedback description text */}
                  <div className="space-y-1">
                    <span className="inline-block px-2 py-0.5 rounded-lg bg-emerald-50 text-[8px] sm:text-[9px] font-bold text-emerald-500 border border-emerald-100">
                      Level: Proficient
                    </span>
                    <h3 className="text-xs sm:text-base font-bold text-slate-800 leading-snug">JavaScript Assessment Complete</h3>
                    <p className="text-[clamp(9px,2.8vw,11px)] text-slate-400 font-semibold leading-relaxed max-w-md">
                      Excellent work! You have demonstrated strong competency in variables, function scopes, DOM manipulations, and asynchronous promises.
                    </p>
                  </div>
                </div>

                {/* Key Strengths & Areas to improve */}
                <div className="grid gap-3 sm:grid-cols-2 text-left">
                  
                  {/* Strong Area items */}
                  <div className="bg-[#2D24D0]/5 border border-[#2D24D0]/10 p-[3vw] sm:p-4 rounded-2xl space-y-2">
                    <h4 className="text-[10px] sm:text-xs font-bold text-[#2D24D0] flex items-center gap-1 select-none uppercase tracking-wider">
                      <CheckCircle2 size={14} />
                      <span>Key Strengths</span>
                    </h4>
                    <ul className="space-y-1.5 text-[clamp(8.5px,2.6vw,10px)] font-semibold text-slate-600">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D24D0]" />
                        <span>Asynchronous Promise paradigms</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D24D0]" />
                        <span>Functional mapping & scoping</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D24D0]" />
                        <span>DOM manipulation techniques</span>
                      </li>
                    </ul>
                  </div>

                  {/* Areas to improve */}
                  <div className="bg-amber-50/50 border border-amber-100 p-[3vw] sm:p-4 rounded-2xl space-y-2">
                    <h4 className="text-[10px] sm:text-xs font-bold text-amber-600 flex items-center gap-1 select-none uppercase tracking-wider">
                      <Info size={14} />
                      <span>Recommended Upgrades</span>
                    </h4>
                    <ul className="space-y-1.5 text-[clamp(8.5px,2.6vw,10px)] font-semibold text-slate-600">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>Closure optimization algorithms</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>Prototype inheritances</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>Complex Array operations</span>
                      </li>
                    </ul>
                  </div>

                </div>

                {/* Back to Dashboard buttons */}
                <div className="flex items-center justify-center pt-1.5">
                  <button 
                    onClick={() => setCurrentStep("dashboard")}
                    className="bg-[#2D24D0] hover:bg-[#1c1875] text-white font-bold text-[10px] sm:text-xs px-5 py-3.5 rounded-xl transition cursor-pointer shadow-sm"
                  >
                    Go back to Dashboard
                  </button>
                </div>

              </div>

              {/* Recommended Learning Courses (Right side) */}
              <div className="bg-white border border-[#cbd5e1]/45 p-4 sm:p-5 rounded-3xl shadow-sm text-left space-y-3.5">
                <h3 className="text-[10px] sm:text-xs font-bold text-[#1e293b] uppercase tracking-wider select-none">Recommended Career Paths</h3>
                
                <div className="space-y-2.5">
                  {[
                    { title: "Advanced JavaScript & ES6 Modules", duration: "12 Hours course", provider: "Meta Academy", badge: "Free Tier" },
                    { title: "React Core Fundamentals", duration: "8 Hours course", provider: "IBM Developer Group", badge: "Highly Recommended" },
                    { title: "AI tools in Javascript codebases", duration: "6 Hours course", provider: "HireMind Labs", badge: "AI Special" }
                  ].map((course, idx) => (
                    <div key={idx} className="bg-slate-50/50 p-2.5 rounded-2xl border border-slate-100 text-left space-y-1.5">
                      <div className="space-y-1 animate-none">
                        <span className="rounded bg-[#2D24D0]/10 px-2 py-0.5 text-[8px] font-bold text-[#2D24D0]">
                          {course.badge}
                        </span>
                        <h4 className="text-[10px] sm:text-xs font-bold text-slate-800 leading-snug">{course.title}</h4>
                        <p className="text-[8px] sm:text-[9px] text-slate-400 font-semibold leading-none pt-0.5">
                          {course.provider} • {course.duration}
                        </p>
                      </div>

                      <Link href="/find-jobs">
                        <button className="text-[8px] sm:text-[9px] font-bold text-[#2D24D0] hover:underline flex items-center gap-0.5 cursor-pointer">
                          <span>Enroll Now</span>
                          <ArrowRight size={8} />
                        </button>
                      </Link>
                    </div>
                  ))}
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
