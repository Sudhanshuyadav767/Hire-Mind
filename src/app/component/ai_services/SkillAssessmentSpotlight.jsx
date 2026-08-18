import Link from "next/link";
import { ArrowRight, BadgeCheck, BrainCircuit, Sparkles } from "lucide-react";

const highlights = [
  "AI-guided career fit report",
  "Role-based skill matching",
  "Personalized next-step roadmap",
];

export default function SkillAssessmentSpotlight() {
  return (
    <section className="mx-auto mb-3 max-w-[1345px] px-2 lg:px-2">
      <div className="rounded-[24px] border border-[#d8d7ff] bg-[linear-gradient(135deg,#f7f5ff_0%,#efeeff_50%,#ffffff_100%)] p-5 shadow-[0_8px_24px_rgba(67,59,226,0.12)] md:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#cfcaff] bg-white/80 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#433be2]">
              <BrainCircuit size={14} />
              Skill Assessment
            </div>

            <h2 className="text-[24px] font-semibold tracking-tight text-[#111] sm:text-[30px]">
              Measure your strengths and unlock the right career path.
            </h2>

            <p className="mt-3 text-[15px] leading-7 text-[#5f6172] sm:text-[16px]">
              Discover where you stand today, identify your growth areas, and get a tailored roadmap for the roles you want next.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {highlights.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-[#e1dfff] bg-white px-3 py-1.5 text-[13px] font-medium text-[#3a3b44]">
                  <BadgeCheck size={14} className="text-[#433be2]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:min-w-[300px]">
            <div className="rounded-[18px] border border-[#e2deff] bg-white p-4 shadow-[0_5px_16px_rgba(67,59,226,0.08)]">
              <div className="flex items-center gap-2 text-[14px] font-semibold text-[#433be2]">
                <Sparkles size={16} />
                Recommended for you
              </div>
              <p className="mt-2 text-[15px] font-medium text-[#161823]">Career growth + role readiness in 15 minutes</p>
            </div>

            <Link
              href="/ai-services/skill-assessment"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#433be2] px-4 py-3 text-[14px] font-semibold text-white transition hover:bg-[#3129c8]"
            >
              Start Assessment
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
