"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState(null);
  const isLoggedIn = pathname.startsWith('/ai-services');
  const navItems = [
    { href: '/', label: 'Home', submenu: [{ href: '/', label: 'Home overview' }, { href: '/categories', label: 'Browse categories' }] },
    { href: '/find-jobs', label: 'Find Jobs', submenu: [{ href: '/find-jobs', label: 'Search all jobs' }, { href: '/categories', label: 'Job categories' }, { href: '/signup', label: 'Create job alert' }] },
    { href: '/blogs', label: 'Blogs', submenu: [{ href: '/', label: 'Latest career insights' }, { href: '/ai-services/courses', label: 'Learning resources' }] },
    { href: '/ai-services', label: 'AI Services', submenu: [{ href: '/ai-services', label: 'AI services overview' }, { href: '/ai-services/skill-assessment', label: 'Skill assessment' }, { href: '/ai-services/courses', label: 'Explore courses' }, { href: '/ai-services/courses/generate', label: 'Generate learning path' }] },
    { href: '/about', label: 'About Us', submenu: [{ href: '/about', label: 'About Hire Mind' }, { href: '/testimonials', label: 'Success stories' }] },
    { href: '/testimonials', label: 'Testimonials', submenu: [{ href: '/testimonials', label: 'Job seeker stories' }, { href: '/signup', label: 'Join the community' }] },
    { href: '/help', label: 'Help', submenu: [{ href: '/login', label: 'Account login' }, { href: '/signup', label: 'Create an account' }, { href: '/ai-services', label: 'AI services guide' }] },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
          <Image src="/logo/Mind-hire-Logo.png" alt="HireMind" width={38} height={41} className="w-8 sm:w-[38px] h-auto" />
          <div className="tracking-tight flex items-center gap-1">
            <h1 className="font-poppins font-medium text-base sm:text-xl md:text-2xl bg-[linear-gradient(90deg,#010205_0%,#2D24D0_47.12%)] bg-clip-text text-transparent">
              Hire Mind
            </h1>
          </div>
        </Link>

        {/* Navigation Links (desktop only) */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-[#0b0b0d] font-poppins font-medium text-xs lg:text-sm leading-none tracking-normal">
          {navItems.map(({ href, label, submenu }) => {
            const isActive = href === '/ai-services' ? pathname.startsWith(href) : pathname === href;
            return (
              <div key={href} className="relative" onMouseEnter={() => setActiveDropdown(href)} onMouseLeave={() => setActiveDropdown(null)}>
                <Link href={href} aria-haspopup="menu" aria-expanded={activeDropdown === href} className={`flex items-center gap-1 py-7 hover:text-[#4240E5] transition ${isActive ? 'text-[#4240E5]' : ''}`}>
                  {label}
                  <svg className={`h-3 w-3 transition-transform ${activeDropdown === href ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" /></svg>
                </Link>
                <div role="menu" className={`absolute left-1/2 top-full w-56 -translate-x-1/2 rounded-xl border border-[#e5e7eb] bg-white p-2 shadow-xl transition-all duration-150 ${activeDropdown === href ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}>
                  {submenu.map((item) => (
                    <Link key={`${href}-${item.label}`} href={item.href} role="menuitem" className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-[#eef0ff] hover:text-[#2D24D0]" onClick={() => setActiveDropdown(null)}>{item.label}</Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          
          {/* Language Selector (desktop only) */}
          <button className="hidden md:flex items-center gap-1 text-[#5e637d] text-sm font-semibold hover:text-[#101014] transition cursor-pointer">
            <FontAwesomeIcon icon={faGlobe} className="w-4 h-4 text-gray-400" />
            <span>English</span>
            <svg className="w-3.5 h-3.5 text-gray-400 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
          </button>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-1.5 sm:gap-4">
              {/* Notification Bell (desktop only) */}
              <button className="hidden md:flex relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition cursor-pointer">
                <svg className="w-6 h-6 text-[#ffa000]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                </svg>
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#ffa000] border-2 border-white rounded-full"></span>
              </button>
              
              {/* User Profile */}
              <button className="flex items-center gap-1 sm:gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition cursor-pointer">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                  <img 
                    src="https://api.dicebear.com/7.x/initials/svg?seed=Aman+Singh" 
                    alt="Aman Singh" 
                    className="w-full h-full object-cover animate-fade-in"
                  />
                </div>
                <span className="hidden sm:inline font-semibold text-[#101014]">Aman Singh</span>
                <svg className="hidden sm:block w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Auth Buttons */}
              <Link href="/login">
                <button className="px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-lg transition cursor-pointer">
                  Login
                </button>
              </Link>
              <Link href="/signup" className="hidden sm:inline-block">
                <button className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition cursor-pointer">
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

      {/* Side Drawer Backdrop Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Side Drawer Content Panel */}
      <div 
        className={`fixed top-0 bottom-0 right-0 z-50 w-72 max-w-[80vw] bg-white shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 transform md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-6">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-gray-150 pb-4">
            <div className="flex items-center gap-2">
              <Image src="/logo/Mind-hire-Logo.png" alt="HireMind" width={28} height={30} className="w-7 h-auto" />
              <h2 className="font-poppins font-bold text-base text-[#101014]">Hire Mind</h2>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Nav List */}
          <nav className="space-y-3 text-left">
            {navItems.map(({ href, label, submenu }) => {
              const isActive = href === '/ai-services' ? pathname.startsWith(href) : pathname === href;
              return (
                <div key={href}>
                  <div className="flex items-center">
                    <Link href={href} onClick={() => setIsMobileMenuOpen(false)} className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition ${
                    isActive 
                      ? 'bg-[#2D24D0]/10 text-[#2D24D0]' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-[#2D24D0]'
                    }`}>{label}</Link>
                    <button type="button" aria-label={`Show ${label} links`} onClick={() => setExpandedMobileItem(expandedMobileItem === href ? null : href)} className="p-2 text-slate-500">
                      <svg className={`h-3.5 w-3.5 transition-transform ${expandedMobileItem === href ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" /></svg>
                    </button>
                  </div>
                  {expandedMobileItem === href && <div className="ml-4 border-l border-[#dfe1fa] pl-3">{submenu.map((item) => <Link key={`${href}-${item.label}`} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-[11px] font-semibold text-slate-500 hover:text-[#2D24D0]">{item.label}</Link>)}</div>}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom controls */}
        <div className="border-t border-gray-150 pt-4 space-y-4 text-left">
          {isLoggedIn && (
            <div className="flex items-center gap-2.5 px-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                <img src="https://api.dicebear.com/7.x/initials/svg?seed=Aman+Singh" alt="Aman Singh" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-extrabold text-[#101014]">Aman Singh</span>
            </div>
          )}
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold px-2 select-none">
            <span>Language: English</span>
            <button className="text-[#2D24D0] hover:underline cursor-pointer">Change</button>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;
