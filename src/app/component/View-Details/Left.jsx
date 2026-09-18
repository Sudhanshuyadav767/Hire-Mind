
import Image from "next/image";
import { jobMatchingData } from "@/Data/job-matching";
import Link from "next/link";

export default function JobMatchingLeft() {
  const {
    job,aboutRole,responsibilities,requirements,niceToHave, benefits, whyMatch
    
  } = jobMatchingData;

  return (
    <div className="bg-[white] border border-slate-100 rounded-2xl sm:px-6 sm:py-6 px-4 py-4">

      {/* Job Header */}
      <div className="border border-gray-200 bg-white rounded-xl p-5 sm:p-6 shadow-sm">

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">

          {/* Company + Job */}
          <div className="flex gap-4 items-center justify-center">

            {/* Google Logo */}
            <div className="">
              <Image
              src="/logo/google.jpg"
              alt=""
              width={60}
              height={60}
              className="object-contain"
              />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                {job.title}
              </h1>

              <p className="text-gray-600 font-medium mt-1">
                {job.company}
                {job.verified && (
                  <span className="ml-1 text-blue-500">●</span>
                )}
              </p>

              <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                <span>📍 {job.location}</span>
                <span>💼 {job.experience}</span>
                <span>💰 {job.salary}</span>
              </div>
            </div>

          </div>

          {/* Match */}
          <div className="sm:text-right">

            <span className="inline-block bg-green-100 text-green-600 font-semibold px-4 py-2 rounded-md">
              {job.match}% Match
            </span>

            <p className="text-green-500 font-semibold mt-2">
              ★ {job.matchText}
            </p>

          </div>

        </div>

      </div>


      {/* About Role */}
      <section className="mt-5 bg-[#f4f3ff] border border-[#ddd9ff] rounded-xl p-5">

        <h2 className="text-lg font-bold text-gray-900 mb-3">
          About the Role
        </h2>

        <p className="text-gray-600 text-sm leading-6">
          {aboutRole}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-5">

          {job.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md bg-[#e8e6ff] text-[#5146d8]"
            >
              {tag}
            </span>
          ))}

        </div>

      </section>


      {/* Key Responsibilities */}
      <section className="mt-8">

        <h2 className="text-lg font-bold text-gray-900 mb-5">
          Key Responsibilities
        </h2>

        <ul className="space-y-3">

          {responsibilities.map((item, index) => (
            <li
              key={index}
              className="flex gap-3 text-sm text-gray-600"
            >
              <span className="text-[#5146d8] mt-1 text-xl">•</span>
              <span>{item}</span>
            </li>
          ))}

        </ul>

      </section>


      {/* Requirements */}
      <section className="mt-8">

        <h2 className="text-lg font-bold text-gray-900 mb-5">
          Requirements
        </h2>

        <ul className="space-y-3">

          {requirements.map((item, index) => (
            <li
              key={index}
              className="flex gap-3 text-sm text-gray-600"
            >
              <span className="text-[#5146d8] mt-1 text-xl">•</span>
              <span>{item}</span>
            </li>
          ))}

        </ul>

      </section>


      {/* Nice To Have */}
      <section className="mt-8">

        <h2 className="text-lg font-bold text-gray-900 mb-5">
          Nice to Have
        </h2>

        <ul className="space-y-3">

          {niceToHave.map((item, index) => (
            <li
              key={index}
              className="flex gap-3 text-sm text-gray-600"
            >
              <span className="text-[#5146d8] mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}

        </ul>

      </section>


      {/* What You'll Get */}
      <section className="mt-10">

        <h2 className="text-lg font-bold text-gray-900 mb-6">
          What You'll Get
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center"
            >

              <div className="w-14 h-14 mx-auto rounded-full bg-[#eeeaff] flex items-center justify-center text-2xl text-[#5146d8]">
                {benefit.icon}
              </div>

              <h3 className="font-semibold text-sm mt-4 text-gray-900">
                {benefit.title}
              </h3>

              <p className="text-xs text-gray-500 mt-2 leading-5">
                {benefit.description}
              </p>

            </div>
          ))}

        </div>

      </section>


      {/* Why This Match */}
      <section className="mt-10 bg-[#f4f3ff] border border-[#ddd9ff] rounded-xl p-5">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

          <div className="flex gap-3">

            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#5146d8]">
              ☆
            </div>

            <div>
              <h2 className="font-bold text-gray-900">
                {whyMatch.title}
              </h2>

              <p className="text-sm text-gray-600 mt-2 max-w-md leading-5">
                {whyMatch.description}
              </p>
            </div>

          </div>

          <div className="sm:min-w-[150px]">

            <p className="text-xs text-gray-500">
              Estimated Salary
            </p>

            <p className="text-xl font-bold text-[#5146d8] mt-1">
              {whyMatch.estimatedSalary}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {whyMatch.salaryDescription}
            </p>

          </div>

        </div>

      </section>


      {/* Apply Button */}
     <Link href="/Job-Matching/View-Details/Apply-now"><button
        className="w-full mt-5 bg-[#4038d8] hover:bg-[#342dcc] text-white font-semibold  py-3.5 rounded-xl transition duration-200"
        
      >
        ✈️ APPLY NOW
      </button>
</Link>
    </div>
  );
}