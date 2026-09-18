export default function ResumeHowItWorks() {
  return (
    <div className="bg-white border border-[#cbd5e1]/45 p-5 sm:p-6 rounded-3xl shadow-sm text-left space-y-5 h-full">
      <h2 className="text-lg sm:text-xl font-bold font-poppins text-[#1E2229]">
        How It Works?
      </h2>

      <div className="space-y-6 pt-2">
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-full bg-[#2D24D0] text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-xs">
            1
          </div>
          <div className="space-y-0.5">
            <h3 className="font-bold text-xs sm:text-sm text-[#1E2229]">
              Upload Your Resume
            </h3>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
              Upload your resume in PDF Doc Formate.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-full bg-[#2D24D0] text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-xs">
            2
          </div>
          <div className="space-y-0.5">
            <h3 className="font-bold text-xs sm:text-sm text-[#1E2229]">
              AI Reviews It
            </h3>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
              Our AI analyzes your content, structure and relevance.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-full bg-[#2D24D0] text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-xs">
            3
          </div>
          <div className="space-y-0.5">
            <h3 className="font-bold text-xs sm:text-sm text-[#1E2229]">
              Get Actionable Feedback
            </h3>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
              Receive score, suggestions and improve your resume.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
