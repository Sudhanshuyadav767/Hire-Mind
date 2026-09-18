import Image from "next/image";

export default function TestimonialsHero() {
  return (
    <section className="bg-[#E2E4F8] px-4 py-8 lg:px-8 rounded-b-3xl my-2 mx-auto max-w-7xl shadow-3xs">
      <div className="mx-auto max-w-7xl grid grid-cols-12 gap-4 items-center">
        {/* Left Column Description */}
        <div className="col-span-7 flex flex-col justify-center text-left space-y-2">
          <h1 className="text-[clamp(1.1rem,4.5vw,3rem)] font-poppins font-medium text-[#1E2229] tracking-tight leading-tight">
            What Job Seekers Say
          </h1>
          
          <div className="text-[10px] sm:text-xs font-poppins font-bold text-[#2D24D0] select-none uppercase tracking-wide">
            Real stories, Real success.
          </div>

          <p className="text-[#5E637D] text-[clamp(0.65rem,1.8vw,0.9rem)] max-w-xl leading-relaxed font-poppins font-medium">
            Read inspiring stories and honest reviews from job seekers who found the right opportunities with HireMind.
          </p>
        </div>

        {/* Right Column Image */}
        <div className="col-span-5 relative flex items-center justify-center h-[160px] sm:h-[260px] scale-95 sm:scale-100 origin-center shrink-0">
          <div className="relative w-full max-w-[280px] h-full rounded-2xl overflow-hidden sm:">
            <Image 
              src="/Images/testimonials_hero_woman.jpg" 
              alt="What Job Seekers Say"
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
