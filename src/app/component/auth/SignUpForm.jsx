"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, UserRound, Building, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { authService } from '../../../services/authService';

const INPUT_BASE_CLASS =
  "h-[48px] w-full rounded-[14px] border border-[#dcdce5] bg-white pl-[58px] pr-12 text-[14px] font-medium text-[#181922] shadow-[0_3px_10px_rgba(24,25,34,0.08)] outline-none transition placeholder:text-[#a0a1ad] focus:border-[#4f46ef] focus:ring-4 focus:ring-[#4f46ef]/10 disabled:cursor-not-allowed disabled:opacity-60";

function FormField({
  id,
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  disabled,
  Icon,
  trailing,
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-[7px] block text-[13px] font-semibold text-[#171721]">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#aaabb5]">
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
        </span>
        <input
          id={id}
          name={name}
          type={type}
          required
          disabled={disabled}
          placeholder={placeholder}
          className={INPUT_BASE_CLASS}
          value={value}
          onChange={onChange}
        />
        {trailing ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {trailing}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function SignUpForm() {
  const router = useRouter();
  const [roleTab, setRoleTab] = useState('candidate'); // 'candidate' | 'company'
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // OTP Verification Modal State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (formData.password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long!');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match!');
      return;
    }

    setIsPending(true);

    try {
      if (roleTab === 'candidate') {
        const res = await authService.registerCandidate({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        });

        if (res.success) {
          setRegisteredEmail(formData.email);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('pending_verify_email', formData.email);
            sessionStorage.setItem('pending_verify_password', formData.password);
            sessionStorage.setItem('pending_verify_name', formData.fullName);
            sessionStorage.setItem('pending_verify_role', 'candidate');
          }
          router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}&role=candidate`);
        } else {
          setErrorMsg(res.message || 'Registration failed.');
        }
      } else {
        const res = await authService.registerCompany({
          companyName: formData.companyName || `${formData.fullName}'s Company`,
          ownerName: formData.fullName,
          email: formData.email,
          password: formData.password,
        });

        if (res.success) {
          setRegisteredEmail(formData.email);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('pending_verify_email', formData.email);
            sessionStorage.setItem('pending_verify_password', formData.password);
            sessionStorage.setItem('pending_verify_name', formData.fullName);
            sessionStorage.setItem('pending_verify_role', 'company');
          }
          router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}&role=company`);
        } else {
          setErrorMsg(res.message || 'Company registration failed.');
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred during registration.');
    } finally {
      setIsPending(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpValue || otpValue.length < 6) {
      setErrorMsg('Please enter a valid 6-digit OTP code.');
      return;
    }

    setIsPending(true);
    setErrorMsg('');

    try {
      let res;
      if (roleTab === 'candidate') {
        res = await authService.verifyEmail(registeredEmail, otpValue);
      } else {
        res = await authService.verifyCompanyEmail(registeredEmail, otpValue);
      }

      if (res.success) {
        setSuccessMsg('Email verified successfully! Redirecting to login...');
        setShowOtpModal(false);
        setTimeout(() => {
          router.push('/login');
        }, 1200);
      } else {
        setErrorMsg(res.message || 'Invalid OTP code.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'OTP verification failed.');
    } finally {
      setIsPending(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await authService.resendOtp(registeredEmail);
      setSuccessMsg('A new OTP has been sent to your email.');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to resend OTP.');
    }
  };

  return (
    <div className="w-full max-w-[488px] rounded-[18px] border border-[#d8d8df] bg-white px-6 py-5 shadow-[0_10px_26px_rgba(66,68,107,0.10)] md:px-7">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#66687a] hover:text-[#463fe6] transition-colors cursor-pointer group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <span>Back</span>
      </button>

      <div className="mb-3 text-center">
        <h2 className="text-[24px] font-semibold leading-8 tracking-[-0.03em] text-[#11121b]">
          Register Your Account
        </h2>
        <p className="mt-1 text-[13px] text-[#8b8c98]">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[#4b44ec] hover:underline">
            Login
          </Link>
        </p>
      </div>

      {/* Role Toggle Tabs */}
      <div className="mb-4 flex rounded-xl border border-[#e1e2ec] bg-[#f7f8fc] p-1">
        <button
          type="button"
          onClick={() => setRoleTab('candidate')}
          className={`flex-1 rounded-lg py-2 text-[13px] font-semibold transition ${
            roleTab === 'candidate'
              ? 'bg-white text-[#463fe6] shadow-sm'
              : 'text-[#66687a] hover:text-[#11121b]'
          }`}
        >
          Candidate / Job Seeker
        </button>
        <button
          type="button"
          onClick={() => setRoleTab('company')}
          className={`flex-1 rounded-lg py-2 text-[13px] font-semibold transition ${
            roleTab === 'company'
              ? 'bg-white text-[#463fe6] shadow-sm'
              : 'text-[#66687a] hover:text-[#11121b]'
          }`}
        >
          Employer / Recruiter
        </button>
      </div>

      {errorMsg && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-[13px] font-medium text-red-600 border border-red-200">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-[13px] font-medium text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
        <FormField
          id="fullName"
          name="fullName"
          type="text"
          label={roleTab === 'candidate' ? 'Full Name' : 'Contact Person / Recruiter Name'}
          placeholder="Enter full name"
          value={formData.fullName}
          onChange={handleChange}
          disabled={isPending}
          Icon={UserRound}
        />

        {roleTab === 'company' && (
          <FormField
            id="companyName"
            name="companyName"
            type="text"
            label="Company / Organization Name"
            placeholder="Enter company name..."
            value={formData.companyName}
            onChange={handleChange}
            disabled={isPending}
            Icon={Building}
          />
        )}

        <FormField
          id="email"
          name="email"
          type="email"
          label="Work / Official Email"
          placeholder="Enter email address..."
          value={formData.email}
          onChange={handleChange}
          disabled={isPending}
          Icon={Mail}
        />

        <FormField
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          placeholder="Create password"
          value={formData.password}
          onChange={handleChange}
          disabled={isPending}
          Icon={Lock}
          trailing={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#b0b1bb] transition hover:text-[#6d6e7b]"
            >
              {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
            </button>
          }
        />

        <FormField
          id="confirmPassword"
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          label="Confirm Password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isPending}
          Icon={Lock}
        />

        <div className="flex items-start gap-3 pt-1">
          <input
            id="agreeTerms"
            name="agreeTerms"
            type="checkbox"
            required
            disabled={isPending}
            className="mt-0.5 h-[18px] w-[18px] rounded-[5px] border border-[#bdbfd7] accent-[#4e46eb]"
            checked={formData.agreeTerms}
            onChange={handleChange}
          />
          <label htmlFor="agreeTerms" className="select-none text-[12px] leading-5 text-[#66687a]">
            I agree to the <span className="font-medium text-[#4c45eb]">Terms of Service</span> and{' '}
            <span className="font-medium text-[#4c45eb]">Privacy Policy</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-1 flex h-[48px] w-full items-center justify-center rounded-[12px] bg-[#463fe6] px-4 text-[15px] font-medium text-white shadow-[0_10px_18px_rgba(70,63,230,0.24)] transition hover:bg-[#3d36db] disabled:bg-[#aeb0c7]"
        >
          {isPending ? 'Processing Registration...' : 'Create Account'}
        </button>
      </form>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-[#11121b]">Verify Email Address</h3>
            <p className="mt-2 text-xs text-[#66687a]">
              We have sent a 6-digit OTP code to <strong className="text-[#11121b]">{registeredEmail}</strong>. Please enter it below to activate your account.
            </p>

            <form onSubmit={handleVerifyOtp} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#171721]">Enter 6-Digit OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="123456"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  className="mt-1.5 h-12 w-full rounded-xl border border-[#dcdce5] px-4 text-center text-xl font-bold tracking-widest text-[#11121b] outline-none focus:border-[#4f46ef]"
                />
              </div>

              {errorMsg && <p className="text-xs font-semibold text-red-500">{errorMsg}</p>}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="flex-1 rounded-xl border border-[#dcdce5] py-2.5 text-xs font-semibold text-[#66687a] hover:bg-gray-50"
                >
                  Resend OTP
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 rounded-xl bg-[#463fe6] py-2.5 text-xs font-semibold text-white hover:bg-[#3d36db] disabled:bg-gray-300"
                >
                  {isPending ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
