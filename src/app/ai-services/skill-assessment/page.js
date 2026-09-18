"use client";

import React, { useState, useEffect, useCallback } from "react";
import Header from "../../component/common/Header";
import Footer from "../../component/common/Footer";
import SkillAssessmentDashboard from "../../component/ai_services/skill_assessment/SkillAssessmentDashboard";
import SkillAssessmentInstructions from "../../component/ai_services/skill_assessment/SkillAssessmentInstructions";
import SkillAssessmentTest from "../../component/ai_services/skill_assessment/SkillAssessmentTest";
import SkillAssessmentReview from "../../component/ai_services/skill_assessment/SkillAssessmentReview";
import SkillAssessmentResults from "../../component/ai_services/skill_assessment/SkillAssessmentResults";

// Mock Data
const categories = [
  "Programming & Development",
  "Design & Creative",
  "Marketing & Sales",
  "Finance & Accounting",
  "Business & Management"
];

const skillsByCategory = {
  "Programming & Development": ["JavaScript", "Python", "React", "SQL Database", "Node.js", "HTML & CSS"],
  "Design & Creative": ["UI/UX Design", "Figma Prototyping", "Adobe Illustrator", "Graphic Design"],
  "Marketing & Sales": ["Digital Marketing", "SEO Optimization", "Content Strategy", "Social Media"],
  "Finance & Accounting": ["Financial Analysis", "Excel Modeling", "Bookkeeping", "Tax Auditing"],
  "Business & Management": ["Agile Project Management", "Business Strategy", "Product Management", "Team Leadership"]
};

const popularSkills = [
  { id: 1, name: "JavaScript", questions: "12 Questions", level: "Intermediate", category: "Programming & Development", logo: "JS", bg: "bg-amber-100 text-amber-600 border-amber-200" },
  { id: 2, name: "Python", questions: "12 Questions", level: "Intermediate", category: "Programming & Development", logo: "PY", bg: "bg-blue-100 text-blue-600 border-blue-200" },
  { id: 3, name: "React", questions: "12 Questions", level: "Advanced", category: "Programming & Development", logo: "RE", bg: "bg-sky-100 text-sky-600 border-sky-200" },
  { id: 4, name: "SQL Database", questions: "12 Questions", level: "Beginner", category: "Programming & Development", logo: "SQL", bg: "bg-emerald-100 text-emerald-600 border-emerald-200" }
];

const recentAssessments = [
  { id: 1, name: "JavaScript", level: "Intermediate", date: "5 May 2026", score: 87, status: "Good" },
  { id: 2, name: "React", level: "Advanced", date: "2 May 2026", score: 92, status: "Excellent" },
  { id: 3, name: "Python", level: "Intermediate", date: "28 April 2026", score: 65, status: "Good" },
  { id: 4, name: "UI/UX Design", level: "Intermediate", date: "15 April 2026", score: 45, status: "Needs Improvement" }
];

const mockQuestions = [
  {
    id: 1,
    question: "Which of the following is the correct way to declare a variable in JavaScript?",
    options: [
      { key: "A", text: "variable x = 10;" },
      { key: "B", text: "var x = 10;" },
      { key: "C", text: "declare x = 10;" },
      { key: "D", text: "x := 10;" }
    ],
    correct: "B",
    category: "Variables & Data Types"
  },
  {
    id: 2,
    question: "Which keyword is used to declare a block-scoped variable in JavaScript?",
    options: [
      { key: "A", text: "var" },
      { key: "B", text: "let" },
      { key: "C", text: "const" },
      { key: "D", text: "Both let and const" }
    ],
    correct: "D",
    category: "Variables & Data Types"
  },
  {
    id: 3,
    question: "Which of the following is used to add a comment in JavaScript?",
    options: [
      { key: "A", text: "// This is a comment" },
      { key: "B", text: "<!-- This is a comment -->" },
      { key: "C", text: "# This is a comment" },
      { key: "D", text: "Both A and B" }
    ],
    correct: "A",
    category: "Best Practices"
  },
  {
    id: 4,
    question: "Which operator is used to compare both value and type?",
    options: [
      { key: "A", text: "==" },
      { key: "B", text: "===" },
      { key: "C", text: "=" },
      { key: "D", text: "!=" }
    ],
    correct: "B",
    category: "ES6+ Features"
  },
  {
    id: 5,
    question: "What will be the output of: console.log(typeof null);",
    options: [
      { key: "A", text: "\"null\"" },
      { key: "B", text: "\"undefined\"" },
      { key: "C", text: "\"object\"" },
      { key: "D", text: "\"number\"" }
    ],
    correct: "C",
    category: "Variables & Data Types"
  }
];

export default function SkillAssessmentPage() {
  const [currentStep, setCurrentStep] = useState("dashboard");
  const [selectedCategory, setSelectedCategory] = useState("Programming & Development");
  const [selectedSkill, setSelectedSkill] = useState("JavaScript");
  const [selectedLevel, setSelectedLevel] = useState("Intermediate");

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [timeLeft, setTimeLeft] = useState(1884);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [resultsScore, setResultsScore] = useState(87);

  const [reviewPage, setReviewPage] = useState(1);
  const itemsPerReviewPage = 5;

  const handleCategoryChange = (catName) => {
    setSelectedCategory(catName);
    const list = skillsByCategory[catName] || [];
    if (list.length > 0) {
      setSelectedSkill(list[0]);
    }
  };

  const handleFinishTest = useCallback(() => {
    setIsTimerRunning(false);
    let correctCount = 0;
    mockQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / mockQuestions.length) * 100);
    setResultsScore(finalScore);
    setCurrentStep("results");
  }, [answers]);

  useEffect(() => {
    if (!isTimerRunning) return;
    if (timeLeft <= 0) {
      handleFinishTest();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, handleFinishTest]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleStartTestFlow = (skillName) => {
    setSelectedSkill(skillName || "JavaScript");
    setCurrentStep("instructions");
  };

  const handleBeginAssessment = () => {
    setCurrentStep("assessment");
    setTimeLeft(1884);
    setIsTimerRunning(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setMarkedForReview({});
  };

  const handleOptionSelect = (optionKey) => {
    setAnswers({
      ...answers,
      [mockQuestions[currentQuestionIndex].id]: optionKey
    });
  };

  const handleClearAnswer = () => {
    const newAnswers = { ...answers };
    delete newAnswers[mockQuestions[currentQuestionIndex].id];
    setAnswers(newAnswers);
  };

  const handleToggleReview = () => {
    const qId = mockQuestions[currentQuestionIndex].id;
    setMarkedForReview({
      ...markedForReview,
      [qId]: !markedForReview[qId]
    });
  };

  const countAnswered = () => Object.keys(answers).length;

  return (
    <div className="min-w-[320px] bg-[#f8f9ff] text-[#1E2229] font-poppins min-h-screen flex flex-col justify-between select-none">
      <div>
        <Header />

        {currentStep === "dashboard" && (
          <SkillAssessmentDashboard
            categories={categories}
            skillsByCategory={skillsByCategory}
            popularSkills={popularSkills}
            recentAssessments={recentAssessments}
            selectedCategory={selectedCategory}
            selectedSkill={selectedSkill}
            selectedLevel={selectedLevel}
            handleCategoryChange={handleCategoryChange}
            setSelectedSkill={setSelectedSkill}
            setSelectedLevel={setSelectedLevel}
            handleStartTestFlow={handleStartTestFlow}
          />
        )}

        {currentStep === "instructions" && (
          <SkillAssessmentInstructions
            selectedSkill={selectedSkill}
            selectedLevel={selectedLevel}
            selectedCategory={selectedCategory}
            setCurrentStep={setCurrentStep}
            handleBeginAssessment={handleBeginAssessment}
          />
        )}

        {currentStep === "assessment" && (
          <SkillAssessmentTest
            selectedSkill={selectedSkill}
            selectedLevel={selectedLevel}
            mockQuestions={mockQuestions}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            answers={answers}
            markedForReview={markedForReview}
            timeLeft={timeLeft}
            formatTime={formatTime}
            handleOptionSelect={handleOptionSelect}
            handleClearAnswer={handleClearAnswer}
            handleToggleReview={handleToggleReview}
            countAnswered={countAnswered}
            setCurrentStep={setCurrentStep}
          />
        )}

        {currentStep === "review" && (
          <SkillAssessmentReview
            selectedSkill={selectedSkill}
            selectedLevel={selectedLevel}
            mockQuestions={mockQuestions}
            answers={answers}
            markedForReview={markedForReview}
            reviewPage={reviewPage}
            setReviewPage={setReviewPage}
            itemsPerReviewPage={itemsPerReviewPage}
            setCurrentStep={setCurrentStep}
            handleFinishTest={handleFinishTest}
          />
        )}

        {currentStep === "results" && (
          <SkillAssessmentResults
            selectedSkill={selectedSkill}
            selectedLevel={selectedLevel}
            resultsScore={resultsScore}
            mockQuestions={mockQuestions}
            answers={answers}
            setCurrentStep={setCurrentStep}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}
