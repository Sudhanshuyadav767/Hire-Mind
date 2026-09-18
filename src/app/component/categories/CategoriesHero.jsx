import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

export default function CategoriesHero() {
  return (
    <section className="bg-[#E2E4F8] px-4 py-8 lg:px-8 rounded-b-3xl my-2 mx-auto max-w-7xl relative shadow-3xs overflow-hidden">
      <div className="mx-auto max-w-7xl grid grid-cols-12 gap-4 items-center z-10 relative">
        <div className="col-span-7 flex flex-col justify-center text-left space-y-2 sm:space-y-4">
          <h1 className="text-[clamp(1.1rem,4.5vw,3rem)] font-poppins font-medium text-[#1E2229] tracking-tight leading-tight">
            Top Categories
          </h1>
          
          <div className="text-[10px] sm:text-xs font-poppins font-bold text-[#2D24D0] uppercase tracking-wide select-none">
            Explore top job categories and find the right fit for your career.
          </div>

          <p className="text-[#5E637D] text-[clamp(0.65rem,1.8vw,0.9rem)] max-w-xl leading-relaxed font-poppins font-medium">
            Browse job opportunities across leading industries and discover roles that match your skills and passion.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl gap-2 w-full max-w-lg mt-3 p-1.5 shadow-sm border border-slate-100/50">
            <div className="flex flex-1 items-center gap-1.5 px-2 py-1">
              <Search size={14} className="text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="Search Categories, roles..."
                className="w-full bg-transparent text-[10px] sm:text-xs text-[#1e293b] outline-none placeholder:text-slate-400 font-semibold"
              />
            </div>

            <div className="flex items-center gap-1.5 px-2 py-1 border-t sm:border-t-0 sm:border-l border-gray-150 select-none">
              <select className="bg-transparent text-[10px] sm:text-xs text-[#475569] font-bold outline-none cursor-pointer">
                <option>All Industries</option>
                <option>Technology</option>
                <option>Marketing</option>
              </select>
            </div>

            <Link href="/find-jobs" className="shrink-0">
              <button className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#2D24D0] hover:bg-[#1f1a8c] text-white text-[10px] sm:text-xs font-bold transition flex items-center justify-center cursor-pointer">
                <span>Explore</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="col-span-5 relative flex items-center justify-center aspect-square scale-[0.6] sm:scale-100 origin-center shrink-0">
          <div className="relative w-full h-full overflow-hidden">
            <Image 
              src="/Images/testimonials_hero_woman.jpg" 
              alt="Explore categories"
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
