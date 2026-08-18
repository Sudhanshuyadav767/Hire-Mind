"use client";

import { useState } from "react";
import { X, Upload, CheckCircle2 } from "lucide-react";

export default function PostJobModal({ isOpen, onClose, onPostJob }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("1-3 Years");
  const [jobType, setJobType] = useState("Full Time");
  const [salary, setSalary] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoDataUrl, setLogoDataUrl] = useState("");

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoDataUrl(reader.result); // Base64 image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !company.trim() || !location.trim() || !salary.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    // Map experience input to mockup text
    const expText = experience === "Fresher(0-1Yr)" ? "0-1Yr" : 
                    experience === "1-3 Years" ? "1-3Yrs" :
                    experience === "3-5 Years" ? "3-5Yrs" :
                    experience === "5-10 Years" ? "5-10Yrs" : "10+Yrs";

    const newJob = {
      id: Date.now(),
      title,
      company,
      location,
      experience: expText,
      experienceFilter: experience,
      type: jobType,
      salary,
      posted: "Just now",
      // If no custom logo uploaded, fall back to Google logo
      customLogo: logoDataUrl || "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
    };

    onPostJob(newJob);
    // Reset form states
    setTitle("");
    setCompany("");
    setLocation("");
    setSalary("");
    setLogoFile(null);
    setLogoDataUrl("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border border-[#cbd5e1] rounded-2xl w-full max-w-lg shadow-xl animate-fade-in relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-150 p-4.5">
          <h3 className="text-sm font-bold text-[#101014]">Post a Job (HR Dashboard)</h3>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-slate-50 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs font-semibold text-[#475569]">
          
          <div className="grid gap-3 sm:grid-cols-2">
            {/* Job Title */}
            <div className="space-y-1">
              <label className="font-bold text-[#334155]">Job Title</label>
              <input 
                type="text" 
                placeholder="e.g. Software Engineer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 outline-none font-semibold text-[#1e293b]"
              />
            </div>

            {/* Company Name */}
            <div className="space-y-1">
              <label className="font-bold text-[#334155]">Company Name</label>
              <input 
                type="text" 
                placeholder="e.g. HireMind Labs"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 outline-none font-semibold text-[#1e293b]"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* Location */}
            <div className="space-y-1">
              <label className="font-bold text-[#334155]">Location</label>
              <input 
                type="text" 
                placeholder="e.g. Bangalore, Karnataka"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 outline-none font-semibold text-[#1e293b]"
              />
            </div>

            {/* Salary Package */}
            <div className="space-y-1">
              <label className="font-bold text-[#334155]">Salary Package</label>
              <input 
                type="text" 
                placeholder="e.g. ₹10-18LPA"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 outline-none font-semibold text-[#1e293b]"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* Experience Select */}
            <div className="space-y-1">
              <label className="font-bold text-[#334155]">Experience Level</label>
              <select 
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 outline-none font-semibold text-[#1e293b] cursor-pointer"
              >
                <option>Fresher(0-1Yr)</option>
                <option>1-3 Years</option>
                <option>3-5 Years</option>
                <option>5-10 Years</option>
                <option>10+ Years</option>
              </select>
            </div>

            {/* Job Type Select */}
            <div className="space-y-1">
              <label className="font-bold text-[#334155]">Job Type</label>
              <select 
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 outline-none font-semibold text-[#1e293b] cursor-pointer"
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Remote</option>
                <option>Internship</option>
                <option>Freelance</option>
              </select>
            </div>
          </div>

          {/* Logo File Upload */}
          <div className="space-y-1">
            <label className="font-bold text-[#334155]">Company Logo</label>
            <div className="flex items-center gap-3">
              <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 hover:border-[#433be2]/60 rounded-xl p-4 bg-gray-50 hover:bg-[#eef1ff]/5 transition cursor-pointer relative min-h-[90px]">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {logoFile ? (
                  <div className="flex flex-col items-center gap-1 text-[#10b981]">
                    <CheckCircle2 size={24} />
                    <span className="text-[10px] font-bold">Image selected: {logoFile.name.slice(0, 18)}...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-slate-400">
                    <Upload size={22} className="stroke-[1.5]" />
                    <span className="text-[10px]">Select or Drop custom logo file</span>
                  </div>
                )}
              </label>

              {/* Logo Preview */}
              {logoDataUrl && (
                <div className="w-16 h-16 rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center shrink-0 bg-white shadow-2xs">
                  <img src={logoDataUrl} alt="Preview" className="w-full h-full object-contain p-1" />
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <button 
            type="submit"
            className="w-full py-3 rounded-xl bg-[#433be2] hover:bg-[#3129c8] text-white text-xs font-bold transition shadow-sm cursor-pointer mt-2"
          >
            Post Job
          </button>

        </form>

      </div>
    </div>
  );
}
