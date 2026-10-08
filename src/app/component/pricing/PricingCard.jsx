"use client";

import React from "react";
import { Check, CreditCard, Loader2 } from "lucide-react";

/**
 * PricingCard Component
 * Displays plan details, price, features, badge, and upgrade action button.
 *
 * @param {Object} props
 * @param {Object} props.plan - Plan catalog item
 * @param {string} props.billingCycle - 'monthly' | 'yearly'
 * @param {boolean} props.isCurrent - Whether candidate currently has this plan active
 * @param {boolean} props.isLoading - Whether checkout is loading for this plan
 * @param {Function} props.onUpgrade - Click handler for upgrade button
 */
export default function PricingCard({
  plan,
  billingCycle = "monthly",
  isCurrent = false,
  isLoading = false,
  onUpgrade
}) {
  const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <div
      className={`bg-white border rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative text-left ${
        plan.isPopular
          ? "border-[#2D24D0] shadow-md ring-2 ring-[#2D24D0]/10"
          : "border-slate-200/80 hover:border-slate-300 shadow-2xs"
      }`}
    >
      {plan.isPopular && (
        <span className="absolute -top-3 right-6 bg-[#2D24D0] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
          {plan.badge || 'Most Popular'}
        </span>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-extrabold text-[#1E2229]">{plan.name}</h3>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">{plan.description}</p>

        <div className="pt-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#1E2229]">
            ₹{price}
          </span>
          <span className="text-xs text-slate-400 font-semibold ml-1">
            {price === 0 ? "" : ` / ${billingCycle === 'yearly' ? 'year' : 'month'}`}
          </span>
        </div>

        <hr className="border-slate-100" />

        <div className="space-y-2.5">
          <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">Features Included:</p>
          <ul className="space-y-2">
            {plan.features?.map((feat, idx) => {
              let featureText = "Feature";
              if (typeof feat === "string") {
                featureText = feat;
              } else if (feat && typeof feat === "object") {
                featureText = feat.name || feat.description || feat.key || "Feature";
              }
              return (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                  <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>{String(featureText)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="pt-6">
        <button
          disabled={isCurrent || isLoading}
          onClick={() => onUpgrade(plan)}
          className={`w-full py-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
            isCurrent
              ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-default"
              : plan.isPopular
              ? "bg-[#2D24D0] hover:bg-[#1f1a8c] text-white"
              : "bg-slate-900 hover:bg-slate-800 text-white"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Opening Checkout...</span>
            </>
          ) : isCurrent ? (
            <span>Active Plan</span>
          ) : (
            <>
              <CreditCard size={14} />
              <span>{plan.monthlyPrice === 0 ? "Default Plan" : `Upgrade to ${plan.name}`}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
