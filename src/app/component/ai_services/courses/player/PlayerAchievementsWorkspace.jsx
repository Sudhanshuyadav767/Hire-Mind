"use client";

import { 
  Award, 
  Trophy, 
  Flame, 
  BookOpen, 
  CheckCircle2, 
  Compass, 
  TrendingUp, 
  Zap, 
  Layers, 
  Flag,
  FileCheck2,
  Calendar,
  Sparkles
} from "lucide-react";

// Badge Medal Component to render beautiful CSS medals
function BadgeMedal({ type = "gold", number = 1 }) {
  const colors = {
    gold: "from-amber-300 via-yellow-400 to-amber-500 text-amber-900 border-amber-200",
    blue: "from-blue-300 via-sky-400 to-blue-500 text-blue-900 border-blue-200",
    purple: "from-purple-300 via-fuchsia-400 to-purple-500 text-purple-900 border-purple-200",
    emerald: "from-emerald-300 via-teal-400 to-emerald-500 text-emerald-900 border-emerald-200"
  };
  const colorClass = colors[type] || colors.gold;
  
  return (
    <div className="flex items-center justify-center p-0.5 select-none shrink-0">
      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${colorClass} border-4 flex flex-col items-center justify-center shadow-xs relative`}>
        {/* Inner circle line */}
        <div className="absolute inset-0.5 rounded-full border border-white/40" />
        
        {/* Ribbon decoration representation */}
        <div className="absolute -bottom-1 w-5 h-2.5 bg-current opacity-20 transform rotate-12" />
        <div className="absolute -bottom-1 w-5 h-2.5 bg-current opacity-20 transform -rotate-12" />
        
        {/* Core Icon symbol */}
        {number % 4 === 1 && <Trophy size={18} className="drop-shadow-xs" />}
        {number % 4 === 2 && <Award size={18} className="drop-shadow-xs" />}
        {number % 4 === 3 && <Zap size={18} className="drop-shadow-xs" />}
        {number % 4 === 0 && <Sparkles size={18} className="drop-shadow-xs" />}
      </div>
    </div>
  );
}

const recentAchievements = [
  {
    id: 1,
    title: "Course Achiever",
    desc: "Congratulations! You have completed the course",
    points: "+500 Points",
    date: "May 01, 2024",
    icon: Award,
    color: "text-blue-500 bg-blue-50 border-blue-100"
  },
  {
    id: 2,
    title: "Streak Keeper",
    desc: "Maintained a 7-day learning streak",
    points: "+500 Points",
    date: "May 01, 2024",
    icon: Flame,
    color: "text-amber-500 bg-amber-50 border-amber-100"
  },
  {
    id: 3,
    title: "Module Master",
    desc: "Completed three modules in the course",
    points: "+500 Points",
    date: "May 01, 2024",
    icon: Layers,
    color: "text-purple-500 bg-purple-50 border-purple-100"
  }
];

const badgesList = [
  { title: "Python Beginner", desc: "Completed the first Python lesson", date: "May 01, 2024", type: "gold" },
  { title: "Lesson Master", desc: "Completed the first Python lesson", date: "May 01, 2024", type: "blue" },
  { title: "Quiz Champion", desc: "Completed the first Python lesson", date: "May 01, 2024", type: "purple" },
  { title: "Code Explorer", desc: "Completed the first Python lesson", date: "May 01, 2024", type: "emerald" },
  { title: "Data Analyst", desc: "Completed the first Python lesson", date: "May 01, 2024", type: "gold" },
  { title: "Pandas Pro", desc: "Completed the first Python lesson", date: "May 01, 2024", type: "blue" },
  { title: "Python Beginner", desc: "Completed the first Python lesson", date: "May 01, 2024", type: "purple" },
  { title: "Python Beginner", desc: "Completed the first Python lesson", date: "May 01, 2024", type: "emerald" },
  { title: "Consistent Learner", desc: "Completed the first Python lesson", date: "May 01, 2024", type: "gold" },
  { title: "Halfway Hero", desc: "Completed the first Python lesson", date: "May 01, 2024", type: "blue" },
  { title: "Module Master", desc: "Completed the first Python lesson", date: "May 01, 2024", type: "purple" },
  { title: "Course Achiever", desc: "Completed the first Python lesson", date: "May 01, 2024", type: "emerald" }
];

export default function PlayerAchievementsWorkspace() {
  return (
    <div className="space-y-6">
      
      {/* 1. Progress Banner Card */}
      <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-5 shadow-sm space-y-4">
        <h4 className="text-xs font-medium text-[#101014] select-none">Your Progress</h4>
        
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4 items-center">
          
          {/* Stat 1: Badges Earned */}
          <div className="flex items-center gap-3.5 px-3 py-2 border-r border-[#cbd5e1]/20">
            <div className="p-3 rounded-full bg-[#f0efff] text-[#433be2] shrink-0">
              <Award size={20} className="stroke-[1.5]" />
            </div>
            <div className="space-y-0.5">
              <b className="text-xl font-medium text-[#101014]">12</b>
              <span className="text-[10px] font-medium text-[#64748b] block select-none">Badges Earned</span>
            </div>
          </div>

          {/* Stat 2: Points Earned */}
          <div className="flex items-center gap-3.5 px-3 py-2 border-r border-[#cbd5e1]/20">
            <div className="p-3 rounded-full bg-[#fef3c7] text-[#d97706] shrink-0">
              <Trophy size={20} className="stroke-[1.5]" />
            </div>
            <div className="space-y-0.5">
              <b className="text-xl font-medium text-[#101014]">3200</b>
              <span className="text-[10px] font-medium text-[#64748b] block select-none">Points earned</span>
            </div>
          </div>

          {/* Stat 3: Streak */}
          <div className="flex items-center gap-3.5 px-3 py-2 border-r border-[#cbd5e1]/20">
            <div className="p-3 rounded-full bg-[#fee2e2] text-[#ef4444] shrink-0">
              <Flame size={20} className="stroke-[1.5]" />
            </div>
            <div className="space-y-0.5">
              <b className="text-xl font-medium text-[#101014]">18</b>
              <span className="text-[10px] font-medium text-[#64748b] block select-none">Day Streak</span>
            </div>
          </div>

          {/* Stat 4: Circular completion gauge */}
          <div className="flex items-center gap-3.5 px-3 py-1">
            <div className="relative flex items-center justify-center w-12 h-12 shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="#433be2" strokeWidth="3" strokeDasharray="78, 100" strokeLinecap="round" />
              </svg>
              <span className="absolute text-[10px] font-medium text-[#433be2]">78%</span>
            </div>
            
            <div className="space-y-0.5">
              <b className="text-xs font-medium text-[#101014]">78%</b>
              <span className="text-[10px] font-medium text-[#64748b] block select-none font-sans">Course Completion</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Badges Earned (12) grid */}
      <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-5 shadow-sm space-y-4">
        <h4 className="text-xs font-medium text-[#101014]">Badges Earned <span className="text-slate-400 font-medium">(12)</span></h4>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {badgesList.map((badge, idx) => (
            <div 
              key={idx}
              className="border border-[#cbd5e1]/55 rounded-2xl p-4.5 flex flex-col items-center text-center justify-between gap-3 bg-[#f8fafc] hover:border-[#433be2] transition shadow-3xs"
            >
              <BadgeMedal type={badge.type} number={idx + 1} />
              
              <div className="space-y-1">
                <h5 className="text-xs font-medium text-[#334155] leading-snug">
                  {badge.title}
                </h5>
                <p className="text-[10px] font-medium text-[#64748b] leading-relaxed line-clamp-2 px-1">
                  {badge.desc}
                </p>
              </div>

              <span className="text-[9px] text-[#94a3b8] font-medium select-none mt-1">
                Earned on {badge.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Recent Achievements list */}
      <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-medium text-[#101014] select-none">Recent Achievements</h4>
          <button className="text-[10px] font-medium text-[#433be2] hover:text-[#3129c8] hover:underline cursor-pointer">
            View All
          </button>
        </div>

        <div className="space-y-3">
          {recentAchievements.map((item) => {
            const IconComponent = item.icon;
            
            return (
              <div 
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-100 bg-[#f8fafc] hover:border-[#cbd5e1]/70 transition text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full shrink-0 border ${item.color}`}>
                    <IconComponent size={16} />
                  </div>
                  <div className="space-y-0.5">
                    <h5 className="font-medium text-[#334155]">
                      {item.title}
                    </h5>
                    <p className="text-[10px] font-medium text-[#64748b] line-clamp-1 pr-4">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[10px] font-medium shrink-0 text-right">
                  <span className="text-[#10b981]">{item.points}</span>
                  <span className="text-slate-400 font-medium hidden xs:inline">{item.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
