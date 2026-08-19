import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faInstagram, 
  faXTwitter, 
  faLinkedinIn, 
  faTelegram 
} from '@fortawesome/free-brands-svg-icons';

import { AppStoreButton, GooglePlayButton } from '@/component/base/buttons/app-store-buttons';

const Footer = () => {
  return (
    <footer className="w-full bg-[#E3E4F9] text-[#1E2229] pt-16 pb-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 xl:px-12">
        
        {/* Balanced Grid Spacing */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-y-8 gap-x-6 md:gap-x-10 items-start">
          
          {/* Column 1: Brand Logo */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <Image src="/logo/Mind-hire-Logo.png" alt="HireMind" width={41} height={44} />
              <h1 className="font-poppins font-semibold text-xl bg-[linear-gradient(90deg,#010205_0%,#2D24D0_47.12%)] bg-clip-text text-transparent whitespace-nowrap">
                Hire Mind
              </h1>
            </div>
            <p className="text-[10px] text-gray-500 font-medium tracking-wide  ml-8 whitespace-nowrap">
              Find Jobs. Build Future.
            </p>
          </div>

          {/* Column 2: Job Seekers */}
          <div>
            <h4 className="text-[#1E2229] font-bold text-sm mb-4 whitespace-nowrap">For Job Seekers</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/browse" className="hover:text-indigo-600 transition">Browse Jobs</Link></li>
              <li><Link href="/internships" className="hover:text-indigo-600 transition">Internships</Link></li>
              <li><Link href="/projects" className="hover:text-indigo-600 transition">Freelance Projects</Link></li>
              <li><Link href="/guidance" className="hover:text-indigo-600 transition">Career Guidance</Link></li>
            </ul>
          </div>

          {/* Column 3: Employers */}
          <div>
            <h4 className="text-[#1E2229] font-bold text-sm mb-4 whitespace-nowrap">For Employers</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/post-job" className="hover:text-indigo-600 transition">Post a Job</Link></li>
              <li><Link href="/candidates" className="hover:text-indigo-600 transition">Find Candidates</Link></li>
              <li><Link href="/solutions" className="hover:text-indigo-600 transition">Recruitment Solutions</Link></li>
              <li><Link href="/pricing" className="hover:text-indigo-600 transition">Pricing</Link></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 className="text-[#1E2229] font-bold text-sm mb-4 whitespace-nowrap">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/career-tips" className="hover:text-indigo-600 transition">Career Tips</Link></li>
              <li><Link href="/resume-builder" className="hover:text-indigo-600 transition">Resume Builder</Link></li>
              <li><Link href="/interview-guide" className="hover:text-indigo-600 transition">Interview Guide</Link></li>
              <li><Link href="/help-center" className="hover:text-indigo-600 transition">Help Center</Link></li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div>
            <h4 className="text-[#1E2229] font-bold text-sm mb-4 whitespace-nowrap">Company</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-indigo-600 transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-600 transition">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-indigo-600 transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-600 transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Column 6: Socials & App Downloads */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-6 md:pl-2 min-w-[220px]">
            {/* Follow Us */}
            <div>
              <h4 className="text-[#1E2229] font-bold text-sm mb-3 whitespace-nowrap">Follow Us</h4>
              <div className="flex items-center gap-2">
                {/* Facebook */}
                 <Link href="https://facebook.com" target="_blank" className="w-7 h-7 bg-[#3B5998] text-white rounded-full flex items-center justify-center hover:opacity-90 transition">
                                   <FontAwesomeIcon icon={faFacebookF} className="text-[13px] text-[#FAF8FF] w-3" />
                                 </Link>
                                 
                                 {/* Instagram */}
                                 <Link href="https://instagram.com" target="_blank" className="w-7 h-7 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 text-white rounded-full flex items-center justify-center hover:opacity-90 transition">
                                   <FontAwesomeIcon icon={faInstagram} className="text-[14px] text-[#FAF8FF] w-3.5" />
                                 </Link>
                                 
                                 {/* X (Twitter) */}
                                 <Link href="https://x.com" target="_blank" className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center hover:opacity-90 transition">
                                   <FontAwesomeIcon icon={faXTwitter} className="text-[13px] text-[#FAF8FF] w-3" />
                                 </Link>
                                 
                                 {/* LinkedIn */}
                                 <Link href="https://linkedin.com" target="_blank" className="w-7 h-7 bg-[#0077B5] text-white rounded-full flex items-center justify-center hover:opacity-90 transition">
                                   <FontAwesomeIcon icon={faLinkedinIn} className="text-[13px] text-[#FAF8FF] w-3" />
                                 </Link>
                                 
                                 {/* Telegram */}
                                 <Link href="https://telegram.org" target="_blank" className="w-7 h-7 bg-[#0088cc] text-white rounded-full flex items-center justify-center hover:opacity-90 transition">
                                   <FontAwesomeIcon icon={faTelegram} className="text-[14px] text-[#FAF8FF] w-3.5" />
                                 </Link>
              </div>
            </div>

            {/* Download Our App */}
            <div>
              <h4 className="text-[#1E2229] font-bold text-sm mb-3 whitespace-nowrap">Download Our App</h4>
              <div className="flex flex-row items-center gap-2">
                <GooglePlayButton href="https://play.google.com" className="h-10 w-auto object-contain" />
                <AppStoreButton href="https://apple.com" className="h-10 w-auto object-contain" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;