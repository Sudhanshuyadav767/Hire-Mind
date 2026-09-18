import Link from "next/link";
import { Bot, ArrowRight } from "lucide-react";

export default function TestimonialsCta() {
  return (
    <section className="bg-[#E2E4F8] rounded-3xl p-6 sm:p-8 text-[#1E2229] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden select-none">
      <div className="flex items-center gap-4 text-left">
        <div className="p-3 bg-white text-[#2D24D0] rounded-2xl shadow-3xs shrink-0 hidden sm:flex">
          <Bot size={28} className="stroke-[1.5]" />
        </div>
        
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-poppins font-semibold text-[#1E2229]">Ready to start your success story?</h3>
          <p className="text-[#5E637D] text-xs sm:text-sm font-poppins font-medium max-w-xl leading-normal">
            Join thousands of job seekers who found their dream jobs with HireMind.
          </p>
        </div>
      </div>

      <Link 
        href="/find-jobs"
        className="rounded-xl bg-[#2D24D0] hover:bg-[#1e1c75] text-white px-6 py-3 text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shrink-0 w-full md:w-auto cursor-pointer"
      >
        <span>Find Your Dream Job</span>
        <ArrowRight size={14} />
      </Link>
    </section>
  );
}
