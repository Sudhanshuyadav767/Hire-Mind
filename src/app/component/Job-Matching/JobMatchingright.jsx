"use client";

import { Check, ArrowRight } from "lucide-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Image from "next/image";
import { skills } from "@/Data/data";

export default function Jobtype2() {
  return (
    <div className="w-full mb-4 min-w-0 space-y-4 overflow-hidden">

      {/* ================= PROFILE SUMMARY ================= */}
      <div className="w-full min-w-0 border rounded-xl px-4 py-4 shadow-sm">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <h2 className="text-xl sm:text-2xl font-bold">
            Your Profile Summary
          </h2>

          <button className="text-sm text-blue-600 self-start sm:self-auto">
            Edit Profile
          </button>
        </div>


        {/* Profile Score + Checklist */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mt-4">

          {/* Circular Progress */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">

            <CircularProgressbar
              value={87}
              strokeWidth={5}
              styles={{
                path: {
                  stroke: "#3F37FF",
                  strokeLinecap: "round",
                },
                trail: {
                  stroke: "#F5F5F5",
                },
              }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-3xl sm:text-4xl font-bold leading-none">
                87
              </h2>

              <p className="text-xs sm:text-sm text-gray-400">
                /100
              </p>
            </div>

          </div>


          {/* Checklist */}
          <div className="space-y-2 w-full sm:w-auto">

            {/* Skill */}
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-green-600">
                <Check className="w-3 h-3 text-white" />
              </span>

              <span>Skill Added</span>
            </div>


            {/* Experience */}
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-green-600">
                <Check className="w-3 h-3 text-white" />
              </span>

              <span>Experience Added</span>
            </div>


            {/* Education */}
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-green-600">
                <Check className="w-3 h-3 text-white" />
              </span>

              <span>Education Added</span>
            </div>


            {/* Resume */}
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 bg-green-600">
                <Check className="w-3 h-3 text-white" />
              </span>

              <span>Resume Uploaded</span>
            </div>


            {/* Career Goal */}
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 border border-black">
                <Check className="w-3 h-3 text-white" />
              </span>

              <span>Career Goal Added</span>
            </div>

          </div>
        </div>


        {/* ================= CAREER GOAL ================= */}
        <div className="w-full min-w-0 flex flex-col sm:flex-row items-center justify-between gap-4 border rounded-xl shadow-sm bg-[#F3F0FF] px-4 py-4 mt-4">

          <div className="min-w-0">

            <p className="text-sm sm:text-base">
              Add your career goal to improve
              <br className="hidden sm:block" />
              matching accuracy
            </p>

            <button
              className="text-sm font-medium mt-2"
              style={{ color: "blue" }}
            >
              Add Career Goal →
            </button>

          </div>


          <Image
            src="/Images/goal.png"
            alt="Career Goal"
            width={100}
            height={100}
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain shrink-0"
          />

        </div>

      </div>


      {/* ================= TOP MATCHED SKILLS ================= */}
      <div className="w-full min-w-0 border rounded-xl p-4 sm:p-6 shadow-sm bg-white">

        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Top Matched Skills
        </h2>


        {/* Skills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">

          {skills.map((skill, index) => (

            <div
              key={index}
              className="flex min-w-0 overflow-hidden rounded-xl bg-[#F3F0FF]"
            >

              <span className="px-3 sm:px-4 py-3 bg-indigo-200 text-indigo-600 font-semibold truncate min-w-0 flex-1">
                {skill.name}
              </span>

              <span className="px-3 sm:px-4 py-3 bg-indigo-200 text-indigo-600 font-semibold shrink-0">
                {skill.percent}
              </span>

            </div>

          ))}

        </div>


        {/* View All Skills */}
        <button className="mt-6 flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
          View All Skills
          <ArrowRight size={18} />
        </button>

      </div>


      {/* ================= NEED HELP ================= */}
      <div className="w-full min-w-0 rounded-xl bg-[#F3F0FF] p-4 sm:p-6 border shadow-sm">

        <h2 className="text-2xl sm:text-4xl font-bold">
          Need Help?
        </h2>


        <p className="text-gray-500 mt-4 text-base sm:text-lg leading-7 sm:leading-8">
          Our AI career assistant is here to help you find the
          perfect job.
        </p>


        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">

          {/* Button */}
          <button
            className=" w-full sm:w-auto  bg-indigo-60  hover:bg-indigo-700  text-white  px-6  sm:px-8  py-3 sm:py-4 rounded-xl text-base  shadow"
            
            style={{backgroundColor:"blue"}}
          >
            Chat with AI Assistant
          </button>


          {/* Robot */}
          <Image
            src="/Images/robot3.png"
            alt="AI Assistant"
            width={150}
            height={150}
            className="
              w-24 h-24  sm:w-36 sm:h-36  object-contain  shrink-0"
         
          />

        </div>

      </div>

    </div>
  );
}