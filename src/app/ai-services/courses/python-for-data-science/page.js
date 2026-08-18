"use client";

import { useState, useEffect } from "react";
import Header from "../../../component/common/Header";
import Footer from "../../../component/common/Footer";
import PlayerHeaderBanner from "../../../component/ai_services/courses/player/PlayerHeaderBanner";
import PlayerTabMenu from "../../../component/ai_services/courses/player/PlayerTabMenu";
import PlayerVideoSection from "../../../component/ai_services/courses/player/PlayerVideoSection";
import PlayerOverviewTabs from "../../../component/ai_services/courses/player/PlayerOverviewTabs";
import PlayerSidebarProgress from "../../../component/ai_services/courses/player/PlayerSidebarProgress";
import PlayerSidebarContent from "../../../component/ai_services/courses/player/PlayerSidebarContent";
import PlayerSidebarResources from "../../../component/ai_services/courses/player/PlayerSidebarResources";
import PlayerBottomFeedback from "../../../component/ai_services/courses/player/PlayerBottomFeedback";
import PlayerResourcesWorkspace from "../../../component/ai_services/courses/player/PlayerResourcesWorkspace";
import PlayerAssignmentsWorkspace from "../../../component/ai_services/courses/player/PlayerAssignmentsWorkspace";
import PlayerDiscussionsWorkspace from "../../../component/ai_services/courses/player/PlayerDiscussionsWorkspace";
import PlayerNotesWorkspace from "../../../component/ai_services/courses/player/PlayerNotesWorkspace";
import PlayerAchievementsWorkspace from "../../../component/ai_services/courses/player/PlayerAchievementsWorkspace";

const initialLessons = [
  { id: 1, title: "1. Introduction to Python", duration: "12:45", subtext: "Introduction to Python concepts, basic syntax rules, and running your first print script.", status: "completed" },
  { id: 2, title: "2. Setting up Python Environment", duration: "08:45", subtext: "Installing Python, configuring Visual Studio Code (VS Code), and verifying compiler paths.", status: "completed" },
  { id: 3, title: "3. Variables and Data Types", duration: "06:50", subtext: "Understanding variable assignments, integers, floats, strings, and default type conversion.", status: "completed" },
  { id: 4, title: "4. Operations in Python", duration: "18:10", subtext: "Overview of Python mathematical, logical, and comparison operations with data science context.", status: "playing" },
  { id: 5, title: "5. Input and Output in Python", duration: "12:00", subtext: "Taking dynamic user inputs with input(), formatting output strings, and writing to text logs.", status: "locked" }
];

export default function PythonCoursePlayerPage() {
  const [lessons, setLessons] = useState(initialLessons);
  const [activeLessonId, setActiveLessonId] = useState(4);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [feedbackStatus, setFeedbackStatus] = useState(null); // "liked" | "disliked" | null
  const [activeTab, setActiveTab] = useState("overview");
  const [activeMainTab, setActiveMainTab] = useState("learn"); // "learn" | "resources" | "assignments" etc.

  const activeLesson = lessons.find(l => l.id === activeLessonId) || lessons[3];

  // Effect for simulated video playback ticking timer
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prevTime => {
          // Parse duration string to seconds
          const [m, s] = activeLesson.duration.split(":").map(Number);
          const maxSeconds = m * 60 + s;
          
          if (prevTime >= maxSeconds) {
            setIsPlaying(false);
            clearInterval(interval);
            return maxSeconds;
          }
          return prevTime + 1;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isPlaying, activeLesson.duration]);

  // Handlers
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelectLesson = (id) => {
    setActiveLessonId(id);
    setIsPlaying(false);
    setCurrentTime(0);

    // Update status of lessons: previous are completed, selected is playing, next are locked
    setLessons(prevLessons => 
      prevLessons.map(l => {
        if (l.id < id) return { ...l, status: "completed" };
        if (l.id === id) return { ...l, status: "playing" };
        return { ...l, status: "locked" };
      })
    );
  };

  const handleNextLesson = () => {
    if (activeLessonId < lessons.length) {
      handleSelectLesson(activeLessonId + 1);
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonId > 1) {
      handleSelectLesson(activeLessonId - 1);
    }
  };

  // Progress Calculations aligned to mockup starting stats (7 completed, 28%)
  const completedCountInS1 = lessons.filter(l => l.status === "completed").length;
  const lessonsCompletedTotal = 7 + (completedCountInS1 - 3); // starts at 7
  const progressPercentage = 28 + (completedCountInS1 - 3) * 4; // starts at 28%

  return (
    <div className="min-w-0 overflow-x-hidden bg-[#f8f9ff] text-[#101014] font-poppins min-h-screen flex flex-col justify-between">
      <div>
        <Header />

        {/* Course Banner */}
        <PlayerHeaderBanner />

        {/* Tab Menu Options */}
        <PlayerTabMenu 
          activeMainTab={activeMainTab}
          onMainTabChange={setActiveMainTab}
        />

        {/* Workspace Canvas */}
        <main className="mx-auto max-w-7xl px-3 py-4 space-y-4 sm:px-4 sm:py-6 sm:space-y-6 lg:px-8">
          
          {/* 1. Learn Tab Workspace */}
          {activeMainTab === "learn" && (
            <>
              <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.6fr_1fr]">
                {/* Left Column: Player Viewport & Details */}
                <div className="space-y-4 sm:space-y-6">
                  <PlayerVideoSection 
                    activeLesson={activeLesson}
                    isPlaying={isPlaying}
                    currentTime={currentTime}
                    onPlayPause={handlePlayPause}
                    onNext={handleNextLesson}
                    onPrev={handlePrevLesson}
                    isFirstLesson={activeLessonId === 1}
                    isLastLesson={activeLessonId === lessons.length}
                  />
                  <PlayerOverviewTabs 
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />
                </div>

                {/* Right Column: Outline, Progress & Downloads */}
                <div className="space-y-4 sm:space-y-6">
                  <PlayerSidebarProgress 
                    lessonsCompletedTotal={lessonsCompletedTotal}
                    progressPercentage={progressPercentage}
                  />
                  <PlayerSidebarContent 
                    lessons={lessons}
                    activeLessonId={activeLessonId}
                    onSelectLesson={handleSelectLesson}
                  />
                  <PlayerSidebarResources />
                </div>
              </div>

              {/* Bottom rating & progress bar */}
              <PlayerBottomFeedback 
                activeLessonId={activeLessonId}
                feedbackStatus={feedbackStatus}
                onFeedbackChange={setFeedbackStatus}
              />
            </>
          )}

          {/* 2. Resources Tab Workspace */}
          {activeMainTab === "resources" && (
            <PlayerResourcesWorkspace />
          )}

          {/* 3. Assignments Tab Workspace */}
          {activeMainTab === "assignments" && (
            <PlayerAssignmentsWorkspace />
          )}

          {/* 4. Discussions Tab Workspace */}
          {activeMainTab === "discussions" && (
            <PlayerDiscussionsWorkspace />
          )}

          {/* 5. Notes Tab Workspace */}
          {activeMainTab === "notes" && (
            <PlayerNotesWorkspace />
          )}

          {/* 6. Achievements Tab Workspace */}
          {activeMainTab === "achievements" && (
            <PlayerAchievementsWorkspace />
          )}

        </main>
      </div>

      <Footer />
    </div>
  );
}
