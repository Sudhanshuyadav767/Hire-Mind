"use client";

import { useState } from "react";
import { 
  FileText, 
  Plus, 
  Star, 
  Clock, 
  Search, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical, 
  ThumbsUp, 
  ThumbsDown, 
  ArrowRight,
  Sparkles,
  User,
  Users
} from "lucide-react";

const initialNotesList = [
  { 
    id: 1, 
    title: "Variables and Data Types in Python", 
    section: "Section 1: Python Basics", 
    date: "May 01, 2024", 
    starred: true,
    text: `1. Variables\nA variable is a containers for storing data values.\n\n[CODE_1]\n\n2. Data Types\nCommon data types in Python.\n• int - Integer numbers\n• float - Decimal numbers\n• str - String of characters\n• bool - True or False\n\n[CODE_2]\n\n2. Type Casting\nConvert one data type into another.\n\n[CODE_3]`
  },
  { id: 2, title: "List vs Tuple", section: "Section 1: Python Basics", date: "May 01, 2024", starred: false },
  { id: 3, title: "NumPy Arrays Basics", section: "Section 1: Python Basics", date: "May 01, 2024", starred: false },
  { id: 4, title: "Pandas DataFrame Overview", section: "Section 1: Python Basics", date: "May 01, 2024", starred: false },
  { id: 5, title: "Matplotlib Plot Types", section: "Section 1: Python Basics", date: "May 01, 2024", starred: false },
  { id: 6, title: "Project Requirementts", section: "Section 1: Python Basics", date: "May 01, 2024", starred: false }
];

export default function PlayerNotesWorkspace() {
  const [notes, setNotes] = useState(initialNotesList);
  const [activeNoteId, setActiveNoteId] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");

  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0];

  const handleToggleStar = (id, e) => {
    e.stopPropagation();
    setNotes(prev => 
      prev.map(n => n.id === id ? { ...n, starred: !n.starred } : n)
    );
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr_280px]">
      
      {/* 1. LEFT SIDEBAR */}
      <aside className="space-y-6">
        
        {/* Header & New Note */}
        <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-4.5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-[#101014]">My Notes</h3>
            <button className="inline-flex items-center gap-1 rounded-xl border border-[#433be2] bg-white hover:bg-[#eef1ff] text-[#433be2] px-3 py-1.5 text-xs font-medium transition cursor-pointer">
              <Plus size={12} />
              <span>New Note</span>
            </button>
          </div>

          {/* Quick Categories */}
          <div className="space-y-1">
            <button 
              onClick={() => setActiveCategory("all")}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition cursor-pointer text-left ${
                activeCategory === "all" ? "bg-[#eef1ff] text-[#433be2]" : "text-[#475569] hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText size={14} />
                <span>All Notes</span>
              </div>
              <span className="text-[10px]">18</span>
            </button>
            
            <button 
              onClick={() => setActiveCategory("favorites")}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition cursor-pointer text-left ${
                activeCategory === "favorites" ? "bg-[#eef1ff] text-[#433be2]" : "text-[#475569] hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <Star size={14} />
                <span>Favorites</span>
              </div>
              <span className="text-[10px]">4</span>
            </button>

            <button 
              onClick={() => setActiveCategory("recent")}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition cursor-pointer text-left ${
                activeCategory === "recent" ? "bg-[#eef1ff] text-[#433be2]" : "text-[#475569] hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>Recently Viewed</span>
              </div>
              <span className="text-[10px]">4</span>
            </button>
          </div>

          {/* Sections list */}
          <div className="border-t border-gray-100 pt-3.5 space-y-2">
            <h4 className="text-[10px] font-medium text-slate-400 uppercase tracking-wider select-none">By Section</h4>
            <div className="space-y-0.5 text-xs font-medium text-[#475569]">
              {[
                { label: "Section 1: Python Basics", count: 4 },
                { label: "Section 2: Data Structures", count: 3 },
                { label: "Section 3: NumPy", count: 3 },
                { label: "Section 4: Pandas", count: 1 },
                { label: "Section 5: Data Visualization", count: 2 },
                { label: "Section 6: Final Project", count: 4 }
              ].map((sec) => (
                <button key={sec.label} className="w-full flex items-center justify-between py-1.5 px-1 hover:text-[#433be2] text-left transition cursor-pointer">
                  <span className="truncate pr-2">{sec.label}</span>
                  <span className="text-[10px] text-slate-400 shrink-0">{sec.count}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Quick Tip card */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4.5 shadow-3xs text-xs space-y-3.5">
          <div className="flex items-center gap-1.5 text-emerald-800 font-medium uppercase tracking-wide">
            <Sparkles size={14} />
            <span>Quick Tip</span>
          </div>
          
          <p className="font-medium text-emerald-700 leading-normal">
            Use Notes to bookmark important concepts and revise them anytime.
          </p>
          
          {/* Decorative book stack representation */}
          <div className="flex items-center justify-center pt-2">
            <div className="relative w-16 h-12 flex items-center justify-center">
              <div className="absolute w-12 h-10 bg-emerald-200 border border-emerald-300 rounded-lg transform -rotate-12 shadow-xs" />
              <div className="absolute w-12 h-10 bg-emerald-400 border border-emerald-500 rounded-lg transform rotate-6 shadow-xs flex items-center justify-center text-white">
                <FileText size={16} />
              </div>
            </div>
          </div>
        </div>

      </aside>

      {/* 2. CENTER CONTENT */}
      <main className="grid gap-4 md:grid-cols-[260px_1fr]">
        
        {/* Left Sub-Column: Notes Lists */}
        <div className="space-y-3.5">
          
          {/* Header Panel */}
          <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-3.5 shadow-sm space-y-3">
            <h4 className="text-xs font-medium text-[#101014]">All Notes</h4>
            
            {/* Search notes */}
            <div className="flex items-center gap-2 rounded-xl border border-[#cbd5e1] bg-white px-3 py-1.5">
              <Search size={13} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search notes..."
                className="w-full bg-transparent text-[11px] text-[#1e293b] outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Sort selection */}
            <div className="flex items-center justify-between text-[10px] text-[#64748b] font-medium">
              <span>Sort by:</span>
              <button className="inline-flex items-center gap-0.5 text-[#334155] font-medium">
                <span>Last Updated</span>
                <ChevronDown size={11} />
              </button>
            </div>
          </div>

          {/* Notes list selection cards */}
          <div className="space-y-2">
            {notes.map((note) => {
              const isSelected = activeNoteId === note.id;
              return (
                <div 
                  key={note.id}
                  onClick={() => setActiveNoteId(note.id)}
                  className={`bg-white border rounded-xl p-3 shadow-2xs hover:shadow-xs transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                    isSelected ? "border-[#433be2] ring-1 ring-[#433be2]/25" : "border-[#cbd5e1]/55"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <FileText size={15} className={`mt-0.5 shrink-0 ${isSelected ? "text-[#433be2]" : "text-[#94a3b8]"}`} />
                      <h4 className="text-[11px] font-medium text-[#334155] leading-snug line-clamp-2">
                        {note.title}
                      </h4>
                    </div>
                    
                    {/* Star indicator */}
                    <button 
                      onClick={(e) => handleToggleStar(note.id, e)}
                      className="text-slate-400 hover:text-amber-500 cursor-pointer shrink-0"
                    >
                      {note.starred ? (
                        <Star size={13} className="fill-amber-400 text-amber-400" />
                      ) : (
                        <Star size={13} />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[9px] text-slate-400 font-medium border-t border-gray-100 pt-1.5 mt-1 select-none">
                    <span className="truncate max-w-[130px]">{note.section}</span>
                    <span>{note.date}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="border-t border-[#cbd5e1]/20 pt-3 flex flex-col xs:flex-row items-center justify-between gap-2.5">
            <span className="text-[9px] font-medium text-[#64748b]">Showing 1 to 6 of 18 notes</span>
            <div className="flex items-center gap-1.5 text-[9px] font-medium text-[#475569]">
              <button className="p-1 rounded-lg border border-gray-200 bg-white hover:bg-slate-50 cursor-pointer">
                <ChevronLeft size={10} />
              </button>
              <button className="h-5 w-5 rounded-md bg-[#433be2] text-white flex items-center justify-center">1</button>
              <button className="h-5 w-5 rounded-md border border-gray-200 bg-white hover:bg-slate-50 flex items-center justify-center">2</button>
              <button className="h-5 w-5 rounded-md border border-gray-200 bg-white hover:bg-slate-50 flex items-center justify-center">3</button>
              <button className="p-1 rounded-lg border border-gray-200 bg-white hover:bg-slate-50 cursor-pointer">
                <ChevronRight size={10} />
              </button>
            </div>
          </div>

        </div>

        {/* Right Sub-Column: Active Note Details Preview */}
        <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Header Details */}
            <div className="flex items-start justify-between border-b border-[#cbd5e1]/10 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-[#101014]">
                    {activeNote.title}
                  </h3>
                  <button 
                    onClick={(e) => handleToggleStar(activeNote.id, e)}
                    className="text-slate-400 hover:text-amber-500 cursor-pointer"
                  >
                    {activeNote.starred ? (
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                    ) : (
                      <Star size={14} />
                    )}
                  </button>
                </div>
                <p className="text-[10px] font-medium text-[#94a3b8] flex items-center gap-1.5 select-none">
                  <span>{activeNote.section}</span>
                  <span>•</span>
                  <span>{activeNote.date}</span>
                </p>
              </div>

              <button className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer">
                <MoreVertical size={16} />
              </button>
            </div>

            {/* Note Text & Variable Details */}
            {activeNote.id === 1 ? (
              <div className="space-y-4 text-xs font-medium text-[#5e637d] leading-relaxed">
                <div className="space-y-1.5">
                  <h4 className="font-medium text-[#334155]">1. Variables</h4>
                  <p>A variable is a containers for storing data values.</p>
                </div>

                {/* Code Block 1 */}
                <div className="rounded-xl bg-[#f8fafc] border border-gray-150 p-3.5 font-mono text-[10px] text-[#433be2] leading-relaxed relative select-all">
                  <div>x = <span className="text-[#0969da]">10</span></div>
                  <div>y = <span className="text-[#1a7f37]">&quot;Hello, Python&quot;</span></div>
                  <div>z = <span className="text-[#0969da]">3.14</span></div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-medium text-[#334155]">2. Data Types</h4>
                  <p>Common data types in Python.</p>
                  <ul className="list-disc pl-5 space-y-1 font-medium text-[#475569] text-[11px]">
                    <li>int - Integer numbers</li>
                    <li>float - Decimal numbers</li>
                    <li>str - String of characters</li>
                    <li>bool - True or False</li>
                  </ul>
                </div>

                {/* Code Block 2 */}
                <div className="rounded-xl bg-[#f8fafc] border border-gray-150 p-3.5 font-mono text-[10px] text-[#433be2] leading-relaxed relative select-all">
                  <div>a = <span className="text-[#0969da]">10</span> <span className="text-slate-400 font-medium ml-6"># int</span></div>
                  <div>b = <span className="text-[#1a7f37]">&quot;Hello, Python&quot;</span> <span className="text-slate-400 font-medium ml-4"># str</span></div>
                  <div>c = <span className="text-[#0969da]">3.14</span> <span className="text-slate-400 font-medium ml-6"># float</span></div>
                  <div>d = <span className="text-[#0969da]">True</span> <span className="text-slate-400 font-medium ml-6"># bool</span></div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-medium text-[#334155]">2. Type Casting</h4>
                  <p>Convert one data type into another.</p>
                </div>

                {/* Code Block 3 */}
                <div className="rounded-xl bg-[#f8fafc] border border-gray-150 p-3.5 font-mono text-[10px] text-[#433be2] leading-relaxed relative select-all">
                  <div>x = <span className="text-[#1a7f37]">&quot;10&quot;</span></div>
                  <div>y = <span className="text-[#0969da] font-medium">int</span>(x) <span className="text-slate-400 font-medium ml-10"># y will be 10</span></div>
                </div>
              </div>
            ) : (
              <div className="text-xs font-medium text-[#5e637d] leading-relaxed bg-[#f8fafc] border border-gray-100 rounded-xl p-4 min-h-[180px] flex items-center justify-center text-center">
                <p>No content description provided for {activeNote.title}. You can add summaries or edit this note placeholder.</p>
              </div>
            )}

          </div>

          {/* Feedback Bottom */}
          <div className="border-t border-[#f1f5f9] pt-4 flex items-center justify-center sm:justify-start gap-3">
            <span className="text-[10px] font-medium text-slate-400">Was this note helpful?</span>
            <div className="flex gap-2">
              <button className="p-1.5 border border-gray-200 rounded-lg hover:border-[#433be2] hover:bg-[#eef1ff] hover:text-[#433be2] text-[#64748b] transition cursor-pointer">
                <ThumbsUp size={11} />
              </button>
              <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-slate-100 hover:text-black text-[#64748b] transition cursor-pointer">
                <ThumbsDown size={11} />
              </button>
            </div>
          </div>

        </div>

      </main>

      {/* 3. RIGHT SIDEBAR (SUMMARY CARD & RECENT) */}
      <aside className="space-y-6">
        
        {/* Notes Summary */}
        <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-5 shadow-sm space-y-4">
          <h4 className="text-xs font-medium text-[#101014]">Notes Summary</h4>
          
          <div className="flex items-center gap-3 bg-[#eef1ff] border border-[#d9dcf7]/30 rounded-xl p-3">
            <div className="p-2.5 rounded-lg bg-white text-[#433be2] shrink-0 shadow-2xs">
              <FileText size={18} />
            </div>
            <div className="space-y-0.5">
              <b className="text-lg font-medium text-[#101014]">18</b>
              <span className="text-[10px] font-medium text-[#64748b] block select-none">Total Notes</span>
            </div>
          </div>

          <div className="space-y-2.5 pt-1 text-xs font-medium text-[#475569]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <Star size={14} />
                <span>Favorites</span>
              </div>
              <span className="text-[#334155]">4</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <Clock size={14} />
                <span>Recently Viewed</span>
              </div>
              <span className="text-[#334155]">4</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <User size={14} />
                <span>By You</span>
              </div>
              <span className="text-[#334155]">10</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                <Users size={14} />
                <span>Shared with You</span>
              </div>
              <span className="text-[#334155]">4</span>
            </div>
          </div>
        </div>

        {/* Recent Notes */}
        <div className="bg-white border border-[#cbd5e1]/40 rounded-2xl p-5 shadow-sm space-y-4">
          <h4 className="text-xs font-medium text-[#101014]">Recent Notes</h4>
          
          <div className="space-y-3">
            {notes.slice(0, 4).map((note) => (
              <div 
                key={note.id}
                onClick={() => setActiveNoteId(note.id)}
                className="flex items-start gap-2.5 cursor-pointer group"
              >
                <div className="p-2 bg-blue-50 text-blue-500 rounded-lg shrink-0 group-hover:bg-[#433be2]/10 transition">
                  <FileText size={14} />
                </div>
                <div className="space-y-0.5">
                  <h5 className="text-[11px] font-medium text-[#334155] leading-snug group-hover:text-[#433be2] transition line-clamp-1">
                    {note.title}
                  </h5>
                  <span className="text-[9px] text-[#94a3b8] font-medium block">{note.date}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full pt-3 border-t border-[#f1f5f9] flex items-center justify-center gap-1 text-[10px] font-medium text-[#433be2] hover:text-[#3129c8] transition cursor-pointer">
            <span>View All Notes</span>
            <ArrowRight size={12} />
          </button>
        </div>

      </aside>

    </div>
  );
}
