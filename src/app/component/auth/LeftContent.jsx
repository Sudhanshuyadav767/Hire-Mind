import React from 'react';
import Image from 'next/image';
import { BarChart3, BriefcaseBusiness, Folder, Sparkles, TrendingUp } from 'lucide-react';
import { HIREMIND_FEATURES } from '../../../constants/authFeatures';
import Link from 'next/link';


const FEATURE_ICONS = {
  jobs: Folder,
  'ai-tools': Sparkles,
  grow: BriefcaseBusiness,
  track: TrendingUp,
};

export default function LeftContent() {
  return (
    <div className="relative flex h-full min-h-[800px] flex-col overflow-hidden bg-[#eef0ff] px-7 py-7 sm:px-10 lg:px-14 lg:py-7">
      <div className="relative z-10 flex items-center gap-3">
       <Link href="/" className="flex items-center gap-2 cursor-pointer">
        
          <Image src="/logo/Mind-hire-Logo.png" alt="HireMind" width={41} height={44} />
          <div className="tracking-tight flex items-center gap-1">
  <h1 className="font-poppins font-medium  text-2xl bg-[linear-gradient(90deg,#010205_0%,#2D24D0_47.12%)] bg-clip-text text-transparent">
    Hire Mind
  </h1>
</div>
        </Link>
      </div>

      <div className="relative z-10 mt-2 max-w-[560px] lg:mt-2">
        <h1 className="max-w-[640px] text-[39px] font-poppins font-medium leading-[1.2] tracking-[-0.045em] text-[#080911] sm:text-[48px] lg:text-[40px]">
          Create Your Account
          <br />
          <span className="text-[#4641ea]">and Unlock Opportunities</span>
        </h1>

        <p className="mt-4 max-w-[560px] text-[16px] font-medium leading-[1.52] tracking-[-0.01em] text-[#5d5f70] sm:text-[17px] lg:text-[17px]">
          Join HireMind AI and get access to the best job opportunities, AI-powered career tools, and expert resources to grow your career.
        </p>

        <div className="mt-8 space-y-6 lg:mt-8">
          {HIREMIND_FEATURES.map((feature) => {
            const Icon = FEATURE_ICONS[feature.id] || Folder;

            return (
              <div key={feature.id} className="flex items-start gap-6">
                <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl border border-[#dee0fb] bg-white shadow-[0_10px_24px_rgba(105,109,175,0.08)]">
                  <Icon className="h-[26px] w-[26px] text-[#645ff0]" strokeWidth={1.8} />
                </div>
                <div className="max-w-[280px] pt-0.5">
                  <h4 className="text-[15px] font-semibold leading-6 tracking-[-0.03em] text-[#11111b] lg:text-[16px]">
                    {feature.title}
                  </h4>
                  <p className="mt-0.5 text-[13px] leading-[1.45] text-[#6f7087]">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 w-[54%] min-w-[320px]">
        <div className="relative h-full w-full">
          {/* <div className="absolute right-[5.5%] top-[38.7%] flex h-[78px] w-[78px] items-center justify-center rounded-2xl bg-white shadow-[0_14px_30px_rgba(88,92,170,0.12)]">
            <BarChart3 className="h-9 w-9 text-[#5d55f0]" strokeWidth={2.2} />
          </div>
          <div className="absolute right-[20.8%] top-[51.3%] flex h-[76px] w-[76px] items-center justify-center rounded-2xl bg-white shadow-[0_14px_30px_rgba(88,92,170,0.12)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4d45f0] text-white">
              <BriefcaseBusiness className="h-6 w-6" strokeWidth={2.2} />
            </div>
          </div>

          <div className="absolute bottom-[10.5%] right-[4%] h-[70px] w-[70px] rounded-full bg-[radial-gradient(circle,_rgba(118,102,255,0.22)_0%,_rgba(118,102,255,0)_70%)]" />
          <div className="absolute bottom-[15%] right-[30%] h-[16px] w-[16px] rounded-full bg-[#7a6ef9]/30" />
          <div className="absolute bottom-[42%] right-[5%] h-[10px] w-[10px] rotate-45 bg-[#6f66f5]/25" /> */}

          <div className="absolute bottom-[20%] left-[10%] h-[66%] w-[95%]">
            <Image
              src="/Images/auth-illustration.png"
              alt="Person using laptop"
              fill
              priority
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
