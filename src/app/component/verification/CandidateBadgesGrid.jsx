"use client";

import React from "react";
import { ShieldCheck, Award, Star, Crown, Sparkles } from "lucide-react";

/**
 * CandidateBadgesGrid Component
 * Renders earned and locked badges for candidate profile and verification center.
 *
 * @param {Object} props
 * @param {boolean} props.isKycApproved - Whether identity verification is approved
 */
export default function CandidateBadgesGrid({ isKycApproved = false }) {
  const badgeCatalog = [
    {
      id: "identity_verified",
      title: "Identity Verified",
      desc: "Government ID & Selfie verified by HireMind",
      icon: ShieldCheck,
      color: "text-amber-600 bg-amber-50 border-amber-200",
      earned: isKycApproved
    },
    {
      id: "skill_verified",
      title: "Skill Verified",
      desc: "Scored 80%+ on AI Technical Skill Assessments",
      icon: Award,
      color: "text-[#2D24D0] bg-indigo-50 border-indigo-200",
      earned: true
    },
    {
      id: "premium_member",
      title: "Premium Candidate",
      desc: "Active HireMind Candidate Pro Subscriber",
      icon: Star,
      color: "text-purple-600 bg-purple-50 border-purple-200",
      earned: true
    },
    {
      id: "top_rated",
      title: "Top 5% Talent",
      desc: "Recognized for high assessment performance",
      icon: Crown,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
      earned: false
    }
  ];

  return (
    <div className="space-y-4 text-left">
      <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-amber-500" />
        <span>HireMind Candidate Trust Badges</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {badgeCatalog.map((badge) => {
          const IconComp = badge.icon;
          return (
            <div
              key={badge.id}
              className={`bg-white border rounded-3xl p-5 flex flex-col justify-between space-y-3 transition ${
                badge.earned ? "border-indigo-200 shadow-2xs" : "border-slate-200 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${badge.color}`}>
                  <IconComp size={20} />
                </div>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                  badge.earned ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-400"
                }`}>
                  {badge.earned ? "ACTIVE BADGE" : "LOCKED"}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-slate-900">{badge.title}</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">{badge.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
