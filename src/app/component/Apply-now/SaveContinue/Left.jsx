
"use client";
import Link from "next/link";
import { useState } from "react";
import { Upload, X, ChevronDown, FileText } from "lucide-react";
import { resumeData } from "@/Data/job-matching";

export default function Page() {
  const [skills, setSkills] = useState(resumeData.skills);
  const [skill, setSkill] = useState("");
  const [experience, setExperience] = useState("2-4 Years");
  const [file, setFile] = useState(null);

  const removeSkill = (item) => {
    setSkills(skills.filter((s) => s !== item));
  };

  const addSkill = (e) => {
    if (e.key === "Enter" && skill.trim()) {
      if (!skills.includes(skill.trim())) {
        setSkills([...skills, skill.trim()]);
      }
      setSkill("");
    }
  };

  return (
    <div className="min-h-screen bg-white px-3 sm:px-5  py-5 sm:py-4  border border-slate-200 rounded-xl sm:rounded-2xl mt-4">
      <div className="max-w-5xl mx-auto">

        {/* Steps */}
        <div className="flex items-start justify-between mb-8 sm:mb-10 overflow-x-auto pb-2">

          {/* Step 1 */}
          <div className="text-center min-w-[75px] sm:min-w-[100px]">
            <div className="w-9 h-9 sm:w-12 sm:h-12 mx-auto rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm sm:text-base">
              ✓
            </div>

            <p className="mt-2 text-[10px] sm:text-sm text-gray-500">
              Personal Details
            </p>
          </div>

          <div className="h-1 flex-1 bg-indigo-600 mx-2 sm:mx-4 mt-4 sm:mt-6 min-w-[20px]" />

          {/* Step 2 */}
          <div className="text-center min-w-[75px] sm:min-w-[100px]">
            <div className="w-9 h-9 sm:w-12 sm:h-12 mx-auto rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm sm:text-base">
              2
            </div>

            <p className="mt-2 text-[10px] sm:text-sm text-indigo-600 font-semibold">
              Resume & Skills
            </p>
          </div>

          <div className="h-1 flex-1 bg-gray-200 mx-2 sm:mx-4 mt-4 sm:mt-6 min-w-[20px]" />

          {/* Step 3 */}
          <div className="text-center min-w-[75px] sm:min-w-[100px]">
            <div className="w-9 h-9 sm:w-12 sm:h-12 mx-auto rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center text-sm sm:text-base">
              3
            </div>

            <p className="mt-2 text-[10px] sm:text-sm text-gray-400">
              Additional Info
            </p>
          </div>

          <div className="h-1 flex-1 bg-gray-200 mx-2 sm:mx-4 mt-4 sm:mt-6 min-w-[20px]" />

          {/* Step 4 */}
          <div className="text-center min-w-[75px] sm:min-w-[100px]">
            <div className="w-9 h-9 sm:w-12 sm:h-12 mx-auto rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center text-sm sm:text-base">
              4
            </div>

            <p className="mt-2 text-[10px] sm:text-sm text-gray-400">
              Review & Submit
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="bg-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex gap-3 sm:gap-4 mb-6 sm:mb-8">
          <FileText
            className="text-indigo-600 flex-shrink-0"
            size={28}
          />

          <div>
            <h2 className="text-lg sm:text-xl font-bold">
              Great! Let's Continue
            </h2>

            <p className="text-sm sm:text-base text-gray-500 mt-1">
              Add your resume and skills to help employers
              understand your experience better.
            </p>
          </div>
        </div>

        <hr />

        {/* Resume */}
        <div className="mt-6 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-bold">
            Resume
          </h2>

          <p className="text-sm sm:text-base text-gray-500 mt-2 mb-4 sm:mb-5">
            Upload your resume (PDF, DOC, DOCX - Max 5MB)
          </p>

          <label
            htmlFor="resume"
            className="min-h-48 sm:h-52 border border-gray-300 rounded-xl
            flex flex-col items-center justify-center cursor-pointer
            hover:border-indigo-500 transition px-4 text-center"
          >
            <Upload
              size={38}
              className="text-indigo-600 sm:w-[45px] sm:h-[45px]"
            />

            <p className="font-semibold text-sm sm:text-base mt-3 sm:mt-4">
              Drag & Drop your file here
            </p>

            <p className="text-sm sm:text-base text-gray-500 mt-2">
              or{" "}
              <span className="text-indigo-600">
                click to browse
              </span>
            </p>

            <input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          {file && (
            <div className="border rounded-xl p-3 sm:p-4 mt-2 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-base truncate">
                  {file.name}
                </p>

                <p className="text-xs sm:text-sm text-gray-500">
                  {(file.size / 1024).toFixed(0)} KB
                </p>
              </div>

              <span className="text-green-500 text-xl flex-shrink-0">
                ✓
              </span>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="mt-8 sm:mt-10">
          <h2 className="text-xl sm:text-2xl font-bold">
            Skills
          </h2>

          <p className="text-sm sm:text-base text-gray-500 mt-2 mb-4 sm:mb-5">
            Add your relevant skills. You can add multiple skills.
          </p>

          <div className="border border-gray-300 rounded-xl p-3 flex flex-wrap gap-2">
            {skills.map((item) => (
              <span
                key={item}
                className="bg-indigo-100 text-indigo-600
                px-3 sm:px-4 py-1.5 sm:py-2 rounded-full
                flex items-center gap-2 text-xs sm:text-sm"
              >
                {item}

                <button
                  type="button"
                  onClick={() => removeSkill(item)}
                  className="hover:text-red-500"
                >
                  <X size={14} />
                </button>
              </span>
            ))}

            <ChevronDown
              className="ml-auto mt-1 flex-shrink-0"
              size={20}
            />
          </div>

          <p className="text-sm sm:text-base text-gray-500 mt-4 sm:mt-5 mb-2">
            Add more skills.
          </p>

          <input
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            onKeyDown={addSkill}
            placeholder="Type a skill and press Enter"
            className="w-full border border-gray-300 rounded-xl
            px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base
            outline-none focus:border-indigo-600"
          />
        </div>

        {/* Experience */}
        <div className="mt-6 sm:mt-8">
          <h3 className="font-bold text-base sm:text-lg mb-3">
            Years of Experience
          </h3>

          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full border border-gray-300 rounded-xl
            px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base
            outline-none focus:border-indigo-600"
          >
            {resumeData.experience.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 sm:gap-4 mt-8 sm:mt-10">

          <Link href="/Job-Matching/View-Details/Apply-now"><button
            type="button"
            className="w-full sm:w-auto border border-gray-300
            px-6 sm:px-7 py-3 rounded-xl font-semibold
            text-sm sm:text-base hover:bg-gray-50 transition"
          >
            ← Back
          </button></Link>

      <Link href="/Job-Matching/View-Details/Apply-now/Save&Continue/Additionalinfo"> <button
            type="button"
            className="w-full sm:w-auto bg-indigo-600
            text-white px-6 sm:px-7 py-3 rounded-xl
            font-semibold text-sm sm:text-base
            hover:bg-indigo-700 transition"
          >
            Save & Continue →
          </button>
</Link>
        </div>

      </div>
    </div>
  );
}

