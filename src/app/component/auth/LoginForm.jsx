"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { authService } from '../../../services/authService';
import { useAuth } from '../../../context/AuthContext';

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
      <label htmlFor={id} className="mb-[9px] block text-[13px] font-semibold text-[#171721]">
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

export default function LoginForm() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  // Forgot Password Modal States
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [forgotPending, setForgotPending] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [demoOtpNotice, setDemoOtpNotice] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsPending(true);

    try {
      const res = await authService.login(formData.identifier, formData.password);
      if (res?.success || res?.data?.accessToken) {
        await refreshUser();
        const userObj = res.data?.user || (typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('hiremind_user')) : null);
        const storedRole = typeof window !== 'undefined' ? localStorage.getItem('hiremind_user_role') : null;
        const role = String(userObj?.role || userObj?.userType || storedRole || '').toLowerCase();
        const isHr = role === 'recruiter' || role === 'company_owner' || role === 'hr' || Boolean(userObj?.isHrTeamMember) || formData.identifier.toLowerCase().includes('hr') || formData.identifier.toLowerCase().includes('recruiter');

        if (isHr) {
          setSuccessMsg('Recruiter & HR Login Successful! Redirecting to HR Portal...');
        } else {
          setSuccessMsg('Login Successful! Redirecting to Dashboard...');
        }

        setTimeout(() => {
          if (isHr) {
            router.push('/recruiter');
          } else {
            router.push('/find-jobs');
          }
        }, 500);
      } else {
        setErrorMsg(res?.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Server error. Please try again later.');
    } finally {
      setIsPending(false);
    }
  };

  const handleGoogleLogin = () => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    window.location.href = `${backendUrl}/auth/google/callback`;
  };

  // Open Forgot Password Modal
  const handleOpenForgot = () => {
    setForgotEmail(formData.identifier || '');
    setForgotStep(1);
    setForgotError('');
    setForgotSuccess('');
    setDemoOtpNotice('');
    setShowForgotModal(true);
  };

  // Step 1: Send Reset OTP
  const handleSendResetOtp = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setForgotError('Please enter your email address.');
      return;
    }

    setForgotError('');
    setForgotSuccess('');
    setForgotPending(true);

    try {
      const res = await authService.forgotPassword(forgotEmail);
      if (res?.success) {
        setForgotSuccess(res.message || `OTP sent to ${forgotEmail}`);
        if (res.otpCode) {
          setDemoOtpNotice(res.otpCode);
        }
        setForgotStep(2);
      } else {
        setForgotError(res?.message || 'Failed to send reset OTP.');
      }
    } catch (err) {
      setForgotError(err.message || 'Failed to send reset OTP.');
    } finally {
      setForgotPending(false);
    }
  };

  // Step 2: Reset Password with OTP
  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!forgotOtp || forgotOtp.length < 6) {
      setForgotError('Please enter the 6-digit OTP code.');
      return;
    }
    if (newPassword.length < 6) {
      setForgotError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setForgotError('Passwords do not match.');
      return;
    }

    setForgotError('');
    setForgotPending(true);

    try {
      const res = await authService.resetPassword(forgotEmail, forgotOtp, newPassword);
      if (res?.success) {
        setSuccessMsg('Password reset successfully! Details pre-filled into login.');
        setFormData({
          identifier: forgotEmail,
          password: newPassword,
        });
        setShowForgotModal(false);
      } else {
        setForgotError(res?.message || 'Password reset failed. Invalid OTP.');
      }
    } catch (err) {
      setForgotError(err.message || 'Password reset failed.');
    } finally {
      setForgotPending(false);
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

      <div className="mb-2 text-center">
        <h2 className="text-[24px] font-semibold leading-8 tracking-[-0.03em] text-[#11121b]">
          Login to Your Account
        </h2>
        <p className="mt-1.5 text-[13px] text-[#8b8c98]">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-[#4b44ec] hover:underline">
            Signup
          </Link>
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-[13px] font-medium text-red-600 border border-red-200">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-[13px] font-medium text-emerald-700 border border-emerald-200">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          id="identifier"
          name="identifier"
          type="text"
          label="Email or Username"
          placeholder="Enter your email or username..."
          value={formData.identifier}
          onChange={handleChange}
          disabled={isPending}
          Icon={Mail}
        />

        <div>
          <FormField
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            disabled={isPending}
            Icon={Lock}
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#b0b1bb] transition hover:text-[#6d6e7b]"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
              </button>
            }
          />
          <div className="mt-1.5 flex justify-end">
            <button
              type="button"
              onClick={handleOpenForgot}
              className="text-[12px] font-semibold text-[#4b44ec] hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-1 flex h-[48px] w-full items-center justify-center rounded-[12px] bg-[#463fe6] px-4 text-[15px] font-medium text-white shadow-[0_10px_18px_rgba(70,63,230,0.24)] transition hover:bg-[#3d36db] disabled:bg-[#aeb0c7]"
        >
          {isPending ? 'Authenticating...' : 'Login'}
        </button>

        <div className="relative flex items-center justify-center py-1.5">
          <div className="h-px w-full bg-[#dfdfea]" />
          <span className="absolute bg-white px-3 text-[13px] text-[#898a98]">or Continue with</span>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex h-[50px] w-full items-center justify-center gap-3 rounded-[14px] border border-[#d7d8e1] bg-white px-4 text-[14px] font-medium text-[#181922] shadow-[0_6px_16px_rgba(39,41,66,0.08)] transition hover:bg-[#f9f9fd]"
          >
            <Image src="/logo/google.png" alt="Google" width={22} height={22} className="h-[22px] w-[22px]" />
            Continue with Google
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2.5 text-[12px] text-[#9d9eac]">
          <ShieldCheck className="h-[15px] w-[15px]" strokeWidth={1.9} />
          Your data is safe and secure with us.
        </div>
      </form>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-lg"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-[#11121b]">
              {forgotStep === 1 ? 'Forgot Password?' : 'Reset Your Password'}
            </h3>
            <p className="mt-1 text-xs text-[#66687a]">
              {forgotStep === 1
                ? 'Enter your registered email address to receive a 6-digit security OTP code.'
                : `Enter the 6-digit OTP sent to ${forgotEmail} and set a new password.`}
            </p>

            {forgotError && (
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-red-50 p-2.5 text-xs font-medium text-red-600 border border-red-200">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{forgotError}</span>
              </div>
            )}

            {forgotSuccess && (
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 p-2.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>{forgotSuccess}</span>
              </div>
            )}

            {demoOtpNotice && (
              <div className="mt-3 rounded-xl bg-indigo-50 border border-indigo-200 p-3 text-center">
                <p className="text-xs text-indigo-700 font-semibold">🔑 Verification OTP Code:</p>
                <p className="text-2xl font-extrabold tracking-widest text-[#463fe6] font-mono mt-1">{demoOtpNotice}</p>
                <p className="text-[11px] text-indigo-600 mt-1">Also sent to Mailpit (http://localhost:8025)</p>
              </div>
            )}

            {forgotStep === 1 ? (
              <form onSubmit={handleSendResetOtp} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#171721] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your registered email..."
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="h-11 w-full rounded-xl border border-[#dcdce5] px-3.5 text-sm text-[#11121b] outline-none focus:border-[#4f46ef]"
                  />
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 rounded-xl border border-[#dcdce5] py-2.5 text-xs font-semibold text-[#66687a] hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={forgotPending}
                    className="flex-1 rounded-xl bg-[#463fe6] py-2.5 text-xs font-semibold text-white hover:bg-[#3d36db] disabled:bg-gray-300"
                  >
                    {forgotPending ? 'Sending Code...' : 'Send Reset OTP'}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetPasswordSubmit} className="mt-4 space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#171721] mb-1">6-Digit OTP Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    placeholder="123456"
                    value={forgotOtp}
                    onChange={(e) => setForgotOtp(e.target.value)}
                    className="h-11 w-full rounded-xl border border-[#dcdce5] px-3.5 text-center text-lg font-bold tracking-widest font-mono text-[#11121b] outline-none focus:border-[#4f46ef]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#171721] mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-11 w-full rounded-xl border border-[#dcdce5] px-3.5 text-sm text-[#11121b] outline-none focus:border-[#4f46ef]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#171721] mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="h-11 w-full rounded-xl border border-[#dcdce5] px-3.5 text-sm text-[#11121b] outline-none focus:border-[#4f46ef]"
                  />
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotStep(1)}
                    className="flex-1 rounded-xl border border-[#dcdce5] py-2.5 text-xs font-semibold text-[#66687a] hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={forgotPending}
                    className="flex-1 rounded-xl bg-[#463fe6] py-2.5 text-xs font-semibold text-white hover:bg-[#3d36db] disabled:bg-gray-300"
                  >
                    {forgotPending ? 'Updating...' : 'Reset Password'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
