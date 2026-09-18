"use client";

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
import { useCoursePlayer } from "../../../component/ai_services/courses/player/useCoursePlayer";

export default function PythonCoursePlayerPage() {
  const {
    lessons,
    activeLessonId,
    activeLesson,
    isPlaying,
    currentTime,
    feedbackStatus,
    setFeedbackStatus,
    activeTab,
    setActiveTab,
    activeMainTab,
    setActiveMainTab,
    handlePlayPause,
    handleSelectLesson,
    handleNextLesson,
    handlePrevLesson,
    lessonsCompletedTotal,
    progressPercentage
  } = useCoursePlayer();

  return (
    <div className="min-w-0 overflow-x-hidden bg-[#f8f9ff] text-[#101014] font-poppins min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <PlayerHeaderBanner />
        <PlayerTabMenu 
          activeMainTab={activeMainTab}
          onMainTabChange={setActiveMainTab}
        />

        <main className="mx-auto max-w-7xl px-3 py-4 space-y-4 sm:px-4 sm:py-6 sm:space-y-6 lg:px-8">
          {activeMainTab === "learn" && (
            <>
              <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.6fr_1fr]">
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

              <PlayerBottomFeedback 
                activeLessonId={activeLessonId}
                feedbackStatus={feedbackStatus}
                onFeedbackChange={setFeedbackStatus}
              />
            </>
          )}

          {activeMainTab === "resources" && <PlayerResourcesWorkspace />}
          {activeMainTab === "assignments" && <PlayerAssignmentsWorkspace />}
          {activeMainTab === "discussions" && <PlayerDiscussionsWorkspace />}
          {activeMainTab === "notes" && <PlayerNotesWorkspace />}
          {activeMainTab === "achievements" && <PlayerAchievementsWorkspace />}
        </main>
      </div>

      <Footer />
    </div>
  );
}
