import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import Link from "next/link";

function MicroCourse() {
  return (
    <div className="mt-3 flex gap-3 rounded-[10px] border border-[#ddd] p-[17px_14px] shadow-[0_2px_6px_#ddd] transition-all duration-200 hover:border-[#9a94ff] hover:shadow-[0_5px_12px_rgba(67,59,226,0.16)]">
      <div className="grid h-[74px] w-16 place-items-center rounded-[10px] border border-[#d7dcf6] bg-[#eff0ff] text-[#6c40f0]">
        <Sparkles />
      </div>

      <span className="grid gap-[7px] text-base">
        <b>Core AI Skills</b>
        <small className="text-[#888]">Micro-coursed Project</small>
        <label className="text-[#4941e7]">
          <BadgeCheck size={16} className="inline text-[#208ce5]" /> Verified
        </label>
      </span>
    </div>
  );
}

function PathCard() {
  return (
    <article className="overflow-hidden rounded-[5px] border-2 border-[#bbb] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#8178f5] hover:shadow-[0_10px_20px_rgba(67,59,226,0.18)]">
      <div className="relative flex h-[85px] items-start gap-3 bg-[#d7d6fb] p-2">
        <span className="text-[15px]">Step-1</span>
        <strong className="text-[25px]">Core AI Skills</strong>

        <div className="absolute bottom-[25px] left-[81px] h-[9px] w-[142px] rounded-full bg-white">
          <i className="block h-full w-2/3 rounded-full bg-[#4d45ed]" />
        </div>
        <em className="absolute bottom-[21px] right-3 text-sm not-italic text-[#7c7b8b]">
          Progress
        </em>
      </div>

      <div className="p-3">
        <p className="m-1 mb-[17px] text-base">
          Micro courses
          <a className="float-right text-[#4139e7]">Coursera</a>
        </p>
        <MicroCourse />
        <MicroCourse />
      </div>
    </article>
  );
}

export default function CareerPathCopilot() {
  return (
    <section className="mt-3 rounded-[5px] border-2 border-[#d1d1d1] bg-white p-3.5 shadow-[0_1px_3px_#d0d0d0]">
      <div className="mb-[22px] flex items-center justify-between gap-3 px-1">
        <h2 className="text-[21px] font-semibold tracking-tight sm:text-[25px]">
          Career Path AI Co-Pilot
          <Sparkles className="ml-1 inline text-[#6645f1]" />
        </h2>
        <Link href="/ai-services/courses" className="hidden items-center gap-2 whitespace-nowrap text-base text-[#4139e7] sm:flex">
          View All Courses
          <ArrowRight />
        </Link>
      </div>

      <div className="mobile-card-swipe grid grid-cols-1 gap-[13px] md:grid-cols-3">
        {[1, 2, 3].map((path) => (
          <PathCard key={path} />
        ))}
      </div>
    </section>
  );
}
