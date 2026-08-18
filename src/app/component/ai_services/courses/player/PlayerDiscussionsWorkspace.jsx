"use client";

import { useState } from "react";
import { 
  Search, 
  Plus, 
  MessageSquare, 
  Eye, 
  CheckCircle, 
  ChevronDown, 
  Bot, 
  BookOpen, 
  FileText, 
  HelpCircle,
  ArrowRight,
  TrendingUp
} from "lucide-react";

const initialForumPosts = [
  {
    id: 1,
    title: "Welcome to the Python for Data Science Community 👋",
    desc: "Introduce yourself, ask questions, and connect with other learners.",
    user: "Hire Mind Team",
    time: "May 01, 2024",
    replies: 28,
    views: "1.2K",
    pinned: true,
    verified: true,
    avatar: "HM",
    avatarBg: "bg-blue-50 text-[#433be2]"
  },
  {
    id: 2,
    title: "Confused about list comprehensions in Python",
    desc: "I'm struggling to understand list comprehensions. Can someone explain with an example?",
    user: "Sahil Kumar",
    time: "2 hours ago",
    replies: 12,
    views: 245,
    pinned: false,
    verified: false,
    avatar: "SK",
    avatarBg: "bg-purple-50 text-purple-600"
  },
  {
    id: 3,
    title: "How to handle missing data in Pandas?",
    desc: "What are the best practices to handle missing data in a dataset using Pandas?",
    user: "Arjun Rao",
    time: "1 day ago",
    replies: 8,
    views: 198,
    pinned: false,
    verified: false,
    avatar: "AR",
    avatarBg: "bg-emerald-50 text-emerald-600"
  },
  {
    id: 4,
    title: "Difference between list and tuple",
    desc: "What are the key differences between lists and tuples in Python? when should we use each?",
    user: "Divya Patel",
    time: "2 hours ago",
    replies: 6,
    views: 162,
    pinned: false,
    verified: false,
    avatar: "DP",
    avatarBg: "bg-orange-50 text-orange-600"
  },
  {
    id: 5,
    title: "Getting error in Matplotlib plot",
    desc: "I'm getting 'ValueError: x and y must have same first dimension' in Matplotlib. How to fix this?",
    user: "Yash Tiwari",
    time: "3 days ago",
    replies: 4,
    views: 121,
    pinned: false,
    verified: false,
    avatar: "YT",
    avatarBg: "bg-indigo-50 text-indigo-600"
  },
  {
    id: 6,
    title: "Best resources for learning NumPy",
    desc: "Can anyone suggest some good resources to learn NumPy in depth?",
    user: "Pooja Singh",
    time: "4 days ago",
    replies: 3,
    views: 98,
    pinned: false,
    verified: false,
    avatar: "PS",
    avatarBg: "bg-cyan-50 text-cyan-600"
  }
];

const resourceCategories = [
  { label: "All Discussions", count: 24, id: "all" },
  { label: "Python Basics", count: 4, id: "basics" },
  { label: "NumPy", count: 3, id: "numpy" },
  { label: "Pandas", count: 1, id: "pandas" },
  { label: "Data Visualization", count: 2, id: "visualization" },
  { label: "Projects", count: 4, id: "projects" }
];

const popularDiscussions = [
  { id: 1, title: "How to install Python libraries in VS Code?", replies: 18 },
  { id: 2, title: "What is the use of *args and **kwargs?", replies: 15 },
  { id: 3, title: "How to merge two DataFrames in Pandas?", replies: 13 },
  { id: 4, title: "How to handle outliers in dataset?", replies: 11 },
  { id: 5, title: "Best Python IDEs for beginners", replies: 9 }
];

export default function PlayerDiscussionsWorkspace() {
  const [posts, setPosts] = useState(initialForumPosts);
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      
      {/* LEFT COLUMN: ALL DISCUSSIONS */}
      <div className="space-y-4">
        
        {/* Header Search & Start button */}
        <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-medium text-[#101014]">All Discussions</h3>
            <span className="rounded-lg bg-gray-100 text-gray-500 font-medium px-2 py-0.5 text-[10px]">32</span>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
            {/* Search inputs */}
            <div className="flex items-center gap-2 rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-1.5 flex-1 sm:flex-none sm:w-[220px]">
              <Search size={14} className="text-[#94a3b8]" />
              <input 
                type="text" 
                placeholder="Search a topic..."
                className="w-full bg-transparent text-xs text-[#1e293b] outline-none placeholder:text-[#94a3b8]"
              />
            </div>
            
            <button className="rounded-xl bg-[#433be2] hover:bg-[#3129c8] text-white px-4 py-2.5 text-xs font-medium transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap">
              <Plus size={13} />
              <span>Start Discussion</span>
            </button>
          </div>
        </div>

        {/* Discussions thread cards */}
        <div className="space-y-3">
          {posts.map((post) => {
            return (
              <div 
                key={post.id}
                className="bg-white border border-[#cbd5e1]/55 hover:border-[#433be2]/60 rounded-2xl p-4.5 shadow-2xs hover:shadow-xs transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Details Left */}
                <div className="flex items-start gap-3.5">
                  {/* User Profile Badge */}
                  <div className={`w-10 h-10 rounded-full font-medium text-xs shrink-0 flex items-center justify-center shadow-2xs border border-gray-150 select-none ${post.avatarBg}`}>
                    {post.avatar}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {post.pinned && (
                        <span className="rounded-lg bg-green-50 border border-green-200/50 px-2 py-0.5 text-[9px] font-medium text-green-600 select-none">
                          📌 Pinned
                        </span>
                      )}
                      <h4 className="text-xs font-medium text-[#101014] leading-snug hover:text-[#433be2] transition cursor-pointer">
                        {post.title}
                      </h4>
                    </div>

                    <p className="text-[11px] font-medium text-[#64748b] leading-relaxed line-clamp-2">
                      {post.desc}
                    </p>

                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium select-none pt-0.5">
                      <span className="text-[#334155]">{post.user}</span>
                      {post.verified && (
                        <CheckCircle size={10} className="fill-[#433be2] text-white" />
                      )}
                      {post.verified && <span className="text-[#433be2]">Hire Mind Team</span>}
                      <span>•</span>
                      <span className="font-medium text-slate-400">{post.time}</span>
                    </div>
                  </div>
                </div>

                {/* Right stats counters */}
                <div className="flex items-center justify-start sm:justify-end gap-5 text-slate-400 text-[10px] font-medium shrink-0 border-t sm:border-t-0 border-[#f1f5f9] pt-3 sm:pt-0 self-stretch sm:self-auto w-full sm:w-auto">
                  <div className="flex items-center gap-1 hover:text-[#433be2] cursor-pointer">
                    <MessageSquare size={13} />
                    <span>{post.replies}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={13} />
                    <span>{post.views}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Load More trigger */}
        <button className="w-full py-2.5 rounded-xl border border-[#cbd5e1] hover:border-[#433be2] bg-white text-[#433be2] hover:bg-[#f8fafc] text-xs font-medium transition shadow-3xs cursor-pointer flex items-center justify-center gap-1.5">
          <span>Load More Discussions</span>
          <ChevronDown size={14} />
        </button>

        {/* Help start discussion banner */}
        <div className="bg-gradient-to-r from-[#eef1ff] to-[#f8f9ff] border border-[#d9dcf7]/50 rounded-2xl p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-3xs">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white text-[#433be2] rounded-full shadow-2xs shrink-0">
              <Bot size={24} className="stroke-1" />
            </div>
            
            <div className="space-y-0.5">
              <h4 className="text-xs font-medium text-[#101014]">Need help with something?</h4>
              <p className="text-[11px] font-medium text-[#64748b]">
                Ask your question to the community and get help from learners and instructors.
              </p>
            </div>
          </div>

          <button className="w-full sm:w-auto rounded-xl bg-[#433be2] hover:bg-[#3129c8] text-white px-5 py-2.5 text-xs font-medium transition shadow-sm cursor-pointer whitespace-nowrap">
            Start Discussion
          </button>
        </div>

      </div>

      {/* RIGHT COLUMN: CATEGORIES & POPULAR */}
      <aside className="space-y-6">
        
        {/* Resource Categories */}
        <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-medium text-[#101014] flex items-center gap-2">
            <BookOpen size={16} className="text-[#433be2]" />
            <span>Resource Categories</span>
          </h3>

          <div className="space-y-1">
            {resourceCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition cursor-pointer text-left ${
                    isActive 
                      ? "bg-[#eef1ff] text-[#433be2]" 
                      : "text-[#475569] hover:bg-slate-50 hover:text-[#101014]"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] ${isActive ? "text-[#433be2]" : "text-[#94a3b8]"}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Popular Discussions */}
        <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-medium text-[#101014] flex items-center gap-2">
            <TrendingUp size={16} className="text-[#433be2]" />
            <span>Popular Discussions</span>
          </h3>

          <div className="space-y-3.5">
            {popularDiscussions.map((post) => (
              <div key={post.id} className="flex items-start justify-between gap-3 cursor-pointer group">
                <div className="flex items-start gap-2.5">
                  <div className="p-2 bg-blue-50 text-blue-500 rounded-lg shrink-0 group-hover:bg-[#433be2]/10 transition">
                    <HelpCircle size={14} />
                  </div>
                  <h4 className="text-[11px] font-medium text-[#334155] leading-snug group-hover:text-[#433be2] transition line-clamp-2">
                    {post.title}
                  </h4>
                </div>
                <span className="text-[10px] text-slate-400 font-medium shrink-0 pt-0.5">
                  {post.replies}
                </span>
              </div>
            ))}
          </div>

          <button className="w-full pt-3 border-t border-[#f1f5f9] flex items-center justify-center gap-1 text-[10px] font-medium text-[#433be2] hover:text-[#3129c8] transition cursor-pointer">
            <span>View All popular Discussions</span>
            <ArrowRight size={12} />
          </button>
        </div>

        {/* Community Guidelines */}
        <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="text-xs font-medium text-[#101014] uppercase tracking-wider select-none">Community Guidelines</h3>
          <p className="text-[11px] font-medium text-[#64748b] leading-relaxed">
            Be respectful and helpful to others. No spam or self-promotion. Keep discussions relevant to the course.
          </p>
          
          <button className="inline-flex items-center gap-1 text-[10px] font-medium text-[#433be2] hover:text-[#3129c8] transition cursor-pointer">
            <span>View Guidelines</span>
            <ArrowRight size={12} />
          </button>
        </div>

      </aside>

    </div>
  );
}
