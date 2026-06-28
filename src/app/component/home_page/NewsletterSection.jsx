"use client";
import React, { useState } from 'react';
import Image from 'next/image';


const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Aap yahan apni subscription logic handle kar sakte hain
    console.log('Subscribed email:', email);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 py-8">
      {/* Main Container with light lavender background */}
      <div className="bg-[#EEF0FC] border border-[#DCE1F8] rounded-2xl p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
        
        {/* Left Side: Illustration and Content */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 max-w-2xl">
          {/* Illustration Container (Aap apni dynamic image yahan lga sakte hain) */}
          <div className="w-24 h-24 shrink-0 flex items-center justify-center">
            {/* Placeholder representation for the folder/download graphic */}
            <div className="relative w-full h-full  rounded-lg  shadow-2xs flex items-center justify-center">
             <img src="/avatars/email.png" alt="" />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-1.5 justify-center h-full pt-1">
            <h2 className="text-xl md:text-2xl font-bold text-gray-950 tracking-tight">
              Don&apos;t Miss New Opportunities
            </h2>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-md">
              Subscribe to get the latest job updates, career tips, and exclusive offers.
            </p>
          </div>
        </div>

        {/* Right Side: Form Input field */}
        <form 
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center w-full lg:w-auto gap-3 sm:gap-4 max-w-md lg:max-w-none"
        >
          {/* Input Box with Mail Icon */}
          <div className="relative w-full sm:w-80 md:w-96">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              {/* Mail Icon */}
              <svg 
                className="h-5 w-5 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white text-sm text-gray-900 border border-gray-300 rounded-xl pl-12 pr-4 py-3.5 focus:outline-hidden focus:ring-2 focus:ring-[#5B65F2] focus:border-transparent placeholder:text-gray-400 shadow-2xs"
            />
          </div>

          {/* Subscribe Button */}
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#5B65F2] hover:bg-[#4A54E1] text-white font-medium text-sm py-3.5 px-6 rounded-xl inline-flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer"
          >
            Subscribe
            {/* Paper Airplane Send Icon */}
            <svg 
              className="w-4 h-4" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M3.4 22a.8.8 0 0 1-.74-1.12L5.8 13H12a1 1 0 0 0 0-2H5.8L2.66 3.12a.8.8 0 0 1 .74-1.12.84.84 0 0 1 .38.1l18 9a.8.8 0 0 1 0 1.44l-18 9a.84.84 0 0 1-.38.1Z" />
            </svg>
          </button>
        </form>

      </div>
    </div>
  );
};

export default NewsletterSection;