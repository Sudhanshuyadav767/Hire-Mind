"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "../../component/common/Header";
import Footer from "../../component/common/Footer";

// Sub-components
import SkillAssessmentDashboard from "../../component/ai_services/skill_assessment/SkillAssessmentDashboard";
import SkillAssessmentInstructions from "../../component/ai_services/skill_assessment/SkillAssessmentInstructions";
import SkillAssessmentTest from "../../component/ai_services/skill_assessment/SkillAssessmentTest";
import SkillAssessmentReview from "../../component/ai_services/skill_assessment/SkillAssessmentReview";
import SkillAssessmentResults from "../../component/ai_services/skill_assessment/SkillAssessmentResults";

// Configuration & Service
import { categories, skillsByCategory, popularSkills, fallbackMockQuestions } from "../../component/ai_services/skill_assessment/skillAssessmentConfig";
import { skillAssessmentService } from "@/services/skillAssessmentService";
import { useAuth } from "@/context/AuthContext";

/**
 * SkillAssessmentPage Component
 * Main container controlling candidate AI Skill Assessment stages:
 * - dashboard: Select skill, category & difficulty level
 * - instructions: Review test guidelines & duration
 * - test: Timed interactive MCQ question answering
 * - review: Final question status check before submission
 * - results: Comprehensive AI performance report & concept breakdown
 */
export default function SkillAssessmentPage() {
  const { user, isAuthenticated } = useAuth();
  
  // Navigation & selection state
  const [currentStep, setCurrentStep] = useState("dashboard");
  const [selectedCategory, setSelectedCategory] = useState("Programming & Development");
  const [selectedSkill, setSelectedSkill] = useState("JavaScript");
  const [selectedLevel, setSelectedLevel] = useState("Intermediate");

  // Assessment session state
  const [assessmentId, setAssessmentId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [assessmentResult, setAssessmentResult] = useState(null);
  const [userAssessmentsList, setUserAssessmentsList] = useState([]);

  // Test execution state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 min default timer
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [resultsScore, setResultsScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load user's previous assessment history on mount
  useEffect(() => {
    if (isAuthenticated) {
      skillAssessmentService.getMyAssessments()
        .then(res => res?.data && setUserAssessmentsList(res.data))
        .catch(() => {});
    }
  }, [isAuthenticated]);

  // Handle Assessment Start
  const handleStartAssessment = async () => {
    setCurrentStep("instructions");
    try {
      const res = await skillAssessmentService.startAssessment({
        skill: selectedSkill,
        category: selectedCategory,
        experienceLevel: selectedLevel,
        numQuestions: 10
      });

      if (res?.data) {
        setAssessmentId(res.data.assessmentId);
        if (res.data.questions && res.data.questions.length > 0) {
          setQuestions(res.data.questions);
        } else {
          setQuestions(fallbackMockQuestions);
        }
      } else {
        setQuestions(fallbackMockQuestions);
      }
    } catch (err) {
      console.warn("Notice: Using fallback questions:", err);
      setQuestions(fallbackMockQuestions);
    }
  };

  // Begin test timer
  const handleConfirmStartTest = () => {
    setCurrentStep("test");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setMarkedForReview({});
    setTimeLeft(1800);
    setIsTimerRunning(true);
  };

  // Submit test answers & calculate AI evaluation
  const handleSubmitAssessment = useCallback(async () => {
    setIsTimerRunning(false);
    setIsSubmitting(true);
    setCurrentStep("results");

    try {
      const activeQuestions = questions.length > 0 ? questions : fallbackMockQuestions;
      
      const res = await skillAssessmentService.submitAnswers({
        assessmentId: assessmentId || `asm_${Date.now()}`,
        answers,
        questions: activeQuestions,
        skill: selectedSkill,
        experienceLevel: selectedLevel
      });

      if (res?.data) {
        setAssessmentResult(res.data);
        setResultsScore(res.data.percentage ?? 0);
      } else {
        let correctCount = 0;
        activeQuestions.forEach(q => {
          if (answers[q.id] === q.correct) correctCount++;
        });
        const score = Math.round((correctCount / activeQuestions.length) * 100);
        setResultsScore(score);
      }
    } catch (err) {
      console.warn("Notice: Local result calculation:", err);
      const activeQuestions = questions.length > 0 ? questions : fallbackMockQuestions;
      let correctCount = 0;
      activeQuestions.forEach(q => {
        if (answers[q.id] === q.correct) correctCount++;
      });
      const score = Math.round((correctCount / activeQuestions.length) * 100);
      setResultsScore(score);
    } finally {
      setIsSubmitting(false);
    }
  }, [questions, answers, assessmentId, selectedSkill, selectedLevel]);

  // Timer Countdown Effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      handleSubmitAssessment();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, handleSubmitAssessment]);

  // Option selection
  const handleSelectOption = (questionId, optionKey) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  // Toggle mark for review
  const handleToggleMarkForReview = (questionId) => {
    setMarkedForReview(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const activeQuestionsList = questions.length > 0 ? questions : fallbackMockQuestions;

  return (
    <div className="bg-[#f8f9ff] text-[#1E2229] font-poppins min-h-screen flex flex-col justify-between select-none">
      <div>
        <Header />

        {/* Step 1: Dashboard */}
        {currentStep === "dashboard" && (
          <SkillAssessmentDashboard
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            skillsByCategory={skillsByCategory}
            selectedSkill={selectedSkill}
            setSelectedSkill={setSelectedSkill}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            popularSkills={popularSkills}
            onStartAssessment={handleStartAssessment}
            userAssessmentsList={userAssessmentsList}
          />
        )}

        {/* Step 2: Instructions */}
        {currentStep === "instructions" && (
          <SkillAssessmentInstructions
            selectedSkill={selectedSkill}
            selectedLevel={selectedLevel}
            selectedCategory={selectedCategory}
            onConfirmStart={handleConfirmStartTest}
            setCurrentStep={setCurrentStep}
          />
        )}

        {/* Step 3: Test Execution */}
        {currentStep === "test" && (
          <SkillAssessmentTest
            selectedSkill={selectedSkill}
            selectedLevel={selectedLevel}
            mockQuestions={activeQuestionsList}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            answers={answers}
            setAnswers={setAnswers}
            markedForReview={markedForReview}
            setMarkedForReview={setMarkedForReview}
            timeLeft={timeLeft}
            onSelectOption={handleSelectOption}
            onToggleReview={handleToggleMarkForReview}
            setCurrentStep={setCurrentStep}
          />
        )}

        {/* Step 4: Question Review */}
        {currentStep === "review" && (
          <SkillAssessmentReview
            selectedSkill={selectedSkill}
            selectedLevel={selectedLevel}
            mockQuestions={activeQuestionsList}
            answers={answers}
            markedForReview={markedForReview}
            timeLeft={timeLeft}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            setCurrentStep={setCurrentStep}
            onSubmitAssessment={handleSubmitAssessment}
            isSubmitting={isSubmitting}
          />
        )}

        {/* Step 5: AI Performance Results */}
        {currentStep === "results" && (
          <SkillAssessmentResults
            selectedSkill={selectedSkill}
            selectedLevel={selectedLevel}
            resultsScore={resultsScore}
            assessmentResult={assessmentResult}
            mockQuestions={activeQuestionsList}
            answers={answers}
            setCurrentStep={setCurrentStep}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}
