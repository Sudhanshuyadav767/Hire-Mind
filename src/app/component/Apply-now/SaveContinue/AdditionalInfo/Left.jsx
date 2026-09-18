"use client";

import { useState } from "react";
import {AdditionalInfo} from "@/Data/data1"
import { Check,FileText,  ChevronDown,
  ArrowLeft, } from "lucide-react";
import Link from "next/link";
  export default function Additionalinfo() {
  const [highestDegree, setHighestDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [university, setUniversity] = useState("");
  const [graduationYear, setGraduationYear] = useState("");

  const [employmentStatus, setEmploymentStatus] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [currentJobTitle, setCurrentJobTitle] = useState("");
  const [totalExperience, setTotalExperience] = useState("");

  const [noticePeriod, setNoticePeriod] = useState("");
  const [willingToRelocate, setWillingToRelocate] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [aboutYourself, setAboutYourself] = useState("");

  const handleBack = () => {
    // Back logic yahan add karna
  };

  const handleContinue = () => {
    // Continue logic yahan add karna
  };

  
   

    return(
        <main className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-10 border border-slate-200 rounded-2xl mb-4">
      <div className="mx-auto max-w-[1200px]">

        {/* ================= STEP PROGRESS ================= */}
        <div className="mb-10 flex items-start justify-between">

          {/* STEP 1 */}
          <div className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#3730d9] text-white">
                <Check size={16} strokeWidth={3} />
              </div>

              <div className="h-[3px] flex-1 bg-[#3730d9]" />
            </div>

            <p className="mt-3 text-center text-sm font-medium text-gray-700">
              Personal Details
            </p>
          </div>

          {/* STEP 2 */}
          <div className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#3730d9] text-white">
                <Check size={18} strokeWidth={3} />
              </div>

              <div className="h-[3px] flex-1 bg-[#3730d9]" />
            </div>

            <p className="mt-3 text-center text-sm font-medium text-gray-700">
              Resume & Skills
            </p>
          </div>

          {/* STEP 3 */}
          <div className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#3730d9] text-lg font-semibold text-white">
                3
              </div>

              <div className="h-[3px] flex-1 bg-gray-200" />
            </div>

            <p className="mt-3 text-center text-sm font-semibold text-[#3730d9]">
              Additional Info
            </p>
          </div>

          {/* STEP 4 */}
          <div className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-lg font-medium text-gray-500">
                4
              </div>
            </div>

            <p className="mt-4 text-center text-sm font-medium text-gray-600">
              Review & Submit
            </p>
          </div>
        </div>

        {/* ================= INFO BOX ================= */}
        <div className="mb-3 flex items-center gap-5 rounded-2xl border border-[#c9c8e8] bg-[#f0efff] px-6 py-5">
          <div className="flex h-13 w-13 shrink-0 items-center justify-center">
            <FileText
              size={42}
              strokeWidth={1.8}
              className="text-[#2145d8]"
            />
          </div>

          <div>
            <h2 className="text-base font-bold text-gray-900">
              {AdditionalInfo.infoBox.title}
            </h2>

            <p className="mt-1 text-sm text-gray-600">
              {AdditionalInfo.infoBox.description}
            </p>
          </div>
        </div>

        {/* ================= EDUCATION ================= */}
        <section className="border-b border-gray-200 pb-4">

          <h2 className="mb-2 text-gl font-bold text-gray-900">
            {AdditionalInfo.education.title}
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* Highest Degree */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                {AdditionalInfo.education.highestDegree.label}
              </label>

              <div className="relative">
                <select
                  value={highestDegree}
                  onChange={(e) => setHighestDegree(e.target.value)}
                  className="h-13 w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 pr-12 text-sm text-gray-700 outline-none transition focus:border-[#3730d9] focus:ring-2 focus:ring-[#3730d9]/10"
                >
                  {AdditionalInfo.education.highestDegree.options.map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown
                  size={20}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>

            {/* Field of Study */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                {AdditionalInfo.education.fieldOfStudy.label}
              </label>

              <div className="relative">
                <select
                  value={fieldOfStudy}
                  onChange={(e) => setFieldOfStudy(e.target.value)}
                  className="h-13 w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 pr-12 text-sm text-gray-700 outline-none transition focus:border-[#3730d9] focus:ring-2 focus:ring-[#3730d9]/10"
                >
                  {AdditionalInfo.education.fieldOfStudy.options.map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown
                  size={20}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>

            {/* University */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                {AdditionalInfo.education.university.label}
              </label>

              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder={
                  AdditionalInfo.education.university.placeholder
                }
                className="h-13 w-full rounded-xl border border-gray-300 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#3730d9] focus:ring-2 focus:ring-[#3730d9]/10"
              />
            </div>

            {/* Graduation Year */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                {AdditionalInfo.education.graduationYear.label}
              </label>

              <div className="relative">
                <select
                  value={graduationYear}
                  onChange={(e) => setGraduationYear(e.target.value)}
                  className="h-13 w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 pr-12 text-sm text-gray-700 outline-none transition focus:border-[#3730d9] focus:ring-2 focus:ring-[#3730d9]/10"
                >
                  {AdditionalInfo.education.graduationYear.options.map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown
                  size={20}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ================= WORK EXPERIENCE ================= */}
        <section className="border-b border-gray-200 py-6">

          <h2 className="mb-4 text-xl font-bold text-gray-900">
            {AdditionalInfo.workExperience.title}
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* Employment Status */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                {AdditionalInfo.workExperience.employmentStatus.label}
              </label>

              <div className="relative">
                <select
                  value={employmentStatus}
                  onChange={(e) => setEmploymentStatus(e.target.value)}
                  className="h-13 w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 pr-12 text-sm text-gray-700 outline-none transition focus:border-[#3730d9] focus:ring-2 focus:ring-[#3730d9]/10"
                >
                  {AdditionalInfo.workExperience.employmentStatus.options.map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown
                  size={20}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>

            {/* Current Company */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                {AdditionalInfo.workExperience.currentCompany.label}
              </label>

              <input
                type="text"
                value={currentCompany}
                onChange={(e) => setCurrentCompany(e.target.value)}
                placeholder={
                  AdditionalInfo.workExperience.currentCompany.placeholder
                }
                className="h-13 w-full rounded-xl border border-gray-300 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#3730d9] focus:ring-2 focus:ring-[#3730d9]/10"
              />
            </div>

            {/* Current Job Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                {AdditionalInfo.workExperience.currentJobTitle.label}
              </label>

              <input
                type="text"
                value={currentJobTitle}
                onChange={(e) => setCurrentJobTitle(e.target.value)}
                placeholder={
                  AdditionalInfo.workExperience.currentJobTitle.placeholder
                }
                className="h-13 w-full rounded-xl border border-gray-300 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#3730d9] focus:ring-2 focus:ring-[#3730d9]/10"
              />
            </div>

            {/* Total Experience */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                {AdditionalInfo.workExperience.totalExperience.label}
              </label>

              <div className="relative">
                <select
                  value={totalExperience}
                  onChange={(e) => setTotalExperience(e.target.value)}
                  className="h-13 w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 pr-12 text-sm text-gray-700 outline-none transition focus:border-[#3730d9] focus:ring-2 focus:ring-[#3730d9]/10"
                >
                  {AdditionalInfo.workExperience.totalExperience.options.map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown
                  size={20}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ================= ADDITIONAL INFORMATION ================= */}
        <section className="py-8">

          <h2 className="mb-3 text-xl font-bold text-gray-900">
            {AdditionalInfo.additionalInformation.title}
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* Notice Period */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                {AdditionalInfo.additionalInformation.noticePeriod.label}
              </label>

              <div className="relative">
                <select
                  value={noticePeriod}
                  onChange={(e) => setNoticePeriod(e.target.value)}
                  className="h-13 w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 pr-12 text-sm text-gray-700 outline-none transition focus:border-[#3730d9] focus:ring-2 focus:ring-[#3730d9]/10"
                >
                  {AdditionalInfo.additionalInformation.noticePeriod.options.map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown
                  size={20}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                />
              </div>
            </div>

            {/* Willing to Relocate */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                {
                  AdditionalInfo.additionalInformation.willingToRelocate
                    .label
                }
              </label>

              <div className="flex items-center gap-4">

                {AdditionalInfo.additionalInformation.willingToRelocate.options.map(
                  (option) => (
                    <label
                      key={option}
                      className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
                    >
                      <input
                        type="radio"
                        name="relocate"
                        value={option}
                        checked={willingToRelocate === option}
                        onChange={(e) =>
                          setWillingToRelocate(e.target.value)
                        }
                        className="h-4 w-4 accent-[#3730d9]"
                      />

                      {option}
                    </label>
                  )
                )}

              </div>
            </div>

            {/* Portfolio */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                {AdditionalInfo.additionalInformation.portfolio.label}
                <span className="ml-1 font-normal text-gray-500">
                  (Optional)
                </span>
              </label>

              <input
                type="url"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                placeholder={
                  AdditionalInfo.additionalInformation.portfolio.placeholder
                }
                className="h-13 w-full rounded-xl border border-gray-300 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#3730d9] focus:ring-2 focus:ring-[#3730d9]/10"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-800">
                {AdditionalInfo.additionalInformation.linkedin.label}
                <span className="ml-1 font-normal text-gray-500">
                  (Optional)
                </span>
              </label>

              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder={
                  AdditionalInfo.additionalInformation.linkedin.placeholder
                }
                className="h-13 w-full rounded-xl border border-gray-300 px-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#3730d9] focus:ring-2 focus:ring-[#3730d9]/10"
              />
            </div>

          </div>

          {/* Tell About Yourself */}
          <div className="mt-4">

            <label className="mb-1 block text-sm font-semibold text-gray-800">
              {AdditionalInfo.additionalInformation.aboutYourself.label}
            </label>

            <p className="mb-3 text-sm text-gray-500">
              {AdditionalInfo.additionalInformation.aboutYourself.description}
            </p>

            <textarea
              value={aboutYourself}
              onChange={(e) => {
                if (
                  e.target.value.length <=
                  AdditionalInfo.additionalInformation.aboutYourself
                    .maxLength
                ) {
                  setAboutYourself(e.target.value);
                }
              }}
              maxLength={
                AdditionalInfo.additionalInformation.aboutYourself.maxLength
              }
              rows={3}
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm leading-6 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#3730d9] focus:ring-2 focus:ring-[#3730d9]/10"
            />

            <p className="mt-2 text-sm text-gray-500">
              {aboutYourself.length}/
              {AdditionalInfo.additionalInformation.aboutYourself.maxLength}{" "}
              characters
            </p>
          </div>
        </section>
        {/* ================= BUTTONS ================= */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-6">

          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
            {AdditionalInfo.buttons.back}
          </button>

        <Link href="/Job-Matching/View-Details/Apply-now/Save&Continue/Additionalinfo/ReviewSubmit">  <button
            type="button"
            onClick={handleContinue}
            className="flex items-center gap-2 rounded-xl bg-[#3730d9] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#2f29bd] active:scale-[0.98]"
          > {AdditionalInfo.buttons.continue}
            <span>→</span>
          </button>
          </Link>
        </div>
      </div>
      </main>
    )
}