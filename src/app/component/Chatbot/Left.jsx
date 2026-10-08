"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Bot, Send, Monitor, Sparkles, Plus, History, Copy, Check, Loader2, ArrowRight, Trash2, RefreshCw
} from "lucide-react";
import { careerPaths } from "@/Data/data1";
import { careerChatbotService } from "@/services/careerChatbotService";
import { useAuth } from "@/context/AuthContext";

export default function CareerChat({ externalPrompt, onClearExternalPrompt }) {
  const { user, isAuthenticated } = useAuth();
  
  // Chat session state
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: "welcome-1",
      role: "assistant",
      message: "Hi there! 👋 I'm your AI Career Assistant. How can I help you accelerate your career today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        "How do I optimize my resume for ATS?",
        "What are top skills for Full Stack Developers in 2026?",
        "How to prepare for technical interviews?"
      ]
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showSessionsDropdown, setShowSessionsDropdown] = useState(false);
  const [isDeletingSession, setIsDeletingSession] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle external prompt passed from Right.jsx (Popular Questions click)
  useEffect(() => {
    if (externalPrompt) {
      handleSendMessage(externalPrompt);
      if (onClearExternalPrompt) onClearExternalPrompt();
    }
  }, [externalPrompt]);

  // Load user's past chat sessions from Backend API
  const fetchUserSessions = async () => {
    if (isAuthenticated || user) {
      try {
        const res = await careerChatbotService.getSessions();
        if (res?.success && res?.data?.sessions) {
          setSessions(res.data.sessions);
        }
      } catch (err) {
        console.warn("Could not load chat sessions:", err);
      }
    }
  };

  useEffect(() => {
    fetchUserSessions();
  }, [isAuthenticated, user]);

  // Send message to AI Chatbot
  const handleSendMessage = async (textToSend) => {
    const queryText = (textToSend || inputValue).trim();
    if (!queryText || isLoading) return;

    // Add user message to UI immediately
    const userMsgObj = {
      id: `usr-${Date.now()}`,
      role: "user",
      message: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsgObj]);
    if (!textToSend) setInputValue("");
    setIsLoading(true);

    try {
      const response = await careerChatbotService.sendMessage(queryText, sessionId);
      
      if (response?.success && response?.data) {
        const { sessionId: newSessionId, message: aiMessageData, suggestions } = response.data;
        
        if (newSessionId && !sessionId) {
          setSessionId(newSessionId);
        }

        const aiMsgObj = {
          id: aiMessageData?.id || `ai-${Date.now()}`,
          role: "assistant",
          message: aiMessageData?.message || "I apologize, I couldn't process your question at the moment. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: suggestions || []
        };

        setMessages((prev) => [...prev, aiMsgObj]);
        fetchUserSessions(); // Refresh sessions list
      } else {
        // Handle error message
        const errMsg = response?.message || "Please ask a career-related question.";
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: "assistant",
            message: `⚠️ ${errMsg}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestions: [
              "What skills are needed for Full Stack Developers?",
              "How to improve my resume?",
              "How to prepare for system design?"
            ]
          }
        ]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          message: "⚠️ Connections issue. Please try asking again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Start new conversation session
  const handleStartNewChat = () => {
    setSessionId(null);
    setMessages([
      {
        id: "welcome-1",
        role: "assistant",
        message: "Started a new conversation session! How can I assist you with your career goals today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          "How do I transition to Senior Developer?",
          "Review my career path",
          "Top interview preparation tips"
        ]
      }
    ]);
  };

  // Load selected session history from Backend (GET /chat/sessions/:sessionId/history)
  const handleSelectSession = async (sId) => {
    setShowSessionsDropdown(false);
    setIsLoading(true);
    try {
      const res = await careerChatbotService.getHistory(sId);
      if (res?.success && res?.data?.messages) {
        setSessionId(sId);
        const formatted = res.data.messages.map((m) => ({
          id: m.id,
          role: m.role,
          message: m.message,
          timestamp: m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""
        }));
        setMessages(formatted);
      }
    } catch (err) {
      console.error("Error loading session history:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete chat session (DELETE /chat/sessions/:sessionId)
  const handleDeleteSession = async (targetSessionId, e) => {
    if (e) e.stopPropagation();
    setIsDeletingSession(true);
    try {
      await careerChatbotService.deleteSession(targetSessionId);
      setSessions((prev) => prev.filter((s) => s.id !== targetSessionId));
      if (targetSessionId === sessionId) {
        handleStartNewChat();
      }
    } catch (err) {
      console.error("Error deleting session:", err);
    } finally {
      setIsDeletingSession(false);
    }
  };

  // Copy assistant response text
  const handleCopyText = (text, msgId) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-5 shadow-xs flex flex-col min-h-[720px] justify-between overflow-hidden">
      
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-semibold shrink-0 shadow-2xs">
            <Bot className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                AI Career Assistant
              </h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Active AI
              </span>
            </div>
            <p className="text-[11px] text-gray-500 truncate">Instant career insights, resume advice & job prep</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* History Dropdown (GET /chat/sessions & GET /chat/sessions/:sessionId/history) */}
          <div className="relative">
            <button
              onClick={() => {
                fetchUserSessions();
                setShowSessionsDropdown(!showSessionsDropdown);
              }}
              className="flex items-center gap-1 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-all"
            >
              <History className="w-3 h-3" />
              History {sessions.length > 0 ? `(${sessions.length})` : ""}
            </button>

            {showSessionsDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-72 overflow-y-auto p-1.5">
                <div className="flex items-center justify-between px-2 py-1 border-b border-slate-100 mb-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    User Chat Sessions
                  </span>
                  <button 
                    onClick={fetchUserSessions}
                    className="text-slate-400 hover:text-indigo-600 p-0.5 rounded"
                    title="Refresh Sessions"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>

                {sessions.length === 0 ? (
                  <div className="text-xs text-slate-400 p-3 text-center">
                    No past sessions found. Start chatting to save history!
                  </div>
                ) : (
                  sessions.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => handleSelectSession(s.id)}
                      className={`w-full text-left px-2.5 py-2 text-xs rounded-lg transition-all flex items-center justify-between group cursor-pointer ${
                        s.id === sessionId ? "bg-indigo-50 text-indigo-700 font-medium" : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <p className="truncate font-medium text-xs text-slate-800 group-hover:text-indigo-600">
                          {s.title || "Career Chat Session"}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {s.messageCount || 1} messages • {s.updatedAt ? new Date(s.updatedAt).toLocaleDateString() : "Recent"}
                        </p>
                      </div>
                      
                      {/* Delete Session Button (DELETE /chat/sessions/:sessionId) */}
                      <button
                        onClick={(e) => handleDeleteSession(s.id, e)}
                        disabled={isDeletingSession}
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-600 p-1 rounded-md transition-all shrink-0 hover:bg-red-50"
                        title="Delete Session"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Delete Active Session Button */}
          {sessionId && (
            <button
              onClick={() => handleDeleteSession(sessionId)}
              disabled={isDeletingSession}
              className="flex items-center gap-1 text-[11px] font-medium text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg transition-all border border-red-200/60"
              title="Delete Active Session"
            >
              <Trash2 className="w-3 h-3" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          )}

          <button
            onClick={handleStartNewChat}
            className="flex items-center gap-1 text-[11px] font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1.5 rounded-lg transition-all shadow-2xs"
          >
            <Plus className="w-3 h-3" />
            New Chat
          </button>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-3 pr-1 max-h-[520px] min-h-[400px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 min-w-0 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-1">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}

            <div className={`max-w-[88%] sm:max-w-[82%] min-w-0 group ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`p-3 sm:p-4 rounded-2xl text-xs sm:text-[13px] leading-relaxed break-words [overflow-wrap:anywhere] min-w-0 ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-tr-none shadow-2xs"
                    : "bg-white border border-slate-200/90 shadow-2xs text-slate-800 rounded-tl-none"
                }`}
              >
                {msg.role === "user" ? (
                  <div className="whitespace-pre-wrap break-words">{msg.message}</div>
                ) : (
                  <FormattedAIMessage text={msg.message} />
                )}
              </div>

              {/* Timestamp & Actions */}
              <div className="flex items-center justify-between px-1 mt-1 text-[10px] text-slate-400">
                <span>{msg.timestamp}</span>
                {msg.role === "assistant" && (
                  <button
                    onClick={() => handleCopyText(msg.message, msg.id)}
                    className="opacity-0 group-hover:opacity-100 hover:text-indigo-600 transition-opacity flex items-center gap-1"
                  >
                    {copiedId === msg.id ? (
                      <span className="text-emerald-600 flex items-center gap-0.5 font-medium"><Check className="w-3 h-3" /> Copied</span>
                    ) : (
                      <span className="flex items-center gap-0.5"><Copy className="w-3 h-3" /> Copy</span>
                    )}
                  </button>
                )}
              </div>

              {/* Quick Reply Suggestions */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {msg.suggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(sug)}
                      disabled={isLoading}
                      className="text-[11px] bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 font-medium px-2.5 py-1 rounded-full border border-indigo-200/60 transition-all text-left flex items-center gap-1 hover:shadow-2xs leading-tight break-words max-w-full"
                    >
                      <Sparkles className="w-3 h-3 text-indigo-500 shrink-0" />
                      <span className="truncate">{sug}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-white shrink-0 mt-1 text-[11px] font-semibold">
                You
              </div>
            )}
          </div>
        ))}

        {/* Loading / AI Thinking Indicator */}
        {isLoading && (
          <div className="flex gap-2.5 items-start">
            <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <Bot className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="bg-white border border-slate-200/90 p-3 rounded-2xl rounded-tl-none text-slate-500 text-xs flex items-center gap-2 shadow-2xs">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
              <span>AI Assistant is generating response...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="mt-3 pt-2.5 border-t border-slate-100">
        
        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          <button
            onClick={() => handleSendMessage("What are the top skills for a Full Stack Developer?")}
            className="text-[10px] sm:text-[11px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 px-2 py-0.5 rounded-md transition-all border border-slate-200 font-medium"
          >
            💡 Full Stack Skills
          </button>
          <button
            onClick={() => handleSendMessage("How do I make my resume ATS compliant?")}
            className="text-[10px] sm:text-[11px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 px-2 py-0.5 rounded-md transition-all border border-slate-200 font-medium"
          >
            📄 ATS Resume Tips
          </button>
          <button
            onClick={() => handleSendMessage("How should I prepare for technical coding interviews?")}
            className="text-[10px] sm:text-[11px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 px-2 py-0.5 rounded-md transition-all border border-slate-200 font-medium"
          >
            🎤 Mock Interview Tips
          </button>
        </div>

        {/* Input box */}
        <div className="flex items-center gap-1.5 border border-slate-300 rounded-xl p-1 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all bg-white shadow-2xs">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask anything about your career, interviews, or skills..."
            className="flex-1 outline-none px-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent"
            disabled={isLoading}
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className="w-9 h-9 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white flex items-center justify-center transition-all shrink-0 shadow-2xs"
          >
            {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          </button>
        </div>

        <p className="text-center text-[10px] text-gray-400 mt-1.5">
          AI responses are powered by HireMind Career Intelligence.
        </p>
      </div>

      {/* Explore Career Paths Cards */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl mt-4 p-3">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Explore Career Paths
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {careerPaths.map((career, index) => (
            <CareerCard key={index} career={career} onAskAI={() => handleSendMessage(`Tell me about career growth and skills required for a ${career.title} role.`)} />
          ))}
        </div>
      </div>

    </div>
  );
}

function CareerCard({ career, onAskAI }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div className="flex gap-2.5 items-start min-w-0">
        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 shrink-0">
          <Monitor className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-slate-900 text-xs truncate">
            {career.title}
          </h4>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5 truncate">
            {career.growth}
          </p>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-[9px] text-slate-400 uppercase tracking-wider">Avg. Salary</p>
          <p className="font-bold text-[11px] text-slate-800">{career.salary}</p>
        </div>
        
        <button
          onClick={onAskAI}
          className="text-[11px] text-indigo-600 font-medium group-hover:text-indigo-700 flex items-center gap-0.5 hover:underline"
        >
          Ask AI <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

/**
 * Ultra-Responsive Formatted AI Response Component
 * Parses raw Markdown (headings, bold text, bullet points, numbers, LaTeX arrows, code snippets)
 * with responsive font sizes, auto word-breaking, and overflow prevention.
 */
function FormattedAIMessage({ text }) {
  if (!text) return null;

  // Clean raw LaTeX arrows & symbols for crisp presentation
  const cleanedText = text
    .replace(/\\\$/g, '$')
    .replace(/\$\\rightarrow\$/g, ' → ')
    .replace(/\\rightarrow/g, ' → ')
    .replace(/->/g, ' → ');

  // Split into structural blocks
  const blocks = cleanedText.split(/\n\n+/);

  return (
    <div className="space-y-2.5 text-slate-800 text-xs sm:text-[13px] leading-relaxed break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
      {blocks.map((block, bIdx) => {
        const trimmed = block.trim();

        // 1. Horizontal dividers (--- or ***)
        if (trimmed === "---" || trimmed === "***") {
          return <hr key={bIdx} className="my-3 border-t border-slate-200/80" />;
        }

        // 2. Headings (### or #### or ##)
        if (trimmed.startsWith("### ")) {
          const title = trimmed.replace(/^###\s+/, "");
          return (
            <div key={bIdx} className="mt-3 mb-1 min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b border-indigo-100 pb-1 break-words">
                <span className="w-1.5 h-3.5 bg-indigo-600 rounded-full inline-block shrink-0"></span>
                <span className="min-w-0 flex-1">{renderInlineStyles(title)}</span>
              </h3>
            </div>
          );
        }

        if (trimmed.startsWith("#### ")) {
          const title = trimmed.replace(/^####\s+/, "");
          return (
            <h4 key={bIdx} className="text-xs sm:text-[13px] font-bold text-indigo-950 mt-2 mb-1 flex items-center gap-1.5 break-words min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
              <span className="min-w-0 flex-1">{renderInlineStyles(title)}</span>
            </h4>
          );
        }

        if (trimmed.startsWith("## ")) {
          const title = trimmed.replace(/^##\s+/, "");
          return (
            <h2 key={bIdx} className="text-sm sm:text-base font-extrabold text-indigo-900 mt-4 mb-1.5 border-b pb-1 border-indigo-100 break-words min-w-0">
              {renderInlineStyles(title)}
            </h2>
          );
        }

        // 3. Structural lines within block
        const lines = trimmed.split("\n");

        return (
          <div key={bIdx} className="space-y-1.5 min-w-0">
            {lines.map((line, lIdx) => {
              const lineTrimmed = line.trim();

              // Bullet item (* or -)
              if (lineTrimmed.startsWith("* ") || lineTrimmed.startsWith("- ")) {
                const itemText = lineTrimmed.replace(/^[\*\-]\s+/, "");
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-0.5 my-1 text-slate-700 min-w-0 break-words">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5"></span>
                    <span className="flex-1 min-w-0 break-words leading-normal">{renderInlineStyles(itemText)}</span>
                  </div>
                );
              }

              // Numbered list item (e.g. 1. or 2.)
              const numMatch = lineTrimmed.match(/^(\d+)\.\s+(.*)/);
              if (numMatch) {
                const num = numMatch[1];
                const itemText = numMatch[2];
                return (
                  <div key={lIdx} className="flex items-start gap-2 pl-0.5 my-1.5 text-slate-800 min-w-0 break-words">
                    <span className="w-4 h-4 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {num}
                    </span>
                    <span className="flex-1 min-w-0 break-words leading-normal">{renderInlineStyles(itemText)}</span>
                  </div>
                );
              }

              if (!lineTrimmed) return null;
              return <p key={lIdx} className="leading-relaxed break-words min-w-0">{renderInlineStyles(lineTrimmed)}</p>;
            })}
          </div>
        );
      })}
    </div>
  );
}

// Inline formatting helper for **bold**, `code`, and *italic*
function renderInlineStyles(text) {
  if (!text) return null;

  const parts = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match;
  let keyIdx = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(
        <strong key={keyIdx++} className="font-semibold text-slate-900 break-words">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(
        <code key={keyIdx++} className="bg-indigo-50 text-indigo-700 px-1 py-0.5 rounded text-[11px] font-mono border border-indigo-100/60 font-medium break-all inline-block">
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("*") && token.endsWith("*")) {
      parts.push(
        <em key={keyIdx++} className="italic text-slate-600 break-words">
          {token.slice(1, -1)}
        </em>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}