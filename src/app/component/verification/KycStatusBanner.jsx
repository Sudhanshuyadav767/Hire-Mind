"use client";

import React from "react";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";

/**
 * KycStatusBanner Component
 * Displays the current candidate KYC verification status (Approved, Pending, Rejected).
 *
 * @param {Object} props
 * @param {Object} props.kycStatus - KYC Status object from backend/service
 * @param {Function} props.onResetStep - Callback to reset wizard step if rejected
 */
export default function KycStatusBanner({ kycStatus, onResetStep }) {
  if (!kycStatus?.status) return null;

  switch (kycStatus.status) {
    case "approved":
      return (
        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-3xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-900">Identity Verification Complete! 🎉</h3>
              <p className="text-xs text-emerald-700 font-medium">Your account is fully verified with the Golden Candidate Badge.</p>
            </div>
          </div>
          <span className="bg-emerald-200 text-emerald-900 text-xs font-extrabold px-3 py-1 rounded-full shrink-0">
            STATUS: APPROVED
          </span>
        </div>
      );

    case "pending":
      return (
        <div className="bg-amber-50 border border-amber-200 p-5 rounded-3xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">
              <Clock size={20} className="animate-spin" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-900">KYC Application Under Review ⏳</h3>
              <p className="text-xs text-amber-700 font-medium">Our compliance team is reviewing your documents (approx. 24 hours).</p>
            </div>
          </div>
          <span className="bg-amber-200 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full shrink-0">
            STATUS: PENDING REVIEW
          </span>
        </div>
      );

    case "rejected":
      return (
        <div className="bg-rose-50 border border-rose-200 p-5 rounded-3xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-bold shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-rose-900">Verification Need Attention</h3>
              <p className="text-xs text-rose-700 font-medium">{kycStatus.rejectionReason || "Uploaded ID document or selfie image was unreadable."}</p>
            </div>
          </div>
          <button 
            onClick={onResetStep} 
            className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer shrink-0"
          >
            Re-submit KYC
          </button>
        </div>
      );

    default:
      return null;
  }
}
