"use client";

/**
 * Profile Helpers & Resume Parsing Utilities
 * Provides client-side resume text parsing (PDF/DOCX/TXT), structured field extraction,
 * and profile sanitization routines for HireMind candidate profiles.
 */

export const EMPTY_PROFILE = {
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
export const KNOWN_SKILLS = [
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

/**
 * Extract plain text from Word DOCX array buffer
 */
export function extractTextFromDocx(arrayBuffer) {
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

/**
 * Extract plain text from PDF file via PDF.js worker
 */
export async function extractTextFromPdf(arrayBuffer) {
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

/**
 * Extract structured candidate info from raw text
 */
export function extractStructuredInfoFromText(text, fileName) {
  if (!text || typeof text !== 'string') return null;

  const cleanText = text.replace(/[\r\n]+/g, '\n').trim();
  const lines = cleanText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  const emailMatch = cleanText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i);
  const phoneMatch = cleanText.match(/(?:\+?\d{1,3}[ -]?)?\(?\d{3,4}\)?[ -]?\d{3,4}[ -]?\d{3,4}/);

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

/**
 * Parse client side file into structured data
 */
export async function parseResumeFileClientSide(file) {
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

/**
 * Sanitize profile object and clear dummy values
 */
export function sanitizeProfile(p) {
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
