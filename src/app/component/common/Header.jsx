"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">

      {/* ================= MAIN HEADER ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/logo/Mind-hire-Logo.png"
            alt="HireMind"
            width={41}
            height={44}
            className="w-9 h-10 sm:w-[41px] sm:h-[44px] object-contain"
          />

          <div className="tracking-tight flex items-center gap-1">
            <h1 className="font-poppins font-medium text-xl sm:text-2xl bg-[linear-gradient(90deg,#010205_0%,#2D24D0_47.12%)] bg-clip-text text-transparent">
              Hire Mind
            </h1>
          </div>
        </Link>


        {/* ================= DESKTOP NAVIGATION ================= */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-8 text-black font-poppins font-medium text-sm lg:text-base leading-none">

          <Link
            href="/"
            className="text-[#4240E5] hover:text-[#4240E5] transition"
          >
            Home
          </Link>

          <Link
            href="/find-jobs"
            className="hover:text-[#4240E5] transition"
          >
            Find Jobs
          </Link>

          <Link
            href="/blogs"
            className="hover:text-[#4240E5] transition"
          >
            Blogs
          </Link>

          <Link
            href="/ai-services"
            className="hover:text-[#4240E5] transition"
          >
            AI Services
          </Link>

          <Link
            href="/about"
            className="hover:text-[#4240E5] transition"
          >
            About Us
          </Link>

          <Link
            href="/help"
            className="hover:text-[#4240E5] transition"
          >
            Help
          </Link>

        </nav>


        {/* ================= DESKTOP RIGHT SIDE ================= */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">

          {/* Language */}
          <button className="flex items-center gap-1.5 text-gray-600 text-sm font-medium hover:text-gray-900 transition mr-1 lg:mr-2">

            <FontAwesomeIcon
              icon={faGlobe}
              className="w-4 h-4 text-gray-400"
            />

            <span className="hidden lg:inline">
              English
            </span>

          </button>


          {/* Login */}
          <Link href="/login">
            <button className="px-3 lg:px-5 py-2 lg:py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-lg transition">
              Login
            </button>
          </Link>


          {/* Sign Up */}
          <Link href="/signup">
            <button className="px-3 lg:px-5 py-2 lg:py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition">
              Sign up
            </button>
          </Link>

        </div>


        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
          aria-label="Open menu"
        >
          <FontAwesomeIcon
            icon={faBars}
            className="w-5 h-5 text-gray-700"
          />
        </button>

      </div>


      {/* ===================================================== */}
      {/* ================= MOBILE SIDE DRAWER ================= */}
      {/* ===================================================== */}

      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />


          {/* Side Drawer */}
          <div className="fixed top-0 right-0 h-full w-72 sm:w-80 bg-white z-50 shadow-2xl md:hidden">

            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">

              <h2 className="text-lg font-semibold text-gray-800">
                Menu
              </h2>

              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
                aria-label="Close menu"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="w-5 h-5 text-gray-700"
                />
              </button>

            </div>


            {/* ================= MOBILE NAVIGATION ================= */}
            <nav className="flex flex-col px-5 py-5 gap-1">

              {/* Home */}
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-[#4240E5] hover:bg-gray-50 font-medium transition"
              >
                Home
              </Link>


              {/* Find Jobs */}
              <Link
                href="/find-jobs"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-gray-50 font-medium transition"
              >
                Find Jobs
              </Link>


              {/* Blogs */}
              <Link
                href="/blogs"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-gray-50 font-medium transition"
              >
                Blogs
              </Link>


              {/* AI Services */}
              <Link
                href="/ai-services"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-gray-50 font-medium transition"
              >
                AI Services
              </Link>


              {/* About */}
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-gray-50 font-medium transition"
              >
                About Us
              </Link>


              {/* Help */}
              <Link
                href="/help"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-gray-50 font-medium transition"
              >
                Help
              </Link>


              {/* ================= LANGUAGE ================= */}
              <button className="flex items-center gap-2 px-4 py-3 text-gray-600 font-medium">

                <FontAwesomeIcon
                  icon={faGlobe}
                  className="w-4 h-4 text-gray-400"
                />

                English

              </button>


              {/* ================= AUTH BUTTONS ================= */}
              <div className="flex gap-3 pt-4">

                {/* Login */}
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1"
                >
                  <button className="w-full px-4 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    Login
                  </button>
                </Link>


                {/* Sign Up */}
                <Link
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1"
                >
                  <button className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition">
                    Sign up
                  </button>
                </Link>

              </div>

            </nav>

          </div>
        </>
      )}

    </header>
  );
};

export default Header;