"use client";

import React, { useState, useEffect } from "react";
import Header from "../../component/common/Header";
import Footer from "../../component/common/Footer";
import { 
  ShieldCheck, 
  Building2, 
  UserCheck, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Eye, 
  Loader2, 
  Award, 
  AlertTriangle,
  Sparkles
} from "lucide-react";
import { verificationService } from "@/services/verificationService";
import { useAuth } from "@/context/AuthContext";

export default function AdminVerificationPage() {
  const { user } = useAuth();

  // State
  const [activeTab, setActiveTab] = useState("kyc"); // 'kyc' | 'kyb' | 'badges'
  const [pendingKyc, setPendingKyc] = useState([]);
  const [pendingKyb, setPendingKyb] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Review Modal State
  const [selectedKyc, setSelectedKyc] = useState(null);
  const [selectedKyb, setSelectedKyb] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Load Pending Requests
  useEffect(() => {
    const loadPending = async () => {
      setIsLoading(true);
      try {
        const [kycRes, kybRes] = await Promise.all([
          verificationService.getPendingKycList(),
          verificationService.getPendingKybList()
        ]);

        if (kycRes?.data) setPendingKyc(kycRes.data);
        if (kybRes?.data) setPendingKyb(kybRes.data);
      } catch (err) {
        console.warn("Admin verification notice:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPending();
  }, [activeTab]);

  // Handle KYC Review
  const handleReviewKyc = async (action) => {
    if (!selectedKyc) return;
    if (action === 'reject' && !rejectionReason.trim()) {
      alert("Please provide a rejection reason.");
      return;
    }

    setIsActionLoading(true);
    try {
      const res = await verificationService.reviewKyc({
        kycId: selectedKyc.id,
        action,
        rejectionReason: action === 'reject' ? rejectionReason : null
      });

      setNotification(res?.message || `KYC ${action}ed successfully!`);
      setPendingKyc(prev => prev.filter(k => k.id !== selectedKyc.id));
      setSelectedKyc(null);
      setRejectionReason("");
    } catch (e) {
      alert("Review action error: " + e.message);
    } finally {
      setIsActionLoading(false);
    }
  };

  // Handle KYB Review
  const handleReviewKyb = async (action) => {
    if (!selectedKyb) return;
    if (action === 'reject' && !rejectionReason.trim()) {
      alert("Please provide a rejection reason.");
      return;
    }

    setIsActionLoading(true);
    try {
      const res = await verificationService.reviewKyb({
        kybId: selectedKyb.id,
        action,
        rejectionReason: action === 'reject' ? rejectionReason : null
      });

      setNotification(res?.message || `KYB ${action}ed successfully!`);
      setPendingKyb(prev => prev.filter(k => k.id !== selectedKyb.id));
      setSelectedKyb(null);
      setRejectionReason("");
    } catch (e) {
      alert("Review action error: " + e.message);
    } finally {
      setIsActionLoading(false);
    }
  };

  // Badge Form State
  const [awardUserId, setAwardUserId] = useState("");
  const [awardBadgeType, setAwardBadgeType] = useState("identity_verified");
  const [revokeBadgeId, setRevokeBadgeId] = useState("");
  const [revokeReason, setRevokeReason] = useState("");

  // Handle Award Badge
  const handleAwardBadge = async () => {
    if (!awardUserId.trim()) {
      alert("Please enter candidate User ID.");
      return;
    }
    setIsActionLoading(true);
    try {
      const res = await verificationService.awardCandidateBadge({
        userId: awardUserId,
        badgeType: awardBadgeType
      });
      setNotification(res?.message || `Badge '${awardBadgeType}' awarded successfully!`);
      setAwardUserId("");
    } catch (e) {
      alert("Award error: " + e.message);
    } finally {
      setIsActionLoading(false);
    }
  };

  // Handle Revoke Badge
  const handleRevokeBadge = async () => {
    if (!revokeBadgeId.trim()) {
      alert("Please enter Badge ID.");
      return;
    }
    setIsActionLoading(true);
    try {
      const res = await verificationService.revokeCandidateBadge(revokeBadgeId, revokeReason);
      setNotification(res?.message || "Badge revoked successfully!");
      setRevokeBadgeId("");
      setRevokeReason("");
    } catch (e) {
      alert("Revoke error: " + e.message);
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f9ff] text-[#1E2229] font-poppins min-h-screen flex flex-col justify-between select-none">
      <div>
        <Header />

        {/* Hero Section */}
        <section className="relative my-2 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-[#E2E4F8] border border-indigo-100/70 p-6 sm:p-10 text-center shadow-2xs overflow-hidden">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 border border-indigo-200/80 text-[#2D24D0] text-xs font-bold shadow-2xs mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>HireMind Administrator Verification & Badge Control Desk</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E2229] font-poppins tracking-tight">
              Verification & <span className="text-[#2D24D0]">Badges Management</span>
            </h1>
            <p className="text-[#5E637D] text-xs sm:text-sm leading-relaxed font-medium max-w-2xl mx-auto mt-2">
              Review pending candidate identity documents (KYC) and employer registration credentials (KYB) to issue verified trust badges.
            </p>

            {/* Navigation Tabs */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="bg-white/90 border border-slate-200 p-1 rounded-2xl flex items-center gap-1 shadow-2xs">
                <button
                  onClick={() => setActiveTab("kyc")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === "kyc" ? "bg-[#2D24D0] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <UserCheck size={14} />
                  <span>Candidate KYC ({pendingKyc.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab("kyb")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === "kyb" ? "bg-[#2D24D0] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Building2 size={14} />
                  <span>Company KYB ({pendingKyb.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab("badges")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === "badges" ? "bg-[#2D24D0] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Award size={14} />
                  <span>Badge Issuer Desk</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-6 text-left">
          {notification && (
            <div className="bg-indigo-600 text-white p-4 rounded-2xl text-xs font-bold flex items-center justify-between shadow-md">
              <span>✨ {notification}</span>
              <button onClick={() => setNotification(null)} className="font-bold">✕</button>
            </div>
          )}

          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center text-slate-400 text-xs">
              <Loader2 className="w-8 h-8 animate-spin text-[#2D24D0] mb-3" />
              <span>Fetching pending verification requests...</span>
            </div>
          ) : (
            <>
              {/* Tab 1: Candidate KYC Queue */}
              {activeTab === "kyc" && (
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-2xs">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <UserCheck className="text-[#2D24D0]" size={18} />
                    <span>Pending Candidate KYC Applications</span>
                  </h3>

                  {pendingKyc.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
                          <tr>
                            <th className="p-3">Candidate</th>
                            <th className="p-3">ID Type</th>
                            <th className="p-3">ID Number</th>
                            <th className="p-3">Submitted At</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {pendingKyc.map((kyc) => (
                            <tr key={kyc.id} className="hover:bg-slate-50/60 transition">
                              <td className="p-3 font-bold text-slate-900">
                                {kyc.userName || kyc.userEmail}
                                <span className="block text-[10px] text-slate-400 font-normal">{kyc.userEmail}</span>
                              </td>
                              <td className="p-3 uppercase font-semibold text-slate-700">{kyc.idType}</td>
                              <td className="p-3 font-mono">{kyc.idNumber}</td>
                              <td className="p-3 text-slate-400">{new Date(kyc.submittedAt).toLocaleDateString()}</td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => setSelectedKyc(kyc)}
                                  className="px-3 py-1.5 bg-[#2D24D0] hover:bg-[#1e1c75] text-white rounded-xl font-bold transition text-xs"
                                >
                                  Review Application
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 py-8 text-center">No pending candidate KYC applications in queue.</p>
                  )}
                </div>
              )}

              {/* Tab 2: Company KYB Queue */}
              {activeTab === "kyb" && (
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-2xs">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building2 className="text-[#2D24D0]" size={18} />
                    <span>Pending Company KYB Applications</span>
                  </h3>

                  {pendingKyb.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
                          <tr>
                            <th className="p-3">Company Name</th>
                            <th className="p-3">CIN Number</th>
                            <th className="p-3">GSTIN Number</th>
                            <th className="p-3">PAN Number</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {pendingKyb.map((kyb) => (
                            <tr key={kyb.id} className="hover:bg-slate-50/60 transition">
                              <td className="p-3 font-bold text-slate-900">{kyb.companyName}</td>
                              <td className="p-3 font-mono">{kyb.cinNumber || "N/A"}</td>
                              <td className="p-3 font-mono">{kyb.gstNumber || "N/A"}</td>
                              <td className="p-3 font-mono">{kyb.panNumber || "N/A"}</td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => setSelectedKyb(kyb)}
                                  className="px-3 py-1.5 bg-[#2D24D0] hover:bg-[#1e1c75] text-white rounded-xl font-bold transition text-xs"
                                >
                                  Review KYB
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 py-8 text-center">No pending company KYB applications in queue.</p>
                  )}
                </div>
              )}

              {/* Tab 3: Badges Issuer & Revoker Desk */}
              {activeTab === "badges" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Award Badge Card */}
                  <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-2xs">
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                      <Sparkles className="text-amber-500" size={18} />
                      <span>Award Badge to Candidate</span>
                    </h3>

                    <div className="space-y-3 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Candidate User ID or Email</label>
                        <input
                          type="text"
                          placeholder="e.g. user_cand_123 or candidate@hiremind.ai"
                          value={awardUserId}
                          onChange={(e) => setAwardUserId(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-[#2D24D0]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Select Badge Type</label>
                        <select
                          value={awardBadgeType}
                          onChange={(e) => setAwardBadgeType(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold focus:outline-none focus:border-[#2D24D0]"
                        >
                          <option value="identity_verified">Identity Verified (Golden Shield)</option>
                          <option value="skill_verified">Skill Verified Candidate (Purple Award)</option>
                          <option value="premium_member">Premium Member (Golden Star)</option>
                          <option value="top_rated">Top 5% Talent (Crown)</option>
                        </select>
                      </div>

                      <button
                        disabled={isActionLoading}
                        onClick={handleAwardBadge}
                        className="w-full py-3 bg-[#2D24D0] hover:bg-[#1e1c75] text-white rounded-xl font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-2"
                      >
                        {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Award Badge to Candidate ✨</span>}
                      </button>
                    </div>
                  </div>

                  {/* Revoke Badge Card */}
                  <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-2xs">
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                      <XCircle className="text-rose-600" size={18} />
                      <span>Revoke Badge</span>
                    </h3>

                    <div className="space-y-3 text-xs">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Badge ID</label>
                        <input
                          type="text"
                          placeholder="e.g. bdg_1001"
                          value={revokeBadgeId}
                          onChange={(e) => setRevokeBadgeId(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-rose-600"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-bold text-slate-700">Revocation Reason</label>
                        <textarea
                          placeholder="Reason for revoking badge..."
                          value={revokeReason}
                          onChange={(e) => setRevokeReason(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:outline-none focus:border-rose-600"
                          rows={2}
                        />
                      </div>

                      <button
                        disabled={isActionLoading}
                        onClick={handleRevokeBadge}
                        className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-2"
                      >
                        {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Revoke Badge ❌</span>}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* KYC Review Modal */}
          {selectedKyc && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 text-left shadow-2xl border border-slate-100">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Review Candidate KYC</h3>
                  <button onClick={() => setSelectedKyc(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <span className="font-bold text-slate-900 block">{selectedKyc.userName}</span>
                    <span className="text-slate-500 font-mono block">{selectedKyc.idType.toUpperCase()}: {selectedKyc.idNumber}</span>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Rejection Reason (If rejecting):</label>
                    <textarea
                      placeholder="e.g. Document image is blurry or expired"
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    disabled={isActionLoading}
                    onClick={() => handleReviewKyc('reject')}
                    className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs"
                  >
                    Reject KYC
                  </button>
                  <button
                    disabled={isActionLoading}
                    onClick={() => handleReviewKyc('approve')}
                    className="w-1/2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1"
                  >
                    {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Approve & Award Badge ✨</span>}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* KYB Review Modal */}
          {selectedKyb && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 text-left shadow-2xl border border-slate-100">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Review Company KYB</h3>
                  <button onClick={() => setSelectedKyb(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                    <span className="font-bold text-slate-900 block">{selectedKyb.companyName}</span>
                    <span className="text-slate-500 font-mono block">CIN: {selectedKyb.cinNumber || "N/A"}</span>
                    <span className="text-slate-500 font-mono block">GSTIN: {selectedKyb.gstNumber || "N/A"}</span>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Rejection Reason (If rejecting):</label>
                    <textarea
                      placeholder="e.g. Invalid CIN registration number"
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    disabled={isActionLoading}
                    onClick={() => handleReviewKyb('reject')}
                    className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs"
                  >
                    Reject KYB
                  </button>
                  <button
                    disabled={isActionLoading}
                    onClick={() => handleReviewKyb('approve')}
                    className="w-1/2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1"
                  >
                    {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Approve & Verify Company ✨</span>}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
