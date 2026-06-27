import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          {/* Jab aapke paas logo image ho, to is comment ko hata kar Image tag use karein:
          <Image src="/logo.png" alt="HireMind" width={150} height={40} priority /> */}
          <Image src="/logo/Mind-hire-Logo.png" alt="HireMind" width={41} height={44} />
          <div className="tracking-tight flex items-center gap-1">
  <h1 className="font-poppins font-medium  text-2xl bg-[linear-gradient(90deg,#010205_0%,#2D24D0_47.12%)] bg-clip-text text-transparent">
    Hire Mind
  </h1>
</div>
        </Link>

        {/* Navigation Links */}
       <nav className="hidden md:flex items-center gap-8 text-black font-poppins font-medium text-base leading-none tracking-normal">
  <Link href="/" className="text-[#4240E5] hover:text-[#4240E5] transition">Home</Link>
  <Link href="/find-jobs" className="hover:text-[#4240E5] transition">Find Jobs</Link>
  <Link href="/blogs" className="hover:text-[#4240E5] transition">Blogs</Link>
  <Link href="/ai-services" className="hover:text-[#4240E5] transition">AI Services</Link>
  <Link href="/about" className="hover:text-[#4240E5] transition">About Us</Link>
  <Link href="/help" className="hover:text-[#4240E5] transition">Help</Link>
</nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <button className="flex items-center gap-1.5 text-gray-600 text-sm font-medium hover:text-gray-900 transition mr-2">
            <span><FontAwesomeIcon icon={faGlobe} className="w-4 h-4 text-gray-400" /></span> English
          </button>
          
          {/* Auth Buttons */}
          <Link href="/login">
            <button className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-lg transition">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition">
              Sign up
            </button>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;