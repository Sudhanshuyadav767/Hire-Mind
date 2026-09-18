// import Header from "@/app/component/common/Header"
//    import Footer from "@/app/component/common/Footer"
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Applynow as ApplyNowData } from "@/Data/job-matching";
import PersonalDetails from "@/app/component/Apply-now/Left";
import Right from "@/app/component/Apply-now/Right";

export default function Applynow() {
  return (
    <>
  
      {/* Hero Section */}
   <section className="bg-[#f0efff] w-full pt-20 sm:pt-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">

    <Link
      href="/Job-Matching"
      className="group inline-flex items-center gap-2
      text-black hover:text-indigo-600 transition-all duration-200"
    >
      <ArrowLeft
        size={20}
        className="transition-transform duration-200
        group-hover:-translate-x-1"
      />

      <span>
        Back to Job
      </span>
    </Link>

    {ApplyNowData.map((item, index) => (
      <div key={index} className="mt-4 sm:mt-6">

        <h1 className="text-lg sm:text-xl font-bold">
          {item.apply}
        </h1>

        <div
          className="flex flex-col sm:flex-row
          sm:items-center sm:gap-6 gap-2 mt-2"
        >
          <span className="text-sm sm:text-base text-gray-500">
            🏢 {item.company}
          </span>

          <span className="text-sm sm:text-base text-gray-500">
            📍 {item.location}
          </span>

          <span className="text-sm sm:text-base text-gray-500">
            ⏰ {item.jobtype}
          </span>
        </div>

      </div>
    ))}

  </div>
</section>
      {/* Main Content */}
      <div
        className="flex flex-col lg:flex-row max-w-7xl mx-auto   mt-4 sm:mt-6gap-4 sm:gap-6 px-3 sm:px-4 items-stretch"
       >
        {/* Left */}
        <div className="w-full lg:flex-1 min-w-0 mb-4">
          <PersonalDetails />
        </div>

        {/* Right */}
        <div className="w-full lg:w-[420px] lg:shrink-0">
          <Right />
        </div>

      </div>
     
    </>
  );
}

