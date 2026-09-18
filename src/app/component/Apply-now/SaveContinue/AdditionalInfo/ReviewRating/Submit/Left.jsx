
"use client";

import {
Check, Mail, ClipboardCheck, Users, BriefcaseBusiness, Bell, ArrowRight, Star
} from "lucide-react";

import { ApplicationSuccessData } from "@/Data/data1";

const iconMap = {
  mail: Mail,
  assessment: ClipboardCheck,
  users: Users,
  offer: BriefcaseBusiness,
};

export default function ApplicationSuccess1() {
  const data = ApplicationSuccessData;

  return (
    <main className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-8 rounded-xl border border-slate-200 ">
      <div className="mx-auto max-w-[920px]">

        {/* MAIN CARD */}
        <section className="overflow-hidden bg-white ">

          {/* TOP CONTENT */}
          <div className="px-6 py-10 text-center sm:px-10">

            {/* SUCCESS ICON */}
            <div className="mx-auto mb-7 flex h-[180px] max-w-[420px] items-center justify-center">
              <div className="relative">

                {/* Document */}
                <div className="flex h-[190px] w-[245px] flex-col rounded-xl bg-white p-7 shadow-sm">

                  {/* Profile */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7167f0]">
                      <div className="h-5 w-5 rounded-full bg-[#17144d]" />
                    </div>

                    <div className="space-y-3">
                      <div className="h-3 w-20 rounded-full bg-[#e8e6ff]" />
                      <div className="h-3 w-16 rounded-full bg-[#e8e6ff]" />
                    </div>
                  </div>

                  {/* Lines */}
                  <div className="mt-6 space-y-3">
                    <div className="h-3 w-full rounded-full bg-[#e8e6ff]" />
                    <div className="h-3 w-[85%] rounded-full bg-[#e8e6ff]" />
                    <div className="h-3 w-[65%] rounded-full bg-[#e8e6ff]" />
                  </div>
                </div>

                {/* Check */}
                <div className="absolute -bottom-3 -right-8 flex h-15 w-15 items-center justify-center rounded-full bg-[#6558e8] shadow-md">
                  <Check
                    size={55}
                    strokeWidth={3}
                    className="text-white"
                  />
                </div>

                {/* Stars */}
                <span className="absolute -left-14 top-10 text-3xl text-[#aaa3ff]">
                  ✦
                </span>

                <span className="absolute -right-12 top-20 text-2xl text-[#aaa3ff]">
                  ✦
                </span>

                <span className="absolute -left-10 bottom-12 text-2xl text-[#aaa3ff]">
                  ✦
                </span>
              </div>
            </div>

            {/* TITLE */}
            <h1 className="text-base font-bold text-gray-900 sm:text-lg">
              {data.title}
            </h1>

            {/* DESCRIPTION */}
            <div className="mt-2 space-y-1 text-sm text-gray-500 sm:text-base">
              {data.description.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>

            {/* MATCH SCORE */}
            <div className="mx-auto mt-8 flex max-w-[460px] items-center justify-center gap-4 rounded-2xl border border-[#b9e9ca] bg-[#e9fff0] px-5 py-5">

              <Star
                size={30}
                fill="currentColor"
                className="shrink-0 text-[#16b866]"
              />

              <div className="text-left">
                <p className="text-base font-bold text-gray-800">
                  Your Match Score:{" "}
                  <span className="text-[#16b866]">
                    {data.matchScore.score}/{data.matchScore.total}
                  </span>
                </p>

                <p className="mt-1 font-semibold text-[#16b866]">
                  {data.matchScore.label}
                </p>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="mx-8 border-t border-gray-200" />

          {/* WHAT HAPPENS NEXT */}
          <div className="px-6 py-8 sm:px-10">

            <h2 className="mb-8 text-lg font-bold text-gray-900">
              What happens next?
            </h2>

            <div className="space-y-7">

              {data.steps.map((step, index) => {
                const Icon = iconMap[step.icon];

                return (
                  <div
                    key={step.id}
                    className="relative flex gap-5"
                  >

                    {/* CONNECTING LINE */}
                    {index !== data.steps.length - 1 && (
                      <div className="absolute left-[26px] top-[58px] h-[65px] border-l-2 border-gray-200" />
                    )}

                    {/* ICON */}
                    <div className="relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#efefff]">
                      <Icon
                        size={25}
                        strokeWidth={2}
                        className="text-[#5148dc]"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row">

                      <div className="max-w-[560px]">
                        <h3 className="font-bold text-gray-900">
                          {step.id}. {step.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                          {step.description}
                        </p>
                      </div>

                      {/* DURATION */}
                      <div className="flex h-fit shrink-0 items-center justify-center rounded-lg bg-[#eeeeff] px-5 py-2 text-sm font-semibold text-[#5750d9]">
                        {step.duration}
                      </div>

                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          {/* DASHBOARD NOTICE */}
          <div className="mx-6 mb-8 flex flex-col gap-5 rounded-xl bg-[#efeeff] px-6 py-5 sm:mx-10 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-5">

              <Bell
                size={38}
                strokeWidth={2}
                className="shrink-0 text-[#5148dc]"
              />

              <div>
                <h3 className="font-bold text-gray-900">
                  {data.dashboardNotice.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {data.dashboardNotice.description}
                </p>
              </div>

            </div>

            <button
              type="button"
              className="flex shrink-0 items-center justify-center gap-3 rounded-lg bg-[#5148dc] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#433bc4]"
            >
              {data.dashboardNotice.buttonText}
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* EXPLORE MORE */}
        <section className="mt-6 flex flex-col gap-5 rounded-xl border border-gray-200 bg-[#efeeff] px-6 py-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-10">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#5046d8]">
              <BriefcaseBusiness
                size={34}
                className="text-white"
              />
            </div>

            <div>
              <h2 className="font-bold text-gray-900">
                {data.opportunities.title}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {data.opportunities.description}
              </p>
            </div>

          </div>

          <button
            type="button"
            className="flex shrink-0 items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-[#433bc4] shadow-sm transition hover:bg-gray-50"
          >
            {data.opportunities.buttonText}
            <ArrowRight size={18} />
          </button>

        </section>

      </div>
    </main>
  );
}