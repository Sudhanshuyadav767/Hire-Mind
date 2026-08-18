import Image from "next/image";
import { Search } from "lucide-react";

export default function AiLearningHero() {
  return (
    <section className="flex min-h-[286px] items-center justify-between overflow-hidden bg-[#e5e6fb] px-[4%] py-7 lg:px-[6.7%]">
      <div>
        <h1 className="mb-3 text-[40px] font-medium font-poppins leading-none tracking-tight sm:text-[50px]">AI Learning</h1>
        <p className="text-[17px] font-medium leading-[1.42] text-[#70707b] sm:text-[21px]">
          Get personalized career recommendation, skill insights, and
          <br className="hidden sm:block" /> step-by-step guidance to achieve your goals.
        </p>

        <div className="mt-8 flex h-[51px] w-full max-w-[678px] items-center rounded-[10px] border-2 border-[#cacaca] bg-white py-0 pl-5 pr-2 text-[#888] shadow-[0_1px_4px_#aaa] sm:mt-10">
          <Search size={22} />
          <input className="min-w-0 flex-1 border-0 px-3.5 text-sm outline-none" placeholder="Search for help......." />
          <button type="button" className="flex h-[38px] items-center justify-center gap-2 rounded-[9px] bg-[#433be2] px-4 text-white shadow-[0_2px_4px_#aaa]">
            <Search size={18} /> Search
          </button>
        </div>
      </div>

      <div className="relative hidden h-[240px] w-[410px] shrink-0 items-center justify-center lg:flex">
        <Image src="/Images/ai-learning_hero.png" alt="AI Learning assistant" width={410} height={240} priority />
      </div>
    </section>
  );
}
