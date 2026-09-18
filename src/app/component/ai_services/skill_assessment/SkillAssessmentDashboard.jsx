import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BrainCircuit,
  Sparkles,
  Users,
  Clock,
  ListTodo,
  Award,
  Play,
  ArrowRight,
  Code2,
  CheckSquare,
  ChevronDown
} from "lucide-react";

export default function SkillAssessmentDashboard({
  categories,
  skillsByCategory,
  popularSkills,
  recentAssessments,
  selectedCategory,
  selectedSkill,
  selectedLevel,
  handleCategoryChange,
  setSelectedSkill,
  setSelectedLevel,
  handleStartTestFlow
}) {
  return (
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
          {/* Popular Skill Assessments */}
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

          {/* Your Recent Assessments */}
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
  );
}
