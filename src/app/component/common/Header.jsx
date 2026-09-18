"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { 
  Sparkles, 
  FileCheck, 
  Target, 
  Compass, 
  Award, 
  BookOpen, 
  Code2, 
  Layers, 
  Search, 
  Briefcase, 
  Users, 
  HelpCircle, 
  LogIn, 
  UserPlus, 
  ChevronDown,
  Plus,
  ArrowLeftRight,
  Bell,
  Check
} from "lucide-react";

import { useAuth } from '../../../context/AuthContext';
import { LogOut } from 'lucide-react';
import { notificationService } from '@/services/notificationService';

const Header = ({ onOpenPostModal }) => {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState(null);

  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  useEffect(() => {
    if (isAuthenticated || Boolean(user)) {
      notificationService.getNotifications().then((res) => {
        if (res?.data) {
          setNotifications(res.data);
        }
      });
    }
  }, [isAuthenticated, user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const isLoggedIn = isAuthenticated || Boolean(user);
  const isRecruiterPage = pathname ? pathname.startsWith('/recruiter') : false;

  const candidateNavItems = [
    { 
      href: '/', 
      label: 'Home', 
      submenu: [
        { href: '/', label: 'Home Overview', desc: 'Main platform dashboard & features', icon: Layers },
        { href: '/categories', label: 'Browse Categories', desc: 'Explore top job sectors & skills', icon: Search }
      ] 
    },
    { 
      href: '/find-jobs', 
      label: 'Find Jobs', 
      submenu: [
        { href: '/find-jobs', label: 'Search All Jobs', desc: 'Filter by role, location & salary', icon: Search },
        { href: '/applications', label: 'My Applications', desc: 'Track your submitted job applications', icon: Briefcase },
        { href: '/Job-Matching', label: 'AI Job Matching', desc: 'Get jobs ranked by your AI score', icon: Target },
        { href: '/categories', label: 'Job Categories', desc: 'Browse tech, design, sales roles', icon: Briefcase },
        { href: '/signup', label: 'Create Job Alert', desc: 'Get daily matching job updates', icon: Sparkles }
      ] 
    },
    { 
      href: '/ai-services', 
      label: 'AI Services', 
      isMegaMenu: true,
      submenuGroups: [
        {
          title: "AI Career Tools",
          items: [
            { href: '/resume-review', label: 'AI Resume Review', desc: 'Instant ATS score & improvement tips', icon: FileCheck },
            { href: '/Job-Matching', label: 'AI Job Matching', desc: 'Smart AI matching for target roles', icon: Target },
            { href: '/guidance', label: 'AI Career Guidance', desc: 'Step-by-step career path roadmap', icon: Compass },
            { href: '/ai-services/skill-assessment', label: 'Skill Assessment', desc: 'Interactive skill tests & scoring', icon: Award }
          ]
        },
        {
          title: "AI Learning & Courses",
          items: [
            { href: '/ai-services/courses', label: 'Explore Courses', desc: 'Skill development video modules', icon: BookOpen },
            { href: '/ai-services/courses/python-for-data-science', label: 'Python for Data Science', desc: 'Complete interactive learning course', icon: Code2 },
            { href: '/ai-services/courses/generate', label: 'Generate Learning Path', desc: 'Custom AI-generated curriculum', icon: Sparkles },
            { href: '/ai-services', label: 'AI Hub Overview', desc: 'Explore all AI services & tools', icon: Layers }
          ]
        }
      ] 
    },
    { 
      href: '/blogs', 
      label: 'Blogs', 
      submenu: [
        { href: '/blogs', label: 'Latest Career Insights', desc: 'Articles, tips & hiring trends', icon: BookOpen },
        { href: '/blogs/blog1', label: 'Featured Article', desc: 'In-depth guide on resume building', icon: Sparkles },
        { href: '/ai-services/courses', label: 'Learning Resources', desc: 'Free guides & skill tutorials', icon: Code2 }
      ] 
    },
    { 
      href: '/about', 
      label: 'About Us', 
      submenu: [
        { href: '/about', label: 'About Hire Mind', desc: 'Our mission, vision & leadership', icon: Users },
        { href: '/testimonials', label: 'Success Stories', desc: 'See user reviews & hiring proofs', icon: Award }
      ] 
    },
    { 
      href: '/testimonials', 
      label: 'Testimonials', 
      submenu: [
        { href: '/testimonials', label: 'Job Seeker Stories', desc: 'User ratings & video feedback', icon: Users },
        { href: '/signup', label: 'Join Community', desc: 'Create account and get hired', icon: UserPlus }
      ] 
    },
    { 
      href: '/help', 
      label: 'Help', 
      submenu: [
        { href: '/login', label: 'Account Login', desc: 'Sign in to access your profile', icon: LogIn },
        { href: '/signup', label: 'Create Account', desc: 'Join Hire Mind platform', icon: UserPlus },
        { href: '/ai-services', label: 'Platform Guide', desc: 'Learn how to use AI tools', icon: HelpCircle }
      ] 
    },
  ];

  const recruiterNavItems = [
    { 
      href: '/recruiter', 
      label: 'Recruiter Dashboard', 
      submenu: [
        { href: '/recruiter', label: 'Dashboard Overview', desc: 'Overview, statistics & quick actions', icon: Layers },
        { href: '/recruiter/jobs', label: 'Manage Jobs', desc: 'View, publish & pause job postings', icon: Briefcase }
      ] 
    },
    { 
      href: '/recruiter/jobs', 
      label: 'Manage Jobs', 
      submenu: [
        { href: '/recruiter/jobs', label: 'All Vacancies', desc: 'Manage your job listings & applicants', icon: Briefcase }
      ] 
    },
    { 
      href: '/recruiter/applications/job-101', 
      label: 'Candidate Pipeline', 
      submenu: [
        { href: '/recruiter/applications/job-101', label: 'Applicant Kanban Board', desc: 'Screen, interview & move candidates', icon: Users }
      ] 
    },
  ];

  const navItems = isRecruiterPage ? recruiterNavItems : candidateNavItems;

  return (
    <header className="w-full bg-white border-b border-slate-100/50 sticky top-0 z-50 shadow-3xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Logo & Portal Badge */}
        <Link href={isRecruiterPage ? "/recruiter" : "/"} className="flex items-center gap-1.5 sm:gap-2 cursor-pointer select-none shrink-0">
          <Image src="/logo/Mind-hire-Logo.png" alt="HireMind" width={38} height={41} className="w-8 sm:w-[38px] h-auto" />
          <div className="tracking-tight flex items-center gap-1.5">
            <h1 className="font-poppins font-bold text-base sm:text-xl md:text-2xl bg-[linear-gradient(90deg,#010205_0%,#2D24D0_47.12%)] bg-clip-text text-transparent whitespace-nowrap">
              Hire Mind
            </h1>
            {isRecruiterPage && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#2D24D0]/10 text-[#2D24D0] font-extrabold text-[10px] tracking-wider uppercase border border-[#2D24D0]/20">
                Recruiter Portal
              </span>
            )}
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-3 xl:gap-5 text-[#0b0b0d] font-poppins font-medium text-xs lg:text-sm leading-none tracking-normal shrink-0">
          {navItems.map((item) => {
            const isActive = item.href === '/ai-services' 
              ? pathname.startsWith(item.href) 
              : item.href === '/recruiter'
                ? pathname === '/recruiter'
                : pathname.startsWith(item.href);
            const isOpen = activeDropdown === item.href;

            return (
              <div 
                key={item.href} 
                className="relative py-6 shrink-0" 
                onMouseEnter={() => setActiveDropdown(item.href)} 
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href={item.href} 
                  className={`flex items-center gap-1 py-1 px-1.5 lg:px-2 rounded-lg transition-all duration-150 whitespace-nowrap hover:text-[#2D24D0] hover:bg-[#2D24D0]/5 ${
                    isActive ? 'text-[#2D24D0] font-bold' : 'text-slate-700'
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  <ChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ease-out ${isOpen ? 'rotate-180 text-[#2D24D0]' : 'text-slate-400'}`} />
                </Link>

                {/* Dropdown Popover */}
                {item.isMegaMenu ? (
                  /* Mega Menu for AI Services */
                  <div 
                    className={`absolute left-1/2 top-full -translate-x-1/2 mt-0.5 w-[520px] rounded-2xl border border-slate-200/80 bg-white/98 backdrop-blur-md p-4 shadow-2xl transition-all duration-200 ease-out transform origin-top ${
                      isOpen 
                        ? 'visible opacity-100 scale-100 translate-y-0 pointer-events-auto' 
                        : 'invisible opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {item.submenuGroups?.map((group, groupIdx) => (
                        <div key={groupIdx} className="space-y-2">
                          <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-2.5">
                            {group.title}
                          </h4>
                          <div className="space-y-1">
                            {group.items.map((subItem, subIdx) => {
                              const IconComponent = subItem.icon;
                              return (
                                <Link 
                                  key={subIdx} 
                                  href={subItem.href} 
                                  onClick={() => setActiveDropdown(null)}
                                  className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#f0f2ff] group/item transition-all duration-150 text-left"
                                >
                                  <div className="p-1.5 rounded-lg bg-blue-50 text-[#2D24D0] group-hover/item:bg-[#2D24D0] group-hover/item:text-white transition-colors duration-150 shrink-0 mt-0.5 border border-blue-100">
                                    <IconComponent size={14} />
                                  </div>
                                  <div className="space-y-0.5">
                                    <h5 className="text-xs font-bold text-slate-800 group-hover/item:text-[#2D24D0] transition-colors leading-tight">
                                      {subItem.label}
                                    </h5>
                                    <p className="text-[10px] text-slate-400 font-medium leading-tight line-clamp-1">
                                      {subItem.desc}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Standard Dropdown Menu */
                  <div 
                    className={`absolute left-1/2 top-full -translate-x-1/2 mt-0.5 w-64 rounded-2xl border border-slate-200/80 bg-white/98 backdrop-blur-md p-2.5 shadow-2xl transition-all duration-200 ease-out transform origin-top ${
                      isOpen 
                        ? 'visible opacity-100 scale-100 translate-y-0 pointer-events-auto' 
                        : 'invisible opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="space-y-1">
                      {item.submenu?.map((subItem, subIdx) => {
                        const IconComponent = subItem.icon;
                        return (
                          <Link 
                            key={subIdx} 
                            href={subItem.href} 
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#f0f2ff] group/item transition-all duration-150 text-left"
                          >
                            <div className="p-1.5 rounded-lg bg-blue-50 text-[#2D24D0] group-hover/item:bg-[#2D24D0] group-hover/item:text-white transition-colors duration-150 shrink-0 mt-0.5 border border-blue-100">
                              <IconComponent size={14} />
                            </div>
                            <div className="space-y-0.5">
                              <h5 className="text-xs font-bold text-slate-800 group-hover/item:text-[#2D24D0] transition-colors leading-tight">
                                {subItem.label}
                              </h5>
                              <p className="text-[10px] text-slate-400 font-medium leading-tight">
                                {subItem.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Post New Job Button (in Recruiter Mode) */}
          {isRecruiterPage && onOpenPostModal && (
            <button
              onClick={onOpenPostModal}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-[#2D24D0] hover:bg-[#1e1c75] text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer active:scale-98"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post New Job</span>
            </button>
          )}



          {/* Language Selector (desktop only) */}
          <button className="hidden md:flex items-center gap-1 text-[#5e637d] text-xs font-semibold hover:text-[#101014] transition cursor-pointer select-none whitespace-nowrap">
            <FontAwesomeIcon icon={faGlobe} className="w-3.5 h-3.5 text-gray-400" />
            <span className="whitespace-nowrap">English</span>
            <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
          </button>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-1.5 sm:gap-3 relative">
              {/* Notification Bell Dropdown Button */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                  className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition cursor-pointer relative"
                  title="Notifications"
                >
                  <Bell size={16} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center border border-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown Modal */}
                {showNotifDropdown && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 px-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">Notifications</span>
                        {unreadCount > 0 && (
                          <span className="bg-indigo-50 text-[#2D24D0] font-extrabold text-[10px] px-2 py-0.5 rounded-full">
                            {unreadCount} New
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
                        }}
                        className="text-[10px] font-bold text-[#2D24D0] hover:underline"
                      >
                        Mark all as read
                      </button>
                    </div>

                    <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-1">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-6">No notifications yet.</p>
                      ) : (
                        notifications.map((n) => (
                          <Link
                            key={n.id}
                            href={n.actionUrl || '#'}
                            onClick={() => setShowNotifDropdown(false)}
                            className={`block p-2.5 rounded-xl transition hover:bg-slate-50 text-left ${!n.read ? 'bg-indigo-50/40' : ''}`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h5 className="text-xs font-bold text-slate-800 leading-snug">{n.title}</h5>
                              <span className="text-[9px] text-slate-400 font-medium shrink-0">{n.createdAt}</span>
                            </div>
                            <p className="text-[11px] text-slate-600 font-medium mt-0.5 leading-snug">{n.message}</p>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Avatar */}
              <Link 
                href="/profile" 
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition cursor-pointer group"
                title="Go to My Profile"
              >
                <div className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-[#2D24D0] text-white flex items-center justify-center font-bold text-sm shadow-sm border-2 border-[#2D24D0]/30 group-hover:border-[#2D24D0] shrink-0">
                  {user?.avatarUrl ? (
                    <img 
                      src={user.avatarUrl} 
                      alt={user.email || 'User'} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{(user?.email?.charAt(0) || user?.username?.charAt(0) || 'U').toUpperCase()}</span>
                  )}
                </div>
                <span className="hidden sm:inline font-bold text-[#101014] text-xs max-w-[120px] truncate">
                  {user?.username || user?.email?.split('@')[0] || 'My Profile'}
                </span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <button className="px-3.5 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-xl transition cursor-pointer">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#2D24D0] hover:bg-[#1e1c75] rounded-xl shadow-xs transition cursor-pointer active:scale-98">
                  Sign up
                </button>
              </Link>
            </div>
          )}

          {/* Hamburger Menu Toggle (mobile only) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Side Drawer Backdrop */}
      <div 
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Drawer Content */}
      <div 
        className={`fixed top-0 bottom-0 right-0 z-50 w-72 max-w-[80vw] bg-white shadow-2xl p-5 flex flex-col justify-between transition-transform duration-300 transform md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-5 overflow-y-auto">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-gray-150 pb-3">
            <div className="flex items-center gap-2">
              <Image src="/logo/Mind-hire-Logo.png" alt="HireMind" width={28} height={30} className="w-7 h-auto" />
              <h2 className="font-poppins font-bold text-base text-[#101014]">
                Hire Mind {isRecruiterPage && <span className="text-[10px] text-[#2D24D0] font-bold block">Recruiter Portal</span>}
              </h2>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Recruiter Quick Action buttons in Mobile Drawer */}
          {isRecruiterPage && (
            <div className="space-y-2 pb-2 border-b border-slate-150">
              {onOpenPostModal && (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); onOpenPostModal(); }}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-[#2D24D0] text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post New Job Opening</span>
                </button>
              )}
            </div>
          )}

          {/* Nav List for Mobile Drawer */}
          <nav className="space-y-2 text-left">
            {navItems.map((item) => {
              const isActive = item.href === '/recruiter' ? pathname === '/recruiter' : pathname.startsWith(item.href);
              const isExpanded = expandedMobileItem === item.href;

              return (
                <div key={item.href} className="space-y-1">
                  <div className="flex items-center justify-between bg-slate-50/70 p-2 rounded-xl border border-slate-100">
                    <Link 
                      href={item.href} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className={`text-xs font-bold transition ${
                        isActive ? 'text-[#2D24D0]' : 'text-slate-700'
                      }`}
                    >
                      {item.label}
                    </Link>
                    <button 
                      type="button" 
                      onClick={() => setExpandedMobileItem(isExpanded ? null : item.href)} 
                      className="p-1 text-slate-400 hover:text-[#2D24D0]"
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180 text-[#2D24D0]' : ''}`} />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="ml-3 pl-3 border-l-2 border-[#2D24D0]/20 space-y-1.5 pt-1">
                      {item.isMegaMenu ? (
                        item.submenuGroups?.map((group, gIdx) => (
                          <div key={gIdx} className="space-y-1">
                            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block pt-1">
                              {group.title}
                            </span>
                            {group.items.map((sub, sIdx) => (
                              <Link 
                                key={sIdx} 
                                href={sub.href} 
                                onClick={() => setIsMobileMenuOpen(false)} 
                                className="block py-1 text-[11px] font-semibold text-slate-600 hover:text-[#2D24D0]"
                              >
                                • {sub.label}
                              </Link>
                            ))}
                          </div>
                        ))
                      ) : (
                        item.submenu?.map((sub, sIdx) => (
                          <Link 
                            key={sIdx} 
                            href={sub.href} 
                            onClick={() => setIsMobileMenuOpen(false)} 
                            className="block py-1 text-[11px] font-semibold text-slate-600 hover:text-[#2D24D0]"
                          >
                            • {sub.label}
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom controls */}
        <div className="border-t border-gray-150 pt-3 space-y-3 text-left">
          {isLoggedIn && (
            <div className="flex items-center gap-2 px-1">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-[#2D24D0] text-white flex items-center justify-center font-bold text-xs">
                <span>{(user?.email?.charAt(0) || user?.username?.charAt(0) || 'U').toUpperCase()}</span>
              </div>
              <span className="text-xs font-extrabold text-[#101014] truncate">{user?.username || user?.email || 'My Account'}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold px-1 select-none">
            <span>Language: English</span>
            <button className="text-[#2D24D0] hover:underline cursor-pointer">Change</button>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;

