"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldCheck, ArrowLeft, RefreshCw, AlertCircle, CheckCircle2, Mail, Lock } from 'lucide-react';
import { authService } from '../../../services/authService';

export default function OtpVerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract initial email & role from search params or storage
  const paramEmail = searchParams.get('email') || '';
  const paramRole = searchParams.get('role') || 'candidate'; // 'candidate' | 'company'

  const [email, setEmail] = useState('');
  const [role, setRole] = useState('candidate');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [resendCooldown, setResendCooldown] = useState(60);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    // Populate email and role from params or sessionStorage fallback
    if (paramEmail) {
      setEmail(paramEmail);
    } else if (typeof window !== 'undefined') {
      const savedEmail = sessionStorage.getItem('pending_verify_email') || '';
      setEmail(savedEmail);
    }

    if (paramRole) {
      setRole(paramRole);
    } else if (typeof window !== 'undefined') {
      const savedRole = sessionStorage.getItem('pending_verify_role') || 'candidate';
      setRole(savedRole);
    }
  }, [paramEmail, paramRole]);

  // Countdown timer for Resend OTP
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleDigitChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    // Take last entered character if length > 1
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (errorMsg) setErrorMsg('');

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move back to previous box on backspace if current is empty
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d{6}$/.test(pastedData)) {
      setErrorMsg('Please paste a valid 6-digit numerical code.');
      return;
    }

    const digits = pastedData.split('');
    setOtp(digits);
    if (errorMsg) setErrorMsg('');
    inputRefs.current[5]?.focus();
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setErrorMsg('Please enter all 6 digits of the OTP verification code.');
      return;
    }

    if (!email) {
      setErrorMsg('Email address is missing. Please register again or go back.');
      return;
    }

    setIsPending(true);

    try {
      let res;
      if (role === 'company' || role === 'recruiter') {
        res = await authService.verifyCompanyEmail(email, otpCode);
      } else {
        res = await authService.verifyEmail(email, otpCode);
      }

      if (res && res.success) {
        setSuccessMsg('Account verified! Logging you in automatically...');

        const savedPassword = typeof window !== 'undefined' ? sessionStorage.getItem('pending_verify_password') : null;
        const savedName = typeof window !== 'undefined' ? sessionStorage.getItem('pending_verify_name') : null;

        if (savedName && typeof window !== 'undefined') {
          const parts = savedName.trim().split(/\s+/).filter(Boolean);
          const initialProfile = {
            firstName: parts[0] || 'User',
            lastName: parts.slice(1).join(' ') || '',
            email: email,
            username: email.split('@')[0],
          };
          localStorage.setItem('hiremind_user_profile', JSON.stringify(initialProfile));
        }

        if (savedPassword) {
          try {
            await authService.login(email, savedPassword);
          } catch (loginErr) {
            console.warn('Auto-login notice:', loginErr);
          }
        }

        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('pending_verify_email');
          sessionStorage.removeItem('pending_verify_password');
          sessionStorage.removeItem('pending_verify_name');
          sessionStorage.removeItem('pending_verify_role');
        }

        setSuccessMsg('Email verified & logged in! Redirecting to your profile...');
        setTimeout(() => {
          if (role === 'company' || role === 'recruiter') {
            router.push('/recruiter');
          } else {
            router.push('/profile');
          }
        }, 1000);
      } else {
        setErrorMsg(res?.message || 'Invalid or expired OTP verification code.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'OTP verification failed. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isResending) return;

    if (!email) {
      setErrorMsg('Email address is missing.');
      return;
    }

    setIsResending(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await authService.resendOtp(email, 'email_verification');
      if (res && res.success) {
        setSuccessMsg(`A new 6-digit OTP has been sent to ${email}`);
        setResendCooldown(60);
      } else {
        setErrorMsg(res?.message || 'Failed to resend OTP code.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to resend OTP code.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-[488px] rounded-[22px] border border-[#d8d8df] bg-white px-6 py-7 shadow-[0_12px_32px_rgba(66,68,107,0.12)] md:px-8">
      {/* Back Link */}
      <div className="mb-4 flex items-center">
        <Link
          href="/signup"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#66687a] transition hover:text-[#463fe6]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Sign Up</span>
        </Link>
      </div>

      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#463fe6]/10 text-[#463fe6]">
          <ShieldCheck className="h-8 w-8" strokeWidth={2} />
        </div>
        <h2 className="text-[24px] font-bold leading-8 tracking-[-0.03em] text-[#11121b]">
          Verify Email Address
        </h2>
        <p className="mt-1.5 text-[13px] leading-5 text-[#66687a]">
          We sent a 6-digit security code to{' '}
          <span className="font-semibold text-[#11121b]">{email || 'your email address'}</span>
        </p>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-[13px] font-medium text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Success Alert */}
      {successMsg && (
        <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-[13px] font-medium text-emerald-700">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* OTP Form */}
      <form onSubmit={handleVerifySubmit} className="mt-6 space-y-6">
        <div>
          <label className="mb-2.5 block text-center text-[13px] font-semibold text-[#171721]">
            Enter 6-Digit Verification Code
          </label>
          <div className="flex justify-between gap-2 sm:gap-2.5" onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                disabled={isPending}
                className="h-13 w-11 rounded-xl border border-[#dcdce5] bg-[#f9fafb] text-center text-[22px] font-bold text-[#11121b] shadow-sm outline-none transition focus:border-[#463fe6] focus:bg-white focus:ring-4 focus:ring-[#463fe6]/10 disabled:opacity-60 sm:h-14 sm:w-13"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending || otp.join('').length < 6}
          className="flex h-[48px] w-full items-center justify-center rounded-[12px] bg-[#463fe6] text-[15px] font-semibold text-white shadow-[0_10px_20px_rgba(70,63,230,0.25)] transition hover:bg-[#3d36db] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-[#aeb0c7] disabled:shadow-none"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Verifying Code...
            </span>
          ) : (
            'Verify & Activate Account'
          )}
        </button>
      </form>

      {/* Resend OTP Footer */}
      <div className="mt-6 text-center text-[13px] text-[#66687a]">
        <p>Didn't receive the OTP code?</p>
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={resendCooldown > 0 || isResending}
          className="mt-1.5 inline-flex items-center gap-1.5 font-semibold text-[#463fe6] transition hover:underline disabled:cursor-not-allowed disabled:text-[#a0a1ad] disabled:no-underline"
        >
          {isResending ? (
            <span className="flex items-center gap-1">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              Sending...
            </span>
          ) : resendCooldown > 0 ? (
            `Resend OTP in ${resendCooldown}s`
          ) : (
            'Resend OTP Code'
          )}
        </button>
      </div>

      {/* Secondary Helper Link */}
      <div className="mt-6 border-t border-[#f0f0f5] pt-4 text-center">
        <p className="text-[12px] text-[#8b8c98]">
          Entered wrong email?{' '}
          <Link href="/signup" className="font-semibold text-[#463fe6] hover:underline">
            Register again
          </Link>
        </p>
      </div>
    </div>
  );
}
