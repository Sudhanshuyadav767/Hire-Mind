"use client";

import { Target, Cpu, Award, BadgeCheck, Bot } from "lucide-react";

export default function GenerateWhyBanner() {
  const points = [
    {
      title: "Personalized for You",
      description: "Based on your skills, experience and goals.",
      icon: Target,
      bgColor: "bg-[#eef1ff]",
      iconColor: "text-[#433be2]"
    },
    {
      title: "Industry Relevant",
      description: "High demand skills for AI/ML Engineer roles.",
      icon: Cpu,
      bgColor: "bg-[#eef1ff]",
      iconColor: "text-[#433be2]"
    },
    {
      title: "Expert Curated",
      description: "Selected from top providers and experts.",
      icon: BadgeCheck,
      bgColor: "bg-[#eef1ff]",
      iconColor: "text-[#433be2]"
    },
    {
      title: "Proven Results",
      description: "Boost your career with targeted learning.",
      icon: Award,
      bgColor: "bg-[#eef1ff]",
      iconColor: "text-[#433be2]"
    }
  ];

  return (
    <section className="rounded-3xl bg-[#f4f3ff] border border-[#e2e0fb] p-5.5 relative overflow-hidden">
      <h3 className="text-md font-semibold text-[#101014] mb-4.5">Why These Courses?</h3>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 pr-16">
        {points.map((pt) => {
          const Icon = pt.icon;
          return (
            <div key={pt.title} className="flex gap-3">
              <div className={`p-2 rounded-xl ${pt.bgColor} ${pt.iconColor} shrink-0 h-10 w-10 flex items-center justify-center`}>
                <Icon size={18} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold text-[#101014]">{pt.title}</h4>
                <p className="text-[11px] font-semibold text-[#64748b] leading-relaxed">
                  {pt.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Robot avatar on far right */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#433be2] opacity-80 hidden lg:block">
        <Bot size={72} className="stroke-1" />
      </div>
    </section>
  );
}
