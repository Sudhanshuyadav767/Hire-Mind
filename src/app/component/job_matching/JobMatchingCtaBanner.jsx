import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function JobMatchingCtaBanner() {
  return (
    <section className="bg-[#E2E4F8] rounded-3xl p-5 sm:p-6 text-[#1E2229] flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm relative overflow-hidden text-left select-none">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 relative shrink-0">
          <Image
            src="/Images/bag.png"
            alt="Briefcase"
            fill
            className="object-contain"
          />
        </div>

        <div className="space-y-0.5">
          <h3 className="text-base sm:text-lg font-bold font-poppins text-[#1E2229]">
            Get better matches!
          </h3>
          <p className="text-slate-500 text-xs font-medium max-w-xl leading-normal">
            Complete your profile, take skill tests and keep your resume updated.
          </p>
        </div>
      </div>

      <button className="bg-white hover:bg-slate-50 text-[#2D24D0] border border-slate-200 px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-xs shrink-0 w-full md:w-auto cursor-pointer active:scale-98">
        <span>Improve Profile</span>
        <ChevronRight size={14} />
      </button>
    </section>
  );
}
