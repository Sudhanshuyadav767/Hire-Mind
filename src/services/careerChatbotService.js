import { apiClient } from './apiClient';

// Live Google Gemini AI fallback generator using user's Gemini API Key
const callGeminiDirectAI = async (userMessage) => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
  
  const systemPrompt = `You are HireMind's elite AI Career Advisor. Provide clear, encouraging, structured professional advice for the user's query. Use formatting like bullet points, bold headers, and short actionable steps. At the end, suggest 3 short follow-up questions the user can ask next formatted as JSON at the very end like:
[[SUGGESTIONS: ["Question 1", "Question 2", "Question 3"]]]`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;
  
  const body = {
    system_instruction: {
      parts: [{ text: systemPrompt }]
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: userMessage }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1000
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const json = await response.json();
  if (!response.ok || json.error) {
    throw new Error(json.error?.message || `Gemini API error ${response.status}`);
  }

  const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
  let cleanText = rawText;
  let suggestions = [
    "What are top skills for Full Stack Developers?",
    "How to prepare for technical coding interviews?",
    "How to make my resume ATS compliant?"
  ];

  const match = rawText.match(/\[\[SUGGESTIONS:\s*(\[.*?\])\]\]/s);
  if (match) {
    cleanText = rawText.replace(match[0], '').trim();
    try {
      suggestions = JSON.parse(match[1]);
    } catch (e) {}
  }

  return {
    message: cleanText,
    suggestions
  };
};

export const careerChatbotService = {
  // Send message to AI Career Chatbot
  sendMessage: async (message, sessionId = null) => {
    try {
      const response = await apiClient('/chat/send', {
        method: 'POST',
        body: JSON.stringify({ message, sessionId }),
      });
      if (response?.success && response?.data?.message?.message) {
        return response;
      }
      throw new Error(response?.message || 'Backend API returned empty response');
    } catch (error) {
      console.warn('Backend API unauthenticated or errored, calling Google Gemini AI directly:', error.message);
      try {
        const geminiResult = await callGeminiDirectAI(message);
        const fallbackSessionId = sessionId || `session-gemini-${Date.now()}`;
        return {
          success: true,
          data: {
            sessionId: fallbackSessionId,
            message: {
              id: `msg-gemini-${Date.now()}`,
              sessionId: fallbackSessionId,
              role: 'assistant',
              message: geminiResult.message,
              timestamp: new Date().toISOString(),
            },
            suggestions: geminiResult.suggestions,
          },
        };
      } catch (geminiError) {
        console.error('Direct Gemini API call failed:', geminiError);
        return {
          success: false,
          message: 'Failed to connect to AI engine. Please check your API key or connection.'
        };
      }
    }
  },

  // Get chat history for session
  getHistory: async (sessionId) => {
    try {
      return await apiClient(`/chat/sessions/${sessionId}/history`, { method: 'GET' });
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to fetch history',
        data: { messages: [], total: 0 }
      };
    }
  },

  // Get list of chat sessions
  getSessions: async () => {
    try {
      return await apiClient('/chat/sessions', { method: 'GET' });
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to fetch sessions',
        data: { sessions: [], total: 0 }
      };
    }
  },

  // Delete chat session
  deleteSession: async (sessionId) => {
    try {
      return await apiClient(`/chat/sessions/${sessionId}`, { method: 'DELETE' });
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
};


