"use client";

import React, { useState, useEffect } from "react";
import Header from "../component/common/Header";
import Footer from "../component/common/Footer";
import { 
  Building2, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Loader2, 
  Award,
  Building,
  Check
} from "lucide-react";
import { verificationService } from "@/services/verificationService";
import { useAuth } from "@/context/AuthContext";

export default function CompanyKybPage() {
  const { user } = useAuth();

  // State
  const [kybStatus, setKybStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // Form Fields
  const [cinNumber, setCinNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");

  const [cinFile, setCinFile] = useState(null);
  const [gstFile, setGstFile] = useState(null);
  const [panFile, setPanFile] = useState(null);

  // Fetch KYB status
  useEffect(() => {
    const loadStatus = async () => {
      setIsLoading(true);
      try {
        const res = await verificationService.getCompanyKybStatus();
        if (res?.data) setKybStatus(res.data);
      } catch (e) {
        console.warn("KYB status error:", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadStatus();
  }, []);

  const handleUploadDoc = async (docType, docNumber, file) => {
    if (!docNumber) {
      alert(`Please enter valid ${docType.toUpperCase()} number.`);
      return;
    }
    setIsSubmitting(true);
    try {
      await verificationService.uploadCompanyKybDocument({ docType, docNumber, file });
      alert(`${docType.toUpperCase()} document uploaded successfully!`);
    } catch (e) {
      alert(`Upload error: ${e.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitKyb = async () => {
    setIsSubmitting(true);
    try {
      const res = await verificationService.submitCompanyKyb();
      setKybStatus(prev => ({
        ...prev,
        status: 'pending',
        submittedAt: new Date().toISOString()
      }));
      setSuccessMessage(res?.message || "Company KYB submitted for review!");
    } catch (e) {
      alert("KYB Submission error: " + e.message);
    } finally {
      setIsSubmitting(false);
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
              <Building2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>HireMind Employer Business Verification (KYB)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E2229] font-poppins tracking-tight">
              Get Your Company <span className="text-[#2D24D0]">Verified</span> on HireMind
            </h1>
            <p className="text-[#5E637D] text-xs sm:text-sm leading-relaxed font-medium max-w-2xl mx-auto mt-2">
              Verified companies get the "Verified Employer Badge" on all active job listings, building candidate trust and boosting application volume by 45%.
            </p>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center text-slate-400 text-xs">
              <Loader2 className="w-8 h-8 animate-spin text-[#2D24D0] mb-3" />
              <span>Loading Company KYB Status...</span>
            </div>
          ) : (
            <>
              {/* Realtime Status Alert */}
              {kybStatus?.status === 'approved' && (
                <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-3xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                      <ShieldCheck size={22} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-emerald-900">Company Verified Successfully! 🎉</h3>
                      <p className="text-xs text-emerald-700 font-medium">Your organization is marked as a Verified Employer across HireMind.</p>
                    </div>
                  </div>
                  <span className="bg-emerald-200 text-emerald-900 text-xs font-extrabold px-3 py-1 rounded-full">
                    VERIFIED EMPLOYER
                  </span>
                </div>
              )}

              {kybStatus?.status === 'pending' && (
                <div className="bg-amber-50 border border-amber-200 p-5 rounded-3xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold">
                      <Clock size={20} className="animate-spin" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-amber-900">KYB Application Pending Review ⏳</h3>
                      <p className="text-xs text-amber-700 font-medium">Our verification desk is reviewing your CIN, GST, and PAN documents (24 hrs).</p>
                    </div>
                  </div>
                  <span className="bg-amber-200 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full">
                    PENDING APPROVAL
                  </span>
                </div>
              )}

              {successMessage && (
                <div className="bg-indigo-600 text-white p-4 rounded-2xl text-xs font-bold flex items-center justify-between">
                  <span>✨ {successMessage}</span>
                  <button onClick={() => setSuccessMessage(null)} className="font-bold">✕</button>
                </div>
              )}

              {/* Document Upload Form */}
              {(!kybStatus?.status || kybStatus.status === 'initial' || kybStatus.status === 'draft') && (
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
                  <div className="space-y-1 border-b border-slate-100 pb-4">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Building2 className="text-[#2D24D0]" size={18} />
                      <span>Company Verification Document Checklist</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">Please provide official business entity documentation for verification.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 1. CIN Card */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                        <FileText size={16} className="text-[#2D24D0]" />
                        <span>1. Registration Certificate (CIN)</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter CIN Number"
                        value={cinNumber}
                        onChange={(e) => setCinNumber(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2D24D0]"
                      />
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setCinFile(e.target.files[0])}
                        className="text-xs text-slate-500 w-full"
                      />
                      <button
                        onClick={() => handleUploadDoc('cin', cinNumber, cinFile)}
                        className="w-full py-2 bg-[#2D24D0] text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Upload CIN
                      </button>
                    </div>

                    {/* 2. GST Card */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                        <FileText size={16} className="text-[#2D24D0]" />
                        <span>2. GST Registration Certificate</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter GSTIN Number"
                        value={gstNumber}
                        onChange={(e) => setGstNumber(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2D24D0]"
                      />
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setGstFile(e.target.files[0])}
                        className="text-xs text-slate-500 w-full"
                      />
                      <button
                        onClick={() => handleUploadDoc('gst', gstNumber, gstFile)}
                        className="w-full py-2 bg-[#2D24D0] text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Upload GST Certificate
                      </button>
                    </div>

                    {/* 3. PAN Card */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                        <FileText size={16} className="text-[#2D24D0]" />
                        <span>3. Company PAN Card</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter Company PAN"
                        value={panNumber}
                        onChange={(e) => setPanNumber(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2D24D0]"
                      />
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setPanFile(e.target.files[0])}
                        className="text-xs text-slate-500 w-full"
                      />
                      <button
                        onClick={() => handleUploadDoc('pan', panNumber, panFile)}
                        className="w-full py-2 bg-[#2D24D0] text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Upload Company PAN
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 text-center">
                    <button
                      disabled={isSubmitting}
                      onClick={handleSubmitKyb}
                      className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl transition cursor-pointer shadow-md inline-flex items-center gap-2"
                    >
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Submit Company KYB for Verification ✨</span>}
                    </button>
                  </div>
                </div>
              )}

              {/* Verified Employer Benefits */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Award className="text-amber-500" size={20} />
                  <span>Why Get KYB Verified on HireMind?</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    "Golden Verified Badge displayed on all job posts",
                    "High-priority ranking in candidate job search results",
                    "Direct candidate outreach with 100% response rate"
                  ].map((benefit, idx) => (
                    <div key={idx} className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
