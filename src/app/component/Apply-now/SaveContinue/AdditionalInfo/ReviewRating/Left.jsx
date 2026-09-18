"use client";

import { FileText, Check, Pencil, ArrowLeft, Send } from "lucide-react";
import { useRouter } from "next/navigation";

import { reviewData } from "@/Data/data1";
import Link from "next/link";
export default function ReviewSubmit() {
  const router = useRouter();

  const {
    steps,
    reviewMessage,
    personalInformation,
    resumeSkills,
    additionalInformation,
  } = reviewData;

  return (
    <div className="min-h-screen bg-white px-4 py-8 rounded-2xl border-slate-200">
      <div className="mx-auto max-w-[900px] overflow-hidden  bg-white shadow-sm">

        {/* ================= STEPPER ================= */}
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-start justify-between">

            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex flex-1 items-start"
              >
                <div className="flex w-full flex-col items-center">

                  {/* Circle + Line */}
                  <div className="flex w-full items-center">

                    {/* Left Line */}
                    {index > 0 ? (
                      <div className="h-[3px] flex-1 bg-[#4338ca]" />
                    ) : (
                      <div className="flex-1" />
                    )}

                    {/* Circle */}
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-semibold text-white ${
                        step.completed || step.id === 4
                          ? "bg-[#3730c9]"
                          : "bg-gray-300"
                      }`}
                    >
                      {step.completed ? (
                        <Check size={25} strokeWidth={3} />
                      ) : (
                        step.id
                      )}
                    </div>

                    {/* Right Line */}
                    {index < steps.length - 1 ? (
                      <div className="h-[3px] flex-1 bg-[#4338ca]" />
                    ) : (
                      <div className="flex-1" />
                    )}
                  </div>

                  {/* Step Title */}
                  <p
                    className={`mt-3 text-center text-sm font-semibold ${
                      step.id === 4
                        ? "text-[#4338ca]"
                        : "text-gray-700"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* ================= REVIEW MESSAGE ================= */}
        <div className="px-8 pb-7">
          <div className="flex items-center gap-4 rounded-xl bg-[#eeeeff] px-6 py-5">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md">
              <FileText
                size={42}
                strokeWidth={1.8}
                className="text-[#3730c9]"
              />
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900">
                {reviewMessage.title}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {reviewMessage.description}
              </p>
            </div>

          </div>
        </div>

        {/* ================= PERSONAL INFORMATION ================= */}
        <Section
          title="Personal Information"
          onEdit={() => console.log("Edit Personal Information")}
        >
          <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">

            <InfoItem
              label="Full Name"
              value={personalInformation.fullName}
            />

            <InfoItem
              label="Email Address"
              value={personalInformation.email}
            />

            <InfoItem
              label="Phone Number"
              value={personalInformation.phone}
            />

            <InfoItem
              label="Current Location"
              value={personalInformation.currentLocation}
            />

            <InfoItem
              label="LinkedIn Profile"
              value={personalInformation.linkedin}
            />

            <InfoItem
              label="Work Authorisation"
              value={personalInformation.workAuthorization}
            />

          </div>
        </Section>

        {/* ================= RESUME & SKILLS ================= */}
        <Section
          title="Resume & Skills"
          onEdit={() => console.log("Edit Resume & Skills")}
        >

          {/* Resume */}
          <p className="mb-3 text-sm font-semibold text-gray-800">
            Resume
          </p>

          <div className="flex items-center justify-between rounded-lg border border-gray-200 px-5 py-4">

            <div className="flex items-center gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded bg-red-100">
                <FileText className="text-red-500" size={24} />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {resumeSkills.resume.name}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {resumeSkills.resume.size}
                </p>
              </div>

            </div>

            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
              <Check
                size={16}
                className="text-green-500"
                strokeWidth={3}
              />
            </div>

          </div>

          {/* Skills */}
          <div className="mt-6">
            <p className="mb-3 text-sm font-semibold text-gray-800">
              Skills
            </p>

            <div className="flex flex-wrap gap-3">
              {resumeSkills.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-[#e5e7ff] px-4 py-2 text-xs font-medium text-[#4f46c9]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="mt-5">
            <p className="text-sm font-semibold text-gray-800">
              Years of Experience
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {resumeSkills.yearsOfExperience}
            </p>
          </div>

        </Section>

        {/* ================= ADDITIONAL INFORMATION ================= */}
        <Section
          title="Additional Information"
          onEdit={() => console.log("Edit Additional Information")}
        >

          {/* Education */}
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            Education
          </h3>

          <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">

            <InfoItem
              label="Highest Degree"
              value={additionalInformation.education.highestDegree}
            />

            <InfoItem
              label="Field of Study"
              value={additionalInformation.education.fieldOfStudy}
            />

            <InfoItem
              label="University/College"
              value={additionalInformation.education.university}
            />

            <InfoItem
              label="Year of Graduation"
              value={additionalInformation.education.yearOfGraduation}
            />

          </div>

          {/* Work Experience */}
          <h3 className="mb-4 mt-7 text-sm font-semibold text-gray-900">
            Work Experience
          </h3>

          <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">

            <InfoItem
              label="Current Employment Status"
              value={
                additionalInformation.workExperience.employmentStatus
              }
            />

            <InfoItem
              label="Current Company"
              value={
                additionalInformation.workExperience.currentCompany
              }
            />

            <InfoItem
              label="Current Job Title"
              value={
                additionalInformation.workExperience.jobTitle
              }
            />

            <InfoItem
              label="Total Experience"
              value={
                additionalInformation.workExperience.totalExperience
              }
            />

          </div>

          {/* Additional Info */}
          <h3 className="mb-4 mt-7 text-sm font-semibold text-gray-900">
            Additional Information
          </h3>

          <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-3">

            <InfoItem
              label="Notice Period"
              value={
                additionalInformation.additionalInfo.noticePeriod
              }
            />

            <InfoItem
              label="Willing to Relocate?"
              value={
                additionalInformation.additionalInfo.willingToRelocate
              }
            />

            <InfoItem
              label="Portfolio / GitHub (Optional)"
              value={
                additionalInformation.additionalInfo.portfolio
              }
            />

          </div>

          {/* About You */}
          <div className="mt-7">
            <p className="text-sm font-semibold text-gray-900">
              About You
            </p>

            <p className="mt-3 max-w-[750px] text-sm leading-6 text-gray-500">
              {additionalInformation.aboutYou}
            </p>
          </div>

        </Section>

        {/* ================= BUTTONS ================= */}
        <div className="flex items-center justify-between border-t px-8 py-6">

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-[#4338ca] shadow-sm transition hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
            Back
          </button>

        <Link href='/Job-Matching/View-Details/Apply-now/Save&Continue/Additionalinfo/ReviewSubmit/Submit'>  <button
            onClick={() => console.log("Application Submitted")}
            className="flex items-center gap-2 rounded-md bg-[#4338ca] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3730a3]"
          >
            Submit Application
            <Send size={17} />
          </button>
</Link>
        </div>

      </div>
    </div>
  );
}


/* =====================================================
   REUSABLE SECTION COMPONENT
===================================================== */

function Section({ title, onEdit, children }) {
  return (
    <section className="border-t px-8 py-6">

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-lg font-bold text-gray-900">
          {title}
        </h2>

        <button
          onClick={onEdit}
          className="flex items-center gap-1 text-sm font-semibold text-[#4338ca] hover:text-[#3730a3]"
        >
          Edit
          <Pencil size={14} />
        </button>

      </div>

      {children}

    </section>
  );
}


/* =====================================================
   REUSABLE INFO ITEM
===================================================== */

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-800">
        {label}
      </p>

      <p className="mt-2 break-words text-sm text-gray-500">
        {value}
      </p>
    </div>
  );
}