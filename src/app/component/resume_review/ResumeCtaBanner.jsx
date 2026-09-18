import Image from "next/image";
import { Upload } from "lucide-react";

export default function ResumeCtaBanner() {
  return (
    <section className="bg-[#E2E4F8] rounded-3xl p-6 sm:p-8 text-[#1E2229] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden text-left select-none">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 relative shrink-0 hidden sm:block">
          <Image
            src="/Images/docs.png"
            alt="Resume Illustration"
            fill
            className="object-contain"
          />
        </div>

        <div className="space-y-1">
          <h2 className="text-base sm:text-xl font-bold font-poppins text-[#1E2229]">
            Ready to Build a Winning Resume?
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-xl leading-normal">
            Get your AI-Powered resume review now and take the next step towards your dream job.
          </p>
        </div>
      </div>

      <button className="rounded-xl bg-[#2D24D0] hover:bg-[#1e1c75] text-white px-6 py-3 text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shrink-0 w-full md:w-auto cursor-pointer active:scale-98">
        <span>Upload Resume Now</span>
        <Upload size={14} />
      </button>
    </section>
  );
}
