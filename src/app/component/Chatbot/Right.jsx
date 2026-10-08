"use client";

import React from "react";
import {
  FileText,
  Users,
  GraduationCap,
  Monitor,
  TrendingUp,
  MessageSquare,
  ArrowRight,
  Sparkles
} from "lucide-react";
import Link from "next/link";

import {
  popularQuestions,
  careerTools,
  resources,
} from "@/Data/data1";

export default function CareerPage({ onSelectQuestion }) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">

      {/* Popular Questions */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="sm:text-lg text-base font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-600" />
            Popular Questions
          </h2>
          <span className="text-xs text-indigo-600 font-medium">Click to Ask AI</span>
        </div>

        <div className="space-y-2">
          {popularQuestions.map((question, index) => (
            <div
              key={index}
              onClick={() => onSelectQuestion && onSelectQuestion(question)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50/70 border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer group"
            >
              <IconBox icon="resume" />

              <p className="flex-1 font-medium text-xs sm:text-sm text-slate-800 group-hover:text-indigo-700 transition-colors">
                {question}
              </p>

              <span className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all text-sm">
                ›
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Career Tools */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
        <h2 className="sm:text-lg text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          AI Career Tools
        </h2>

        <div className="space-y-3">
          {careerTools.map((tool, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 transition-all"
            >
              <IconBox icon={tool.icon} />

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-slate-900">
                  {tool.title}
                </h3>

                <p className="text-slate-500 text-xs truncate mt-0.5">
                  {tool.description}
                </p>
              </div>

              {tool.link && (
                <Link
                  href={tool.link}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 shrink-0"
                >
                  Use <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
        <h2 className="sm:text-lg text-base font-bold text-slate-900 mb-3">
          Resources For You
        </h2>

        <div className="space-y-3">
          {resources.map((resource, index) => (
            <div
              key={index}
              onClick={() => onSelectQuestion && onSelectQuestion(`What resources do you recommend for ${resource.title}?`)}
              className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all cursor-pointer group"
            >
              <IconBox icon={resource.icon} />

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-slate-900 group-hover:text-indigo-700">
                  {resource.title}
                </h3>

                <p className="text-slate-500 text-xs truncate mt-0.5">
                  {resource.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

/* Icon Box */
function IconBox({ icon }) {
  let Icon = FileText;

  if (icon === "job") Icon = Users;
  if (icon === "skill") Icon = GraduationCap;
  if (icon === "interview") Icon = Monitor;
  if (icon === "skills") Icon = TrendingUp;
  if (icon === "roadmap") Icon = FileText;

  return (
    <div className="w-10 h-10 shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
      <Icon className="w-5 h-5" />
    </div>
  );
}