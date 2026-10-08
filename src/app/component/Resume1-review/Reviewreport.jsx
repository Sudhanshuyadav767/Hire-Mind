import Image from "next/image";

import { review1, review2 } from "@/Data/data";

import {
  Clock,
  TrendingUp,
  Lightbulb,
  Lock,
  Upload,
  FileCheck,
  FileText,
  ClipboardCheck,
} from "lucide-react";

export default function Reviewreport() {
  return (
    <>
      {/* =====================================================
          MAIN REPORT SECTION
      ===================================================== */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* =================================================
              LEFT - AI REVIEW REPORT
          ================================================= */}
          <div className="w-full rounded-xl border bg-white shadow-sm">

            <h2 className="border-b px-4 py-4 text-lg font-semibold text-gray-900 sm:text-xl">
              Sample AI Review Report
            </h2>

            {/* SCORE + PROGRESS */}
            <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2">

              {/* SCORE */}
              <div className="flex items-center gap-5">

                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-blue-600">
                  <div className="text-center">
                    <h2 className="text-3xl font-semibold leading-none text-gray-900">
                      87
                    </h2>

                    <p className="mt-1 text-sm font-medium text-gray-500">
                      /100
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Overall Score
                  </h3>

                  <p className="mt-1 text-sm font-medium text-blue-600">
                    Great Job!
                  </p>

                  <p className="mt-1 text-sm leading-5 text-gray-600">
                    Your resume is strong. A few improvements can make it
                    excellent.
                  </p>
                </div>

              </div>


              {/* PROGRESS BARS */}
              <div className="w-full space-y-4">
                {review1.map((item, index) => (
                  <div key={index} className="w-full">

                    <div className="flex items-center gap-2">

                      <span className="w-20 shrink-0 text-xs text-gray-600 sm:text-sm">
                        {item.label}
                      </span>

                      <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: item.color,
                            width: item.width,
                          }}
                        />
                      </div>

                      <span className="w-8 text-right text-xs font-medium text-gray-700 sm:text-sm">
                        {item.score}
                      </span>

                    </div>

                  </div>
                ))}
              </div>

            </div>


            {/* =================================================
                TOP SUGGESTIONS
            ================================================= */}
            <div className="border-t">

              <h3 className="px-4 py-4 text-lg font-semibold text-gray-900 sm:text-xl">
                Top Suggestions
              </h3>

              <div className="space-y-1 px-4 pb-5">

                {/* Suggestion 1 */}
                <div className="flex items-start gap-3 rounded-lg p-2">
                  <FileCheck
                    size={19}
                    className="mt-1 shrink-0 text-blue-600"
                  />

                  <p className="text-sm leading-6 text-gray-600 sm:text-base">
                    Add more quantifiable achievements to showcase your impact
                  </p>
                </div>


                {/* Suggestion 2 */}
                <div className="flex items-start gap-3 rounded-lg p-2">
                  <FileText
                    size={19}
                    className="mt-1 shrink-0 text-blue-600"
                  />

                  <p className="text-sm leading-6 text-gray-600 sm:text-base">
                    Include more relevant keywords related to your target role
                  </p>
                </div>


                {/* Suggestion 3 */}
                <div className="flex items-start gap-3 rounded-lg p-2">
                  <ClipboardCheck
                    size={19}
                    className="mt-1 shrink-0 text-blue-600"
                  />

                  <p className="text-sm leading-6 text-gray-600 sm:text-base">
                    Improve formatting in some sections for better readability
                  </p>
                </div>

              </div>
            </div>

          </div>


          {/* =================================================
              RIGHT - RESUME SUMMARY
          ================================================= */}
          <div className="w-full rounded-xl border bg-white p-4 shadow-sm sm:p-6">

            <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
              Resume Summary
            </h2>

            <div className="mt-6 space-y-6">

              {review2.map((item, index) => (
                <div key={index} className="space-y-6">

                  {/* FILE NAME */}
                  <div>
                    <h3 className="text-base font-medium text-gray-900 sm:text-lg">
                      File Name:
                    </h3>

                    <p className="mt-2 break-all text-sm text-gray-600">
                      {item.name}
                    </p>
                  </div>


                  {/* UPLOADED DATE */}
                  <div>
                    <h3 className="text-base font-medium text-gray-900 sm:text-lg">
                      Uploaded on:
                    </h3>

                    <p className="mt-2 text-sm text-gray-600">
                      {item.time}
                    </p>
                  </div>


                  {/* STATUS */}
                  <div>
                    <h3 className="text-base font-medium text-gray-900 sm:text-lg">
                      Review Status:
                    </h3>

                    <span className="mt-4 inline-flex rounded-xl bg-green-100 px-5 py-2.5 text-sm font-medium text-green-600 shadow-sm">
                      Completed
                    </span>
                  </div>


                  {/* BUTTON */}
                  <button
                    className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-md transition hover:bg-blue-700 sm:w-auto sm:px-8"
                  >
                    Review Another Resume
                  </button>

                </div>
              ))}

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          WHY USE OUR AI RESUME REVIEW
      ===================================================== */}
      <section className="mx-auto mt-6 w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="rounded-xl border bg-white px-4 py-6 shadow-sm sm:px-6 lg:px-8">

          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Why Use Our AI Resume Review
          </h2>


          <div className="mt-7 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">

            {/* SAVE TIME */}
            <div className="flex items-center gap-3">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-[#DCCEFF]">
                <Clock className="h-7 w-7 text-blue-600" />
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Save Time
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  Get instant feedback in seconds
                </p>
              </div>

            </div>


            {/* SHORTLIST */}
            <div className="flex items-center gap-3">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-[#DCCEFF]">
                <TrendingUp className="h-7 w-7 text-blue-600" />
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Increase Shortlist Chances
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  Make your resume ATS-friendly and recruiter ready
                </p>
              </div>

            </div>


            {/* IMPROVE */}
            <div className="flex items-center gap-3">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-[#DCCEFF]">
                <Lightbulb className="h-7 w-7 text-blue-600" />
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Improve Effectively
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  Get actionable tips to improve your resume
                </p>
              </div>

            </div>


            {/* CONFIDENTIAL */}
            <div className="flex items-center gap-3">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-[#DCCEFF]">
                <Lock className="h-7 w-7 text-blue-600" />
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  100% Confidential
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  We ensure your data privacy and security
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          CTA SECTION
      ===================================================== */}
      <section className="mx-auto mt-6 mb-6 w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="rounded-xl border bg-[#DCCEFF] px-5 py-6 shadow-sm sm:px-8 sm:py-8">

          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">

            {/* IMAGE */}
            <div className="flex w-full justify-center md:w-1/4 md:justify-start">
              <Image
                src="/Images/docs.png"
                alt="Resume document"
                width={150}
                height={150}
                className="h-auto w-28 object-contain sm:w-32"
              />
            </div>


            {/* TEXT */}
            <div className="w-full text-center md:w-1/2 md:text-left">

              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Ready to Build a Winning Resume?
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                Get your AI-powered resume review now and take the next
                step towards your dream job.
              </p>

            </div>


            {/* BUTTON */}
            <div className="flex w-full justify-center md:w-1/4 md:justify-end">

              <button
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-md transition hover:bg-blue-700 sm:w-auto sm:px-6"
              >
                <span>Upload Resume</span>
                <Upload className="h-4 w-4" />
              </button>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}