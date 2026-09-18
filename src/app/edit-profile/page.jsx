"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../component/common/Header';
import { 
  ArrowLeft, 
  SlidersHorizontal, 
  User, 
  Camera, 
  CheckCircle2, 
  Cloud, 
  ChevronRight, 
  ChevronDown, 
  RotateCw,
  Sparkles,
  Check,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  CheckSquare,
  Trophy,
  Plus,
  Trash2,
  FileCheck
} from 'lucide-react';

const DEFAULT_PROFILE = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  mobile: '',
  gender: '',
  userType: 'College Students',
  domain: 'Engineering',
  course: 'B.Tech/BE (Bachelor of Technology / Bachelor of Engineering)',
  courseSpecialization: 'Computer Science and Engineering',
  institute: '',
  profileStrength: 25,
  avatarUrl: null,
  about: '',
  resume: null,
  skills: [],
  workExperience: [],
  education: [],
  responsibilities: [],
  projects: [],
  achievements: []
};

function EditProfileFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const targetSectionParam = searchParams.get('section') || 'all';

  const [activeSection, setActiveSection] = useState(targetSectionParam);
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [digiLockerModal, setDigiLockerModal] = useState(false);
  const [digiLockerVerified, setDigiLockerVerified] = useState(false);

  // Sync activeSection with searchParams
  useEffect(() => {
    if (targetSectionParam) {
      setActiveSection(targetSectionParam);
      // Auto-scroll to section
      setTimeout(() => {
        const el = document.getElementById(`section-${targetSectionParam}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [targetSectionParam]);

  // Read saved profile from localStorage & session user
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let userObj = null;
      const savedUser = localStorage.getItem('hiremind_user');
      const savedData = localStorage.getItem('hiremind_user_profile');
      if (savedUser) {
        try { userObj = JSON.parse(savedUser); } catch(e){}
      }
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setProfile(prev => ({
            ...prev,
            ...parsed,
            firstName: parsed.firstName || userObj?.firstName || prev.firstName,
            lastName: parsed.lastName || userObj?.lastName || prev.lastName,
            email: parsed.email || userObj?.email || prev.email,
            username: parsed.username || userObj?.username || prev.username,
          }));
          if (parsed.avatarUrl) {
            setAvatarPreview(parsed.avatarUrl);
          }
        } catch (e) {
          console.error("Error reading saved profile data", e);
        }
      } else if (userObj) {
        setProfile(prev => ({
          ...prev,
          firstName: userObj.firstName || userObj.fullName?.split(' ')[0] || '',
          lastName: userObj.lastName || userObj.fullName?.split(' ').slice(1).join(' ') || '',
          email: userObj.email || '',
          username: userObj.username || userObj.email?.split('@')[0] || '',
        }));
      }
    }
  }, []);

  const handleInputChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setProfile(prev => ({ ...prev, avatarUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper functions for array fields
  const handleAddSkill = () => {
    setProfile(prev => ({
      ...prev,
      skills: [...prev.skills, { name: '', level: 'Intermediate' }]
    }));
  };

  const handleRemoveSkill = (index) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSkillChange = (index, field, value) => {
    const newSkills = [...profile.skills];
    newSkills[index][field] = value;
    setProfile(prev => ({ ...prev, skills: newSkills }));
  };

  const handleAddWorkExp = () => {
    setProfile(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, { role: '', company: '', duration: '', description: '' }]
    }));
  };

  const handleWorkExpChange = (index, field, value) => {
    const updated = [...profile.workExperience];
    updated[index][field] = value;
    setProfile(prev => ({ ...prev, workExperience: updated }));
  };

  const handleRemoveWorkExp = (index) => {
    setProfile(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index)
    }));
  };

  const handleAddProject = () => {
    setProfile(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', description: '' }]
    }));
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...profile.projects];
    updated[index][field] = value;
    setProfile(prev => ({ ...prev, projects: updated }));
  };

  const handleRemoveProject = (index) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const handleAddAchievement = () => {
    setProfile(prev => ({
      ...prev,
      achievements: [...prev.achievements, { title: '', description: '' }]
    }));
  };

  const handleAchievementChange = (index, field, value) => {
    const updated = [...profile.achievements];
    updated[index][field] = value;
    setProfile(prev => ({ ...prev, achievements: updated }));
  };

  const handleRemoveAchievement = (index) => {
    setProfile(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('hiremind_user_profile', JSON.stringify(profile));
    }
    setSaveSuccess(true);
    
    // Redirect to profile section
    setTimeout(() => {
      router.push('/profile');
    }, 800);
  };

  const sectionTabs = [
    { id: 'all', label: 'Show All' },
    { id: 'basic', label: 'Basic Details' },
    { id: 'about', label: 'About' },
    { id: 'resume', label: 'Resume' },
    { id: 'skills', label: 'Skills' },
    { id: 'workExperience', label: 'Work Experience' },
    { id: 'education', label: 'Education' },
    { id: 'responsibilities', label: 'Responsibilities' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
  ];

  const genderOptions = ['Male', 'Female', 'More Options'];
  const userTypeOptions = ['College Students', 'Professional', 'School Student', 'Fresher'];
  const domainOptions = ['Management', 'Engineering', 'Arts & Science', 'Medicine', 'Others'];

  const courseOptions = [
    'B.Tech/BE (Bachelor of Technology / Bachelor of Engineering)',
    'B.Sc (Bachelor of Science)',
    'BCA (Bachelor of Computer Applications)',
    'M.Tech (Master of Technology)',
    'MBA (Master of Business Administration)',
    'Others'
  ];

  const specializationOptions = [
    'Computer Science and Engineering',
    'Information Technology',
    'Electronics and Communication Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Artificial Intelligence and Data Science',
    'Civil Engineering',
    'Others'
  ];

  const isVisible = (secId) => activeSection === 'all' || activeSection === secId;

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-[#181924] font-sans pb-16">
      {/* Top Header Navigation */}
      <Header />

      {/* Sticky Header Bar */}
      <div className="bg-white border-b border-[#e6e7f0] sticky top-[64px] sm:top-[80px] z-40 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => router.push('/profile')}
            className="p-1.5 rounded-full hover:bg-slate-100 transition text-[#333446] cursor-pointer flex items-center justify-center gap-1 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Profile</span>
          </button>
          
          <h1 className="text-base sm:text-lg font-bold text-[#151621] tracking-tight">Edit Profile Section</h1>

          <button 
            type="button"
            onClick={() => router.push('/profile')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#463fe6] text-xs font-semibold text-[#463fe6] hover:bg-[#f2f2ff] transition cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>View Profile</span>
          </button>
        </div>

        {/* Section Filter Pills */}
        <div className="max-w-4xl mx-auto px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-slate-100">
          {sectionTabs.map((tab) => {
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveSection(tab.id);
                  const el = document.getElementById(`section-${tab.id}`);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isActive 
                    ? 'bg-[#463fe6] text-white shadow-xs' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form Container */}
      <main className="max-w-4xl mx-auto px-3 sm:px-6 pt-6">
        
        {/* Toast Alert */}
        {saveSuccess && (
          <div className="mb-5 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-sm font-semibold shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div>
              <p className="font-bold">Profile Details Saved!</p>
              <p className="text-xs text-emerald-600 font-normal">Redirecting to your profile page...</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">

          {/* Section 1: Basic Details */}
          {isVisible('basic') && (
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
                onClick={() => {
                  setDigiLockerVerified(true);
                  setDigiLockerModal(true);
                }}
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
          )}

          {/* Section 2: About */}
          {isVisible('about') && (
            <div 
              id="section-about"
              className={`bg-white border rounded-[28px] p-5 sm:p-8 shadow-[0_8px_30px_rgba(30,34,70,0.06)] space-y-4 transition-all ${
                activeSection === 'about' ? 'border-[#463fe6] ring-2 ring-[#463fe6]/20' : 'border-[#e4e5ee]'
              }`}
            >
              <h3 className="text-base font-bold text-[#141522] flex items-center gap-2 border-b border-[#f0f1f7] pb-3">
                <FileText className="w-5 h-5 text-[#463fe6]" />
                Edit About Section
              </h3>
              <div>
                <label className="block text-xs font-bold text-[#232433] mb-1.5">Professional Summary</label>
                <textarea
                  rows={4}
                  value={profile.about}
                  onChange={(e) => handleInputChange('about', e.target.value)}
                  placeholder="Write a brief description about your background, career focus and passions..."
                  className="w-full p-4 rounded-xl border border-[#dcdce6] bg-white text-sm font-medium text-[#141520] outline-none focus:border-[#463fe6] resize-y"
                />
              </div>
            </div>
          )}

          {/* Section 3: Resume */}
          {isVisible('resume') && (
            <div 
              id="section-resume"
              className={`bg-white border rounded-[28px] p-5 sm:p-8 shadow-[0_8px_30px_rgba(30,34,70,0.06)] space-y-4 transition-all ${
                activeSection === 'resume' ? 'border-[#463fe6] ring-2 ring-[#463fe6]/20' : 'border-[#e4e5ee]'
              }`}
            >
              <h3 className="text-base font-bold text-[#141522] flex items-center gap-2 border-b border-[#f0f1f7] pb-3">
                <FileCheck className="w-5 h-5 text-[#463fe6]" />
                Edit Resume Section
              </h3>
              <div className="bg-[#f8f9fe] border border-[#e5e7f5] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-800">Current Resume</p>
                  <p className="text-sm font-extrabold text-[#463fe6] mt-0.5">{profile.resume?.filename || 'Shivraj_Resume.pdf'}</p>
                  <p className="text-[11px] text-slate-400 font-medium">{profile.resume?.modified || 'Modified recently'}</p>
                </div>
                <label className="px-4 py-2 bg-[#463fe6] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#3932db] transition text-center shrink-0">
                  Upload New Resume (PDF)
                  <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setProfile(prev => ({
                        ...prev,
                        resume: { filename: f.name, modified: 'Modified just now' }
                      }));
                    }
                  }} />
                </label>
              </div>
            </div>
          )}

          {/* Section 4: Skills */}
          {isVisible('skills') && (
            <div 
              id="section-skills"
              className={`bg-white border rounded-[28px] p-5 sm:p-8 shadow-[0_8px_30px_rgba(30,34,70,0.06)] space-y-4 transition-all ${
                activeSection === 'skills' ? 'border-[#463fe6] ring-2 ring-[#463fe6]/20' : 'border-[#e4e5ee]'
              }`}
            >
              <div className="flex items-center justify-between border-b border-[#f0f1f7] pb-3">
                <h3 className="text-base font-bold text-[#141522] flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#463fe6]" />
                  Edit Skills Section
                </h3>
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="flex items-center gap-1 text-xs font-bold text-[#463fe6] hover:underline cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Skill
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                      placeholder="Skill Name"
                      className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold outline-none focus:border-[#463fe6]"
                    />
                    <select
                      value={skill.level}
                      onChange={(e) => handleSkillChange(index, 'level', e.target.value)}
                      className="px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold outline-none"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: Work Experience */}
          {isVisible('workExperience') && (
            <div 
              id="section-workExperience"
              className={`bg-white border rounded-[28px] p-5 sm:p-8 shadow-[0_8px_30px_rgba(30,34,70,0.06)] space-y-4 transition-all ${
                activeSection === 'workExperience' ? 'border-[#463fe6] ring-2 ring-[#463fe6]/20' : 'border-[#e4e5ee]'
              }`}
            >
              <div className="flex items-center justify-between border-b border-[#f0f1f7] pb-3">
                <h3 className="text-base font-bold text-[#141522] flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#463fe6]" />
                  Edit Work Experience Section
                </h3>
                <button
                  type="button"
                  onClick={handleAddWorkExp}
                  className="flex items-center gap-1 text-xs font-bold text-[#463fe6] hover:underline cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Experience
                </button>
              </div>

              <div className="space-y-4">
                {profile.workExperience.map((exp, index) => (
                  <div key={index} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative">
                    <button
                      type="button"
                      onClick={() => handleRemoveWorkExp(index)}
                      className="absolute top-3 right-3 p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Role / Job Title</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => handleWorkExpChange(index, 'role', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Company Name</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleWorkExpChange(index, 'company', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Duration (e.g. Jan 2026 - Present)</label>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => handleWorkExpChange(index, 'duration', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Key Responsibilities / Bullet Description</label>
                      <textarea
                        rows={2}
                        value={exp.description}
                        onChange={(e) => handleWorkExpChange(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 6: Education */}
          {isVisible('education') && (
            <div 
              id="section-education"
              className={`bg-white border rounded-[28px] p-5 sm:p-8 shadow-[0_8px_30px_rgba(30,34,70,0.06)] space-y-4 transition-all ${
                activeSection === 'education' ? 'border-[#463fe6] ring-2 ring-[#463fe6]/20' : 'border-[#e4e5ee]'
              }`}
            >
              <h3 className="text-base font-bold text-[#141522] flex items-center gap-2 border-b border-[#f0f1f7] pb-3">
                <GraduationCap className="w-5 h-5 text-[#463fe6]" />
                Edit Education Section
              </h3>
              {profile.education.map((edu, index) => (
                <div key={index} className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Degree Title</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...profile.education];
                        updated[index].degree = e.target.value;
                        setProfile(prev => ({ ...prev, education: updated }));
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Institute / University</label>
                      <input
                        type="text"
                        value={edu.institute}
                        onChange={(e) => {
                          const updated = [...profile.education];
                          updated[index].institute = e.target.value;
                          setProfile(prev => ({ ...prev, education: updated }));
                        }}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Years (e.g. 2023 - 2027)</label>
                      <input
                        type="text"
                        value={edu.years}
                        onChange={(e) => {
                          const updated = [...profile.education];
                          updated[index].years = e.target.value;
                          setProfile(prev => ({ ...prev, education: updated }));
                        }}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Section 7: Responsibilities */}
          {isVisible('responsibilities') && (
            <div 
              id="section-responsibilities"
              className={`bg-white border rounded-[28px] p-5 sm:p-8 shadow-[0_8px_30px_rgba(30,34,70,0.06)] space-y-4 transition-all ${
                activeSection === 'responsibilities' ? 'border-[#463fe6] ring-2 ring-[#463fe6]/20' : 'border-[#e4e5ee]'
              }`}
            >
              <h3 className="text-base font-bold text-[#141522] flex items-center gap-2 border-b border-[#f0f1f7] pb-3">
                <CheckSquare className="w-5 h-5 text-[#463fe6]" />
                Edit Responsibilities Section
              </h3>
              {profile.responsibilities.map((res, index) => (
                <div key={index} className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Position / Responsibility Title</label>
                    <input
                      type="text"
                      value={res.title}
                      onChange={(e) => {
                        const updated = [...profile.responsibilities];
                        updated[index].title = e.target.value;
                        setProfile(prev => ({ ...prev, responsibilities: updated }));
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={res.description}
                      onChange={(e) => {
                        const updated = [...profile.responsibilities];
                        updated[index].description = e.target.value;
                        setProfile(prev => ({ ...prev, responsibilities: updated }));
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Section 8: Projects */}
          {isVisible('projects') && (
            <div 
              id="section-projects"
              className={`bg-white border rounded-[28px] p-5 sm:p-8 shadow-[0_8px_30px_rgba(30,34,70,0.06)] space-y-4 transition-all ${
                activeSection === 'projects' ? 'border-[#463fe6] ring-2 ring-[#463fe6]/20' : 'border-[#e4e5ee]'
              }`}
            >
              <div className="flex items-center justify-between border-b border-[#f0f1f7] pb-3">
                <h3 className="text-base font-bold text-[#141522] flex items-center gap-2">
                  <Code className="w-5 h-5 text-[#463fe6]" />
                  Edit Projects Section
                </h3>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="flex items-center gap-1 text-xs font-bold text-[#463fe6] hover:underline cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>

              <div className="space-y-4">
                {profile.projects.map((proj, index) => (
                  <div key={index} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative">
                    <button
                      type="button"
                      onClick={() => handleRemoveProject(index)}
                      className="absolute top-3 right-3 p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Project Name</label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Project Summary / Tech Stack</label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 9: Achievements */}
          {isVisible('achievements') && (
            <div 
              id="section-achievements"
              className={`bg-white border rounded-[28px] p-5 sm:p-8 shadow-[0_8px_30px_rgba(30,34,70,0.06)] space-y-4 transition-all ${
                activeSection === 'achievements' ? 'border-[#463fe6] ring-2 ring-[#463fe6]/20' : 'border-[#e4e5ee]'
              }`}
            >
              <div className="flex items-center justify-between border-b border-[#f0f1f7] pb-3">
                <h3 className="text-base font-bold text-[#141522] flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#463fe6]" />
                  Edit Achievements Section
                </h3>
                <button
                  type="button"
                  onClick={handleAddAchievement}
                  className="flex items-center gap-1 text-xs font-bold text-[#463fe6] hover:underline cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Add Achievement
                </button>
              </div>

              <div className="space-y-4">
                {profile.achievements.map((ach, index) => (
                  <div key={index} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative">
                    <button
                      type="button"
                      onClick={() => handleRemoveAchievement(index)}
                      className="absolute top-3 right-3 p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Achievement Title</label>
                      <input
                        type="text"
                        value={ach.title}
                        onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Details / Honors</label>
                      <textarea
                        rows={2}
                        value={ach.description}
                        onChange={(e) => handleAchievementChange(index, 'description', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sticky Save Action Bar */}
          <div className="pt-2 sticky bottom-4 z-40">
            <button
              type="submit"
              className="w-full h-13 rounded-2xl bg-[#463fe6] text-white font-semibold text-base shadow-[0_10px_25px_rgba(70,63,230,0.3)] hover:bg-[#3932db] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Save Section & Return to Profile
            </button>
          </div>

        </form>
      </main>

      {/* DigiLocker Modal */}
      {digiLockerModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-[#fff3e6] rounded-full flex items-center justify-center mx-auto text-[#e66c1f]">
              <Cloud className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">DigiLocker Identity Verified</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your identity & academic credentials have been verified through DigiLocker. Certified Candidate Badge has been attached to your profile.
            </p>
            <button
              type="button"
              onClick={() => setDigiLockerModal(false)}
              className="w-full py-3 bg-[#463fe6] text-white font-semibold text-sm rounded-xl hover:bg-[#3a33db] transition cursor-pointer"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EditProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f7f8fc] flex items-center justify-center">
        <p className="text-sm font-semibold text-[#463fe6]">Loading Edit Profile...</p>
      </div>
    }>
      <EditProfileFormContent />
    </Suspense>
  );
}
