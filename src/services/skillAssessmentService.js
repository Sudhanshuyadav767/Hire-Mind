import { apiClient } from './apiClient';

/**
 * Live Google Gemini 3.5 Flash Lite MCQ Questions Generator
 * Generates dynamic, topic-specific multiple choice questions for candidate skill evaluation.
 *
 * @param {string} skill - Target technical skill (e.g. JavaScript, Python, React, UI/UX)
 * @param {string} category - Skill domain category
 * @param {string} experienceLevel - 'Beginner' | 'Intermediate' | 'Advanced'
 * @param {number} [count=10] - Number of questions to generate
 * @returns {Promise<Array<Object>>} Array of MCQ question objects with options & explanations
 */
const generateGeminiMCQQuestions = async (skill, category, experienceLevel, count = 10) => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AQ.Ab8RN6IcNHjqmAV9SvrEhOOgywq-V2g5Bt6Gy4PXPtbqoobT0A';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;

  const prompt = `You are HireMind's elite AI Skill Assessment Engine. Generate exactly ${count} realistic, practical multiple-choice questions to evaluate a candidate's real-world proficiency in "${skill}" (${category || 'General'}) at the "${experienceLevel || 'Intermediate'}" experience level.

STRICT JSON FORMAT:
Return ONLY a valid JSON array of question objects matching this exact structure:
[
  {
    "id": "q-1",
    "question": "Clear technical problem statement or code scenario about ${skill}?",
    "options": {
      "A": "Option A choice text",
      "B": "Option B choice text",
      "C": "Option C choice text",
      "D": "Option D choice text"
    },
    "correct": "B",
    "category": "${skill} Core Concepts",
    "explanation": "Detailed explanation of why Option B is correct and others are incorrect."
  }
]`;

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
  const qList = Array.isArray(parsed) ? parsed : (parsed.questions || []);

  // Ensure each question has standard keys & option formatting
  return qList.map((q, idx) => ({
    id: q.id || `q-${idx + 1}`,
    questionNumber: idx + 1,
    question: q.question,
    options: q.options || { A: "Option A", B: "Option B", C: "Option C", D: "Option D" },
    correct: (q.correct || "A").toUpperCase(),
    category: q.category || skill,
    explanation: q.explanation || `Option ${q.correct || 'A'} is the correct answer.`
  }));
};

/**
 * Generate AI Evaluation Report when test answers are submitted.
 *
 * @param {string} skill - Evaluated skill
 * @param {string} experienceLevel - Experience level
 * @param {Array<Object>} questionsList - Test question items
 * @param {Array<Object>} answersPayload - Candidate selected answers
 * @returns {Promise<Object>} Evaluation breakdown (score, strengths, improvements, review)
 */
const generateGeminiResultReport = async (skill, experienceLevel, questionsList = [], answersPayload = []) => {
  const userAnswersMap = {};
  answersPayload.forEach((ans) => {
    userAnswersMap[ans.questionId] = ans.selectedOption;
  });

  let correctCount = 0;
  const questionReview = questionsList.map((q, idx) => {
    const selectedOption = userAnswersMap[q.id] || "Not Answered";
    const isCorrect = selectedOption === q.correct;
    if (isCorrect) correctCount++;
    return {
      questionNumber: idx + 1,
      question: q.question,
      selectedOption,
      correctOption: q.correct,
      isCorrect,
      explanation: q.explanation || `Option ${q.correct} is correct for this topic.`,
      category: q.category || skill
    };
  });

  const totalQuestions = questionsList.length || 10;
  const score = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = score >= 60;

  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AQ.Ab8RN6IcNHjqmAV9SvrEhOOgywq-V2g5Bt6Gy4PXPtbqoobT0A';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;

    const prompt = `You are HireMind's AI Skill Evaluator. The candidate completed a ${skill} (${experienceLevel}) Skill Assessment scoring ${score}% (${correctCount}/${totalQuestions} correct).

Return ONLY a valid JSON object matching this schema:
{
  "strengths": [
    "Specific strength point 1 based on ${skill}",
    "Specific strength point 2"
  ],
  "improvements": [
    "Specific improvement area 1",
    "Specific improvement area 2"
  ],
  "recommendation": "Personalized AI career advice for candidate based on their ${score}% score."
}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, responseMimeType: 'application/json' }
      })
    });

    const json = await res.json();
    const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const aiData = JSON.parse(rawText);

    return {
      assessmentId: `eval_${Date.now()}`,
      skill,
      experienceLevel,
      percentage: score,
      status: isPassed ? 'passed' : 'failed',
      totalQuestions,
      correctAnswers: correctCount,
      incorrectAnswers: totalQuestions - correctCount,
      strengths: aiData.strengths || [
        `Solid comprehension of fundamental ${skill} syntax and concepts.`,
        `Demonstrated good problem solving in ${experienceLevel} level topics.`
      ],
      improvements: aiData.improvements || [
        `Focus on advanced ${skill} optimization and edge cases.`,
        `Practice scenario-based problem solving under timed conditions.`
      ],
      recommendation: aiData.recommendation || (isPassed
        ? `Great job! You passed the ${skill} (${experienceLevel}) assessment. Your profile ranking has been upgraded.`
        : `Keep practicing! Review fundamental ${skill} concepts and retake the assessment in a few days.`),
      questionReview
    };
  } catch (err) {
    return {
      assessmentId: `eval_${Date.now()}`,
      skill,
      experienceLevel,
      percentage: score,
      status: isPassed ? 'passed' : 'failed',
      totalQuestions,
      correctAnswers: correctCount,
      incorrectAnswers: totalQuestions - correctCount,
      strengths: [
        `Solid comprehension of fundamental ${skill} syntax and concepts.`,
        `Demonstrated good problem solving in ${experienceLevel} level topics.`
      ],
      improvements: [
        `Focus on advanced ${skill} optimization and edge cases.`
      ],
      recommendation: isPassed
        ? `Great job! You passed the ${skill} assessment. Your profile badge is active.`
        : `Keep practicing! Review key ${skill} topics and retake the assessment.`,
      questionReview
    };
  }
};

/**
 * Skill Assessment Service Endpoint Bridge
 */
export const skillAssessmentService = {
  /**
   * Start a new Skill Assessment session.
   * Calls backend API or fallbacks to live Gemini MCQ Generator.
   */
  startAssessment: async ({ skill, category, experienceLevel = 'Intermediate', numQuestions = 10 }) => {
    try {
      const response = await apiClient('/assessments/start', {
        method: 'POST',
        body: JSON.stringify({ skill, category, experienceLevel, numQuestions })
      });

      if (response?.success && response?.data) return response;
      throw new Error(response?.message || 'API returned empty data');
    } catch (e) {
      console.warn('Backend startAssessment notice, generating Gemini 3.5 Flash Lite questions:', e.message);
      const generatedQuestions = await generateGeminiMCQQuestions(skill, category, experienceLevel, numQuestions);

      return {
        success: true,
        data: {
          assessmentId: `asm_${Date.now()}`,
          skill,
          experienceLevel,
          durationMinutes: 30,
          totalQuestions: generatedQuestions.length,
          questions: generatedQuestions
        }
      };
    }
  },

  /**
   * Submit completed assessment answers.
   * Calls backend API or fallbacks to live Gemini AI performance evaluation.
   */
  submitAnswers: async ({ assessmentId, answers, questions = [], skill = 'Skill', experienceLevel = 'Intermediate' }) => {
    try {
      const payloadAnswers = Object.entries(answers).map(([qId, option]) => ({
        questionId: qId,
        selectedOption: option
      }));

      const response = await apiClient(`/assessments/${assessmentId}/submit`, {
        method: 'POST',
        body: JSON.stringify({ answers: payloadAnswers })
      });

      if (response?.success && response?.data) return response;
      throw new Error(response?.message || 'API returned empty submission result');
    } catch (e) {
      console.warn('Backend submitAnswers notice, generating Gemini evaluation report:', e.message);

      const payloadAnswers = Object.entries(answers).map(([qId, option]) => ({
        questionId: qId,
        selectedOption: option
      }));

      const evalReport = await generateGeminiResultReport(skill, experienceLevel, questions, payloadAnswers);

      return {
        success: true,
        data: evalReport
      };
    }
  },

  /**
   * Fetch candidate assessment history list.
   */
  getMyAssessments: async () => {
    try {
      const response = await apiClient('/assessments/my-assessments', { method: 'GET' });
      if (response?.success && response?.data) return response;
      throw new Error('No history');
    } catch (e) {
      return {
        success: true,
        data: []
      };
    }
  }
};
