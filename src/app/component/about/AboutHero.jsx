import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="bg-[#E2E4F8] px-4 py-8 lg:px-8 rounded-b-3xl my-2 mx-auto max-w-7xl relative shadow-3xs overflow-hidden">
      <div className="mx-auto max-w-7xl grid grid-cols-12 gap-4 items-center z-10 relative">
        <div className="col-span-7 flex flex-col justify-center text-left space-y-2.5 sm:space-y-4">
          <span className="text-[9px] sm:text-[10px] font-poppins font-bold text-[#2D24D0] uppercase tracking-wider block select-none">
            About Us
          </span>

          <h1 className="text-[clamp(1.1rem,4.5vw,3rem)] font-poppins font-medium text-[#1E2229] tracking-tight leading-tight">
            Empowering Career. <br />
            Building <span className="text-[#2D24D0]">Futures.</span>
          </h1>

          <p className="text-[#5E637D] text-[clamp(0.65rem,1.8vw,0.9rem)] max-w-xl leading-relaxed font-poppins font-medium">
            At HireMind AI, we believe every talent deserves the right opportunity. Our AI-powered platform connects job seekers with employers, provides smart career guidance, and helps you grow at every step of your journey.
          </p>

          <Link href="/find-jobs" className="inline-block pt-1">
            <button className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#2D24D0] hover:bg-[#1f1a8c] text-white text-[10px] sm:text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer shadow-sm">
              <span>Join Our Mission</span>
              <ArrowRight size={12} />
            </button>
          </Link>
        </div>

        <div className="col-span-5 relative flex items-center justify-center aspect-[3/2] scale-90 sm:scale-100 origin-center shrink-0">
          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg bg-white border-2 border-white sm:border-4">
            <Image 
              src="/Images/about_hero_team.jpg" 
              alt="HireMind Team Collaboration"
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
