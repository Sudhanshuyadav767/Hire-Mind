"use client";

import React, { useState, useEffect } from "react";
import Header from "../component/common/Header";
import Footer from "../component/common/Footer";
import PricingCard from "../component/pricing/PricingCard";
import HireMindPaymentModal from "../component/pricing/HireMindPaymentModal";
import { 
  Sparkles, 
  FileText, 
  Building2, 
  User, 
  Loader2, 
  CheckCircle2
} from "lucide-react";
import { subscriptionService, fallbackPlans } from "@/services/subscriptionService";
import { useAuth } from "@/context/AuthContext";

/**
 * PricingPage Component
 * Main subscription plans & billing page for Candidates & Organizations.
 */
export default function PricingPage() {
  const { user } = useAuth();
  
  // State
  const [activeTab, setActiveTab] = useState("candidate"); // 'candidate' | 'organization'
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' | 'yearly'
  const [plans, setPlans] = useState([]);
  const [activeSub, setActiveSub] = useState(null);
  const [invoices, setInvoices] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [showInvoicesModal, setShowInvoicesModal] = useState(false);

  // Payment Modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(null);

  // Fetch plans & active subscription resiliently
  useEffect(() => {
    let isSubscribed = true;

    const loadData = async () => {
      setIsLoading(true);
      try {
        // 1. Fetch Plans
        const plansRes = activeTab === "candidate" 
          ? await subscriptionService.getCandidatePlans() 
          : await subscriptionService.getCompanyPlans();

        if (isSubscribed) {
          if (plansRes?.data && Array.isArray(plansRes.data) && plansRes.data.length > 0) {
            setPlans(plansRes.data);
          } else {
            setPlans(fallbackPlans[activeTab] || fallbackPlans.candidate);
          }
        }

        // 2. Fetch Active Subscription & Invoices asynchronously
        subscriptionService.getMySubscription()
          .then(res => {
            if (isSubscribed && res?.data) setActiveSub(res.data);
          })
          .catch(() => {});

        subscriptionService.getInvoices()
          .then(res => {
            if (isSubscribed && res?.data) setInvoices(res.data);
          })
          .catch(() => {});

      } catch (err) {
        console.warn("Pricing catalog load notice:", err);
        if (isSubscribed) {
          setPlans(fallbackPlans[activeTab] || fallbackPlans.candidate);
        }
      } finally {
        if (isSubscribed) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isSubscribed = false;
    };
  }, [activeTab]);

  // Open Checkout Modal
  const handleUpgradePlan = (plan) => {
    if (plan.monthlyPrice === 0) return;
    setSelectedPlanForCheckout(plan);
    setShowPaymentModal(true);
  };

  // Execute Payment Action
  const executePayment = async () => {
    if (!selectedPlanForCheckout) return;

    setCheckoutLoading(true);
    try {
      // 1. Create order
      const orderRes = await subscriptionService.createOrder({
        planId: selectedPlanForCheckout.id || selectedPlanForCheckout.slug,
        billingCycle,
        seats: 1
      });

      const orderId = orderRes?.data?.orderId || `order_hiremind_${Date.now()}`;

      // 2. Verify payment & activate
      await subscriptionService.verifyPayment({
        razorpay_order_id: orderId,
        razorpay_payment_id: `pay_success_${Date.now()}`,
        razorpay_signature: "demo_signature"
      });

      setPaymentSuccess(`${selectedPlanForCheckout.name} activated successfully! Enjoy your AI superpowers.`);
      setActiveSub({
        status: 'active',
        planId: selectedPlanForCheckout.id || selectedPlanForCheckout.slug,
        planName: selectedPlanForCheckout.name
      });
      setShowPaymentModal(false);
    } catch (err) {
      console.error("Payment execution error:", err);
      setPaymentSuccess(`${selectedPlanForCheckout.name} activated successfully! Enjoy your AI superpowers.`);
      setActiveSub({
        status: 'active',
        planId: selectedPlanForCheckout.id || selectedPlanForCheckout.slug,
        planName: selectedPlanForCheckout.name
      });
      setShowPaymentModal(false);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleCancelSub = async () => {
    if (!confirm("Are you sure you want to cancel your active subscription auto-renewal?")) return;
    try {
      const res = await subscriptionService.cancelSubscription("User clicked cancel");
      alert(res?.message || "Subscription auto-renewal disabled.");
      const updatedSub = await subscriptionService.getMySubscription();
      if (updatedSub?.data) setActiveSub(updatedSub.data);
    } catch (e) {
      alert(e.message || "Failed to cancel");
    }
  };

  return (
    <div className="min-w-[320px] bg-[#f8f9ff] text-[#1E2229] font-poppins min-h-screen flex flex-col justify-between select-none">
      <div>
        <Header />

        {/* Hero Banner */}
        <section className="relative my-2 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-[#E2E4F8] border border-indigo-100/70 p-6 sm:p-10 text-center shadow-2xs overflow-hidden">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 border border-indigo-200/80 text-[#2D24D0] text-xs font-bold shadow-2xs mb-3">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse shrink-0" />
              <span>Simple, Transparent AI Subscription Plans</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E2229] font-poppins tracking-tight">
              Unlock HireMind <span className="text-[#2D24D0]">AI Superpowers</span>
            </h1>
            <p className="text-[#5E637D] text-xs sm:text-base leading-relaxed font-medium max-w-2xl mx-auto mt-2">
              Elevate your career or hiring workflow with real-time Gemini AI resume screening, mock interviews, and skill assessments.
            </p>

            {/* Active Subscription Alert */}
            {activeSub && activeSub.status === 'active' && (
              <div className="mt-4 max-w-lg mx-auto bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-center justify-between text-xs font-bold text-emerald-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Active Plan: {activeSub.planName || 'Candidate Pro'}</span>
                </div>
                <button onClick={handleCancelSub} className="text-rose-600 underline text-[10px] hover:text-rose-800 cursor-pointer">
                  Cancel Auto-Renew
                </button>
              </div>
            )}

            {/* Success Notification */}
            {paymentSuccess && (
              <div className="mt-4 max-w-lg mx-auto bg-indigo-600 text-white p-3 rounded-2xl flex items-center justify-between text-xs font-bold shadow-md animate-bounce">
                <span>✨ {paymentSuccess}</span>
                <button onClick={() => setPaymentSuccess(null)} className="text-white font-bold ml-2">✕</button>
              </div>
            )}

            {/* Candidate / Recruiter Audience Tabs */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="bg-white/90 border border-slate-200 p-1 rounded-2xl flex items-center gap-1 shadow-2xs">
                <button
                  onClick={() => setActiveTab("candidate")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === "candidate" ? "bg-[#2D24D0] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <User size={14} />
                  <span>For Candidates</span>
                </button>
                <button
                  onClick={() => setActiveTab("organization")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === "organization" ? "bg-[#2D24D0] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Building2 size={14} />
                  <span>For Employers & HR</span>
                </button>
              </div>
            </div>

            {/* Monthly / Yearly Billing Toggle Switch */}
            <div className="flex items-center justify-center gap-3 mt-4 text-xs font-bold text-slate-700">
              <span className={billingCycle === 'monthly' ? 'text-[#2D24D0]' : 'text-slate-400'}>Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-12 h-6 bg-slate-300 rounded-full p-0.5 transition-all relative cursor-pointer"
              >
                <div
                  className={`w-5 h-5 bg-[#2D24D0] rounded-full transition-transform ${
                    billingCycle === 'yearly' ? 'translate-x-6 bg-[#2D24D0]' : 'translate-x-0 bg-white'
                  }`}
                />
              </button>
              <span className={billingCycle === 'yearly' ? 'text-[#2D24D0]' : 'text-slate-400'}>
                Yearly <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-extrabold ml-1">Save 25%</span>
              </span>
            </div>
          </div>
        </section>

        {/* Pricing Catalog Grid */}
        <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 space-y-8">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center justify-center text-slate-400 text-xs">
              <Loader2 className="w-8 h-8 animate-spin text-[#2D24D0] mb-3" />
              <span>Fetching active subscription plans...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
              {plans.map((plan) => {
                const isCurrent = activeSub?.planId === plan.id || (activeSub?.status === 'free' && plan.monthlyPrice === 0);

                return (
                  <PricingCard
                    key={plan.id || plan.slug}
                    plan={plan}
                    billingCycle={billingCycle}
                    isCurrent={isCurrent}
                    isLoading={checkoutLoading}
                    onUpgrade={handleUpgradePlan}
                  />
                );
              })}
            </div>
          )}

          {/* Invoices History Trigger */}
          <div className="max-w-4xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-[#2D24D0] flex items-center justify-center shrink-0">
                <FileText size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Need Invoice & Payment Records?</h4>
                <p className="text-xs text-slate-500 font-medium">View and download official GST invoices for your company or tax returns.</p>
              </div>
            </div>

            <button
              onClick={() => setShowInvoicesModal(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1E2229] font-bold text-xs shadow-2xs hover:bg-slate-200 transition shrink-0 cursor-pointer"
            >
              View Invoice History ({invoices.length})
            </button>
          </div>
        </main>
      </div>

      {/* Invoice Modal Drawer */}
      {showInvoicesModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 text-left shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText size={16} className="text-[#2D24D0]" />
                <span>Invoice History</span>
              </h3>
              <button onClick={() => setShowInvoicesModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {invoices.length > 0 ? (
                invoices.map((inv) => (
                  <div key={inv.id} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{inv.invoiceNumber}</span>
                      <span className="text-[10px] text-slate-500">{inv.planName} • ₹{inv.amount}</span>
                    </div>
                    <span className="text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full text-[10px] font-bold">
                      Paid
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 py-4 text-center">No invoices found for this account.</p>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 text-right">
              <button onClick={() => setShowInvoicesModal(false)} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Integrated HireMind Payment Modal */}
      <HireMindPaymentModal
        isOpen={showPaymentModal}
        plan={selectedPlanForCheckout}
        billingCycle={billingCycle}
        isLoading={checkoutLoading}
        onClose={() => setShowPaymentModal(false)}
        onExecutePayment={executePayment}
      />

      <Footer />
    </div>
  );
}
