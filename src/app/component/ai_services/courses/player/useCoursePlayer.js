import { useState, useEffect } from "react";

const initialLessons = [
  { id: 1, title: "1. Introduction to Python", duration: "12:45", subtext: "Introduction to Python concepts, basic syntax rules, and running your first print script.", status: "completed" },
  { id: 2, title: "2. Setting up Python Environment", duration: "08:45", subtext: "Installing Python, configuring Visual Studio Code (VS Code), and verifying compiler paths.", status: "completed" },
  { id: 3, title: "3. Variables and Data Types", duration: "06:50", subtext: "Understanding variable assignments, integers, floats, strings, and default type conversion.", status: "completed" },
  { id: 4, title: "4. Operations in Python", duration: "18:10", subtext: "Overview of Python mathematical, logical, and comparison operations with data science context.", status: "playing" },
  { id: 5, title: "5. Input and Output in Python", duration: "12:00", subtext: "Taking dynamic user inputs with input(), formatting output strings, and writing to text logs.", status: "locked" }
];

export function useCoursePlayer() {
  const [lessons, setLessons] = useState(initialLessons);
  const [activeLessonId, setActiveLessonId] = useState(4);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [feedbackStatus, setFeedbackStatus] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeMainTab, setActiveMainTab] = useState("learn");

  const activeLesson = lessons.find(l => l.id === activeLessonId) || lessons[3];

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prevTime => {
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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelectLesson = (id) => {
    setActiveLessonId(id);
    setIsPlaying(false);
    setCurrentTime(0);

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

  const completedCountInS1 = lessons.filter(l => l.status === "completed").length;
  const lessonsCompletedTotal = 7 + (completedCountInS1 - 3);
  const progressPercentage = 28 + (completedCountInS1 - 3) * 4;

  return {
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
  };
}
