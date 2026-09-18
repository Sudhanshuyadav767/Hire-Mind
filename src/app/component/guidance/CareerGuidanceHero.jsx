import Image from "next/image";

export default function CareerGuidanceHero() {
  return (
    <section className="bg-[#E2E4F8] px-4 py-8 lg:px-10 rounded-b-3xl my-2 mx-auto max-w-7xl shadow-3xs overflow-hidden">
      <div className="mx-auto max-w-7xl grid grid-cols-12 gap-6 items-center">
        {/* Left Content */}
        <div className="col-span-12 md:col-span-7 flex flex-col justify-center text-left space-y-2 sm:space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-[#1E2229] tracking-tight leading-tight">
            AI Career Guidance
          </h1>

          <p className="text-[#5E637D] text-xs sm:text-sm lg:text-base max-w-xl leading-relaxed font-poppins font-medium">
            Get personalized career recommendation, skill insights, and step-by-step guidance to achieve your goals.
          </p>
        </div>

        {/* Right Illustration */}
        <div className="col-span-12 md:col-span-5 relative flex items-center justify-center h-[160px] sm:h-[220px] shrink-0">
          <div className="relative w-44 h-44 sm:w-56 sm:h-56">
            <Image
              src="/Images/Robot1.png"
              alt="AI Career Guidance Robot"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
