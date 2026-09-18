import { useState } from "react";
import { Sparkles, RotateCcw } from "lucide-react";

export default function GuidanceFormSection({ onGetGuidance }) {
  const [interests, setInterests] = useState("Technology, Problem Solving");
  const [field, setField] = useState("Computer Science");
  const [education, setEducation] = useState("Bachelor's Degree");
  const [experience, setExperience] = useState("1-3 Years");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleReset = () => {
    setInterests("Technology, Problem Solving");
    setField("Computer Science");
    setEducation("Bachelor's Degree");
    setExperience("1-3 Years");
    setAdditionalInfo("");
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (onGetGuidance) {
      onGetGuidance({
        interests,
        field,
        education,
        experience,
        additionalInfo
      });
    }
  };

  return (
    <div className="bg-white border border-[#cbd5e1]/45 p-5 sm:p-6 rounded-3xl shadow-sm text-left space-y-4">
      <div>
        <h2 className="text-lg sm:text-xl font-bold font-poppins text-[#1E2229]">
          What would you like guidance on?
        </h2>
        <p className="text-xs text-slate-400 font-medium mt-0.5">
          Tell us about yourself and let our AI suggest the best career path for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        {/* Main Interests */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-600 block">
            What are your main interests?
          </label>
          <select 
            value={interests} 
            onChange={(e) => setInterests(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:ring-1 focus:ring-[#2D24D0] cursor-pointer"
          >
            <option value="Technology, Problem Solving">Technology, Problem Solving</option>
            <option value="Data Science & Analytics">Data Science & Analytics</option>
            <option value="Design & Creative Arts">Design & Creative Arts</option>
            <option value="Business & Finance">Business & Finance</option>
          </select>
        </div>

        {/* Current/Previous Field */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-600 block">
            Which field describes your current/previous experience?
          </label>
          <select 
            value={field} 
            onChange={(e) => setField(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:ring-1 focus:ring-[#2D24D0] cursor-pointer"
          >
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Engineering">Engineering</option>
            <option value="Business Administration">Business Administration</option>
            <option value="Design">Design</option>
          </select>
        </div>

        {/* Education Level */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-600 block">
            What is your highest education level
          </label>
          <select 
            value={education} 
            onChange={(e) => setEducation(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:ring-1 focus:ring-[#2D24D0] cursor-pointer"
          >
            <option value="Bachelor's Degree">Bachelor's Degree</option>
            <option value="Master's Degree">Master's Degree</option>
            <option value="High School">High School</option>
            <option value="Doctorate / PhD">Doctorate / PhD</option>
          </select>
        </div>

        {/* Years of Experience */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-600 block">
            How many years of experience do you have?
          </label>
          <select 
            value={experience} 
            onChange={(e) => setExperience(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:ring-1 focus:ring-[#2D24D0] cursor-pointer"
          >
            <option value="0-1 Years (Fresher)">0-1 Years (Fresher)</option>
            <option value="1-3 Years">1-3 Years</option>
            <option value="3-5 Years">3-5 Years</option>
            <option value="5+ Years">5+ Years</option>
          </select>
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-1 pt-1">
        <label className="text-xs font-bold text-slate-600 block">
          Any other information
        </label>
        <textarea
          rows={2}
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          placeholder="Write message...."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-700 outline-none focus:ring-1 focus:ring-[#2D24D0]"
        />
      </div>

      {/* Buttons Row */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <button
          onClick={handleSubmit}
          className="bg-[#2D24D0] hover:bg-[#1e1c75] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition active:scale-98"
        >
          <Sparkles size={14} />
          <span>Get AI Guidance</span>
        </button>

        <button
          onClick={handleReset}
          className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer transition"
        >
          <span>Reset</span>
          <RotateCcw size={12} />
        </button>
      </div>
    </div>
  );
}

