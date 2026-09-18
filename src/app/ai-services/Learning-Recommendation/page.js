"use client";
import Header from "@/app/component/common/Header"
  import Footer from "@/app/component/common/Footer"
import LearningRecommendations1 from "@/app/component/Learning-Recommendation/Left";
import LearningDashboard from "@/app/component/Learning-Recommendation/Right";
export default function LearningRecommendations() {
  return (
    <>
    <Header />
    <section className="w-full rounded-xl bg-[#eeeeff] px-6 py-5 md:px-10 md:py-6">
      <div className="flex min-h-[180px] justify-between gap-6">

        {/* LEFT CONTENT */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-black md:text-3xl">
            Learning Recommendations
          </h1>

          <p className="mt-4 max-w-[700px] text-base leading-7 text-gray-500 md:text-base">
            Personalized course and skill recommendations to help you
            <br className="hidden md:block" />
            learn faster and achieve your career goals.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden shrink-0 md:block">
          <img
            src="/Images/Robot.png"
            alt=""
            className="h-[150px] w-auto object-contain lg:h-[180px]"
          />
        </div>

      </div>
    </section>
    <div className="flex flex-col lg:flex-row  mt-4 gap-4 px-2 sm:px-4 items-stretch mb-4">
        <div className="w-full lg:flex-1 min-w-0"><LearningRecommendations1/></div>
        <div className="w-full lg:w-[400px] lg:shrink-0"><LearningDashboard /></div>
    </div>
    
    <Footer />
    </>
  );
}