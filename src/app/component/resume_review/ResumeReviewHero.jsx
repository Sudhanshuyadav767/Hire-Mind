import Image from "next/image";
import { FolderCheck, MailCheck, FileSpreadsheet } from "lucide-react";

export default function ResumeReviewHero() {
  return (
    <section className="bg-[#E2E4F8] px-4 py-8 lg:px-10 rounded-b-3xl my-2 mx-auto max-w-7xl shadow-3xs overflow-hidden">
      <div className="mx-auto max-w-7xl grid grid-cols-12 gap-6 items-center">
        
        {/* Left Column Text & Highlights */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center text-left space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-[#1E2229] tracking-tight leading-tight">
            AI Resume Review
          </h1>

          <p className="text-sm sm:text-base lg:text-lg font-poppins font-semibold text-[#2D24D0]">
            Get AI-Powered Feedback. Build a Stronger Resume. Land Your Dream Job.
          </p>

          <p className="text-[#5E637D] text-xs sm:text-sm max-w-xl leading-relaxed font-poppins font-medium">
            Upload your resume and get instant, AI-Powered feedback to improve your resume&apos;s impact, clarity, and chances of getting shortlisted.
          </p>

          {/* 3 Highlight Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            <div className="flex items-center gap-2.5 bg-white/70 backdrop-blur-xs p-2.5 rounded-2xl border border-white/60 shadow-3xs">
              <div className="w-8 h-8 rounded-full bg-[#2D24D0]/10 text-[#2D24D0] flex items-center justify-center shrink-0">
                <FolderCheck size={16} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[11px] font-bold text-[#1E2229] leading-tight">Instant AI Feedback</h4>
                <p className="text-[9px] text-[#5E637D] font-medium leading-tight">Get actionable suggestions in seconds.</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/70 backdrop-blur-xs p-2.5 rounded-2xl border border-white/60 shadow-3xs">
              <div className="w-8 h-8 rounded-full bg-[#2D24D0]/10 text-[#2D24D0] flex items-center justify-center shrink-0">
                <MailCheck size={16} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[11px] font-bold text-[#1E2229] leading-tight">ATS Friendly Score</h4>
                <p className="text-[9px] text-[#5E637D] font-medium leading-tight">Check how will your resume passes ATS systems.</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/70 backdrop-blur-xs p-2.5 rounded-2xl border border-white/60 shadow-3xs">
              <div className="w-8 h-8 rounded-full bg-[#2D24D0]/10 text-[#2D24D0] flex items-center justify-center shrink-0">
                <FileSpreadsheet size={16} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[11px] font-bold text-[#1E2229] leading-tight">Export-Level Tips</h4>
                <p className="text-[9px] text-[#5E637D] font-medium leading-tight">Improve content, formate & structure like a pro.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Image Container with circular backdrop */}
        <div className="col-span-12 lg:col-span-5 relative flex items-center justify-center h-[220px] sm:h-[280px] shrink-0">
          {/* Blue backdrop circle */}
          <div className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-[#2D24D0]/20 z-0" />
          
          {/* Image */}
          <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden border-4 border-white shadow-md z-10">
            <Image 
              src="/Images/testimonials_hero_woman.jpg" 
              alt="AI Resume Review Illustration"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
