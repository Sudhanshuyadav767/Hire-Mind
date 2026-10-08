"use client";

import React, { useState, useEffect } from "react";
import Header from "../component/common/Header";
import Footer from "../component/common/Footer";
import KycStatusBanner from "../component/verification/KycStatusBanner";
import CandidateBadgesGrid from "../component/verification/CandidateBadgesGrid";
import { 
  ShieldCheck, 
  Upload, 
  Camera, 
  CheckCircle2, 
  FileText, 
  Loader2
} from "lucide-react";
import { verificationService } from "@/services/verificationService";
import { useAuth } from "@/context/AuthContext";

/**
 * CandidateKycPage Component
 * Identity verification (KYC) wizard and badges center for job seekers.
 */
export default function CandidateKycPage() {
  const { user } = useAuth();

  // State
  const [kycStatus, setKycStatus] = useState(null);
  const [badges, setBadges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(1); // 1: ID details, 2: Upload Doc, 3: Selfie, 4: Review

  // Form Fields
  const [idType, setIdType] = useState("aadhaar");
  const [idNumber, setIdNumber] = useState("");
  const [idFile, setIdFile] = useState(null);
  const [selfieFile, setSelfieFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch KYC verification status and active badges
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [statusRes, badgeRes] = await Promise.all([
          verificationService.getKycStatus(),
          verificationService.getCandidateBadges()
        ]);

        if (statusRes?.data) setKycStatus(statusRes.data);
        if (badgeRes?.data) setBadges(badgeRes.data);
      } catch (err) {
        console.warn("KYC Status notice:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Handlers
  const handleUploadIdDoc = async () => {
    if (!idNumber.trim()) {
      alert("Please enter a valid document ID number.");
      return;
    }
    setIsSubmitting(true);
    try {
      await verificationService.uploadIdDocument({ idType, idNumber, file: idFile });
      setActiveStep(3);
    } catch (e) {
      alert("Doc upload error: " + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadSelfie = async () => {
    setIsSubmitting(true);
    try {
      await verificationService.uploadSelfie(selfieFile);
      setActiveStep(4);
    } catch (e) {
      alert("Selfie upload error: " + e.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitKyc = async () => {
    setIsSubmitting(true);
    try {
      const res = await verificationService.submitKyc();
      setKycStatus(prev => ({
        ...prev,
        status: 'pending',
        submittedAt: new Date().toISOString()
      }));
      setSuccessMessage(res?.message || "KYC submitted successfully!");
    } catch (e) {
      alert("Submission error: " + e.message);
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
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>HireMind Candidate Trust & Verification Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E2229] font-poppins tracking-tight">
              Get Verified & Stand Out to <span className="text-[#2D24D0]">Top Recruiters</span>
            </h1>
            <p className="text-[#5E637D] text-xs sm:text-sm leading-relaxed font-medium max-w-2xl mx-auto mt-2">
              Verified candidates receive 3x more recruiter interview requests, priority search ranking, and the golden Identity Verified Badge.
            </p>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-8 text-left">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center text-slate-400 text-xs">
              <Loader2 className="w-8 h-8 animate-spin text-[#2D24D0] mb-3" />
              <span>Loading KYC Verification Status...</span>
            </div>
          ) : (
            <>
              {/* Realtime Status Banner Component */}
              <KycStatusBanner 
                kycStatus={kycStatus} 
                onResetStep={() => setActiveStep(1)} 
              />

              {successMessage && (
                <div className="bg-indigo-600 text-white p-4 rounded-2xl text-xs font-bold flex items-center justify-between shadow-md">
                  <span>✨ {successMessage}</span>
                  <button onClick={() => setSuccessMessage(null)} className="font-bold cursor-pointer">✕</button>
                </div>
              )}

              {/* KYC Stepper Wizard (If not approved/pending) */}
              {(!kycStatus?.status || kycStatus.status === 'initial' || kycStatus.status === 'draft' || kycStatus.status === 'rejected') && (
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
                  {/* Wizard Step Tracker */}
                  <div className="flex items-center justify-between max-w-xl mx-auto relative select-none">
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-slate-200 -translate-y-1/2 z-0" />
                    {[
                      { num: 1, label: "ID Type" },
                      { num: 2, label: "Upload Document" },
                      { num: 3, label: "Selfie Check" },
                      { num: 4, label: "Review & Submit" }
                    ].map((step) => (
                      <div key={step.num} className="flex flex-col items-center gap-1 z-10">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition ${
                          activeStep === step.num 
                            ? "bg-[#2D24D0] border-[#2D24D0] text-white shadow-sm"
                            : activeStep > step.num
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "bg-white border-slate-300 text-slate-400"
                        }`}>
                          {activeStep > step.num ? <CheckCircle2 size={16} /> : step.num}
                        </div>
                        <span className={`text-[10px] font-bold ${activeStep >= step.num ? "text-[#2D24D0]" : "text-slate-400"}`}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <hr className="border-slate-100" />

                  {/* Step 1 & 2: Select Document Type & Upload */}
                  {(activeStep === 1 || activeStep === 2) && (
                    <div className="max-w-xl mx-auto space-y-5">
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-slate-900">Step 1: Select Government ID & Document Number</h3>
                        <p className="text-xs text-slate-400 font-medium">Choose an official document issued by the Government of India.</p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[
                          { id: "aadhaar", label: "Aadhaar Card" },
                          { id: "pan", label: "PAN Card" },
                          { id: "passport", label: "Passport" },
                          { id: "driving_license", label: "Driving License" },
                          { id: "voter_id", label: "Voter ID" }
                        ].map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setIdType(item.id)}
                            className={`p-3 rounded-2xl border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                              idType === item.id 
                                ? "bg-indigo-50 border-[#2D24D0] text-[#2D24D0] shadow-2xs" 
                                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            <FileText size={16} />
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Enter Document ID Number</label>
                        <input
                          type="text"
                          placeholder="e.g. XXXX-XXXX-4921 or ABCDE1234F"
                          value={idNumber}
                          onChange={(e) => setIdNumber(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:border-[#2D24D0]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Upload Front Document (JPG, PNG or PDF)</label>
                        <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/40 p-6 rounded-2xl text-center space-y-2">
                          <Upload className="w-8 h-8 mx-auto text-[#2D24D0]" />
                          <p className="text-xs text-slate-600 font-semibold">
                            {idFile ? idFile.name : "Drag and drop or click to upload ID File"}
                          </p>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => setIdFile(e.target.files[0])}
                            className="hidden"
                            id="id-file-input"
                          />
                          <label htmlFor="id-file-input" className="inline-block px-4 py-1.5 bg-[#2D24D0] text-white text-xs font-bold rounded-xl cursor-pointer">
                            Browse File
                          </label>
                        </div>
                      </div>

                      <button
                        disabled={isSubmitting}
                        onClick={handleUploadIdDoc}
                        className="w-full py-3 bg-[#2D24D0] hover:bg-[#1e1c75] text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Continue to Selfie Check →</span>}
                      </button>
                    </div>
                  )}

                  {/* Step 3: Upload Selfie */}
                  {activeStep === 3 && (
                    <div className="max-w-xl mx-auto space-y-5">
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-slate-900">Step 2: Live Selfie Photo Verification</h3>
                        <p className="text-xs text-slate-400 font-medium">Take a clear photo facing forward without glasses or hats.</p>
                      </div>

                      <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/40 p-8 rounded-2xl text-center space-y-3">
                        <Camera className="w-10 h-10 mx-auto text-[#2D24D0]" />
                        <p className="text-xs text-slate-700 font-bold">
                          {selfieFile ? selfieFile.name : "Upload or Take Selfie"}
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setSelfieFile(e.target.files[0])}
                          className="hidden"
                          id="selfie-file-input"
                        />
                        <label htmlFor="selfie-file-input" className="inline-block px-4 py-2 bg-[#2D24D0] text-white text-xs font-bold rounded-xl cursor-pointer">
                          Select Selfie Photo
                        </label>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setActiveStep(1)}
                          className="w-1/3 py-3 border border-slate-200 text-slate-600 rounded-2xl text-xs font-bold cursor-pointer"
                        >
                          ← Back
                        </button>
                        <button
                          disabled={isSubmitting}
                          onClick={handleUploadSelfie}
                          className="w-2/3 py-3 bg-[#2D24D0] hover:bg-[#1e1c75] text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        >
                          {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Review Summary →</span>}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Final Submission Review */}
                  {activeStep === 4 && (
                    <div className="max-w-xl mx-auto space-y-5">
                      <div className="space-y-1">
                        <h3 className="text-base font-bold text-slate-900">Step 3: Confirm & Submit KYC Application</h3>
                        <p className="text-xs text-slate-400 font-medium">Verify your details before submitting for official verification badge.</p>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2 text-xs">
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-500 font-bold">Document Type:</span>
                          <span className="font-extrabold text-slate-900 uppercase">{idType}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                          <span className="text-slate-500 font-bold">Document Number:</span>
                          <span className="font-extrabold text-slate-900">{idNumber || "Uploaded"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-bold">Selfie Photo:</span>
                          <span className="font-extrabold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 size={13} /> Attached
                          </span>
                        </div>
                      </div>

                      <button
                        disabled={isSubmitting}
                        onClick={handleSubmitKyc}
                        className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Submit KYC for Review ✨</span>}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Candidate Badges Showcase Grid Component */}
              <CandidateBadgesGrid isKycApproved={kycStatus?.status === 'approved'} />
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
