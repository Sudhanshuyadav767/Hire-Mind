import { Target, Eye } from "lucide-react";

export default function AboutMissionVision() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 lg:px-8 grid gap-4 grid-cols-2">
      {/* Mission Card */}
      <div className="bg-[#2D24D0]/5 border border-[#2D24D0]/10 rounded-3xl p-3 sm:p-6 flex flex-col sm:flex-row items-start gap-2 sm:gap-4 relative overflow-hidden text-left h-full">
        <div className="p-2 sm:p-3.5 bg-[#2D24D0]/10 text-[#2D24D0] rounded-xl sm:rounded-2xl shrink-0">
          <Target className="w-4 h-4 sm:w-6 sm:h-6 stroke-[1.5]" />
        </div>
        
        <div className="space-y-1.5 sm:space-y-2.5 z-10">
          <h3 className="text-[10px] sm:text-base font-poppins font-bold text-[#2D24D0]">Our Mission</h3>
          <p className="text-[9px] sm:text-xs font-poppins font-medium text-emerald-600/80 leading-relaxed max-w-md">
            To empower individuals to achieve their career goals by connecting them with right opportunities, leveraging AI technology and expert guidance.
          </p>
        </div>
        
        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#2D24D0]/5 rounded-full select-none" />
      </div>

      {/* Vision Card */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-3 sm:p-6 flex flex-col sm:flex-row items-start gap-2 sm:gap-4 relative overflow-hidden text-left h-full">
        <div className="p-2 sm:p-3.5 bg-emerald-100/60 text-emerald-600 rounded-xl sm:rounded-2xl shrink-0">
          <Eye className="w-4 h-4 sm:w-6 sm:h-6 stroke-[1.5]" />
        </div>
        
        <div className="space-y-1.5 sm:space-y-2.5 z-10">
          <h3 className="text-[10px] sm:text-base font-poppins font-bold text-emerald-700">Our Vision</h3>
          <p className="text-[9px] sm:text-xs font-poppins font-medium text-emerald-600/80 leading-relaxed max-w-md">
            To become the world&apos;s most trusted career platform, transforming the way people discover opportunities and build meaningful careers.
          </p>
        </div>

        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-100/20 rounded-full select-none" />
      </div>
    </section>
  );
}
