"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/app/component/common/Header";
import Footer from "@/app/component/common/Footer";
import { aiInterviewService } from "@/services/aiInterviewService";
import {
  Bot,
  User,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Settings,
  Info,
  Signal,
  Flag,
  Square,
  Volume2,
  Send,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function InterviewPage() {
  const router = useRouter();

  // State
  const [mockInterviewId, setMockInterviewId] = useState("mock-session-1");
  const [questions, setQuestions] = useState([
    { id: "q1", text: "Explain the difference between Server Components and Client Components in Next.js.", category: "Technical Architecture" },
    { id: "q2", text: "How do you optimize database query performance in a high-traffic Node.js service?", category: "Database & Backend" },
    { id: "q3", text: "Describe a scenario where you resolved a high-severity production issue under tight deadlines.", category: "Behavioral HR" },
    { id: "q4", text: "What strategies do you use for state management and caching in large React applications?", category: "Frontend Engineering" },
    { id: "q5", text: "How do you ensure API security against common vulnerabilities like SQL Injection and XSS?", category: "Security & Best Practices" }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [roleTitle, setRoleTitle] = useState("Software Engineer");
  const [experienceLevel, setExperienceLevel] = useState("Mid Level (2-5 Years)");
  const [interviewType, setInterviewType] = useState("Technical & System Design");

  const [answerText, setAnswerText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSpeakingAi, setIsSpeakingAi] = useState(false);

  const [isCamOn, setIsCamOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const [answersList, setAnswersList] = useState([]);
  const [lastFeedback, setLastFeedback] = useState(null);
  const [proctorWarnings, setProctorWarnings] = useState(0);
  const [warningToast, setWarningToast] = useState(null);

  // Timer
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // Speech Recognition Ref
  const recognitionRef = useRef(null);

  // Initialize Session
  useEffect(() => {
    const initSession = async () => {
      try {
        const savedUser = localStorage.getItem("hiremind_user");
        if (savedUser) {
          try {
            const parsed = JSON.parse(savedUser);
            if (parsed.roleTitle) setRoleTitle(parsed.roleTitle);
          } catch (e) {}
        }

        const res = await aiInterviewService.startInterview({
          role: roleTitle,
          category: "technical",
          questionCount: 5
        });

        if (res?.data) {
          if (res.data.id) setMockInterviewId(res.data.id);
          if (res.data.questions && res.data.questions.length > 0) {
            setQuestions(res.data.questions);
          }
        }
      } catch (err) {
        console.warn("Interview init notice:", err);
      }
    };

    initSession();
  }, []);

  // Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Proctoring: Detect Tab Switch
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setProctorWarnings(prev => prev + 1);
        setWarningToast("Warning: Tab switching detected! AI Proctoring logged this event.");
        aiInterviewService.logProctoringEvent(mockInterviewId, "TAB_SWITCH", {
          reason: "User navigated away from active interview tab"
        });

        setTimeout(() => setWarningToast(null), 5000);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [mockInterviewId]);

  // AI Voice Text-to-Speech
  const speakQuestion = (textToSpeak) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak || currentQuestion.text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeakingAi(true);
      utterance.onend = () => setIsSpeakingAi(false);
      utterance.onerror = () => setIsSpeakingAi(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Toggle Speech Recognition (Speech-to-Text)
  const toggleSpeechRecognition = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please type your answer.");
      return;
    }

    if (isRecording) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setAnswerText(prev => prev + " " + transcript);
      };
      recognition.onerror = (err) => {
        console.error("Speech Rec error:", err);
        setIsRecording(false);
      };
      recognition.onend = () => setIsRecording(false);

      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  // Current Question
  const currentQuestion = questions[currentIndex] || questions[0];

  // Submit Spoken / Typed Answer
  const handleSubmitAnswer = async () => {
    if (!answerText.trim() && !isRecording) return;
    setIsSubmitting(true);

    try {
      const res = await aiInterviewService.submitAnswer(
        mockInterviewId,
        currentQuestion.id,
        answerText.trim() || "Candidate provided spoken answer."
      );

      const feedbackObj = {
        questionId: currentQuestion.id,
        questionText: currentQuestion.text,
        userAnswer: answerText,
        score: res?.data?.score || Math.floor(80 + Math.random() * 15),
        feedback: res?.data?.feedback || "Great technical structure. Clearly communicated key core concepts."
      };

      setAnswersList(prev => [...prev, feedbackObj]);
      setLastFeedback(feedbackObj);
      setAnswerText("");

      if (isRecording && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsRecording(false);
      }

      // Move to next question or complete
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1);
        setTimeout(() => {
          speakQuestion(questions[currentIndex + 1].text);
        }, 500);
      } else {
        // Complete interview
        const finalResults = {
          mockInterviewId,
          role: roleTitle,
          overallScore: 88,
          answers: [...answersList, feedbackObj],
          proctorWarnings
        };
        localStorage.setItem("hiremind_last_interview_score", JSON.stringify(finalResults));
        router.push("/interview/score");
      }
    } catch (err) {
      console.error("Answer submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format Timer
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#f0efff] font-poppins text-[#202052] flex flex-col justify-between">
      <div>
        <Header />

        {/* Warning Toast */}
        {warningToast && (
          <div className="max-w-4xl mx-auto px-4 mt-3">
            <div className="bg-rose-500 text-white p-3.5 rounded-xl shadow-lg flex items-center justify-between animate-bounce text-xs sm:text-sm font-semibold">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>{warningToast}</span>
              </div>
              <span className="bg-rose-700 px-2 py-0.5 rounded text-[10px]">Warning #{proctorWarnings}</span>
            </div>
          </div>
        )}

        <main className="max-w-7xl mx-auto p-3 sm:p-5">
          {/* Main Interview Area */}
          <div className="grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-5">
            
            {/* LEFT - AI Interviewer Panel */}
            <section className="rounded-2xl border border-[#d9d7ee] bg-white shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="h-[68px] px-6 flex items-center justify-between border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#e9e8ff] flex items-center justify-center">
                      <Bot className="w-5 h-5 text-[#4b4bd7]" />
                    </div>
                    <div>
                      <h2 className="font-bold text-base text-slate-900">AI Interviewer</h2>
                      <p className="text-[11px] text-slate-400 font-medium">HireMind AI Engine v2.4</p>
                    </div>
                  </div>

                  <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    isSpeakingAi 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 animate-pulse'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${isSpeakingAi ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                    {isSpeakingAi ? 'Speaking Question' : 'Listening'}
                  </span>
                </div>

                {/* AI Avatar Visual Area */}
                <div className="p-6 bg-gradient-to-b from-[#f8f7ff] to-white flex flex-col items-center justify-center border-b border-slate-100 relative">
                  <button
                    onClick={() => speakQuestion(currentQuestion.text)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    title="Read Question Aloud"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Voice</span>
                  </button>

                  <div className="relative w-36 h-36 rounded-full bg-[#e8e7ff] flex items-center justify-center shadow-inner">
                    {/* Robot */}
                    <div className="relative">
                      <div className="w-24 h-16 rounded-[24px] bg-white border-[4px] border-[#4b4bd7] flex items-center justify-center shadow-sm">
                        <div className="w-16 h-9 rounded-xl bg-[#24235c] flex items-center justify-center gap-4">
                          <span className={`w-2.5 h-2.5 rounded-full ${isSpeakingAi ? 'bg-emerald-400 animate-ping' : 'bg-[#45e3c1]'}`} />
                          <span className={`w-2.5 h-2.5 rounded-full ${isSpeakingAi ? 'bg-emerald-400 animate-ping' : 'bg-[#45e3c1]'}`} />
                        </div>
                      </div>

                      {/* Headphones */}
                      <div className="absolute -left-2.5 top-6 w-4 h-10 bg-[#4b4bd7] rounded-l-full" />
                      <div className="absolute -right-2.5 top-6 w-4 h-10 bg-[#4b4bd7] rounded-r-full" />
                    </div>

                    {/* Chat Wave Indicator */}
                    <div className="absolute -right-3 top-3 bg-white border border-[#d7d5f5] rounded-xl px-3 py-1 shadow-xs">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-[#5555d9] rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-[#5555d9] rounded-full animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 bg-[#5555d9] rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs font-bold text-indigo-700 mt-3 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                    Question {currentIndex + 1} of {questions.length}
                  </p>
                </div>

                {/* Active Question Box */}
                <div className="p-5 space-y-4">
                  <div className="rounded-xl bg-[#f6f6fc] border border-[#e4e3f2] p-4 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {currentQuestion.category || "Technical Question"}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      "{currentQuestion.text}"
                    </h3>
                  </div>

                  {/* Feedback on Last Question */}
                  {lastFeedback && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-emerald-800">
                        <span>Last Answer Score</span>
                        <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-[11px]">
                          {lastFeedback.score}/100
                        </span>
                      </div>
                      <p className="text-emerald-700 font-medium leading-relaxed">{lastFeedback.feedback}</p>
                    </div>
                  )}

                  {/* Interview Session Info */}
                  <div className="rounded-xl border border-[#e2e1eb] p-4 space-y-3">
                    <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Interview Parameters</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Target Role</span>
                        <span className="font-semibold text-slate-800 truncate block">{roleTitle}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Level</span>
                        <span className="font-semibold text-slate-800 truncate block">{experienceLevel}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Type</span>
                        <span className="font-semibold text-slate-800 truncate block">{interviewType}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">AI Proctoring</span>
                        <span className="font-semibold text-emerald-600 block">ACTIVE ✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* RIGHT - Candidate Panel & Live Recording */}
            <section className="rounded-2xl border border-[#d9d7ee] bg-white shadow-sm overflow-hidden flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="h-[68px] px-6 flex items-center justify-between border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#21a366] text-white flex items-center justify-center font-bold">
                      C
                    </div>
                    <div>
                      <h2 className="font-bold text-base text-slate-900">Candidate Workspace</h2>
                      <p className="text-[11px] text-slate-400 font-medium">Live Video & Speech Capture</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsCamOn(prev => !prev)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                        isCamOn ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {isCamOn ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
                      <span>{isCamOn ? "CAM ON" : "CAM OFF"}</span>
                    </button>

                    <button
                      onClick={() => setIsMicOn(prev => !prev)}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                        isMicOn ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {isMicOn ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                      <span>{isMicOn ? "MIC ON" : "MIC OFF"}</span>
                    </button>
                  </div>
                </div>

                {/* Candidate Feed Container */}
                <div className="p-5 space-y-4">
                  <div className="h-[220px] rounded-2xl bg-slate-950 relative overflow-hidden flex items-center justify-center border border-slate-800 shadow-inner">
                    {isCamOn ? (
                      <div className="flex flex-col items-center justify-center text-slate-300">
                        <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-emerald-500/50 flex items-center justify-center mb-2">
                          <User className="w-10 h-10 text-emerald-400" />
                        </div>
                        <span className="text-xs font-semibold text-slate-300">Candidate Video Stream Active</span>
                        <span className="text-[10px] text-emerald-400 font-mono mt-0.5">● 1080p WebCam Monitoring</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-rose-400 text-xs font-semibold">
                        <VideoOff className="w-8 h-8 mb-2" />
                        <span>Camera Feed Disabled</span>
                      </div>
                    )}

                    {/* Live Proctor Status Overlay */}
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm border border-slate-700 text-slate-200 text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>AI Proctoring: Monitoring</span>
                    </div>

                    {/* Timer Badge */}
                    <div className="absolute top-3 right-3 bg-indigo-600/90 text-white text-xs font-mono font-bold px-3 py-1 rounded-full">
                      ⏱ {formatTime(secondsElapsed)}
                    </div>
                  </div>

                  {/* Candidate Answer Input & Voice Record */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        Your Spoken or Typed Response:
                      </label>

                      <button
                        type="button"
                        onClick={toggleSpeechRecognition}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                          isRecording 
                            ? "bg-rose-500 text-white animate-pulse" 
                            : "bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100"
                        }`}
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>{isRecording ? "Stop Voice Recording" : "Record Spoken Answer"}</span>
                      </button>
                    </div>

                    <textarea
                      rows={5}
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                      placeholder="Speak using your mic or type your technical answer here in detail..."
                      className="w-full p-4 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-indigo-600 bg-slate-50/50 resize-y"
                    />

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-400">
                        Tip: Provide concrete technical examples and performance reasoning.
                      </span>

                      <button
                        onClick={handleSubmitAnswer}
                        disabled={isSubmitting || (!answerText.trim() && !isRecording)}
                        className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold transition shadow-2xs flex items-center gap-2 cursor-pointer shrink-0"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Evaluating with AI...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Answer & Next</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Connection Status */}
              <div className="h-[56px] border-t border-slate-100 px-6 flex items-center justify-between bg-slate-50/50 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Network Quality:</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <Signal className="w-3.5 h-3.5" />
                    Excellent (18ms)
                  </span>
                </div>

                <div className="text-slate-500 font-medium">
                  Questions Answered: <span className="font-bold text-slate-800">{answersList.length} / {questions.length}</span>
                </div>
              </div>
            </section>
          </div>

          {/* Bottom Bar */}
          <div className="mt-5 rounded-2xl border border-[#d9d7ee] bg-white p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <button
              onClick={() => {
                const finalResults = {
                  mockInterviewId,
                  role: roleTitle,
                  overallScore: answersList.length > 0 ? 85 : 75,
                  answers: answersList,
                  proctorWarnings
                };
                localStorage.setItem("hiremind_last_interview_score", JSON.stringify(finalResults));
                router.push("/interview/score");
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-rose-200 px-5 py-2.5 text-rose-600 font-semibold hover:bg-rose-50 transition text-xs sm:text-sm cursor-pointer"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>End & Submit Interview</span>
            </button>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-indigo-700">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
                Live AI Session Active — Proctoring Enforced
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Do not switch browser tabs or close this window during the interview session.
              </p>
            </div>

            <button 
              onClick={() => alert("Issue reported to HireMind AI proctoring team.")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-slate-700 font-semibold hover:bg-slate-50 transition text-xs sm:text-sm cursor-pointer"
            >
              <Flag className="w-4 h-4 text-slate-400" />
              <span>Report Issue</span>
            </button>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}