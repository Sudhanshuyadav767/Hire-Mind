"use client";

import React from 'react';
import { User, Camera, CheckCircle2, Cloud, ChevronRight, RotateCw, ChevronDown } from 'lucide-react';

export default function EditBasicDetailsSection({
  profile,
  activeSection,
  avatarPreview,
  digiLockerVerified,
  genderOptions,
  userTypeOptions,
  domainOptions,
  courseOptions,
  specializationOptions,
  handleInputChange,
  handleImageChange,
  onOpenDigiLocker
}) {
  return (
    <div 
      id="section-basic"
      className={`bg-white border rounded-[28px] p-5 sm:p-8 shadow-[0_8px_30px_rgba(30,34,70,0.06)] space-y-6 transition-all ${
        activeSection === 'basic' ? 'border-[#463fe6] ring-2 ring-[#463fe6]/20' : 'border-[#e4e5ee]'
      }`}
    >
      <div className="flex items-center justify-between border-b border-[#f0f1f7] pb-4">
        <div>
          <h2 className="text-xl font-bold text-[#141522]">Basic Details</h2>
          <p className="text-xs text-slate-500 mt-0.5">Edit personal info, contact details and university</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#d2d3e5] text-xs font-semibold text-[#463fe6] hover:bg-[#f2f2ff] transition cursor-pointer"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Switch</span>
        </button>
      </div>

      {/* Profile Avatar */}
      <div className="flex flex-col items-center justify-center py-2">
        <div className="relative group">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#ebf0ff] border-3 border-indigo-100 flex items-center justify-center overflow-hidden shadow-inner">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-14 h-14 text-[#463fe6]" />
            )}
          </div>

          <label 
            htmlFor="avatar-upload" 
            className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-[#463fe6] border-2 border-white text-white flex items-center justify-center cursor-pointer shadow-md transition hover:scale-105 active:scale-95"
            title="Change Avatar"
          >
            <Camera className="w-4 h-4" />
            <input 
              id="avatar-upload" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageChange} 
            />
          </label>
        </div>
        <span className="text-[11px] font-medium text-slate-500 mt-2">Click camera icon to change profile photo</span>
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#232433] mb-1.5">First Name *</label>
          <input
            type="text"
            required
            value={profile.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-[#dcdce6] bg-white text-sm font-medium text-[#141520] outline-none focus:border-[#463fe6]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#232433] mb-1.5">Last Name *</label>
          <input
            type="text"
            required
            value={profile.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-[#dcdce6] bg-white text-sm font-medium text-[#141520] outline-none focus:border-[#463fe6]"
          />
        </div>
      </div>

      {/* Username & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#232433] mb-1.5">Username *</label>
          <input
            type="text"
            required
            value={profile.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-[#dcdce6] bg-white text-sm font-medium text-[#141520] outline-none focus:border-[#463fe6]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#232433] mb-1.5">Email *</label>
          <div className="relative">
            <input
              type="email"
              required
              value={profile.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full h-12 pl-4 pr-11 rounded-xl border border-[#dcdce6] bg-white text-sm font-medium text-[#141520] outline-none focus:border-[#463fe6]"
            />
            <span className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-emerald-500">
              <CheckCircle2 className="w-5 h-5 fill-emerald-50 text-emerald-500" />
            </span>
          </div>
        </div>
      </div>

      {/* Mobile & Institute */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#232433] mb-1.5">Mobile *</label>
          <input
            type="tel"
            required
            value={profile.mobile}
            onChange={(e) => handleInputChange('mobile', e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-[#dcdce6] bg-white text-sm font-medium text-[#141520] outline-none focus:border-[#463fe6]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#232433] mb-1.5">College / Institute *</label>
          <input
            type="text"
            required
            value={profile.institute}
            onChange={(e) => handleInputChange('institute', e.target.value)}
            className="w-full h-12 px-4 rounded-xl border border-[#dcdce6] bg-white text-sm font-medium text-[#141520] outline-none focus:border-[#463fe6]"
          />
        </div>
      </div>

      {/* DigiLocker Banner */}
      <div 
        onClick={onOpenDigiLocker}
        className="bg-[#fff7ee] border border-[#ffdfc4] rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-[#fff2e4] transition group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#ffeedd] text-[#d96614] flex items-center justify-center shrink-0 border border-[#fbd8b7]">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[#8a4212] flex items-center gap-1.5">
              Verify Identity with DigiLocker
              {digiLockerVerified && (
                <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  Verified ✓
                </span>
              )}
            </h4>
            <p className="text-[11px] sm:text-xs text-[#a36235] font-normal leading-tight mt-0.5">
              Import instantly to achieve certified candidate status.
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-[#d96614] group-hover:translate-x-0.5 transition-transform shrink-0" />
      </div>

      {/* Gender Pills */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-[#232433]">Gender *</label>
        <div className="flex flex-wrap gap-2.5">
          {genderOptions.map((g) => {
            const isActive = profile.gender === g;
            return (
              <button
                key={g}
                type="button"
                onClick={() => handleInputChange('gender', g)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#463fe6] bg-[#f0efff] text-[#463fe6] ring-2 ring-[#463fe6]/20'
                    : 'border-[#e0e1eb] bg-white text-[#575869] hover:bg-slate-50'
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* User Type Pills */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-[#232433]">User Type *</label>
        <div className="flex flex-wrap gap-2.5">
          {userTypeOptions.map((ut) => {
            const isActive = profile.userType === ut;
            return (
              <button
                key={ut}
                type="button"
                onClick={() => handleInputChange('userType', ut)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#463fe6] bg-[#f0efff] text-[#463fe6] ring-2 ring-[#463fe6]/20'
                    : 'border-[#e0e1eb] bg-white text-[#575869] hover:bg-slate-50'
                }`}
              >
                {ut}
              </button>
            );
          })}
        </div>
      </div>

      {/* Domain Pills */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-[#232433]">Domain *</label>
        <div className="flex flex-wrap gap-2.5">
          {domainOptions.map((d) => {
            const isActive = profile.domain === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => handleInputChange('domain', d)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#463fe6] bg-[#f0efff] text-[#463fe6] ring-2 ring-[#463fe6]/20'
                    : 'border-[#e0e1eb] bg-white text-[#575869] hover:bg-slate-50'
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      {/* Course & Specialization */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#232433] mb-1.5">Course *</label>
          <div className="relative">
            <select
              value={profile.course}
              onChange={(e) => handleInputChange('course', e.target.value)}
              className="w-full h-12 pl-4 pr-10 rounded-xl border border-[#dcdce6] bg-white text-xs sm:text-sm font-medium text-[#141520] appearance-none outline-none focus:border-[#463fe6]"
            >
              {courseOptions.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#232433] mb-1.5">Course Specialization *</label>
          <div className="relative">
            <select
              value={profile.courseSpecialization}
              onChange={(e) => handleInputChange('courseSpecialization', e.target.value)}
              className="w-full h-12 pl-4 pr-10 rounded-xl border border-[#dcdce6] bg-white text-xs sm:text-sm font-medium text-[#141520] appearance-none outline-none focus:border-[#463fe6]"
            >
              {specializationOptions.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
