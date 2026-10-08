"use client";

import React, { useState } from "react";
import { 
  Lock, 
  QrCode, 
  CreditCard, 
  Building2, 
  Smartphone, 
  Loader2, 
  ShieldCheck 
} from "lucide-react";

/**
 * HireMindPaymentModal Component
 * Interactive, secure checkout modal supporting Card, UPI, and Net Banking options.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {Object} props.plan - Selected plan details (name, price)
 * @param {string} props.billingCycle - 'monthly' or 'yearly'
 * @param {boolean} props.isLoading - Processing payment spinner state
 * @param {Function} props.onClose - Modal close handler
 * @param {Function} props.onExecutePayment - Payment submit handler
 */
export default function HireMindPaymentModal({
  isOpen,
  plan,
  billingCycle = "monthly",
  isLoading = false,
  onClose,
  onExecutePayment
}) {
  const [paymentMethod, setPaymentMethod] = useState("upi"); // 'upi' | 'card' | 'netbanking'
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  if (!isOpen || !plan) return null;

  const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 text-left shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#2D24D0]">
              <Lock size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">HireMind Secure Checkout</h3>
              <p className="text-[11px] text-slate-400 font-semibold">256-Bit Encrypted Payment</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 font-bold text-base cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Plan Price Summary */}
        <div className="bg-[#E2E4F8]/70 border border-indigo-100 p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Selected Plan</span>
            <b className="text-lg font-extrabold text-slate-900">{plan.name}</b>
            <span className="text-xs text-slate-500 block font-medium">({billingCycle.toUpperCase()} Billing)</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-extrabold text-[#2D24D0]">
              ₹{price}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold block">Incl. all taxes</span>
          </div>
        </div>

        {/* Payment Options Selector */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Select Payment Method</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPaymentMethod("upi")}
              className={`p-3 rounded-2xl border text-xs font-bold transition flex flex-col items-center gap-1.5 cursor-pointer ${
                paymentMethod === "upi" ? "bg-indigo-50/80 border-[#2D24D0] text-[#2D24D0] shadow-2xs" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <QrCode size={18} />
              <span>UPI / QR</span>
            </button>
            <button
              onClick={() => setPaymentMethod("card")}
              className={`p-3 rounded-2xl border text-xs font-bold transition flex flex-col items-center gap-1.5 cursor-pointer ${
                paymentMethod === "card" ? "bg-indigo-50/80 border-[#2D24D0] text-[#2D24D0] shadow-2xs" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <CreditCard size={18} />
              <span>Card</span>
            </button>
            <button
              onClick={() => setPaymentMethod("netbanking")}
              className={`p-3 rounded-2xl border text-xs font-bold transition flex flex-col items-center gap-1.5 cursor-pointer ${
                paymentMethod === "netbanking" ? "bg-indigo-50/80 border-[#2D24D0] text-[#2D24D0] shadow-2xs" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <Building2 size={18} />
              <span>Net Banking</span>
            </button>
          </div>
        </div>

        {/* Form Input per Payment Method */}
        {paymentMethod === "upi" && (
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-bold">
              <Smartphone size={15} className="text-[#2D24D0]" />
              <span>Google Pay / PhonePe / Paytm / BHIM</span>
            </div>
            <input
              type="text"
              placeholder="Enter VPA / UPI ID (e.g. candidate@upi)"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2D24D0]"
            />
          </div>
        )}

        {paymentMethod === "card" && (
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2 text-xs">
            <input
              type="text"
              placeholder="Card Number (4111 2222 3333 4444)"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2D24D0]"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="MM/YY"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2D24D0]"
              />
              <input
                type="password"
                placeholder="CVV"
                maxLength={4}
                value={cardCvc}
                onChange={(e) => setCardCvc(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium focus:outline-none focus:border-[#2D24D0]"
              />
            </div>
          </div>
        )}

        {paymentMethod === "netbanking" && (
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-2 text-xs">
            <span className="text-slate-600 font-bold block">Popular Banks:</span>
            <div className="flex flex-wrap gap-2">
              {["HDFC Bank", "State Bank of India", "ICICI Bank", "Axis Bank"].map((bank, i) => (
                <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 text-[11px]">
                  {bank}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Submit Pay CTA */}
        <button
          disabled={isLoading}
          onClick={onExecutePayment}
          className="w-full py-3.5 rounded-2xl bg-[#2D24D0] hover:bg-[#1e1c75] text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing Payment & Activating Plan...</span>
            </>
          ) : (
            <>
              <ShieldCheck size={16} />
              <span>Pay ₹{price} & Activate Plan</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
