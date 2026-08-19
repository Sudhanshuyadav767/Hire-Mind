"use client";

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail, ShieldCheck, UserRound } from 'lucide-react';

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

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleActionSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    startTransition(async () => {
      console.log('Submitting secure payload...', formData);
    });
  };

  return (
    <div className="w-full max-w-[488px] rounded-[18px] border border-[#d8d8df] bg-white px-6 py-5 shadow-[0_10px_26px_rgba(66,68,107,0.10)] md:px-7">
      <div className="mb-2 text-center">
        <h2 className="text-[24px] font-semibold leading-8 tracking-[-0.03em] text-[#11121b]">
          Login to Your Account
        </h2>
        <p className="mt-1.5 text-[13px] text-[#8b8c98]">
          Don't have an account?{' '}
          <Link href="/signup" className="font-semibold text-[#4b44ec] hover:underline">
            Signup
          </Link>
        </p>
      </div>

      <form onSubmit={handleActionSubmit} className="space-y-4">
      

        <FormField
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email..."
          value={formData.email}
          onChange={handleChange}
          disabled={isPending}
          Icon={Mail}
        />

        <FormField
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Confirm Password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          disabled={isPending}
          Icon={Lock}
          trailing={(
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#b0b1bb] transition hover:text-[#6d6e7b]"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
            </button>
          )}
        />

      

        <div className="flex items-start gap-3 pt-0.5">
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
          {isPending ? 'Processing...' : 'Sign Up'}
        </button>

        <div className="relative flex items-center justify-center py-1.5">
          <div className="h-px w-full bg-[#dfdfea]" />
          <span className="absolute bg-white rounded-2xl px-1 text-[13px] text-[#898a98]">or Continue with</span>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            className="flex h-[50px] w-full items-center justify-center gap-3 rounded-[14px] border border-[#d7d8e1] bg-white px-4 text-[14px] font-medium text-[#181922] shadow-[0_6px_16px_rgba(39,41,66,0.08)] transition hover:bg-[#f9f9fd]"
          >
            <Image src="/logo/google.png" alt="Google" width={22} height={22} className="h-[22px] w-[22px]" />
            Continue with Google
          </button>
          <button
            type="button"
            className="flex h-[50px] w-full items-center justify-center gap-3 rounded-[14px] border border-[#d7d8e1] bg-white px-4 text-[14px] font-medium text-[#181922] shadow-[0_6px_16px_rgba(39,41,66,0.08)] transition hover:bg-[#f9f9fd]"
          >
            <Image src="/logo/apple.png" alt="Apple" width={22} height={22} className="h-[22px] w-[22px]" />
            Continue with Apple
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2.5 text-[12px] text-[#9d9eac]">
          <ShieldCheck className="h-[15px] w-[15px]" strokeWidth={1.9} />
          Your data is safe and secure with us.
        </div>
      </form>
    </div>
  );
}
