import Header from "@/app/component/common/Header";
import Footer from "@/app/component/common/Footer";
import Link from "next/link";
import Image from "next/image";

import {
  Sparkles,
  BadgeCheck,
  GraduationCap,
  Upload,
  Lock,
} from "lucide-react";

import { review } from "@/Data/data";
import Reviewreport from "../component/Resume1-review/Reviewreport";

export default function HeroSection() {
  return (
    <>
      <Header />

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="bg-[#F3F0FF] py-8 sm:py-10 lg:py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">

            {/* LEFT CONTENT */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                AI Resume Review
              </h1>

              <p className="mt-3 text-base font-medium text-blue-600 sm:text-lg lg:text-xl">
                Get AI-Powered Feedback. Build a Stronger Resume.
                <br className="hidden sm:block" />
                Land Your Dream Job.
              </p>

              <p className="mt-5 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
                Upload your resume and get instant AI-powered feedback
                to improve your resume&apos;s impact, clarity, and chances
                of getting shortlisted.
              </p>

              {/* FEATURES */}
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">

                {/* FEATURE 1 */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow">
                    <Sparkles size={21} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Instant AI Feedback
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                      Get actionable suggestions in seconds.
                    </p>
                  </div>
                </div>

                {/* FEATURE 2 */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow">
                    <BadgeCheck size={21} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      ATS Friendly Score
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                      Check how well your resume passes ATS systems.
                    </p>
                  </div>
                </div>

                {/* FEATURE 3 */}
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow">
                    <GraduationCap size={21} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Expert Tips
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                      Improve content, format & structure.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px]">
                <Image
                  src="/Images/Hero_Homepage.png"
                  alt="AI Resume Review"
                  width={420}
                  height={420}
                  priority
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          UPLOAD + HOW IT WORKS
      ===================================================== */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* ================= UPLOAD RESUME ================= */}
          <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-6">

            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Upload Your Resume
            </h2>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Supported format: PDF, DOC, DOCX (Max size: 5 MB)
            </p>

            {/* DROP AREA */}
            <div className="mt-5 flex min-h-[350px] flex-col items-center justify-center rounded-xl border-2 border-dashed bg-[#F3F0FF] p-5 sm:min-h-[400px]">

              <Upload className="h-10 w-10 text-blue-600 sm:h-12 sm:w-12" />

              <p className="mt-4 text-center text-sm text-gray-600 sm:text-base">
                Drag & Drop your resume here
              </p>

              <p className="my-3 text-sm text-gray-500">
                or
              </p>

              <Link
                href="/Chose-file"
                className="mb-5 rounded-lg bg-indigo-600 px-7 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 sm:px-8 sm:text-base"
              >
                Choose File
              </Link>

            </div>

            {/* SECURITY */}
            <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-gray-500 sm:text-sm">
              <Lock size={16} />
              <span>Your data is secure and confidential</span>
            </div>

          </div>


          {/* ================= HOW IT WORKS ================= */}
          <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-6">

            <h2 className="mb-7 text-2xl font-bold text-gray-900 sm:text-3xl">
              How It Works?
            </h2>

            <div className="space-y-8">

              {/* STEP 1 */}
              <div className="flex gap-4 sm:gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-base font-bold text-white sm:h-12 sm:w-12 sm:text-lg">
                  1
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                    Upload Your Resume
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500 sm:text-base">
                    Upload your resume in PDF or DOC format.
                  </p>
                </div>
              </div>


              {/* STEP 2 */}
              <div className="flex gap-4 sm:gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-base font-bold text-white sm:h-12 sm:w-12 sm:text-lg">
                  2
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                    AI Reviews It
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500 sm:text-base">
                    Our AI analyzes your content, structure and ATS
                    compatibility.
                  </p>
                </div>
              </div>


              {/* STEP 3 */}
              <div className="flex gap-4 sm:gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-base font-bold text-white sm:h-12 sm:w-12 sm:text-lg">
                  3
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-900 sm:text-lg">
                    Get Actionable Feedback
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-500 sm:text-base">
                    Receive score, suggestions and improve your resume.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* =====================================================
          WHAT OUR AI REVIEW
      ===================================================== */}
      <section className="mx-auto mt-2 w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-6 lg:p-8">

          <h2 className="mb-7 text-2xl font-bold text-gray-900 sm:text-3xl">
            What Our AI Review
          </h2>

          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

            {review.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center px-2 text-center"
              >
                <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                  {item.title}
                </h3>

                <p className="mt-1 whitespace-pre-line text-sm leading-6 text-gray-500">
                  {item.disc}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          REVIEW REPORT
      ===================================================== */}
      <section className="mx-auto mt-4 w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Reviewreport />
      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}
      <Footer />
    </>
  );
}