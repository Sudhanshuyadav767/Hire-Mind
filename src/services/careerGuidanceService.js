import { apiClient } from './apiClient';

/**
 * Live Google Gemini 3.5 Flash Lite AI Generator for Personalised Career Guidance Reports
 * Generates role match, skill gap breakdown, learning roadmap, job postings, and market insights.
 *
 * @param {Object|string} inputPayload - User career input or object containing additionalInfo ("Any other information")
 * @returns {Promise<Object>} Generated AI career guidance report JSON object
 */
const generateGeminiCareerGuidance = async (inputPayload) => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;

  // Extract all user input parameters
  const payloadObj = typeof inputPayload === 'object' ? inputPayload : { targetRole: inputPayload };
  const { targetRole, interests, field, education, experience, additionalInfo, preferredLocation } = payloadObj;

  const userFocus = additionalInfo?.trim();
  const primaryContext = userFocus || targetRole || interests || field || 'Full Stack Software Engineer';

  let fullUserPrompt = `Candidate Primary Target / Specific Focus: "${primaryContext}"`;
  if (userFocus) {
    fullUserPrompt += `\nUSER SPECIFIC REQUIREMENT / ADDITIONAL INFORMATION ("Any other information"): "${userFocus}"`;
  }
  if (targetRole && targetRole !== userFocus) fullUserPrompt += `\nTarget Role Context: "${targetRole}"`;
  if (interests) fullUserPrompt += `\nMain Interests: "${interests}"`;
  if (field) fullUserPrompt += `\nField/Industry: "${field}"`;
  if (education) fullUserPrompt += `\nEducation Level: "${education}"`;
  if (experience) fullUserPrompt += `\nYears of Experience: "${experience}"`;
  if (preferredLocation) fullUserPrompt += `\nPreferred Location: "${preferredLocation}"`;

  const prompt = `You are HireMind's elite AI Career Guidance Engine. Generate a comprehensive, highly personalized career report for the candidate based on these exact details:
${fullUserPrompt}

STRICT MANDATE:
1. If the candidate provided text in "USER SPECIFIC REQUIREMENT / ADDITIONAL INFORMATION" (such as "${userFocus}"), your generated "topRole", "description", "whyMatch", "skills", "roadmap", "jobRoles", and "insights" MUST BE 100% SPECIFICALLY TAILORED TO "${userFocus}".
2. For example, if the input is "editing apps", topRole MUST BE "Video & Photo Editing App Developer" or "Mobile Multimedia Engineer" or similar. DO NOT output generic default roles like "Business & Finance" or generic web dev if the user specifically asked about "${userFocus}".
3. Ensure all 4 whyMatch points explain why "${userFocus}" is a great career match given their experience level (${experience || '1-3 Years'}) and education (${education || "Bachelor's Degree"}).

Return ONLY a valid JSON object matching this exact JSON schema:
{
  "topRole": "Specific Role Title based on user focus/input",
  "matchScore": 95,
  "description": "2-3 sentence overview of this specialized role and why it matches the user's specific input.",
  "whyMatch": [
    "Reason 1 tailored specifically to candidate input and goals",
    "Reason 2 regarding industry demand & skill alignment",
    "Reason 3 regarding core technical capabilities needed",
    "Reason 4 regarding salary & career growth potential"
  ],
  "secondaryRoles": [
    { "title": "Related Specialized Role 1", "match": 90, "salary": "₹14 - ₹26 LPA" },
    { "title": "Related Specialized Role 2", "match": 85, "salary": "₹12 - ₹22 LPA" }
  ],
  "skills": {
    "mastered": ["Relevant Skill 1", "Relevant Skill 2", "Relevant Skill 3", "Relevant Skill 4"],
    "missing": [
      { "name": "Priority Skill Gap 1", "progress": 40, "priority": "High" },
      { "name": "Priority Skill Gap 2", "progress": 55, "priority": "High" },
      { "name": "Priority Skill Gap 3", "progress": 45, "priority": "Medium" }
    ]
  },
  "roadmap": [
    { "num": 1, "title": "Phase 1: Foundations", "duration": "0-2 Months", "desc": "Core skills to master first" },
    { "num": 2, "title": "Phase 2: Core Engineering", "duration": "2-4 Months", "desc": "Practical building & frameworks" },
    { "num": 3, "title": "Phase 3: Advanced & Cloud", "duration": "4-6 Months", "desc": "Production architecture & DevOps" },
    { "num": 4, "title": "Phase 4: Capstone & Portfolio", "duration": "6+ Months", "desc": "Real-world app launch & job hunt" }
  ],
  "jobRoles": [
    { "title": "Senior Specialized Role", "company": "Top Tech Company", "location": "Bangalore / Remote", "salary": "₹18-30 LPA", "tags": ["Tag1", "Tag2", "Tag3"] },
    { "title": "Specialized Engineer", "company": "High-Growth Startup", "location": "Remote", "salary": "₹15-25 LPA", "tags": ["Tag1", "Tag2"] }
  ],
  "insights": {
    "marketDemand": "Dynamic AI market growth trend e.g. High (+42% YoY Growth)",
    "hiringLocations": "Top hiring hubs e.g. Bangalore, Remote, Gurgaon, Pune",
    "salaryRange": "Realistic salary benchmark e.g. ₹8 LPA (Entry) to ₹38+ LPA (Lead/Staff)",
    "hiringSpeed": "Recruitment speed e.g. Fast (Immediate hiring priority)"
  }
}`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      responseMimeType: 'application/json'
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const json = await response.json();
  if (!response.ok || json.error) {
    throw new Error(json.error?.message || `Gemini API HTTP ${response.status}`);
  }

  const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const parsed = JSON.parse(rawText);

  // Normalize insights strings/arrays
  if (parsed.insights && Array.isArray(parsed.insights.hiringLocations)) {
    parsed.insights.hiringLocations = parsed.insights.hiringLocations.join(', ');
  }
  if (parsed.insights && typeof parsed.insights.salaryRange === 'object') {
    const sr = parsed.insights.salaryRange;
    parsed.insights.salaryRange = `${sr.entryLevel || '₹8 LPA'} to ${sr.seniorLevel || '₹35+ LPA'}`;
  }

  return parsed;
};

/**
 * AI Career Guidance Service API Bridge
 */
export const careerGuidanceService = {
  /**
   * Generate complete personalized AI career guidance report.
   * @param {Object} [payload={}] Candidate input object
   * @returns {Promise<Object>} Response object containing AI report data
   */
  getCareerGuidanceReport: async (payload = {}) => {
    try {
      const aiData = await generateGeminiCareerGuidance(payload);
      return {
        success: true,
        data: aiData
      };
    } catch (geminiError) {
      console.warn('Direct Gemini API call error, falling back to backend:', geminiError.message);
      try {
        const response = await apiClient('/career-guidance', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        if (response?.success && response?.data) {
          return response;
        }
      } catch (backendErr) {
        console.error('Backend fallback also failed:', backendErr);
      }
      return {
        success: false,
        message: 'Failed to generate AI guidance. Please try again.'
      };
    }
  },

  getCareerGuidanceResults: async (input = {}) => {
    return careerGuidanceService.getCareerGuidanceReport(input);
  },

  /**
   * Fetch AI Skill Gap Analysis for target career.
   * @param {Object} [payload={}]
   * @returns {Promise<Object>} Mastered vs missing skills breakdown
   */
  getSkillAnalysis: async (payload = {}) => {
    try {
      const fullAiData = await generateGeminiCareerGuidance(payload);
      return {
        success: true,
        data: {
          targetRole: fullAiData.topRole || 'Specialized Engineer',
          masteredSkills: fullAiData.skills?.mastered || ["Core Languages", "Frameworks"],
          missingSkills: fullAiData.skills?.missing || [
            { name: "Advanced Architecture", priority: "High", progress: 40 },
            { name: "Cloud MLOps / DevOps", priority: "High", progress: 50 }
          ]
        }
      };
    } catch (error) {
      console.warn('Direct Gemini AI skill analysis failed, trying backend:', error.message);
      try {
        const response = await apiClient('/career-guidance/skills', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        if (response?.success && response?.data) {
          return response;
        }
      } catch (e) {
        return { success: false, message: e.message };
      }
    }
  },

  /**
   * Fetch 4-phase AI learning roadmap.
   * @param {Object} [payload={}]
   * @returns {Promise<Object>} Learning roadmap phases
   */
  getLearningRoadmap: async (payload = {}) => {
    try {
      const fullAiData = await generateGeminiCareerGuidance(payload);
      return {
        success: true,
        data: {
          targetRole: fullAiData.topRole || 'Specialized Engineer',
          estimatedDuration: "6 Months",
          milestones: fullAiData.roadmap || []
        }
      };
    } catch (error) {
      console.warn('Direct Gemini AI roadmap failed, trying backend:', error.message);
      try {
        const response = await apiClient('/career-guidance/roadmap', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        if (response?.success && response?.data) {
          return response;
        }
      } catch (e) {
        return { success: false, message: e.message };
      }
    }
  },

  /**
   * Fetch AI market insights (salary range, demand growth, top hiring locations).
   * @param {Object} [payload={}]
   * @returns {Promise<Object>} Market insights data
   */
  getMarketInsights: async (payload = {}) => {
    try {
      const fullAiData = await generateGeminiCareerGuidance(payload);
      return {
        success: true,
        data: fullAiData.insights || {
          marketDemand: "High (+35% YoY Growth)",
          salaryRange: "₹8 - ₹30 LPA",
          hiringLocations: "Bangalore, Remote, Gurgaon",
          hiringSpeed: "Fast"
        }
      };
    } catch (error) {
      console.warn('Direct Gemini AI market insights failed, trying backend:', error.message);
      try {
        const response = await apiClient('/career-guidance/insights', {
          method: 'POST',
          body: JSON.stringify(payload),
        });
        if (response?.success && response?.data) {
          return response;
        }
      } catch (e) {
        return { success: false, message: e.message };
      }
    }
  },

  /**
   * Generate recommended learning courses matching candidate skill gaps.
   * @param {string} [gaps='editing apps'] Candidate target skill gap
   * @param {number} [limit=6] Number of courses
   * @returns {Promise<Object>} Recommended courses array
   */
  getRecommendedCourses: async (gaps = 'editing apps', limit = 6) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;
      const prompt = `You are HireMind's AI course recommendation system. Generate ${limit} highly specific course recommendations tailored to the candidate's focus/skill gap: "${gaps}".
Return ONLY a valid JSON array of course objects with this exact structure:
[
  { "id": 1, "title": "Detailed Course Title Specifically for ${gaps}", "provider": "Udemy", "level": "Intermediate", "rating": 4.8, "duration": "14 Hours", "link": "#" }
]`;
      const body = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, responseMimeType: 'application/json' }
      };
      const resp = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const json = await resp.json();
      if (resp.ok && json.candidates?.[0]?.content?.parts?.[0]?.text) {
        const courses = JSON.parse(json.candidates[0].content.parts[0].text);
        return { success: true, data: { courses } };
      }
    } catch (e) {
      console.warn('Gemini AI course generation notice:', e.message);
    }
    return {
      success: true,
      data: {
        courses: [
          { id: 1, title: `Complete ${gaps} Masterclass 2026`, provider: 'Udemy', level: 'Intermediate', rating: 4.8, duration: '12 Hours', link: '#' },
          { id: 2, title: `Advanced ${gaps} Architecture & Production`, provider: 'Coursera', level: 'Advanced', rating: 4.9, duration: '18 Hours', link: '#' },
          { id: 3, title: `Professional ${gaps} Engineering Bootcamp`, provider: 'Frontend Masters', level: 'Intermediate', rating: 4.9, duration: '14 Hours', link: '#' }
        ]
      }
    };
  },

  generateRoadmap: async ({ targetRole }) => careerGuidanceService.getLearningRoadmap({ targetRole }),
  generateCourse: async ({ topic }) => careerGuidanceService.getRecommendedCourses(topic, 3),
};
