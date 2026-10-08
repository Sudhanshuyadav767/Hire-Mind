"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../component/common/Header';

// Services
import { profileService } from '../../services/profileService';
import { resumeService } from '../../services/resumeService';
import { authService } from '../../services/authService';

// Subcomponents
import ProfileHeaderHero from '../component/profile/ProfileHeaderHero';
import ProfileResumeSection from '../component/profile/ProfileResumeSection';
import ProfileSkillsSection from '../component/profile/ProfileSkillsSection';
import ProfileExperienceSection from '../component/profile/ProfileExperienceSection';
import ProfileEducationSection from '../component/profile/ProfileEducationSection';
import ProfileProjectsSection from '../component/profile/ProfileProjectsSection';
import ProfileRecruiterView from '../component/profile/ProfileRecruiterView';

// Helpers
import {
  EMPTY_PROFILE,
  sanitizeProfile,
  parseResumeFileClientSide
} from '../component/profile/profileHelpers';

import {
  Pencil,
  FileText,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Home,
  Briefcase,
  User,
  LogOut
} from 'lucide-react';

/**
 * ProfilePage Component
 * Main page container for displaying candidate and recruiter profiles,
 * handling resume uploads, AI parsing, and managing candidate attributes.
 */
export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [isLoading, setIsLoading] = useState(true);
  const [isParsingResume, setIsParsingResume] = useState(false);
  const [uploadStatusMessage, setUploadStatusMessage] = useState('');

  // 1. Load candidate profile data from session & backend API
  useEffect(() => {
    async function loadProfileData() {
      setIsLoading(true);
      let userObj = null;

      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('hiremind_user');
        const storedProfile = localStorage.getItem('hiremind_user_profile');
        if (storedUser) {
          try {
            userObj = JSON.parse(storedUser);
          } catch (e) {}
        }
        if (storedProfile) {
          try {
            const rawP = JSON.parse(storedProfile);
            const sanitizedP = sanitizeProfile(rawP);
            if (JSON.stringify(rawP) !== JSON.stringify(sanitizedP)) {
              localStorage.setItem('hiremind_user_profile', JSON.stringify(sanitizedP));
            }
            setProfile(prev => ({ ...prev, ...sanitizedP }));
          } catch (e) {}
        }
      }

      if (userObj) {
        setProfile(prev => ({
          ...prev,
          firstName: prev.firstName || userObj.firstName || userObj.fullName?.split(' ')[0] || userObj.email?.split('@')[0] || '',
          lastName: prev.lastName || userObj.lastName || userObj.fullName?.split(' ').slice(1).join(' ') || '',
          email: prev.email || userObj.email || '',
          username: prev.username || userObj.username || userObj.email?.split('@')[0] || '',
        }));
      }

      try {
        const res = await profileService.getProfile();
        if (res && res.data) {
          const api = res.data;
          setProfile(prev => {
            const updated = sanitizeProfile({
              ...prev,
              firstName: api.firstName || api.user?.firstName || userObj?.firstName || prev.firstName,
              lastName: api.lastName || api.user?.lastName || userObj?.lastName || prev.lastName,
              email: api.email || api.user?.email || userObj?.email || prev.email,
              username: api.username || api.user?.username || userObj?.username || prev.username,
              mobile: api.phone || api.mobile || prev.mobile,
              about: api.bio || api.summary || prev.about,
              avatarUrl: api.avatarUrl || prev.avatarUrl,
              skills: api.candidateSkills?.length 
                ? api.candidateSkills.map(s => ({ name: s.skill?.name || s.name || 'Skill', level: s.proficiencyLevel || 'Intermediate' })) 
                : prev.skills,
              workExperience: api.experiences?.length 
                ? api.experiences.map(e => ({ role: e.title || e.designation, company: e.companyName, duration: `${e.startDate || ''} - ${e.endDate || 'Present'}`, description: e.description })) 
                : prev.workExperience,
              education: api.educations?.length 
                ? api.educations.map(ed => ({ degree: ed.degree, institute: ed.institution, years: `${ed.startDate || ''} - ${ed.endDate || 'Present'}` })) 
                : prev.education,
              projects: api.projects?.length 
                ? api.projects.map(p => ({ name: p.title || p.name, description: p.description })) 
                : prev.projects,
              resume: api.resumes?.length 
                ? { filename: api.resumes[0].originalName || api.resumes[0].filename || 'Uploaded_Resume.pdf', modified: 'Uploaded' } 
                : prev.resume,
            });
            if (typeof window !== 'undefined') {
              localStorage.setItem('hiremind_user_profile', JSON.stringify(updated));
            }
            return updated;
          });
        }
      } catch (err) {
        console.warn("Live backend profile notice:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfileData();
  }, []);

  // 2. Resume Upload & AI Parsing Handler
  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsingResume(true);
    setUploadStatusMessage('AI is parsing your resume and populating your profile...');

    const resumeObj = {
      filename: file.name,
      modified: 'Uploaded just now',
    };

    let parsedSummary = '';
    let parsedSkills = [];
    let parsedExp = [];
    let parsedEdu = [];
    let parsedProj = [];

    try {
      const clientParsed = await parseResumeFileClientSide(file);
      if (clientParsed) {
        if (clientParsed.summary) parsedSummary = clientParsed.summary;
        if (clientParsed.skills?.length) parsedSkills = clientParsed.skills;
        if (clientParsed.experiences?.length) parsedExp = clientParsed.experiences;
        if (clientParsed.educations?.length) parsedEdu = clientParsed.educations;
        if (clientParsed.projects?.length) parsedProj = clientParsed.projects;
      }
    } catch (clientErr) {
      console.warn('Client-side parse notice:', clientErr);
    }

    try {
      const res = await resumeService.uploadResume(file);
      const apiData = res?.data?.parsed || res?.data?.parsedData || res?.data || {};

      if (apiData.summary || apiData.bio || apiData.about) {
        parsedSummary = apiData.summary || apiData.bio || apiData.about;
      }

      const rawSkills = apiData.skills || apiData.extractedSkills;
      if (Array.isArray(rawSkills) && rawSkills.length > 0) {
        const apiSkills = rawSkills.map(s => {
          if (typeof s === 'string') return { name: s, level: 'Intermediate' };
          return { name: s.name || s.skillName || 'Skill', level: s.level || s.proficiencyLevel || 'Intermediate' };
        });
        const skillNameSet = new Set(parsedSkills.map(s => (typeof s === 'string' ? s : s.name).toLowerCase()));
        apiSkills.forEach(sk => {
          if (!skillNameSet.has(sk.name.toLowerCase())) {
            parsedSkills.push(sk);
            skillNameSet.add(sk.name.toLowerCase());
          }
        });
      }

      const rawExp = apiData.experience || apiData.experiences || apiData.extractedExperience;
      if (Array.isArray(rawExp) && rawExp.length > 0) {
        const apiExp = rawExp.map(exp => ({
          role: exp.title || exp.designation || exp.role || 'Position',
          company: exp.companyName || exp.company || 'Company',
          duration: exp.duration || (exp.startDate ? `${exp.startDate} - ${exp.endDate || 'Present'}` : ''),
          description: exp.description || ''
        }));
        if (apiExp.length > 0) parsedExp = apiExp;
      }

      const rawEdu = apiData.education || apiData.educations || apiData.extractedEducation;
      if (Array.isArray(rawEdu) && rawEdu.length > 0) {
        const apiEdu = rawEdu.map(ed => ({
          degree: ed.degree || 'Degree',
          institute: ed.institution || ed.school || ed.institute || 'Institution',
          years: ed.years || (ed.startDate ? `${ed.startDate} - ${ed.endDate || 'Present'}` : '')
        }));
        if (apiEdu.length > 0) parsedEdu = apiEdu;
      }

      const rawProj = apiData.projects || apiData.extractedProjects;
      if (Array.isArray(rawProj) && rawProj.length > 0) {
        const apiProj = rawProj.map(p => ({
          name: p.title || p.name || 'Project',
          description: p.description || ''
        }));
        if (apiProj.length > 0) parsedProj = apiProj;
      }
    } catch (apiErr) {
      console.warn('Backend parse notice:', apiErr);
    }

    setProfile(prev => {
      const cleanPrev = sanitizeProfile(prev);
      const updated = {
        ...cleanPrev,
        resume: resumeObj,
        about: parsedSummary || cleanPrev.about,
        skills: parsedSkills.length ? parsedSkills : cleanPrev.skills,
        workExperience: parsedExp.length ? parsedExp : cleanPrev.workExperience,
        education: parsedEdu.length ? parsedEdu : cleanPrev.education,
        projects: parsedProj.length ? parsedProj : cleanPrev.projects,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('hiremind_user_profile', JSON.stringify(updated));
      }
      return updated;
    });

    setUploadStatusMessage('Resume uploaded & parsed successfully! Profile updated.');
    setTimeout(() => setUploadStatusMessage(''), 4500);
    setIsParsingResume(false);
  };

  // Profile strength calculation
  const calculateProfileStrength = () => {
    let score = 20;
    if (profile.firstName) score += 10;
    if (profile.email) score += 10;
    if (profile.about) score += 15;
    if (profile.resume) score += 20;
    if (profile.skills && profile.skills.length > 0) score += 15;
    if (profile.education && profile.education.length > 0) score += 10;
    if (profile.workExperience && profile.workExperience.length > 0) score += 10;
    return Math.min(100, score);
  };

  const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || profile.email?.split('@')[0] || 'User Profile';
  const handle = profile.username ? (profile.username.startsWith('@') ? profile.username : `@${profile.username}`) : (profile.email ? `@${profile.email.split('@')[0]}` : '@candidate');
  const strengthScore = calculateProfileStrength();

  // Recruiter role check
  const isRecruiterUser = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const storedUser = localStorage.getItem('hiremind_user');
    if (storedUser) {
      try {
        const u = JSON.parse(storedUser);
        if (
          u.role === 'recruiter' ||
          u.role === 'hr' ||
          u.userType === 'recruiter' ||
          u.userType === 'hr' ||
          u.isHrTeamMember
        ) {
          return true;
        }
      } catch (e) {}
    }
    const roleFlag = localStorage.getItem('hiremind_user_role');
    if (roleFlag === 'recruiter' || roleFlag === 'hr') return true;
    return false;
  }, [profile]);

  if (isRecruiterUser) {
    return <ProfileRecruiterView profile={profile} fullName={fullName} handle={handle} />;
  }

  return (
    <div className="min-h-screen bg-[#f6f7fc] text-[#181924] font-sans pb-24 md:pb-16">
      <Header />

      {/* Sticky Action Bar */}
      <div className="bg-white border-b border-[#e6e7f0] sticky top-[64px] sm:top-[80px] z-40 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#141522] tracking-tight">My Profile</h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/edit-profile?section=basic')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#463fe6] text-white text-xs font-semibold hover:bg-[#3932db] transition shadow-sm cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
            <Link href="/pricing">
              <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2D24D0] hover:bg-[#1e1c75] text-white text-xs font-bold transition shadow-sm cursor-pointer">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>Upgrade Plan</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-3 sm:px-6 pt-6">
        {uploadStatusMessage && (
          <div className="mb-5 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center gap-3 text-indigo-900 text-sm font-semibold shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
            {isParsingResume ? (
              <RefreshCw className="w-5 h-5 text-[#463fe6] animate-spin shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            )}
            <span>{uploadStatusMessage}</span>
          </div>
        )}

        {/* Top Hero Identity Card */}
        <ProfileHeaderHero 
          profile={profile}
          strengthScore={strengthScore}
          fullName={fullName}
          handle={handle}
        />

        {/* 2-Column Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* About / Bio Section */}
            <section className="bg-white border border-[#e4e5ee] rounded-[24px] p-5 sm:p-6 shadow-[0_4px_18px_rgba(20,24,60,0.04)] hover:shadow-md transition">
              <div className="flex items-center justify-between border-b border-[#f0f1f7] pb-3.5 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f0efff] text-[#463fe6] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#141522]">About</h3>
                </div>
                <button 
                  onClick={() => router.push('/edit-profile?section=about')} 
                  className="text-xs font-semibold text-[#463fe6] hover:underline cursor-pointer"
                >
                  {profile.about ? 'Edit' : '+ Add Bio'}
                </button>
              </div>

              {profile.about ? (
                <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                  {profile.about}
                </p>
              ) : (
                <div className="text-center py-4 text-slate-400">
                  <p className="text-xs">No summary added yet. Add a short bio or upload your resume to auto-fill.</p>
                </div>
              )}
            </section>

            <ProfileResumeSection 
              resume={profile.resume}
              isParsingResume={isParsingResume}
              onResumeUpload={handleResumeUpload}
            />

            <ProfileSkillsSection 
              skills={profile.skills}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 space-y-6">
            <ProfileExperienceSection 
              workExperience={profile.workExperience}
            />

            <ProfileEducationSection 
              education={profile.education}
            />

            <ProfileProjectsSection 
              projects={profile.projects}
            />
          </div>
        </div>

        {/* Account Logout Section */}
        <div className="mt-8 bg-white border border-rose-100 rounded-[24px] p-5 sm:p-6 shadow-[0_4px_18px_rgba(239,68,68,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
              <LogOut className="w-5 h-5" />
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-sm font-bold text-[#141522]">Account Session</h4>
              <p className="text-xs text-slate-500">Sign out of your HireMind candidate account on this device</p>
            </div>
          </div>

          <button
            type="button"
            onClick={async () => {
              try {
                await authService.logout();
              } catch (e) {}
              if (typeof window !== 'undefined') {
                localStorage.removeItem('hiremind_user');
                localStorage.removeItem('hiremind_user_profile');
                sessionStorage.clear();
              }
              router.push('/login');
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Account</span>
          </button>
        </div>
      </main>

      {/* Mobile Sticky Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
        <Link href="/" className="flex flex-col items-center gap-1 text-slate-500 hover:text-[#463fe6]">
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Home</span>
        </Link>
        <Link href="/find-jobs" className="flex flex-col items-center gap-1 text-slate-500 hover:text-[#463fe6]">
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Jobs</span>
        </Link>
        <Link href="/ai-services" className="flex flex-col items-center gap-1 text-slate-500 hover:text-[#463fe6]">
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-semibold">AI Tools</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 text-[#463fe6]">
          <User className="w-5 h-5" />
          <span className="text-[10px] font-bold">Profile</span>
        </Link>
      </div>
    </div>
  );
}
