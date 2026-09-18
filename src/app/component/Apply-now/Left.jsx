"use client";

import {
  ArrowLeft,ArrowRight,ChevronDown
} from "lucide-react";

import { personalDetailsData,datasecurity} from "@/Data/job-matching";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
export default function PersonalDetails() {
  const data = personalDetailsData;

  return (
    <section>
    <div className="min-h-screen bg-white px-4 py-8 sm:px-8 lg:px-12 border border-slate-100 shadow-sm">

      {/* Stepper */}
      <div className="mx-auto max-w-6xl">
        <div className="flex items-start justify-between">

          {data.steps.map((step, index) => (
            <div
              key={step.id}
              className="flex w-full flex-col items-center"
            >
              <div className="flex w-full items-center">

                {/* Left Line */}
                {index !== 0 && (
                  <div className="h-1 flex-1 bg-gray-200" />
                )}

                {/* Number */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl font-semibold ${
                    step.id === 1
                      ? "bg-indigo-600 text-white"
                      : "border-2 border-gray-200 bg-white text-gray-500"
                  }`}
                >
                  {step.id}
                </div>

                {/* Right Line */}
                {index !== data.steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 ${
                      step.id === 1
                        ? "bg-indigo-300"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>

              <p
                className={`mt-3 whitespace-nowrap text-sm font-semibold ${
                  step.id === 1
                    ? "text-indigo-600"
                    : "text-gray-500"
                }`}
              >
                {step.title}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* Description */}
      <div className="mx-auto mt-12 max-w-6xl border-t border-gray-200 pt-7">
        <p className="text-sm font-medium text-gray-500">
          {data.description}
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-6xl">

        {/* Personal Information */}
        <h2 className="text-xl font-bold text-gray-900">
          {data.personalInformation.title}
        </h2>

        {/* Full Name + Email */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              {data.personalInformation.fullName.label}
            </label>

            <input
              type="text"
              defaultValue={data.personalInformation.fullName.value}
              className="h-12 w-full rounded-xl border border-gray-200 px-5 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              {data.personalInformation.email.label}
            </label>

            <input
              type="email"
              defaultValue={data.personalInformation.email.value}
              className="h-12 w-full rounded-xl border border-gray-200 px-5 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

        </div>

        {/* Phone + Location */}
        <div className="mt-7 grid grid-cols-1 gap-7 md:grid-cols-2">

          {/* Phone */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              {data.personalInformation.phone.label}
            </label>

            <div className="flex gap-2">

              <button className="flex h-12 w-32 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white shadow-sm">
                <span className="text-xl">🇮🇳</span>

                <span className="font-medium text-gray-700">
                  {data.personalInformation.phone.countryCode}
                </span>

                <ChevronDown size={18} />
              </button>

              <input
                type="tel"
                defaultValue={data.personalInformation.phone.value}
                className="h-12 min-w-0 flex-1 rounded-xl border border-gray-200 px-5 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>
          </div>

          {/* Location */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-gray-700">
              {data.personalInformation.location.label}
            </label>

            <button className="flex h-12 w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-5 shadow-sm">
              <span className="text-gray-700">
                {data.personalInformation.location.value}
              </span>

              <ChevronDown size={20} />
            </button>
          </div>

        </div>

        {/* LinkedIn */}
        <div className="mt-7 max-w-xl">

          <label className="mb-3 block text-sm font-semibold text-gray-700">
            {data.personalInformation.linkedin.label}{" "}
            <span className="font-normal text-gray-500">
              ({data.personalInformation.linkedin.optional})
            </span>
          </label>

          <div className="flex h-14 items-center gap-4 rounded-xl border border-gray-200 px-5 shadow-sm">

          <FaLinkedin className="text-[#0A66C2]" size={20} />

            <input
              type="url"
              defaultValue={data.personalInformation.linkedin.value}
              className="w-full bg-transparent outline-none"
            />

          </div>
        </div>

        {/* Work Authorization */}
        <div className="mt-12 border-t border-gray-200 pt-8">

          <h2 className="text-2xl font-bold text-gray-900">
            {data.workAuthorization.title}
          </h2>

          <p className="mt-8 text-sm font-semibold text-gray-600">
            {data.workAuthorization.question}
          </p>

          <div className="mt-6 flex flex-wrap gap-10">

            {data.workAuthorization.options.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3"
              >
                <input
                  type="radio"
                  name="authorization"
                  value={option.value}
                  defaultChecked={option.checked}
                  className="h-5 w-5 accent-indigo-600"
                />

                <span className="font-semibold text-gray-700">
                  {option.label}
                </span>
              </label>
            ))}

          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">

         <Link href="/Job-Matching/View-Details"> <button className="flex h-12 items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-8 font-semibold text-indigo-600 transition-all duration-200 hover:border-indigo-500 hover:bg-indigo-50">
            <ArrowLeft size={22} />
            {data.buttons.back}
          </button>
</Link>
        <Link href='/Job-Matching/View-Details/Apply-now/Save&Continue'>  <button className="flex h-12 items-center justify-center gap-3 rounded-xl bg-indigo-600 px-10 font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg">
            {data.buttons.continue}
            <ArrowRight size={22} />
          </button> </Link>

        </div>

      </div>
    
    </div>
    <div className="bg-[#f0efff] sm:px-6 sm:p y-6 px-4 py-4 mt-4 rounded-2xl">
  <div></div>

  <div>
    <h2 className="sm:text-lg text-base font-bold">Your data is safe and secure</h2>

    <p className="text-sm font-medium">
      We value your privacy. Your information is encrypted and will only be
      shared with employer.
    </p>

    {datasecurity.map((item, index) => {
      const Icon = item.icon;

      return (
        <div
          key={index}
          className=""
        >
          <span className="flex gap-4 bg-white">
            <span>
              <Icon size={22} />
            </span>

            <span>{item.value}</span>
          </span>
        </div>
      );
    })}
  </div>
</div>
    </section>
  );
}