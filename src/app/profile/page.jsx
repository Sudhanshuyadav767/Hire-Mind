"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../component/common/Header';
import { profileService } from '../../services/profileService';
import { resumeService } from '../../services/resumeService';
import { authService } from '../../services/authService';
import { 
  Pencil, 
  FileText, 
  FileCheck, 
  Download, 
  Award, 
  Briefcase, 
  GraduationCap, 
  CheckSquare, 
  Code, 
  Trophy, 
  Star, 
  User, 
  Upload,
  Sparkles,
  Building2,
  RefreshCw,
  Plus,
  CheckCircle2,
  AlertCircle,
  Home,
  FileUp,
  LogOut
} from 'lucide-react';

const EMPTY_PROFILE = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  mobile: '',
  gender: '',
  userType: '',
  domain: '',
  course: '',
  courseSpecialization: '',
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

// List of technical skills for client-side resume text parsing
const KNOWN_SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'React Native', 'Next.js', 'Node.js', 'Express',
  'Python', 'Django', 'Flask', 'Java', 'Spring Boot', 'C++', 'C#', '.NET', 'PHP', 'Laravel',
  'HTML', 'HTML5', 'CSS', 'CSS3', 'Tailwind', 'Bootstrap', 'Sass', 'Vue', 'Angular',
  'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'SQLite',
  'Git', 'GitHub', 'GitLab', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'DevOps',
  'Flutter', 'Dart', 'Android', 'iOS', 'Swift', 'Kotlin',
  'UI/UX Design', 'Figma', 'Adobe XD', 'REST API', 'GraphQL', 'Machine Learning',
  'Data Science', 'Data Analysis', 'Pandas', 'NumPy', 'Scikit-Learn', 'TensorFlow',
  'Linux', 'Cybersecurity', 'Agile', 'Scrum', 'Jira', 'Postman', 'Communication', 'Management'
];

// Dynamic DOCX / Text Stream extractor
function extractTextFromDocx(arrayBuffer) {
  try {
    const bytes = new Uint8Array(arrayBuffer);
    let str = '';
    for (let i = 0; i < bytes.length; i++) {
      const b = bytes[i];
      if ((b >= 32 && b <= 126) || b === 10 || b === 13 || b === 9) {
        str += String.fromCharCode(b);
      } else {
        str += ' ';
      }
    }
    return str
      .replace(/<w:p[^>]*>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/\s+/g, ' ');
  } catch (e) {
    return '';
  }
}

// Dynamic PDF.js text extractor for browser
async function extractTextFromPdf(arrayBuffer) {
  try {
    if (typeof window !== 'undefined') {
      let pdfjsLib = window.pdfjsLib;
      if (!pdfjsLib) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
          script.onload = () => resolve();
          script.onerror = () => reject();
          document.head.appendChild(script);
        });
        pdfjsLib = window.pdfjsLib;
        if (pdfjsLib) {
          pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
      }

      if (pdfjsLib) {
        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
        const pdfDoc = await loadingTask.promise;
        let fullText = '';
        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
          const page = await pdfDoc.getPage(pageNum);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          fullText += pageText + '\n';
        }
        if (fullText.trim().length > 20) {
          return fullText;
        }
      }
    }
  } catch (err) {
    console.warn('PDF.js text extraction error:', err);
  }
  return extractTextFromDocx(arrayBuffer);
}

// Helper to extract structured skills/education/experience from raw text
function extractStructuredInfoFromText(text, fileName) {
  if (!text || typeof text !== 'string') return null;

  const cleanText = text.replace(/[\r\n]+/g, '\n').trim();
  const lines = cleanText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  // 1. Contact Info
  const emailMatch = cleanText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i);
  const phoneMatch = cleanText.match(/(?:\+?\d{1,3}[ -]?)?\(?\d{3,4}\)?[ -]?\d{3,4}[ -]?\d{3,4}/);

  // 2. Skills Extraction (Global scan using regex word boundary)
  const foundSkillsMap = new Map();
  KNOWN_SKILLS.forEach(skill => {
    const escaped = skill.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`(?:^|[^a-zA-Z0-9#+.])${escaped}(?:$|[^a-zA-Z0-9#+.])`, 'i');
    if (regex.test(cleanText)) {
      const key = skill.toLowerCase();
      if (!foundSkillsMap.has(key)) {
        foundSkillsMap.set(key, { name: skill, level: 'Intermediate' });
      }
    }
  });
  const skills = Array.from(foundSkillsMap.values());

  // 3. Section Segmentation (flexible header matching)
  const sectionKeywords = {
    summary: /(?:summary|about me|about|profile|objective|overview)/i,
    skills: /(?:technical skills|core skills|skills|technologies|tools|expertise|competencies)/i,
    experience: /(?:work experience|professional experience|employment|work history|experience|internships|roles)/i,
    education: /(?:academic background|education|academic qualification|academic|qualifications|degrees)/i,
    projects: /(?:personal projects|academic projects|key projects|projects|portfolio)/i
  };

  const sectionBlocks = { summary: [], skills: [], experience: [], education: [], projects: [] };
  let currentSection = null;

  lines.forEach(line => {
    const cleanLine = line.replace(/^[•●*\d.\s:\-]+/, '').trim();
    let matchedSection = null;

    if (cleanLine.length > 2 && cleanLine.length < 55) {
      for (const [sec, regex] of Object.entries(sectionKeywords)) {
        if (regex.test(cleanLine)) {
          matchedSection = sec;
          break;
        }
      }
    }

    if (matchedSection) {
      currentSection = matchedSection;
    } else if (currentSection && sectionBlocks[currentSection]) {
      sectionBlocks[currentSection].push(line);
    }
  });

  // 4. Summary / Bio
  let summary = '';
  if (sectionBlocks.summary.length > 0) {
    summary = sectionBlocks.summary.slice(0, 5).join(' ');
  } else {
    const narrativeLines = lines.filter(l => 
      !l.includes('@') && 
      !/\d{10}/.test(l) && 
      !/http|www/i.test(l) &&
      l.length > 30
    ).slice(0, 3);
    summary = narrativeLines.join(' ');
  }

  // 5. Work Experience Extraction
  const experiences = [];
  const expLines = sectionBlocks.experience.length > 0 ? sectionBlocks.experience : lines;
  const roleRegex = /developer|engineer|intern|manager|designer|analyst|consultant|specialist|lead|architect|associate|administrator|executive|director|full stack|frontend|backend/i;
  const dateRegex = /(?:20\d\d|19\d\d|present|current|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i;

  let tempExp = null;
  expLines.forEach(line => {
    const isRole = roleRegex.test(line) && line.length < 110 && !/b\.tech|b\.e\.|degree|university|college|school|diploma/i.test(line);
    if (isRole) {
      if (tempExp) experiences.push(tempExp);
      const parts = line.split(/[-|–,]/).map(p => p.trim());
      tempExp = {
        role: parts[0] || line,
        company: parts[1] || parts[2] || 'Company / Organization',
        duration: parts.find(p => dateRegex.test(p)) || 'Recent',
        description: ''
      };
    } else if (tempExp) {
      if (!tempExp.description) {
        tempExp.description = line;
      } else if (tempExp.description.length < 300) {
        tempExp.description += ' ' + line;
      }
    }
  });
  if (tempExp) experiences.push(tempExp);

  // 6. Education Extraction
  const educations = [];
  const eduLines = sectionBlocks.education.length > 0 ? sectionBlocks.education : lines;
  const eduRegex = /b\.?tech|b\.?e\.?|bachelor|master|m\.?tech|bca|mca|b\.?sc|m\.?sc|ph\.?d|degree|diploma|12th|10th|university|college|institute|school|academy/i;

  let tempEdu = null;
  eduLines.forEach(line => {
    if (eduRegex.test(line) && line.length < 120) {
      if (tempEdu) educations.push(tempEdu);
      const parts = line.split(/[-|–,]/).map(p => p.trim());
      tempEdu = {
        degree: parts[0] || line,
        institute: parts[1] || parts[0] || 'Educational Institution',
        years: parts.find(p => /\b(20\d\d|19\d\d)\b/.test(p)) || 'Completed'
      };
    }
  });
  if (tempEdu) educations.push(tempEdu);

  // 7. Projects Extraction
  const projects = [];
  const projLines = sectionBlocks.projects.length > 0 ? sectionBlocks.projects : [];
  let tempProj = null;
  projLines.forEach(line => {
    if (line.length > 2 && line.length < 70 && !line.endsWith('.') && !line.includes('http')) {
      if (tempProj) projects.push(tempProj);
      tempProj = { name: line, description: '' };
    } else if (tempProj) {
      if (!tempProj.description) tempProj.description = line;
      else if (tempProj.description.length < 250) tempProj.description += ' ' + line;
    }
  });
  if (tempProj) projects.push(tempProj);

  return {
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
    summary: summary.slice(0, 500),
    skills: skills.slice(0, 25),
    educations: educations.slice(0, 5),
    experiences: experiences.slice(0, 5),
    projects: projects.slice(0, 5),
  };
}

// Client-side text reader for PDF / DOCX / DOC / TXT files
async function parseResumeFileClientSide(file) {
  return new Promise((resolve) => {
    const nameLower = file.name.toLowerCase();

    if (file.type.includes('text') || nameLower.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result || '';
        resolve(extractStructuredInfoFromText(text, file.name));
      };
      reader.onerror = () => resolve(null);
      reader.readAsText(file);
    } else if (nameLower.endsWith('.docx') || nameLower.endsWith('.doc') || file.type.includes('word')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result;
        if (arrayBuffer) {
          const extractedText = extractTextFromDocx(arrayBuffer);
          resolve(extractStructuredInfoFromText(extractedText, file.name));
        } else {
          resolve(null);
        }
      };
      reader.onerror = () => resolve(null);
      reader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result;
          if (arrayBuffer) {
            let extractedText = await extractTextFromPdf(arrayBuffer);
            if (!extractedText || extractedText.trim().length < 20) {
              extractedText = extractTextFromDocx(arrayBuffer);
            }
            resolve(extractStructuredInfoFromText(extractedText, file.name));
          } else {
            resolve(null);
          }
        } catch (err) {
          console.warn('Client-side file parse notice:', err);
          resolve(null);
        }
      };
      reader.onerror = () => resolve(null);
      reader.readAsArrayBuffer(file);
    }
  });
}

// Helper to strip out old hardcoded dummy/mock data from storage or state
function sanitizeProfile(p) {
  if (!p) return EMPTY_PROFILE;

  const isDummyText = (str) => {
    if (!str || typeof str !== 'string') return false;
    const lower = str.toLowerCase();
    return (
      lower.includes('shivraj') ||
      lower.includes('furniturehub') ||
      lower.includes('iet, jhansi') ||
      lower.includes('iet (iet)') ||
      lower.includes('qualified jee') ||
      lower.includes('fourth year b.tech computer science student')
    );
  };

  const cleanObj = { ...p };

  if (isDummyText(cleanObj.firstName)) cleanObj.firstName = '';
  if (isDummyText(cleanObj.lastName)) cleanObj.lastName = '';
  if (isDummyText(cleanObj.username)) cleanObj.username = '';
  if (isDummyText(cleanObj.email)) cleanObj.email = '';
  if (isDummyText(cleanObj.about)) cleanObj.about = '';
  if (isDummyText(cleanObj.institute)) cleanObj.institute = '';

  if (cleanObj.resume && isDummyText(cleanObj.resume.filename)) {
    cleanObj.resume = null;
  }

  if (Array.isArray(cleanObj.skills) && cleanObj.skills.some(s => isDummyText(s.name))) {
    cleanObj.skills = [];
  }

  if (Array.isArray(cleanObj.workExperience) && cleanObj.workExperience.some(e => isDummyText(e.company) || isDummyText(e.role))) {
    cleanObj.workExperience = [];
  }

  if (Array.isArray(cleanObj.education) && cleanObj.education.some(ed => isDummyText(ed.institute) || isDummyText(ed.degree))) {
    cleanObj.education = [];
  }

  if (Array.isArray(cleanObj.projects) && cleanObj.projects.some(pr => isDummyText(pr.name))) {
    cleanObj.projects = [];
  }

  if (Array.isArray(cleanObj.achievements) && cleanObj.achievements.some(a => isDummyText(a.title) || isDummyText(a.description))) {
    cleanObj.achievements = [];
  }

  return cleanObj;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [isLoading, setIsLoading] = useState(true);
  const [isParsingResume, setIsParsingResume] = useState(false);
  const [uploadStatusMessage, setUploadStatusMessage] = useState('');

  // 1. Read real user data from session & backend API
  useEffect(() => {
    async function loadProfileData() {
      setIsLoading(true);
      let userObj = null;

      // Read logged-in user details from localStorage
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
            // Overwrite storage if dummy data was present
            if (JSON.stringify(rawP) !== JSON.stringify(sanitizedP)) {
              localStorage.setItem('hiremind_user_profile', JSON.stringify(sanitizedP));
            }
            setProfile(prev => ({ ...prev, ...sanitizedP }));
          } catch (e) {}
        }
      }

      // Default name/email from session if profile fields are blank
      if (userObj) {
        setProfile(prev => ({
          ...prev,
          firstName: prev.firstName || userObj.firstName || userObj.fullName?.split(' ')[0] || userObj.email?.split('@')[0] || '',
          lastName: prev.lastName || userObj.lastName || userObj.fullName?.split(' ').slice(1).join(' ') || '',
          email: prev.email || userObj.email || '',
          username: prev.username || userObj.username || userObj.email?.split('@')[0] || '',
        }));
      }

      // Fetch live candidate profile from backend API
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

    // Step A: Parse client-side from file buffer/text via PDF.js
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

    // Step B: Call backend upload & parse API
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

    // Step C: Apply extracted data & update state
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

  // Calculate dynamic Profile Completion Strength %
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

  // Check if logged in user is Recruiter or HR
  const isRecruiterUser = React.useMemo(() => {
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

  // Recruiter & HR Profile View
  if (isRecruiterUser) {
    return (
      <div className="min-h-screen bg-[#f6f7fc] text-[#181924] font-sans pb-24 md:pb-16 text-left">
        <Header />

        {/* Sticky Action Bar */}
        <div className="bg-white border-b border-[#e6e7f0] sticky top-[64px] sm:top-[80px] z-40 shadow-2xs">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#2D24D0]/10 text-[#2D24D0] font-extrabold text-[10px] tracking-wider uppercase border border-[#2D24D0]/20">
                Recruiter Profile
              </span>
              <h1 className="text-xl font-bold text-[#141522] tracking-tight">HR Executive Profile</h1>
            </div>

            <button
              onClick={() => router.push('/recruiter')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#2D24D0] text-white text-xs font-bold hover:bg-[#1e1c75] transition shadow-xs cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Recruiter Dashboard</span>
            </button>
          </div>
        </div>

        <main className="max-w-6xl mx-auto px-3 sm:px-6 pt-6 space-y-6">
          {/* Recruiter Hero Identity Card */}
          <div className="bg-[#e9e8fe] border border-[#d8d6fc] rounded-[24px] p-6 sm:p-8 shadow-[0_4px_20px_rgba(45,36,208,0.08)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#2D24D0] text-white flex items-center justify-center font-extrabold text-2xl shadow-md border-2 border-white shrink-0">
                  <span>{(fullName.charAt(0) || 'R').toUpperCase()}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#11121d]">{fullName}</h2>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                      Verified HR
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#2D24D0]">{profile.email || handle}</p>
                  <p className="text-xs font-medium text-slate-600 flex items-center gap-1.5 pt-1">
                    <Building2 size={14} className="text-[#2D24D0]" />
                    <span>HireMind Corporate & Enterprise Talent Network</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => router.push('/recruiter')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#2D24D0] hover:bg-[#1e1c75] text-white text-xs font-bold shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Building2 size={14} />
                  <span>Go to Recruiter Portal</span>
                </button>
              </div>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Account & HR Scope */}
            <div className="bg-white border border-[#e4e5ee] rounded-[24px] p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-[#141522] flex items-center gap-2">
                  <Award size={18} className="text-[#2D24D0]" />
                  <span>HR Account & Access Permissions</span>
                </h3>
                <span className="text-[11px] font-bold text-slate-400">ID: HR-EXEC-2026</span>
              </div>

              <div className="space-y-2.5 text-xs font-semibold text-slate-700">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">Designated Role:</span>
                  <span className="text-[#2D24D0] font-bold">Enterprise HR & Hiring Manager</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">Job Postings Management:</span>
                  <span className="text-emerald-700 font-bold">✓ Full Access</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">Candidate Pipeline & Interviews:</span>
                  <span className="text-emerald-700 font-bold">✓ Full Access</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-500">Mailpit Credentials Dispatcher:</span>
                  <span className="text-emerald-700 font-bold">✓ Connected (Port 8025)</span>
                </div>
              </div>
            </div>

            {/* Quick Management Actions */}
            <div className="bg-white border border-[#e4e5ee] rounded-[24px] p-6 shadow-xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-[#141522] flex items-center gap-2">
                  <Sparkles size={18} className="text-[#2D24D0]" />
                  <span>Recruiter Quick Actions</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => router.push('/recruiter/jobs')}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-[#2D24D0] bg-slate-50/50 hover:bg-blue-50/30 transition text-left cursor-pointer space-y-1 group"
                >
                  <Briefcase size={18} className="text-[#2D24D0]" />
                  <h4 className="text-xs font-bold text-[#1E2229] group-hover:text-[#2D24D0]">Manage Job Vacancies</h4>
                  <p className="text-[10px] text-slate-400">Post, edit or pause job openings</p>
                </button>

                <button
                  onClick={() => router.push('/recruiter/applications/job-101')}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-[#2D24D0] bg-slate-50/50 hover:bg-blue-50/30 transition text-left cursor-pointer space-y-1 group"
                >
                  <User size={18} className="text-[#2D24D0]" />
                  <h4 className="text-xs font-bold text-[#1E2229] group-hover:text-[#2D24D0]">Candidate Pipeline</h4>
                  <p className="text-[10px] text-slate-400">Review candidate submissions & match scores</p>
                </button>

                <button
                  onClick={() => router.push('/recruiter')}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-[#2D24D0] bg-slate-50/50 hover:bg-blue-50/30 transition text-left cursor-pointer space-y-1 group"
                >
                  <Plus size={18} className="text-[#2D24D0]" />
                  <h4 className="text-xs font-bold text-[#1E2229] group-hover:text-[#2D24D0]">Create HR Sub-Accounts</h4>
                  <p className="text-[10px] text-slate-400">Delegate tasks & send email credentials</p>
                </button>

                <button
                  onClick={() => router.push('/find-jobs')}
                  className="p-3.5 rounded-2xl border border-slate-200 hover:border-[#2D24D0] bg-slate-50/50 hover:bg-blue-50/30 transition text-left cursor-pointer space-y-1 group"
                >
                  <Building2 size={18} className="text-[#2D24D0]" />
                  <h4 className="text-xs font-bold text-[#1E2229] group-hover:text-[#2D24D0]">Platform Overview</h4>
                  <p className="text-[10px] text-slate-400">View live candidate platform UI</p>
                </button>
              </div>
            </div>
          </div>

          {/* Account Session Logout */}
          <div className="bg-white border border-rose-100 rounded-[24px] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
                <LogOut className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-[#141522]">HR Account Session</h4>
                <p className="text-xs text-slate-500">Sign out of your Recruiter & HR Manager Portal account</p>
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
                  localStorage.removeItem('hiremind_user_role');
                  sessionStorage.clear();
                }
                router.push('/login');
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout HR Account</span>
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7fc] text-[#181924] font-sans pb-24 md:pb-16">
      {/* Navigation Header */}
      <Header />

      {/* Profile Page Sticky Action Bar */}
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
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-3 sm:px-6 pt-6">
        
        {/* Upload/Parsing Status Toast */}
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
        <div className="bg-[#e9e8fe] border border-[#d8d6fc] rounded-[24px] p-5 sm:p-7 shadow-[0_4px_20px_rgba(70,63,230,0.08)] mb-6 transition-all">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-3 border-white shadow-md flex items-center justify-center shrink-0 overflow-hidden">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt={fullName} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 sm:w-12 sm:h-12 text-[#463fe6]" />
                )}
              </div>

              {/* Real User Identity Info */}
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#11121d] tracking-tight">{fullName}</h2>
                <p className="text-xs sm:text-sm font-semibold text-[#463fe6]">{handle}</p>
                {profile.institute ? (
                  <p className="text-xs text-slate-600 font-medium flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{profile.institute}</span>
                  </p>
                ) : null}
                <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-semibold">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-indigo-200/60 text-[#463fe6]">
                    {profile.userType || 'Candidate'}
                  </span>
                  {profile.domain ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-white/80 border border-indigo-200/60 text-[#463fe6]">
                      {profile.domain}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Profile Strength Indicator */}
            <div className="w-full sm:w-64 bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-indigo-100/80 shadow-xs flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-500">Profile Strength:</span>
                  <span className="text-emerald-600 font-extrabold">{strengthScore}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${strengthScore}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => router.push('/edit-profile?section=basic')}
                className="w-full py-2 bg-[#463fe6] hover:bg-[#3831d0] text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit Profile Info</span>
              </button>
            </div>

          </div>
        </div>

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

            {/* Resume Section (With Upload & AI Parsing) */}
            <section className="bg-white border border-[#e4e5ee] rounded-[24px] p-5 sm:p-6 shadow-[0_4px_18px_rgba(20,24,60,0.04)] hover:shadow-md transition">
              <div className="flex items-center justify-between border-b border-[#f0f1f7] pb-3.5 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f0efff] text-[#463fe6] flex items-center justify-center shrink-0">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#141522]">Resume</h3>
                </div>

                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#463fe6] hover:bg-[#3932db] text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-xs">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{profile.resume ? 'Upload New' : 'Upload Resume'}</span>
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx,.txt" 
                    className="hidden" 
                    onChange={handleResumeUpload}
                    disabled={isParsingResume}
                  />
                </label>
              </div>

              {isParsingResume && (
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center gap-2 text-xs font-semibold text-[#463fe6]">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Parsing resume & updating profile...</span>
                </div>
              )}

              {profile.resume ? (
                <div className="bg-[#f8f9fe] border border-[#e5e7f5] rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center font-bold text-xs shrink-0">
                      PDF
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#141522]">
                        {profile.resume.filename}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium">
                        {profile.resume.modified || 'Uploaded'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Resume file: ${profile.resume.filename}`)}
                    className="p-2 text-[#463fe6] hover:bg-indigo-50 rounded-xl transition cursor-pointer"
                    title="Download / View Resume"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              ) : !isParsingResume && (
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center">
                  <FileUp className="w-8 h-8 text-[#463fe6] mx-auto mb-2 opacity-60" />
                  <p className="text-xs font-bold text-slate-700">No resume uploaded yet</p>
                  <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
                    Upload your PDF/DOCX resume to parse skills, work experience, and education automatically into your profile.
                  </p>
                </div>
              )}
            </section>

            {/* Skills Section */}
            <section className="bg-white border border-[#e4e5ee] rounded-[24px] p-5 sm:p-6 shadow-[0_4px_18px_rgba(20,24,60,0.04)] hover:shadow-md transition">
              <div className="flex items-center justify-between border-b border-[#f0f1f7] pb-3.5 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f0efff] text-[#463fe6] flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#141522]">Skills</h3>
                </div>
                <button 
                  onClick={() => router.push('/edit-profile?section=skills')} 
                  className="text-xs font-semibold text-[#463fe6] hover:underline cursor-pointer"
                >
                  {profile.skills?.length ? 'Manage' : '+ Add Skills'}
                </button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {profile.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill, index) => {
                    const skillName = typeof skill === 'string' ? skill : (skill.name || skill);
                    return (
                      <span
                        key={index}
                        className="inline-flex items-center px-3.5 py-1.5 rounded-xl bg-[#f4f3ff] text-[#463fe6] border border-[#e0ddff] text-xs sm:text-sm font-semibold hover:bg-[#463fe6] hover:text-white transition-all duration-200 shadow-2xs hover:shadow-xs cursor-default"
                      >
                        {skillName}
                      </span>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-400 py-2 text-center w-full">No skills added yet. Upload resume to parse skills automatically.</p>
                )}
              </div>
            </section>

          </div>

          {/* Right Column */}
          <div className="lg:col-span-6 space-y-6">

            {/* Work Experience Section */}
            <section className="bg-white border border-[#e4e5ee] rounded-[24px] p-5 sm:p-6 shadow-[0_4px_18px_rgba(20,24,60,0.04)] hover:shadow-md transition">
              <div className="flex items-center justify-between border-b border-[#f0f1f7] pb-3.5 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f0efff] text-[#463fe6] flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#141522]">Work Experience</h3>
                </div>
                <button 
                  onClick={() => router.push('/edit-profile?section=workExperience')} 
                  className="text-xs font-semibold text-[#463fe6] hover:underline cursor-pointer"
                >
                  {profile.workExperience?.length ? 'Edit' : '+ Add Experience'}
                </button>
              </div>

              <div className="space-y-4">
                {profile.workExperience && profile.workExperience.length > 0 ? (
                  profile.workExperience.map((exp, idx) => (
                    <div key={idx} className="space-y-1 border-l-2 border-[#463fe6]/30 pl-3.5 py-0.5">
                      <h4 className="text-sm font-bold text-[#141522]">{exp.role}</h4>
                      <p className="text-xs font-semibold text-[#463fe6]">{exp.company}</p>
                      {exp.duration ? <p className="text-[11px] text-slate-400 font-medium">{exp.duration}</p> : null}
                      {exp.description ? <p className="text-xs text-slate-600 pt-1 leading-relaxed">{exp.description}</p> : null}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 py-2 text-center">No work experience added yet.</p>
                )}
              </div>
            </section>

            {/* Education Section */}
            <section className="bg-white border border-[#e4e5ee] rounded-[24px] p-5 sm:p-6 shadow-[0_4px_18px_rgba(20,24,60,0.04)] hover:shadow-md transition">
              <div className="flex items-center justify-between border-b border-[#f0f1f7] pb-3.5 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f0efff] text-[#463fe6] flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#141522]">Education</h3>
                </div>
                <button 
                  onClick={() => router.push('/edit-profile?section=education')} 
                  className="text-xs font-semibold text-[#463fe6] hover:underline cursor-pointer"
                >
                  {profile.education?.length ? 'Edit' : '+ Add Education'}
                </button>
              </div>

              <div className="space-y-4">
                {profile.education && profile.education.length > 0 ? (
                  profile.education.map((edu, idx) => (
                    <div key={idx} className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-[#141522] leading-snug">{edu.degree}</h4>
                      <p className="text-xs font-semibold text-[#463fe6]">{edu.institute}</p>
                      {edu.years ? <p className="text-[11px] text-slate-400 font-medium">{edu.years}</p> : null}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 py-2 text-center">No education details added yet.</p>
                )}
              </div>
            </section>

            {/* Projects Section */}
            <section className="bg-white border border-[#e4e5ee] rounded-[24px] p-5 sm:p-6 shadow-[0_4px_18px_rgba(20,24,60,0.04)] hover:shadow-md transition">
              <div className="flex items-center justify-between border-b border-[#f0f1f7] pb-3.5 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f0efff] text-[#463fe6] flex items-center justify-center shrink-0">
                    <Code className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-[#141522]">Projects</h3>
                </div>
                <button 
                  onClick={() => router.push('/edit-profile?section=projects')} 
                  className="text-xs font-semibold text-[#463fe6] hover:underline cursor-pointer"
                >
                  {profile.projects?.length ? 'Edit' : '+ Add Project'}
                </button>
              </div>

              <div className="space-y-3">
                {profile.projects && profile.projects.length > 0 ? (
                  profile.projects.map((proj, idx) => (
                    <div key={idx} className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold text-[#141522]">{proj.name}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 py-2 text-center">No projects added yet.</p>
                )}
              </div>
            </section>

          </div>

        </div>

        {/* Account Logout Section at Bottom of Profile */}
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
              } catch (e) {
                console.warn('Logout notice:', e);
              }
              if (typeof window !== 'undefined') {
                localStorage.removeItem('hiremind_user');
                localStorage.removeItem('hiremind_user_profile');
                sessionStorage.clear();
              }
              router.push('/login');
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 shadow-2xs active:scale-98"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Account</span>
          </button>
        </div>

      </main>

      {/* Bottom Sticky Mobile Navigation Bar */}
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
